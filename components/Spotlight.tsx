"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Spotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.95], [0, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0.15, 0.5], [0.92, 1]);

  return (
    <section
      ref={ref}
      className="relative my-8 flex min-h-[70vh] items-center overflow-hidden border-y border-bone/10 py-24"
    >
      <motion.div style={{ x, opacity, scale }} className="relative z-10 w-full px-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
          How I show up
        </p>
        <h2 className="font-display mt-6 max-w-5xl text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-bone">
          Curious builder.
          <br />
          <span className="text-signal">Competitive</span> when it counts.
          <br />
          <span className="text-boneDim">Suspicious of results</span> that
          can&apos;t be checked.
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-boneDim sm:text-lg">
          On LinkedIn I lead with CMU, Wincent, and a standing invite to chess.
          Online here I lead with the instruments — same person, different
          altitude.
        </p>
      </motion.div>
    </section>
  );
}
