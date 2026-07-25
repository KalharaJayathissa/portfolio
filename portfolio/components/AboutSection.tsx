"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"

const subsections = [
  {
    id: "about",
    title: "ABOUT ME",
    content: (
      <>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ABOUT ME
          </span>
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
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
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">EDUCATION</h3>
        <div className="space-y-2.5 sm:space-y-3">
          <div className="rounded-xl border border-green-500/20 bg-black p-3 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  Department of Computer Science and Engineering, University of Moratuwa
                </h4>
                <p className="text-gray-300 mt-1 text-xs sm:text-sm leading-relaxed">
                  Entered the Department of CSE in 2024 by securing 3.85 (as the 150th of the faculty) of SGPA from first semester examination.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/cse_logo.jpeg" alt="Department of Computer Science and Engineering logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  Faculty of Engineering, University of Moratuwa
                </h4>
                <p className="text-gray-300 mt-1 text-xs sm:text-sm leading-relaxed">
                  Got selected for the course B.Sc Engineering Honours.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/uom_logo.jpg" alt="University of Moratuwa logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">A/L</h4>
                <p className="text-gray-300 mt-1 text-xs sm:text-sm leading-relaxed">
                  Passed with 2.1400 Z-score in Physical Science stream in 2022 (2023) A/L examination.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/rcc.jpeg" alt="RCC logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">O/L</h4>
                <p className="text-gray-300 mt-1 text-xs sm:text-sm leading-relaxed">
                  Secured 9 A's in 2019.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/rcc.jpeg" alt="RCC logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "licenses-certifications",
    title: "LICENSES & CERTIFICATIONS",
    content: (
      <>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">LICENSES &amp; CERTIFICATIONS</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  AWS Academy Graduate - Microservices and CI/CD Pipeline Builder - Training Badge
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Amazon Web Services (AWS)
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Issued Mar 2026
                </p>
                <a
                  href="https://www.credly.com/badges/66e55e42-43e5-4e18-af0f-ffb248c2d463/linked_in_profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-2 text-green-400 text-xs sm:text-sm hover:text-green-300 transition-all duration-150 active:scale-95"
                >
                  View credential
                </a>
              </div>
              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl border border-green-400/50 bg-black text-sm sm:text-base font-bold text-green-300 overflow-hidden shrink-0">
                AWS
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                  AWS Academy Graduate - Cloud Foundations - Training Badge
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Amazon Web Services (AWS)
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Issued Feb 2026
                </p>
                <a
                  href="https://www.credly.com/go/ulO0P2wT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-2 text-green-400 text-xs sm:text-sm hover:text-green-300 transition-all duration-150 active:scale-95"
                >
                  Show credential
                </a>
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  Amazon Web Services (AWS), AWS Identity and Access Management (AWS IAM) and +3 skills
                </p>
              </div>
              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl border border-green-400/50 bg-black text-sm sm:text-base font-bold text-green-300 overflow-hidden shrink-0">
                AWS
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
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">EXPERIENCE</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">Undergraduate</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Department of Computer Science &amp; Engineering, University of Moratuwa · Full-time
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Mar 2024 - Present · 2 yrs 2 mos
            </p>
            <p className="text-green-400 text-xs sm:text-sm mt-2 font-medium">
              Engineering
            </p>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">A/L Tutor</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Self Employed · Part-time
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Jun 2023 - Present · 2 yrs 11 mos
            </p>
            <p className="text-green-400 text-xs sm:text-sm mt-2 font-medium">
              A/L Physics &amp; Combined Mathematics Tutor | Sinhala &amp; English Medium
            </p>
            <p className="text-gray-300 mt-2 text-xs sm:text-sm leading-relaxed">
              Helping students excel in Advanced Level Physics and Combined Mathematics through clear explanations and structured learning. I provide comprehensive tutoring in both Sinhala and English, focusing on concept mastery, problem-solving techniques, and exam success strategies.
            </p>
            <p className="text-green-400 text-xs sm:text-sm mt-2 font-medium">
              Physics Education and Tutoring
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "honours-awards",
    title: "HONOURS AND AWARDS",
    content: (
      <>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">HONOURS AND AWARDS</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">1st Runner-Up at Cypher 3.0 Hackathon</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Issued by IEEE WIE Affinity Group of KDU · Oct 2025
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Associated with University of Moratuwa
                </p>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm leading-relaxed">
                  Secured 1st Runner-Up position at Cypher 3.0, an inter-university hackathon organized by IEEE WIE Affinity Group of KDU. Competed alongside talented teams, demonstrating strong problem-solving skills, technical expertise, and teamwork in developing innovative technology solutions.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/uom_logo.jpg" alt="University of Moratuwa logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black p-3.5 sm:p-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white">SLIoT Challenge 2025 Semi-Finalists</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Issued by Department of Computer Science and Engineering, University of Moratuwa · Mar 2025
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Associated with University of Moratuwa
                </p>
                <p className="text-gray-300 mt-2 text-xs sm:text-sm leading-relaxed">
                  Semi-Finalist – Sri Lanka&apos;s Largest IoT Competition. Honored to lead Team AmpArts in Sri Lanka&apos;s premier IoT competition, organized by the Department of Computer Science &amp; Engineering, University of Moratuwa. Our team was selected among the top 13 semi-finalists, showcasing innovation and technical expertise in IoT solutions.
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-green-400/50 bg-black overflow-hidden shrink-0 p-1.5">
                <Image src="/uom_logo.jpg" alt="University of Moratuwa logo" fill className="object-contain" sizes="56px" />
              </div>
            </div>
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
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">INTERESTS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base">Networking</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base">System Architecture & Design</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base">Cybersecurity & Linux</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base">Cloud Technologies</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-gray-300 text-xs sm:text-sm md:text-base">Open Source Projects</span>
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
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-green-400">MORE</h3>
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">Skills & Tools</h4>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              TypeScript, React, Node.js, Go, Python, PostgreSQL, Docker, AWS, Git, Vim, Linux, GraphQL, REST APIs
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
      className="relative min-h-screen bg-transparent text-white flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Download CV - Left Side (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/4 xl:w-1/4 items-center justify-center sticky top-0 h-screen flex-shrink-0 border-r border-green-500/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="/CV.pdf"
            download="Kalhara_Jayathissa_CV.pdf"
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base sm:text-lg font-semibold text-green-400 bg-black border border-green-500 rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] active:scale-95 cursor-pointer"
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Download My CV</span>
          </a>
        </motion.div>
      </div>

      {/* Desktop Scrollable Content */}
      <div className="hidden lg:flex w-full lg:w-3/4 xl:w-3/4 flex-1 h-screen items-center justify-center overflow-hidden relative">
        {/* Desktop Vertical Dot Navigation (Minimalist) */}
        <div className="absolute left-6 xl:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
          {subsections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentIndex(index)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Navigate to ${section.title}`}
            >
              {/* Simple Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-2.5 h-2.5 bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)] scale-110"
                    : "w-2 h-2 bg-gray-600/60 group-hover:bg-green-400/70"
                }`}
              />

              {/* Minimal Tooltip */}
              <span className="absolute left-6 px-2 py-1 rounded bg-black/90 border border-green-500/20 text-green-400 text-[10px] font-medium tracking-wider whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-md">
                {section.title}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full h-full flex items-center justify-center px-6 md:px-10 lg:px-14 xl:px-16 py-4 sm:py-6 lg:py-8">
          <motion.div
            key={`subsection-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl xl:max-w-4xl"
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
              <div className="min-h-[62vh] rounded-2xl border border-green-500/20 bg-black p-5">
                {section.content}

                {section.id === "about" && (
                  <div className="mt-8 flex justify-center">
                    <a
                      href="/CV.pdf"
                      download="Kalhara_Jayathissa_CV.pdf"
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-green-400 bg-black border border-green-500 rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] active:scale-95 cursor-pointer"
                    >
                      <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                      <span>Download My CV</span>
                    </a>
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
