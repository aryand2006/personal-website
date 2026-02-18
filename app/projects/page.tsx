import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 pb-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Deep Build Logs
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-mutedText sm:text-base">
          Practical AI systems engineered with a bias toward measurable reliability,
          controllable behavior, and long-term maintainability.
        </p>
      </header>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
