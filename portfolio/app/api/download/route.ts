import { NextRequest, NextResponse } from "next/server";
import { detectPlatform, extractMedia } from "@/lib/downloader";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Handles video download requests.
 * Supports:
 * - GET /api/download?url=...&check=1 -> Validates extraction without streaming large payload
 * - GET /api/download?url=... -> Directly streams MP4 to client with attachment headers
 * - POST /api/download -> Also accepts JSON { url, check? }
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url")?.trim();
  const isCheckOnly = searchParams.get("check") === "1" || searchParams.get("check") === "true";

  return handleDownload(url, isCheckOnly);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const url = (body?.url as string)?.trim();
    const isCheckOnly = !!body?.check;

    return handleDownload(url, isCheckOnly);
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

async function handleDownload(url: string | undefined, isCheckOnly: boolean) {
  // 1. Validate empty input
  if (!url) {
    return NextResponse.json(
      { error: "Please provide a video URL." },
      { status: 400 }
    );
  }

  // 2. Validate URL syntax
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json(
        { error: "Invalid URL protocol. Must be HTTP or HTTPS." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid URL format." },
      { status: 400 }
    );
  }

  // 3. Validate supported website
  const platform = detectPlatform(url);
  if (!platform) {
    return NextResponse.json(
      { error: "Unsupported website. Please provide a TikTok or Instagram link." },
      { status: 400 }
    );
  }

  // 4. Server-side media extraction
  let extraction;
  try {
    extraction = await extractMedia(url);
  } catch (err: any) {
    const msg = err?.message || "Failed to extract video.";
    return NextResponse.json(
      { error: msg },
      { status: 422 }
    );
  }

  if (!extraction || !extraction.mediaUrl) {
    return NextResponse.json(
      { error: "Video not found, private, or temporarily unavailable." },
      { status: 404 }
    );
  }

  // If client only requested preflight / extraction check
  if (isCheckOnly) {
    return NextResponse.json({
      success: true,
      platform: extraction.platform,
      filename: extraction.filename,
      title: extraction.title,
    });
  }

  // 5. Connect upstream stream and stream directly to client
  try {
    const upstreamRes = await fetch(extraction.mediaUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer:
          extraction.platform === "tiktok"
            ? "https://www.tiktok.com/"
            : "https://www.instagram.com/",
      },
      signal: AbortSignal.timeout(45000),
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      return NextResponse.json(
        { error: "Failed to download media stream from upstream provider." },
        { status: 502 }
      );
    }

    const rawContentType = upstreamRes.headers.get("content-type") || "";
    // Verify it is not an error HTML/text page from upstream
    if (rawContentType.includes("text/html") || rawContentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Upstream media source returned non-video content." },
        { status: 502 }
      );
    }

    const contentType = rawContentType.includes("video") ? rawContentType : "video/mp4";
    const contentLength = upstreamRes.headers.get("content-length");

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", contentType);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${extraction.filename || "video.mp4"}"`
    );
    responseHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate");

    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    // Stream directly from upstream to browser without storing on server disk or memory
    return new Response(upstreamRes.body as any, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (err: any) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      return NextResponse.json(
        { error: "Download request timed out. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred while streaming the video." },
      { status: 500 }
    );
  }
}
