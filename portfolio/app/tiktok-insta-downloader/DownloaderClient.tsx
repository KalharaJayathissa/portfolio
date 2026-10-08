"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle, CheckCircle2, Video, Sparkles, ShieldCheck, Zap } from "lucide-react"

const TIKTOK_REGEX =
  /^https?:\/\/(?:www\.|m\.|vm\.|vt\.)?tiktok\.com\/(?:@[^/]+\/(?:video|photo)\/\d+|v\/\d+|t\/[\w]+|[\w]+)\/?/i
const INSTAGRAM_REGEX =
  /^https?:\/\/(?:www\.)?instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv|share)\/([a-zA-Z0-9_\-]+)/i

function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false
  const trimmed = url.trim()
  return TIKTOK_REGEX.test(trimmed) || INSTAGRAM_REGEX.test(trimmed)
}

export default function DownloaderClient() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const processingRef = useRef(false)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const triggerDownload = useCallback(async (targetUrl: string) => {
    const cleanUrl = targetUrl.trim()
    if (!cleanUrl) return

    if (!isValidUrl(cleanUrl)) {
      setErrorMessage("Please enter a valid TikTok or Instagram URL.")
      setSuccessMessage(null)
      return
    }

    if (processingRef.current) return
    processingRef.current = true

    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      // Step 1: Preflight check on server
      const checkRes = await fetch(
        `/api/download?url=${encodeURIComponent(cleanUrl)}&check=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )

      const result = await checkRes.json().catch(() => ({}))

      if (!checkRes.ok || !result.success) {
        const error =
          result.error ||
          "Unable to extract video. It may be private or removed."
        setErrorMessage(error)
        setIsLoading(false)
        processingRef.current = false
        return
      }

      // Step 2: Native stream trigger without buffering into JavaScript Blob
      const downloadHref = `/api/download?url=${encodeURIComponent(cleanUrl)}`
      const tempLink = document.createElement("a")
      tempLink.href = downloadHref
      tempLink.setAttribute(
        "download",
        result.filename || "video.mp4"
      )
      tempLink.style.display = "none"
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)

      // Step 3: Success state & clear input
      setSuccessMessage("Download started!")
      setUrl("")

      setTimeout(() => {
        inputRef.current?.focus()
        setSuccessMessage(null)
      }, 3000)
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Failed to process download. Please try again."
      )
    } finally {
      setIsLoading(false)
      processingRef.current = false
    }
  }, [])

  // Handle immediate paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text")?.trim()
    if (pastedText && isValidUrl(pastedText)) {
      e.preventDefault()
      setUrl(pastedText)
      triggerDownload(pastedText)
    }
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value
    setUrl(nextVal)
    setErrorMessage(null)
    setSuccessMessage(null)

    if (isValidUrl(nextVal)) {
      triggerDownload(nextVal)
    }
  }

  // Handle Enter keypress
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (!url.trim()) {
        setErrorMessage("Please paste a TikTok or Instagram link.")
        return
      }
      if (!isValidUrl(url)) {
        setErrorMessage("Please enter a valid TikTok or Instagram URL.")
        return
      }
      triggerDownload(url)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-6">
      {/* Title Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Free &bull; No Watermark &bull; HD MP4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100">
          TikTok &amp; Instagram Downloader
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto">
          Download videos without watermarks. Just paste your link below and the download starts automatically.
        </p>
      </div>

      {/* URL Input Box */}
      <div className="w-full relative">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={handleChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Paste TikTok or Instagram URL"
            aria-label="Paste TikTok or Instagram video URL"
            className={`w-full px-5 py-4 sm:py-5 text-base sm:text-lg bg-neutral-900/90 border rounded-2xl shadow-2xl transition-all duration-200 outline-none
              ${
                errorMessage
                  ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : isLoading
                  ? "border-neutral-700 bg-neutral-900/50 cursor-not-allowed"
                  : "border-neutral-800 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-700/30"
              }
              text-neutral-100 placeholder:text-neutral-500 disabled:opacity-70`}
          />

          {isLoading && (
            <div className="absolute right-4 flex items-center pointer-events-none">
              <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
            </div>
          )}
        </div>

        {/* Status & Error Messages */}
        <div className="min-h-[28px] mt-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex items-center space-x-2 text-sm text-neutral-400"
              >
                <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
                <span>Preparing download...</span>
              </motion.div>
            )}

            {!isLoading && errorMessage && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex items-center space-x-1.5 text-sm text-red-400"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {!isLoading && successMessage && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex items-center space-x-1.5 text-sm text-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Auto-Instant Download</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Safe &amp; Anonymous</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-blue-400" />
          <span>Original HD Quality</span>
        </div>
      </div>
    </div>
  )
}
