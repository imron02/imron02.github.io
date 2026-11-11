export type ProjectCategory = "Web Application" | "Mobile" | "Creative";

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
];