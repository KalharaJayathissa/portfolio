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
          <div key={item} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg animate-pulse border border-green-500/20">
            <div className="h-40 sm:h-44 w-full bg-gray-800 mb-0" />
            <div className="p-4">
              <div className="h-3.5 w-2/3 bg-gray-700 mb-2 rounded" />
              <div className="h-4 w-full bg-gray-700 mb-3 rounded" />
              <div className="h-3 w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </>
    )
  }

  if (hasError) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-5 py-4 md:col-span-2 rounded-xl text-xs sm:text-sm">
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
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.link}
            className="group relative z-10 bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm border border-green-500/30 hover:border-green-500/80 overflow-hidden flex flex-col justify-between hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all duration-300 active:scale-[0.98] rounded-xl cursor-pointer"
          >
            <div>
              <div className="w-full h-40 sm:h-44 overflow-hidden flex items-center justify-center bg-black/50 border-b border-green-500/20 group-hover:bg-black/60 transition-colors duration-300">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[11px] tracking-wider text-gray-500">
                    NO THUMBNAIL
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-200 leading-snug text-sm sm:text-base">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-green-500/10 mt-auto flex items-center justify-between gap-2">
              <span className="px-2 py-0.5 text-[10px] tracking-wider font-semibold text-green-400 bg-green-950/40 border border-green-500/30 rounded">
                MEDIUM
              </span>
              <p className="text-[11px] text-gray-400 tracking-wide">
                {Number.isNaN(parsedDate.getTime()) ? item.pubDate : dateFormatter.format(parsedDate)}
              </p>
            </div>
          </a>
        )
      })}
    </>
  )
}
