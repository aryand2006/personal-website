"use client";

import { motion } from "framer-motion";
import type { RepoSummary } from "@/lib/github-types";

type ProjectSlideProps = {
  repo: RepoSummary;
  index: number;
  isLast?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectSlide({ repo, index, isLast }: ProjectSlideProps) {
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString();
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      data-cursor
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: Math.min(index * 0.035, 0.18)
          }
        }
      }}
      className="group relative grid grid-cols-[auto_1fr] gap-5 py-8 sm:gap-10 sm:py-11"
    >
      {/* Rail + bullet */}
      <div className="relative flex w-11 shrink-0 justify-center sm:w-14">
        {!isLast && (
          <span
            className="absolute top-5 bottom-[-2.75rem] w-px bg-gradient-to-b from-signal/35 via-signal/15 to-transparent sm:bottom-[-3rem]"
            aria-hidden
          />
        )}
        <motion.span
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.4, ease }
            }
          }}
          className="relative z-10 mt-1.5 block h-2.5 w-2.5 rounded-full bg-signal ring-[3px] ring-signal/15 transition group-hover:ring-signal/30"
          aria-hidden
        />
      </div>

      {/* Sliding body */}
      <div className="min-w-0 overflow-hidden border-b border-signal/15 pb-8 sm:pb-11">
        <motion.div
          variants={{
            hidden: { x: 56, opacity: 0 },
            show: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.75, ease }
            }
          }}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
              {n}
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-bone transition group-hover:text-signal sm:text-3xl">
              {repo.name}
            </h2>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              ★ {repo.stars}
            </span>
          </div>

          <motion.span
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.55, ease, delay: 0.05 }
              }
            }}
            className="mt-3 block h-px w-12 origin-left bg-signal/40 transition-all duration-300 group-hover:w-20 group-hover:bg-signal"
            aria-hidden
          />

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-boneDim sm:text-[0.95rem]">
            {repo.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
            <span>{repo.language}</span>
            <span>Updated {updatedAt}</span>
            <span className="translate-x-0 text-signal opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              Open ↗
            </span>
          </div>
        </motion.div>
      </div>
    </motion.a>
  );
}
