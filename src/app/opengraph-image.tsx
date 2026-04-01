import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Saeful Mu'minin — Full Stack Web Developer";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple glow — top right */}
        <div style={{
          position: "absolute", right: "-60px", top: "-80px",
          width: "520px", height: "520px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%)",
        }} />

        {/* Red/orange glow — bottom left */}
        <div style={{
          position: "absolute", left: "-80px", bottom: "-60px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
        }} />

        {/* Decorative big number */}
        <div style={{
          position: "absolute", right: "72px", bottom: "40px",
          fontSize: "280px", fontWeight: 900, lineHeight: 1,
          color: "rgba(255,255,255,0.025)", letterSpacing: "-8px",
        }}>
          FS
        </div>

        {/* Top label row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
          <span style={{
            color: "#6b7280", fontSize: "14px", letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}>
            Available for Work · Jakarta, Indonesia
          </span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, marginBottom: "24px" }}>
          <span style={{ color: "#ffffff", fontSize: "88px", fontWeight: 800, letterSpacing: "-3px" }}>
            Saeful
          </span>
          <span style={{ color: "#ffffff", fontSize: "88px", fontWeight: 800, letterSpacing: "-3px" }}>
            Mu&apos;minin
          </span>
        </div>

        {/* Role chips */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
          {["React", "Next.js", "Laravel", "TypeScript", "Flutter"].map((tag) => (
            <div key={tag} style={{
              padding: "6px 16px", borderRadius: "999px",
              border: "1px solid rgba(99,102,241,0.4)",
              background: "rgba(99,102,241,0.08)",
              color: "#a5b4fc", fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <span style={{
          color: "#9ca3af", fontSize: "19px", lineHeight: 1.6,
          maxWidth: "680px",
        }}>
          Full Stack Web Developer — building pixel-perfect, high-performance digital products from frontend to backend.
        </span>

        {/* Bottom URL bar */}
        <div style={{
          position: "absolute", bottom: "52px", left: "80px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{ width: "28px", height: "1px", background: "#6366f1" }} />
          <span style={{ color: "#4b5563", fontSize: "13px", letterSpacing: "0.15em" }}>
            saefulmuminin.dev
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
