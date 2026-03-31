import HeroSection from "@/components/HeroSection";
import LandingSection from "@/components/LandingSection";
import Sidebar from "@/components/Sidebar";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import MobileNav from "@/components/MobileNav";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import FloatingTechBalls from "@/components/FloatingTechBalls";

export default function Home() {
  return (
    <LanguageProvider>
      {/* Fixed left: profile card */}
      <HeroSection />

      {/* Content offset for HeroSection (takes layout space), Sidebar is free-floating */}
      <main className="ml-[380px] min-h-screen bg-background">
        <LandingSection />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Fixed right: icon navbar */}
      <Sidebar />

      <FloatingTechBalls />
      <MobileNav />
      <CustomCursor />
    </LanguageProvider>
  );
}
