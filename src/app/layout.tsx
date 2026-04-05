import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://saefulmuminin.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "Saeful Mu'minin — Full Stack Web Developer",
    template: "%s | Saeful Mu'minin",
  },
  description:
    "Full Stack Web Developer focused on building dynamic and responsive web apps using modern technologies like Laravel, React, Next.js, and Flutter. Based in Jakarta, Indonesia.",
  keywords: [
    "Full Stack Developer", "Web Developer", "React", "Next.js",
    "Laravel", "TypeScript", "PHP", "Flutter", "Jakarta", "Indonesia",
    "Saeful Muminin", "Portfolio", "BAZNAS",
  ],
  authors:   [{ name: "Saeful Mu'minin", url: BASE_URL }],
  creator:   "Saeful Mu'minin",
  publisher: "Saeful Mu'minin",

  /* ── Favicon ── */
  icons: {
    icon:     [
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/logo.ico",     sizes: "any" },
      { url: "/logo.png",     type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/logo.ico",
    apple:    { url: "/logo.png", sizes: "180x180", type: "image/png" },
  },

  /* ── Open Graph (image auto-served by opengraph-image.tsx) ── */
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:          BASE_URL,
    siteName:    "Saeful Mu'minin",
    title:       "Saeful Mu'minin — Full Stack Web Developer",
    description: "Building digital products with React, Next.js & Laravel. 4+ years of experience delivering full-stack solutions.",
  },

  /* ── Twitter / X ── */
  twitter: {
    card:        "summary_large_image",
    title:       "Saeful Mu'minin — Full Stack Web Developer",
    description: "Building digital products with React, Next.js & Laravel.",
    creator:     "@saefulmuminin",
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary">
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})();`}</Script>
        {children}
      </body>
    </html>
  );
}
