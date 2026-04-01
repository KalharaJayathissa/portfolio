import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function getRequestIp() {
  const h = await headers()
  const candidates = [
    h.get("x-forwarded-for"),
    h.get("x-real-ip"),
    h.get("cf-connecting-ip"),
    h.get("x-vercel-forwarded-for"),
  ]

  for (const value of candidates) {
    if (!value) continue
    const ip = value.split(",")[0]?.trim()
    if (ip) {
      if (ip === "::1" || ip === "0:0:0:0:0:0:0:1") return "127.0.0.1"
      if (ip.startsWith("::ffff:")) return ip.replace("::ffff:", "")
      return ip
    }
  }

  return "127.0.0.1"
}

export async function GET() {
  return NextResponse.json({ ip: await getRequestIp() })
}
