"use client";

import { motion } from "framer-motion";
import { LuGraduationCap } from "react-icons/lu";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-gray-200 py-24 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={3} label="education" title="Education" />

        <Reveal>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <LuGraduationCap size={26} />
              </span>

              <div className="min-w-0">
                <h3 className="font-geist text-xl font-semibold text-slate-900 dark:text-neutral-100">
                  Bahria University
                </h3>
                <p className="mt-1 font-geist text-slate-600 dark:text-neutral-400">
                  Bachelor of Science in Information Technology (BS-IT)
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 font-geistmono text-xs text-slate-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
                    8 semesters completed
                  </span>
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-geistmono text-xs text-emerald-700 dark:text-emerald-400">
                    CGPA 3.85
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
