"use client"

import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <div className="text-white text-lg font-semibold">
          KAL<span className="text-green-500">HARA</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-white hover:text-green-500 transition">
            HOME
          </a>
          <a href="#" className="text-white hover:text-green-500 transition">
            PROJECTS & PRODUCTS
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex h-[calc(100vh-70px)]">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-12 py-8">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6">
              KAL<span className="text-green-500">HARA</span>
              <br />
              JAY<span className="text-green-500">ATHISSA</span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              An Engineer & Computer scientist passionate in Linux, bash and systems designing and database systems.
            </p>
          </div>
        </div>

        {/* Center Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-80 h-96">
            <Image src="/me.png" alt="me" fill className="object-cover" />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-24 bg-green-800 flex items-center justify-center">
          <div className="text-white text-lg font-bold tracking-widest transform -rotate-90 whitespace-nowrap">
            PROJECTS & PRODUCTS
          </div>
        </div>
      </div>
    </div>
  )
}
