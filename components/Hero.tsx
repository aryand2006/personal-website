"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education } from "@/components/site-content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 0.7], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88svh] w-full flex-col justify-end pb-10 pt-28 sm:min-h-[92svh] sm:pb-16 sm:pt-32"
    >
      <motion.div style={{ opacity: fade, y: rise }} className="relative z-10 max-w-5xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.24em] text-boneDim">
          <span>{education.schoolShort}</span>
          <span className="text-signal">/</span>
          <span>ML &amp; CompFi</span>
          <span className="text-signal">/</span>
          <span>QT/QR @ Wincent</span>
          <span className="text-signal">/</span>
          <span>GPA {education.gpa.split(" ")[0]}</span>
        </div>

        <h1 className="font-display mt-7 text-[clamp(3.6rem,13vw,9rem)] font-bold leading-[0.84] tracking-tightest text-bone">
          ARYAN
          <br />
          <span className="text-signal">DAGA</span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-boneDim sm:text-lg">
          CS at Carnegie Mellon. Quant research, AI systems, founding-team engineering.
          Details live on the pages below.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            data-cursor
            className="inline-flex items-center rounded-lg bg-signal px-6 py-3.5 font-display text-sm font-semibold tracking-wide text-white transition hover:brightness-110"
          >
            Work
          </Link>
          <Link
            href="/projects"
            className="glass rounded-lg px-5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bone transition hover:text-signal"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="font-mono text-xs uppercase tracking-[0.22em] text-boneDim transition hover:text-bone"
          >
            About
          </Link>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-6 right-0 z-10 hidden max-w-[12rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-steel md:block"
      >
        explore below
      </motion.div>
    </section>
  );
}
