"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const educationData = [
  {
    period:      { en: "2020 — 2024", id: "2020 — 2024" },
    degree:      { en: "Bachelor of Computer Engineering Informatics", id: "Sarjana Teknik Informatika Komputer" },
    institution: "Universitas Nahdlatul Ulama Indonesia",
    location:    "Jakarta",
    gpa:         "3.70 GPA",
  },
  {
    period:      { en: "2017 — 2020", id: "2017 — 2020" },
    degree:      { en: "Senior High School", id: "Madrasah Aliyah" },
    institution: "MA-Alwathoniyah",
    location:    "Cikedung",
    gpa:         null,
  },
  {
    period:      { en: "2014 — 2017", id: "2014 — 2017" },
    degree:      { en: "Junior High School", id: "Madrasah Tsanawiyah" },
    institution: "MTs Ulfa Pranggong",
    location:    "Sukadadi",
    gpa:         null,
  },
  {
    period:      { en: "2008 — 2014", id: "2008 — 2014" },
    degree:      { en: "Elementary School", id: "Sekolah Dasar" },
    institution: "SD Sukadadi",
    location:    "Sukadadi",
    gpa:         null,
  },
];

export default function EducationSection() {
  const { lang, t } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const [visible, setVisible]   = useState(false);
  const [mouse, setMouse]       = useState({ x: 50, y: 50 });
  const [hoveredIdx, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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

  const enterLeft = (delay: number): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateX(0px)"  : "translateX(-24px)",
    filter:    visible ? "blur(0px)"        : "blur(4px)",
    transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
      className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-32 bg-surface-container-lowest overflow-hidden"
    >
      {/* Cursor glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.05) 0%, transparent 65%)`,
        transition: "background 0.4s ease",
      }} />

      {/* Decorative section number */}
      <div className="absolute right-4 sm:right-16 top-20 select-none pointer-events-none z-0" style={enter(0)}>
        <span className="font-headline font-bold text-[160px] lg:text-[220px] leading-none text-on-surface opacity-[0.025] tracking-tighter">
          06
        </span>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Label */}
        <div style={enter(0)} className="flex items-center gap-3 mb-8">
          <span
            className="h-px bg-primary opacity-50"
            style={{ width: visible ? "2rem" : "0", transition: "width 0.6s cubic-bezier(.22,1,.36,1) 120ms" }}
          />
          <span className="text-[10px] font-label uppercase tracking-[0.4em] text-outline">
            {t.education.title}
          </span>
        </div>

        {/* Headline */}
        <h3 style={enter(60)} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight leading-none mb-20">
          <span className="text-on-surface">Learning</span>
          <br />
          <span
            className="relative inline-block"
            style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}
          >
            <span className="text-transparent">Path.</span>
            <span
              className="absolute inset-0 text-on-surface/10 overflow-hidden"
              style={{
                clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                transition: "clip-path 1s cubic-bezier(.22,1,.36,1) 300ms",
              }}
            >
              Path.
            </span>
          </span>
        </h3>

        {/* Timeline */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20">
            <div
              style={{
                height: visible ? "100%" : "0%",
                background: "linear-gradient(to bottom, var(--color-outline-variant), transparent)",
                transition: "height 1.4s cubic-bezier(.22,1,.36,1) 400ms",
              }}
            />
          </div>

          <div className="space-y-10">
            {educationData.map((edu, i) => (
              <div
                key={i}
                style={{
                  ...enterLeft(300 + i * 100),
                  borderRadius: "12px",
                  padding: "16px 20px 16px 32px",
                  marginLeft: "-4px",
                  background: hoveredIdx === i ? "rgba(255,255,255,0.03)" : "transparent",
                  boxShadow: hoveredIdx === i ? "inset 0 0 0 1px rgba(255,255,255,0.06)" : "none",
                  transition: (enterLeft(300 + i * 100).transition as string) +
                    ", background 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative"
              >
                {/* Animated dot */}
                <div
                  className="absolute left-0 top-5 -translate-x-1/2"
                  style={{
                    transform: `translateX(-50%) scale(${visible ? 1 : 0})`,
                    transition: `transform 0.4s cubic-bezier(.34,1.56,.64,1) ${400 + i * 100}ms`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: hoveredIdx === i ? "var(--color-primary)" : "var(--color-outline-variant)",
                      boxShadow: hoveredIdx === i ? "0 0 0 4px rgba(255,255,255,0.08)" : "none",
                    }}
                  />
                </div>

                <p className="text-[10px] font-label uppercase tracking-[0.3em] text-outline mb-1">
                  {edu.period[lang]}
                </p>
                <h5
                  className="text-lg font-headline font-bold leading-snug mb-0.5 transition-colors duration-300"
                  style={{ color: hoveredIdx === i ? "var(--color-on-surface)" : "var(--color-primary)" }}
                >
                  {edu.degree[lang]}
                </h5>
                <p className="text-sm text-secondary mb-0.5">{edu.institution}</p>
                <p className="text-xs text-outline mb-2">{edu.location}</p>

                {edu.gpa && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label transition-all duration-300"
                    style={{
                      background: hoveredIdx === i
                        ? "var(--color-surface-container-highest)"
                        : "var(--color-surface-container-high)",
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-[13px] transition-all duration-300"
                      style={{
                        color: "var(--color-primary)",
                        fontVariationSettings: hoveredIdx === i ? '"FILL" 1' : '"FILL" 0',
                      }}
                    >
                      grade
                    </span>
                    {edu.gpa}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
