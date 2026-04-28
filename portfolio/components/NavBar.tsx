"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import GlassSurface from "@/components/GlassSurface"

interface NavBarProps {
  currentPage: "home" | "projects" | "read"
}

export default function NavBar({ currentPage }: NavBarProps) {
  const navRef = useRef<HTMLElement | null>(null)
  const [isLightBackgroundUnderNav, setIsLightBackgroundUnderNav] = useState(false)

  useEffect(() => {
    const getBrightness = (rgb: string) => {
      const values = rgb.match(/\d+/g)
      if (!values || values.length < 3) return 0
      const red = Number(values[0])
      const green = Number(values[1])
      const blue = Number(values[2])
      return (red * 299 + green * 587 + blue * 114) / 1000
    }

    const updateNavContrast = () => {
      if (!navRef.current) return

      const rect = navRef.current.getBoundingClientRect()
      const sampleX = Math.round(rect.left + rect.width / 2)
      const sampleY = Math.round(rect.top + rect.height / 2)

      const nav = navRef.current
      nav.style.pointerEvents = "none"
      const elementUnderNav = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null
      nav.style.pointerEvents = ""

      if (!elementUnderNav) return

      let current: HTMLElement | null = elementUnderNav
      let sampledColor = "rgb(0, 0, 0)"

      while (current && current !== document.body) {
        const color = window.getComputedStyle(current).backgroundColor
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          sampledColor = color
          break
        }
        current = current.parentElement
      }

      setIsLightBackgroundUnderNav(getBrightness(sampledColor) >= 140)
    }

    updateNavContrast()
    window.addEventListener("scroll", updateNavContrast, { passive: true })
    window.addEventListener("resize", updateNavContrast)

    return () => {
      window.removeEventListener("scroll", updateNavContrast)
      window.removeEventListener("resize", updateNavContrast)
    }
  }, [])

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-6 md:px-12 py-4 md:py-6"
    >
      <GlassSurface
        width="100%"
        height={72}
        borderRadius={999}
        backgroundOpacity={0.3}
        saturation={2}
        blur={14}
        borderWidth={0.08}
        distortionScale={-90}
        brightness={64}
        opacity={0.96}
        mixBlendMode="difference"
        className="w-full max-w-[760px] px-3 border border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
      >
        <div className={`w-full flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 sm:gap-8 md:gap-12 text-[10px] sm:text-sm tracking-wider transition-colors ${isLightBackgroundUnderNav ? "text-black" : "text-white"}`}>
          <Link 
            href="/" 
            className={`${currentPage === "home" ? "border-b-2 border-current pb-1" : "hover:opacity-70"} text-current transition-all duration-150 active:scale-95`}
          >
            HOME
          </Link>
          <Link 
            href="/projects" 
            className={`${currentPage === "projects" ? "border-b-2 border-current pb-1" : "hover:opacity-70"} text-current transition-all duration-150 active:scale-95`}
          >
            PROJECTS & PRODUCTS
          </Link>
          <Link 
            href="/read" 
            className={`${currentPage === "read" ? "border-b-2 border-current pb-1" : "hover:opacity-70"} text-current transition-all duration-150 active:scale-95`}
          >
            READ
          </Link>
          <a 
            href="/#contact" 
            className="text-current hover:opacity-70 transition-all duration-150 active:scale-95"
          >
            CONTACT
          </a>
        </div>
      </GlassSurface>
    </motion.nav>
  )
}
