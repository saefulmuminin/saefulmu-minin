export type Project = {
  slug:        string;
  title:       string;
  year:        string;
  category:    string;
  color:       string;
  image:       string;
  imageAlt:    string;
  role:        string;
  duration:    string;
  description: string;
  problem:     string;
  solution:    string;
  features:    string[];
  tags:        string[];
  liveUrl?:    string;
  githubUrl?:  string;
};

export const projects: Project[] = [
  {
    slug:        "aether-dashboard",
    title:       "Aether Dashboard",
    year:        "2024",
    category:    "Fintech",
    color:       "#f59e0b",
    image:       "https://lh3.googleusercontent.com/aida-public/AB6AXuA4kncwFsaksBy5GPVA8TG6r_VQrW-fUWtSSyNpl1kf8Tegu0ND9iIC2tO7_hmaebeA3WSZGujZC1IhaG3NnlIpElsh4GyKwwxtC6ztCUK4qXmRpX1oS-MSOdtHe_sc5Ja4DVfsrptzvSMbzpIAoxYdPZANG_Tyw8WE6ll9ojlIYfnefIwH_C4MO_wSUKLoQeGpBeENPLanaZnBHK6XLdO749c8iQWpvrQyZ404tcF9bMkdgjr6wrnfKszwHDoFY-Iptcy-MFfLUQ",
    imageAlt:    "Aether Dashboard analytics interface",
    role:        "Lead Frontend Developer",
    duration:    "3 months",
    description: "A high-performance financial analytics dashboard designed for traders who need clarity under pressure. Built with a focus on data density without cognitive overload.",
    problem:     "Data fatigue in high-frequency trading interfaces — too much noise, too little signal.",
    solution:    "A minimalist visualization engine that prioritizes cognitive clarity and reaction speed through progressive data disclosure.",
    features: [
      "Real-time WebSocket data streaming with sub-50ms latency",
      "Customizable widget grid with drag-and-drop layout",
      "Multi-timeframe candlestick charts powered by D3.js",
      "Smart alert system with threshold-based notifications",
      "Dark/light mode with full accessibility compliance (WCAG 2.1 AA)",
    ],
    tags:      ["Next.js", "TypeScript", "D3.js", "WebSocket", "Tailwind CSS"],
    liveUrl:   "",
    githubUrl: "",
  },
  {
    slug:        "vertex-cms",
    title:       "Vertex CMS",
    year:        "2023",
    category:    "SaaS",
    color:       "#6366f1",
    image:       "https://lh3.googleusercontent.com/aida-public/AB6AXuCdwVkq3eaHkBLKY9_yWUiiA2X4sGT96uf-VG1-07ezoJjr3vTb2y8wBLB4P_KAacqEDkonyVCvxdLGhztUGKI4qI_UfHVxbXGkf8aalEH9ns8pUC9pWOTSxicDlw2YYDY4-wRpxvDqN6LjGis9r3D-vbuO6FJ_8sdRIp_Lo4En5K1yr6ICN9nbosvtsHamz3WV0pyn_gEP28W-_JXUNy9NYDGFF-ova5sZqoN5UhUDi_SpodHT3l9h2kB5NwxxnDobHBhEnK3HnA",
    imageAlt:    "Vertex CMS content editor",
    role:        "Full Stack Developer",
    duration:    "4 months",
    description: "Enterprise-grade headless CMS built for digital-first retail brands. Enables content teams to ship campaigns faster without engineering bottlenecks.",
    problem:     "Fragmented content pipelines causing slow time-to-market for enterprise retailers.",
    solution:    "Headless CMS with real-time collaborative preview and automated SEO optimization pipeline.",
    features: [
      "Real-time multi-user collaboration with conflict-free merging",
      "GraphQL & REST API dual interface for maximum flexibility",
      "Automated SEO scoring and JSON-LD schema markup generation",
      "Visual block builder with 40+ pre-built content components",
      "Webhook-driven publishing pipeline with staging previews",
    ],
    tags:      ["Node.js", "PostgreSQL", "GraphQL", "React", "Redis"],
    liveUrl:   "",
    githubUrl: "",
  },
  {
    slug:        "nexus-commerce",
    title:       "Nexus Commerce",
    year:        "2023",
    category:    "E-Commerce",
    color:       "#22c55e",
    image:       "https://picsum.photos/seed/nexus123/1200/700",
    imageAlt:    "Nexus Commerce storefront",
    role:        "Full Stack Developer",
    duration:    "5 months",
    description: "A full-featured e-commerce platform built for SME retailers in Indonesia. Handles inventory, orders, payments, and customer management in a single unified system.",
    problem:     "Local SME retailers were juggling 4–5 disconnected tools for sales, inventory, and payments.",
    solution:    "An all-in-one commerce platform with local payment gateway integration and a simple UX designed for non-technical merchants.",
    features: [
      "Product catalog with variants, stock tracking, and CSV bulk import",
      "Local Indonesian payment methods via Midtrans integration",
      "Order management with automated email/WhatsApp notifications",
      "Customer portal with purchase history and loyalty points",
      "Admin analytics dashboard with sales reports and best-seller insights",
    ],
    tags:      ["Laravel", "React", "MySQL", "Midtrans", "Tailwind CSS"],
    liveUrl:   "",
    githubUrl: "",
  },
  {
    slug:        "pulse-analytics",
    title:       "Pulse Analytics",
    year:        "2023",
    category:    "Analytics",
    color:       "#06b6d4",
    image:       "https://picsum.photos/seed/pulse77/1200/700",
    imageAlt:    "Pulse Analytics dashboard charts",
    role:        "Frontend Developer",
    duration:    "2 months",
    description: "Lightweight, privacy-first web analytics for creators and small businesses. Zero cookies, 100% GDPR compliant, with an intentionally clean reporting UI.",
    problem:     "Google Analytics is overwhelming, privacy-invasive, and slow for small-scale content creators.",
    solution:    "A cookieless analytics tool focused on actionable metrics only — no noise, no tracking walls.",
    features: [
      "Cookieless fingerprinting — GDPR & CCPA compliant by design",
      "Real-time visitor map with geographic and device breakdown",
      "Custom event tracking via a single-line embed script",
      "Shareable public dashboard links for client transparency",
      "Weekly email digests with highlights and anomaly detection",
    ],
    tags:      ["Vue.js", "Node.js", "Chart.js", "ClickHouse", "Tailwind CSS"],
    liveUrl:   "",
    githubUrl: "",
  },
  {
    slug:        "orbit-tasks",
    title:       "Orbit Tasks",
    year:        "2022",
    category:    "Productivity",
    color:       "#f97316",
    image:       "https://picsum.photos/seed/orbit55/1200/700",
    imageAlt:    "Orbit task manager kanban board",
    role:        "Full Stack Developer",
    duration:    "3 months",
    description: "A minimalist project and task manager for small dev teams. Inspired by Linear's speed and Notion's flexibility — fast, keyboard-first, no ceremony.",
    problem:     "Most project tools require hours of setup before any real work begins — too heavy for small teams.",
    solution:    "A keyboard-first task manager with Kanban boards, sprints, and team inbox built around sub-100ms interactions.",
    features: [
      "Keyboard-first navigation — every action accessible without a mouse",
      "Kanban, List, and Timeline views with drag-and-drop reordering",
      "Real-time sync across devices powered by Firebase Firestore",
      "Recurring task templates and sprint planning module",
      "Slack and GitHub integration for automated status updates",
    ],
    tags:      ["React", "Firebase", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl:   "",
    githubUrl: "",
  },
  {
    slug:        "crest-agency",
    title:       "Crest Agency",
    year:        "2022",
    category:    "Agency",
    color:       "#ec4899",
    image:       "https://picsum.photos/seed/crest88/1200/700",
    imageAlt:    "Crest agency portfolio website",
    role:        "Frontend Developer & UI Designer",
    duration:    "6 weeks",
    description: "A cinematic portfolio website for a Jakarta-based creative agency. Focused on converting visitors through storytelling, motion design, and bold visual hierarchy.",
    problem:     "High bounce rates and poor conversion from the agency's outdated, template-based website.",
    solution:    "A scroll-driven, cinematic experience with GSAP-powered transitions that let the work speak for itself.",
    features: [
      "GSAP scroll-triggered animations with custom spring easing",
      "Infinite scroll portfolio gallery with intersection-based lazy loading",
      "Lenis smooth-scroll with natural momentum physics",
      "Performance-optimized: 98 Lighthouse score on mobile",
      "CMS-connected via Contentful for easy content updates without code",
    ],
    tags:      ["Next.js", "GSAP", "Tailwind CSS", "Contentful", "Vercel"],
    liveUrl:   "",
    githubUrl: "",
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
