"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { experience, profile } from "@/components/site-content";

const gates = [
  {
    href: "/work",
    label: "01",
    title: "Work",
    blurb: `${experience[0]?.org ?? "Wincent"}, EY, Otaru, SKIDOS. Roles, education, skills.`
  },
  {
    href: "/projects",
    label: "02",
    title: "Projects",
    blurb: "Raft, logs, LSM, observability, resilience. Full public catalog."
  },
  {
    href: "/about",
    label: "03",
    title: "About",
    blurb: "Chess, climbing, competition. How I think about building."
  },
  {
    href: "/contact",
    label: "04",
    title: "Contact",
    blurb: profile.email
  }
];

export default function HomeGateways() {
  return (
    <section className="pb-28 pt-4 sm:pb-36 sm:pt-8" aria-label="Explore">
      <p className="max-w-md text-sm leading-relaxed text-boneDim sm:text-base">
        Overview here. Full detail on each page.
      </p>

      <ul className="mt-12 border-t border-signal/25">
        {gates.map((gate, i) => (
          <motion.li
            key={gate.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-signal/25"
          >
            <Link
              href={gate.href}
              data-cursor
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 sm:grid-cols-[4rem_minmax(0,14rem)_1fr_auto] sm:gap-8 sm:py-9"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
                {gate.label}
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-bone transition group-hover:text-signal sm:text-4xl">
                {gate.title}
              </span>
              <span className="col-span-2 max-w-md text-sm leading-relaxed text-boneDim sm:col-span-1 sm:col-start-3">
                {gate.blurb}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel transition group-hover:translate-x-1 group-hover:text-signal">
                →
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
