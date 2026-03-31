"use client";

import { useState } from "react";
import Link from "next/link";
import { type Project } from "@/data/projects";

export type { Project };

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index:   number;
}) {
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(3, "0");

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative bg-surface-container-high rounded-2xl overflow-hidden flex flex-col group"
      style={{ cursor: "none", display: "flex" }}
    >
      {/* ── Image ── */}
      <div className="aspect-video relative overflow-hidden shrink-0">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover"
          style={{
            filter:     hover ? "grayscale(0)"  : "grayscale(0.7)",
            transform:  hover ? "scale(1.06)"   : "scale(1)",
            transition: "filter 0.6s ease, transform 0.65s cubic-bezier(.22,1,.36,1)",
          }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
          style={{ opacity: hover ? 0.85 : 0.45, transition: "opacity 0.4s ease" }}
        />

        {/* View button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity:    hover ? 1 : 0,
            transform:  hover ? "scale(1)"    : "scale(0.85)",
            transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-[10px] font-label uppercase tracking-widest">
            <span className="material-symbols-outlined text-[14px]">open_in_full</span>
            View Project
          </div>
        </div>

        {/* Number */}
        <span className="absolute top-4 left-4 text-[10px] font-label font-bold text-white/30 tracking-widest">
          {num}
        </span>

        {/* Category badge */}
        <span
          className="absolute top-4 right-4 text-[9px] font-label px-2.5 py-1 rounded-full border uppercase tracking-widest backdrop-blur-sm"
          style={{
            background:  `${project.color}22`,
            color:        project.color,
            borderColor: `${project.color}44`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-6 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-start gap-3">
          <h4
            className="text-lg font-headline font-bold transition-colors duration-300"
            style={{ color: hover ? project.color : "var(--color-on-surface)" }}
          >
            {project.title}
          </h4>
          <span className="text-[10px] font-label text-outline shrink-0 mt-1">{project.year}</span>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-label text-outline uppercase tracking-widest px-2 py-0.5 bg-surface-container rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Accent bottom line */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          width:      hover ? "100%" : "0%",
          background: project.color,
          transition: "width 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </Link>
  );
}
