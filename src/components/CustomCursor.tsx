"use client";

import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Watch theme class changes
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Smooth lerp cursor via rAF
  useEffect(() => {
    let dotX = -100, dotY = -100;
    let ringX = -100, ringY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const tick = () => {
      ringX += (dotX - ringX) * 0.10;
      ringY += (dotY - ringY) * 0.10;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Click shrink effect
  useEffect(() => {
    const down = () => {
      dotRef.current?.classList.add("scale-50");
      ringRef.current?.classList.add("scale-75");
    };
    const up = () => {
      dotRef.current?.classList.remove("scale-50");
      ringRef.current?.classList.remove("scale-75");
    };
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-9999 transition-transform duration-75"
        style={{
          background: isDark ? "#ef4444" : "#18181b",
          boxShadow: isDark
            ? "0 0 10px 3px rgba(239,68,68,0.9), 0 0 20px 6px rgba(239,68,68,0.4)"
            : "none",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-9998 transition-[width,height,border-color,box-shadow] duration-200"
        style={{
          border: isDark
            ? "1.5px solid rgba(239,68,68,0.6)"
            : "1.5px solid rgba(24,24,27,0.35)",
          boxShadow: isDark
            ? "0 0 14px 2px rgba(239,68,68,0.2), inset 0 0 8px rgba(239,68,68,0.05)"
            : "none",
        }}
      />
    </>
  );
}
