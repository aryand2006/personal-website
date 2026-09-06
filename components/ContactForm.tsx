"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-2xl p-6 sm:p-8">
      <p className="font-display text-2xl font-bold tracking-tight">
        Start a conversation
      </p>
      <p className="text-sm leading-relaxed text-boneDim">
        Quant, systems, founding-team work — or a chess challenge.
      </p>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Name
        </span>
        <input
          required
          type="text"
          className="w-full rounded-lg border border-signal/20 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>
      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Email
        </span>
        <input
          required
          type="email"
          className="w-full rounded-lg border border-signal/20 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>
      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
          Message
        </span>
        <textarea
          required
          rows={5}
          className="w-full rounded-lg border border-signal/20 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition focus:border-signal"
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-signal px-6 py-3 font-display text-sm font-semibold tracking-wide text-white transition hover:brightness-110"
      >
        Send message
      </button>

      {submitted && (
        <p className="text-sm text-boneDim">
          Queued. Faster reply:{" "}
          <a href="mailto:aryand@andrew.cmu.edu" className="text-signal">
            aryand@andrew.cmu.edu
          </a>
        </p>
      )}
    </form>
  );
}
