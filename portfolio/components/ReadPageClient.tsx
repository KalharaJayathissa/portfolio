"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import MediumArticlesGrid from "@/components/MediumArticlesGrid"
import type { ArticleMeta } from "@/lib/articles"
import { cardVariants, layerVariants, staggerContainer } from "./PageTransition"

type ReadPageClientProps = {
  articles: ArticleMeta[]
}

export default function ReadPageClient({ articles }: ReadPageClientProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        variants={layerVariants.background}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950 -z-10"
      />

      <motion.nav
        variants={layerVariants.content}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-6 md:px-12 py-4 md:py-6 border-b border-green-500/20"
      >
        <Link href="/" className="text-xl md:text-2xl font-bold hover:text-green-500 transition-all duration-150 active:scale-95">
          <span className="text-green-500">K</span>ALHARA
        </Link>
        <div className="flex gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm tracking-wider">
          <Link href="/" className="text-white hover:text-green-500 transition-all duration-150 active:scale-95">
            HOME
          </Link>
          <a href="#" className="text-white border-b-2 border-green-500 pb-1">
            READ
          </a>
          <Link href="/#contact" className="text-white hover:text-green-500 transition-all duration-150 active:scale-95">
            CONTACT
          </Link>
        </div>
      </motion.nav>

      <motion.section
        variants={layerVariants.content}
        initial="initial"
        animate="animate"
        exit="exit"
        className="px-4 sm:px-6 md:px-12 py-12 md:py-16"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            READ <span className="text-green-500">ARTICLES</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mb-10">
            Notes on systems, engineering workflow, and practical software building.
          </p>

          <motion.div
            variants={layerVariants.cards}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7"
          >
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="contents">
              {articles.map((article) => (
                <motion.div
                  key={article.slug}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group border border-green-500/30 bg-gradient-to-br from-gray-900 to-black p-6 md:p-7 hover:border-green-500 transition-all duration-300 active:scale-[0.985]"
                >
                  <Link href={`/read/${article.slug}`} className="block h-full">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400 mb-3 tracking-wide">
                      <span>{article.published}</span>
                      <span className="text-green-500">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-green-500 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                      {article.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-green-400 text-xs sm:text-sm tracking-wider font-semibold">
                      READ ARTICLE
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={cardVariants} whileHover={{ y: -8, transition: { duration: 0.25 } }} className="md:col-span-2">
              <MediumArticlesGrid />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}