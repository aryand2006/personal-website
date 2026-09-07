"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { RepoSummary } from "@/lib/github-types";

type ProjectRailProps = {
  repos: RepoSummary[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectRail({ repos }: ProjectRailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
    if (!cards.length) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const c = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    syncActive();
    el.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      el.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive, repos.length]);

  const goTo = (index: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-slide]")[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="relative mt-14 sm:mt-16" aria-label="Project carousel">
      <div className="mb-6 flex items-end justify-between gap-4 px-5 sm:px-8 lg:mx-auto lg:max-w-6xl lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">
          {String(active + 1).padStart(2, "0")} / {String(repos.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="h-10 w-10 rounded-full border border-bone/20 bg-white/90 text-bone transition hover:border-signal hover:text-signal disabled:opacity-30"
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(repos.length - 1, active + 1))}
            disabled={active === repos.length - 1}
            className="h-10 w-10 rounded-full border border-bone/20 bg-white/90 text-bone transition hover:border-signal hover:text-signal disabled:opacity-30"
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      {/* Bullet progress rail */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto px-5 sm:px-8 lg:mx-auto lg:max-w-6xl lg:px-8">
        {repos.map((repo, i) => (
          <button
            key={repo.id}
            type="button"
            onClick={() => goTo(i)}
            className="group flex shrink-0 items-center gap-2"
            aria-label={`Go to ${repo.name}`}
            aria-current={i === active ? "true" : undefined}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full transition ${
                i === active
                  ? "scale-125 bg-signal shadow-[0_0_0_4px_rgba(15,158,143,0.2)]"
                  : "bg-bone/25 group-hover:bg-signal/60"
              }`}
            />
            {i < repos.length - 1 && (
              <span
                className={`h-px w-6 sm:w-10 ${i < active ? "bg-signal/50" : "bg-bone/15"}`}
                aria-hidden
              />
            )}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        className="project-rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pl-5 pr-5 sm:gap-6 sm:pl-8 sm:pr-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {repos.map((repo, index) => (
          <ProjectPanel key={repo.id} repo={repo} index={index} active={index === active} />
        ))}
        <div className="w-4 shrink-0 sm:w-8" aria-hidden />
      </div>
    </section>
  );
}

function ProjectPanel({
  repo,
  index,
  active
}: {
  repo: RepoSummary;
  index: number;
  active: boolean;
}) {
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString();
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      data-slide
      data-cursor
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } }
      }}
      className={`relative flex w-[min(88vw,34rem)] shrink-0 snap-center flex-col justify-between rounded-2xl border bg-white p-7 shadow-[0_18px_50px_rgba(11,44,56,0.08)] transition duration-300 sm:w-[min(70vw,38rem)] sm:p-9 ${
        active ? "border-signal/40" : "border-bone/10"
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <motion.span
            variants={{
              hidden: { x: -28, opacity: 0, scale: 0.4 },
              show: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease }
              }
            }}
            className="block h-3 w-3 rounded-full bg-signal"
            aria-hidden
          />
          <motion.span
            variants={{
              hidden: { x: -16, opacity: 0 },
              show: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5, ease }
              }
            }}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal"
          >
            {n}
          </motion.span>
        </div>

        <motion.h2
          variants={{
            hidden: { x: 64, opacity: 0 },
            show: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.7, ease }
            }
          }}
          className="font-display mt-6 text-3xl font-bold tracking-tight text-bone sm:text-4xl"
        >
          {repo.name}
        </motion.h2>

        <motion.span
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: { duration: 0.55, ease }
            }
          }}
          className="mt-4 block h-0.5 w-14 origin-left bg-signal"
          aria-hidden
        />

        <motion.p
          variants={{
            hidden: { x: 48, opacity: 0 },
            show: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.7, ease }
            }
          }}
          className="mt-5 text-base leading-relaxed text-bone/80 sm:text-lg"
        >
          {repo.description}
        </motion.p>
      </div>

      <motion.div
        variants={{
          hidden: { x: 32, opacity: 0 },
          show: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease }
          }
        }}
        className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55"
      >
        <span className="text-bone/70">{repo.language}</span>
        <span>★ {repo.stars}</span>
        <span>Updated {updatedAt}</span>
        <span className="ml-auto text-signal">Open ↗</span>
      </motion.div>
    </motion.a>
  );
}
