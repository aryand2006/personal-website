import type { RepoSummary } from "./github-types";

/**
 * Static snapshot of public repos (aryand2006) for when the GitHub API
 * is rate-limited or unreachable. Kept in priority order for the grid.
 */
export const FALLBACK_PUBLIC_REPOS: RepoSummary[] = [
  {
    id: 1,
    name: "concord",
    description:
      "Raft KV verified by deterministic simulation. Seeded faults, safety invariants, linearizability.",
    url: "https://github.com/aryand2006/concord",
    homepage: "",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T12:55:06Z",
    visibility: "public",
    topics: []
  },
  {
    id: 2,
    name: "scroll",
    description:
      "Partitioned commit log verified under faults. At-least-once delivery, consumer groups, seeded crashes.",
    url: "https://github.com/aryand2006/scroll",
    homepage: "",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T13:14:31Z",
    visibility: "public",
    topics: []
  },
  {
    id: 3,
    name: "stratum",
    description:
      "LSM storage engine with crash-recovery property tests. WAL, SSTables, seeded durability campaigns.",
    url: "https://github.com/aryand2006/stratum",
    homepage: "",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T13:22:52Z",
    visibility: "public",
    topics: []
  },
  {
    id: 4,
    name: "aperture",
    description:
      "Metrics pipeline with planted-anomaly recall. Meta-shaped observability you can falsify.",
    url: "https://github.com/aryand2006/aperture",
    homepage: "",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T13:33:59Z",
    visibility: "public",
    topics: []
  },
  {
    id: 5,
    name: "grit",
    description:
      "Resilience primitives verified under chaos. Circuit breaker, bulkhead, cascade bounding.",
    url: "https://github.com/aryand2006/grit",
    homepage: "",
    language: "Go",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T13:39:09Z",
    visibility: "public",
    topics: []
  },
  {
    id: 6,
    name: "affidavit",
    description: "Swear whether a strategy result survives falsification.",
    url: "https://github.com/aryand2006/affidavit",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T10:53:14Z",
    visibility: "public",
    topics: []
  },
  {
    id: 7,
    name: "sediment",
    description: "A deterministic structural-erosion gate for machine-authored code.",
    url: "https://github.com/aryand2006/sediment",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-31T06:50:57Z",
    visibility: "public",
    topics: []
  },
  {
    id: 8,
    name: "parallax",
    description:
      "Measures how much a backtest result depends on implementation choices rather than the strategy.",
    url: "https://github.com/aryand2006/parallax",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-07T19:57:25Z",
    visibility: "public",
    topics: []
  },
  {
    id: 9,
    name: "assay",
    description: "Test whether a backtest result survives the search that found it.",
    url: "https://github.com/aryand2006/assay",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-31T06:51:35Z",
    visibility: "public",
    topics: []
  },
  {
    id: 10,
    name: "clairvoyant",
    description: "Detect strategies that can see the future.",
    url: "https://github.com/aryand2006/clairvoyant",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-10T12:15:42Z",
    visibility: "public",
    topics: []
  },
  {
    id: 11,
    name: "spread-tilt",
    description:
      "Paper on how spread tilt governs cost-model sensitivity in portfolio backtests.",
    url: "https://github.com/aryand2006/spread-tilt",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-31T06:52:55Z",
    visibility: "public",
    topics: []
  },
  {
    id: 12,
    name: "ShadowStack",
    description:
      "Verified language modernization engine with multi-layer verification and human-in-the-loop workflows.",
    url: "https://github.com/aryand2006/ShadowStack",
    homepage: "",
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-15T03:58:21Z",
    visibility: "public",
    topics: []
  },
  {
    id: 13,
    name: "dinect",
    description:
      "Cloud-native restaurant OS: QR ordering, kitchen display, analytics. Next.js, Fastify, Prisma.",
    url: "https://github.com/aryand2006/dinect",
    homepage: "",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updatedAt: "2026-03-09T13:38:29Z",
    visibility: "public",
    topics: []
  },
  {
    id: 14,
    name: "Savewise",
    description:
      "Hackathon-winning subscription intelligence for recurring expense detection and cancellation.",
    url: "https://github.com/aryand2006/Savewise",
    homepage: "",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "2026-02-18T18:50:45Z",
    visibility: "public",
    topics: []
  },
  {
    id: 15,
    name: "Offset",
    description:
      "HackMIT 2025 carbon-footprint tracker and browser extension for lower-emission delivery choices.",
    url: "https://github.com/aryand2006/Offset",
    homepage: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-02-18T18:49:51Z",
    visibility: "public",
    topics: []
  },
  {
    id: 16,
    name: "NOVA-Browser",
    description: "Navigate. Organize. Visualize. Achieve.",
    url: "https://github.com/aryand2006/NOVA-Browser",
    homepage: "",
    language: "C++",
    stars: 0,
    forks: 0,
    updatedAt: "2025-05-12T05:27:05Z",
    visibility: "public",
    topics: []
  },
  {
    id: 17,
    name: "3D_Renderer_and_Editor",
    description: "Software-based 3D renderer and editor.",
    url: "https://github.com/aryand2006/3D_Renderer_and_Editor",
    homepage: "",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "2025-03-05T01:58:49Z",
    visibility: "public",
    topics: []
  },
  {
    id: 18,
    name: "CastQuest",
    description:
      "Movie-actor connection game using graph search to find shortest paths through shared filmographies.",
    url: "https://github.com/aryand2006/CastQuest",
    homepage: "",
    language: "HTML",
    stars: 0,
    forks: 0,
    updatedAt: "2026-02-18T18:49:50Z",
    visibility: "public",
    topics: []
  },
  {
    id: 19,
    name: "personal-website",
    description: "Personal site. Next.js, TypeScript, Tailwind, Three.js.",
    url: "https://github.com/aryand2006/personal-website",
    homepage: "",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-06T14:51:27Z",
    visibility: "public",
    topics: []
  }
];
