import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saefulmuminin.dev";

export const metadata: Metadata = {
  title: "Resume & Pengalaman Kerja — Saeful Mu'minin",
  description:
    "Detail pengalaman profesional, keahlian teknis, dan latar belakang pendidikan Saeful Mu'minin sebagai Full Stack Web Developer. Berbasis di Jakarta, Indonesia, dengan fokus pada React, Next.js, dan Laravel.",
  keywords: [
    "Resume Saeful Muminin", "CV Developer", "Full Stack Developer Jakarta", 
    "Pengalaman Kerja IT", "Keahlian Laravel", "React Developer Indonesia", 
    "Next.js Expert", "Software Engineer Portofolio", "Jakarta Tech Talent"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Resume Profesional — Saeful Mu'minin",
    description:
      "Lihat latar belakang profesional, keahlian teknis, dan riwayat pengalaman Saeful Mu'minin di Jakarta, Indonesia.",
    url: `${baseUrl}/resume`,
    siteName: "Saeful Mu'minin",
    locale: "id_ID",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Saeful Mu'minin — Full Stack Developer",
    description:
      "Profil profesional dan keahlian teknis Saeful Mu'minin, Full Stack Developer berbasis di Jakarta.",
    creator: "@saefulmuminin",
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
