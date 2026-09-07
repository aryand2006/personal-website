import type { Metadata } from "next";
import ProjectRail from "@/components/ProjectRail";
import { profile } from "@/components/site-content";
import { getPublicRepos } from "@/lib/github";
import Link from "next/link";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const repos = await getPublicRepos();

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <header className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Projects
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-bone sm:text-6xl">
          Public repositories.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">
          Live sync of public repos from{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-signal underline-offset-4 hover:underline"
          >
            github.com/aryand2006
          </a>
          . For internships, see{" "}
          <Link
            href="/work"
            className="font-medium text-signal underline-offset-4 hover:underline"
          >
            Work
          </Link>
          .
        </p>
      </header>

      <ProjectRail repos={repos} />

      <div className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-8">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-lg bg-signal px-6 py-3 font-display text-sm font-semibold text-white transition hover:brightness-110"
        >
          View all on GitHub
        </a>
      </div>
    </div>
  );
}
