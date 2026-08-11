"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import MediumArticlesGrid from "@/components/MediumArticlesGrid"
import { cardVariants, layerVariants, staggerContainer } from "./PageTransition"
import NavBar from "@/components/NavBar"
import ShapeGrid from "@/components/ShapeGrid"

export default function ReadPageClient() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Grid Pattern */}
      <ShapeGrid
        speed={0.2}
        squareSize={40}
        direction="diagonal"
        borderColor="#352a4a"
        hoverFillColor="#222222"
        shape="square"
        hoverTrailAmount={0}
        className="fixed inset-0 z-0 pointer-events-none opacity-20 sm:opacity-25 lg:opacity-30"
      />

      <motion.div
        variants={layerVariants.background}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950 -z-10"
      />

      <NavBar currentPage="read" />

      {/* Hero Section */}
      <motion.section
        variants={layerVariants.content}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 px-4 sm:px-6 md:px-12 py-8 md:py-12 pt-20 md:pt-24"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            READ <span className="text-green-500">ARTICLES</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-xs sm:text-sm leading-relaxed mb-6 md:mb-8">
            Notes on systems, engineering workflow, and practical software building.
          </p>

          <motion.div
            variants={layerVariants.cards}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-12 md:pb-16"
          >
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="contents">
              <MediumArticlesGrid />
            </motion.div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            variants={layerVariants.cards}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center pb-12 md:pb-16 px-4"
          >
            <Link
              href="/"
              className="group relative px-5 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold text-xs sm:text-sm tracking-wider overflow-hidden hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 rounded-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                BACK TO HOME
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}