import type { Metadata } from "next";
import RepoCard from "@/components/RepoCard";
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
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Projects
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Public repositories.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-boneDim sm:text-lg">
          Live sync of public repos from{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-signal underline-offset-4 hover:underline"
          >
            github.com/aryand2006
          </a>
          . For internships, see{" "}
          <Link href="/work" className="text-signal underline-offset-4 hover:underline">
            Work
          </Link>
          .
        </p>
      </header>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className="mt-14">
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
