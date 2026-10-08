/**
 * Server-side media extraction utility for TikTok and Instagram.
 * Runs strictly on the server and provides direct media URLs for streaming.
 */

export type SupportedPlatform = "tiktok" | "instagram";

export interface ExtractionResult {
  platform: SupportedPlatform;
  mediaUrl: string;
  filename: string;
  title?: string;
}

const TIKTOK_REGEX =
  /^https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/(?:@[^/]+\/(?:video|photo)\/\d+|v\/\d+|t\/[\w]+|[\w]+)\/?/i;

const INSTAGRAM_REGEX =
  /^https?:\/\/(?:www\.)?instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv|share)\/([a-zA-Z0-9_\-]+)/i;

/**
 * Validates whether a given URL is a supported TikTok or Instagram video URL.
 */
export function detectPlatform(rawUrl: string): SupportedPlatform | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (TIKTOK_REGEX.test(trimmed)) return "tiktok";
  if (INSTAGRAM_REGEX.test(trimmed)) return "instagram";
  return null;
}

/**
 * SnapSave response decryption logic
 */
function decodeSnapApp(args: string[]): string {
  const [h, , n, t, e] = args;
  const tNum = Number(t);
  const eNum = Number(e);

  function decode(d: string, baseIn: number, baseOut: number): string {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(
        ""
      );
    const inAlphabet = chars.slice(0, baseIn);
    const outAlphabet = chars.slice(0, baseOut);

    let num = d
      .split("")
      .reverse()
      .reduce((accum, char, idx) => {
        const found = inAlphabet.indexOf(char);
        return found !== -1 ? accum + found * Math.pow(baseIn, idx) : accum;
      }, 0);

    let res = "";
    while (num > 0) {
      res = outAlphabet[num % baseOut] + res;
      num = Math.floor(num / baseOut);
    }
    return res || "0";
  }

  let result = "";
  for (let i = 0, len = h.length; i < len; ) {
    let segment = "";
    while (i < len && h[i] !== n[eNum]) {
      segment += h[i];
      i++;
    }
    i++;
    for (let j = 0; j < n.length; j++) {
      segment = segment.replace(new RegExp(n[j], "g"), j.toString());
    }
    result += String.fromCharCode(Number(decode(segment, eNum, 10)) - tNum);
  }

  try {
    const bytes = new Uint8Array(
      result.split("").map((c) => c.charCodeAt(0))
    );
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return result;
  }
}

function decryptSnapSave(htmlData: string): string {
  try {
    const encodedPart = htmlData
      .split("decodeURIComponent(escape(r))}(")[1]
      ?.split("))")[0];
    if (!encodedPart) return "";
    const args = encodedPart.split(",").map((v) => v.replace(/"/g, "").trim());
    const decoded = decodeSnapApp(args);

    const alertError = decoded
      ?.split('document.querySelector("#alert").innerHTML = "')?.[1]
      ?.split('";')?.[0]
      ?.trim();
    if (alertError) {
      throw new Error(alertError);
    }

    const section = decoded
      ?.split('getElementById("download-section").innerHTML = "')?.[1]
      ?.split('"; document.getElementById("inputData").remove(); ')[0];

    const targetHtml = section || decoded;
    return targetHtml
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\//g, "/");
  } catch {
    return "";
  }
}

/**
 * Extracts a downloadable media URL for TikTok.
 */
async function extractTikTok(url: string): Promise<ExtractionResult> {
  const cleanUrl = url.trim();

  // Engine 1: TikWM
  try {
    const res = await fetch(
      `https://www.tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(15000),
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.code === 0 && data.data) {
        const mediaUrl = data.data.play || data.data.wmplay;
        if (mediaUrl) {
          const id = data.data.id || "tiktok_video";
          return {
            platform: "tiktok",
            mediaUrl,
            filename: `tiktok_${id}.mp4`,
            title: data.data.title,
          };
        }
      }
    }
  } catch (err) {
    console.warn("TikWM extraction failed, trying mirror:", err);
  }

  // Engine 2: TikWM mirror
  try {
    const res = await fetch(
      `https://api.tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(15000),
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.code === 0 && data.data) {
        const mediaUrl = data.data.play || data.data.wmplay;
        if (mediaUrl) {
          const id = data.data.id || "tiktok_video";
          return {
            platform: "tiktok",
            mediaUrl,
            filename: `tiktok_${id}.mp4`,
            title: data.data.title,
          };
        }
      }
    }
  } catch (err) {
    console.warn("TikWM mirror extraction failed:", err);
  }

  throw new Error("Unable to extract TikTok video. The video may be private, removed, or unavailable.");
}

/**
 * Extracts a downloadable media URL for Instagram.
 */
async function extractInstagram(url: string): Promise<ExtractionResult> {
  const cleanUrl = url.trim().replace(/\?.*$/, "").replace(/\/+$/, "") + "/";
  const shortcodeMatch = cleanUrl.match(/(?:reel|p|tv|reels)\/([a-zA-Z0-9_\-]+)/i);
  const shortcode = shortcodeMatch ? shortcodeMatch[1] : "instagram_reel";

  // Engine 1: SnapSave
  try {
    const formData = new URLSearchParams();
    formData.append("url", cleanUrl);

    const res = await fetch("https://snapsave.app/action.php?lang=en", {
      method: "POST",
      headers: {
        accept: "*/*",
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://snapsave.app",
        referer: "https://snapsave.app/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
      },
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    if (res.ok) {
      const html = await res.text();
      const decoded = decryptSnapSave(html);
      if (decoded) {
        const matches = Array.from(decoded.matchAll(/href="([^"]+)"/g));
        const links = matches.map((m) => m[1]);
        const validVideo = links.find(
          (l) =>
            l &&
            l.startsWith("http") &&
            !l.includes("play.google.com") &&
            !l.includes("apple.com") &&
            !l.includes("facebook.com") &&
            (l.includes("rapidcdn.app") ||
              l.includes("cdninstagram") ||
              l.includes("fbcdn") ||
              l.includes(".mp4") ||
              l.includes("token=") ||
              l.includes("download"))
        );
        if (validVideo) {
          return {
            platform: "instagram",
            mediaUrl: validVideo,
            filename: `instagram_${shortcode}.mp4`,
          };
        }
      }
    }
  } catch (err) {
    console.warn("SnapSave extraction failed:", err);
  }

  // Engine 2: SaveIG
  try {
    const body = new URLSearchParams({
      q: cleanUrl,
      t: "media",
      lang: "en",
    });
    const res = await fetch("https://v3.saveig.app/api/ajaxSearch", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        referer: "https://saveig.app/en",
      },
      body,
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.data) {
        const matches = Array.from(data.data.matchAll(/href="([^"]+)"/g) as Iterable<RegExpExecArray>);
        const links = matches.map((m: any) => m[1]);
        const validLink = links.find(
          (l: string) => l && l.startsWith("http") && !l.includes("saveig.app")
        );
        if (validLink) {
          return {
            platform: "instagram",
            mediaUrl: validLink,
            filename: `instagram_${shortcode}.mp4`,
          };
        }
      }
    }
  } catch (err) {
    console.warn("SaveIG extraction failed:", err);
  }

  // Engine 3: FastDL
  try {
    const params = new URLSearchParams({ url: cleanUrl });
    const res = await fetch("https://fastdl.app/c/", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        origin: "https://fastdl.app",
        referer: "https://fastdl.app/en",
      },
      body: params,
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const html = await res.text();
      const matches = Array.from(html.matchAll(/href="([^"]+)"/g));
      const links = matches.map((m) => m[1]);
      const valid = links.find(
        (l) =>
          l &&
          l.startsWith("http") &&
          (l.includes("cdninstagram") || l.includes("fbcdn") || l.includes(".mp4"))
      );
      if (valid) {
        return {
          platform: "instagram",
          mediaUrl: valid,
          filename: `instagram_${shortcode}.mp4`,
        };
      }
    }
  } catch (err) {
    console.warn("FastDL extraction failed:", err);
  }

  throw new Error("Unable to extract Instagram video. The post or reel may be private, expired, or deleted.");
}

/**
 * Main dispatcher to extract media from either TikTok or Instagram.
 */
export async function extractMedia(rawUrl: string): Promise<ExtractionResult> {
  const platform = detectPlatform(rawUrl);
  if (!platform) {
    throw new Error("Unsupported website. Please provide a valid TikTok or Instagram link.");
  }

  if (platform === "tiktok") {
    return await extractTikTok(rawUrl);
  } else {
    return await extractInstagram(rawUrl);
  }
}
