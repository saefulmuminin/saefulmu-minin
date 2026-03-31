import { type Project } from "@/data/projects";

export default function ProjectSEOSchema({ project }: { project: Project }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://saefulmu.com";
  const projectUrl = `${baseUrl}/work/${project.slug}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": projectUrl,
    name: project.title,
    description: project.description,
    image: {
      "@type": "ImageObject",
      url: project.image,
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
