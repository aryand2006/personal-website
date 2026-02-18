export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  focus?: string;
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
  "AI Systems Engineer",
  "Multimodal Infrastructure",
  "Agent Architectures",
  "RAG + Retrieval Systems",
  "Quantitative Modeling",
  "Full-Stack AI"
];

export const projects: Project[] = [
  {
    title: "Jarvis",
    subtitle: "Real-Time Multimodal Interaction Engine",
    description:
      "Built a real-time AR interaction system using MediaPipe + OpenCV + a custom 3D rendering pipeline for gesture-based 2D/3D object manipulation, with Gemini Live API-driven scene reasoning.",
    highlights: [
      "Custom 3D rendering engine with projection, lighting, and transformation matrices",
      "OBJ parser with normalization and wireframe fallback mode",
      "Hand landmark gesture recognition with disambiguation logic",
      "Lightweight orchestration layer for scene-aware reasoning",
      "Hybrid perception + reasoning loop optimized for responsiveness",
      "Frame smoothing for high-fidelity real-time interaction"
    ],
    technologies: ["Python", "OpenCV", "MediaPipe", "3D Math", "VLM APIs"]
  },
  {
    title: "Domain-Specific Research Agent",
    subtitle: "Enterprise Taxation",
    description:
      "Built a multi-step reasoning agent that combines hybrid retrieval and contextual reasoning to synthesize trustworthy answers from structured and unstructured enterprise data.",
    highlights: [
      "Architecture: Retrieve -> Re-rank -> Reason -> Verify",
      "Hybrid retrieval layer with sparse + dense search strategies",
      "Azure-based document parsing with domain-aware preprocessing",
      "Custom reranking layer and structured output enforcement",
      "Traceable reasoning pipeline with explicit confidence signaling",
      "Explainability interfaces for enterprise trust and compliance"
    ],
    technologies: [
      "Python",
      "Azure AI",
      "Hybrid Retrieval",
      "Reranking",
      "Reasoning Pipelines"
    ],
    focus:
      "Explainability, grounding, and reliability in high-stakes environments."
  },
  {
    title: "Algorithmic Trading Signal Model",
    subtitle: "Systematic Predictive Engine",
    description:
      "Developed a systematic predictive signal model using statistical pattern detection across multiple timeframes, prioritizing robustness over curve-fit performance.",
    highlights: [
      "Feature engineering across rolling windows and regime shifts",
      "Signal decay modeling with noise-aware calibration",
      "Risk-adjusted return optimization under constraints",
      "Backtesting engine with realistic transaction cost modeling",
      "Evaluation via Sharpe, Sortino, and max drawdown metrics",
      "Volatility-adjusted position sizing for controlled exposure"
    ],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Backtesting",
      "Quant Modeling"
    ],
    focus: "Signal robustness over overfitting."
  },
  {
    title: "SaveWise",
    subtitle: "Hackathon Winner",
    description:
      "Built a subscription analysis and automation engine that identifies wasteful recurring payments and simulates optimization opportunities under hackathon constraints.",
    highlights: [
      "Transaction parsing and domain-specific categorization pipeline",
      "Pattern recognition over recurring spending behavior",
      "Heuristic cancellation-probability modeling",
      "Rapid UI implementation under aggressive timeline pressure"
    ],
    technologies: ["React", "Node.js", "Transaction Parsing", "Heuristics"]
  }
];

export const interests = [
  "Agentic workflows in enterprise software",
  "Multimodal memory systems",
  "Retrieval architectures at scale",
  "Explainability in AI systems",
  "Human-in-the-loop design",
  "Performance optimization for real-time systems",
  "Startup building and 0->1 product execution"
];

export const writingPosts = [
  "Designing Enterprise-Grade Retrieval Pipelines",
  "Sparse vs Dense Retrieval Tradeoffs",
  "Building Explainable Agents",
  "Memory Architectures for AI Systems",
  "Lessons from Hackathons"
];
