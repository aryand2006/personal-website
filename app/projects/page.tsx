import type { Metadata } from "next";
import ProjectStrip from "@/components/ProjectStrip";
import RepoCard from "@/components/RepoCard";
import { projects } from "@/components/site-content";
import { getGitHubRepos } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Projects
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          What I&apos;ve built.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Personal trading systems, hackathon wins, and public verification
          instruments — separate from internship experience on{" "}
          <a href="/work" className="text-signal underline-offset-4 hover:underline">
            Work
          </a>
          .
        </p>
      </header>

      <div className="mt-16">
        {projects.map((project, index) => (
          <ProjectStrip
            key={`${project.title}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>

      <section className="mt-24 border-t border-signal/20 pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          GitHub
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">
          Live repositories
        </h2>
        {repos.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-boneDim">
            Repositories unavailable right now. Check{" "}
            <a
              href="https://github.com/aryand2006"
              className="text-signal"
              target="_blank"
              rel="noreferrer"
            >
              github.com/aryand2006
            </a>
            .
          </p>
        )}
      </section>
    </div>
  );
}
