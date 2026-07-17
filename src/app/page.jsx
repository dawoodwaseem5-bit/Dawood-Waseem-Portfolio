import Hero from "./components/hero";
import About from "./components/about";
import Skills from "./components/skills";
import Education from "./components/education";
import Projects from "./components/projects";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
    </main>
  );
}
