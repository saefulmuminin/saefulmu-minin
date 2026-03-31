"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const navIcons = [
  { id: "home",       href: "#home",       icon: "home",         key: "home" },
  { id: "about",      href: "#about",      icon: "diamond",      key: "about" },
  { id: "work",       href: "#work",       icon: "work",         key: "work" },
  { id: "experience", href: "#experience", icon: "hub",          key: "experience" },
  { id: "skills",     href: "#skills",     icon: "auto_awesome", key: "skills" },
  { id: "education",  href: "#education",  icon: "school",       key: "education" },
  { id: "contact",    href: "#contact",    icon: "send",         key: "contact" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  // On non-home pages, prefix anchor hrefs with "/" so they navigate back to homepage
  const href = (anchor: string) => pathname === "/" ? anchor : `/${anchor}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorReady, setIndicatorReady] = useState(false);

  // Move indicator to active item
  useEffect(() => {
    const el = itemRefs.current[active];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorTop(elRect.top - containerRect.top);
      setIndicatorReady(true);
    }
  }, [active]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActive("work");
      return;
    }

    const threshold = window.innerHeight * 0.35; // trigger line at 35% from top

    const onScroll = () => {
      const ids = navIcons.map((n) => n.id);
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) current = id;
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    work: t.nav.work,
    experience: t.nav.experience,
    education: t.nav.education,
    skills: t.nav.skills,
    contact: t.nav.contact,
  };

  return (
    <aside className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-50">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[17px]">
          {isDark ? "light_mode" : "dark_mode"}
        </span>
      </button>

      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "id" : "en")}
        title={lang === "en" ? "Switch to Indonesian" : "Ganti ke Inggris"}
        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="text-[11px] font-bold font-label leading-none">
          {lang === "en" ? "ID" : "EN"}
        </span>
      </button>

      {/* Nav pill */}
      <div
        ref={containerRef}
        className="relative bg-surface-container-high rounded-full py-4 px-2.5 flex flex-col items-center gap-1"
      >
        {/* Sliding indicator */}
        <div
          className="absolute left-2.5 w-9 h-9 rounded-full bg-primary pointer-events-none"
          style={{
            top: indicatorTop,
            opacity: indicatorReady ? 1 : 0,
            transition: indicatorReady
              ? "top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease"
              : "none",
          }}
        />

        {navIcons.map((item, i) => (
          <div key={item.id}>
            {i === 1 && <div className="w-5 h-px bg-outline-variant my-1.5" />}
            <div className="relative flex items-center">
              {/* Active label */}
              {active === item.id && (
                <span className="absolute right-full mr-3 px-2.5 py-1 rounded-full bg-surface-container-highest text-primary text-[11px] font-label font-semibold whitespace-nowrap pointer-events-none animate-[fadeIn_0.2s_ease]">
                  {navLabels[item.key]}
                </span>
              )}
              <a
                ref={(el) => { itemRefs.current[item.id] = el; }}
                href={href(item.href)}
                title={navLabels[item.key]}
                onClick={() => setActive(item.id)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  active === item.id
                    ? "text-on-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        title="Back to top"
        className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[17px]">arrow_upward</span>
      </button>
    </aside>
  );
}
