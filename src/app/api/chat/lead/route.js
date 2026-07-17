import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL = "dawoodwaseem5@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const visitorName = String(body.visitorName ?? "").trim().slice(0, 120) || "Visitor";
    const visitorEmail = String(body.visitorEmail ?? "").trim();
    const subject =
      String(body.subject ?? "").trim().slice(0, 160) || "Portfolio chatbot lead";
    const message = String(body.message ?? "").trim().slice(0, 2000);

    if (!visitorEmail || !message) {
      return NextResponse.json(
        { error: "Visitor email and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(visitorEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Email is not configured. Add RESEND_API_KEY to .env.local (see .env.example).",
        },
        { status: 503 }
      );
    }

    const from =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [TO_EMAIL],
      replyTo: visitorEmail,
      subject: `[Portfolio chatbot] ${subject}`,
      text: [
        `New lead from the portfolio chatbot.`,
        ``,
        `Name: ${visitorName}`,
        `Email: ${visitorEmail}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin: 0 0 12px;">Portfolio chatbot lead</h2>
          <p><strong>Name:</strong> ${escapeHtml(visitorName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(visitorEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend chatbot lead error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Chat lead API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
