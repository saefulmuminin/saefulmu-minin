"use client";

import { useEffect, useState } from "react";
import { type Project } from "./ProjectCard";

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (project) {
      requestAnimationFrame(() => setMounted(true));
      document.body.style.overflow = "hidden";
    } else {
      setMounted(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{
        background:    mounted ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
        backdropFilter: mounted ? "blur(10px)" : "blur(0px)",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Sheet panel */}
      <div
        className="relative w-full bg-surface-container-low overflow-hidden flex flex-col"
        style={{
          maxWidth:   "860px",
          maxHeight:  "92vh",
          borderRadius: "24px 24px 0 0",
          transform:  mounted ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* ── Drag handle ── */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-outline-variant/50" />
        </div>

        {/* ── Scrollable content ── */}
        <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "thin" }}>

          {/* Hero image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              style={{
                transform:  mounted ? "scale(1)"    : "scale(1.06)",
                filter:     mounted ? "blur(0px)"   : "blur(6px)",
                transition: "transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s, filter 0.7s ease 0.1s",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />

            {/* Floating category badge */}
            <span
              className="absolute bottom-5 left-6 text-[10px] font-label px-3 py-1.5 rounded-full border uppercase tracking-widest backdrop-blur-sm"
              style={{
                background:  `${project.color}22`,
                color:        project.color,
                borderColor: `${project.color}44`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* ── Body ── */}
          <div className="px-8 pb-12 pt-6">

            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-headline text-3xl font-bold text-on-surface mb-1">
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-outline font-label">{project.role}</span>
                  <span className="text-outline/40">·</span>
                  <span className="text-xs text-outline font-label">{project.year}</span>
                  <span className="text-outline/40">·</span>
                  <span className="text-xs text-outline font-label">{project.duration}</span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="shrink-0 w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Problem / Solution grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div
                className="p-5 rounded-2xl border"
                style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}
              >
                <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-2 flex items-center gap-2">
                  <span className="w-3 h-px" style={{ background: project.color }} />
                  Problem
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">{project.problem}</p>
              </div>
              <div
                className="p-5 rounded-2xl border"
                style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)" }}
              >
                <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-2 flex items-center gap-2">
                  <span className="w-3 h-px" style={{ background: project.color }} />
                  Solution
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-4 flex items-center gap-2">
                <span className="w-3 h-px" style={{ background: project.color }} />
                Key Features
              </p>
              <ul className="space-y-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: project.color }}
                    />
                    <span className="text-sm text-on-surface-variant leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-[9px] font-label uppercase tracking-[0.35em] text-outline mb-4 flex items-center gap-2">
                <span className="w-3 h-px" style={{ background: project.color }} />
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-label px-3 py-1.5 rounded-full border uppercase tracking-wider text-on-surface-variant"
                    style={{ borderColor: "var(--color-outline-variant)", background: "var(--color-surface-container)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex gap-3 flex-wrap pt-2">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-label font-semibold hover:opacity-90 transition-opacity"
                    style={{ background: project.color, color: "#fff" }}
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    Live Demo
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-label text-on-surface hover:border-primary transition-colors"
                    style={{ borderColor: "var(--color-outline-variant)" }}
                  >
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
