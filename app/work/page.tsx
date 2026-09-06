import type { Metadata } from "next";
import ProjectStrip from "@/components/ProjectStrip";
import { projects } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Work"
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Work
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          The catalog.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Verification instruments across consensus, logs, storage, metrics,
          chaos, and research governance.
        </p>
      </header>
      <div className="mt-16">
        {projects.map((project, index) => (
          <ProjectStrip key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
