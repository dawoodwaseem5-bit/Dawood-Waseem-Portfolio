"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";

const details = [
  {
    label: "Phone",
    value: "+923312967050",
    href: "tel:+923312967050",
    icon: HiOutlinePhone,
  },
  {
    label: "Email",
    value: "dawoodwaseem5@gmail.com",
    href: "mailto:dawoodwaseem5@gmail.com",
    icon: HiOutlineMail,
  },
  {
    label: "GitHub",
    value: "github.com/dawoodwaseem5-bit",
    href: "https://github.com/dawoodwaseem5-bit",
    icon: BsGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dawood-waseem",
    href: "https://www.linkedin.com/in/dawood-waseem-94724221a/",
    icon: BsLinkedin,
  },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

const inputClasses =
  "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 font-geist text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-emerald-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus:border-emerald-400";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback("Message sent successfully. I'll get back to you soon.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-gray-200 py-24 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index={5} label="contact" title="Get In Touch" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* details */}
          <Reveal>
            <p className="mb-8 max-w-md font-geist text-base leading-relaxed text-slate-600 dark:text-neutral-400">
              Have a project idea, collaboration, or opportunity? Reach out
              through any channel below, or drop a message using the form.
            </p>

            <div className="flex flex-col gap-3">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition-colors duration-200 hover:border-emerald-500/50 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-emerald-400/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-geistmono text-xs uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                          {item.label}
                        </span>
                        <span className="block truncate font-geist text-sm text-slate-800 transition-colors duration-200 group-hover:text-emerald-700 dark:text-neutral-200 dark:group-hover:text-emerald-400">
                          {item.value}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-geistmono text-xs text-slate-500 dark:text-neutral-400">
                    name <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-geistmono text-xs text-slate-500 dark:text-neutral-400">
                    email <span className="text-emerald-600 dark:text-emerald-400">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-geistmono text-xs text-slate-500 dark:text-neutral-400">
                  subject
                </span>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClasses}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-geistmono text-xs text-slate-500 dark:text-neutral-400">
                  message <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className={`${inputClasses} resize-y`}
                />
              </label>

              {feedback && (
                <p
                  role="status"
                  className={`font-geistmono text-sm ${
                    status === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-geist text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
