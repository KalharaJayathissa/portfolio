import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"

export const alt = "Kalhara Jayathissa - engineer and computer science enthusiast"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

export default async function OpenGraphImage() {
  const portraitFile = await readFile(new URL("../public/me.png", import.meta.url))
  const portrait = portraitFile.buffer.slice(
    portraitFile.byteOffset,
    portraitFile.byteOffset + portraitFile.byteLength,
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "white",
          backgroundColor: "#050505",
          backgroundImage:
            "linear-gradient(rgba(53,42,74,.38) 1px, transparent 1px), linear-gradient(90deg, rgba(53,42,74,.38) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "57%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "58px 0 58px 74px",
            zIndex: "2",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              lineHeight: 0.92,
              fontWeight: 800,
              letterSpacing: "-4px",
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: "#22c55e" }}>K</span>
              <span style={{ color: "#d4d4d4" }}>ALHARA</span>
            </div>
            <div style={{ display: "flex", marginTop: 12 }}>
              <span style={{ color: "#d4d4d4" }}>JAYA</span>
              <span style={{ color: "#22c55e" }}>TH</span>
              <span style={{ color: "#d4d4d4" }}>ISSA</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 88,
              height: 5,
              marginTop: 34,
              marginBottom: 24,
              borderRadius: 10,
              background: "#22c55e",
            }}
          />

          <div
            style={{
              display: "flex",
              maxWidth: 540,
              color: "#f5f5f5",
              fontSize: 24,
              lineHeight: 1.45,
              fontWeight: 600,
            }}
          >
            Engineer and computer science enthusiast building practical, secure full-stack products.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 570,
            height: 610,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            background: "radial-gradient(circle at 58% 58%, rgba(34,197,94,.22), transparent 58%)",
          }}
        >
          <img
            src={portrait as unknown as string}
            alt=""
            width="500"
            height="610"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 38,
            height: "100%",
            display: "flex",
            background: "linear-gradient(to bottom, #1f3a2b, #3a6a38)",
          }}
        />
      </div>
    ),
    size,
  )
}
