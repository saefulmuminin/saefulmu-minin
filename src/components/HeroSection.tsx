"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ── Per-section data ───────────────────────────────────────────────────────────
const SECTION_IDS = [
  "home",
  "about",
  "work",
  "experience",
  "skills",
  "education",
  "contact",
];

const SECTION_IMG: Record<string, string> = {
  home: "/profile.png",
  about: "/abouts.png",
  work: "/karya.png",
  experience: "/pengalaman.png",
  skills: "/KeahlianTeknis.png",
  education: "/pendidikan.png",
  contact: "/hubungi.png",
};

// Crossfade between two image layers to avoid remount flash
function CrossfadeImg({
  src,
  objectPosition,
  filter,
  maskImage,
  style,
}: {
  src: string;
  objectPosition?: string;
  filter?: string;
  maskImage?: string;
  style?: React.CSSProperties;
}) {
  const [layers, setLayers] = useState({
    a: { src, visible: true },
    b: { src, visible: false },
  });
  const isACurrentRef = useRef(true);

  useEffect(() => {
    setLayers((prev: typeof layers) => {
      const currentSrc = isACurrentRef.current ? prev.a.src : prev.b.src;
      if (src === currentSrc) return prev;
      if (isACurrentRef.current) {
        isACurrentRef.current = false;
        return { a: { ...prev.a, visible: false }, b: { src, visible: true } };
      } else {
        isACurrentRef.current = true;
        return { a: { src, visible: true }, b: { ...prev.b, visible: false } };
      }
    });
  }, [src]);

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: objectPosition ?? "center",
    filter,
    maskImage,
    WebkitMaskImage: maskImage,
    transition: "opacity 0.75s ease, transform 0.75s ease",
    ...style,
  };

  return (
    <>
      <Image
        src={layers.a.src}
        alt=""
        aria-hidden
        draggable={false}
        fill
        style={{
          ...base,
          opacity: layers.a.visible ? 1 : 0,
          transform: layers.a.visible ? "scale(1)" : "scale(1.05)",
        }}
      />
      <Image
        src={layers.b.src}
        alt=""
        aria-hidden
        draggable={false}
        fill
        style={{
          ...base,
          opacity: layers.b.visible ? 1 : 0,
          transform: layers.b.visible ? "scale(1)" : "scale(1.05)",
        }}
      />
    </>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const sideRef = useRef<HTMLElement>(null);
  const sideRef2 = useRef<HTMLElement>(null);
  const prevSectionRef = useRef("home");

  const pathname = usePathname();
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    xp: 50,
    yp: 50,
    inside: false,
  });
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState(
    pathname.startsWith("/work") ? "work" : "home",
  );
  const [txKey, setTxKey] = useState(0);
  const [heroOpen, setHeroOpen] = useState(false);

  // Dark mode sync
  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setTimeout(() => setActiveSection("work"), 0);
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
        setTxKey((k: number) => k + 1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = heroOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [heroOpen]);

  const sSection =
    t.heroSections[activeSection as keyof typeof t.heroSections] ??
    t.heroSections.home;
  const currentImg = SECTION_IMG[activeSection] ?? SECTION_IMG.home;
  const currentDesc = sSection.desc || t.hero.bio;
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

  const px = (f: number) => `${(mouse.xp - 50) * f}px`;
  const py = (f: number) => `${(mouse.yp - 50) * f}px`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      xp: ((e.clientX - r.left) / r.width) * 100,
      yp: ((e.clientY - r.top) / r.height) * 100,
      inside: true,
    });
  };

  const socialLinks = [
    {
      href: "https://x.com/saefulmuminin",
      title: "X (Twitter)",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/in/saeful-muminin",
      title: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: "https://github.com/saefulmuminin",
      title: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ];

  // Shared inner content of the hero card
  const innerContent = (
    <>
      <CrossfadeImg src={currentImg} objectPosition="85% center" />
      <CrossfadeImg
        src={currentImg}
        objectPosition="85% center"
        filter="grayscale(1)"
        maskImage={pMask}
      />

      {txKey > 0 && (
        <div
          key={`wipe-${txKey}`}
          className="absolute inset-0 pointer-events-none z-6"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)",
            animation: "heroWipe 0.6s ease-out forwards",
          }}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-linear-to-t from-surface via-surface/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />

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

      {/* Top bar */}
      <div
        className="absolute top-7 left-7 right-7 flex justify-between items-start z-10"
        style={{
          transform: `translate(${px(0.05)},${py(0.03)})`,
          transition: "transform 0.25s ease-out",
        }}
      >
        <div className="w-11 h-11 rounded-full bg-surface-container-high dark:bg-[#1a1f35]/90 border border-outline-variant dark:border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="Logo"
            draggable={false}
            width={28}
            height={28}
            className="object-contain select-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.title}
              href={s.href}
              title={s.title}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-surface-container-high dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-on-surface-variant dark:text-white/70 hover:text-on-surface dark:hover:text-white transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Available badge */}
      <div
        className="absolute left-3 top-[45%] z-10 flex flex-col items-center gap-2 bg-surface-container/60 dark:bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-3"
        style={{
          transform: `translateY(-50%) translate(${px(0.03)},${py(0.04)})`,
          transition: "transform 0.30s ease-out",
        }}
      >
        <span
          className="text-[9px] font-label uppercase tracking-[0.15em] text-on-surface-variant dark:text-white/50 select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Available for Work
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 animate-pulse" />
      </div>

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 px-7 pb-7 z-10"
        style={{
          transform: `translate(${px(0.06)},${py(0.04)})`,
          transition: "transform 0.28s ease-out",
        }}
      >
        <div className="h-5 mb-2 overflow-hidden">
          {currentLabel ? (
            <span
              key={`label-${txKey}`}
              className="flex items-center gap-2 text-[10px] font-label font-bold tracking-[0.3em] uppercase"
              style={{
                color: isDark ? "#f97316" : "#6366f1",
                animation:
                  "heroLabelIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards",
              }}
            >
              <span
                className="w-4 h-px"
                style={{ background: isDark ? "#f97316" : "#6366f1" }}
              />
              {currentLabel}
            </span>
          ) : null}
        </div>

        <h2
          key={`title-${txKey}`}
          className="font-headline text-3xl font-bold text-on-surface dark:text-white tracking-tighter mb-2"
          style={{
            animation:
              txKey > 0
                ? "heroTextIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards"
                : undefined,
          }}
        >
          {currentTitle}
        </h2>

        <p
          key={`desc-${txKey}`}
          className="text-sm text-on-surface-variant dark:text-white/60 leading-relaxed mb-6"
          style={{
            animation:
              txKey > 0
                ? "heroTextIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards"
                : undefined,
          }}
        >
          {currentDesc}
        </p>

        <div className="h-px bg-outline-variant dark:bg-white/10 mb-6" />

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 hover:scale-105 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_outward
            </span>
          </a>
          <a
            href="#contact"
            className="py-2.5 px-6 rounded-full bg-primary text-on-primary font-label font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {t.hero.cta}
          </a>
          <Link
            href="/resume"
            className="flex items-center gap-1.5 text-on-surface-variant dark:text-white/50 text-xs font-label hover:text-on-surface dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">
              description
            </span>
            {t.hero.cv}
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP — fixed left panel (lg+)
      ══════════════════════════════════════════ */}
      <aside
        ref={sideRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse((m) => ({ ...m, inside: false }))}
        className="hidden lg:block fixed left-4 top-4 bottom-4 w-[360px] overflow-hidden bg-surface border border-outline-variant/30 dark:bg-black dark:border-white/5 rounded-3xl z-40 shadow-2xl"
      >
        {innerContent}
      </aside>

      {/* ══════════════════════════════════════════
          MOBILE — floating trigger pill (< lg)
      ══════════════════════════════════════════ */}
      <button
        onClick={() => setHeroOpen(true)}
        className={`lg:hidden fixed left-3 z-70 flex items-center gap-2.5 pl-1 pr-4 py-1 rounded-full shadow-lg overflow-hidden ${pathname.startsWith("/work") ? "top-[58px]" : "top-3"}`}
        style={{
          background: "var(--color-surface-container-high)",
          border: "1px solid var(--color-outline-variant)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Thumbnail portrait */}
        <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
          <Image
            src={currentImg}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "85% center" }}
          />
        </div>
        <span className="text-[11px] font-label font-semibold text-on-surface leading-none">
          {t.hero.name}
        </span>
        <span className="material-symbols-outlined text-[15px] text-outline">
          expand_circle_down
        </span>
      </button>

      {/* ══════════════════════════════════════════
          MOBILE — fullscreen overlay (< lg)
      ══════════════════════════════════════════ */}
      <div
        className="lg:hidden fixed inset-0 z-200"
        style={{
          opacity: heroOpen ? 1 : 0,
          pointerEvents: heroOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setHeroOpen(false)}
        />

        {/* Panel slides up */}
        <aside
          ref={sideRef2}
          onMouseMove={handleMouseMove}
          onMouseLeave={() =>
            setMouse((m: typeof mouse) => ({ ...m, inside: false }))
          }
          className="absolute inset-0 overflow-hidden bg-surface dark:bg-black"
          style={{
            transform: heroOpen ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {innerContent}

          {/* Close button */}
          <button
            onClick={() => setHeroOpen(false)}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-label font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
            style={{
              background: "var(--color-surface-container-high)",
              border: "1px solid var(--color-outline-variant)",
            }}
          >
            <span className="material-symbols-outlined text-[16px]">
              keyboard_arrow_down
            </span>
            Tutup
          </button>
        </aside>
      </div>
    </>
  );
}
