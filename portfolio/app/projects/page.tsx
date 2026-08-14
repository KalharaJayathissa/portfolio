"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { layerVariants, staggerContainer, cardVariants } from "../../components/PageTransition"
import NavBar from "@/components/NavBar"
import ShapeGrid from "@/components/ShapeGrid"

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            title: "RISEUPMORA WEB APPLICATION",
            description: "Scalable 3-tier enterprise platform orchestrating end-to-end mock interviews for 600+ undergraduates and 19 premier companies. Built with custom RBAC edge proxy, NextAuth JWT session management, real-time timeslot concurrency engine, and secure CV proxy.",
            tags: ["Next.js", "Serverless", "PostgreSQL", "NextAuth", "RBAC", "Full-Stack"],
            thumbnail: "/project-thumbnails/riseupmora.png",
            links: [
                {
                    label: "LIVE DEMO",
                    href: "https://www.riseupmora.lk"
                },
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/RiseUpMora"
                }
            ]
        },
        {
            id: 2,
            title: "Odin's Eye",
            description: "Microservices-based developer analytics platform analyzing 10+ repository metrics for productivity and code-quality insights. Features independent REST services using FastAPI, Spring Boot, PostgreSQL, Redis, RabbitMQ, and Docker on AWS.",
            tags: ["Next.js", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "AWS"],
            thumbnail: "/project-thumbnails/devpulse.png",
            links: [
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/DevPulse"
                }
            ]
        },
        {
            id: 3,
            title: "PRYPIATOS-ENERGY MANAGEMENT SYSTEM (EMS)",
            description: "Real-time ESP32 edge firmware engineered with FreeRTOS mutexes and debounce logic to detect power anomalies across 3 edge nodes with 100% thread-safe state management, MQTT remote configuration, and buffered event reporting.",
            tags: ["ESP32", "C++", "FreeRTOS", "MQTT", "Docker", "GitHub Actions", "IoT"],
            thumbnail: "/project-thumbnails/energy-management-system.png",
            links: [
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/Energy-Management-System"
                }
            ]
        },
        {
            id: 4,
            title: "KESS INSPIRE",
            description: "Production-style A/L Examination Management System serving 500+ users across student, invigilator, examiner, and admin workflows. Includes answer-script submission, NIC-based attendance, examiner marking, and Supabase storage.",
            tags: ["React.js", "Express.js", "Node.js", "Supabase", "Full-Stack"],
            thumbnail: "/project-thumbnails/kess-inspire.jpg",
            links: [
                {
                    label: "LIVE DEMO",
                    href: "https://inspire.morakess.lk"
                },
                {
                    label: "FRONTEND",
                    href: "https://github.com/KalharaJayathissa/inspire-frontend"
                },
                {
                    label: "BACKEND",
                    href: "https://github.com/MORA-KESS/Inspire_backend"
                }
            ]
        },
        {
            id: 5,
            title: "SIYOWIN LMS",
            description: "Full-stack learning management platform serving 1,000+ users with JWT/bcrypt authentication, strict role-based access control, REST APIs, academic tracking, leaderboards, and responsive management dashboards.",
            tags: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "REST API", "Full-Stack"],
            thumbnail: "/project-thumbnails/siyowin.png",
            links: [
                {
                    label: "LIVE DEMO",
                    href: "https://www.siyowin.lk"
                },
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/siyowin"
                }
            ]
        },
        {
            id: 6,
            title: "BRIGHT BUY",
            description: "Full-stack relational e-commerce web platform engineered with 15+ relational database tables, robust Express.js backend services, product catalog management, and integrated React frontend.",
            tags: ["React.js", "Express.js", "MySQL", "Database Systems", "Full-Stack"],
            thumbnail: "/project-thumbnails/bright-buy.png",
            links: [
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/BrightBuy"
                }
            ]
        },
        {
            id: 7,
            title: "ENCRYPTOR-CPP",
            description: "Cross-platform C++ file encryption toolkit supporting AES-256-CBC with OpenSSL on Linux and Android. Features Qt GUI and CLI variants, documented in a published technical article on Medium.",
            tags: ["C++", "Qt", "OpenSSL", "Linux", "Android", "Cryptography"],
            thumbnail: "/project-thumbnails/encryptor-cpp.png",
            links: [
                {
                    label: "ARTICLE",
                    href: "https://medium.com/@kalharajay/building-a-cross-platform-encryption-tool-with-c-from-linux-to-android-6df0fd3e091e"
                },
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/encryptor-cpp"
                }
            ]
        },
        {
            id: 8,
            title: "TG_VIDEOS_BOT",
            description: "Telegram bot application to send and store videos with MongoDB-backed persistence, containerized runtime modes, and automated Telegram Bot API integration.",
            tags: ["Python", "Telegram Bot API", "MongoDB", "Docker"],
            thumbnail: "/project-thumbnails/tg-videos-bot.jpg",
            links: [
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/tg_videos_bot"
                }
            ]
        },
        {
            id: 9,
            title: "4-BIT NANO PROCESSOR",
            description: "Custom 8-core component nanoprocessor designed in VHDL (program counter, program ROM, multiplexers, adders) and synthesized on Xilinx Basys 3 FPGA with debugging and control-flow visualization.",
            tags: ["VHDL", "FPGA", "Vivado", "Assembly", "Digital Logic", "Computer Architecture"],
            thumbnail: "/project-thumbnails/four-bit-nano-processor.jpg",
            links: [
                {
                    label: "CODE REPO",
                    href: "https://github.com/KalharaJayathissa/4-bit-nano-processor"
                }
            ]
        }
    ]

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
                className="relative z-10 px-4 sm:px-6 md:px-12 py-12 md:py-16 pt-20 md:pt-24"
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        PROJECTS <span className="text-green-500">&</span> PRODUCTS
                    </h1>
                    <p className="text-gray-300 max-w-2xl mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
                        A showcase of production platforms, distributed microservices, embedded IoT systems, and open-source tooling built with modern engineering standards.
                    </p>
                </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                variants={layerVariants.cards}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative z-10 px-4 sm:px-6 md:px-12 pb-14 md:pb-20"
            >
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.25 }
                            }}
                            className="group relative bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 overflow-hidden rounded-2xl flex flex-col justify-between shadow-lg shadow-black/60 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                            <div>
                                {/* Thumbnail */}
                                <div className="relative h-48 md:h-52 w-full overflow-hidden border-b border-green-500/20 bg-black/60">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-7">
                                    <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-200">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                                        {project.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="text-[11px] font-medium bg-green-500/10 text-green-400 px-2.5 py-0.5 border border-green-500/30 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Links Footer */}
                            <div className="px-6 pb-6 pt-0 border-t border-green-500/10 mt-auto flex items-center justify-end gap-2 flex-wrap">
                                {project.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-green-400 hover:text-black bg-green-950/40 hover:bg-green-400 border border-green-500/30 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all duration-200"
                                    >
                                        <span>{link.label}</span>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ))}
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
                className="flex justify-center pb-14 md:pb-20 px-4 relative z-10"
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
