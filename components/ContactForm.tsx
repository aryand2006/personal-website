"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="space-y-4 rounded-2xl border border-slate-700/70 bg-card/65 p-6 backdrop-blur-sm sm:p-8"
    >
      <h2 className="text-2xl font-semibold">Start a conversation</h2>
      <p className="text-sm leading-7 text-mutedText">
        Share what you&apos;re building, what constraints you care about, and
        where intelligent systems can drive leverage.
      </p>

      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Name</span>
        <input
          required
          type="text"
          placeholder="Your name"
          className="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primaryAccent/70"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Email</span>
        <input
          required
          type="email"
          placeholder="you@company.com"
          className="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primaryAccent/70"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Message</span>
        <textarea
          required
          rows={5}
          placeholder="Tell me about the system or problem."
          className="w-full rounded-lg border border-slate-600/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primaryAccent/70"
        />
      </label>

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        type="submit"
        className="rounded-lg border border-primaryAccent/50 bg-primaryAccent/20 px-5 py-3 text-sm font-semibold text-primaryText transition hover:bg-primaryAccent/30"
      >
        Send Message
      </motion.button>

      {submitted && (
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Message queued. For immediate response, email aryand@andrew.cmu.edu.
        </p>
      )}
    </motion.form>
  );
}
