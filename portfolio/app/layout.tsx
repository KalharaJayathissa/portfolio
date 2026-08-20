import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnimatePresence } from "framer-motion"
import FluidCursor from "@/components/FluidCursor"
import SplashCursor from "@/components/SplashCursor"
// @ts-expect-error -- Next.js handles global CSS side-effect imports
import "./globals.css"
import type { Metadata } from "next"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true"

export const metadata: Metadata = {
  title: "Kalhara Jayathissa | CSE",
  description:
    "Engineer and computer science enthusiast focused on Fullstack systems, Backend development, security , and practical software products.",
  openGraph: {
    title: "Kalhara Jayathissa | CSE",
    description:
      "Engineer and computer science enthusiast building practical, secure full-stack products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalhara Jayathissa | CSE",
    description:
      "Engineer and computer science enthusiast building practical, secure full-stack products.",
  },
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
        {/* <SplashCursor /> */}
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        {analyticsEnabled ? <Analytics /> : null}
      </body>
    </html>
  )
}
