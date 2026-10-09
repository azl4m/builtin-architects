"use client";

import { type FormEvent } from "react";

interface ContactFormProps {
  whatsappNumber?: string;
}

const fieldClass =
  "field w-full border border-hairline-alt bg-surface px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-muted focus:outline-2 focus:outline-accent";

export default function ContactForm({ whatsappNumber }: ContactFormProps) {
  const number = (whatsappNumber || "").replace(/\D/g, "");
  const isConfigured = /^[1-9]\d{7,14}$/.test(number);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConfigured) return;
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) || "").trim();
    const message = [
      "Hello BUILTIN, I would like to discuss a project.",
      "",
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      ...(field("email") ? [`Email: ${field("email")}`] : []),
      `Service: ${field("service") || "Not specified"}`,
      "",
      field("message"),
    ].join("\n");
    window.location.assign(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline bg-surface p-12 max-md:p-6">
      <div className="mb-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <input
          className={fieldClass}
          type="text"
          name="name"
          placeholder="Full Name"
          aria-label="Full name"
          required
          minLength={2}
        />
        <input
          className={fieldClass}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          aria-label="Phone number"
          required
          minLength={7}
        />
      </div>
      <input
        className={`${fieldClass} mb-5`}
        type="email"
        name="email"
        placeholder="Email Address (optional)"
        aria-label="Email address (optional)"
      />
      <select className={`${fieldClass} mb-5 text-body`} name="service" aria-label="Service of interest" defaultValue="">
        <option value="" disabled>
          Service of Interest
        </option>
        <option value="Architecture">Architecture</option>
        <option value="Interior Design">Interior Design</option>
        <option value="Interior Contracting">Interior Contracting</option>
        <option value="Building Construction">Building Construction</option>
      </select>
      <textarea
        className={`${fieldClass} mb-7 resize-y`}
        name="message"
        placeholder="Tell us about your project..."
        aria-label="Project details"
        rows={5}
        required
        minLength={10}
      />

      <p className="mb-5 text-sm leading-6 text-body">
        {isConfigured
          ? "Continue to WhatsApp to review your enquiry and press Send."
          : "WhatsApp enquiries are currently unavailable. Please contact us using the details on this page."}
      </p>

      <button
        type="submit"
        disabled={!isConfigured}
        className="rounded-[2px] bg-ink px-10 py-4 font-sans text-sm font-bold tracking-[1px] text-ivory uppercase transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        Continue on WhatsApp
      </button>
    </form>
  );
}
