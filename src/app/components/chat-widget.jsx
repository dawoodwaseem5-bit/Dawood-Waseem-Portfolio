"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

const SUGGESTIONS = [
  "What projects has Dawood built?",
  "Show me his skills",
  "What's his education?",
  "I want to hire him — email him my details",
];

function ActionButtons({ actions, onNavigate, onSendLead, sendingLead }) {
  if (!actions?.length) return null;

  return (
    <div className="mt-2 flex flex-col gap-2">
      {actions.map((action, i) => {
        if (action.type === "navigate") {
          return (
            <button
              key={`${action.href}-${i}`}
              type="button"
              onClick={() => onNavigate(action.href)}
              className="cursor-pointer rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-left font-geistmono text-xs text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
            >
              Open {action.label}
            </button>
          );
        }

        if (action.type === "lead_email") {
          const d = action.draft;
          return (
            <div
              key={`lead-${i}`}
              className="rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-950"
            >
              <p className="mb-2 font-geistmono text-[11px] uppercase tracking-wide text-slate-400 dark:text-neutral-500">
                Draft for Dawood
              </p>
              <p className="text-xs text-slate-600 dark:text-neutral-400">
                <span className="font-medium text-slate-800 dark:text-neutral-200">
                  From:
                </span>{" "}
                {d.visitorName} &lt;{d.visitorEmail}&gt;
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-neutral-400">
                <span className="font-medium text-slate-800 dark:text-neutral-200">
                  Subject:
                </span>{" "}
                {d.subject}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-xs text-slate-700 dark:text-neutral-300">
                {d.message}
              </p>
              <button
                type="button"
                disabled={sendingLead}
                onClick={() => onSendLead(d)}
                className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 font-geist text-xs font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
              >
                {sendingLead ? "Sending..." : "Send to Dawood"}
              </button>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingLead, setSendingLead] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi — I'm Dawood's portfolio assistant. Ask about his projects, skills, or education. I can also take you to a section or help send him a message.",
      actions: [],
    },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  function handleNavigate(href) {
    setOpen(false);
    router.push(href);
  }

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user", content, actions: [] }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: c }) => ({
            role,
            content: c,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Sorry, I couldn't respond. Please try again.",
            actions: [],
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "How else can I help?",
          actions: Array.isArray(data.actions) ? data.actions : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please check your connection and try again.",
          actions: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendLead(draft) {
    if (sendingLead) return;
    setSendingLead(true);

    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Couldn't send that message. Please try again.",
            actions: [],
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Done — your message was emailed to Dawood. He'll get back to you soon. You can also use the contact form on the site anytime.",
          actions: [{ type: "navigate", label: "Contact", href: "/#contact", target: "contact" }],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error while sending. Please try again.",
          actions: [],
        },
      ]);
    } finally {
      setSendingLead(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-neutral-800">
              <div>
                <p className="font-geist text-sm font-semibold text-slate-900 dark:text-neutral-100">
                  Portfolio Assistant
                </p>
                <p className="font-geistmono text-[11px] text-emerald-600 dark:text-emerald-400">
                  ask about Dawood
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-neutral-950"
                        : "bg-gray-100 text-slate-800 dark:bg-neutral-900 dark:text-neutral-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                    {m.role === "assistant" && (
                      <ActionButtons
                        actions={m.actions}
                        onNavigate={handleNavigate}
                        onSendLead={handleSendLead}
                        sendingLead={sendingLead}
                      />
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gray-100 px-3.5 py-2.5 font-geistmono text-xs text-slate-500 dark:bg-neutral-900 dark:text-neutral-400">
                    thinking...
                  </div>
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="cursor-pointer rounded-full border border-gray-200 px-3 py-1.5 text-left font-geistmono text-[11px] text-slate-600 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-emerald-400"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-gray-200 p-3 dark:border-neutral-800"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills..."
                maxLength={1200}
                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-geist text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus:border-emerald-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close portfolio chat" : "Open portfolio chat"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-colors hover:bg-emerald-500 dark:bg-emerald-500 dark:text-neutral-950 dark:hover:bg-emerald-400"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
