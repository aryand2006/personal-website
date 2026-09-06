export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  focus?: string;
  href?: string;
};

export const heroTags = [
  "Distributed Systems",
  "Verification",
  "Program Analysis",
  "Research Governance",
  "Falsification Gates",
  "CS @ CMU"
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const projects: Project[] = [

  {
    title: "grit",
    subtitle: "Resilience Verified Under Chaos",
    description:
      "Netflix-shaped failure bounding: circuit breaker, bulkhead, and retry. A seeded campaign takes the dependency Down, requires trip + short-circuit, heals it, requires recovery, and checks protected attempts stay below an unprotected control.",
    highlights: [
      "Closed → open → half-open circuit with logical-time recovery",
      "Bulkhead concurrency limit enforced under load",
      "Cascade bound vs unprotected retry storm on the same seed",
      "Deterministic chaos: same seed ⇒ identical trace hash"
    ],
    technologies: ["Go", "Circuit Breaker", "Chaos Engineering", "Deterministic Simulation"],
    focus: "Don't trust redundancy you haven't killed on purpose.",
    href: "https://github.com/aryand2006/grit"
  },

  {
    title: "aperture",
    subtitle: "Metrics Pipeline with Proven Anomaly Recall",
    description:
      "Meta-shaped observability path: ingest → tumbling windows → spike/drop/flatline/gap detectors. A seeded simulator plants ground-truth anomalies and fails the build on missed recall or clean-baseline false positives.",
    highlights: [
      "Tumbling aggregates with rolling mean/std for z-score detectors",
      "Spike, drop, flatline, and gap detectors with dedup",
      "Planted-anomaly campaigns with executable recall checks",
      "Clean baseline must stay quiet; same seed ⇒ identical trace hash"
    ],
    technologies: ["Go", "Metrics", "Anomaly Detection", "Deterministic Simulation"],
    focus: "Detectors you can falsify, not dashboards you can screenshot.",
    href: "https://github.com/aryand2006/aperture"
  },

  {
    title: "stratum",
    subtitle: "LSM Engine with Proven Crash Recovery",
    description:
      "Leveled LSM with CRC WAL, memtable, bloom SSTables, and compaction. A crashable in-memory VFS discards unsynced bytes; seeded campaigns verify durability and tombstones after reopen.",
    highlights: [
      "fsync-vs-crash modeled explicitly in the VFS",
      "Torn WAL tails truncated safely on replay",
      "L0 flush + L1 compaction preserving newest values",
      "Property suite: durability, tombstones, read-your-writes, determinism"
    ],
    technologies: ["Go", "LSM", "WAL", "Crash Recovery"],
    focus: "Storage you can reopen after death.",
    href: "https://github.com/aryand2006/stratum"
  },

  {
    title: "scroll",
    subtitle: "Fault-Verified Partitioned Commit Log",
    description:
      "Amazon-shaped durable log with consumer groups. Deterministic campaigns drop produces and crash brokers; executable checks enforce at-least-once delivery and per-partition order after heal.",
    highlights: [
      "Append-only partitions with snapshot/restore durability",
      "Consumer-group assignment with fencing epochs",
      "Seeded fault injection: drop, crash, restart",
      "At-least-once + per-partition order property suite",
      "Pairs with concord (Raft) as the log under the consensus layer"
    ],
    technologies: ["Go", "Commit Log", "Consumer Groups", "Deterministic Simulation"],
    focus: "Delivery guarantees you can falsify.",
    href: "https://github.com/aryand2006/scroll"
  },

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
  "Quantitative research that survives falsification",
  "Program analysis for machine-authored code",
  "Systems you can break on purpose and still trust",
  "Hybrid retrieval and answer verification in production",
  "Chess, climbing, and any excuse to compete",
  "Shipping with founding teams when the brief is still forming"
];

export const writingPosts = [
  "Spread tilt governs cost-model sensitivity in portfolio backtests",
  "What an ex-ante portfolio reconstitution actually changes",
  "Why absolute complexity thresholds fail legacy codebases",
  "Prefix invariance as a black-box lookahead test",
  "When a Sharpe is a property of the engine, not the strategy"
];

export type Experience = {
  org: string;
  role: string;
  when: string;
  where?: string;
  summary: string;
  points: string[];
  href?: string;
};

/** Drawn from LinkedIn (linkedin.com/in/aryan-daga) — human voice, real roles. */
export const profile = {
  headline: "CS @ CMU (ML & CompFi) · QT/QR intern @ Wincent",
  location: "Pittsburgh · New York metro",
  email: "aryand@andrew.cmu.edu",
  linkedin: "https://linkedin.com/in/aryan-daga",
  github: "https://github.com/aryand2006",
  blurb:
    "Hi — I'm Aryan, a CS undergrad in CMU's School of Computer Science with concentrations in Machine Learning and Computational Finance. I care about machine learning, software systems, quant, and cybersecurity — and I'm always down for a chess match or anything that gets me outside.",
  thesis:
    "Models and backtests produce answers. I build the instruments that decide whether those answers deserve trust."
};

export const education = {
  school: "Carnegie Mellon University",
  schoolShort: "CMU SCS",
  degree: "B.S. Computer Science",
  focus: "Concentrations in Machine Learning & Computational Finance",
  when: "2024 — Present",
  where: "Pittsburgh, PA"
};

export const experience: Experience[] = [
  {
    org: "Wincent",
    role: "Quantitative Trader / Quantitative Researcher Intern",
    when: "Current",
    summary:
      "Capital-markets internship spanning research and trading — the live edge of CompFi, not just the coursework.",
    points: [
      "QT/QR seat at a prop trading firm",
      "Where research has to clear a P&L bar, not a slide deck"
    ],
    href: "https://www.linkedin.com/company/wincent-co"
  },
  {
    org: "EY",
    role: "AI Research Engineering Intern",
    when: "Prior",
    summary:
      "Built a contextual research assistant for EY's Taxation team — hybrid retrieval, multi-source verification, structured synthesis.",
    points: [
      "Hybrid PDF search: semantic + BM25 over internal corpora",
      "LLM prompt refinement with answer verification across JSON DBs and web",
      "Designed for tax researchers who need provenance, not vibes"
    ],
    href: "https://www.linkedin.com/company/ernstandyoung"
  },
  {
    org: "Otaru AI",
    role: "Founding Team · Software Engineering Intern",
    when: "Prior",
    summary:
      "Early-stage product work from vibe-coded prototype to something people actually use — shipping while the brief was still moving.",
    points: [
      "Founding-team pace: build, talk to users, iterate",
      "Full-stack ownership when headcount is measured in single digits"
    ]
  }
];

export const humanBits = [
  "Chess — always up for a match",
  "Swimming, running, hiking, rock climbing",
  "Badminton, table tennis, skiing, mini golf",
  "Languages across Python, Rust, C++, Java, Swift, SML…"
];
