"use client";

import { motion } from "framer-motion";
import type { Project } from "@/components/site-content";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-card/70 p-6 shadow-md backdrop-blur-md transition-colors hover:border-primaryAccent/50"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.005 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primaryAccent/5 via-transparent to-secondaryAccent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative space-y-4">
        <header>
          <p className="text-xs uppercase tracking-[0.18em] text-primaryAccent/90">
            {project.subtitle}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3>
        </header>
        <p className="text-sm leading-7 text-mutedText sm:text-base">
          {project.description}
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-primaryAccent" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {project.focus && (
          <p className="rounded-lg border border-slate-700/70 bg-slate-900/50 px-3 py-2 text-sm text-slate-200">
            Focus: {project.focus}
          </p>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-600/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
