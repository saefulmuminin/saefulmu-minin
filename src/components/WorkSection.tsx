"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef  = useRef<HTMLDivElement>(null);

  const [visible, setVisible]     = useState(false);
  const [mouse, setMouse]         = useState({ x: 50, y: 50 });
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Track active card from scroll position
  const onSliderScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let minDist  = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIdx(closest);
  }, []);

  // Navigate via arrows
  const scrollTo = (idx: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, activeIdx - 1));
  const next = () => scrollTo(Math.min(projects.length - 1, activeIdx + 1));

  // Keyboard nav when section is focused
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const enter = (delay: number): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(32px)",
    filter:    visible ? "blur(0px)"       : "blur(6px)",
    transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
      className="relative py-16 sm:py-24 lg:py-32 bg-surface-container-lowest overflow-hidden"
    >
      {/* Cursor glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(245,158,11,0.05) 0%, transparent 65%)`,
        transition: "background 0.4s ease",
      }} />

      {/* Decorative section number */}
      <div className="absolute right-16 top-20 select-none pointer-events-none z-0" style={enter(0)}>
        <span className="font-headline font-bold text-[160px] lg:text-[220px] leading-none text-on-surface opacity-[0.025] tracking-tighter">
          03
        </span>
      </div>

      {/* ── Header (padded) ── */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 mb-8 sm:mb-12">
        {/* Label */}
        <div style={enter(0)} className="flex items-center gap-3 mb-8">
          <span
            className="h-px bg-primary opacity-50"
            style={{ width: visible ? "2rem" : "0", transition: "width 0.6s cubic-bezier(.22,1,.36,1) 120ms" }}
          />
          <span className="text-[10px] font-label uppercase tracking-[0.4em] text-outline">
            {t.work.title}
          </span>
        </div>

        {/* Headline + counter */}
        <div className="flex justify-between items-end">
          <h3 style={enter(60)} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="text-on-surface">Selected</span>
            <br />
            <span className="relative inline-block" style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}>
              <span className="text-transparent">Works.</span>
              <span
                className="absolute inset-0 text-on-surface/10 overflow-hidden"
                style={{
                  clipPath:   visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 1s cubic-bezier(.22,1,.36,1) 300ms",
                }}
              >Works.</span>
            </span>
          </h3>

          {/* Arrows */}
          <div style={enter(100)} className="flex items-center gap-3 self-end mb-3">
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-on-surface transition-all duration-200 disabled:opacity-25"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <span className="text-xs font-label tabular-nums text-outline">
              {String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              disabled={activeIdx === projects.length - 1}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-on-surface transition-all duration-200 disabled:opacity-25"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Slider (full-bleed, no padding so cards peek at edges) ── */}
      <div
        ref={sliderRef}
        onScroll={onSliderScroll}
        className="relative z-10 flex gap-5 overflow-x-scroll"
        style={{
          scrollSnapType:     "x mandatory",
          scrollbarWidth:     "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft:        "max(1rem, min(4rem, 6vw))",
          paddingRight:       "max(1rem, min(4rem, 6vw))",
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            style={{
              ...enter(160 + i * 70),
              flex:     "0 0 min(340px, 82vw)",
              minWidth: "260px",
              scrollSnapAlign: "start",
            }}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
        {/* Trailing spacer so last card isn't flush */}
        <div style={{ flex: "0 0 1px" }} />
      </div>

      {/* ── Dot indicators ── */}
      <div style={enter(300)} className="relative z-10 flex justify-center gap-2 mt-6 sm:mt-8 px-4 sm:px-16">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="transition-all duration-300"
            style={{
              width:        activeIdx === i ? "24px" : "6px",
              height:       "6px",
              borderRadius: "3px",
              background:   activeIdx === i ? "var(--color-primary)" : "var(--color-outline-variant)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
