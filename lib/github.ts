import type { RepoSummary } from "./github-types";
import { FALLBACK_PUBLIC_REPOS } from "./fallback-repos";

export type { RepoSummary, RepoVisibility } from "./github-types";

type GitHubRepoApi = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
  fork: boolean;
  topics?: string[];
  owner?: {
    login?: string;
  };
};

const DEFAULT_USERNAME = "aryand2006";

const KEY_REPO_NAMES = [
  "concord",
  "scroll",
  "stratum",
  "aperture",
  "grit",
  "affidavit",
  "sediment",
  "parallax",
  "assay",
  "clairvoyant",
  "ShadowStack",
  "spread-tilt",
  "dinect",
  "Savewise",
  "Offset"
];

const SKIP_NAMES = new Set(["aryand2006"]);

function getPriority(name: string): number {
  const index = KEY_REPO_NAMES.findIndex(
    (repoName) => repoName.toLowerCase() === name.toLowerCase()
  );
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function toRepoSummary(repo: GitHubRepoApi): RepoSummary {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description?.trim() || "Public repository.",
    url: repo.html_url,
    homepage: repo.homepage ?? "",
    language: repo.language ?? "N/A",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    visibility: repo.private ? "private" : "public",
    topics: repo.topics ?? []
  };
}

function sortRepos(repos: RepoSummary[]): RepoSummary[] {
  return [...repos].sort((a, b) => {
    const pa = getPriority(a.name);
    const pb = getPriority(b.name);
    if (pa !== pb) return pa - pb;
    if (b.stars !== a.stars) return b.stars - a.stars;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

async function fetchReposPage(
  url: string,
  headers: HeadersInit
): Promise<GitHubRepoApi[] | null> {
  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 1800 }
    });
    if (!response.ok) return null;
    return (await response.json()) as GitHubRepoApi[];
  } catch {
    return null;
  }
}

/** Public, non-fork repos. Falls back to a static snapshot if the API fails. */
export async function getPublicRepos(): Promise<RepoSummary[]> {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const collected: GitHubRepoApi[] = [];
  for (let page = 1; page <= 3; page++) {
    const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100&page=${page}`;
    const batch = await fetchReposPage(endpoint, headers);
    if (batch === null) {
      return sortRepos(FALLBACK_PUBLIC_REPOS);
    }
    if (batch.length === 0) break;
    collected.push(...batch);
    if (batch.length < 100) break;
  }

  const live = collected
    .filter((repo) => !repo.private && !repo.fork && !SKIP_NAMES.has(repo.name))
    .map(toRepoSummary);

  if (live.length === 0) {
    return sortRepos(FALLBACK_PUBLIC_REPOS);
  }

  return sortRepos(live);
}

export async function getGitHubRepos(): Promise<RepoSummary[]> {
  return getPublicRepos();
}
