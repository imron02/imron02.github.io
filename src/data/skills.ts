export type SkillClassId = "frontend" | "mobile" | "backend" | "database" | "tools" | "exploration";

export type ArtifactTier = "signature" | "primary" | "support" | "scout";

export type ArtifactStatus = "equipped" | "scout";

export type ArtifactIcon =
  | "route"
  | "boxes"
  | "panel-top"
  | "webhook"
  | "file-code"
  | "package-check"
  | "brain-circuit"
  | "layers"
  | "radar"
  | "wand-sparkles"
  | "scan-eye";

export interface SkillArtifact {
  id: string;
  name: string;
  /** Register code: "001-A", "FE-02", "MB-03", "EX-04". */
  code: string;
  tier: ArtifactTier;
  baseStatus: ArtifactStatus;
  equippedByDefault: boolean;
  /** File stem in `public/images/tech`. */
  logo?: string;
  icon?: ArtifactIcon;
  description: string;
  /** React only. */
  since?: string;
  /** React only. */
  stack?: string;
  /** Artifact ids; React only, others derive. */
  synergy?: string[];
  signature?: boolean;
}

export interface SkillCategory {
  id: SkillClassId;
  index: string;
  title: string;
  tabLabel: string;
  mobileLabel: string;
  rank: string;
  tone: "gold" | "secondary" | "pink" | "success" | "scout";
  description: string;
  artifacts: SkillArtifact[];
}

const equipped: ArtifactStatus = "equipped";

function artifact(
  overrides: Omit<SkillArtifact, "baseStatus" | "equippedByDefault"> & {
    baseStatus?: ArtifactStatus;
    equippedByDefault?: boolean;
  },
): SkillArtifact {
  return {
    baseStatus: equipped,
    equippedByDefault: true,
    ...overrides,
  };
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: "FRONTEND MASTERY",
    tabLabel: "FRONTEND",
    mobileLabel: "FRONTEND",
    rank: "TIER S",
    tone: "gold",
    description:
      "Core weapons. Daily drivers across production interfaces, design systems, and full product builds.",
    artifacts: [
      artifact({
        id: "react",
        name: "React",
        code: "001-A",
        tier: "signature",
        logo: "react",
        description:
          "Component architecture for interfaces that stay fast as they grow — the core of every web and mobile build in the arsenal.",
        since: "2017",
        stack: "SSR / SPA",
        synergy: ["nextjs", "typescript", "react-native-fe", "tailwindcss"],
        signature: true,
      }),
      artifact({
        id: "nextjs",
        name: "Next.js",
        code: "FE-02",
        tier: "primary",
        logo: "nextdotjs",
        description: "Production React framework for routed, server-rendered web products.",
      }),
      artifact({
        id: "typescript",
        name: "TypeScript",
        code: "FE-03",
        tier: "primary",
        logo: "typescript",
        description: "Typed contracts that keep large interfaces and APIs honest.",
      }),
      artifact({
        id: "react-native-fe",
        name: "React Native",
        code: "FE-04",
        tier: "primary",
        logo: "react",
        description: "Shared component model for native iOS and Android delivery.",
      }),
      artifact({
        id: "javascript",
        name: "JavaScript",
        code: "FE-05",
        tier: "support",
        logo: "javascript",
        description: "The runtime foundation under every interface in the arsenal.",
      }),
      artifact({
        id: "html5",
        name: "HTML5",
        code: "FE-06",
        tier: "support",
        logo: "html5",
        description: "Semantic document structure and accessible page foundations.",
      }),
      artifact({
        id: "css3",
        name: "CSS3",
        code: "FE-07",
        tier: "support",
        logo: "css",
        description: "Layout, motion, and responsive styling systems.",
      }),
      artifact({
        id: "tailwindcss",
        name: "Tailwind CSS",
        code: "FE-08",
        tier: "support",
        logo: "tailwindcss",
        description: "Token-driven utility styling that scales with the design system.",
      }),
    ],
  },
  {
    id: "mobile",
    index: "02",
    title: "MOBILE DEVELOPMENT",
    tabLabel: "MOBILE",
    mobileLabel: "MOBILE",
    rank: "TIER A",
    tone: "secondary",
    description:
      "Shipped native experiences — from Expo-managed prototypes to production app-store releases.",
    artifacts: [
      artifact({
        id: "react-native-mb",
        name: "React Native",
        code: "MB-01",
        tier: "primary",
        logo: "react",
        description: "Native applications from a shared TypeScript component base.",
      }),
      artifact({
        id: "expo",
        name: "Expo",
        code: "MB-02",
        tier: "primary",
        logo: "expo",
        description: "Managed build, device preview, and release tooling for mobile.",
      }),
      artifact({
        id: "expo-router",
        name: "Expo Router",
        code: "MB-03",
        tier: "primary",
        icon: "route",
        description: "File-based navigation for production Expo applications.",
      }),
      artifact({
        id: "zustand",
        name: "Zustand",
        code: "MB-04",
        tier: "primary",
        icon: "boxes",
        description: "Small, predictable client state for cross-screen app flows.",
      }),
      artifact({
        id: "tamagui",
        name: "Tamagui",
        code: "MB-05",
        tier: "primary",
        icon: "panel-top",
        description: "Cross-platform UI primitives and theming.",
      }),
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "BACKEND & API",
    tabLabel: "BACKEND",
    mobileLabel: "BACKEND",
    rank: "TIER A",
    tone: "pink",
    description:
      "APIs, services, and server-side logic that keep the front end honest — built, deployed, maintained.",
    artifacts: [
      artifact({
        id: "nodejs",
        name: "Node.js",
        code: "BE-01",
        tier: "primary",
        logo: "nodedotjs",
        description: "Server runtime for APIs, tooling, and background jobs.",
      }),
      artifact({
        id: "nestjs",
        name: "NestJS",
        code: "BE-02",
        tier: "primary",
        logo: "nestjs",
        description: "Structured service architecture with dependency injection.",
      }),
      artifact({
        id: "php",
        name: "PHP",
        code: "BE-03",
        tier: "primary",
        logo: "php",
        description: "Server-side logic behind production web platforms.",
      }),
      artifact({
        id: "laravel",
        name: "Laravel",
        code: "BE-04",
        tier: "primary",
        logo: "laravel",
        description: "Convention-driven application framework for PHP products.",
      }),
      artifact({
        id: "codeigniter",
        name: "CodeIgniter",
        code: "BE-05",
        tier: "primary",
        logo: "codeigniter",
        description: "Lightweight PHP delivery for focused services.",
      }),
      artifact({
        id: "python",
        name: "Python",
        code: "BE-06",
        tier: "primary",
        logo: "python",
        description: "Scripting, automation, and data-adjacent service work.",
      }),
      artifact({
        id: "frappe",
        name: "Frappe Framework",
        code: "BE-07",
        tier: "primary",
        logo: "frappe",
        description: "Rapid business-app scaffolding and REST-backed modules.",
      }),
      artifact({
        id: "rest-api",
        name: "REST API",
        code: "BE-08",
        tier: "primary",
        icon: "webhook",
        description: "Contract-first HTTP interfaces consumed by web and mobile clients.",
      }),
    ],
  },
  {
    id: "database",
    index: "04",
    title: "DATABASE & DATA",
    tabLabel: "DATABASE",
    mobileLabel: "DATA",
    rank: "TIER B",
    tone: "success",
    description:
      "Relational schemas, queries, and data models that hold the product together under real load.",
    artifacts: [
      artifact({
        id: "mysql",
        name: "MySQL",
        code: "DB-01",
        tier: "support",
        logo: "mysql",
        description: "Relational storage for transactional product data.",
      }),
      artifact({
        id: "mariadb",
        name: "MariaDB",
        code: "DB-02",
        tier: "support",
        logo: "mariadb",
        description: "MySQL-compatible storage for production deployments.",
      }),
      artifact({
        id: "postgresql",
        name: "PostgreSQL",
        code: "DB-03",
        tier: "support",
        logo: "postgresql",
        description: "Relational modelling, indexing, and query planning under load.",
      }),
    ],
  },
  {
    id: "tools",
    index: "05",
    title: "TOOLS & ENGINEERING",
    tabLabel: "TOOLS",
    mobileLabel: "TOOLS",
    rank: "TIER A",
    tone: "secondary",
    description:
      "The workshop: versioning, containers, builds, and the tooling that ships the work.",
    artifacts: [
      artifact({
        id: "git",
        name: "Git",
        code: "TL-01",
        tier: "support",
        logo: "git",
        description: "Branching and history for every shipped change.",
      }),
      artifact({
        id: "github",
        name: "GitHub",
        code: "TL-02",
        tier: "support",
        logo: "github",
        description: "Remote collaboration, review, and release workflows.",
      }),
      artifact({
        id: "docker",
        name: "Docker",
        code: "TL-03",
        tier: "support",
        logo: "docker",
        description: "Repeatable container environments for build and deploy.",
      }),
      artifact({
        id: "vscode",
        name: "VS Code",
        code: "TL-04",
        tier: "support",
        icon: "file-code",
        description: "Primary editing surface for the stack.",
      }),
      artifact({
        id: "eas-build",
        name: "EAS Build",
        code: "TL-05",
        tier: "support",
        icon: "package-check",
        description: "Cloud mobile builds and store submission pipelines.",
      }),
      artifact({
        id: "ai-coding-tools",
        name: "AI Coding Tools",
        code: "TL-06",
        tier: "support",
        logo: "githubcopilot",
        description: "Assisted implementation, review, and refactoring.",
      }),
    ],
  },
  {
    id: "exploration",
    index: "06",
    title: "EXPLORATION",
    tabLabel: "EXPLORATION",
    mobileLabel: "SCOUT",
    rank: "SCOUTING",
    tone: "scout",
    description:
      "Signals on the horizon — research areas under active exploration, not claimed expertise.",
    artifacts: [
      artifact({
        id: "llm",
        name: "Large Language Models",
        code: "EX-01",
        tier: "scout",
        baseStatus: "scout",
        equippedByDefault: false,
        icon: "brain-circuit",
        description: "Prompt design, integration patterns, and model tradeoffs.",
      }),
      artifact({
        id: "rag",
        name: "Retrieval-Augmented Generation",
        code: "EX-02",
        tier: "scout",
        baseStatus: "scout",
        equippedByDefault: false,
        icon: "layers",
        description: "Grounded answers over private product knowledge.",
      }),
      artifact({
        id: "vector-search",
        name: "Vector Search",
        code: "EX-03",
        tier: "scout",
        baseStatus: "scout",
        equippedByDefault: false,
        icon: "radar",
        description: "Embedding indexes and similarity retrieval.",
      }),
      artifact({
        id: "ai-assisted-dev",
        name: "AI-assisted Development",
        code: "EX-04",
        tier: "scout",
        baseStatus: "scout",
        equippedByDefault: false,
        icon: "wand-sparkles",
        description: "Agent workflows for implementation and verification.",
      }),
      artifact({
        id: "computer-vision",
        name: "Computer Vision",
        code: "EX-05",
        tier: "scout",
        baseStatus: "scout",
        equippedByDefault: false,
        icon: "scan-eye",
        description: "Image signals and vision-model integration.",
      }),
    ],
  },
];

export const skillArtifacts: SkillArtifact[] = skillCategories.flatMap(
  (category) => category.artifacts,
);

export const skillProfile = {
  classLabel: "Fullstack Engineer",
  specialization: "Frontend Engineering",
  experience: "10+ Years",
  focus: "Modern Web & Mobile",
  focusMeta: "ASTRO · PREACT · REACT NATIVE · AI",
  syncLabel: "PROFILE SYNCED",
  syncValue: "◈ 100%",
};

export interface ResearchThread {
  id: string;
  title: string;
  description: string;
  descriptionShort: string;
  milestone: string;
  tone: "pink" | "primary" | "secondary";
  icon: "brain-circuit" | "layers" | "network";
}

export const researchThreads: ResearchThread[] = [
  {
    id: "ai-engineering",
    title: "AI ENGINEERING",
    description:
      "LLM integration, RAG pipelines, and vector retrieval for genuinely useful product features.",
    descriptionShort: "LLM integration, RAG pipelines, vector retrieval.",
    milestone: "RAG EVALUATION HARNESS",
    tone: "pink",
    icon: "brain-circuit",
  },
  {
    id: "modern-frontend",
    title: "MODERN FRONTEND ARCHITECTURE",
    description:
      "Astro islands, Preact components, and design systems that stay coherent as products scale.",
    descriptionShort: "Astro islands, Preact, scalable design systems.",
    milestone: "ISLAND HYDRATION BUDGET",
    tone: "primary",
    icon: "layers",
  },
  {
    id: "scalable-apps",
    title: "SCALABLE APPLICATION DEVELOPMENT",
    description:
      "Multi-tenant services, queue design, and observability for products under real growth.",
    descriptionShort: "Multi-tenant services, queues, observability.",
    milestone: "LOAD TESTING THE API LAYER",
    tone: "secondary",
    icon: "network",
  },
];

export const scoutingTags = ["LLM", "RAG", "VECTOR SEARCH", "AI-ASSISTED DEV", "COMPUTER VISION"];

export interface ScanEntry {
  id: string;
  name: string;
  state: string;
  time: string;
  mark: "✓" | "◇";
  ok: boolean;
}

export const scanEntries: ScanEntry[] = [
  { id: "react", name: "REACT", state: "DEEP SCAN COMPLETE", time: "T-00:14", mark: "✓", ok: true },
  { id: "nextjs", name: "NEXT.JS", state: "TREE TRACED", time: "T-01:02", mark: "✓", ok: true },
  { id: "expo", name: "EXPO", state: "SCOUTING TARGET", time: "T-02:38", mark: "◇", ok: false },
  { id: "docker", name: "DOCKER", state: "BUILD VERIFIED", time: "T-03:11", mark: "✓", ok: true },
  { id: "rag", name: "RAG", state: "SIGNAL LOCKED", time: "T-04:05", mark: "◇", ok: false },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    state: "TYPE GRAPH MAPPED",
    time: "T-05:20",
    mark: "✓",
    ok: true,
  },
  {
    id: "postgresql",
    name: "POSTGRESQL",
    state: "SCHEMA INDEXED",
    time: "T-06:12",
    mark: "✓",
    ok: true,
  },
];

export interface SkillTreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  core?: boolean;
}

export const skillTree = {
  branch: "FRONTEND / CORE",
  core: "react",
  nodes: [
    { id: "typescript", label: "TypeScript", x: 145, y: 37 },
    { id: "nextjs", label: "Next.js", x: 261, y: 103 },
    { id: "react-native-fe", label: "React Native", x: 261, y: 259 },
    { id: "nodejs", label: "Node.js", x: 145, y: 331 },
    { id: "tailwindcss", label: "Tailwind", x: 29, y: 259 },
    { id: "javascript", label: "JavaScript", x: 29, y: 103 },
    { id: "react", label: "REACT", x: 139, y: 174, core: true },
  ] satisfies SkillTreeNode[],
  links: 6,
};
