"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 0.7], [0, -48]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <motion.div style={{ opacity: fade, y: rise }} className="relative z-10 max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-boneDim">
          CS @ Carnegie Mellon
        </p>

        <h1 className="font-display mt-6 text-[clamp(3.4rem,12vw,8.5rem)] font-bold leading-[0.86] tracking-tightest text-bone">
          ARYAN
          <br />
          <span className="text-signal">DAGA</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-boneDim sm:text-xl">
          Don&apos;t trust a result you can&apos;t verify.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            className="inline-flex items-center bg-signal px-6 py-3 font-display text-sm font-semibold tracking-wide text-ink transition hover:brightness-110"
          >
            View instruments
          </Link>
          <Link
            href="https://github.com/aryand2006"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.22em] text-boneDim transition hover:text-bone"
          >
            GitHub ↗
          </Link>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-8 right-0 z-10 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-steel md:block"
      >
        scroll — geometry moves with you
      </motion.div>
    </section>
  );
}
