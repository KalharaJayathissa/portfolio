"use client"

import { useEffect } from "react"
import fluidCursor from "@/hooks/use-fluid-cursor"

export default function FluidCursor() {
  useEffect(() => {
    const cleanup = fluidCursor()
    return cleanup
  }, [])

  return (
    <div className="fixed top-0 left-0 z-[1] pointer-events-none">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  )
}