export type ProjectCategory = "Web Application" | "Mobile" | "Creative";

export type ProjectTier = "recommended" | "future";

// Single source for tier presentation: tone, short board chip, full overlay label.
export const tierMeta: Record<ProjectTier, { tone: "gold" | "info"; chip: string; label: string }> =
  {
    recommended: { tone: "gold", chip: "Rec", label: "Strong recommendation" },
    future: { tone: "info", chip: "Future", label: "Future-focused" },
  };

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  tier?: ProjectTier;
}

export const projects: Project[] = [
  {
    id: "q001",
    title: "E-commerce Platform",
    category: "Web Application",
    description:
      "Virtual retail and commerce platform for independent store owners — sell products and digital services from one storefront.",
    thumbnail: "images/quest-01.webp",
    technologies: ["Astro", "Preact", "TypeScript"],
    demoUrl: "https://example.com/quests/q001",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q002",
    title: "Mobile Application",
    category: "Mobile",
    description:
      "Cross-platform mobile application with offline-first sync, push notifications, and native checkout.",
    thumbnail: "images/quest-02.webp",
    technologies: ["React Native", "TypeScript", "Expo"],
    demoUrl: "https://example.com/quests/q002",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q003",
    title: "Portal System",
    category: "Web Application",
    description:
      "AI-assisted portal that brings personal, team, and business finances into a single workspace.",
    thumbnail: "images/quest-03.webp",
    technologies: ["Node.js", "TypeScript", "Astro"],
    demoUrl: "https://example.com/quests/q003",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q004",
    title: "Interactive Web Experience",
    category: "Creative",
    description:
      "Personal exploration of LLMs, retrieval, agents, and AI-assisted engineering workflows.",
    thumbnail: "images/quest-04.webp",
    technologies: ["Preact", "GSAP", "Canvas"],
    demoUrl: "https://example.com/quests/q004",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q005",
    title: "SaaS & Analytics Platform",
    category: "Web Application",
    description:
      "Products with complex dashboards, reporting, analytics, user management, and subscription-based features.",
    thumbnail: "images/quest-05.webp",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Charts",
      "Data Management",
      "Application Architecture",
    ],
    demoUrl: "https://example.com/quests/q005",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
    tier: "recommended",
  },
  {
    id: "q006",
    title: "Workflow Automation Platform",
    category: "Web Application",
    description:
      "Visual workflow builders, task automation, triggers, integrations, and background jobs.",
    thumbnail: "images/quest-06.webp",
    technologies: ["React", "TypeScript", "State Management", "API Integration", "System Design"],
    demoUrl: "https://example.com/quests/q006",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
    tier: "recommended",
  },
  {
    id: "q007",
    title: "Developer Tools & API Platform",
    category: "Web Application",
    description:
      "API management, webhook monitoring, API documentation, authentication, request testing, and developer portals.",
    thumbnail: "images/quest-07.webp",
    technologies: ["REST APIs", "Backend Integration", "Authentication", "Technical Architecture"],
    demoUrl: "https://example.com/quests/q007",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q008",
    title: "Collaboration & Productivity Platform",
    category: "Web Application",
    description:
      "Real-time collaboration, project management, shared workspaces, notifications, and team activities.",
    thumbnail: "images/quest-08.webp",
    technologies: ["WebSockets", "Real-time State Sync", "Complex UI", "Access Control"],
    demoUrl: "https://example.com/quests/q008",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q009",
    title: "Enterprise Management System",
    category: "Web Application",
    description:
      "Inventory, order management, warehouse management, procurement, and business operations.",
    thumbnail: "images/quest-09.webp",
    technologies: [
      "Business Logic",
      "Data Modeling",
      "Complex Forms",
      "Enterprise Application Development",
    ],
    demoUrl: "https://example.com/quests/q009",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q010",
    title: "AI Knowledge & Search Platform",
    category: "Creative",
    description:
      "Semantic search, document intelligence, RAG, AI assistants, and intelligent recommendations.",
    thumbnail: "images/quest-10.webp",
    technologies: [
      "LLM Integration",
      "Embeddings",
      "Vector Databases",
      "Python",
      "AI Architecture",
    ],
    demoUrl: "https://example.com/quests/q010",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
    tier: "future",
  },
  {
    id: "q011",
    title: "Design System & Component Platform",
    category: "Web Application",
    description:
      "Reusable component libraries, design tokens, documentation, theming, and component playgrounds.",
    thumbnail: "images/quest-11.webp",
    technologies: [
      "Frontend Architecture",
      "Accessibility",
      "Component Engineering",
      "Design Systems",
    ],
    demoUrl: "https://example.com/quests/q011",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
  {
    id: "q012",
    title: "Payment & Transaction Platform",
    category: "Web Application",
    description:
      "Payment gateway integration, transaction monitoring, reconciliation, refunds, and financial reporting.",
    thumbnail: "images/quest-12.webp",
    technologies: [
      "Payment Integration",
      "API Reliability",
      "Transaction Lifecycle",
      "Error Handling",
    ],
    demoUrl: "https://example.com/quests/q012",
    repositoryUrl: "https://github.com/imron02",
    featured: true,
  },
];
