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
    if (ip) return ip
  }

  return "unknown"
}

export async function GET() {
  return NextResponse.json({ ip: await getRequestIp() })
}
