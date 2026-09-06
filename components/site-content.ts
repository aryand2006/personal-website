export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  focus?: string;
  href?: string;
};

export type Experience = {
  org: string;
  role: string;
  when: string;
  where?: string;
  summary: string;
  points: string[];
  href?: string;
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const profile = {
  name: "Aryan Daga",
  headline: "CS @ CMU (ML & CompFi) · QT/QR @ Wincent",
  location: "New York City, NY",
  phone: "(412) 983-0593",
  email: "aryand@andrew.cmu.edu",
  linkedin: "https://linkedin.com/in/aryan-daga",
  github: "https://github.com/aryand2006",
  blurb:
    "CS undergrad at Carnegie Mellon (SCS) with concentrations in Machine Learning and Computational Finance. I work across quant research, AI systems, and founding-team engineering. Always up for a chess match."
};

export const education = {
  school: "Carnegie Mellon University",
  schoolShort: "CMU SCS",
  degree: "B.S. Computer Science",
  focus: "Concentrations in Machine Learning & Computational Finance",
  when: "Expected May 2028",
  where: "Pittsburgh, PA",
  gpa: "3.89 / 4.0",
  honors: ["Dean’s Honors List", "SAT 1590", "ACT Superscore 36 (Composite 35)"],
  coursework: [
    "Intro to Deep Learning",
    "Probability and Computing",
    "Principles of Imperative Computation",
    "Concepts in AI",
    "Mathematical Foundations for CS",
    "Writing about Data",
    "Principles of Functional Programming"
  ],
  notes: [
    "JEE Mains Rank 594 / 1.23M · Advanced Rank 1154 / 180K (top 0.1% in India)"
  ]
};

export const experience: Experience[] = [
  {
    org: "Wincent",
    role: "Quantitative Research / Trading Intern",
    when: "Jun 2026 - Jul 2026",
    summary:
      "Took a crypto trading strategy full-cycle from research to live deployment with firm-allocated capital.",
    points: [
      "Reverse-engineered structural and positioning drivers behind flagged assets, separating idiosyncratic signal from market beta",
      "Built and backtested the systematic strategy in Python with full risk apparatus: stop-losses, position sizing, drawdown controls",
      "Traded live, monitoring real-time execution and analyzing divergence between live P&L and backtested expectations"
    ]
  },
  {
    org: "Ernst & Young (EY)",
    role: "AI Research Engineering Intern",
    when: "May 2025 - Aug 2025",
    summary:
      "Built a domain-specific research agent for EY’s Taxation Dept. with hybrid RAG and multi-source verification.",
    points: [
      "Hybrid stack: web retrieval (Tavily), contextual PDF retrieval (BM25 + semantic), JSON knowledge graphs",
      "Modular agents for prompt refinement, Llama 3 synthesis, and multi-source answer verification",
      "Designed for tax researchers who need provenance, not guesswork"
    ]
  },
  {
    org: "Otaru AI",
    role: "Founding Team · Software Engineering Intern (Part-Time)",
    when: "May 2025 - Aug 2025",
    summary:
      "Drove the prototype launch of Otaru’s sales-coaching platform, now used by 100+ beta reps.",
    points: [
      "Adaptive adversarial personas for high-stakes client-call rehearsal; helped cut sales-rep ramp-up by ~80%",
      "Architected backend + LLM workflows on Python, Firebase, GCP (Cloud Functions, Firestore, Compute Engine), LangChain",
      "Integrated vector databases and REST APIs for dynamic prompt evaluation"
    ]
  },
  {
    org: "SKIDOS",
    role: "Project Intern",
    when: "Earlier",
    summary:
      "Product innovation for an edtech games company. Shipped educational games and an AI mock-interview assistant.",
    points: [
      "Developed 3 educational games that collectively generated ~$23K in new revenue",
      "Built an AI-driven mock interview assistant on OpenAI’s DaVinci model",
      "Parsed supervisor instructions into effective LLM prompts to simulate realistic hiring conversations"
    ],
    href: "https://www.linkedin.com/company/skidos-games"
  }
];

export const skills = {
  languages: [
    "Python",
    "C++",
    "SQL",
    "Java",
    "C#",
    "Rust",
    "JavaScript",
    "Swift",
    "SML",
    "MATLAB",
    "LaTeX",
    "React.js"
  ],
  quantMl: [
    "Stochastic Processes",
    "Monte Carlo",
    "Statistical Modeling",
    "Time Series",
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "NLP",
    "CV",
    "LLM",
    "RAG",
    "Deep Learning"
  ],
  infra: [
    "Git",
    "Kubernetes",
    "Linux",
    "Firebase",
    "JUnit",
    "Cybersecurity Analyst Cert",
    "Google Data Analytics Professional"
  ]
};

/** Flagship public systems work + resume technical projects */
export const projects: Project[] = [
  {
    title: "Options & Equities Trading System",
    subtitle: "Personal · Live Markets",
    description:
      "Stochastic-calculus pricing and risk framework deployed in live markets across equities and options - GBM, Black-Scholes, Monte Carlo for tail risk, with a custom C++ backtesting engine.",
    highlights: [
      "VaR-constrained sizing and real-time drawdown monitoring",
      "Greeks decomposition (delta, gamma, theta, vega) with volatility-regime-aware hedging",
      "C++ engine: bid-ask-aware execution, slippage modeling, walk-forward validation"
    ],
    technologies: ["C++", "Python", "Stochastic Calculus", "Monte Carlo"],
    focus: "Jan 2025 - Present",
    href: "https://github.com/aryand2006"
  },
  {
    title: "concord",
    subtitle: "Deterministically Verified Raft KV",
    description:
      "Sans-IO Raft key-value store with FoundationDB-style deterministic simulation, fault injection, and Wing–Gong linearizability checking.",
    highlights: [
      "Partitions, crashes, loss, reorder - same seed replays any failure",
      "Election + state-machine safety monitors on every campaign",
      "500 randomized fault seeds with zero failures in smoke"
    ],
    technologies: ["Go", "Raft", "Deterministic Simulation"],
    focus: "Don't trust a consensus protocol you can't falsify.",
    href: "https://github.com/aryand2006/concord"
  },
  {
    title: "scroll",
    subtitle: "Fault-Verified Partitioned Commit Log",
    description:
      "Durable partitioned log with consumer groups. Seeded campaigns drop produces and crash brokers; checks enforce at-least-once delivery and per-partition order.",
    highlights: [
      "Append-only partitions with snapshot/restore durability",
      "Consumer-group assignment with fencing epochs",
      "At-least-once + per-partition order property suite"
    ],
    technologies: ["Go", "Commit Log", "Consumer Groups"],
    focus: "Delivery guarantees you can falsify.",
    href: "https://github.com/aryand2006/scroll"
  },
  {
    title: "stratum",
    subtitle: "LSM Engine with Proven Crash Recovery",
    description:
      "Leveled LSM with CRC WAL, memtable, bloom SSTables, and a crashable VFS that discards unsynced bytes.",
    highlights: [
      "fsync-vs-crash modeled explicitly",
      "Torn WAL tails truncated safely on replay",
      "Durability, tombstones, read-your-writes after reopen"
    ],
    technologies: ["Go", "LSM", "WAL", "Crash Recovery"],
    focus: "Storage you can reopen after death.",
    href: "https://github.com/aryand2006/stratum"
  },
  {
    title: "aperture",
    subtitle: "Metrics Pipeline with Proven Anomaly Recall",
    description:
      "Ingest → tumbling windows → spike/drop/flatline/gap detectors. A seeded simulator plants anomalies and fails on missed recall or clean false positives.",
    highlights: [
      "Planted-anomaly campaigns with executable recall checks",
      "Clean baseline must stay quiet",
      "Same seed ⇒ identical trace hash"
    ],
    technologies: ["Go", "Metrics", "Anomaly Detection"],
    focus: "Detectors you can falsify.",
    href: "https://github.com/aryand2006/aperture"
  },
  {
    title: "grit",
    subtitle: "Resilience Verified Under Chaos",
    description:
      "Circuit breaker, bulkhead, and retry. Seeded Down→heal campaigns require trip, short-circuit, recovery, and cascade bounding vs unprotected control.",
    highlights: [
      "Closed → open → half-open with logical-time recovery",
      "Protected attempts stay below unprotected control",
      "Deterministic chaos campaigns"
    ],
    technologies: ["Go", "Circuit Breaker", "Chaos"],
    focus: "Don't trust redundancy you haven't killed on purpose.",
    href: "https://github.com/aryand2006/grit"
  },
  {
    title: "Jarvis",
    subtitle: "Best Use of Computer Vision · PennApps XXVI",
    description:
      "Webcam AR system for real-time 3D object manipulation via hand gestures, with Gemini Live voice interaction.",
    highlights: [
      "MediaPipe Hands + OpenCV + custom mesh rendering",
      "Pinch / rotate / scale with Bézier gesture smoothing",
      "Processed 20+ complex OBJ models"
    ],
    technologies: ["Python", "MediaPipe", "OpenCV", "JavaScript"],
    focus: "Sep 2025",
    href: "https://github.com/aryand2006"
  },
  {
    title: "HumBox",
    subtitle: "1st Place · Anthropic Speedrun Hackathon",
    description:
      "Shipped a full music-creation tool in a 1.5-hour sprint - hum, tap, or describe a melody into a live 16-step sequencer.",
    highlights: [
      "Removes the DAW / music-theory barrier for non-musicians",
      "Natural-language + hummed/tapped input paths",
      "Fully functional product under extreme time pressure"
    ],
    technologies: ["Hackathon", "Audio", "LLM"],
    focus: "Apr 2025"
  },
  {
    title: "affidavit",
    subtitle: "Research-Governance Gate",
    description:
      "One-command deployability gate that swears whether a backtest survives falsification - selection reconstitution, DoF, cost tilt, placebos, leak probe.",
    highlights: [
      "Ex-ante portfolio reconstitution in money terms",
      "Hash-chained sworn JSON artifact",
      "Skips never guess"
    ],
    technologies: ["Python", "NumPy", "Research Governance"],
    href: "https://github.com/aryand2006/affidavit"
  }
];

export const interests = [
  "Quantitative research that survives live markets",
  "Program analysis for machine-authored code",
  "Systems you can break on purpose and still trust",
  "Hybrid retrieval with multi-source verification",
  "Chess, climbing, and anything competitive",
  "Founding-team shipping when the brief is still forming"
];

export const humanBits = [
  "Chess, always up for a match",
  "Swimming, running, hiking, rock climbing",
  "Badminton, table tennis, skiing, mini golf",
  "Based in New York City · CMU in Pittsburgh"
];
