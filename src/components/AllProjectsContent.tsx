"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";

export default function AllProjectsContent({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(20px)",
    filter:     visible ? "blur(0)"       : "blur(4px)",
    transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .6s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  const categories = ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="min-h-screen bg-background text-on-surface"
    >
      {/* ── Left panel — fixed on desktop, trigger pill on mobile ── */}
      <HeroSection />

      {/* ── Right nav dots — tablet & up ── */}
      <Sidebar />

      {/* ════════════════════════════════════════
          STICKY HEADER
      ════════════════════════════════════════ */}
      <header
        className={`
          fixed top-0 left-0 right-0 lg:left-[380px] z-50
          px-4 sm:px-6 md:px-8 py-3 sm:py-4
          flex items-center gap-3 transition-all duration-300
        `}
        style={{
          background:     scrolled ? "var(--color-surface-container-low)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   scrolled ? "1px solid var(--color-outline-variant)" : "1px solid transparent",
        }}
      >
        <Link
          href="/#work"
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-label shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline">{t.common.backToHome}</span>
        </Link>
        <span
          className="flex-1 text-sm font-headline font-semibold text-on-surface truncate text-center transition-all duration-300"
          style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(5px)" }}
        >
          {t.allProjects.title}
        </span>
        <span className="text-[9px] font-label uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0 text-primary border-primary/40 bg-primary/10">
          {filteredProjects.length} {t.common.items}
        </span>
      </header>

      {/* ════════════════════════════════════════
          SCROLLABLE CONTENT
      ════════════════════════════════════════ */}
      <div className="lg:ml-[380px] pt-24 pb-20">
        <main className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
          
          <div style={enter(0)} className="mb-10 sm:mb-14">
            <h1 className="font-headline font-bold tracking-tight text-on-surface mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              {t.allProjects.title}
            </h1>
            <p className="text-on-surface-variant font-label text-sm max-w-2xl leading-relaxed">
              {t.allProjects.description}
            </p>
          </div>

          {/* Categorical Filter */}
          <div style={enter(100)} className="flex flex-wrap gap-2 mb-8 sm:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs font-label px-4 py-2 rounded-full border uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {category === "All" ? t.allProjects.all : category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={enter(200)} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, i) => (
              <div 
                key={project.slug} 
                style={{
                   animation: `slideUpFade 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s both`
                }}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-4 opacity-50">search_off</span>
              <p className="font-label text-sm uppercase tracking-wider">{t.common.noProjects}</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
