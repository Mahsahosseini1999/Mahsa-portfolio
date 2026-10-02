"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-sm border border-ink/25 bg-paper px-3 py-2 text-base text-ink outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="mt-6 flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1 text-base">
        Name
        <input name="name" required maxLength={120} className={field} autoComplete="name" />
      </label>
      <label className="flex flex-col gap-1 text-base">
        Your email
        <input name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
      </label>
      <label className="flex flex-col gap-1 text-base">
        Message
        <textarea name="message" required maxLength={5000} rows={6} className={field} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full border border-ink bg-ink px-6 py-2 text-base text-paper transition-opacity hover:opacity-80 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send"}
        </button>
        {state === "sent" && <span className="text-base text-ink-soft">Thank you, your message was sent.</span>}
        {state === "error" && (
          <span className="text-base text-ink-soft">Couldn&rsquo;t send. Please try again.</span>
        )}
      </div>
    </form>
  );
}
