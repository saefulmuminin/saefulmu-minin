"use client";

import { useState, useEffect, useRef } from "react";
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
  const [scrolled, setScrolled]   = useState(false);
  const [visible, setVisible]     = useState(false);
  const [mouse, setMouse]         = useState({ x: 50, y: 50 });
  const contentRef = useRef<HTMLDivElement>(null);

  // Sticky header trigger
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Content reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Intersection Observer for content section
  const contentVisible = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !contentVisible.current) { contentVisible.current = true; } },
      { threshold: 0.1 }
    );
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(28px)",
    filter:    visible ? "blur(0px)"       : "blur(6px)",
    transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  // Related projects (exclude current)
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  // Prev / next
  const currentIdx = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject = currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;

  return (
    <div
      className="min-h-screen bg-background text-on-surface"
      onMouseMove={(e) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}
    >
      {/* ── Sidebar Navigation ── */}
      <Sidebar />

      {/* ── Hero Profile Card ── */}
      <div className="hidden lg:block z-50 relative pointer-events-none">
        <div className="pointer-events-auto">
          <HeroSection />
        </div>
      </div>

      <div className="lg:ml-[380px] lg:mr-[80px] flex flex-col min-h-screen relative">
        {/* ── Sticky header ── */}
        <header
          className="fixed top-0 lg:left-[380px] left-0 lg:right-[80px] right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background:    scrolled ? "var(--color-surface-container-low)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom:  scrolled ? "1px solid var(--color-outline-variant)" : "1px solid transparent",
        }}
      >
        <Link
          href="/#work"
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-label"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Portfolio
        </Link>

        <span
          className="text-sm font-headline font-semibold text-on-surface transition-all duration-300"
          style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(6px)" }}
        >
          {project.title}
        </span>

        <span
          className="text-[9px] font-label uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{
            background:  `${project.color}18`,
            color:        project.color,
            borderColor: `${project.color}40`,
          }}
        >
          {project.category}
        </span>
      </header>

      {/* ── Hero image ── */}
      <div className="relative w-full" style={{ height: "62vh", minHeight: "420px" }}>
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover"
          style={{
            filter:     visible ? "blur(0px)"  : "blur(10px)",
            transform:  visible ? "scale(1)"   : "scale(1.06)",
            transition: "filter 0.9s ease 0.1s, transform 0.9s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-background" />

        {/* Cursor glow on hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, ${project.color}18 0%, transparent 60%)`,
            transition: "background 0.4s ease",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-8 lg:px-16 -mt-20 relative z-10" ref={contentRef}>
        <article className="space-y-12">

        {/* Title block */}
        <div style={enter(0)} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-[10px] font-label px-3 py-1.5 rounded-full border uppercase tracking-widest"
              style={{ background: `${project.color}18`, color: project.color, borderColor: `${project.color}40` }}
            >
              {project.category}
            </span>
            <span className="text-xs text-outline font-label">{project.year}</span>
            <span className="text-outline/40">·</span>
            <span className="text-xs text-outline font-label">{project.duration}</span>
          </div>

          <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight text-on-surface mb-3">
            {project.title}
          </h1>
          <p className="text-on-surface-variant font-label text-sm">{project.role}</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 mb-20">

          {/* ── Left: main content ── */}
          <div>
            {/* Description */}
            <div style={enter(80)} className="mb-10">
              <p className="text-on-surface-variant leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Problem / Solution */}
            <div style={enter(140)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { label: "Problem", text: project.problem },
                { label: "Solution", text: project.solution },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl border"
                  style={{
                    background:   "var(--color-surface-container)",
                    borderColor:  "var(--color-outline-variant)",
                  }}
                >
                  <p className="text-[9px] font-label uppercase tracking-[0.35em] mb-3 flex items-center gap-2" style={{ color: project.color }}>
                    <span className="w-3 h-px" style={{ background: project.color }} />
                    {item.label}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={enter(200)}>
              <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-outline" />
                Key Features
              </p>
              <ul className="space-y-4">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
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

          {/* ── Right: sidebar meta ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div
              style={{ ...enter(100), background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}
              className="rounded-2xl border p-6 space-y-6"
            >
              {/* Meta items */}
              {[
                { icon: "person",        label: "Role",     value: project.role },
                { icon: "calendar_month",label: "Year",     value: project.year },
                { icon: "schedule",      label: "Duration", value: project.duration },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-[9px] font-label uppercase tracking-widest text-outline mb-1">{m.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">{m.icon}</span>
                    <span className="text-sm text-on-surface font-label">{m.value}</span>
                  </div>
                </div>
              ))}

              <div className="h-px bg-outline-variant/30" />

              {/* Tech stack */}
              <div>
                <p className="text-[9px] font-label uppercase tracking-widest text-outline mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
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

              <div className="h-px bg-outline-variant/30" />

              {/* CTA buttons */}
              <div className="flex flex-col gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-label font-semibold hover:opacity-90 transition-opacity"
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
                    className="flex items-center justify-center gap-2 py-2.5 rounded-full border text-xs font-label text-on-surface hover:border-primary transition-colors"
                    style={{ borderColor: "var(--color-outline-variant)" }}
                  >
                    <span className="material-symbols-outlined text-[15px]">code</span>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div style={enter(300)} className="border-t border-outline-variant/30 pt-10 mb-20 grid grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="flex flex-col gap-1 group p-4 rounded-xl hover:bg-surface-container transition-colors"
            >
              <span className="text-[9px] font-label uppercase tracking-widest text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">arrow_back</span>
                Previous
              </span>
              <span className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="flex flex-col gap-1 items-end text-right group p-4 rounded-xl hover:bg-surface-container transition-colors"
            >
              <span className="text-[9px] font-label uppercase tracking-widest text-outline flex items-center gap-1">
                Next
                <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </span>
              <span className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : <div />}
        </div>

        {/* ── More Projects ── */}
        {related.length > 0 && (
          <div style={enter(360)} className="mb-20">
            <p className="text-[10px] font-label uppercase tracking-[0.4em] text-outline mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-outline opacity-50" />
              More Projects
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <div key={p.slug} style={enter(400 + i * 60)}>
                  <ProjectCard project={p} index={allProjects.findIndex(x => x.slug === p.slug)} />
                </div>
              ))}
            </div>
          </div>
        )}

        </article>
      </main>
      </div>
    </div>
  );
}
