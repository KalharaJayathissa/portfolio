"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Breathing animation for the side tab
const breathingAnimation = `
  @keyframes breathing {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.1);
    }
  }
`
import ViewCounter from "./components/viewcounter"
import ClickSpark from '../components/ClickSpark';
import GlassSurface from "@/components/GlassSurface"
import ShapeGrid from "@/components/ShapeGrid"
import ShinyText from "@/components/ShinyText"
import ContextMenu from "@/components/ContextMenu"
import AboutSection from "@/components/AboutSection"

const LinkedInIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const MediumIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92c-.11.082-.166.213-.147.338v8.494c-.02.125.036.256.146.338l1.255 1.234v.271h-6.315v-.27l1.296-1.261c.127-.127.127-.164.127-.338V8.315l-3.604 9.152h-.487L6.555 8.315v6.163c-.033.264.052.528.235.721l1.688 2.05v.271H3.815v-.27L5.5 15.2c.184-.192.267-.457.232-.721V7.363c.023-.191-.057-.382-.22-.473L4.004 5.686v-.271h4.886l3.77 8.318 3.315-8.318h4.963v.27z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)


export default function Home() {
  // Add breathing animation styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes breathing {
        0%, 100% {
          filter: brightness(1);
        }
        50% {
          filter: brightness(1.1);
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  const navRef = useRef<HTMLElement | null>(null)
  const [isLightBackgroundUnderNav, setIsLightBackgroundUnderNav] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const ANIMATION_RATE = 1
  const HERO_GRID_SPEED_DESKTOP = 0.2 * ANIMATION_RATE
  const HERO_GRID_SPEED_MOBILE = 0.08 * ANIMATION_RATE
  const SHINY_TEXT_SPEED = 4 / ANIMATION_RATE
  const PROJECT_GRADIENT_DURATION = 8 / ANIMATION_RATE
  const PROJECT_PULSE_DURATION = 2 / ANIMATION_RATE
  const PROJECT_BORDER_DURATION = 2 / ANIMATION_RATE
  const PROJECT_GLOW_DURATION = 2 / ANIMATION_RATE
  const PROJECT_FLOAT_DURATION = 3 / ANIMATION_RATE

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kalharajy/", icon: <LinkedInIcon /> },
    { label: "GitHub", href: "https://github.com/KalharaJayathissa", icon: <GitHubIcon /> },
    { label: "Medium", href: "https://medium.com/@kalharajay", icon: <MediumIcon /> },
    { label: "Instagram", href: "https://www.instagram.com/kalhara.jy", icon: <InstagramIcon /> },
    { label: "Facebook", href: "https://web.facebook.com/kalhara.jayathissa.9", icon: <FacebookIcon /> },
  ]

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 640)
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => {
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  useEffect(() => {
    const getBrightness = (rgb: string) => {
      const values = rgb.match(/\d+/g)
      if (!values || values.length < 3) return 0
      const red = Number(values[0])
      const green = Number(values[1])
      const blue = Number(values[2])
      return (red * 299 + green * 587 + blue * 114) / 1000
    }

    const updateNavContrast = () => {
      if (!navRef.current) return

      const rect = navRef.current.getBoundingClientRect()
      const sampleX = Math.round(rect.left + rect.width / 2)
      const sampleY = Math.round(rect.top + rect.height / 2)

      const nav = navRef.current
      nav.style.pointerEvents = "none"
      const elementUnderNav = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null
      nav.style.pointerEvents = ""

      if (!elementUnderNav) return

      let current: HTMLElement | null = elementUnderNav
      let sampledColor = "rgb(0, 0, 0)"

      while (current && current !== document.body) {
        const color = window.getComputedStyle(current).backgroundColor
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          sampledColor = color
          break
        }
        current = current.parentElement
      }

      setIsLightBackgroundUnderNav(getBrightness(sampledColor) >= 140)
    }

    updateNavContrast()
    window.addEventListener("scroll", updateNavContrast, { passive: true })
    window.addEventListener("resize", updateNavContrast)

    return () => {
      window.removeEventListener("scroll", updateNavContrast)
      window.removeEventListener("resize", updateNavContrast)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={27}
      sparkRadius={125}
      sparkCount={10}
      duration={700}
    >
      <ContextMenu />
      <div className="min-h-screen bg-black text-white pt-20 md:pt-24 overflow-x-hidden">
        {/* Navigation */}
        <motion.nav
          ref={navRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-2 sm:px-6 md:px-12 py-4 md:py-6"
        >
          <GlassSurface
            width="100%"
            height={72}
            borderRadius={999}
            backgroundOpacity={0.3}
            saturation={2}
            blur={14}
            borderWidth={0.08}
            distortionScale={-90}
            brightness={64}
            opacity={0.96}
            mixBlendMode="difference"
            className="w-full max-w-[760px] px-3 border border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
          >
            <div className={`w-full flex items-center justify-center flex-wrap sm:flex-nowrap gap-3 sm:gap-8 md:gap-12 text-[10px] sm:text-sm tracking-wider transition-colors ${isLightBackgroundUnderNav ? "text-black" : "text-white"}`}>
              <Link href="/" className="text-current border-b-2 border-current pb-1 transition-transform duration-150 active:scale-95">
                HOME
              </Link>
              <Link href="/projects" className="text-current hover:opacity-70 transition-all duration-150 active:scale-95">
                PROJECTS & PRODUCTS
              </Link>
              <Link href="/read" className="text-current hover:opacity-70 transition-all duration-150 active:scale-95">
                READ
              </Link>
              <a href="#contact" className="text-current hover:opacity-70 transition-all duration-150 active:scale-95">
                CONTACT
              </a>
            </div>
          </GlassSurface>
        </motion.nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)]">
          <ShapeGrid
            speed={isMobileViewport ? HERO_GRID_SPEED_MOBILE : HERO_GRID_SPEED_DESKTOP}
            squareSize={40}
            direction="diagonal"
            borderColor="#352a4a"
            hoverFillColor="#222222"
            shape="square"
            hoverTrailAmount={0}
            className="absolute inset-0 z-0 pointer-events-none opacity-20 sm:opacity-25 lg:opacity-30"
          />
          {/* View Counter - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-40 z-20"
          >
            <ViewCounter pageName="home" />
          </motion.div>

          {/* Left Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-5 sm:px-10 lg:px-20 xl:px-24 pt-12 sm:pt-16 lg:py-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="max-w-md sm:max-w-lg lg:ml-6"
            >
              <h1 className="mb-5 lg:mb-8 leading-tight text-3xl sm:text-5xl lg:text-6xl font-bold">
                <span className="block">
                  <ShinyText
                    text="K"
                    speed={SHINY_TEXT_SPEED}
                    delay={0}
                    color="#22c55e"
                    shineColor="#86efac"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="inline-block"
                  />
                  <ShinyText
                    text="ALHARA"
                    speed={SHINY_TEXT_SPEED}
                    delay={0}
                    color="#8a8a8a"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="inline-block"
                  />
                </span>
                <span className="block">
                  <ShinyText
                    text="JAYA"
                    speed={SHINY_TEXT_SPEED}
                    delay={0.25}
                    color="#8a8a8a"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="inline-block"
                  />
                  <ShinyText
                    text="Th"
                    speed={SHINY_TEXT_SPEED}
                    delay={0.25}
                    color="#22c55e"
                    shineColor="#86efac"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="inline-block"
                  />
                  <ShinyText
                    text="ISSA"
                    speed={SHINY_TEXT_SPEED}
                    delay={0.4}
                    color="#8a8a8a"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="inline-block"
                  />
                </span>
              </h1>
              <p className="text-white text-xs sm:text-base leading-relaxed font-semibold">
                Engineer and computer science enthusiast focused on<br />
                Linux, backend systems, security tooling, and<br />
                building practical full-stack products.
              </p>

              <div className="mt-5 sm:mt-6 flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-white/90 hover:text-green-400 transition-colors duration-300"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative z-10 flex-1 flex items-end justify-center lg:justify-start pb-0 mt-6 lg:mt-0 lg:pl-12 xl:pl-24"
          >
            <div className="relative w-72 sm:w-80 lg:w-96 h-[52vh] sm:h-[60vh] lg:h-[calc(100vh-80px)]">
              <Image src="/me.png" alt="me" fill className="object-cover object-top" />
            </div>
          </motion.div>

          {/* Right Side Tab */}
          <div className="fixed right-0 top-0 bottom-0 z-40 h-screen w-[5.25rem] sm:w-[6rem] lg:w-[7rem]">
            <Link
              href="/projects"
              className="group relative flex h-full w-full items-center justify-center overflow-hidden text-white font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-x-1"
              style={{
                borderRadius: "20px 0 0 20px",
                background: "linear-gradient(to bottom, #1f3a2b 0%, #2d4830 15%, #3a6a38 30%, #3a6a38 100%)",
                animation: "breathing 4s ease-in-out infinite"
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderRadius: "20px 0 0 20px",
                  background: "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0))"
                }}
              />
              <span className="relative z-10 whitespace-nowrap text-[1.3rem] sm:text-[1.45rem] lg:text-[2.45rem] leading-none [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                PROJECTS &amp; PRODUCTS
              </span>
            </Link>
          </div>
        </div>

        {/* About Me Section */}
        <AboutSection />

        {/* Territory Section - Timeline */}
        <div id="territory" className="min-h-screen bg-gray-50 text-black py-14 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-10 md:mb-16"
            >
              JOURNEY
            </motion.h2>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>

              {/* Timeline Items */}
              <div className="space-y-10 md:space-y-24">
                {/* Item 1 - Right */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex justify-start md:justify-end"
                >
                  <div className="w-full md:w-5/12">
                    <div className="border-2 border-gray-800 p-6 bg-white shadow-lg relative rounded-2xl">
                      <div className="inline-block md:absolute md:-left-2 md:top-0 bg-green-500 text-black px-3 py-1 text-xs font-bold tracking-wider">
                        MAR 2024 - PRESENT
                      </div>
                      <h3 className="text-xl font-bold mt-4 md:mt-6 mb-3">UNDERGRADUATE</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        Department of Computer Science &amp; Engineering, University of Moratuwa · Full-time
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Engineering
                      </p>
                    </div>
                  </div>
                  {/* Green Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8">
                    <div className="w-5 h-5 bg-green-500 rounded-full border-4 border-gray-50"></div>
                  </div>
                </motion.div>

                {/* Item 2 - Left */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex justify-start"
                >
                  <div className="w-full md:w-5/12">
                    <div className="border-2 border-gray-800 p-6 bg-white shadow-lg relative rounded-2xl">
                      <div className="inline-block md:absolute md:-right-2 md:top-0 bg-gray-200 border border-gray-800 text-black px-3 py-1 text-xs font-bold tracking-wider">
                        JUN 2023 - PRESENT
                      </div>
                      <h3 className="text-xl font-bold mt-4 md:mt-6 mb-3">A/L TUTOR</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        Self Employed · Part-time
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        A/L Physics &amp; Combined Mathematics Tutor | Sinhala &amp; English Medium
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Helping students excel in Advanced Level Physics and Combined Mathematics through clear explanations and structured learning. I provide comprehensive tutoring in both Sinhala and English, focusing on concept mastery, problem-solving techniques, and exam success strategies.
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed mt-2">
                        Physics Education and Tutoring
                      </p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8">
                    <div className="w-5 h-5 bg-gray-800 rounded-full border-4 border-gray-50"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
              LET&apos;S <span className="bg-green-500 text-black px-2">COOK</span>
            </h2>

            {/* Subtitle */}
            <p className="text-center italic text-gray-300 mb-8 md:mb-12">
              If you want the blue stuff, time to call me!
            </p>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Subject Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2 tracking-wider">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Walter White"
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition rounded-2xl"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="heisenberg@abqmail.com"
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition rounded-2xl"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2 tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Say my name... or tell me about your project."
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition resize-none rounded-2xl"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-4 px-6 hover:bg-green-600 transition flex items-center justify-center gap-2 text-base md:text-lg tracking-wider rounded-2xl"
              >
                <Image src="/flask.png" alt="flask" width={32} height={32} className="inline-block -translate-y-1 md:w-[44px] md:h-[44px]" />
                SEND MESSAGE
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] border-t-4 border-green-500 py-6 px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <p className="text-sm">
              <span className="text-green-500">©</span> 2026 Kalhara Jayathissa
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8 text-sm font-bold tracking-wider">
              <a href="https://github.com/KalharaJayathissa" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/kalharajy/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                LINKEDIN
              </a>
              <a href="https://github.com/KalharaJayathissa/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                PORTFOLIO
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  )
}
