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
  owner?: {
    login?: string;
  };
};

const DEFAULT_USERNAME = "aryand2006";
const KEY_REPO_NAMES = ["ShadowStack", "Jarvis", "dinect", "Offset", "hackprinceton"];

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
        ? "Private repository. Detailed code remains restricted."
        : "Public repository with no description provided yet."),
    url: repo.html_url,
    homepage: repo.homepage ?? "",
    language: repo.language ?? "N/A",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    visibility: repo.private ? "private" : "public"
  };
}

export async function getGitHubRepos(): Promise<RepoSummary[]> {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json"
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const endpoint = token
    ? "https://api.github.com/user/repos?affiliation=owner&visibility=all&sort=updated&direction=desc&per_page=100"
    : `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`;

  const response = await fetch(endpoint, {
    headers,
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    return [];
  }

  const repos = (await response.json()) as GitHubRepoApi[];
  return repos
    .filter((repo) => (token ? repo.owner?.login === username : true))
    .map(toRepoSummary)
    .sort((a, b) => {
      const pa = getPriority(a.name);
      const pb = getPriority(b.name);
      if (pa !== pb) return pa - pb;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}
