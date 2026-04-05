import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import AllProjectsContent from "@/components/AllProjectsContent";
import { projects } from "@/data/projects";

export const metadata = {
  title: "All Projects — Saeful Mu'minin",
  description: "Browse all portfolio projects by Saeful Mu'minin.",
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
