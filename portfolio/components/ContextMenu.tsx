"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import GlassSurface from "@/components/GlassSurface"

interface ContextMenuPosition {
  x: number
  y: number
}

interface MenuItem {
  label: string
  href?: string
  type: "link" | "external" | "action" | "divider"
  action?: () => void
  icon?: React.ReactNode
}

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const MediumIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92c-.11.082-.166.213-.147.338v8.494c-.02.125.036.256.146.338l1.255 1.234v.271h-6.315v-.27l1.296-1.261c.127-.127.127-.164.127-.338V8.315l-3.604 9.152h-.487L6.555 8.315v6.163c-.033.264.052.528.235.721l1.688 2.05v.271H3.815v-.27L5.5 15.2c.184-.192.267-.457.232-.721V7.363c.023-.191-.057-.382-.22-.473L4.004 5.686v-.271h4.886l3.77 8.318 3.315-8.318h4.963v.27z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const getBrightness = (rgb: string) => {
  const values = rgb.match(/\d+/g)
  if (!values || values.length < 3) return 0
  const red = Number(values[0])
  const green = Number(values[1])
  const blue = Number(values[2])
  return (red * 299 + green * 587 + blue * 114) / 1000
}

export default function ContextMenu() {
  const [position, setPosition] = useState<ContextMenuPosition | null>(null)
  const [textColor, setTextColor] = useState<"text-white" | "text-black">("text-white")
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      
      let x = e.clientX
      let y = e.clientY

      // Adjust position if menu would go off-screen
      const menuWidth = 240
      const menuHeight = 360
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10
      }
      if (y + menuHeight > windowHeight) {
        y = windowHeight - menuHeight - 10
      }

      // Sample background color at menu position
      const sampleX = Math.round(x + menuWidth / 2)
      const sampleY = Math.round(y + menuHeight / 2)

      if (menuRef.current) {
        menuRef.current.style.pointerEvents = "none"
      }

      const elementUnderMenu = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null

      if (menuRef.current) {
        menuRef.current.style.pointerEvents = ""
      }

      if (elementUnderMenu) {
        let current: HTMLElement | null = elementUnderMenu
        let sampledColor = "rgb(0, 0, 0)"

        while (current && current !== document.body) {
          const color = window.getComputedStyle(current).backgroundColor
          if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
            sampledColor = color
            break
          }
          current = current.parentElement
        }

        setTextColor(getBrightness(sampledColor) >= 140 ? "text-black" : "text-white")
      }

      setPosition({ x, y })
    }

    const handleClick = () => {
      setPosition(null)
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const menuItems: MenuItem[] = [
    {
      label: "PROJECTS & PRODUCTS",
      href: "/projects",
      type: "link",
    },
    {
      label: "LOGIN FOR MORE",
      href: "#",
      type: "link",
    },
    {
      label: "RELOAD",
      href: "#",
      type: "action",
      action: () => window.location.reload(),
    },
    { type: "divider", label: "" },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/kalharajy/",
      type: "external",
      icon: <LinkedInIcon />,
    },
    {
      label: "GITHUB",
      href: "https://github.com/KalharaJayathissa",
      type: "external",
      icon: <GitHubIcon />,
    },
    {
      label: "MEDIUM",
      href: "https://medium.com/@kalharajay",
      type: "external",
      icon: <MediumIcon />,
    },
    {
      label: "INSTAGRAM",
      href: "https://www.instagram.com/kalhara.jy",
      type: "external",
      icon: <InstagramIcon />,
    },
    {
      label: "FACEBOOK",
      href: "https://web.facebook.com/kalhara.jayathissa.9",
      type: "external",
      icon: <FacebookIcon />,
    },
  ]

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed z-[9999] overflow-hidden"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: "240px",
          }}
        >
          <GlassSurface
            width="100%"
            height={360}
            borderRadius={8}
            backgroundOpacity={0.5}
            saturation={2}
            blur={14}
            borderWidth={0.08}
            distortionScale={-90}
            brightness={64}
            opacity={0.96}
            mixBlendMode="difference"
            className="w-full border border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
          >
            <div className="relative z-10 py-2">
              {menuItems.map((item, index) => {
                if (item.type === "divider") {
                  return (
                    <div
                      key={index}
                      className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"
                    />
                  )
                }

                const isExternal = item.type === "external"
                const isAction = item.type === "action"
                const isLink = item.type === "link"

                const content = (
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2.5 cursor-pointer ${textColor} text-xs font-semibold tracking-wider flex items-center gap-3 transition-colors hover:text-green-400`}
                  >
                    {item.icon && <span className={`flex-shrink-0 ${textColor}`}>{item.icon}</span>}
                    <span>{item.label}</span>
                  </motion.div>
                )

                if (isExternal || isLink) {
                  return (
                    <Link
                      key={index}
                      href={item.href || "#"}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setPosition(null)}
                    >
                      {content}
                    </Link>
                  )
                }

                if (isAction) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (item.action) {
                          item.action()
                        }
                        setPosition(null)
                      }}
                      className="w-full text-left"
                    >
                      {content}
                    </button>
                  )
                }

                return null
              })}
            </div>
          </GlassSurface>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
