import Link from "next/link";
import type { RepoSummary } from "@/lib/github";

type RepoCardProps = {
  repo: RepoSummary;
};

export default function RepoCard({ repo }: RepoCardProps) {
  const isPrivate = repo.visibility === "private";
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString();

  return (
    <article className="border border-bone/10 p-5 transition hover:border-signal/50">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold tracking-tight">{repo.name}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          {isPrivate ? "Private" : "Public"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-boneDim">{repo.description}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
        <span>{repo.language}</span>
        <span>★ {repo.stars}</span>
        <span>Updated {updatedAt}</span>
      </div>

      <div className="mt-4">
        {isPrivate ? (
          <span className="text-xs text-steel">Link hidden</span>
        ) : (
          <Link
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal"
          >
            GitHub ↗
          </Link>
        )}
      </div>
    </article>
  );
}
