import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Work"
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">Work</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Technical Systems Portfolio
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-mutedText sm:text-base">
          Selected projects across multimodal interaction, retrieval and reasoning
          pipelines, quantitative modeling, and rapid 0-to-1 product execution.
        </p>
      </header>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
