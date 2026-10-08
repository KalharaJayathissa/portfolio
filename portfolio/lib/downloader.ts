/**
 * Server-side media extraction utility for TikTok, Instagram, and Facebook.
 * Runs strictly on the server and provides direct media URLs for streaming.
 */

export type SupportedPlatform = "tiktok" | "instagram" | "facebook";

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

const FACEBOOK_REGEX =
  /^https?:\/\/(?:www\.|m\.|web\.|touch\.)?(?:facebook\.com|fb\.watch)\/.+/i;

/**
 * Extracts a clean, standalone URL from user input, chat messages, or mobile share sheets.
 * Handles inputs with leading text, timestamps, captions, and trailing promo links.
 */
export function extractCleanUrl(text: string): string | null {
  if (!text || typeof text !== "string") return null;

  // 1. Check for TikTok URL (ignoring secondary promotional links like tiktoklite)
  const tiktokMatch = text.match(
    /https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
  );
  if (tiktokMatch) {
    if (tiktokMatch[0].includes("tiktoklite")) {
      const allTiktok = text.match(
        /https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/gi
      );
      const postLink = allTiktok?.find((u) => !u.includes("tiktoklite"));
      if (postLink) return postLink.replace(/[),.;!]+$/, "");
    }
    return tiktokMatch[0].replace(/[),.;!]+$/, "");
  }

  // 2. Check for Instagram URL
  const instaMatch = text.match(
    /https?:\/\/(?:www\.)?instagram\.com\/[^\s]+/i
  );
  if (instaMatch) {
    return instaMatch[0].replace(/[),.;!]+$/, "");
  }

  // 3. Check for Facebook URL
  const fbMatch = text.match(
    /https?:\/\/(?:www\.|m\.|web\.|touch\.)?(?:facebook\.com|fb\.watch)\/[^\s]+/i
  );
  if (fbMatch) {
    return fbMatch[0].replace(/[),.;!]+$/, "");
  }

  // 4. Fallback to generic URL
  const genericMatch = text.match(/https?:\/\/[^\s]+/i);
  if (genericMatch) {
    return genericMatch[0].replace(/[),.;!]+$/, "");
  }

  return null;
}

/**
 * Validates whether a given URL or text contains a supported TikTok, Instagram, or Facebook URL.
 */
export function detectPlatform(rawUrl: string): SupportedPlatform | null {
  const clean = extractCleanUrl(rawUrl);
  if (!clean) return null;
  if (TIKTOK_REGEX.test(clean)) return "tiktok";
  if (INSTAGRAM_REGEX.test(clean)) return "instagram";
  if (FACEBOOK_REGEX.test(clean)) return "facebook";
  return null;
}

// In-memory cache for fast preflight checks & immediate stream requests without double querying
interface CacheEntry {
  result: ExtractionResult;
  expiresAt: number;
}
const extractionCache = new Map<string, CacheEntry>();

function getCachedExtraction(url: string): ExtractionResult | null {
  const entry = extractionCache.get(url);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    extractionCache.delete(url);
    return null;
  }
  return entry.result;
}

function setCachedExtraction(url: string, result: ExtractionResult, ttlMs = 60000): void {
  if (extractionCache.size > 200) {
    const now = Date.now();
    for (const [key, val] of extractionCache.entries()) {
      if (now > val.expiresAt) extractionCache.delete(key);
    }
  }
  extractionCache.set(url, { result, expiresAt: Date.now() + ttlMs });
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
async function extractTikTok(rawUrl: string): Promise<ExtractionResult> {
  const cleanUrl = extractCleanUrl(rawUrl) || rawUrl.trim();

  async function queryTikWM(endpoint: string) {
    try {
      const res = await fetch(`${endpoint}?url=${encodeURIComponent(cleanUrl)}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // Engine 1: TikWM primary
  let data = await queryTikWM("https://www.tikwm.com/api/");

  // If rate-limited (1 req/sec), wait 1.2s and retry once
  if (
    data &&
    data.code === -1 &&
    (data.msg?.includes("1 request/second") || data.msg?.includes("Limit"))
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    data = await queryTikWM("https://www.tikwm.com/api/");
  }

  if (data && data.code === 0 && data.data) {
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

  // Engine 2: TikWM mirror
  data = await queryTikWM("https://api.tikwm.com/api/");
  if (data && data.code === 0 && data.data) {
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

  throw new Error("Unable to extract TikTok video. The video may be private, removed, or unavailable.");
}

/**
 * Extracts a downloadable media URL for Instagram.
 */
async function extractInstagram(rawUrl: string): Promise<ExtractionResult> {
  const cleanUrl = (extractCleanUrl(rawUrl) || rawUrl.trim())
    .replace(/\?.*$/, "")
    .replace(/\/+$/, "") + "/";
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

  throw new Error("Unable to extract Instagram video. The post or reel may be private, expired, or deleted.");
}

/**
 * Extracts a downloadable media URL for Facebook.
 */
async function extractFacebook(rawUrl: string): Promise<ExtractionResult> {
  const cleanUrl = extractCleanUrl(rawUrl) || rawUrl.trim();

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
            (l.includes("rapidcdn.app") ||
              l.includes("fbcdn") ||
              l.includes(".mp4") ||
              l.includes("token=") ||
              l.includes("download"))
        );
        if (validVideo) {
          const videoIdMatch = cleanUrl.match(/(?:v=|videos\/|reel\/|posts\/)(\d+)/);
          const id = videoIdMatch ? videoIdMatch[1] : "facebook_video";
          return {
            platform: "facebook",
            mediaUrl: validVideo,
            filename: `facebook_${id}.mp4`,
          };
        }
      }
    }
  } catch (err) {
    console.warn("Facebook extraction failed:", err);
  }

  throw new Error("Unable to extract Facebook video. The video may be private, group-restricted, or removed.");
}

/**
 * Main dispatcher to extract media from TikTok, Instagram, or Facebook.
 * Includes fast in-memory caching to prevent duplicate upstream hits on sequential calls.
 */
export async function extractMedia(rawUrl: string): Promise<ExtractionResult> {
  const cleanUrl = extractCleanUrl(rawUrl);
  if (!cleanUrl) {
    throw new Error("Unsupported website. Please provide a valid TikTok, Instagram, or Facebook link.");
  }

  // Check cache first (e.g. from preflight check)
  const cached = getCachedExtraction(cleanUrl);
  if (cached) {
    return cached;
  }

  const platform = detectPlatform(cleanUrl);
  if (!platform) {
    throw new Error("Unsupported website. Please provide a valid TikTok, Instagram, or Facebook link.");
  }

  let result: ExtractionResult;
  if (platform === "tiktok") {
    result = await extractTikTok(cleanUrl);
  } else if (platform === "instagram") {
    result = await extractInstagram(cleanUrl);
  } else {
    result = await extractFacebook(cleanUrl);
  }

  // Cache for 60 seconds
  setCachedExtraction(cleanUrl, result, 60000);
  return result;
}
