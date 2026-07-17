"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const links = [
  { label: "about", href: "/#about" },
  { label: "skills", href: "/#skills" },
  { label: "education", href: "/#education" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-xl border px-4 transition-all duration-300 md:px-6 ${
          scrolled
            ? "border-gray-200 bg-white/85 py-2 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/85"
            : "border-transparent bg-transparent py-4"
        }`}
      >
        <Link
          href="/"
          className="font-geistmono text-sm font-semibold tracking-tight text-slate-900 dark:text-neutral-100"
        >
          <span className="text-emerald-600 dark:text-emerald-400">~/</span>
          dawood-waseem
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-geistmono text-sm text-slate-600 transition-colors duration-200 hover:bg-gray-100 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
            >
              <span className="text-emerald-600 dark:text-emerald-400">.</span>
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-700 transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-6xl rounded-xl border border-gray-200 bg-white/95 p-2 shadow-sm backdrop-blur-md md:hidden dark:border-neutral-800 dark:bg-neutral-950/95"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-3 font-geistmono text-sm text-slate-600 transition-colors hover:bg-gray-100 hover:text-slate-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
              >
                <span className="text-emerald-600 dark:text-emerald-400">.</span>
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
