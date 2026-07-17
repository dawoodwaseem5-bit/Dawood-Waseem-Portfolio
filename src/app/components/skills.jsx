"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiReact,
} from "react-icons/si";
import SectionHeading from "./section-heading";

const skills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-gray-200 py-24 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={2} label="skills" title="Skills" />

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.li key={skill.name} variants={item}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group flex cursor-default flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-8 shadow-sm transition-colors duration-200 hover:border-emerald-500/50 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-emerald-400/50"
                >
                  <Icon
                    size={34}
                    className="text-slate-500 transition-colors duration-200 group-hover:text-emerald-600 dark:text-neutral-400 dark:group-hover:text-emerald-400"
                  />
                  <span className="font-geistmono text-sm text-slate-700 dark:text-neutral-300">
                    {skill.name}
                  </span>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
