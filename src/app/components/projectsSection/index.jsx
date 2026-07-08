// @flow strict
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsGlobe2, BsPlayCircle } from "react-icons/bs";
import { FaMobileScreenButton } from "react-icons/fa6";
import DotField from "../DotField";

const projects = [
  {
    id: "afraz-apparel",
    name: "Afraz Apparel",
    type: "Web Application",
    tab: "afraz-apparel.vercel.app",
    description:
      "Portfolio website for Afraz Apparel, a textile manufacturing company located in Karachi, Pakistan. The website features interactive design and animations to keep the interest of the visitors.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    link: "https://afraz-apparel.vercel.app/",
    linkLabel: "Live Preview",
    linkIcon: "globe",
    preview: "web",
    screenshots: [
      "/projects/afraz-1.png",
      "/projects/afraz-2.png",
      "/projects/afraz-3.png",
      "/projects/afraz-4.png",
      "/projects/afraz-5.png",
    ],
  },
  {
    id: "auto-aid",
    name: "Auto-Aid",
    type: "Mobile Application",
    tab: "auto-aid.apk",
    description:
      "AUTO-AID is a bilingual mobile platform built with Flutter and Firebase that modernizes Pakistan's automotive care industry by offering on-demand, real-time roadside assistance.",
    stack: ["Flutter", "Firebase", "Maps API"],
    link: "https://drive.google.com/file/d/1zVpE4YWYragVxEK4hSMRXY2BMS4siKQn/view?usp=sharing",
    linkLabel: "Watch Demo",
    linkIcon: "play",
    preview: "mobile",
    screenshots: [
      "/projects/autoaid-1.png",
      "/projects/autoaid-2.png",
      "/projects/autoaid-3.png",
    ],
  },
  {
    id: "nutri-track",
    name: "Nutri-Track",
    type: "Full-Stack Web Application",
    tab: "nutri-track-sand-ten.vercel.app",
    description:
      "Nutri-Track is a full-stack health and fitness companion that lets users track daily nutrition, calculate BMI, read live health news, and access curated diet plans through a secure JWT-authenticated dashboard with full CRUD support.",
    stack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    link: "https://nutri-track-sand-ten.vercel.app/Login",
    linkLabel: "Live Preview",
    linkIcon: "globe",
    preview: "web",
    screenshots: [
      "/projects/nutritrack-1.png",
      "/projects/nutritrack-2.png",
      "/projects/nutritrack-3.png",
      "/projects/nutritrack-4.png",
    ],
  },
];

/* Auto-cycling screenshot viewer for web projects */
function ScreenshotCycler({ screenshots, name }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (screenshots.length < 2) return;
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % screenshots.length),
      3500
    );
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative w-full aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-[#0d1224]">
      {screenshots.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View screenshot ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-gradient-to-r from-pink-500 to-violet-600"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* Phone-frame mockup for mobile projects */
function PhoneMockup({ screenshots, name }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (screenshots.length < 2) return;
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % screenshots.length),
      3500
    );
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="w-full flex items-center justify-center py-8 px-4">
      <div className="relative w-[210px] sm:w-[230px] aspect-[9/19] rounded-[2.2rem] border-[6px] border-black bg-black shadow-[0_0_40px_rgba(139,92,246,0.25)] overflow-hidden">
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20"></div>

        {screenshots.length > 0 ? (
          screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${name} screenshot ${i + 1}`}
              fill
              sizes="230px"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          /* placeholder until screenshots are added */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1443] via-[#0d1224] to-[#2a1a4a]">
            <FaMobileScreenButton size={44} className="text-violet-500" />
            <p className="text-center text-xs text-white/60 px-6 leading-relaxed font-mono">
              {name}
              <br />
              <span className="text-pink-500">// screenshots coming soon</span>
            </p>
          </div>
        )}

        {screenshots.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-4 bg-gradient-to-r from-pink-500 to-violet-600"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Project details rendered as syntax-highlighted code */
function ProjectCode({ project }) {
  return (
    <code className="font-mono text-xs md:text-sm block">
      <div className="blink">
        <span className="mr-2 text-pink-500">const</span>
        <span className="mr-2 text-white">project</span>
        <span className="mr-2 text-pink-500">=</span>
        <span className="text-gray-400">{"{"}</span>
      </div>
      <div>
        <span className="ml-4 lg:ml-6 mr-2 text-white">name:</span>
        <span className="text-gray-400">{`'`}</span>
        <span className="text-amber-300">{project.name}</span>
        <span className="text-gray-400">{`',`}</span>
      </div>
      <div>
        <span className="ml-4 lg:ml-6 mr-2 text-white">type:</span>
        <span className="text-gray-400">{`'`}</span>
        <span className="text-amber-300">{project.type}</span>
        <span className="text-gray-400">{`',`}</span>
      </div>
      <div className="ml-4 lg:ml-6">
        <span className="mr-2 text-white">stack:</span>
        <span className="text-gray-400">{`[`}</span>
        {project.stack.map((tech, i) => (
          <span key={tech}>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{tech}</span>
            <span className="text-gray-400">{`'${
              i < project.stack.length - 1 ? ", " : ""
            }`}</span>
          </span>
        ))}
        <span className="text-gray-400">{`],`}</span>
      </div>
      <div className="ml-4 lg:ml-6">
        <span className="mr-2 text-green-400">description:</span>
        <span className="text-gray-400">{`'`}</span>
        <span className="text-cyan-400 leading-relaxed">
          {project.description}
        </span>
        <span className="text-gray-400">{`',`}</span>
      </div>
      <div>
        <span className="ml-4 lg:ml-6 mr-2 text-white">deployed:</span>
        <span className="text-orange-400">true</span>
        <span className="text-gray-400">,</span>
      </div>
      <div>
        <span className="text-gray-400">{`};`}</span>
      </div>
    </code>
  );
}

/* One project rendered as an IDE / browser window */
function ProjectWindow({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const flipped = index % 2 === 1;
  const LinkIcon = project.linkIcon === "play" ? BsPlayCircle : BsGlobe2;

  return (
    <div
      ref={ref}
      className={`project-window ${visible ? "project-window-visible" : ""} ${
        flipped ? "project-window-right" : "project-window-left"
      } from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full overflow-hidden`}
    >
      {/* gradient top border */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      {/* window title bar */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-4 border-b-[2px] border-indigo-900">
        <div className="flex flex-row space-x-2 shrink-0">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-orange-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-200"></div>
        </div>
        {/* fake URL bar */}
        <div className="mx-4 flex-1 max-w-md">
          <div className="flex items-center gap-2 rounded-full bg-[#0d1224] border border-indigo-900 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 shrink-0 animate-pulse"></span>
            <span className="text-xs font-mono text-gray-400 truncate">
              {project.tab}
            </span>
          </div>
        </div>
        <span className="hidden md:block text-xs font-mono text-gray-500 shrink-0">
          {String(index + 1).padStart(2, "0")}.jsx
        </span>
      </div>

      {/* window body: code pane + preview pane */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 ${
          flipped ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* code pane */}
        <div className="[direction:ltr] px-4 lg:px-8 py-6 lg:py-8 flex flex-col justify-between gap-6 border-b lg:border-b-0 border-indigo-900/60">
          <ProjectCode project={project} />

          <div className="flex flex-col gap-5">
            {/* terminal-style stack chips */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-[#16f2b3] border border-[#16f2b3]/30 bg-[#16f2b3]/5 rounded px-3 py-1.5 transition-all duration-300 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 hover:scale-105 cursor-default"
                >
                  <span className="text-pink-500 mr-1">&gt;</span>
                  {tech}
                </span>
              ))}
            </div>

            <div className="w-fit mx-auto">
              <Link
                href={project.link}
                target="_blank"
                className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
                role="button"
              >
                <LinkIcon size={16} />
                <span>{project.linkLabel}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* preview pane */}
        <div className="[direction:ltr] relative bg-[#0d1224]/60 lg:border-l border-indigo-900/60 flex items-stretch min-h-[240px]">
          {project.preview === "web" ? (
            <Link
              href={project.link}
              target="_blank"
              className="block w-full group relative"
              title={`Open ${project.name}`}
            >
              <ScreenshotCycler
                screenshots={project.screenshots}
                name={project.name}
              />
              {/* hover overlay hint */}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d1224]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center gap-2 font-mono text-sm text-white border border-pink-500 rounded-full px-5 py-2 bg-[#0d1224]/80">
                  <BsGlobe2 size={16} className="text-pink-500" />
                  visit live site
                </span>
              </div>
            </Link>
          ) : (
            <PhoneMockup
              screenshots={project.screenshots}
              name={project.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative border-t my-0 border-[#25213b] overflow-hidden pb-24"
    >
      {/* Interactive dot-field background */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          gradientFrom="rgba(236, 72, 153, 0.35)"
          gradientTo="rgba(139, 92, 246, 0.3)"
          glowColor="#1a1443"
        />
      </div>

      {/* Section heading */}
      <div className="flex justify-center my-5 lg:py-8 relative z-10">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Projects
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* terminal-style intro line */}
      <p className="relative z-10 text-center font-mono text-sm text-gray-400 mb-10">
        <span className="text-[#16f2b3]">dawood@portfolio</span>
        <span className="text-white">:~$</span>{" "}
        <span className="text-pink-500">ls</span> ./projects{" "}
        <span className="text-gray-500">--featured</span>
      </p>

      {/* project windows */}
      <div className="relative z-10 flex flex-col gap-14 lg:gap-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectWindow key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
