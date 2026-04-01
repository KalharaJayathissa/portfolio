import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnimatePresence } from "framer-motion"
import FluidCursor from "@/components/FluidCursor"
import SplashCursor from "@/components/SplashCursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Kalhara Jayathissa | CSE",
  icons: {
    icon: "/AboutMe.jpg?v=2",
    shortcut: "/AboutMe.jpg?v=2",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {/* <FluidCursor /> */}
        <SplashCursor />
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        <Analytics />
      </body>
    </html>
  )
}
