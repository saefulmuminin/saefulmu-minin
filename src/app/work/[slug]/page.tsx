import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { projects, getProjectBySlug } from "@/data/projects";

// Pre-generate all project pages at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) return {};
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saefulmuminin.dev";
  const projectUrl = `${baseUrl}/work/${slug}`;
  const absoluteImageUrl = `${baseUrl}${project.image}`;
  const isPng = project.image.toLowerCase().endsWith(".png");
  const imageType = isPng ? "image/png" : "image/jpeg";
  
  return {
    title: `${project.title} — Saeful Mu'minin`,
    description: project.description.id,
    keywords: [...project.tags, project.category, "portfolio", "project"],
    authors: [{ name: "Saeful Mu'minin" }],
    creator: "Saeful Mu'minin",
    publisher: "Saeful Mu'minin",
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: projectUrl,
      title: `${project.title} — Saeful Mu'minin Portfolio`,
      description: project.description.id,
      siteName: "Saeful Mu'minin",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: project.imageAlt,
          type: imageType,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Saeful Mu'minin`,
      description: project.description.id,
      creator: "@saefulmu",
      images: [absoluteImageUrl],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saefulmuminin.dev";
  const projectUrl = `${baseUrl}/work/${slug}`;
  const absoluteImageUrl = `${baseUrl}${project.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": projectUrl,
    name: project.title,
    description: project.description.id,
    image: {
      "@type": "ImageObject",
      url: absoluteImageUrl,
      width: 1200,
      height: 630,
      alt: project.imageAlt,
    },
    datePublished: new Date().toISOString(),
    inLanguage: "id",
    creator: {
      "@type": "Person",
      name: "Saeful Mu'minin",
      url: baseUrl,
    },
    about: {
      "@type": "Thing",
      name: project.category,
    },
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LanguageProvider>
        <ProjectDetailContent project={project} allProjects={projects} />
        <CustomCursor />
      </LanguageProvider>
    </>
  );
}
