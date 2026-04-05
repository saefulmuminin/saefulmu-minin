import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import AllProjectsContent from "@/components/AllProjectsContent";
import { projects } from "@/data/projects";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saefulmuminin.dev";

export const metadata = {
  title: "Proyek & Portfolio — Saeful Mu'minin | Full Stack Web Developer",
  description: "Jelajahi kumpulan proyek pengembangan web dan aplikasi mobile oleh Saeful Mu'minin. Berbasis di Jakarta, Indonesia, fokus pada performa tinggi menggunakan Next.js, React, Laravel, dan TypeScript. Solusi digital kreatif untuk berbagai industri.",
  keywords: [
    "Portfolio Proyek", "Saeful Muminin", "Full Stack Developer Jakarta", 
    "Web Developer Indonesia", "Next.js Indonesia", "Laravel Developer", 
    "React Developer Jakarta", "Fintech Engineer", "EdTech Solutions", 
    "Sistem Informasi BAZNAS", "Digital Transformation Indonesia"
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
    title: "Portfolio Proyek & Digital Products — Saeful Mu'minin",
    description: "Koleksi aplikasi web dan mobile full-stack yang dikembangkan oleh Saeful Mu'minin di Jakarta, Indonesia.",
    url: `${baseUrl}/work`,
    siteName: "Saeful Mu'minin",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Proyek — Saeful Mu'minin",
    description: "Showcase proyek digital inovatif oleh Saeful Mu'minin, Full Stack Developer berbasis di Jakarta.",
    creator: "@saefulmuminin",
  },
};

export default function Page() {
  return (
    <>
      <LanguageProvider>
        <AllProjectsContent allProjects={projects} />
        <CustomCursor />
      </LanguageProvider>
    </>
  );
}
