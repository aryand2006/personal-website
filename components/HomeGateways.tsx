"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { experience, profile } from "@/components/site-content";

const gates = [
  {
    href: "/work",
    label: "Work",
    title: "Internships & path.",
    blurb: `${experience[0]?.role.split(" / ")[0] ?? "Quant"} at ${experience[0]?.org ?? "Wincent"}, then EY, Otaru, SKIDOS.`,
    meta: "Roles · education · skills"
  },
  {
    href: "/projects",
    label: "Projects",
    title: "Public systems work.",
    blurb: "Raft, logs, LSM, observability, resilience. Synced from GitHub.",
    meta: "Full catalog"
  },
  {
    href: "/about",
    label: "About",
    title: "Beyond the resume.",
    blurb: "Chess, climbing, competition. How I think about building.",
    meta: "Bio · interests"
  },
  {
    href: "/contact",
    label: "Contact",
    title: "Say hello.",
    blurb: profile.email,
    meta: "Email · LinkedIn · GitHub"
  }
];

export default function HomeGateways() {
  return (
    <section className="pb-28 pt-6 sm:pb-36 sm:pt-10" aria-label="Explore">
      <div className="mb-10 flex items-end justify-between gap-6 border-t border-signal/20 pt-10">
        <p className="max-w-md text-sm leading-relaxed text-boneDim sm:text-base">
          Short version here. Open a page for the full story.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {gates.map((gate, i) => (
          <motion.div
            key={gate.href}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={gate.href}
              data-cursor
              className="group glass block rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-signal/40 sm:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
                {gate.label}
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-bone sm:text-3xl">
                {gate.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-boneDim">{gate.blurb}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-steel transition group-hover:text-signal">
                {gate.meta} →
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
