import type { RepoSummary } from "@/lib/github-types";

type RepoCardProps = {
  repo: RepoSummary;
};

export default function RepoCard({ repo }: RepoCardProps) {
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString();

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="glass group block rounded-2xl p-5 transition hover:border-signal/50"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold tracking-tight transition group-hover:text-signal">
          {repo.name}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          ★ {repo.stars}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-boneDim">{repo.description}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
        <span>{repo.language}</span>
        <span>Updated {updatedAt}</span>
      </div>
    </a>
  );
}
