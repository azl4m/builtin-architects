import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name || body.name.trim().length < 2) return "Please enter your full name.";
  if (!body.email || !EMAIL_RE.test(body.email)) return "Please enter a valid email address.";
  if (!body.phone || body.phone.trim().length < 7) return "Please enter a valid phone number.";
  if (!body.message || body.message.trim().length < 10) {
    return "Please tell us a little more about your project (10+ characters).";
  }
  return null;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const { name, phone, email, service, message } = body as ContactPayload;

  // Wire this up to a real transactional-email provider once credentials exist.
  // Set RESEND_API_KEY + CONTACT_TO_EMAIL in the environment to enable delivery.
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? CONTACT.email;

  if (resendApiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "BUILTIN Website <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Service: ${service ?? "Not specified"}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Contact form email delivery failed", await res.text());
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please try again shortly." },
        { status: 502 }
      );
    }
  } else {
    console.warn("RESEND_API_KEY not set — logging enquiry instead of emailing it.", {
      name,
      phone,
      email,
      service,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
