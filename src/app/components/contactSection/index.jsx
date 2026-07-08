"use client";

import Link from "next/link";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import Ferrofluid from "../Ferrofluid";

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

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
      className="relative border-t my-0 border-[#25213b] overflow-hidden pb-24"
    >
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          colors={["#ec4899", "#8b5cf6", "#16f2b3", "#a78bfa"]}
          speed={0.45}
          scale={1.7}
          turbulence={1.1}
          fluidity={0.12}
          rimWidth={0.22}
          sharpness={2.4}
          shimmer={1.4}
          glow={2.1}
          flowDirection="down"
          opacity={0.55}
          mouseInteraction={true}
          mouseStrength={0.85}
          mouseRadius={0.32}
        />
      </div>

      <div className="flex justify-center my-5 lg:py-8 relative z-10">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Contact
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <p className="relative z-10 text-center font-mono text-sm text-gray-400 mb-10 px-4">
        <span className="text-[#16f2b3]">dawood@portfolio</span>
        <span className="text-white">:~$</span>{" "}
        <span className="text-pink-500">open</span> ./contact --send-mail
      </p>

      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full overflow-hidden">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>

          <div className="flex items-center justify-between px-4 lg:px-8 py-4 border-b-[2px] border-indigo-900">
            <div className="flex flex-row space-x-2 shrink-0">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
            <div className="mx-4 flex-1 max-w-md">
              <div className="flex items-center gap-2 rounded-full bg-[#0d1224] border border-indigo-900 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 shrink-0 animate-pulse"></span>
                <span className="text-xs font-mono text-gray-400 truncate">
                  contact.dawoodwaseem
                </span>
              </div>
            </div>
            <span className="hidden md:block text-xs font-mono text-gray-500 shrink-0">
              contact.jsx
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* details pane */}
            <div className="px-4 lg:px-8 py-6 lg:py-8 border-b lg:border-b-0 lg:border-r border-indigo-900/60 flex flex-col gap-6">
              <code className="font-mono text-xs md:text-sm block">
                <div>
                  <span className="mr-2 text-pink-500">const</span>
                  <span className="mr-2 text-white">contact</span>
                  <span className="mr-2 text-pink-500">=</span>
                  <span className="text-gray-400">{"{"}</span>
                </div>
                <div>
                  <span className="ml-4 mr-2 text-white">available:</span>
                  <span className="text-orange-400">true</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div>
                  <span className="ml-4 mr-2 text-white">responseTime:</span>
                  <span className="text-gray-400">{`'`}</span>
                  <span className="text-amber-300">within 24 hours</span>
                  <span className="text-gray-400">{`',`}</span>
                </div>
                <div>
                  <span className="text-gray-400">{`};`}</span>
                </div>
              </code>

              <p className="text-sm text-gray-400 leading-relaxed">
                Have a project idea, collaboration, or opportunity? Reach out
                through any channel below, or drop a message using the form.
              </p>

              <div className="flex flex-col gap-3">
                {details.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      className="group flex items-center gap-3 rounded-lg border border-[#2a2e5a] bg-[#101123]/70 px-4 py-3 transition-all duration-300 hover:border-pink-500/50 hover:bg-[#101123]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1a1443] text-pink-500 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-mono text-gray-500 uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="block text-sm text-white truncate group-hover:text-[#16f2b3] transition-colors">
                          {item.value}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* form pane */}
            <div className="px-4 lg:px-8 py-6 lg:py-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono text-gray-400">
                      name <span className="text-pink-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-md border border-[#2a2e5a] bg-[#0d1224] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-violet-500"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-mono text-gray-400">
                      email <span className="text-pink-500">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-md border border-[#2a2e5a] bg-[#0d1224] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-violet-500"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-gray-400">subject</span>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full rounded-md border border-[#2a2e5a] bg-[#0d1224] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-violet-500"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-gray-400">
                    message <span className="text-pink-500">*</span>
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full resize-y rounded-md border border-[#2a2e5a] bg-[#0d1224] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-violet-500"
                  />
                </label>

                {feedback && (
                  <p
                    className={`text-sm font-mono ${
                      status === "success"
                        ? "text-[#16f2b3]"
                        : "text-pink-400"
                    }`}
                    role="status"
                  >
                    {status === "success" ? "// " : "! "}
                    {feedback}
                  </p>
                )}

                <div className="w-fit mx-auto pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-xs md:text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
