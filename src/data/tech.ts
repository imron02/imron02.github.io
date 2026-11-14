export type TechGroup = "frontend" | "mobile" | "backend" | "tools";

export type TechIcon =
  | "atom"
  | "triangle"
  | "file-code"
  | "braces"
  | "rocket"
  | "wind"
  | "smartphone"
  | "package"
  | "hexagon"
  | "cat"
  | "code"
  | "flame"
  | "git-branch"
  | "container"
  | "refresh-cw"
  | "sparkles";

export interface TechItem {
  label: string;
  icon: TechIcon;
  group: TechGroup;
  equipped?: boolean;
}

export const techGroups: { id: TechGroup; label: string }[] = [
  { id: "frontend", label: "FRONTEND" },
  { id: "mobile", label: "MOBILE" },
  { id: "backend", label: "BACKEND" },
  { id: "tools", label: "TOOLS" },
];

const equippedTech: TechItem = {
  label: "REACT",
  icon: "atom",
  group: "frontend",
  equipped: true,
};

/** 4 rows x 4 slots, in design reading order. */
export const techInventory: TechItem[] = [
  equippedTech,
  { label: "NEXT.JS", icon: "triangle", group: "frontend" },
  { label: "TYPESCRIPT", icon: "file-code", group: "frontend" },
  { label: "JAVASCRIPT", icon: "braces", group: "frontend" },
  { label: "ASTRO", icon: "rocket", group: "frontend" },
  { label: "TAILWIND", icon: "wind", group: "frontend" },
  { label: "REACT NATIVE", icon: "smartphone", group: "mobile" },
  { label: "EXPO", icon: "package", group: "mobile" },
  { label: "NODE.JS", icon: "hexagon", group: "backend" },
  { label: "NESTJS", icon: "cat", group: "backend" },
  { label: "PHP", icon: "code", group: "backend" },
  { label: "LARAVEL", icon: "flame", group: "backend" },
  { label: "GIT", icon: "git-branch", group: "tools" },
  { label: "DOCKER", icon: "container", group: "tools" },
  { label: "CI/CD", icon: "refresh-cw", group: "tools" },
  { label: "AI TOOLS", icon: "sparkles", group: "tools" },
];

export { equippedTech };
