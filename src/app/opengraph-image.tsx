import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Using the default Node.js runtime allows for static generation of OG images

export const alt = "Saeful Mu'minin — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load profile image from filesystem instead of fetch to support static generation
  const profileImageBuffer = await readFile(
    join(process.cwd(), "public/profile.png")
  );
  const profileImageArrayBuffer = profileImageBuffer.buffer.slice(
    profileImageBuffer.byteOffset,
    profileImageBuffer.byteOffset + profileImageBuffer.byteLength
  );


  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative elements from original design */}
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-80px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "-80px",
            bottom: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Large Background Initials */}
        <div
          style={{
            position: "absolute",
            right: "120px",
            bottom: "40px",
            fontSize: "280px",
            fontWeight: 900,
            lineHeight: 1,
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-8px",
          }}
        >
          SM
        </div>

        {/* Left Column: Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Status Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Available for Work · Jakarta
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "84px",
                fontWeight: 800,
                letterSpacing: "-2px",
              }}
            >
              Saeful
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: "84px",
                fontWeight: 800,
                letterSpacing: "-2px",
              }}
            >
              Mu&apos;minin
            </span>
          </div>

          {/* Role Tags */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
            {["React", "Next.js", "Laravel", "TS"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(99,102,241,0.4)",
                  background: "rgba(99,102,241,0.12)",
                  color: "#a5b4fc",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Bio tagline */}
          <span
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              lineHeight: 1.6,
              maxWidth: "520px",
            }}
          >
            Full Stack Web Developer — crafting pixel-perfect, high-performance
            digital solutions.
          </span>

          {/* Brand/URL Footer Link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "48px",
            }}
          >
            <div style={{ width: "32px", height: "1px", background: "#6366f1" }} />
            <span
              style={{
                color: "#64748b",
                fontSize: "14px",
                letterSpacing: "0.15em",
                fontWeight: 500,
              }}
            >
              saefulmuminin.dev
            </span>
          </div>
        </div>

        {/* Right Column: Profile Image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "400px",
            height: "400px",
            position: "relative",
            marginRight: "20px",
          }}
        >
          {/* Subtle Glow Behind Image */}
          <div
            style={{
              position: "absolute",
              width: "460px",
              height: "460px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Profile Image with Border */}
          <div
            style={{
              display: "flex",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #1e293b",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={profileImageArrayBuffer as unknown as string}
              alt="Saeful Mu'minin"
              width={360}
              height={360}
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
