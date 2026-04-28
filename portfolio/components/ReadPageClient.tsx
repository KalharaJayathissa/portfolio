"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import MediumArticlesGrid from "@/components/MediumArticlesGrid"
import { cardVariants, layerVariants, staggerContainer } from "./PageTransition"
import NavBar from "@/components/NavBar"

export default function ReadPageClient() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        variants={layerVariants.background}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950 -z-10"
      />

      <NavBar currentPage="read" />

      <motion.section
        variants={layerVariants.content}
        initial="initial"
        animate="animate"
        exit="exit"
        className="px-4 sm:px-6 md:px-12 py-12 md:py-16 pt-20 md:pt-24"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            READ <span className="text-green-700">ARTICLES</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mb-10">
            Notes on systems, engineering workflow, and practical software building.
          </p>

          <motion.div
            variants={layerVariants.cards}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="contents">
              <MediumArticlesGrid />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}