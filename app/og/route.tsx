import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/** 1200×630 OG image generated from the page title (brief §7). */
export async function GET(req: NextRequest) {
  const title = (req.nextUrl.searchParams.get("title") || "Your next level, prepared properly.").slice(0, 110);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0E1A33", padding: "72px 80px", color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, letterSpacing: 10, fontWeight: 700 }}>ELIVIQUE</div>
          <div style={{ width: 300, height: 2, background: "#C99A3E", marginTop: 14 }} />
          <div style={{ fontSize: 20, letterSpacing: 8, color: "#C99A3E", marginTop: 14 }}>ELEVATE · INNOVATE · THRIVE</div>
        </div>
        <div style={{ fontSize: title.length > 60 ? 54 : 66, lineHeight: 1.12, maxWidth: 1000, display: "flex" }}>{title}</div>
        <div style={{ fontSize: 24, color: "#AEB7CC", display: "flex" }}>elivique.com</div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } }
  );
}
