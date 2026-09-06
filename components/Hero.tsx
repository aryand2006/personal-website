"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { heroTags } from "@/components/site-content";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 16 });
  const springY = useSpring(my, { stiffness: 120, damping: 16 });

  const parallaxX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const imageParallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const imageParallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  return (
    <section
      className="relative mx-auto grid min-h-[74vh] w-full max-w-7xl grid-cols-1 gap-12 rounded-3xl border border-slate-700/40 bg-[#0b0f19]/50 p-6 shadow-glow sm:p-8 lg:grid-cols-2 lg:p-12"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="pointer-events-none absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full blur-[100px]"
        style={{
          x: parallaxX,
          y: parallaxY,
          background: "rgba(59, 130, 246, 0.18)"
        }}
        aria-hidden
      />

      <div className="relative flex flex-col justify-center">
        <p className="mb-4 text-lg font-medium text-mutedText">Hi, I&apos;m</p>
        <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          ARYAN
          <br />
          <span className="text-primaryAccent">DAGA</span>
        </h1>
        <p className="mt-5 text-lg font-medium text-slate-300">
          Verification &amp; program analysis.
          <br />
          Computer Science @ Carnegie Mellon.
        </p>
        <p className="mt-6 max-w-xl text-sm leading-7 text-mutedText sm:text-base">
          I build gates that decide whether a result is actually correct — for
          machine-authored code and for quantitative backtests. Models can
          produce answers; I work on the tooling that falsifies them before
          anyone ships.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="rounded-lg border border-primaryAccent/50 bg-primaryAccent/15 px-5 py-3 text-sm font-semibold transition hover:border-primaryAccent hover:bg-primaryAccent/25"
          >
            View Work
          </Link>
          <Link
            href="https://github.com/aryand2006"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-600/70 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-primaryAccent/60 hover:text-primaryText"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/aryan-daga"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-600/70 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-secondaryAccent/70 hover:text-primaryText"
          >
            LinkedIn
          </Link>
        </div>
      </div>

      <div className="relative flex min-h-[460px] items-center justify-center">
        <motion.div
          className="absolute h-80 w-80 rounded-full blur-[90px]"
          style={{
            x: imageParallaxX,
            y: imageParallaxY,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.28), rgba(59,130,246,0.08), transparent 70%)"
          }}
          aria-hidden
        />
        <motion.div
          className="relative flex h-[21rem] w-[21rem] items-center justify-center rounded-full border border-slate-600/60 bg-gradient-to-b from-slate-800/70 to-slate-900/80 shadow-glow sm:h-[23rem] sm:w-[23rem]"
          style={{ x: imageParallaxX, y: imageParallaxY }}
        >
          <div className="h-[92%] w-[92%] rounded-full border border-slate-500/35 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),rgba(15,23,42,0.95)_65%)] p-8">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-slate-600/60 bg-[#0f172a]/75 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-mutedText">
                  Photo Placeholder
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Professional Headshot
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {heroTags.map((item, index) => {
          const positions = [
            "left-0 top-4",
            "right-0 top-12",
            "-left-2 top-1/2",
            "right-3 top-[58%]",
            "left-14 bottom-4",
            "right-12 bottom-6"
          ];
          return (
            <motion.div
              key={item}
              className={`absolute ${positions[index]} glass-card rounded-xl px-3 py-2 text-xs text-slate-200 shadow-md sm:text-sm`}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6 + index * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
