
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/aboutSection";
import ProjectsSection from "./components/projectsSection";
import ContactSection from "./components/contactSection";

export default function Home() {
  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
