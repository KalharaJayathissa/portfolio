"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const subsections = [
  {
    id: "about",
    title: "ABOUT ME",
    content: (
      <>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ABOUT ME
          </span>
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
          Passionate engineer with a drive to build scalable systems and solve complex problems through clean code and innovative solutions.
        </p>
      </>
    ),
  },
  {
    id: "education",
    title: "EDUCATION",
    content: (
      <>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-green-400">EDUCATION</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-white">Bachelor of Science in Computer Science</h4>
            <p className="text-gray-400 text-base md:text-lg mt-2">University Name • 2022 - 2024</p>
            <p className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
              Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Management, Network Security
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "experience",
    title: "EXPERIENCE",
    content: (
      <>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-green-400">EXPERIENCE</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-white">Full-Stack Developer</h4>
            <p className="text-gray-400 text-base md:text-lg mt-2">Company • 2024 - Present</p>
            <p className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
              Building full-stack applications using TypeScript, React, and Node.js. Optimizing database queries for 40% performance improvement.
            </p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-white">Backend Engineer Intern</h4>
            <p className="text-gray-400 text-base md:text-lg mt-2">Tech Startup • 2023 - 2024</p>
            <p className="text-gray-300 mt-4 text-base md:text-lg leading-relaxed">
              Developed microservices using Go and implemented Redis caching strategies. Increased API response time by 50%.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "interests",
    title: "INTERESTS",
    content: (
      <>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-green-400">INTERESTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-lg">System Architecture & Design</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-lg">Cybersecurity & Linux</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-lg">Cloud Technologies</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-lg">Open Source Projects</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "more",
    title: "MORE",
    content: (
      <>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-green-400">MORE</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Skills & Tools</h4>
            <p className="text-gray-300 text-lg leading-relaxed">
              TypeScript, React, Node.js, Go, Python, PostgreSQL, Docker, AWS, Git, Vim, Linux, GraphQL, REST APIs
            </p>
          </div>
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">Achievements</h4>
            <p className="text-gray-300 text-lg leading-relaxed">
              Led 5+ projects from concept to production. Open source contributor with 500+ GitHub stars. Technical speaker at 3 conferences.
            </p>
          </div>
        </div>
      </>
    ),
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSectionActive, setIsSectionActive] = useState(false)
  const lastScrollTime = useRef(0)
  const isScrolling = useRef(false)

  // Detect when entire section is fully on viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.isIntersecting)
        if (entry.isIntersecting) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
      },
      { threshold: 0.9 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !isSectionActive) return

      const section = sectionRef.current
      const sectionRect = section.getBoundingClientRect()

      // Check if section is in view
      if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) return

      // Only apply snap on desktop
      if (window.innerWidth < 1024) return

      // Throttle to prevent multiple scrolls
      const now = Date.now()
      if (now - lastScrollTime.current < 600) return

      if (isScrolling.current) return

      const scrollDirection = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentIndex + scrollDirection

      // Check boundaries
      if (nextIndex < 0 || nextIndex >= subsections.length) {
        // Allow page scroll when trying to go past boundaries
        document.body.style.overflow = "auto"
        return
      }

      // Otherwise, prevent page scroll and handle subsection scroll
      e.preventDefault()
      isScrolling.current = true
      lastScrollTime.current = now

      setCurrentIndex(nextIndex)

      setTimeout(() => {
        isScrolling.current = false
      }, 600)
    }

    if (!isSectionActive) return

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [currentIndex, isSectionActive])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Pinned Image - Left Side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center sticky top-0 h-screen flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-72 sm:w-80 lg:w-96 h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-lg" />
          <div className="w-full h-full rounded-lg border-2 border-green-500/30 flex items-center justify-center text-gray-400 bg-black/30">
            <span className="text-center text-sm">About Me Image Placeholder</span>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Content - Right Side */}
      <div className="w-full lg:w-1/2 flex-1 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center px-5 sm:px-10 lg:px-20 xl:px-24 py-12">
          <motion.div
            key={`subsection-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {subsections[currentIndex].content}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
        {subsections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-green-500 w-6" : "bg-gray-600"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
