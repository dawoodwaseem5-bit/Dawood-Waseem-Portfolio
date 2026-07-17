"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";

const aboutText =
  "Currently, I have completed eight semesters of my BSIT program with a strong academic record, maintaining a CGPA of 3.85. I am eager to apply my knowledge and skills in a dynamic environment and looking for opportunities to grow and gain practical experience in the field of Information Technology.";

const traits = [
  { key: "hardWorker", value: "true" },
  { key: "quickLearner", value: "true" },
  { key: "problemSolver", value: "true" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={1} label="about" title="About Me" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <p className="font-geist text-lg leading-relaxed text-slate-600 dark:text-neutral-400">
              {aboutText}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-neutral-800">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-geistmono text-xs text-slate-400 dark:text-neutral-500">
                  developer.js
                </span>
              </div>
              <div className="p-5 font-geistmono text-sm leading-7">
                <p>
                  <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                  <span className="text-slate-900 dark:text-neutral-100">developer</span>{" "}
                  <span className="text-slate-400 dark:text-neutral-500">= {"{"}</span>
                </p>
                {traits.map((t) => (
                  <p key={t.key} className="pl-5">
                    <span className="text-slate-700 dark:text-neutral-300">{t.key}</span>
                    <span className="text-slate-400 dark:text-neutral-500">: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">{t.value}</span>
                    <span className="text-slate-400 dark:text-neutral-500">,</span>
                  </p>
                ))}
                <p className="pl-5">
                  <span className="text-slate-700 dark:text-neutral-300">cgpa</span>
                  <span className="text-slate-400 dark:text-neutral-500">: </span>
                  <span className="text-amber-600 dark:text-amber-400">3.85</span>
                  <span className="text-slate-400 dark:text-neutral-500">,</span>
                </p>
                <p>
                  <span className="text-slate-400 dark:text-neutral-500">{"};"}</span>
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
