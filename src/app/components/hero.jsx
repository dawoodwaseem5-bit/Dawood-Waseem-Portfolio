"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-5 font-geistmono text-sm text-emerald-600 dark:text-emerald-400"
          >
            <span className="text-slate-400 dark:text-neutral-600">$</span>{" "}
            whoami
          </motion.p>

          <motion.h1
            variants={item}
            className="font-geist text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-neutral-100"
          >
            Dawood Waseem
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 min-h-[2.25rem] font-geistmono text-lg text-slate-600 sm:text-xl dark:text-neutral-400"
          >
            <span className="text-emerald-600 dark:text-emerald-400">&gt;</span>{" "}
            <Typewriter
              words={[
                "Full Stack Developer",
                "React & Next.js Developer",
                "Problem Solver",
              ]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={65}
              deleteSpeed={40}
              delaySpeed={1600}
            />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-geist text-base leading-relaxed text-slate-600 dark:text-neutral-400"
          >
            BS-IT student at Bahria University with a 3.85 CGPA, building
            full-stack web and mobile applications with modern technologies.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/resume.pdf"
              target="_blank"
              role="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-geist text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-500 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
            >
              <MdDownload size={18} />
              Get Resume
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/dawoodwaseem5-bit"
                target="_blank"
                aria-label="GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-slate-700 transition-colors duration-200 hover:border-emerald-500/60 hover:text-emerald-600 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
              >
                <BsGithub size={19} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dawood-waseem-94724221a/"
                target="_blank"
                aria-label="LinkedIn profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-slate-700 transition-colors duration-200 hover:border-emerald-500/60 hover:text-emerald-600 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-emerald-400/60 dark:hover:text-emerald-400"
              >
                <BsLinkedin size={19} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-2.5 font-geistmono text-xs text-slate-500 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/70 dark:text-neutral-500"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            open to internships &amp; junior developer roles
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-slate-300 p-1.5 dark:border-neutral-700">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-1.5 w-1.5 rounded-full bg-emerald-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
