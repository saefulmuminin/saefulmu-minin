"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "id";

export const translations = {
  en: {
    hero: {
      name: "Hey, I'm Saeful",
      bio: "Full Stack Web Developer focused on building dynamic and responsive web apps using modern technologies like Laravel, React, and Next.js.",
      cta: "Let's talk",
      cv: "Download CV",
    },
    landing: {
      headline: "Crafting fast, modern web apps from front to back",
      h1: "Crafting",
      h2: "fast, modern web apps",
      h3: "from front to back.",
      badge: "Available · Open to Work",
      tagline: "Building pixel-perfect, high-performance digital products with React, Next.js & Laravel.",
      ctaWork: "See My Work",
      ctaContact: "Let's Talk",
      yearsExp: "Years of experience",
      programs: "Bootcamp & Programs",
      footer: "Saeful Mu'minin — Full Stack Web Developer (2020-25©)",
    },
    about: {
      title: "About Me",
      bio1: "I am a Full Stack Web Developer with skills in developing dynamic and responsive web applications using modern technologies such as HTML, CSS, JavaScript, PHP, and Laravel.",
      bio2: "Proven ability to work effectively both independently and in a team. I am passionate about crafting clean, efficient code and turning ideas into real, working products.",
      infoLabel: "Personal Info",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationVal: "Jakarta, Indonesia",
      availLabel: "Status",
      availVal: "Available for Work",
    },
    work: {
      title: "Selected Works",
      title1: "Selected",
      title2: "Works.",
    },
    experience: {
      title: "Experience",
      items: [
        {
          description:
            "Working as a Full Stack Developer at BAZNAS (Badan Amil Zakat Nasional) under the Directorate of Innovation and Information Technology. Building and maintaining internal web systems using modern full-stack technologies to support digital transformation across the organization.",
        },
        {
          description:
            "Developed and maintained web applications as a freelance developer and designer. Worked on various client projects covering frontend and backend development using modern frameworks and tools.",
        },
        {
          description:
            "Completed an intensive Full Stack Web Development Bootcamp covering React, Node.js, Express, REST APIs, and database management. Built real-world projects in a collaborative environment.",
        },
        {
          description:
            "Participated in an independent study program focused on 3D animation techniques and problem-solving projects, expanding skills across creative and technical disciplines.",
        },
        {
          description:
            "Completed the BDT Web Development Bootcamp 2023 as a programmer. Practiced software engineering and web development skills through hands-on projects and mentorship sessions.",
        },
        {
          description:
            "Delivered freelance software engineering and web development services. Built dynamic and responsive web applications using HTML, CSS, JavaScript, PHP, and Laravel for various clients.",
        },
      ],
    },
    education: {
      title: "Education",
    },
    skills: {
      label: "Technical Stack",
    },
    landing3d: {
      hint: "Drag to rotate · Click outside to close",
      alt: "3D project view",
      backLabel: "Full Stack Project",
      view3d: "3D View",
      viewProjectDetail: "View Project Detail",
    },
    contact: {
      heading: "Let's build something great together.",
      sub: "Open for freelance projects, collaborations, and full-time opportunities.",
    },
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    common: {
      backToHome: "Back to Home",
      seeAll: "See All",
      seeAllWorks: "See All Works",
      projects: "Projects",
      items: "Items",
      noProjects: "No projects found",
      back: "Back",
      viewProject: "View Project",
    },
    allProjects: {
      title: "All Projects",
      description: "Browse through my complete portfolio of projects, ranging from Landing Pages, Fintech, Government systems, to Internal Tools and more.",
      all: "All",
    },
    projectDetail: {
      overview: "Overview",
      problem: "The Problem",
      solution: "The Solution",
      features: "Key Features",
      technologies: "Technologies",
      role: "Role",
      duration: "Duration",
      year: "Year",
      livePreview: "Live Preview",
      viewSource: "View Source",
    },
    heroSections: {
      home:       { label: "",              title: "",                         desc: "" },
      about:      { label: "About Me",      title: "Hey, I'm Saeful",          desc: "" },
      work:       { label: "My Work",       title: "Works & Projects",         desc: "Projects built with purpose — shipped, scaled & crafted with care." },
      experience: { label: "Experience",    title: "Career Journey",           desc: "4+ years delivering full-stack solutions across startups & products." },
      skills:     { label: "Tech Stack",    title: "My Technologies",          desc: "React, Next.js, TypeScript, Laravel & a growing toolkit of modern tech." },
      education:  { label: "Education",     title: "Educational Background",   desc: "Continuous learner — always evolving with the craft." },
      contact:    { label: "Let's Connect", title: "Let's Collaborate",        desc: "Open to collaborations, opportunities & interesting conversations." },
    },
    resume: {
      back: "Back to Portfolio",
      download: "Download PDF",
      print: "Print Resume",
      contact: "Contact Information",
      summary: "Professional Summary",
      experience: "Work Experience",
      education: "Education",
      skills: "Technical Skills",
      projects: "Key Projects",
    },
  },
  id: {
    hero: {
      name: "Hei, Saya Saeful",
      bio: "Full Stack Web Developer yang fokus membangun aplikasi web dinamis dan responsif menggunakan teknologi modern seperti Laravel, React, dan Next.js.",
      cta: "Hubungi Saya",
      cv: "Unduh CV",
    },
    landing: {
      headline: "Membangun aplikasi web modern, cepat, dari depan hingga belakang",
      h1: "Membangun",
      h2: "aplikasi web modern & cepat",
      h3: "dari depan hingga belakang.",
      badge: "Tersedia · Siap Bekerja",
      tagline: "Membangun produk digital berkinerja tinggi dengan React, Next.js & Laravel.",
      ctaWork: "Lihat Karya",
      ctaContact: "Hubungi Saya",
      yearsExp: "Tahun pengalaman",
      programs: "Bootcamp & Program",
      footer: "Saeful Mu'minin — Full Stack Web Developer (2020-25©)",
    },
    about: {
      title: "Tentang Saya",
      bio1: "Saya adalah Full Stack Web Developer dengan keahlian dalam mengembangkan aplikasi web yang dinamis dan responsif menggunakan teknologi modern seperti HTML, CSS, JavaScript, PHP, dan Laravel.",
      bio2: "Terbukti mampu bekerja secara efektif baik secara mandiri maupun dalam tim. Saya memiliki semangat untuk menulis kode yang bersih dan efisien, serta mengubah ide menjadi produk yang nyata.",
      infoLabel: "Info Pribadi",
      name: "Nama Lengkap",
      email: "Email",
      phone: "Telepon",
      location: "Lokasi",
      locationVal: "Jakarta, Indonesia",
      availLabel: "Status",
      availVal: "Tersedia untuk Kerja",
    },
    work: {
      title: "Karya Pilihan",
      title1: "Karya",
      title2: "Pilihan.",
    },
    experience: {
      title: "Pengalaman",
      items: [
        {
          description:
            "Bekerja sebagai Full Stack Developer di BAZNAS (Badan Amil Zakat Nasional) di bawah Direktorat Inovasi dan Teknologi Informasi. Membangun dan memelihara sistem web internal menggunakan teknologi full-stack modern untuk mendukung transformasi digital organisasi.",
        },
        {
          description:
            "Mengembangkan dan memelihara aplikasi web sebagai pengembang dan desainer lepas. Mengerjakan berbagai proyek klien yang mencakup pengembangan frontend dan backend menggunakan framework modern.",
        },
        {
          description:
            "Menyelesaikan Bootcamp Full Stack Web Development intensif yang mencakup React, Node.js, Express, REST API, dan manajemen database. Membangun proyek nyata dalam lingkungan kolaboratif.",
        },
        {
          description:
            "Berpartisipasi dalam program studi mandiri yang berfokus pada teknik animasi 3D dan proyek pemecahan masalah, mengembangkan keterampilan di bidang kreatif dan teknis.",
        },
        {
          description:
            "Menyelesaikan BDT Web Development Bootcamp 2023 sebagai programmer. Mempraktikkan keahlian rekayasa perangkat lunak dan pengembangan web melalui proyek langsung dan sesi mentoring.",
        },
        {
          description:
            "Memberikan layanan rekayasa perangkat lunak dan pengembangan web lepas. Membangun aplikasi web dinamis dan responsif menggunakan HTML, CSS, JavaScript, PHP, dan Laravel untuk berbagai klien.",
        },
      ],
    },
    education: {
      title: "Pendidikan",
    },
    skills: {
      label: "Keahlian Teknis",
    },
    landing3d: {
      hint: "Geser untuk memutar · Klik di luar untuk menutup",
      alt: "Tampilan proyek 3D",
      backLabel: "Proyek Full Stack",
      view3d: "Tampilan 3D",
      viewProjectDetail: "Lihat Detail Proyek",
    },
    contact: {
      heading: "Ayo buat sesuatu yang luar biasa bersama.",
      sub: "Terbuka untuk proyek lepas, kolaborasi, dan peluang penuh waktu.",
    },
    nav: {
      home: "Beranda",
      about: "Tentang",
      work: "Karya",
      experience: "Pengalaman",
      education: "Pendidikan",
      skills: "Keahlian",
      contact: "Kontak",
    },
    common: {
      backToHome: "Kembali ke Beranda",
      seeAll: "Lihat Semua",
      seeAllWorks: "Lihat Semua Karya",
      projects: "Proyek",
      items: "Item",
      noProjects: "Proyek tidak ditemukan",
      back: "Kembali",
      viewProject: "Lihat Proyek",
    },
    allProjects: {
      title: "Semua Proyek",
      description: "Jelajahi portofolio lengkap saya, mulai dari Landing Page, Fintech, Sistem Pemerintahan, hingga Internal Tool dan lainnya.",
      all: "Semua",
    },
    projectDetail: {
      overview: "Ikhtisar",
      problem: "Masalah",
      solution: "Solusi",
      features: "Fitur Utama",
      technologies: "Teknologi",
      role: "Peran",
      duration: "Durasi",
      year: "Tahun",
      livePreview: "Pratinjau Langsung",
      viewSource: "Lihat Kode",
    },
    heroSections: {
      home:       { label: "",                title: "",                    desc: "" },
      about:      { label: "Tentang Saya",    title: "Hei, Saya Saeful",    desc: "" },
      work:       { label: "Karya Saya",      title: "Karya & Proyek",      desc: "Proyek yang dibangun dengan tujuan — dirilis, diskalakan & dibuat dengan cermat." },
      experience: { label: "Pengalaman",      title: "Perjalanan Karir",    desc: "4+ tahun menghadirkan solusi full-stack di berbagai startup & produk." },
      skills:     { label: "Teknologi",       title: "Teknologi Saya",      desc: "React, Next.js, TypeScript, Laravel & toolkit modern yang terus berkembang." },
      education:  { label: "Pendidikan",      title: "Latar Pendidikan",    desc: "Pelajar yang terus berkembang — selalu berevolusi bersama keahlian." },
      contact:    { label: "Ayo Terhubung",   title: "Ayo Berkolaborasi",   desc: "Terbuka untuk kolaborasi, peluang & percakapan yang menarik." },
    },
    resume: {
      back: "Kembali ke Portofolio",
      download: "Unduh PDF",
      print: "Cetak Resume",
      contact: "Informasi Kontak",
      summary: "Ringkasan Profesional",
      experience: "Pengalaman Kerja",
      education: "Pendidikan",
      skills: "Keahlian Teknis",
      projects: "Proyek Pilihan",
    },
  },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["en"];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "id") {
      setTimeout(() => setLangState(saved), 0);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
