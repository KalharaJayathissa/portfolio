"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { layerVariants, staggerContainer, cardVariants } from "../../components/PageTransition"
import NavBar from "@/components/NavBar"

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "KESS INSPIRE",
            description: "Advanced Level Examination Management System for A/L 2025 Maths stream with student, invigilator, examiner, and admin workflows.",
            tags: ["React.js", "Node.js", "Express", "Supabase", "Full-Stack"],
            thumbnail: "/project-thumbnails/kess-inspire.jpg",
            url: "https://github.com/KalharaJayathissa/inspire-frontend",
            links: [
                {
                    label: "BACKEND",
                    href: "https://github.com/MORA-KESS/Inspire_backend"
                },
                {
                    label: "FRONTEND",
                    href: "https://github.com/KalharaJayathissa/inspire-frontend"
                }
            ]
        },
        {
            id: 2,
            title: "ENCRYPTOR-CPP",
            description: "C++ file encryption toolkit with Qt GUI and CLI variants, including AES-256-CBC mode with OpenSSL.",
            tags: ["C++", "Qt", "OpenSSL", "Linux"],
            thumbnail: "/project-thumbnails/encryptor-cpp.png",
            url: "https://github.com/KalharaJayathissa/encryptor-cpp"
        },
        {
            id: 3,
            title: "TG_VIDEOS_BOT",
            description: "Telegram bot application to send and store videos with MongoDB-backed persistence and multiple runtime modes.",
            tags: ["Python", "Telegram Bot API", "MongoDB", "Docker"],
            thumbnail: "/project-thumbnails/tg-videos-bot.jpg",
            url: "https://github.com/KalharaJayathissa/tg_videos_bot"
        },
        {
            id: 4,
            title: "4-BIT NANO PROCESSOR",
            description: "Custom 4-bit nanoprocessor built in VHDL and synthesized on the Xilinx Basys 3 FPGA with debugging and control-flow visualization.",
            tags: ["VHDL", "FPGA", "Vivado", "Digital Logic", "Computer Architecture"],
            thumbnail: "/project-thumbnails/four-bit-nano-processor.jpg",
            url: "https://github.com/KalharaJayathissa/4-bit-nano-processor"
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
            <NavBar currentPage="projects" />

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
                        A selection of public projects from my GitHub profile across web development, automation, and security tooling.
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
                            className="group relative bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 overflow-hidden rounded-2xl"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-transparent transition-all duration-500" />

                            {/* Thumbnail */}
                            <div className="relative h-44 md:h-52 w-full overflow-hidden border-b border-green-500/20 bg-black/50">
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative p-6 md:p-8">
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
                                            className="text-xs bg-green-500/10 text-green-500 px-3 py-1 border border-green-500/30 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Indicator */}
                                {project.links ? (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {project.links.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-green-400 hover:text-green-300"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-semibold tracking-wide text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        VIEW REPO
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                )}
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
                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold text-base md:text-lg tracking-wider overflow-hidden hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 rounded-2xl"
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
