"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 border-t border-bone/10 pt-8">
      <p className="font-display text-2xl font-bold tracking-tight">
        Start a conversation
      </p>
      <p className="text-sm leading-relaxed text-boneDim">
        What you&apos;re building, what has to be true, and where verification
        matters.
      </p>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Name
        </span>
        <input
          required
          type="text"
          className="w-full border border-bone/15 bg-ink2/80 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>
      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Email
        </span>
        <input
          required
          type="email"
          className="w-full border border-bone/15 bg-ink2/80 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>
      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Message
        </span>
        <textarea
          required
          rows={5}
          className="w-full border border-bone/15 bg-ink2/80 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>

      <button
        type="submit"
        className="bg-signal px-6 py-3 font-display text-sm font-semibold tracking-wide text-ink transition hover:brightness-110"
      >
        Send message
      </button>

      {submitted && (
        <p className="text-sm text-boneDim">
          Queued. For a faster reply:{" "}
          <a href="mailto:aryand@andrew.cmu.edu" className="text-signal">
            aryand@andrew.cmu.edu
          </a>
        </p>
      )}
    </form>
  );
}
