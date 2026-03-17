"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { layerVariants, staggerContainer, cardVariants } from "../../components/PageTransition"

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "BLUE SKY SYSTEMS",
            description: "Enterprise-grade chemical management platform with real-time tracking and analytics. Built with Next.js, PostgreSQL, and Redis.",
            tags: ["Next.js", "PostgreSQL", "Redis", "TypeScript"],
            image: "/project1.png"
        },
        {
            id: 2,
            title: "LOS POLLOS HERMANOS",
            description: "Full-stack logistics and inventory management system. Scaled to handle 100k+ daily transactions with 99.9% uptime.",
            tags: ["React", "Node.js", "MongoDB", "Docker"],
            image: "/project2.png"
        },
        {
            id: 3,
            title: "GRAY MATTER TECH",
            description: "Advanced data pipeline and ETL system for processing large-scale chemical analysis data. High-performance architecture.",
            tags: ["Python", "Apache Kafka", "Spark", "AWS"],
            image: "/project3.png"
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated Background Layer */}
            <motion.div
                variants={layerVariants.background}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950 -z-10"
            />

            {/* Navigation */}
            <motion.nav
                variants={layerVariants.content}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-6 md:px-12 py-4 md:py-6 border-b border-green-500/20"
            >
                <Link href="/" className="text-xl md:text-2xl font-bold hover:text-green-500 transition">
                    <span className="text-green-500">K</span>ALHARA
                </Link>
                <div className="flex gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm tracking-wider">
                    <Link href="/" className="text-white hover:text-green-500 transition">
                        HOME
                    </Link>
                    <a href="#" className="text-white border-b-2 border-green-500 pb-1">
                        PROJECTS & PRODUCTS
                    </a>
                    <Link href="/#contact" className="text-white hover:text-green-500 transition">
                        CONTACT
                    </Link>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <motion.div
                variants={layerVariants.content}
                initial="initial"
                animate="animate"
                exit="exit"
                className="py-12 md:py-20 px-4 sm:px-6 md:px-12"
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
                        PROJECTS <span className="text-green-500">&</span> PRODUCTS
                    </h1>
                    <p className="text-base md:text-xl text-gray-300 max-w-2xl">
                        A collection of high-performance systems and applications built with precision and attention to detail.
                    </p>
                </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                variants={layerVariants.cards}
                initial="initial"
                animate="animate"
                exit="exit"
                className="px-4 sm:px-6 md:px-12 pb-14 md:pb-20"
            >
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-transparent transition-all duration-500" />

                            {/* Content */}
                            <div className="relative p-6 md:p-8">
                                {/* Icon/Image Placeholder */}
                                <div className="w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 bg-green-500/20 border border-green-500 flex items-center justify-center">
                                    <span className="text-3xl">🧪</span>
                                </div>

                                <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-green-500 transition">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-green-500/10 text-green-500 px-3 py-1 border border-green-500/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
                variants={layerVariants.cards}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex justify-center pb-14 md:pb-20 px-4"
            >
                <Link
                    href="/"
                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold text-base md:text-lg tracking-wider overflow-hidden hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO HOME
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
            </motion.div>
        </div>
    )
}
