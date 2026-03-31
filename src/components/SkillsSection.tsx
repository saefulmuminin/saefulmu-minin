"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Skill = { name: string; level: number; category: string };

const skills: Skill[] = [
  { name: "HTML",             level: 100, category: "Frontend" },
  { name: "CSS",              level: 100, category: "Frontend" },
  { name: "Tailwind CSS",     level: 100, category: "Frontend" },
  { name: "JavaScript",       level: 90,  category: "Frontend" },
  { name: "React JS",         level: 70,  category: "Frontend" },
  { name: "Next JS",          level: 70,  category: "Frontend" },
  { name: "Laravel",          level: 96,  category: "Backend" },
  { name: "PHP",              level: 90,  category: "Backend" },
  { name: "RESTful API",      level: 80,  category: "Backend" },
  { name: "Express JS",       level: 75,  category: "Backend" },
  { name: "Git & GitHub",     level: 96,  category: "Tools" },
  { name: "Graphic Designer", level: 99,  category: "Tools" },
  { name: "MS Office Suite",  level: 99,  category: "Tools" },
  { name: "Problem Solving",  level: 91,  category: "Tools" },
];

const categories = ["Frontend", "Backend", "Tools"];

export default function SkillsSection() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const [visible, setVisible]       = useState(false);
  const [mouse, setMouse]           = useState({ x: 50, y: 50 });
  const [hoveredSkill, setHovered]  = useState<string | null>(null);
  const [activeCategory, setActive] = useState<string>("Frontend");

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

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
      className="relative px-16 lg:px-24 py-32 bg-surface-container-low overflow-hidden"
    >
      {/* Cursor glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(6,182,212,0.05) 0%, transparent 65%)`,
        transition: "background 0.4s ease",
      }} />

      {/* Decorative section number */}
      <div className="absolute right-16 top-20 select-none pointer-events-none z-0" style={enter(0)}>
        <span className="font-headline font-bold text-[160px] lg:text-[220px] leading-none text-on-surface opacity-[0.025] tracking-tighter">
          05
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
            {t.skills.label}
          </span>
        </div>

        {/* Headline */}
        <h3 style={enter(60)} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight leading-none mb-14">
          <span className="text-on-surface">Tech</span>
          <br />
          <span
            className="relative inline-block"
            style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}
          >
            <span className="text-transparent">Stack.</span>
            <span
              className="absolute inset-0 text-on-surface/10 overflow-hidden"
              style={{
                clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                transition: "clip-path 1s cubic-bezier(.22,1,.36,1) 300ms",
              }}
            >
              Stack.
            </span>
          </span>
        </h3>

        {/* Category tabs */}
        <div style={enter(120)} className="flex gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-xs font-label uppercase tracking-widest transition-all duration-300"
              style={{
                background: activeCategory === cat ? "var(--color-primary)" : "var(--color-surface-container-high)",
                color: activeCategory === cat ? "var(--color-on-primary)" : "var(--color-on-surface-variant)",
                boxShadow: activeCategory === cat ? "0 0 20px rgba(255,255,255,0.06)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              style={enter(200 + i * 55)}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-xs font-label uppercase tracking-widest transition-colors duration-300"
                  style={{
                    color: hoveredSkill === skill.name
                      ? "var(--color-on-surface)"
                      : "var(--color-on-surface-variant)",
                  }}
                >
                  {skill.name}
                </span>
                <span
                  className="text-xs font-label tabular-nums transition-colors duration-300"
                  style={{
                    color: hoveredSkill === skill.name
                      ? "var(--color-on-surface)"
                      : "var(--color-outline)",
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Bar track */}
              <div className="h-px bg-outline-variant relative overflow-hidden">
                {/* Animated fill */}
                <div
                  className="absolute top-0 left-0 h-px"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    background: hoveredSkill === skill.name
                      ? "var(--color-on-surface)"
                      : "var(--color-primary)",
                    transition: `width 1s cubic-bezier(.22,1,.36,1) ${300 + i * 60}ms, background 0.3s ease`,
                  }}
                />
                {/* Shimmer on hover */}
                {hoveredSkill === skill.name && (
                  <div
                    className="absolute top-0 left-0 h-px w-12 opacity-60"
                    style={{
                      background: "linear-gradient(90deg, transparent, white, transparent)",
                      animation: "shimmer 0.7s ease-out forwards",
                      left: `${skill.level - 5}%`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
