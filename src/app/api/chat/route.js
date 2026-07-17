import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import {
  buildPortfolioContext,
  NAV_TARGETS,
} from "../../data/portfolio-context";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGES = 16;
const MAX_CONTENT = 1200;

function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: String(m?.content ?? "").trim().slice(0, MAX_CONTENT),
    }))
    .filter((m) => m.content.length > 0);
}

function extractJson(text) {
  const cleaned = String(text ?? "")
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("Invalid model JSON");
  }
}

function normalizeActions(actions) {
  if (!Array.isArray(actions)) return [];
  const out = [];

  for (const action of actions) {
    if (!action || typeof action !== "object") continue;

    if (action.type === "navigate") {
      const target = String(action.target ?? "").trim().toLowerCase();
      const mapped = NAV_TARGETS[target];
      if (mapped) {
        out.push({
          type: "navigate",
          target,
          label: mapped.label,
          href: mapped.href,
        });
      }
      continue;
    }

    if (action.type === "lead_email") {
      const draft = action.draft ?? {};
      const visitorEmail = String(draft.visitorEmail ?? "").trim();
      const message = String(draft.message ?? "").trim().slice(0, 2000);
      const visitorName = String(draft.visitorName ?? "").trim().slice(0, 120);
      const subject =
        String(draft.subject ?? "").trim().slice(0, 160) ||
        "Portfolio chatbot lead";

      if (!EMAIL_RE.test(visitorEmail) || !message) continue;

      out.push({
        type: "lead_email",
        draft: {
          visitorName: visitorName || "Visitor",
          visitorEmail,
          subject,
          message,
        },
      });
    }
  }

  return out.slice(0, 3);
}

export async function POST(request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Chat is not configured. Add GOOGLE_GENERATIVE_AI_API_KEY to .env.local.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages = sanitizeMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const last = messages[messages.length - 1];
    if (last.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from the user." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: buildPortfolioContext(),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
        responseMimeType: "application/json",
      },
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Gemini requires history to start with a user turn if present
    const safeHistory =
      history.length > 0 && history[0].role === "model" ? history.slice(1) : history;

    const chat = model.startChat({ history: safeHistory });
    const result = await chat.sendMessage(last.content);
    const text = result.response.text();

    let parsed;
    try {
      parsed = extractJson(text);
    } catch {
      return NextResponse.json({
        reply:
          "I can help with Dawood's portfolio, projects, skills, and contact. What would you like to know?",
        actions: [],
      });
    }

    const reply =
      String(parsed.reply ?? "").trim() ||
      "Happy to help with Dawood's portfolio. Ask me anything about his work.";

    return NextResponse.json({
      reply: reply.slice(0, 2500),
      actions: normalizeActions(parsed.actions),
    });
  } catch (err) {
    console.error("Chat API error:", err);
    const status = err?.status;
    if (status === 429) {
      return NextResponse.json(
        {
          error:
            "The AI is temporarily rate-limited. Please wait a few seconds and try again.",
        },
        { status: 429 }
      );
    }
    return NextResponse.json(
      {
        error:
          err?.message?.includes("API_KEY") || status === 400
            ? "Chat service rejected the request. Check your Gemini API key."
            : "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
