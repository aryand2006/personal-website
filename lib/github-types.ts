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
