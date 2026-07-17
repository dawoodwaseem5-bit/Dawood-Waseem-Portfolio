"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
} from "react-icons/si";
import SectionHeading from "./section-heading";

const skills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Python", icon: SiPython },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "Firebase", icon: SiFirebase },
];

function SkillCard({ name, icon: Icon }) {
  return (
    <li className="group flex w-[9.5rem] shrink-0 cursor-default flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-7 shadow-sm transition-colors duration-200 hover:border-emerald-500/50 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-emerald-400/50 sm:w-[10.5rem]">
      <Icon
        size={36}
        aria-hidden="true"
        className="text-slate-500 transition-colors duration-200 group-hover:text-emerald-600 dark:text-neutral-400 dark:group-hover:text-emerald-400"
      />
      <span className="font-geistmono text-sm text-slate-700 dark:text-neutral-300">
        {name}
      </span>
    </li>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);

  // Duplicate for a seamless loop
  const loop = [...skills, ...skills];

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-gray-200 py-24 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={2} label="skills" title="Skills" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mt-2"
      >
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent dark:from-neutral-950 sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent dark:from-neutral-950 sm:w-20"
        />

        <div className="skills-marquee overflow-hidden py-2">
          <ul
            ref={trackRef}
            className={`skills-marquee-track flex w-max gap-4 px-4 ${
              reduceMotion ? "" : "skills-marquee-animate"
            }`}
            aria-label="Technology skills"
          >
            {loop.map((skill, i) => (
              <SkillCard
                key={`${skill.name}-${i}`}
                name={skill.name}
                icon={skill.icon}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
