export type RepoVisibility = "public" | "private";

export type RepoSummary = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  visibility: RepoVisibility;
  topics: string[];
};

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

/** Prefer flagship systems work when ordering the grid. */
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
  "spread-tilt"
];

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
    description:
      repo.description?.trim() ||
      (repo.private
        ? "Private repository."
        : "Public repository."),
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

async function fetchReposPage(
  url: string,
  headers: HeadersInit
): Promise<GitHubRepoApi[]> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 1800 }
  });
  if (!response.ok) return [];
  return (await response.json()) as GitHubRepoApi[];
}

/** All public, non-fork repos owned by aryand2006. */
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

  // Paginate public user repos (up to 300).
  const collected: GitHubRepoApi[] = [];
  for (let page = 1; page <= 3; page++) {
    const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100&page=${page}`;
    const batch = await fetchReposPage(endpoint, headers);
    if (batch.length === 0) break;
    collected.push(...batch);
    if (batch.length < 100) break;
  }

  return collected
    .filter((repo) => !repo.private && !repo.fork)
    .map(toRepoSummary)
    .sort((a, b) => {
      const pa = getPriority(a.name);
      const pb = getPriority(b.name);
      if (pa !== pb) return pa - pb;
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}

/** @deprecated use getPublicRepos */
export async function getGitHubRepos(): Promise<RepoSummary[]> {
  return getPublicRepos();
}
