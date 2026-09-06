export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  focus?: string;
  href?: string;
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const heroTags = [
  "Distributed Systems",
  "Verification",
  "Program Analysis",
  "Research Governance",
  "Falsification Gates",
  "CS @ CMU"
];

export const projects: Project[] = [

  {
    title: "concord",
    subtitle: "Deterministically Verified Raft KV",
    description:
      "From-scratch replicated key-value store with a sans-IO Raft core and a FoundationDB-style deterministic simulator. Seeded partitions, crashes, and message faults; continuous safety invariants; Wing–Gong linearizability checking. Same seed replays any failure bit-for-bit.",
    highlights: [
      "Sans-IO Raft: Step(event) → effects; no clocks or sockets in the state machine",
      "Deterministic simulation with drop/dup/reorder/partition/crash/restart",
      "Election safety + state-machine safety monitors on every campaign",
      "Per-key linearizability checker over client Put/Get histories",
      "500 randomized fault seeds with zero failures in CI smoke"
    ],
    technologies: ["Go", "Raft", "Deterministic Simulation", "Linearizability"],
    focus: "Don't trust a consensus protocol you can't falsify.",
    href: "https://github.com/aryand2006/concord"
  },
  {
    title: "affidavit",
    subtitle: "Research-Governance Gate for Strategy Results",
    description:
      "One-command deployability gate that swears whether a backtest survives falsification: selection reconstitution, degrees-of-freedom accounting, cost tilt, placebo nulls, track-record tests, and a black-box lookahead probe — then writes a hash-chained JSON artifact.",
    highlights: [
      "Ex-ante portfolio reconstitution denominated in money, not p-values",
      "Explicit degrees-of-freedom ledger → noise-floor Sharpe for the search",
      "Cost-tilt break-even and sensitivity to the cost-model assumption",
      "Shuffle and AR(1)-matched placebo batteries",
      "Prefix-invariance leak probe against decision functions you did not write",
      "Sworn only when every applicable check passes; skips never guess"
    ],
    technologies: ["Python", "NumPy", "CLI", "Research Governance"],
    focus: "Don't trust a result you can't verify.",
    href: "https://github.com/aryand2006/affidavit"
  },
  {
    title: "sediment",
    subtitle: "Structural-Erosion Gate for Machine-Authored Code",
    description:
      "Deterministic CI gate that scores the structural debt a change adds — complexity, nesting, duplication, error-masking — attributes it to the diff, and fails on erosion. Built for coding agents that pass tests and still make a codebase worse.",
    highlights: [
      "Diff-attributed structural metrics, not absolute legacy thresholds",
      "Identifier-blind AST fingerprinting for copy-paste the text diff misses",
      "Zero runtime dependencies by design",
      "Gates itself in its own CI"
    ],
    technologies: ["Python", "AST", "CI", "Static Analysis"],
    focus: "Confirm agent-authored code did not erode structure.",
    href: "https://github.com/aryand2006/sediment"
  },
  {
    title: "parallax",
    subtitle: "Implementation Sensitivity in Backtests",
    description:
      "Measures how much a backtest result depends on implementation choices rather than on the strategy — fill timing, cost basis, slippage, share rounding — across a controlled engine sweep.",
    highlights: [
      "144 execution-decision combinations on one auditable engine",
      "Attribution of result spread to the responsible decision",
      "Implementation risk scales monotonically with turnover",
      "Same strategy can report Sharpe 0.54 or 2.18 at 10bp"
    ],
    technologies: ["Python", "NumPy", "Backtesting", "Reproducibility"],
    href: "https://github.com/aryand2006/parallax"
  },
  {
    title: "assay",
    subtitle: "Selection-Bias Gate for Strategy Search",
    description:
      "Tests whether a backtest result survives the search that found it. Puts the losers back: you tested N and kept K — what would running all N have returned?",
    highlights: [
      "Money-denominated ex-ante reconstitution",
      "Deflated Sharpe, MinTRL, and PBO/CSCV",
      "Noise-floor Sharpe from search size and sample length",
      "Caught a live deployment candidate: 10.7%/yr → 1.7%/yr ex ante"
    ],
    technologies: ["Python", "NumPy", "Statistics"],
    href: "https://github.com/aryand2006/assay"
  },
  {
    title: "clairvoyant",
    subtitle: "Differential Lookahead Detection",
    description:
      "Black-box test for strategies that can see the future: run the decision twice at the same date, once with the future hidden. Binary-searches how far forward a leak reaches.",
    highlights: [
      "Prefix-invariance without instrumenting the strategy",
      "Horizon search separates off-by-one shifts from full-sample stats",
      "Works against code you did not write"
    ],
    technologies: ["Python", "NumPy", "Pandas"],
    href: "https://github.com/aryand2006/clairvoyant"
  },
  {
    title: "ShadowStack",
    subtitle: "Verified Language Modernization Engine",
    description:
      "Enterprise-grade platform for provably safe code modernization with multi-layer verification, human-in-the-loop workflows, and migration intelligence on Eclipse JDT.",
    highlights: [
      "Call-graph and data-flow analysis with full type resolution",
      "Purity and mutation classification",
      "7-layer verification before human approval",
      "Adapters for Java, COBOL, and Python 2→3"
    ],
    technologies: ["Java", "Eclipse JDT", "TypeScript", "Static Analysis"],
    href: "https://github.com/aryand2006/ShadowStack"
  }
];

export const interests = [
  "Falsifying results before trusting them",
  "Program analysis for machine-authored code",
  "Research governance in quantitative finance",
  "Implementation risk in backtests",
  "Deterministic CI gates over LLM reviewers",
  "Degrees-of-freedom accounting in strategy search",
  "Verification pipelines with human-in-the-loop checkpoints"
];

export const writingPosts = [
  "Spread tilt governs cost-model sensitivity in portfolio backtests",
  "What an ex-ante portfolio reconstitution actually changes",
  "Why absolute complexity thresholds fail legacy codebases",
  "Prefix invariance as a black-box lookahead test",
  "When a Sharpe is a property of the engine, not the strategy"
];
