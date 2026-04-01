"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";

export default function ProjectDetailContent({
  project,
  allProjects,
}: {
  project:     Project;
  allProjects: Project[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [mouse,    setMouse]    = useState({ x: 50, y: 50 });

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

  const related     = allProjects.filter((p) => p.slug !== project.slug).slice(0, 4);
  const idx         = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = idx > 0                      ? allProjects[idx - 1] : null;
  const nextProject = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  return (
    <div
      className="min-h-screen bg-background text-on-surface"
      onMouseMove={(e) =>
        setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
      }
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
        {/* Back button */}
        <Link
          href="/#work"
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-label shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline">Portfolio</span>
        </Link>

        {/* Title — fades in on scroll */}
        <span
          className="flex-1 text-sm font-headline font-semibold text-on-surface truncate text-center transition-all duration-300"
          style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(5px)" }}
        >
          {project.title}
        </span>

        {/* Category badge */}
        <span
          className="text-[9px] font-label uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0"
          style={{ background: `${project.color}18`, color: project.color, borderColor: `${project.color}40` }}
        >
          {project.category}
        </span>
      </header>

      {/* ════════════════════════════════════════
          SCROLLABLE CONTENT
          — offset left on lg (HeroSection), right on md+ (Sidebar)
      ════════════════════════════════════════ */}
      <div className="lg:ml-[380px]">

        {/* ── Hero image ── */}
        <div
          className="relative w-full"
          style={{ height: "clamp(280px, 55vw, 640px)" }}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover"
            style={{
              filter:     visible ? "blur(0)"  : "blur(12px)",
              transform:  visible ? "scale(1)" : "scale(1.06)",
              transition: "filter .9s ease .1s, transform .9s cubic-bezier(.22,1,.36,1) .1s",
            }}
          />

          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-background" />

          {/* Cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(380px circle at ${mouse.x}% ${mouse.y}%, ${project.color}20 0%, transparent 65%)`,
              transition: "background .4s ease",
            }}
          />
        </div>

        {/* ── Body ── */}
        <main className="
          -mt-10 sm:-mt-14 lg:-mt-20 relative z-10
          pb-20 md:pb-24
          px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16
          max-w-screen-xl mx-auto
        ">

          {/* ── Title block ── */}
          <div style={enter(0)} className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span
                className="text-[10px] font-label px-3 py-1.5 rounded-full border uppercase tracking-widest"
                style={{ background: `${project.color}18`, color: project.color, borderColor: `${project.color}40` }}
              >
                {project.category}
              </span>
              <span className="text-xs text-outline font-label">{project.year}</span>
              <span className="text-outline/30 select-none">·</span>
              <span className="text-xs text-outline font-label">{project.duration}</span>
            </div>

            <h1 className="font-headline font-bold tracking-tight text-on-surface mb-2
              text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              {project.title}
            </h1>
            <p className="text-on-surface-variant font-label text-sm">{project.role}</p>
          </div>

          {/* ── Content grid
               Mobile  : meta card FIRST (order-1), prose below (order-2)
               Desktop : prose LEFT  (order-1), meta card sticky RIGHT (order-2)
          ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_260px] gap-8 lg:gap-12 mb-14 sm:mb-16">

            {/* ── Meta card — top on mobile, sticky right on desktop ── */}
            <aside className="order-1 lg:order-2">
              <div
                style={{ ...enter(80), background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}
                className="rounded-2xl border p-5 lg:sticky lg:top-24"
              >
                {/* Meta rows — horizontal on mobile, vertical on desktop */}
                <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-5 mb-5">
                  {[
                    { icon: "person",         label: "Role",     value: project.role     },
                    { icon: "calendar_month", label: "Year",     value: project.year     },
                    { icon: "schedule",       label: "Duration", value: project.duration },
                  ].map((m) => (
                    <div key={m.label} className="min-w-[100px]">
                      <p className="text-[9px] font-label uppercase tracking-widest text-outline mb-1">{m.label}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">{m.icon}</span>
                        <span className="text-sm text-on-surface font-label">{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-outline-variant/30 mb-5" />

                {/* Tech stack */}
                <div className="mb-5">
                  <p className="text-[9px] font-label uppercase tracking-widest text-outline mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-label px-2.5 py-1 rounded-full border text-on-surface-variant uppercase tracking-wider"
                        style={{ borderColor: "var(--color-outline-variant)", background: "var(--color-surface-container-high)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                {(project.liveUrl || project.githubUrl) && (
                  <>
                    <div className="h-px bg-outline-variant/30 mb-5" />
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-label font-semibold hover:opacity-90 active:scale-95 transition-all"
                          style={{ background: project.color, color: "#fff" }}
                        >
                          <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-label text-on-surface hover:border-primary active:scale-95 transition-all"
                          style={{ borderColor: "var(--color-outline-variant)" }}
                        >
                          <span className="material-symbols-outlined text-[15px]">code</span>
                          Source Code
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* ── Prose content — below card on mobile, left col on desktop ── */}
            <div className="order-2 lg:order-1 space-y-8 sm:space-y-10">

              {/* Description */}
              <p
                style={enter(140)}
                className="text-on-surface-variant leading-relaxed text-base sm:text-lg"
              >
                {project.description}
              </p>

              {/* Problem / Solution */}
              <div style={enter(180)} className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "Problem",  text: project.problem  },
                  { label: "Solution", text: project.solution },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 sm:p-5 rounded-2xl border"
                    style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}
                  >
                    <p
                      className="text-[9px] font-label uppercase tracking-[0.35em] mb-3 flex items-center gap-2"
                      style={{ color: project.color }}
                    >
                      <span className="w-3 h-px" style={{ background: project.color }} />
                      {item.label}
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div style={enter(220)}>
                <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-4 sm:mb-5 flex items-center gap-2">
                  <span className="w-3 h-px bg-outline" />
                  Key Features
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-label font-bold shrink-0 mt-0.5"
                        style={{ background: `${project.color}18`, color: project.color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-on-surface-variant leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* ── Prev / Next ── */}
          <div
            style={enter(300)}
            className="border-t border-outline-variant/30 pt-6 sm:pt-8 mb-12 sm:mb-16 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="flex flex-col gap-1 group p-3 sm:p-4 rounded-xl hover:bg-surface-container active:scale-95 transition-all"
              >
                <span className="text-[9px] font-label uppercase tracking-widest text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">arrow_back</span>
                  Prev
                </span>
                <span className="text-xs sm:text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="flex flex-col items-end text-right gap-1 group p-3 sm:p-4 rounded-xl hover:bg-surface-container active:scale-95 transition-all"
              >
                <span className="text-[9px] font-label uppercase tracking-widest text-outline flex items-center gap-1">
                  Next
                  <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                </span>
                <span className="text-xs sm:text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* ── More Projects ── */}
          {related.length > 0 && (
            <div style={enter(360)}>
              <p className="text-[10px] font-label uppercase tracking-[0.4em] text-outline mb-5 sm:mb-6 flex items-center gap-3">
                <span className="w-5 h-px bg-outline opacity-40" />
                More Projects
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {related.map((p, i) => (
                  <div key={p.slug} style={enter(400 + i * 60)}>
                    <ProjectCard project={p} index={allProjects.findIndex((x) => x.slug === p.slug)} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
