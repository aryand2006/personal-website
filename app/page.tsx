import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { interests, projects } from "@/components/site-content";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-20 pb-8">
      <Hero />

      <section className="space-y-8" id="work">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
            Work & Projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Systems Built for Production Reliability
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-mutedText sm:text-base">
            Focused on intelligence infrastructure where performance, traceability,
            and architecture quality matter as much as model capability.
          </p>
        </div>
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-700/60 bg-card/60 p-6 backdrop-blur-md sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
          What I Think About
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {interests.map((item) => (
            <p
              key={item}
              className="rounded-lg border border-slate-700/60 bg-slate-900/45 px-4 py-3 text-sm text-slate-200"
            >
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
