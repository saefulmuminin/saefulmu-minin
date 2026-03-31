"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  { label: "X",        href: "#",                                    icon: <span className="text-[11px] font-bold font-label leading-none">X</span> },
  { label: "LinkedIn", href: "https://linkedin.com/in/saeful-muminin", icon: <span className="material-symbols-outlined text-[15px]">business_center</span> },
  { label: "GitHub",   href: "https://github.com/saefulmuminin",      icon: <span className="material-symbols-outlined text-[15px]">code</span> },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible, setVisible]   = useState(false);
  const [mouse, setMouse]       = useState({ x: 50, y: 50 });
  const [emailHover, setEmail]  = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const enter = (delay: number): React.CSSProperties => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(40px)",
    filter:    visible ? "blur(0px)"       : "blur(8px)",
    transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms,
                 filter .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <footer
      id="contact"
      ref={sectionRef}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
      className="relative px-16 lg:px-24 py-32 bg-surface overflow-hidden"
    >
      {/* Cursor spotlight — stronger for dramatic feel */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%,
          rgba(99,102,241,0.07) 0%,
          rgba(239,68,68,0.04) 40%,
          transparent 70%)`,
        transition: "background 0.35s ease",
      }} />

      {/* Top divider line that draws in */}
      <div className="absolute top-0 left-16 right-16 h-px bg-outline-variant/20 overflow-hidden">
        <div style={{
          width: visible ? "100%" : "0%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--color-outline-variant), transparent)",
          transition: "width 1.2s cubic-bezier(.22,1,.36,1) 100ms",
        }} />
      </div>

      {/* Decorative large text background */}
      <div className="absolute bottom-12 right-12 select-none pointer-events-none z-0" style={enter(0)}>
        <span className="font-headline font-bold text-[100px] lg:text-[140px] leading-none text-on-surface opacity-[0.02] tracking-tighter">
          07
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Label */}
        <div style={enter(0)} className="flex items-center gap-3 mb-10">
          <span className="h-px bg-primary opacity-50" style={{ width: visible ? "2rem" : "0", transition: "width 0.6s cubic-bezier(.22,1,.36,1) 120ms" }} />
          <span className="text-[10px] font-label uppercase tracking-[0.4em] text-outline">
            Let&apos;s Connect
          </span>
          <span className="h-px bg-primary opacity-50" style={{ width: visible ? "2rem" : "0", transition: "width 0.6s cubic-bezier(.22,1,.36,1) 120ms" }} />
        </div>

        {/* Main heading — word-by-word reveal */}
        <div style={enter(80)} className="mb-6 max-w-2xl">
          <h3 className="font-headline text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-tight">
            {t.contact.heading}
          </h3>
        </div>

        {/* Sub */}
        <p style={enter(180)} className="text-on-surface-variant font-light max-w-md mb-14">
          {t.contact.sub}
        </p>

        {/* Email button — fills on hover */}
        <div style={enter(260)}>
          <a
            href="mailto:saeful2026027@gmail.com"
            onMouseEnter={() => setEmail(true)}
            onMouseLeave={() => setEmail(false)}
            className="group relative inline-flex items-center gap-4 py-5 px-10 overflow-hidden"
            style={{
              border: "1px solid",
              borderColor: emailHover ? "var(--color-primary)" : "var(--color-outline-variant)",
              transition: "border-color 0.4s ease",
            }}
          >
            {/* Fill bg slides in */}
            <div
              className="absolute inset-0"
              style={{
                background: "var(--color-primary)",
                transform: emailHover ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
              }}
            />
            <span
              className="relative text-sm font-label uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ color: emailHover ? "var(--color-on-primary)" : "var(--color-primary)" }}
            >
              saeful2026027@gmail.com
            </span>
            <span
              className="relative material-symbols-outlined transition-all duration-300"
              style={{
                color: emailHover ? "var(--color-on-primary)" : "var(--color-primary)",
                transform: emailHover ? "translateX(4px)" : "translateX(0)",
              }}
            >
              arrow_forward
            </span>
          </a>
        </div>

        {/* Social links */}
        <div style={enter(360)} className="flex items-center gap-4 mt-10">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              title={s.label}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={enter(380 + i * 60)}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-on-surface transition-all duration-300 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Footer line */}
        <div style={enter(480)} className="mt-20 pt-8 border-t border-outline-variant/20 w-full max-w-sm">
          <p className="text-[10px] font-label uppercase tracking-[0.3em] text-outline text-center">
            {t.landing.footer}
          </p>
        </div>

      </div>
    </footer>
  );
}
