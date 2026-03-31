"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible, setVisible]       = useState(false);
  const [mouse, setMouse]           = useState({ x: 50, y: 50 });
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  // Scroll-triggered reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const yearsCount    = useCountUp(4,  1100, visible);
  const projectsCount = useCountUp(20, 1400, visible);
  const clientsCount  = useCountUp(10, 1250, visible);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  // Staggered entrance helper
  const enter = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0px)"   : "translateY(32px)",
    filter:     visible ? "blur(0px)"         : "blur(6px)",
    transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .65s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  const info = [
    { icon: "person",      label: t.about.name,       value: "Saeful Mu'minin" },
    { icon: "mail",        label: t.about.email,       value: "saeful2026027@gmail.com" },
    { icon: "phone",       label: t.about.phone,       value: "(+62) 857-9886-4579" },
    { icon: "location_on", label: t.about.location,    value: t.about.locationVal },
    { icon: "circle",      label: t.about.availLabel,  value: t.about.availVal, highlight: true },
  ];

  const stats = [
    { count: yearsCount,    suffix: "+", label: t.landing.yearsExp },
    { count: projectsCount, suffix: "+", label: t.landing.programs.split("&")[0].trim() + " Projects" },
    { count: clientsCount,  suffix: "+", label: "Happy Clients" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
      className="relative px-16 lg:px-24 py-32 bg-surface-container-low overflow-hidden"
    >
      {/* ── Cursor glow ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(99,102,241,0.05) 0%, transparent 65%)`,
          transition: "background 0.4s ease",
        }}
      />

      {/* ── Decorative section number ── */}
      <div
        className="absolute right-16 top-20 select-none pointer-events-none z-0"
        style={enter(0)}
      >
        <span className="font-headline font-bold text-[160px] lg:text-[220px] leading-none text-on-surface opacity-[0.025] tracking-tighter">
          02
        </span>
      </div>

      {/* ── Decorative corner accent ── */}
      <div
        className="absolute top-16 left-16 w-16 h-16 pointer-events-none z-0"
        style={{ ...enter(0), opacity: visible ? 0.12 : 0 }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-primary" />
        <div className="absolute top-0 left-0 h-full w-px bg-primary" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl">

        {/* Label */}
        <div style={enter(0)} className="flex items-center gap-3 mb-8">
          <span
            className="h-px bg-primary"
            style={{
              width: visible ? "2rem" : "0",
              transition: "width 0.6s cubic-bezier(.22,1,.36,1) 120ms",
              opacity: 0.6,
            }}
          />
          <span className="text-[10px] font-label uppercase tracking-[0.4em] text-outline">
            {t.about.title}
          </span>
        </div>

        {/* Big headline */}
        <div className="mb-16 overflow-hidden">
          <h3 style={enter(60)} className="font-headline text-5xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="text-on-surface">About</span>
            <br />
            <span
              className="relative inline-block"
              style={{ WebkitTextStroke: "1px var(--color-outline-variant)" }}
            >
              <span className="text-transparent">Me.</span>
              {/* Reveal fill on visible */}
              <span
                className="absolute inset-0 text-on-surface/10 overflow-hidden"
                style={{
                  clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 1s cubic-bezier(.22,1,.36,1) 300ms",
                }}
              >
                Me.
              </span>
            </span>
          </h3>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 lg:gap-20 mb-20">

          {/* Bio */}
          <div className="space-y-5">
            <p style={enter(180)} className="text-on-surface-variant leading-relaxed">
              {t.about.bio1}
            </p>
            <p style={enter(240)} className="text-on-surface-variant leading-relaxed">
              {t.about.bio2}
            </p>

            {/* Highlighted quote */}
            <div
              style={enter(300)}
              className="mt-8 border-l-2 border-primary/40 pl-5"
            >
              <p className="text-sm text-on-surface-variant/70 italic leading-relaxed">
                "Clean code, intentional design — building things that actually matter."
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div>
            <p style={enter(220)} className="text-[10px] font-label uppercase tracking-[0.4em] text-outline mb-5">
              {t.about.infoLabel}
            </p>
            <ul className="space-y-1">
              {info.map((item, i) => (
                <li
                  key={item.label}
                  style={{
                    ...enter(260 + i * 55),
                    borderRadius: "10px",
                    padding: "9px 10px",
                    marginLeft: "-10px",
                    background: hoveredInfo === item.label
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                    boxShadow: hoveredInfo === item.label
                      ? "inset 0 0 0 1px rgba(255,255,255,0.06)"
                      : "none",
                    transition: (enter(260 + i * 55).transition as string) +
                      ", background 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredInfo(item.label)}
                  onMouseLeave={() => setHoveredInfo(null)}
                  className="flex items-center gap-3"
                >
                  <span
                    className="material-symbols-outlined text-[17px] transition-all duration-300 shrink-0"
                    style={{
                      color: item.highlight
                        ? "#22c55e"
                        : hoveredInfo === item.label
                          ? "var(--color-on-surface)"
                          : "var(--color-outline)",
                      fontVariationSettings: hoveredInfo === item.label
                        ? '"FILL" 1, "wght" 400'
                        : '"FILL" 0, "wght" 400',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-label uppercase tracking-widest text-outline w-16 shrink-0">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs font-label truncate ${
                      item.highlight ? "text-green-500 font-semibold" : "text-on-surface"
                    }`}
                  >
                    {item.value}
                  </span>
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0 ml-auto" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          style={enter(520)}
          className="border-t border-outline-variant/30 pt-10 flex flex-wrap gap-x-16 gap-y-6"
        >
          {stats.map((s, i) => (
            <div key={s.label} style={enter(560 + i * 70)}>
              <div className="font-headline text-4xl font-bold text-on-surface tabular-nums flex items-end gap-0.5">
                {s.count}
                <span className="text-primary mb-0.5">{s.suffix}</span>
              </div>
              <div className="text-[10px] font-label uppercase tracking-widest text-outline mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
