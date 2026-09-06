"use client";

import { motion } from "framer-motion";
import type { Project } from "@/components/site-content";

type ProjectStripProps = {
  project: Project;
  index: number;
};

export default function ProjectStrip({ project, index }: ProjectStripProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group border-t border-bone/10 py-10 first:border-t-0 sm:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
            {String(index + 1).padStart(2, "0")} — {project.subtitle}
          </p>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="font-display mt-3 block text-3xl font-bold tracking-tight text-bone transition group-hover:text-signal sm:text-4xl"
            >
              {project.title}
            </a>
          ) : (
            <h3 className="font-display mt-3 text-3xl font-bold tracking-tight text-bone sm:text-4xl">
              {project.title}
            </h3>
          )}
          {project.focus && (
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-boneDim">
              {project.focus}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base leading-relaxed text-bone/90 sm:text-lg">
            {project.description}
          </p>
          <ul className="mt-6 space-y-3">
            {project.highlights.slice(0, 4).map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-relaxed text-boneDim"
              >
                <span className="mt-2 h-px w-4 shrink-0 bg-signal" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
