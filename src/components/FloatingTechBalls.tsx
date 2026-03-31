"use client";

import { useEffect, useRef } from "react";

// ── Tech definitions ────────────────────────────────────────────────────────────
const TECHS = [
  { name: "Next.js",    label: "N",   h:   0, s:  0, l: 18, color: "#e5e7eb", size: 80 },
  { name: "React",      label: "⚛",   h: 193, s: 90, l: 22, color: "#61DAFB", size: 86 },
  { name: "Laravel",    label: "L",   h:   2, s: 90, l: 22, color: "#FF6B6B", size: 80 },
  { name: "TypeScript", label: "TS",  h: 213, s: 58, l: 28, color: "#93c5fd", size: 74 },
  { name: "Tailwind",   label: "TW",  h: 188, s: 88, l: 22, color: "#22d3ee", size: 72 },
  { name: "PHP",        label: "PHP", h: 230, s: 28, l: 34, color: "#a5b4fc", size: 68 },
  { name: "MySQL",      label: "SQL", h:  36, s: 82, l: 22, color: "#fbbf24", size: 74 },
  { name: "Git",        label: "Git", h:   7, s: 82, l: 22, color: "#f87171", size: 70 },
] as const;

// ── CSS sphere gradient from HSL base values ────────────────────────────────────
function sphereGradient(h: number, s: number, l: number) {
  const c = (v: number, lo = 2, hi = 92) => Math.max(lo, Math.min(hi, v));
  return (
    `radial-gradient(circle at 38% 30%,` +
    ` hsl(${h},${c(s + 12)}%,${c(l + 38)}%) 0%,` +
    ` hsl(${h},${s}%,${c(l + 20)}%) 22%,` +
    ` hsl(${h},${s}%,${l}%) 48%,` +
    ` hsl(${h},${s}%,${c(l - 15)})% 72%,` +
    ` hsl(${h},${s}%,${c(l - 26, 2)}%) 100%)`
  );
}

// ── Ball runtime state ──────────────────────────────────────────────────────────
type Ball = {
  el:      HTMLDivElement;
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  rotX: number; rotY: number;
  color: string;
  prevGlow: boolean;
  baseBoxShadow: string;
};

// ── Component ───────────────────────────────────────────────────────────────────
export default function FloatingTechBalls() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Shared mutable state — no setState during animation
    const mouse = { x: -9999, y: -9999, pressed: false };
    let scrollDelta = 0;
    let prevScrollY = window.scrollY;
    let raf = 0;

    // ── Build DOM spheres ──────────────────────────────────────────────────────
    const balls: Ball[] = TECHS.map((tech) => {
      const el  = document.createElement("div");
      const r   = tech.size / 2;
      const w   = window.innerWidth;
      const h   = window.innerHeight;

      // Start in the content area (right of HeroSection), top 30%
      const minX = w > 900 ? 420 : 20;
      const x = minX + Math.random() * Math.max(w - minX - 80, 100);
      const y = 40   + Math.random() * (h * 0.28);

      const bg            = sphereGradient(tech.h, tech.s, tech.l);
      const baseBoxShadow =
        `inset -5px -10px 22px rgba(0,0,0,0.55),` +
        ` inset 3px 4px 12px rgba(255,255,255,0.09),` +
        ` 0 10px 34px rgba(0,0,0,0.38),` +
        ` 0 0 0 1px rgba(255,255,255,0.06)`;

      Object.assign(el.style, {
        position:       "absolute",
        top:            "0",
        left:           "0",
        width:          `${tech.size}px`,
        height:         `${tech.size}px`,
        borderRadius:   "50%",
        background:     bg,
        boxShadow:      baseBoxShadow,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "3px",
        userSelect:     "none",
        willChange:     "transform",
        transformStyle: "preserve-3d",
        transform:      `translate3d(${x - r}px,${y - r}px,0)`,
      });

      // Icon
      const icon = document.createElement("span");
      icon.textContent = tech.label;
      Object.assign(icon.style, {
        fontSize:      tech.size > 78 ? "19px" : "14px",
        fontWeight:    "800",
        fontFamily:    "var(--font-manrope), sans-serif",
        color:         tech.color,
        textShadow:    `0 0 10px ${tech.color}aa`,
        lineHeight:    "1",
        pointerEvents: "none",
      });

      // Name
      const name = document.createElement("span");
      name.textContent = tech.name;
      Object.assign(name.style, {
        fontSize:      "7px",
        fontWeight:    "600",
        fontFamily:    "var(--font-inter), sans-serif",
        color:         "rgba(255,255,255,0.35)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        pointerEvents: "none",
      });

      el.appendChild(icon);
      el.appendChild(name);
      container.appendChild(el);

      return {
        el, r, color: tech.color, baseBoxShadow,
        x, y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * 1.5 + 0.3,
        rotX: Math.random() * 25,
        rotY: Math.random() * 25,
        prevGlow: false,
      };
    });

    // ── Events ─────────────────────────────────────────────────────────────────
    const onMove    = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onDown    = (e: MouseEvent) => { mouse.pressed = true; mouse.x = e.clientX; mouse.y = e.clientY; };
    const onUp      = () => { mouse.pressed = false; };
    const onScroll  = () => {
      const y = window.scrollY;
      scrollDelta = (y - prevScrollY) * 0.55;
      prevScrollY = y;
    };
    const onResize  = () => {
      const w = window.innerWidth, h = window.innerHeight;
      for (const b of balls) {
        if (b.x > w - b.r) b.x = w - b.r;
        if (b.y > h - b.r) b.y = h - b.r;
      }
    };

    window.addEventListener("mousemove", onMove,   { passive: true });
    window.addEventListener("mousedown", onDown,   { passive: true });
    window.addEventListener("mouseup",   onUp,     { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });

    // ── Physics loop ───────────────────────────────────────────────────────────
    let last = performance.now();

    function loop(now: number) {
      const dt   = Math.min((now - last) / 16.67, 2.5);
      last       = now;

      const W         = window.innerWidth;
      const H         = window.innerHeight;
      const GRAV      = 0.09;
      const DAMP      = 0.991;
      const MOUSE_R   = 145;
      const MOUSE_F   = mouse.pressed ? 320 : 160;
      const LEFT_BOUND = W > 900 ? 388 : 6;

      scrollDelta *= 0.78;

      for (const b of balls) {
        // Gravity
        b.vy += GRAV * dt;

        // Scroll push (downward scroll = push balls down)
        b.vy += scrollDelta * 0.05 * dt;

        // Mouse repulsion
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const thr = (MOUSE_R + b.r) * (MOUSE_R + b.r);
        const isGlow = d2 < thr * 1.8; // glow starts a bit further out

        if (d2 < thr && d2 > 0) {
          const d  = Math.sqrt(d2);
          const str = ((MOUSE_R + b.r - d) / (MOUSE_R + b.r)) ** 2 * MOUSE_F * dt;
          b.vx += (dx / d) * str;
          b.vy += (dy / d) * str;
        }

        // Glow update (only when state changes)
        if (isGlow !== b.prevGlow) {
          b.prevGlow = isGlow;
          b.el.style.boxShadow = isGlow
            ? b.baseBoxShadow + `, 0 0 28px ${b.color}50, 0 0 60px ${b.color}22`
            : b.baseBoxShadow;
        }

        // Integrate
        b.x  += b.vx * dt;
        b.y  += b.vy * dt;

        // Damping
        b.vx *= DAMP ** dt;
        b.vy *= DAMP ** dt;

        // Walls
        if (b.x - b.r < LEFT_BOUND) { b.x = LEFT_BOUND + b.r; b.vx =  Math.abs(b.vx) * 0.50; }
        if (b.x + b.r > W - 6)      { b.x = W - 6 - b.r;      b.vx = -Math.abs(b.vx) * 0.50; }
        if (b.y + b.r > H - 6)      { b.y = H - 6 - b.r;      b.vy = -Math.abs(b.vy) * 0.45; b.vx *= 0.90; }
        if (b.y - b.r < 6)          { b.y = 6 + b.r;           b.vy =  Math.abs(b.vy) * 0.40; }

        // Rotate from velocity (spin as they move)
        b.rotY += b.vx * 1.6;
        b.rotX -= b.vy * 1.0;

        // DOM update
        b.el.style.transform =
          `translate3d(${b.x - b.r}px,${b.y - b.r}px,0)` +
          ` rotateX(${b.rotX}deg) rotateY(${b.rotY}deg)`;
      }

      // ── Ball–ball elastic collisions ─────────────────────────────────────────
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i], b = balls[j];
          const dx   = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const min  = a.r + b.r;
          if (dist < min && dist > 0.001) {
            const nx = dx / dist, ny = dy / dist;
            const ov = min - dist;
            a.x -= nx * ov * 0.5; a.y -= ny * ov * 0.5;
            b.x += nx * ov * 0.5; b.y += ny * ov * 0.5;
            const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              const imp = dot * 0.74; // restitution
              a.vx += imp * nx; a.vy += imp * ny;
              b.vx -= imp * nx; b.vy -= imp * ny;
            }
          }
        }
      }

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      balls.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[25]"
      style={{ perspective: "700px", perspectiveOrigin: "50% 40%" }}
    />
  );
}
