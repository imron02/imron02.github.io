export type Mastery = "novice" | "adept" | "expert" | "master";

export interface Skill {
  name: string;
  mastery: Mastery;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "Preact", mastery: "expert" },
      { name: "Next.js", mastery: "expert" },
      { name: "Astro", mastery: "adept" },
      { name: "TypeScript", mastery: "expert" },
      { name: "JavaScript", mastery: "master" },
      { name: "Tailwind CSS", mastery: "expert" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", mastery: "master" },
      { name: "Docker", mastery: "adept" },
      { name: "AI Development Tools", mastery: "expert" },
    ],
  },
];

export const masteryLevels: Record<Mastery, number> = {
  novice: 1,
  adept: 2,
  expert: 3,
  master: 4,
};