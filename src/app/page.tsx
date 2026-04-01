import HeroSection from "@/components/HeroSection";
import LandingSection from "@/components/LandingSection";
import Sidebar from "@/components/Sidebar";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import FloatingTechBalls from "@/components/FloatingTechBalls";

export default function Home() {
  return (
    <LanguageProvider>
      {/* Left panel — inline on mobile/tablet, fixed on desktop */}
      <HeroSection />

      {/* Fixed right nav + mobile bottom nav */}
      <Sidebar />

      {/* Main content — offset only on desktop where HeroSection is fixed */}
      <main className="lg:ml-[380px] min-h-screen bg-background pb-16 md:pb-0">
        <LandingSection />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <FloatingTechBalls />
      <CustomCursor />
    </LanguageProvider>
  );
}
