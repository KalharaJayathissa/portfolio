import { NextResponse } from "next/server"

type ContactRequest = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest
    const name = body.name?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["waleww50@gmail.com"],
        reply_to: email,
        subject: `Message from ${name}`,
        html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Resend error: ${errorText}` },
        { status: 500 }
      )
    }

    const data = (await response.json()) as { id?: string }
    return NextResponse.json({ id: data.id ?? "sent" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
