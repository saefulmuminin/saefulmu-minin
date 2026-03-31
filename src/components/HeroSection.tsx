"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";

// ── Per-section data ───────────────────────────────────────────────────────────
const SECTION_IDS = ["home", "about", "work", "experience", "skills", "education", "contact"];

const SECTION_IMG: Record<string, string> = {
  home:       "profile.png",
  about:      "abouts.png",
  work:       "karya.png",
  experience: "pengalaman.png",
  skills:     "KeahlianTeknis.png",
  education:  "pendidikan.png",
  contact:    "hubungi.png",
};

// Crossfade between two image layers to avoid remount flash
function CrossfadeImg({
  src, objectPosition, filter, maskImage, style,
}: {
  src: string; objectPosition?: string; filter?: string;
  maskImage?: string; style?: React.CSSProperties;
}) {
  const [layers, setLayers] = useState({ a: { src, visible: true }, b: { src, visible: false } });
  const toggleRef = useRef(true); // true = A is current
  const pendingRef = useRef<typeof layers | null>(null);

  useEffect(() => {
    if (src === (toggleRef.current ? layers.a.src : layers.b.src)) return;
    if (toggleRef.current) {
      // Bring B in with new src, fade A out
      pendingRef.current = { a: { ...layers.a, visible: false }, b: { src, visible: true } };
      toggleRef.current = false;
    } else {
      // Bring A in with new src, fade B out
      pendingRef.current = { a: { src, visible: true }, b: { ...layers.b, visible: false } };
      toggleRef.current = true;
    }
  }, [src, layers.a.src, layers.b.src]); // eslint-disable-line

  useEffect(() => {
    if (pendingRef.current) {
      setLayers(pendingRef.current);
      pendingRef.current = null;
    }
  }, []);

  const base: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", objectPosition: objectPosition ?? "center",
    filter, maskImage, WebkitMaskImage: maskImage,
    transition: "opacity 0.75s ease, transform 0.75s ease",
    ...style,
  };

  return (
    <>
      <img src={layers.a.src} alt="" aria-hidden draggable={false}
        style={{ ...base, opacity: layers.a.visible ? 1 : 0, transform: layers.a.visible ? "scale(1)" : "scale(1.05)" }} />
      <img src={layers.b.src} alt="" aria-hidden draggable={false}
        style={{ ...base, opacity: layers.b.visible ? 1 : 0, transform: layers.b.visible ? "scale(1)" : "scale(1.05)" }} />
    </>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const sideRef = useRef<HTMLElement>(null);
  const prevSectionRef = useRef("home");

  const pathname = usePathname();
  const [mouse, setMouse]                = useState({ x: 0, y: 0, xp: 50, yp: 50, inside: false });
  const [isDark, setIsDark]              = useState(true);
  const [activeSection, setActiveSection] = useState(pathname.startsWith("/work") ? "work" : "home");
  const [txKey, setTxKey]                = useState(0); // bumps text animation

  // Dark mode sync
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActiveSection("work");
      return;
    }

    const threshold = window.innerHeight * 0.4;
    const onScroll = () => {
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      if (current !== prevSectionRef.current) {
        prevSectionRef.current = current;
        setActiveSection(current);
        setTxKey((k) => k + 1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sSection   = t.heroSections[activeSection as keyof typeof t.heroSections] ?? t.heroSections.home;
  const currentImg   = SECTION_IMG[activeSection] ?? SECTION_IMG.home;
  const currentDesc  = sSection.desc || t.hero.bio;
  const currentTitle = sSection.title || t.hero.name;
  const currentLabel = sSection.label;

  // Portrait spotlight mask
  const pMask = mouse.inside
    ? isDark
      ? `radial-gradient(circle 115px at ${mouse.x}px ${mouse.y}px, transparent 28%, rgba(0,0,0,0.75) 58%, black 80%)`
      : `radial-gradient(circle 115px at ${mouse.x}px ${mouse.y}px, black 22%, rgba(0,0,0,0.45) 52%, transparent 76%)`
    : isDark
      ? "linear-gradient(black,black)"
      : "linear-gradient(transparent,transparent)";

  // Parallax helpers
  const px = (f: number) => `${(mouse.xp - 50) * f}px`;
  const py = (f: number) => `${(mouse.yp - 50) * f}px`;

  return (
    <aside
      ref={sideRef}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top,
          xp: ((e.clientX - r.left) / r.width) * 100,
          yp: ((e.clientY - r.top) / r.height) * 100,
          inside: true });
      }}
      onMouseLeave={() => setMouse((m) => ({ ...m, inside: false }))}
      className="fixed left-4 top-4 bottom-4 w-[360px] overflow-hidden bg-surface border border-outline-variant/30 dark:bg-black dark:border-white/5 rounded-3xl z-40 shadow-2xl"
    >
      {/* ── Color base — crossfade on section change ── */}
      <CrossfadeImg
        src={currentImg}
        objectPosition="85% center"
      />

      {/* ── Grayscale overlay — spotlight mask, also crossfades ── */}
      <CrossfadeImg
        src={currentImg}
        objectPosition="85% center"
        filter="grayscale(1)"
        maskImage={pMask}
      />

      {/* ── Section-change wipe (neutral white) ── */}
      {txKey > 0 && (
        <div
          key={`wipe-${txKey}`}
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)",
            animation: "heroWipe 0.6s ease-out forwards",
          }}
        />
      )}

      {/* ── Bottom gradient scrim ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-surface via-surface/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />

      {/* ── Cursor glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(260px circle at ${mouse.xp}% ${mouse.yp}%, ${
            isDark ? "rgba(239,68,68,0.07)" : "rgba(99,102,241,0.07)"
          } 0%, transparent 65%)`,
          opacity: mouse.inside ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Top bar — parallax ── */}
      <div
        className="absolute top-7 left-7 right-7 flex justify-between items-start z-10"
        style={{ transform: `translate(${px(0.05)},${py(0.03)})`, transition: "transform 0.25s ease-out" }}
      >
        <div className="w-11 h-11 rounded-full bg-surface-container-high dark:bg-[#1a1f35]/90 border border-outline-variant dark:border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" draggable={false} className="w-7 h-7 object-contain select-none" />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { href: "#",                                 title: "X",        content: <span className="text-[11px] font-bold font-label leading-none">X</span> },
            { href: "https://linkedin.com/in/saeful-muminin", title: "LinkedIn", content: <span className="material-symbols-outlined text-[15px]">business_center</span> },
            { href: "https://github.com/saefulmuminin",  title: "GitHub",   content: <span className="material-symbols-outlined text-[15px]">code</span> },
          ].map((s) => (
            <a key={s.title} href={s.href} title={s.title}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-9 h-9 rounded-full bg-surface-container-high dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-on-surface-variant dark:text-white/70 hover:text-on-surface dark:hover:text-white transition-colors">
              {s.content}
            </a>
          ))}
        </div>
      </div>

      {/* ── Available for Work badge ── */}
      <div
        className="absolute left-3 top-[45%] z-10 flex flex-col items-center gap-2 bg-surface-container/60 dark:bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-3"
        style={{ transform: `translateY(-50%) translate(${px(0.03)},${py(0.04)})`, transition: "transform 0.30s ease-out" }}
      >
        <span className="text-[9px] font-label uppercase tracking-[0.15em] text-on-surface-variant dark:text-white/50 select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Available for Work
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
      </div>

      {/* ── Bottom content — parallax + section-aware text ── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-7 pb-7 z-10"
        style={{ transform: `translate(${px(0.06)},${py(0.04)})`, transition: "transform 0.28s ease-out" }}
      >
        {/* Section label — animates on change */}
        <div className="h-5 mb-2 overflow-hidden">
          {currentLabel ? (
            <span
              key={`label-${txKey}`}
              className="flex items-center gap-2 text-[10px] font-label font-bold tracking-[0.3em] uppercase"
              style={{
                color: isDark ? "#f97316" : "#6366f1",
                animation: "heroLabelIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards",
              }}
            >
              <span className="w-4 h-px" style={{ background: isDark ? "#f97316" : "#6366f1" }} />
              {currentLabel}
            </span>
          ) : null}
        </div>

        {/* Name — always visible */}
        <h2
          key={`title-${txKey}`}
          className="font-headline text-3xl font-bold text-on-surface dark:text-white tracking-tighter mb-2"
          style={{ animation: txKey > 0 ? "heroTextIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards" : undefined }}
        >
          {currentTitle}
        </h2>

        {/* Description — slides in on section change */}
        <p
          key={`desc-${txKey}`}
          className="text-sm text-on-surface-variant dark:text-white/60 leading-relaxed mb-6"
          style={{ animation: txKey > 0 ? "heroTextIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards" : undefined }}
        >
          {currentDesc}
        </p>

        <div className="h-px bg-outline-variant dark:bg-white/10 mb-6" />

        <div className="flex items-center gap-3">
          <a href="#contact" className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
          </a>
          <a href="#contact" className="py-2.5 px-6 rounded-full bg-primary text-on-primary font-label font-semibold text-sm hover:opacity-90 transition-opacity">
            {t.hero.cta}
          </a>
          <button className="flex items-center gap-1.5 text-on-surface-variant dark:text-white/50 text-xs font-label hover:text-on-surface dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[14px]">download</span>
            {t.hero.cv}
          </button>
        </div>
      </div>
    </aside>
  );
}
