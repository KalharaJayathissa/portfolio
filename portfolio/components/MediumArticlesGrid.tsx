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
          <div key={item} className="bg-gray-900 rounded-md overflow-hidden shadow-lg animate-pulse">
            <div className="h-40 w-full bg-gray-800 mb-0" />
            <div className="p-3">
              <div className="h-4 w-2/3 bg-gray-700 mb-2 rounded" />
              <div className="h-5 w-full bg-gray-700 mb-3 rounded" />
              <div className="h-3 w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </>
    )
  }

  if (hasError) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-5 py-4 md:col-span-2 rounded-md">
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
            className="group bg-gray-900 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 active:scale-[0.98] rounded-md cursor-pointer shadow-md hover:shadow-emerald-900/50"
          >
            <div className="w-full overflow-hidden flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center text-xs tracking-wider text-gray-500">
                  NO THUMBNAIL
                </div>
              )}
            </div>

            <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold mb-2 group-hover:text-green-400 transition-colors duration-200 leading-snug flex-1 text-sm md:text-base">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <span className="px-2 py-1 text-[10px] tracking-wider font-medium text-green-700 bg-green-900/40 rounded">
                  MEDIUM
                </span>
                <p className="text-xs text-gray-400 tracking-wide">
                  {Number.isNaN(parsedDate.getTime()) ? item.pubDate : dateFormatter.format(parsedDate)}
                </p>
              </div>
            </div>
          </a>
        )
      })}
    </>
  )
}
