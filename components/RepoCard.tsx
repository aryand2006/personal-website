import Link from "next/link";
import type { RepoSummary } from "@/lib/github";

type RepoCardProps = {
  repo: RepoSummary;
};

export default function RepoCard({ repo }: RepoCardProps) {
  const isPrivate = repo.visibility === "private";
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString();

  return (
    <article className="rounded-xl border border-slate-700/60 bg-card/70 p-5 transition hover:-translate-y-1 hover:border-primaryAccent/45">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-slate-100">
          {repo.name}
        </h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isPrivate
              ? "border border-amber-400/35 bg-amber-400/10 text-amber-200"
              : "border border-emerald-400/35 bg-emerald-400/10 text-emerald-200"
          }`}
        >
          {isPrivate ? "Private" : "Public"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-mutedText">{repo.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1">
          {repo.language}
        </span>
        <span className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1">
          Stars: {repo.stars}
        </span>
        <span className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1">
          Forks: {repo.forks}
        </span>
        <span className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1">
          Updated: {updatedAt}
        </span>
      </div>

      <div className="mt-4">
        {isPrivate ? (
          <span className="text-xs text-slate-400">
            Link hidden for private repository visibility.
          </span>
        ) : (
          <Link
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-primaryAccent transition hover:text-blue-300"
          >
            View on GitHub
          </Link>
        )}
      </div>
    </article>
  );
}
