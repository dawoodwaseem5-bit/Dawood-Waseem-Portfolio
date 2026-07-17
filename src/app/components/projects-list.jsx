"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsGlobe2, BsPlayCircle } from "react-icons/bs";
import { HiArrowUpRight } from "react-icons/hi2";
import Reveal from "./reveal";
import { projects } from "../data/projects";

function ScreenshotCycler({ screenshots, name, contain }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (screenshots.length < 2) return;
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % screenshots.length),
      4000
    );
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-neutral-950">
      {screenshots.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} screenshot ${i + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`${
            contain ? "object-contain" : "object-cover object-top"
          } transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {screenshots.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === active
                  ? "w-5 bg-emerald-500"
                  : "w-1.5 bg-slate-400/60 hover:bg-slate-400 dark:bg-neutral-600 dark:hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const flipped = index % 2 === 1;
  const LinkIcon = project.linkIcon === "play" ? BsPlayCircle : BsGlobe2;
  const isMobileApp = project.type === "Mobile Application";

  return (
    <Reveal>
      <motion.article
        id={project.id}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.25 }}
        className="scroll-mt-28 grid grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-emerald-500/40 lg:grid-cols-2 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-emerald-400/40"
      >
        <Link
          href={project.link}
          target="_blank"
          title={`Open ${project.name}`}
          className={`group relative block min-h-[260px] cursor-pointer lg:min-h-[340px] ${
            flipped ? "lg:order-2" : ""
          }`}
        >
          <ScreenshotCycler
            screenshots={project.screenshots}
            name={project.name}
            contain={isMobileApp}
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 dark:bg-neutral-950/70">
            <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/60 bg-white px-4 py-2 font-geistmono text-sm text-emerald-700 dark:bg-neutral-950 dark:text-emerald-400">
              {project.linkLabel.toLowerCase()}
              <HiArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        <div
          className={`flex flex-col justify-center gap-4 p-6 sm:p-8 ${
            flipped ? "lg:order-1" : ""
          }`}
        >
          <p className="font-geistmono text-xs text-emerald-600 dark:text-emerald-400">
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="text-slate-400 dark:text-neutral-600">
              {"//"} {project.type.toLowerCase()}
            </span>
          </p>

          <h2 className="font-geist text-2xl font-semibold tracking-tight text-slate-900 dark:text-neutral-100">
            {project.name}
          </h2>

          <p className="font-geist text-sm leading-relaxed text-slate-600 dark:text-neutral-400">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 font-geistmono text-xs text-slate-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-2">
            <Link
              href={project.link}
              target="_blank"
              className="inline-flex cursor-pointer items-center gap-2 font-geist text-sm font-medium text-emerald-700 transition-colors duration-200 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              <LinkIcon size={16} />
              {project.linkLabel}
              <HiArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function ProjectsList() {
  return (
    <div className="flex flex-col gap-10">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
