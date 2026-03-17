"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ViewCounter from "./components/viewcounter"
import ClickSpark from '../components/ClickSpark';
import GlassSurface from "@/components/GlassSurface"
import ShapeGrid from "@/components/ShapeGrid"
import ShinyText from "@/components/ShinyText"


export default function Home() {
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
              <Link href="/" className="text-current border-b-2 border-current pb-1">
                HOME
              </Link>
              <Link href="/projects" className="text-current hover:opacity-70 transition-opacity">
                PROJECTS & PRODUCTS
              </Link>
              <a href="#contact" className="text-current hover:opacity-70 transition-opacity">
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
                An Engineer & Computer scientist<br />
                passionate in Linux, back end systems<br />
                designing and database systems.
              </p>
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

          {/* Right Corner - Full Height Stylish Button */}
          <div className="relative z-20 lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:z-40 w-full lg:w-32 h-20 sm:h-24 lg:h-screen mt-2 sm:mt-4 lg:mt-0">
            <Link
              href="/projects"
              className="group relative block w-full h-full bg-gradient-to-br from-green-500 via-teal-500 to-green-600 hover:from-teal-500 hover:via-green-500 hover:to-teal-600 transition-all duration-500 overflow-hidden"
              style={{
                backgroundSize: '200% 200%',
                animation: `gradientShift ${PROJECT_GRADIENT_DURATION}s ease infinite, pulse ${PROJECT_PULSE_DURATION}s ease-in-out infinite`
              }}
            >
              {/* Pulsing border effect at rest */}
              <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/0 transition-all duration-500"
                style={{
                  animation: `borderPulse ${PROJECT_BORDER_DURATION}s ease-in-out infinite`,
                  animationPlayState: 'running'
                }}
              />

              {/* Animated glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ animation: `glow ${PROJECT_GLOW_DURATION}s ease-in-out infinite` }} />

              {/* Texture overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M0 0h20L0 20z\'/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-row lg:flex-col items-center justify-center p-3 sm:p-4 gap-3 sm:gap-4 lg:gap-0 transform group-hover:scale-105 transition-transform duration-500">
                {/* Icon */}
                <div className="mb-0 lg:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
                  style={{ animation: `float ${PROJECT_FLOAT_DURATION}s ease-in-out infinite` }}>
                  <svg className="w-10 h-10 lg:w-12 lg:h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                </div>

                <div className="text-black text-sm lg:text-base font-bold tracking-[0.2em] text-center writing-mode-vertical transform rotate-0 whitespace-normal leading-tight">
                  PROJECTS
                  <br />
                  <span className="text-xl">&</span>
                  <br />
                  PRODUCTS
                </div>

                {/* Arrow indicator */}
                <div className="mt-0 lg:mt-6 transform group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform -skew-y-12 translate-y-[-100%] group-hover:translate-y-[200%] transition-transform duration-1000" />
              </div>
            </Link>
          </div>
        </div>

        {/* Territory Section - Timeline */}
        <div id="territory" className="min-h-screen bg-gray-50 text-black py-14 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 flex items-center gap-3"
            >
              <span className="text-2xl">📍</span> TERRITORY
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
                    <div className="border-2 border-gray-800 p-6 bg-white shadow-lg relative">
                      <div className="inline-block md:absolute md:-left-2 md:top-0 bg-green-500 text-black px-3 py-1 text-xs font-bold tracking-wider">
                        2021 - PRESENT
                      </div>
                      <h3 className="text-xl font-bold mt-4 md:mt-6 mb-3">LEAD COOK @ GRAY MATTER</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Orchestrating large-scale deployments and managing the purity of the codebase. Scaled operations to 50k DAU.
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
                    <div className="border-2 border-gray-800 p-6 bg-white shadow-lg relative">
                      <div className="inline-block md:absolute md:-right-2 md:top-0 bg-gray-200 border border-gray-800 text-black px-3 py-1 text-xs font-bold tracking-wider">
                        2019 - 2021
                      </div>
                      <h3 className="text-xl font-bold mt-4 md:mt-6 mb-3">DISTRIBUTOR @ LOS POLLOS</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Frontend development for logistics systems. Ensured pixel-perfect delivery on a strict schedule.
                      </p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8">
                    <div className="w-5 h-5 bg-gray-800 rounded-full border-4 border-gray-50"></div>
                  </div>
                </motion.div>

                {/* Item 3 - Right */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex justify-start md:justify-end"
                >
                  <div className="w-full md:w-5/12">
                    <div className="border-2 border-gray-800 p-6 bg-white shadow-lg relative">
                      <div className="inline-block md:absolute md:-left-2 md:top-0 bg-gray-200 border border-gray-800 text-black px-3 py-1 text-xs font-bold tracking-wider">
                        2017 - 2019
                      </div>
                      <h3 className="text-xl font-bold mt-4 md:mt-6 mb-3">FREELANCE CHEMIST</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Building small-batch websites and applications for local businesses. High purity standards from day one.
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
              BETTER CALL <span className="bg-green-500 text-black px-2">ME</span>
            </h2>

            {/* Subtitle */}
            <p className="text-center text-gray-300 mb-8 md:mb-12">
              Ready to cook? Let&apos;s discuss your territory.
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
                  SAY YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Walter White"
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2 tracking-wider">
                  COORDINATES (EMAIL)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="heisenberg@blue.sky"
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2 tracking-wider">
                  THE PLAN
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="We need to cook..."
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border-2 border-white text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-4 px-6 hover:bg-green-600 transition flex items-center justify-center gap-2 text-base md:text-lg tracking-wider"
              >
                <Image src="/flask.png" alt="flask" width={32} height={32} className="inline-block -translate-y-1 md:w-[44px] md:h-[44px]" />
                LET&apos;S COOK
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] border-t-4 border-green-500 py-6 px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <p className="text-sm">
              <span className="text-green-500">[Co]</span> pyright © 2023
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:gap-8 text-sm font-bold tracking-wider">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                GITHUB
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                TWITTER
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
                LINKEDIN
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  )
}
