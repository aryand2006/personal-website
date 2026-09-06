"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience, education } from "@/components/site-content";

export default function ExperienceRail({
  compact = false
}: {
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const spineScale = useTransform(scrollYProgress, [0.08, 0.9], [0.12, 1]);

  return (
    <section
      ref={ref}
      className={`relative ${compact ? "py-12 sm:py-16" : "py-24 sm:py-32"}`}
      id="experience"
    >
      {!compact && (
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            Internship experience
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-5xl">
            Path so far.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
            One role per side of the spine — dated and tilted into the glass.
            Full career page:{" "}
            <a href="/work" className="text-signal underline-offset-4 hover:underline">
              Work
            </a>
            .
          </p>
        </div>
      )}

      <div className={`glass rounded-2xl p-6 sm:p-8 ${compact ? "mt-0" : "mt-10"}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
          Education · {education.when}
        </p>
        <p className="font-display mt-3 text-2xl font-bold tracking-tight">
          {education.school}
        </p>
        <p className="mt-2 text-sm text-boneDim sm:text-base">
          {education.degree} · {education.focus}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-signal">
          <span>GPA {education.gpa}</span>
          {education.honors.map((h) => (
            <span key={h} className="text-steel">
              {h}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-boneDim">{education.notes[0]}</p>
      </div>

      <div
        className="relative mt-20"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
      >
        <div className="absolute bottom-4 left-4 top-4 w-px sm:left-1/2 sm:-translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/40 to-transparent" />
          <motion.div
            style={{ scaleY: spineScale }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-signal shadow-[0_0_28px_rgba(15,158,143,0.45)]"
          />
        </div>

        <ol className="space-y-16 sm:space-y-24">
          {experience.map((job, index) => {
            const left = index % 2 === 0;
            return (
              <li key={`${job.org}-${job.when}`} className="relative">
                <span
                  className="absolute left-4 top-7 z-20 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-signal bg-white shadow-[0_0_22px_rgba(15,158,143,0.65)] sm:left-1/2"
                  aria-hidden
                />

                <div className="hidden sm:grid sm:grid-cols-2">
                  <div className={`pr-14 ${left ? "" : "flex justify-end"}`}>
                    {left ? (
                      <TimelineCard job={job} side="left" />
                    ) : (
                      <TimelineDate when={job.when} org={job.org} align="right" />
                    )}
                  </div>
                  <div className="pl-14">
                    {left ? (
                      <TimelineDate when={job.when} org={job.org} align="left" />
                    ) : (
                      <TimelineCard job={job} side="right" />
                    )}
                  </div>
                </div>

                <div className="space-y-3 pl-10 sm:hidden">
                  <TimelineDate when={job.when} org={job.org} align="left" />
                  <TimelineCard job={job} side="right" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function TimelineDate({
  when,
  org,
  align
}: {
  when: string;
  org: string;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className={`pt-5 ${align === "right" ? "text-right" : "text-left"}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">
        {when}
      </p>
      <p className="font-display mt-2 text-2xl font-bold tracking-tight text-bone/45">
        {org}
      </p>
    </motion.div>
  );
}

function TimelineCard({
  job,
  side
}: {
  job: (typeof experience)[number];
  side: "left" | "right";
}) {
  const tilt = side === "left" ? -7 : 7;
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, rotateY: side === "left" ? 22 : -22 }}
      whileInView={{ opacity: 1, y: 0, rotateY: tilt }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className="glass w-full rounded-2xl p-6 sm:p-7"
    >
      <h3 className="font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
        {job.role}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-boneDim sm:text-base">
        {job.summary}
      </p>
      <ul className="mt-5 space-y-3">
        {job.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-bone/90">
            <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
