"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import { projects } from "../data/projects";

function PreviewCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/projects#${project.id}`}
        className="group block cursor-pointer"
      >
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-emerald-500/40 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-emerald-400/40"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-neutral-950">
            <Image
              src={project.screenshots[0]}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                project.type === "Mobile Application"
                  ? "object-contain"
                  : "object-cover object-top"
              }`}
            />
          </div>

          <div className="flex flex-col gap-3 p-5">
            <p className="font-geistmono text-xs text-emerald-600 dark:text-emerald-400">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-slate-400 dark:text-neutral-600">
                {"//"} {project.type.toLowerCase()}
              </span>
            </p>

            <div className="flex items-start justify-between gap-3">
              <h3 className="font-geist text-lg font-semibold tracking-tight text-slate-900 dark:text-neutral-100">
                {project.name}
              </h3>
              <HiArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-slate-400 transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-geistmono text-[11px] text-slate-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-gray-200 py-24 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={4} label="projects" title="Selected Work" />

        <p className="mb-10 max-w-xl font-geist text-base leading-relaxed text-slate-600 dark:text-neutral-400">
          A few highlights from recent builds. Open the projects page for full
          case details, screenshots, and live demos.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <PreviewCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-geist text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-500 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
            >
              View all projects
              <HiArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
