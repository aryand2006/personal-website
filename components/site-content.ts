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
    title: "ShadowStack",
    subtitle: "Verified Language Modernization Engine",
    description:
      "Built an enterprise-grade modernization platform for safe legacy-to-modern code transformations with multi-layer verification and human-in-the-loop controls.",
    highlights: [
      "Rule-driven transformation pipeline for structured code evolution",
      "Verification stack with static checks, confidence scoring, and audit traces",
      "Human approval checkpoints for safety in critical code paths",
      "Migration intelligence layer to reduce regressions during modernization",
      "Operational workflows designed for enterprise compliance and reliability",
      "Architecture optimized for iterative large-scale migrations"
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Static Analysis",
      "Verification Pipelines",
      "Enterprise Workflows"
    ],
    focus: "Provably safer modernization with practical developer velocity."
  },
  {
    title: "Dinect",
    subtitle: "Cloud-Native Restaurant OS",
    description:
      "Developed a production-ready restaurant operating platform with QR ordering, kitchen orchestration, and analytics across customer and operator workflows.",
    highlights: [
      "End-to-end architecture spanning customer ordering to kitchen execution",
      "Real-time order status flow and operational event handling",
      "Data model for menu management, fulfillment, and restaurant analytics",
      "Built for reliability under concurrent usage in time-sensitive environments",
      "Clear separation between product surfaces and backend domain logic"
    ],
    technologies: ["Next.js", "Fastify", "Prisma", "PostgreSQL", "Cloud APIs"],
    focus: "Execution speed and operational reliability for real-world workflows."
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
