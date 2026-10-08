import type { Metadata } from "next"
import DownloaderClient from "./DownloaderClient"

const canonicalUrl = "https://kalhara.me/tiktok-insta-downloader"

export const metadata: Metadata = {
  title: "TikTok & Instagram Video Downloader - Fast, Free & No Watermark",
  description:
    "Free online TikTok and Instagram video downloader. Download TikTok videos without watermark and Instagram Reels in high-definition MP4 with a single paste. No registration required.",
  keywords: [
    "tiktok video downloader",
    "instagram reel downloader",
    "download tiktok without watermark",
    "instagram video saver",
    "tiktok mp4 downloader",
    "download instagram reels online",
    "reels downloader",
    "free social media video downloader",
    "save tiktok video",
    "insta video download",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "TikTok & Instagram Video Downloader - Free & No Watermark",
    description:
      "Download TikTok and Instagram videos in HD MP4 with a single paste. 100% free, fast, and no watermark.",
    url: canonicalUrl,
    siteName: "Kalhara Jayathissa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok & Instagram Video Downloader - Free & No Watermark",
    description:
      "Instant video downloader for TikTok and Instagram Reels. No watermark, high quality, free forever.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${canonicalUrl}/#app`,
      name: "TikTok & Instagram Video Downloader",
      url: canonicalUrl,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Fast, free tool to download TikTok videos without watermark and Instagram Reels in MP4 format directly to your device.",
      featureList: [
        "Download TikTok videos without watermark",
        "Download Instagram Reels and Videos",
        "Automatic download on paste",
        "Direct high-speed stream",
        "No login or installation required",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I download TikTok videos without a watermark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Copy the link of any public TikTok video, paste it into the downloader box, and the video will automatically download to your device without any watermark.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download Instagram Reels using this tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, simply copy the URL of the Instagram Reel or video, paste it into the input, and the MP4 video file will start downloading immediately.",
          },
        },
        {
          "@type": "Question",
          name: "Is this video downloader completely free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, this tool is 100% free with unlimited downloads, no hidden fees, and no account registration required.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to install any software or browser extensions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No installation is required. The downloader works directly inside your browser on all mobile and desktop devices.",
          },
        },
        {
          "@type": "Question",
          name: "Where are the downloaded videos saved?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Videos are saved directly to your browser's default download folder (Downloads) as standard MP4 files.",
          },
        },
      ],
    },
  ],
}

export default function TikTokInstaDownloaderPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen w-full bg-[#0a0a0a] text-neutral-100 selection:bg-neutral-800 selection:text-neutral-100 flex flex-col justify-between">
        {/* Above-the-fold Centered Downloader Experience */}
        <section className="min-h-[85vh] flex items-center justify-center px-4 py-12">
          <DownloaderClient />
        </section>

        {/* SEO-Rich Content Section (Semantic, Clean, Below-the-fold) */}
        <section className="w-full border-t border-neutral-800/60 bg-neutral-950/60 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* How It Works */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 text-center">
                How to Download TikTok &amp; Instagram Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm text-neutral-200">
                    1
                  </div>
                  <h3 className="font-medium text-neutral-200">Copy the Link</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Open TikTok or Instagram, find the video or Reel you want to save, and tap &ldquo;Share&rdquo; &rarr; &ldquo;Copy Link&rdquo;.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm text-neutral-200">
                    2
                  </div>
                  <h3 className="font-medium text-neutral-200">Paste URL</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Paste the link into the input box above. The downloader automatically detects the URL with zero extra clicks.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm text-neutral-200">
                    3
                  </div>
                  <h3 className="font-medium text-neutral-200">Instant Download</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    The video streams directly to your device as an MP4 file with original audio and no watermark.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 text-center">
                Why Use This Downloader?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 space-y-1.5">
                  <h3 className="text-sm font-semibold text-neutral-200">No Watermark</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Save TikTok videos completely free of the bouncing watermark logo for crystal clear playback.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 space-y-1.5">
                  <h3 className="text-sm font-semibold text-neutral-200">Original Resolution</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Preserves optimal 1080p / 720p resolution and crisp AAC stereo audio tracks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 space-y-1.5">
                  <h3 className="text-sm font-semibold text-neutral-200">Direct Server Streaming</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Streams directly without memory-heavy client buffers or permanent server storage for privacy.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 space-y-1.5">
                  <h3 className="text-sm font-semibold text-neutral-200">Works Everywhere</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Fully responsive across iPhone, iPad, Android smartphones, Mac, Windows, and Linux.
                  </p>
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 text-center">
                Frequently Asked Questions (FAQ)
              </h2>
              <div className="space-y-3 pt-2">
                <details className="group p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/70 transition-all cursor-pointer">
                  <summary className="font-medium text-sm text-neutral-200 flex justify-between items-center list-none select-none">
                    <span>How do I download TikTok videos without a watermark?</span>
                    <span className="text-neutral-500 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    Simply copy the video link from TikTok, paste it into the search box above, and the video will automatically be downloaded without the watermark in pure MP4 format.
                  </p>
                </details>

                <details className="group p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/70 transition-all cursor-pointer">
                  <summary className="font-medium text-sm text-neutral-200 flex justify-between items-center list-none select-none">
                    <span>Does this support Instagram Reels and Posts?</span>
                    <span className="text-neutral-500 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    Yes, you can download public Instagram Reels, videos, and feed clips. Just copy the Reel link and paste it into the box.
                  </p>
                </details>

                <details className="group p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/70 transition-all cursor-pointer">
                  <summary className="font-medium text-sm text-neutral-200 flex justify-between items-center list-none select-none">
                    <span>Is this service free to use?</span>
                    <span className="text-neutral-500 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    Yes, our downloader is 100% free with unlimited downloads, no sign-ups, and no hidden subscriptions.
                  </p>
                </details>

                <details className="group p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/70 transition-all cursor-pointer">
                  <summary className="font-medium text-sm text-neutral-200 flex justify-between items-center list-none select-none">
                    <span>Do you store or track downloaded videos?</span>
                    <span className="text-neutral-500 group-open:rotate-180 transition-transform text-xs">▼</span>
                  </summary>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    No. The downloader does not store or archive any video files on the server. Videos are streamed directly from upstream sources straight to your browser.
                  </p>
                </details>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="pt-6 border-t border-neutral-900 text-center text-[11px] text-neutral-600 space-y-1">
              <p>
                This tool is for personal and educational use only to download public content.
              </p>
              <p>
                TikTok and Instagram are registered trademarks of their respective owners. This service is not affiliated with ByteDance or Meta.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
