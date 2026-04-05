"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible]     = useState(false);
  const [mouse, setMouse]         = useState({ x: 50, y: 50 });
  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

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

        {/* Headline */}
        <div className="flex justify-between items-end">
          <h3 style={enter(60)} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="text-on-surface">{t.work.title1}</span>
            <br />
            <span className="relative inline-block" style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}>
              <span className="text-transparent">{t.work.title2}</span>
              <span
                className="absolute inset-0 text-on-surface/10 overflow-hidden"
                style={{
                  clipPath:   visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 1s cubic-bezier(.22,1,.36,1) 300ms",
                }}
              >{t.work.title2}</span>
            </span>
          </h3>
          
          <div style={enter(100)} className="mb-3 flex flex-col items-end sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-label text-outline uppercase tracking-wider hidden sm:block">
              {projects.length} {t.common.projects}
            </span>
            <Link
              href="/work"
              className="group flex items-center gap-2 text-xs sm:text-sm font-label uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-outline-variant bg-surface hover:bg-surface-container-high hover:border-outline transition-all text-on-surface"
            >
              {t.common.seeAll}
              <span className="material-symbols-outlined text-[16px] sm:text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Sliders (full-bleed, independent rows) ── */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Top Row */}
        <div
          className="relative z-10 flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            paddingLeft: "max(1rem, min(4rem, 6vw))",
            paddingRight: "max(1rem, min(4rem, 6vw))",
          }}
        >
          {projects.slice(0, 15).map((project, i) => (
            <div
              key={project.slug}
              style={{
                ...enter(160 + i * 50),
                flex: "0 0 min(340px, 82vw)",
                minWidth: "260px",
              }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
          <div style={{ flex: "0 0 1px" }} />
        </div>

        {/* Bottom Row */}
        {projects.length > 15 && (
          <div
            className="relative z-10 flex gap-5 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              paddingLeft: "max(1rem, min(4rem, 6vw))",
              paddingRight: "max(1rem, min(4rem, 6vw))",
            }}
          >
            {projects.slice(15, 30).map((project, i) => (
              <div
                key={project.slug}
                style={{
                  ...enter(260 + i * 50),
                  flex: "0 0 min(340px, 82vw)",
                  minWidth: "260px",
                }}
              >
                <ProjectCard project={project} index={15 + i} />
              </div>
            ))}
            <div style={{ flex: "0 0 1px" }} />
          </div>
        )}
      </div>

    </section>
  );
}
