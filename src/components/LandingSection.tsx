"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// ── Seeded deterministic RNG (no hydration mismatch) ──────────────────────────
function seededRNG(seed: number) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0x100000000; };
}

const CODE_TOKENS = [
  "</>", "{ }", "const", "=>", "[ ]", "//", "import", "( )", ".map()",
  ";", "async", "return", "function", "===", "null", "typeof", "true",
  "&&", "??", "class", "<T>", "export", "default", "let", "if", "else",
  "for", "while", "new", "this", "try", "catch", "...", "?.", "++",
  "--", "**", "!==", ">=", "<=", "npm", "@types", "void", "break",
  "throw", "super", "|>", "~", "interface", "type", "await", "yield",
  "props", "useRef", "useState", "useEffect", "tsx", "pkg", "ssh", "::",
];

const ANIM_TYPES = ["codeFloat", "codeFloatB"];

const SYMBOLS = (() => {
  const rng = seededRNG(42);
  return Array.from({ length: 100 }, (_, i) => ({
    text:     CODE_TOKENS[Math.floor(rng() * CODE_TOKENS.length)],
    x:        +(rng() * 94).toFixed(2),
    y:        +(rng() * 94).toFixed(2),
    size:     11 + Math.floor(rng() * 26),
    colorIdx: Math.floor(rng() * 9),
    depth:    1 + Math.floor(rng() * 3),
    delay:    +(rng() * 6).toFixed(1),
    dur:      +(7 + rng() * 8).toFixed(1),
    anim:     ANIM_TYPES[i % 2],
    opacity:  +(0.07 + rng() * 0.13).toFixed(2),
  }));
})();

const DARK_PALETTE  = ["#ef4444","#f97316","#fb923c","#ec4899","#a855f7","#06b6d4","#22c55e","#eab308","#e879f9"];
const LIGHT_PALETTE = ["#6366f1","#8b5cf6","#3b82f6","#14b8a6","#a855f7","#f43f5e","#10b981","#0ea5e9","#d946ef"];

const TECH_PILLS = [
  { name: "Next.js",    color: "#d4d4d4", bg: "rgba(212,212,212,0.10)", border: "rgba(212,212,212,0.45)" },
  { name: "React",      color: "#61DAFB", bg: "rgba(97,218,251,0.10)",  border: "rgba(97,218,251,0.45)"  },
  { name: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.14)",  border: "rgba(49,120,198,0.55)"  },
  { name: "Laravel",    color: "#FF2D20", bg: "rgba(255,45,32,0.12)",   border: "rgba(255,45,32,0.55)"   },
  { name: "Tailwind",   color: "#06B6D4", bg: "rgba(6,182,212,0.10)",   border: "rgba(6,182,212,0.45)"   },
];

function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-right select-none">
      <p className="text-xs font-label text-outline tracking-widest">{date}</p>
      <p className="text-xl font-headline font-semibold text-primary">{time}</p>
    </div>
  );
}

// ── 3D card modal ─────────────────────────────────────────────────────────────
function Card3DModal({ src, onClose, isDark }: { src: string; onClose: () => void; isDark: boolean }) {
  const [rot, setRot] = useState({ x: 10, y: -25 });
  const anim = useRef({ rotX: 10, rotY: -25, velX: 0, velY: 0.28, dragging: false, lastX: 0, lastY: 0 });

  // Single RAF loop: inertia + auto-spin
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const s = anim.current;
      if (!s.dragging) {
        const slow = Math.abs(s.velX) < 0.03 && Math.abs(s.velY) < 0.15;
        if (slow) { s.velY = 0.28; s.velX = 0; }
        else { s.velX *= 0.93; s.velY *= 0.95; }
        s.rotX = Math.max(-65, Math.min(65, s.rotX + s.velX));
        s.rotY += s.velY;
        setRot({ x: s.rotX, y: s.rotY });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Escape to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const startDrag = (x: number, y: number) => {
    anim.current.dragging = true;
    anim.current.velX = 0; anim.current.velY = 0;
    anim.current.lastX = x; anim.current.lastY = y;
  };
  const moveDrag = (x: number, y: number) => {
    const s = anim.current;
    if (!s.dragging) return;
    const dx = x - s.lastX, dy = y - s.lastY;
    s.lastX = x; s.lastY = y;
    s.velX = -dy * 0.45; s.velY = dx * 0.45;
    s.rotX = Math.max(-65, Math.min(65, s.rotX + s.velX));
    s.rotY += s.velY;
    setRot({ x: s.rotX, y: s.rotY });
  };
  const endDrag = () => { anim.current.dragging = false; };

  // Dynamic shine follows rotation
  const shineX = Math.max(5, Math.min(95, 50 + rot.y * 0.35));
  const shineY = Math.max(5, Math.min(95, 50 - rot.x * 0.35));

  const accentGrad = isDark
    ? "linear-gradient(135deg, #ef4444, #f97316, #ec4899)"
    : "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)";

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center select-none"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(18px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-container-highest transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>

      {/* Hint */}
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-label tracking-[0.4em] text-outline uppercase pointer-events-none">
        Drag to rotate · Click outside to close
      </p>

      {/* 3D scene */}
      <div
        style={{ perspective: "1000px" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={endDrag}
      >
        <div
          style={{
            width: 500,
            height: 340,
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            cursor: anim.current.dragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {/* Front — image + shine */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              boxShadow: isDark
                ? "0 40px 100px rgba(0,0,0,0.95), 0 0 60px rgba(239,68,68,0.18)"
                : "0 40px 100px rgba(0,0,0,0.55), 0 0 60px rgba(99,102,241,0.14)",
            }}
          >
            <img src={src} className="w-full h-full object-cover" alt="3D project view" draggable={false} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at ${shineX}% ${shineY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
              }}
            />
            {/* Edge glow on border */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.12)` }}
            />
          </div>

          {/* Back — branded */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-5"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: isDark ? "#0e0505" : "#f0f0ff",
              boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
          >
            <div
              className="text-5xl font-mono font-black"
              style={{
                backgroundImage: accentGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &lt;/&gt;
            </div>
            <p className="text-[10px] font-label font-bold tracking-[0.4em] text-outline uppercase">Full Stack Project</p>
            <div className="flex gap-2 mt-1">
              {["React", "Next.js", "Laravel"].map((t) => (
                <span key={t} className="text-[9px] font-label px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom edge depth strip */}
          <div
            className="absolute left-0 right-0 bottom-0 h-3"
            style={{
              transform: "rotateX(90deg) translateZ(-1px)",
              transformOrigin: "center bottom",
              background: isDark ? "#1a0808" : "#c4c4d0",
              backfaceVisibility: "hidden",
            }}
          />

          {/* Right edge depth strip */}
          <div
            className="absolute top-0 bottom-0 right-0 w-3"
            style={{
              transform: "rotateY(-90deg) translateZ(-1px)",
              transformOrigin: "right center",
              background: isDark ? "#1a0808" : "#c4c4d0",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Project card with cursor spotlight: grayscale everywhere except under cursor ─
function ProjectCard({
  src, rotate, shift, gray, index, onOpen,
}: {
  src: string; rotate: string; shift: string;
  gray: boolean; index: number; onOpen: (s: string) => void;
}) {
  const [cur, setCur] = useState({ x: 0, y: 0, inside: false });

  const mask = cur.inside
    ? `radial-gradient(circle 95px at ${cur.x}px ${cur.y}px, transparent 30%, rgba(0,0,0,0.75) 60%, black 82%)`
    : "linear-gradient(black,black)"; // full black = grayscale layer fully visible

  return (
    <div
      onClick={() => onOpen(src)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCur({ x: e.clientX - r.left, y: e.clientY - r.top, inside: true });
      }}
      onMouseLeave={() => setCur((c) => ({ ...c, inside: false }))}
      className={`group relative flex-1 h-36 rounded-xl overflow-hidden shadow-2xl ${rotate} ${shift} hover:rotate-0 hover:!mb-0 hover:scale-105 transition-all duration-500 origin-bottom cursor-pointer`}
    >
      {/* Base: always full-color */}
      <img src={src} alt={`Project ${index + 1}`} className="w-full h-full object-cover" draggable={false} />

      {/* Grayscale overlay with cursor-shaped hole (only for gray cards) */}
      {gray && (
        <img
          src={src} alt="" aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          style={{
            filter: "grayscale(1) brightness(0.85)",
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
      )}

      {/* 3D hint overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="material-symbols-outlined text-[14px] text-white">view_in_ar</span>
          <span className="text-[9px] font-label font-bold text-white tracking-[0.2em] uppercase">3D View</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 40, y: 50 });
  const [hlMouse, setHlMouse] = useState({ x: 50, y: 50 });
  const [hlHover, setHlHover] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  const glowColor = isDark
    ? `radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(239,68,68,0.08) 0%, rgba(139,0,0,0.04) 40%, transparent 70%)`
    : `radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)`;

  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;
  const PF = 0.14; // parallax factor (px per mouse-unit per depth)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col px-4 sm:px-8 md:px-12 py-6 sm:py-8 bg-background overflow-hidden"
    >
      {/* ── Coding-themed animated background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* 100 floating code tokens — multi-color, parallax by depth */}
        {SYMBOLS.map((s, i) => {
          const color = palette[s.colorIdx];
          const px = (mouse.x - 50) * s.depth * PF;
          const py = (mouse.y - 50) * s.depth * PF;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${s.x}%`,
                top:  `${s.y}%`,
                transform: `translate(${px}px, ${py}px)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <span
                className="font-mono font-bold select-none block"
                style={{
                  fontSize: s.size,
                  color,
                  opacity: s.opacity,
                  animation: `${s.anim} ${s.dur}s ease-in-out ${s.delay}s infinite`,
                  textShadow: isDark ? `0 0 18px ${color}99` : `0 0 12px ${color}44`,
                }}
              >
                {s.text}
              </span>
            </div>
          );
        })}

        {/* Geometric shapes — each on a parallax depth layer */}
        {/* Hexagon large */}
        <div className="absolute" style={{ right: "10%", top: "12%", transform: `translate(${(mouse.x-50)*2*PF}px,${(mouse.y-50)*2*PF}px)`, transition: "transform 0.3s ease-out" }}>
          <svg width="110" height="110" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlow 20s linear infinite", opacity: isDark ? 0.12 : 0.09 }}>
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke={palette[0]} strokeWidth="2" />
            <polygon points="50,18 82,34 82,66 50,82 18,66 18,34" stroke={palette[4]} strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="50" cy="50" r="8" stroke={palette[2]} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Hexagon small */}
        <div className="absolute" style={{ left: "8%", top: "35%", transform: `translate(${(mouse.x-50)*1*PF}px,${(mouse.y-50)*1*PF}px)`, transition: "transform 0.3s ease-out" }}>
          <svg width="65" height="65" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlowReverse 18s linear infinite", opacity: isDark ? 0.11 : 0.08 }}>
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke={palette[3]} strokeWidth="2.5" strokeDasharray="5 4" />
          </svg>
        </div>

        {/* Triangle */}
        <div className="absolute" style={{ left: "5%", bottom: "18%", transform: `translate(${(mouse.x-50)*3*PF}px,${(mouse.y-50)*3*PF}px)`, transition: "transform 0.25s ease-out" }}>
          <svg width="85" height="85" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlowReverse 25s linear infinite", opacity: isDark ? 0.11 : 0.08 }}>
            <polygon points="50,8 94,88 6,88" stroke={palette[1]} strokeWidth="2" />
            <polygon points="50,26 78,76 22,76" stroke={palette[5]} strokeWidth="1" strokeDasharray="3 4" />
          </svg>
        </div>

        {/* Orbit ring */}
        <div className="absolute" style={{ left: "40%", top: "28%", transform: `translate(${(mouse.x-50)*2*PF}px,${(mouse.y-50)*2*PF}px)`, transition: "transform 0.3s ease-out" }}>
          <svg width="75" height="75" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlow 30s linear infinite", opacity: isDark ? 0.10 : 0.07 }}>
            <circle cx="50" cy="50" r="44" stroke={palette[6]} strokeWidth="1.5" strokeDasharray="6 5" />
            <circle cx="50" cy="6" r="5" fill={palette[6]} />
          </svg>
        </div>

        {/* Rotated square */}
        <div className="absolute" style={{ right: "8%", bottom: "15%", transform: `translate(${(mouse.x-50)*1*PF}px,${(mouse.y-50)*1*PF}px)`, transition: "transform 0.35s ease-out" }}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlow 22s linear infinite", opacity: isDark ? 0.10 : 0.08 }}>
            <rect x="15" y="15" width="70" height="70" stroke={palette[7]} strokeWidth="2" transform="rotate(15 50 50)" />
            <rect x="28" y="28" width="44" height="44" stroke={palette[2]} strokeWidth="1" strokeDasharray="4 3" transform="rotate(15 50 50)" />
          </svg>
        </div>

        {/* Diamond */}
        <div className="absolute" style={{ left: "46%", top: "5%", transform: `translate(${(mouse.x-50)*3*PF}px,${(mouse.y-50)*3*PF}px)`, transition: "transform 0.2s ease-out" }}>
          <svg width="55" height="55" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlowReverse 28s linear infinite", opacity: isDark ? 0.11 : 0.08 }}>
            <polygon points="50,5 95,50 50,95 5,50" stroke={palette[8]} strokeWidth="2" />
            <polygon points="50,22 78,50 50,78 22,50" stroke={palette[4]} strokeWidth="1" strokeDasharray="4 3" />
          </svg>
        </div>

        {/* Cross + ring */}
        <div className="absolute" style={{ right: "5%", top: "50%", transform: `translate(${(mouse.x-50)*2*PF}px,${(mouse.y-50)*2*PF}px)`, transition: "transform 0.3s ease-out" }}>
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlow 16s linear infinite", opacity: isDark ? 0.11 : 0.08 }}>
            <line x1="50" y1="10" x2="50" y2="90" stroke={palette[0]} strokeWidth="2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke={palette[0]} strokeWidth="2" />
            <circle cx="50" cy="50" r="20" stroke={palette[3]} strokeWidth="1.5" strokeDasharray="5 4" />
          </svg>
        </div>

        {/* Pentagon — bottom center */}
        <div className="absolute" style={{ left: "28%", bottom: "10%", transform: `translate(${(mouse.x-50)*3*PF}px,${(mouse.y-50)*3*PF}px)`, transition: "transform 0.2s ease-out" }}>
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ animation: "spinSlowReverse 32s linear infinite", opacity: isDark ? 0.10 : 0.07 }}>
            <polygon points="50,5 97,36 79,91 21,91 3,36" stroke={palette[5]} strokeWidth="2" />
            <polygon points="50,20 80,42 69,77 31,77 20,42" stroke={palette[1]} strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Dot grid — scattered with color variety */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => (
            <div
              key={`dot-${row}-${col}`}
              className="absolute rounded-full"
              style={{
                left: `${6 + col * 13}%`,
                top:  `${8 + row * 12}%`,
                width: 3,
                height: 3,
                background: palette[(row * 3 + col * 2) % palette.length],
                opacity: isDark ? 0.18 : 0.12,
                animation: `pulseFade ${3 + (row + col) * 0.4}s ease-in-out ${(row * col * 0.2).toFixed(1)}s infinite`,
              }}
            />
          ))
        )}
      </div>

      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-200"
        style={{ background: glowColor }}
      />

      {/* Grain overlay — dark mode only */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
      )}

      {/* Clock top right */}
      <div className="relative flex justify-end">
        <Clock />
      </div>

      {/* Headline block — mouse-reactive parallax */}
      <div
        ref={headlineRef}
        className="relative mt-6 sm:mt-8 max-w-2xl"
        onMouseEnter={() => setHlHover(true)}
        onMouseLeave={() => { setHlHover(false); setHlMouse({ x: 50, y: 50 }); }}
        onMouseMove={(e) => {
          const rect = headlineRef.current?.getBoundingClientRect();
          if (!rect) return;
          setHlMouse({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
      >
        {/* Cursor glow that follows the mouse within the headline area */}
        <div
          className="absolute -inset-10 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(380px circle at ${hlMouse.x}% ${hlMouse.y}%, ${isDark ? "rgba(239,68,68,0.11)" : "rgba(99,102,241,0.10)"} 0%, transparent 65%)`,
            opacity: hlHover ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* Available badge */}
        <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.07}px,${(hlMouse.y - 50) * 0.04}px)`, transition: "transform 0.25s ease-out" }}>
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/8 mb-7"
            style={{ animation: "slideUpFade 0.5s ease forwards" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-label font-bold tracking-[0.35em] text-green-400 uppercase select-none">
              {t.landing.badge}
            </span>
          </div>
        </div>

        {/* Headline — 3-line styled, each line at a different parallax depth */}
        <h2 className="font-headline font-bold leading-[1.08] tracking-tighter">
          {/* Line 1 — shallow depth */}
          <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.10}px,${(hlMouse.y - 50) * 0.06}px)`, transition: "transform 0.22s ease-out" }}>
            <span
              className="block text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] text-on-surface-variant"
              style={{ animation: "slideUpFade 0.55s ease 0.05s both" }}
            >
              {t.landing.h1}
            </span>
          </div>

          {/* Line 2 — deepest depth, most movement, glows on hover */}
          <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.22}px,${(hlMouse.y - 50) * 0.13}px)`, transition: "transform 0.16s ease-out" }}>
            <span
              className="block text-4xl sm:text-5xl lg:text-6xl xl:text-[72px]"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(110deg, #ef4444 0%, #f97316 40%, #ec4899 80%)"
                  : "linear-gradient(110deg, #6366f1 0%, #8b5cf6 45%, #a855f7 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "slideUpFade 0.6s ease 0.12s both",
                filter: hlHover
                  ? isDark
                    ? "drop-shadow(0 0 22px rgba(239,68,68,0.40))"
                    : "drop-shadow(0 0 22px rgba(99,102,241,0.35))"
                  : "none",
                transition: "filter 0.3s ease",
              }}
            >
              {t.landing.h2}
            </span>
          </div>

          {/* Line 3 — medium depth */}
          <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.15}px,${(hlMouse.y - 50) * 0.09}px)`, transition: "transform 0.19s ease-out" }}>
            <span
              className="relative block text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] text-primary"
              style={{ animation: "slideUpFade 0.65s ease 0.2s both" }}
            >
              {t.landing.h3}
              <span
                className="absolute -bottom-1.5 left-0 h-[2px] rounded-full"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(to right, #ef4444, #f97316, transparent)"
                    : "linear-gradient(to right, #6366f1, #a855f7, transparent)",
                  animation: "drawLine 1s ease 0.8s both",
                }}
              />
            </span>
          </div>
        </h2>

        {/* Tagline — very subtle drift */}
        <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.06}px,${(hlMouse.y - 50) * 0.04}px)`, transition: "transform 0.28s ease-out" }}>
          <p
            className="mt-6 text-sm text-on-surface-variant leading-relaxed max-w-md"
            style={{ animation: "slideUpFade 0.6s ease 0.3s both" }}
          >
            {t.landing.tagline}
          </p>
        </div>

        {/* Tech pills */}
        <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.04}px,${(hlMouse.y - 50) * 0.03}px)`, transition: "transform 0.30s ease-out" }}>
          <div
            className="mt-4 flex flex-wrap gap-2"
            style={{ animation: "slideUpFade 0.6s ease 0.38s both" }}
          >
            {TECH_PILLS.map((tech) => {
              const isHov = hoveredTech === tech.name;
              return (
                <span
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="text-[10px] font-label font-semibold px-3 py-1 rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-all duration-300"
                  style={{
                    ...(isHov && {
                      background:  tech.bg,
                      color:       tech.color,
                      borderColor: tech.border,
                      boxShadow:   `0 0 12px ${tech.bg}`,
                    }),
                  }}
                >
                  {tech.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ transform: `translate(${(hlMouse.x - 50) * 0.04}px,${(hlMouse.y - 50) * 0.03}px)`, transition: "transform 0.30s ease-out" }}>
          <div
            className="mt-6 sm:mt-8 flex flex-wrap gap-3"
            style={{ animation: "slideUpFade 0.6s ease 0.46s both" }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary text-sm font-label font-semibold hover:opacity-85 transition-opacity"
            >
              {t.landing.ctaWork}
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant text-sm font-label font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              {t.landing.ctaContact}
            </a>
          </div>
        </div>
      </div>

      {/* Images + Stats */}
      <div className="relative mt-8 sm:mt-10 flex flex-col gap-6 sm:gap-8">

        {/* Horizontal image row — click for 3D view, show 2 on mobile, 4 on sm+ */}
        <div className="flex gap-2 sm:gap-3 items-end">
          {([
            { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4kncwFsaksBy5GPVA8TG6r_VQrW-fUWtSSyNpl1kf8Tegu0ND9iIC2tO7_hmaebeA3WSZGujZC1IhaG3NnlIpElsh4GyKwwxtC6ztCUK4qXmRpX1oS-MSOdtHe_sc5Ja4DVfsrptzvSMbzpIAoxYdPZANG_Tyw8WE6ll9ojlIYfnefIwH_C4MO_wSUKLoQeGpBeENPLanaZnBHK6XLdO749c8iQWpvrQyZ404tcF9bMkdgjr6wrnfKszwHDoFY-Iptcy-MFfLUQ", rotate: "-rotate-[3deg]", shift: "mb-0", gray: true,  mobileHide: false },
            { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjzbQlmS4CuwNysdaWEGWvmZQWrxcJUiWlP25NFl_qryeYnJKY7jPjZTIghmgasc9OIaiU-KjrRzcz8Q0r6cPB45HghA6zTRkFci0JMYrqpE17NZ7kkQKRo225LvvptWvh8J4W6T9XPShl6IRxzJ-JKJlSL7A4kSbvStnfhf2wJ4WiS9yXSfrcjG3pY1fI7WKaY-mCgTOXmAEdMiHnt443fnnubw7wKqudTgMZAamjZL3MGKlHErKGQk_0_6AceYCGDukOVhwOzg", rotate: "-rotate-[1deg]", shift: "mb-4", gray: true,  mobileHide: false },
            { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdwVkq3eaHkBLKY9_yWUiiA2X4sGT96uf-VG1-07ezoJjr3vTb2y8wBLB4P_KAacqEDkonyVCvxdLGhztUGKI4qI_UfHVxbXGkf8aalEH9ns8pUC9pWOTSxicDlw2YYDY4-wRpxvDqN6LjGis9r3D-vbuO6FJ_8sdRIp_Lo4En5K1yr6ICN9nbosvtsHamz3WV0pyn_gEP28W-_JXUNy9NYDGFF-ova5sZqoN5UhUDi_SpodHT3l9h2kB5NwxxnDobHBhEnK3HnA", rotate: "rotate-[1.5deg]",  shift: "mb-8", gray: false, mobileHide: true  },
            { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4kncwFsaksBy5GPVA8TG6r_VQrW-fUWtSSyNpl1kf8Tegu0ND9iIC2tO7_hmaebeA3WSZGujZC1IhaG3NnlIpElsh4GyKwwxtC6ztCUK4qXmRpX1oS-MSOdtHe_sc5Ja4DVfsrptzvSMbzpIAoxYdPZANG_Tyw8WE6ll9ojlIYfnefIwH_C4MO_wSUKLoQeGpBeENPLanaZnBHK6XLdO749c8iQWpvrQyZ404tcF9bMkdgjr6wrnfKszwHDoFY-Iptcy-MFfLUQ", rotate: "rotate-[3deg]",   shift: "mb-2", gray: true,  mobileHide: true  },
          ] as const).map((img, i) => (
            <div key={i} className={img.mobileHide ? "hidden sm:contents" : "contents"}>
              <ProjectCard
                src={img.src}
                rotate={img.rotate}
                shift={img.shift}
                gray={img.gray}
                index={i}
                onOpen={setActiveImg}
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 sm:gap-14">
          <div>
            <p className="font-headline text-5xl sm:text-7xl font-bold text-primary leading-none">4+</p>
            <p className="text-sm text-on-surface-variant mt-2">{t.landing.yearsExp}</p>
          </div>
          <div>
            <p className="font-headline text-5xl sm:text-7xl font-bold text-primary leading-none">5x</p>
            <p className="text-sm text-on-surface-variant mt-2">{t.landing.programs}</p>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative mt-auto pt-8">
        <span className="text-[10px] font-label uppercase tracking-[0.4em] text-outline">
          {t.landing.footer}
        </span>
      </div>

      {/* 3D card modal */}
      {activeImg && (
        <Card3DModal
          src={activeImg}
          onClose={() => setActiveImg(null)}
          isDark={isDark}
        />
      )}
    </section>
  );
}
