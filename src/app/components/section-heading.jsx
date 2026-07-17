"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ index, label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12"
    >
      <p className="mb-2 font-geistmono text-sm text-emerald-600 dark:text-emerald-400">
        {String(index).padStart(2, "0")}
        <span className="text-slate-400 dark:text-neutral-600">.</span>{" "}
        <span className="text-slate-400 dark:text-neutral-600">{"//"}</span>{" "}
        {label}
      </p>
      <h2 className="font-geist text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-neutral-100">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-emerald-500/70" />
    </motion.div>
  );
}
