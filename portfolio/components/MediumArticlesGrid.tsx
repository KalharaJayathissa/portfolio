"use client"

import { useEffect, useMemo, useState } from "react"

type MediumItem = {
  title: string
  link: string
  pubDate: string
  thumbnail: string
}

type RssToJsonResponse = {
  status: "ok" | "error"
  items?: MediumItem[]
  message?: string
}

const FEED_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kalharajay"
const FEATURED_POST_URL =
  "https://medium.com/@kalharajay/building-a-cross-platform-encryption-tool-with-c-from-linux-to-android-6df0fd3e091e"
const FEATURED_POST_TITLE = "Building a cross-platform encryption tool with C++: From Linux to Android"
const FEATURED_POST_THUMBNAIL = "/k-lock-removebg-preview.png"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
})

export default function MediumArticlesGrid() {
  const [articles, setArticles] = useState<MediumItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadArticles = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch(FEED_URL)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = (await response.json()) as RssToJsonResponse

        if (data.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error(data.message || "Invalid RSS-to-JSON response")
        }

        if (!isMounted) return
        setArticles(data.items)
      } catch (error) {
        console.error("Failed to fetch Medium feed", error)
        if (!isMounted) return
        setHasError(true)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadArticles()

    return () => {
      isMounted = false
    }
  }, [])

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aFeatured = a.link === FEATURED_POST_URL ? 1 : 0
      const bFeatured = b.link === FEATURED_POST_URL ? 1 : 0
      return bFeatured - aFeatured
    })
  }, [articles])

  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((item) => (
          <div key={item} className="border border-green-500/20 bg-gradient-to-br from-gray-900 to-black p-5 md:p-6 animate-pulse rounded-2xl">
            <div className="h-44 w-full bg-gray-800 mb-4 rounded-xl" />
            <div className="h-4 w-1/3 bg-gray-800 mb-3 rounded-full" />
            <div className="h-6 w-5/6 bg-gray-800 rounded-full" />
          </div>
        ))}
      </>
    )
  }

  if (hasError) {
    return (
      <div className="border border-red-500/30 bg-red-500/10 text-red-200 px-5 py-4 md:col-span-2 rounded-2xl">
        Could not load Medium articles right now. Please try again later.
      </div>
    )
  }

  return (
    <>
      {sortedArticles.map((item) => {
        const isFeatured =
          item.link === FEATURED_POST_URL ||
          item.title === FEATURED_POST_TITLE ||
          item.title.toLowerCase().includes("cross-platform encryption tool")
        const parsedDate = new Date(item.pubDate)
        const thumbnail = isFeatured ? FEATURED_POST_THUMBNAIL : item.thumbnail

        return (
          <article
            key={item.link}
            className={`group border bg-gradient-to-br from-gray-900 to-black overflow-hidden flex flex-col hover:border-green-500 transition-all duration-300 active:scale-[0.985] rounded-2xl ${
              isFeatured
                ? "featured-post border-green-500 md:col-span-2"
                : "border-green-500/30"
            }`}
          >
            <div className={`w-full h-44 md:h-52 overflow-hidden border-b border-green-500/20 flex items-center justify-center ${isFeatured ? "bg-white" : "bg-black/50"}`}>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs tracking-wider text-gray-500">
                  NO THUMBNAIL
                </div>
              )}
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col">
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 border border-green-500/40 text-[10px] sm:text-xs text-green-300 tracking-wider font-semibold">
                  FROM MEDIUM
                </span>
                <p className="text-xs sm:text-sm text-gray-400 tracking-wide">
                  {Number.isNaN(parsedDate.getTime()) ? item.pubDate : dateFormatter.format(parsedDate)}
                </p>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-5 group-hover:text-green-500 transition-colors leading-snug flex-1">
                {item.title}
              </h3>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-black font-semibold text-sm tracking-wide hover:bg-green-400 transition-all duration-200 active:scale-95 rounded-xl"
              >
                Read on Medium
              </a>
            </div>
          </article>
        )
      })}
    </>
  )
}
