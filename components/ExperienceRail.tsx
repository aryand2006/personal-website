"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/components/site-content";

export default function ExperienceRail() {
  return (
    <section className="py-24 sm:py-32" id="experience">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Path so far
        </p>
        <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-5xl">
          Not only the repos.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          QT/QR at Wincent, AI research engineering at EY, founding-team SWE at
          Otaru — and CMU SCS underneath it.
        </p>
      </div>

      <div className="mt-10 border border-bone/10 bg-ink2/40 p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
          Education
        </p>
        <p className="font-display mt-3 text-2xl font-bold tracking-tight">
          {education.school}
        </p>
        <p className="mt-2 text-sm text-boneDim sm:text-base">
          {education.degree} · {education.focus}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          {education.when} · {education.where}
        </p>
      </div>

      <div className="mt-4">
        {experience.map((job, index) => (
          <motion.article
            key={`${job.org}-${job.role}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="grid gap-4 border-t border-bone/10 py-10 sm:grid-cols-[8rem_1fr] sm:gap-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              {job.when}
            </p>
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-bone">
                {job.org}
              </p>
              <p className="mt-1 text-sm text-boneDim sm:text-base">{job.role}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/85 sm:text-base">
                {job.summary}
              </p>
              <ul className="mt-5 space-y-2">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-boneDim"
                  >
                    <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
