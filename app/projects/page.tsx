import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import RepoCard from "@/components/RepoCard";
import { projects } from "@/components/site-content";
import { getGitHubRepos } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

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

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-primaryAccent">
            GitHub Repositories
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Auto-Synced from GitHub
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-mutedText sm:text-base">
            Public repositories include direct links. Private repositories are
            listed with context but without external links. Key repositories are
            prioritized first.
          </p>
        </div>

        {repos.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700/60 bg-card/70 p-5 text-sm text-mutedText">
            No repositories were fetched right now. If you want private repos to
            appear, set `GITHUB_TOKEN` (repo scope) and `GITHUB_USERNAME` in
            your environment.
          </div>
        )}
      </section>
    </div>
  );
}
