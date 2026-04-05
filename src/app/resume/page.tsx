"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { experienceMeta } from "@/components/ExperienceSection";
import { educationData } from "@/components/EducationSection";
import { projects } from "@/data/projects";
import Image from "next/image";

// Top 4 focused projects
const PINNED_PROJECTS = ["baznas-kantor-digital", "cinta-zakat", "siamri", "unu-course"];

export default function ResumePage() {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  const contactInfo = [
    { icon: "mail", value: "saeful2026027@gmail.com" },
    { icon: "phone", value: "(+62) 857-9886-4579" },
    { icon: "location_on", value: "Jakarta, Indonesia" },
    { icon: "language", value: "saeful.me" },
  ];

  const skillCategories = [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "JS"] },
    { name: "Backend", items: ["Laravel", "PHP", "REST API", "Express", "Python"] },
    { name: "Others", items: ["Git", "GCP", "Docker", "Figma", "UI/UX"] },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-black text-on-surface dark:text-white font-label print:bg-white print:text-black">
      {/* ── Toolbar (Hidden on Print) ── */}
      <nav className="sticky top-0 z-50 bg-surface/80 dark:bg-black/80 backdrop-blur-md border-b border-outline-variant/30 px-6 py-4 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {t.resume.back}
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-on-primary text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all font-headline"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          {t.resume.print}
        </button>
      </nav>

      {/* ── Resume Container (Perfect 1-Page A4) ── */}
      <main className="max-w-[850px] mx-auto bg-surface-container-lowest dark:bg-zinc-900/30 p-8 sm:p-12 md:p-16 my-0 sm:my-8 shadow-2xl print:shadow-none print:my-0 print:p-0 print:max-w-none print:bg-white leading-tight overflow-hidden print:w-[210mm] print:h-[297mm]">
        
        <div className="print:p-10 print:h-full print:flex print:flex-col">
          
          {/* Header Section (Compressed & Centered) */}
          <header className="text-center border-b border-zinc-100 pb-4 mb-6 print:pb-2 print:mb-4">
            <div className="flex flex-col items-center gap-4 print:gap-1.5">
              <div className="relative w-20 h-20 print:w-14 print:h-14 shrink-0 overflow-hidden rounded-xl border-2 border-primary/10 print:border-zinc-200">
                 <Image 
                  src="/profile.png" 
                  alt="Saeful Muminin" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 print:space-y-0.5">
                <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface dark:text-white print:text-black print:text-2xl">
                  Saeful Mu&apos;minin
                </h1>
                <p className="text-sm font-bold tracking-[0.25em] lowercase opacity-80 print:text-[8pt] print:mb-1 text-primary/80">
                  Full Stack Web Developer
                </p>
              </div>
            </div>
            
            {/* Contact Details Row */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4 print:mt-1 print:gap-x-6 print:gap-y-0.5 text-xs print:text-[8pt] print:text-zinc-600">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px] print:text-black print:text-[12px]">
                    {info.icon}
                  </span>
                  <span className="font-medium whitespace-nowrap">{info.value}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-10 print:grid-cols-[185px_1fr] print:gap-8 grow">
            
            {/* ── Left Sidebar (About, Skills, Education, Projects) ── */}
            <aside className="space-y-10 print:space-y-4">
              
              {/* About Me Section (Sidebar for Space) */}
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2 print:text-black print:mb-1 print:text-[8.5pt]">
                  <span className="w-3 h-px bg-primary/20 print:bg-black/40" />
                  {t.about.title}
                </h2>
                <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed print:text-zinc-700 print:text-[8pt] print:leading-snug">
                  {t.about.bio1} {t.about.bio2}
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2 print:text-black print:mb-1 print:text-[8.5pt]">
                  <span className="w-3 h-px bg-primary/20 print:bg-black/40" />
                  {t.resume.skills}
                </h2>
                <div className="space-y-4 print:space-y-1.5">
                  {skillCategories.map((cat) => (
                    <div key={cat.name}>
                      <p className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold mb-1 print:text-zinc-500 print:mb-0 print:text-[7pt]">
                        {cat.name}
                      </p>
                      <div className="flex flex-wrap gap-1 print:gap-0.5 text-[9px] print:text-[8pt] text-on-surface dark:text-zinc-300 print:text-black">
                        {cat.items.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2 print:text-black print:mb-1 print:text-[8.5pt]">
                  <span className="w-3 h-px bg-primary/20 print:bg-black/40" />
                  {t.resume.education}
                </h2>
                <div className="space-y-4 print:space-y-1.5">
                  {educationData.map((edu, i) => (
                    <div key={i} className="print:leading-tight">
                      <p className="font-bold text-xs print:text-[8pt] mb-0">{edu.degree[lang]}</p>
                      <p className="text-[9px] text-zinc-500 print:text-zinc-600 print:text-[7pt] mb-0">{edu.institution}</p>
                      <p className="text-[9px] text-primary/70 font-bold print:text-black print:text-[7pt]">
                        {edu.period[lang]} {edu.gpa ? `· ${edu.gpa}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Projects */}
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2 print:text-black print:mb-1 print:text-[8.5pt]">
                  <span className="w-3 h-px bg-primary/20 print:bg-black/40" />
                  {t.resume.projects}
                </h2>
                <ul className="space-y-4 print:space-y-1.5">
                  {projects
                    .filter((p) => PINNED_PROJECTS.includes(p.slug))
                    .map((p) => (
                      <li key={p.slug} className="print:leading-tight">
                        <p className="font-bold text-xs print:text-[8pt] mb-0">{p.title}</p>
                        <p className="text-[9px] text-zinc-500 line-clamp-2 print:text-zinc-600 print:text-[7pt]">
                          {p.description[lang]}
                        </p>
                      </li>
                    ))}
                </ul>
              </section>
            </aside>

            {/* ── Main Column (Work Experience Only) ── */}
            <div className="space-y-10 print:space-y-3">
              <section>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8 flex items-center gap-2 print:text-black print:mb-2 print:text-[9pt]">
                  <span className="w-4 h-px bg-primary/20 print:bg-black/40" />
                  {t.resume.experience}
                </h2>
                <div className="space-y-10 print:space-y-2">
                  {experienceMeta.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l border-outline-variant/10 print:pl-4 print:border-zinc-100">
                      <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-primary print:bg-black" />
                      <div className="flex justify-between items-start mb-1 print:mb-0">
                        <h3 className="font-bold text-lg print:text-[9.5pt] leading-tight text-on-surface dark:text-white print:text-black">{exp.title}</h3>
                        <span className="text-[10px] text-zinc-500 font-bold print:text-black print:text-[7.5pt] shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-primary text-[13px] font-bold mb-2 print:text-primary print:text-[8.5pt] print:mb-0.5">{exp.company}</p>
                      <p className="text-[13px] text-on-surface-variant dark:text-zinc-400 leading-relaxed print:text-zinc-800 print:text-[8pt] print:leading-snug">
                        {t.experience.items[i]?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* ── Definitive 1-Page CSS ── */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            margin: 0;
            padding: 0;
          }
          * {
            box-shadow: none !important;
            text-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
