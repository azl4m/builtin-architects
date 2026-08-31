"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "field w-full border border-hairline-alt bg-surface px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-muted focus:outline-2 focus:outline-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start justify-center border border-hairline bg-surface p-12 text-center max-md:p-8">
        <h3 className="mb-3 font-display text-2xl font-semibold">Thank you.</h3>
        <p className="mb-6 text-[15px] leading-[1.8] text-body">
          Your enquiry has been sent. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="border-b-2 border-accent pb-1 text-[13px] font-bold tracking-[1px] text-ink uppercase"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-hairline bg-surface p-12 max-md:p-6">
      <div className="mb-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <input
          className={fieldClass}
          type="text"
          name="name"
          placeholder="Full Name"
          required
          minLength={2}
        />
        <input
          className={fieldClass}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          minLength={7}
        />
      </div>
      <input
        className={`${fieldClass} mb-5`}
        type="email"
        name="email"
        placeholder="Email Address"
        required
      />
      <select className={`${fieldClass} mb-5 text-body`} name="service" defaultValue="">
        <option value="" disabled>
          Service of Interest
        </option>
        <option value="Architecture">Architecture</option>
        <option value="Interior Design">Interior Design</option>
        <option value="Construction">Construction</option>
      </select>
      <textarea
        className={`${fieldClass} mb-7 resize-y`}
        name="message"
        placeholder="Tell us about your project..."
        rows={5}
        required
        minLength={10}
      />

      {error ? <p className="mb-5 text-sm text-[#e5484d]">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[2px] bg-ink px-10 py-4 font-sans text-sm font-bold tracking-[1px] text-ivory uppercase transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
