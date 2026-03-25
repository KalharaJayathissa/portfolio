"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const subsections = [
  {
    id: "about",
    title: "ABOUT ME",
    content: (
      <>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ABOUT ME
          </span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
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
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-green-400">EDUCATION</h3>
        <div className="space-y-4 sm:space-y-5">
          <div className="rounded-xl border border-green-500/20 bg-black/35 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
                  Department of Computer Science and Engineering, University of Moratuwa
                </h4>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  Entered the Department of CSE in 2024 by securing 3.85 (as the 150th) of SGPA from first semester examination.
                </p>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-dashed border-green-400/50 bg-black/20 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 text-center px-2 shrink-0">
                CSE Logo
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black/35 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
                  Faculty of Engineering, University of Moratuwa
                </h4>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  Got selected for the course B.Sc Engineering Honours.
                </p>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-dashed border-green-400/50 bg-black/20 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 text-center px-2 shrink-0">
                Logo Slot
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black/35 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">A/L</h4>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  Passed with 2.1400 Z-score in Physical Science stream in 2022 (2023) A/L examination.
                </p>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-dashed border-green-400/50 bg-black/20 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 text-center px-2 shrink-0">
                Logo Slot
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black/35 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">O/L</h4>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  Secured 9 A's in 2019.
                </p>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-dashed border-green-400/50 bg-black/20 flex items-center justify-center text-[10px] sm:text-xs text-gray-400 text-center px-2 shrink-0">
                Logo Slot
              </div>
            </div>
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
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-green-400">EXPERIENCE</h3>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">Full-Stack Developer</h4>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2">Company • 2024 - Present</p>
            <p className="text-gray-300 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              Building full-stack applications using TypeScript, React, and Node.js. Optimizing database queries for 40% performance improvement.
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">Backend Engineer Intern</h4>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2">Tech Startup • 2023 - 2024</p>
            <p className="text-gray-300 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
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
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-green-400">INTERESTS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">System Architecture & Design</span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">Cybersecurity & Linux</span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">Cloud Technologies</span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg">Open Source Projects</span>
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
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-green-400">MORE</h3>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-4">Skills & Tools</h4>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              TypeScript, React, Node.js, Go, Python, PostgreSQL, Docker, AWS, Git, Vim, Linux, GraphQL, REST APIs
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-4">Achievements</h4>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
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
  const mobileScrollerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isBoundaryReleasing, setIsBoundaryReleasing] = useState(false)
  const lastScrollTime = useRef(0)
  const isScrolling = useRef(false)

  const isSectionActive = isDesktop && isSectionVisible && !isBoundaryReleasing

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Detect when entire section is fully on viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.intersectionRatio >= 0.9)
        if (entry.intersectionRatio < 0.9) {
          setIsBoundaryReleasing(false)
        }
      },
      { threshold: 0.9 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isSectionActive ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isSectionActive])

  // Wheel event for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !isSectionActive) return

      const section = sectionRef.current
      const sectionRect = section.getBoundingClientRect()

      // Check if section is in view
      if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) return

      // Throttle to prevent multiple scrolls
      const now = Date.now()
      if (now - lastScrollTime.current < 600) return

      if (isScrolling.current) return

      const scrollDirection = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentIndex + scrollDirection

      // Check boundaries
      if (nextIndex < 0 || nextIndex >= subsections.length) {
        // Release lock in a controlled way so page scroll handoff is smooth
        e.preventDefault()
        setIsBoundaryReleasing(true)

        requestAnimationFrame(() => {
          window.scrollBy({ top: scrollDirection > 0 ? 96 : -96, behavior: "auto" })
        })

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

  const handleMobileScroll = () => {
    if (!mobileScrollerRef.current) return

    const { scrollLeft, clientWidth } = mobileScrollerRef.current
    const index = Math.round(scrollLeft / clientWidth)
    setMobileIndex(index)
  }

  const scrollToMobileIndex = (index: number) => {
    if (!mobileScrollerRef.current) return

    mobileScrollerRef.current.scrollTo({
      left: mobileScrollerRef.current.clientWidth * index,
      behavior: "smooth",
    })
  }

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Pinned Image - Left Side (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center sticky top-0 h-screen flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-64 sm:w-80 md:w-96 lg:w-[30rem] h-96 lg:h-[30rem]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-lg" />
          <div className="relative w-full h-full rounded-lg border-2 border-green-500/30 overflow-hidden bg-black/30">
            <Image
              src="/AboutMe.jpg"
              alt="About Me"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Desktop Scrollable Content */}
      <div className="hidden lg:flex w-full lg:w-1/2 flex-1 h-screen items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">
          <motion.div
            key={`subsection-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            {subsections[currentIndex].content}

            {currentIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="mt-10 flex flex-col items-center"
              >
                <div className="w-6 h-10 rounded-full border border-green-400/80 flex items-start justify-center p-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <span className="mt-2 text-xs uppercase tracking-[0.2em] text-green-300/90">Scroll for more</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Horizontal Subsections */}
      <div className="lg:hidden w-full py-8">
        <motion.div
          initial={{ opacity: 0.5, x: 0 }}
          animate={{ opacity: [0.5, 1, 0.5], x: [0, 10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-green-300/90"
        >
          <span>Swipe sideways</span>
          <span aria-hidden="true">↔</span>
        </motion.div>

        <div
          ref={mobileScrollerRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {subsections.map((section) => (
            <div key={section.id} className="w-full shrink-0 snap-start px-4">
              <div className="min-h-[62vh] rounded-xl border border-green-500/20 bg-black/40 p-5">
                {section.content}

                {section.id === "about" && (
                  <div className="relative w-full max-w-sm h-80 mx-auto mt-6 rounded-lg border-2 border-green-500/30 overflow-hidden bg-black/30">
                    <Image
                      src="/AboutMe.jpg"
                      alt="About Me"
                      fill
                      className="object-cover object-[center_65%]"
                      sizes="100vw"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {subsections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToMobileIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === mobileIndex ? "bg-green-500 w-6 h-2.5" : "bg-gray-600 w-2.5 h-2.5"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
