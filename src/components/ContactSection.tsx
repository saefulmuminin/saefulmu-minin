"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const socials = [
  {
    label: "X", href: "https://x.com/saefulmuminin",
    icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/in/saeful-muminin",
    icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "GitHub", href: "https://github.com/saefulmuminin",
    icon: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  },
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
      className="relative px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 lg:py-32 bg-surface overflow-hidden"
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
      <div className="absolute top-0 left-4 sm:left-16 right-4 sm:right-16 h-px bg-outline-variant/20 overflow-hidden">
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
            className="group relative inline-flex items-center gap-3 sm:gap-4 py-4 sm:py-5 px-6 sm:px-10 overflow-hidden"
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
