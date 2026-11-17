import {
  Atom,
  Boxes,
  Code,
  Database,
  FileCode,
  Flame,
  Globe,
  Rocket,
  Server,
  Smartphone,
  Terminal,
  Triangle,
  Webhook,
  Wind,
} from "lucide-preact";
import { experience } from "../../../data/experience";
import type { ExperienceItem } from "../../../data/experience";
import { cn } from "../../../lib/cn";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";
import type { Project } from "../../../data/projects";
import type { TechGlyph } from "../projects/questMeta";

export const pad = (value: number) => String(value).padStart(2, "0");

/** Literal tone recipes cycled by quest index; never built dynamically. */
const questTones = [
  {
    text: "text-primary-hover",
    dot: "bg-primary-hover",
    border: "border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-primary-dark))]",
  },
  {
    text: "text-secondary",
    dot: "bg-secondary",
    border: "border-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-secondary),var(--color-secondary-soft))]",
  },
  {
    text: "text-accent-pink",
    dot: "bg-accent-pink",
    border: "border-[color-mix(in_srgb,var(--color-accent-pink)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-accent-pink)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-accent-pink),var(--color-primary))]",
  },
  {
    text: "text-accent-gold",
    dot: "bg-accent-gold",
    border: "border-[color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-accent-gold)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-accent-gold),var(--color-accent-pink))]",
  },
  {
    text: "text-accent-lilac",
    dot: "bg-accent-lilac",
    border: "border-[color-mix(in_srgb,var(--color-accent-lilac)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-accent-lilac)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-accent-lilac),var(--color-primary))]",
  },
  {
    text: "text-text-dim",
    dot: "bg-text-dim",
    border: "border-[color-mix(in_srgb,var(--color-text-dim)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-text-dim)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-text-dim),var(--color-text-disabled))]",
  },
  {
    text: "text-success",
    dot: "bg-success",
    border: "border-[color-mix(in_srgb,var(--color-success)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]",
    spine: "bg-[linear-gradient(180deg,var(--color-success),var(--color-secondary))]",
  },
];

export function questTone(index: number) {
  return questTones[index % questTones.length];
}

/** Two-letter monogram: first letters of the first two words, or the first two letters of one. */
export function monogram(company: string): string {
  const words = company
    .replace(/[^A-Za-z]+/g, " ")
    .trim()
    .split(/\s+/);
  if (words.length === 0 || words[0] === "") return "??";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export interface QuestStatusMeta {
  label: string;
  text: string;
  dot: string;
}

export function questStatus(item: ExperienceItem): QuestStatusMeta {
  if (item.active) return { label: "ACTIVE QUEST", text: "text-success", dot: "bg-success" };
  if (item.parallel)
    return { label: "PARALLEL CONTRACT", text: "text-secondary-soft", dot: "bg-secondary-soft" };
  return { label: "COMPLETED", text: "text-text-muted", dot: "bg-text-muted" };
}

/** Dot + label used by cards and the dossier status chip. */
export function StatusIndicator({ status }: { status: QuestStatusMeta }) {
  return (
    <span class="flex items-center gap-1.5">
      <span class={cn("size-1 rounded-full", status.dot)} aria-hidden="true" />
      <span class={cn("font-hud text-[7.5px] leading-none tracking-[1.2px]", status.text)}>
        {status.label}
      </span>
    </span>
  );
}

export const period = (item: ExperienceItem) => `${item.start} — ${item.end}`;

const projectById: Record<string, Project> = Object.fromEntries(
  projects.map((project) => [project.id, project]),
);

export function projectFor(item: ExperienceItem): Project | undefined {
  return item.projectId ? projectById[item.projectId] : undefined;
}

/** Brand marks in `public/images/tech/`, keyed by the exact `technologies` label. */
const TECH_LOGOS: Record<string, string> = {
  React: "react",
  Expo: "expo",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Frappe: "frappe",
  Python: "python",
  "Next.js": "nextdotjs",
  "Tailwind CSS": "tailwindcss",
  Laravel: "laravel",
  CodeIgniter: "codeigniter",
  PHP: "php",
  MySQL: "mysql",
  NestJS: "nestjs",
};

/** Glyph shown when a tech has no brand mark. */
const TECH_ICONS: Record<string, TechGlyph> = {
  React: Atom,
  "React Native": Smartphone,
  "Android Development": Smartphone,
  Ionic: Smartphone,
  Angular: Triangle,
  AngularJS: Triangle,
  Firebase: Flame,
  Zustand: Boxes,
  Axios: Webhook,
  Expo: Rocket,
  TypeScript: FileCode,
  JavaScript: FileCode,
  Frappe: Server,
  Python: Terminal,
  "Next.js": Globe,
  "Tailwind CSS": Wind,
  Laravel: Server,
  CodeIgniter: Server,
  PHP: Terminal,
  MySQL: Database,
  NestJS: Boxes,
};

function techVisual(name: string): { logo?: string; Icon: TechGlyph } {
  return { logo: TECH_LOGOS[name], Icon: TECH_ICONS[name] ?? Code };
}

function techLogoUrl(stem: string): string {
  return `${import.meta.env.BASE_URL}images/tech/${stem}.png`;
}

export function TechMark({
  name,
  iconSize,
  class: className,
}: {
  name: string;
  iconSize: number;
  class?: string;
}) {
  const { logo, Icon } = techVisual(name);
  if (logo) {
    return (
      <img
        src={techLogoUrl(logo)}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        class={cn("flex-none object-contain", className)}
      />
    );
  }
  return <Icon size={iconSize} strokeWidth={1.5} class={cn("flex-none", className)} />;
}

export const totalQuests = experience.length;
export const parallelQuests = experience.filter((item) => item.parallel);
export const companyCount = new Set(
  experience.filter((item) => !item.parallel).map((item) => item.company),
).size;
/** Oldest-first non-parallel roles — the career progression rail. */
export const progression = [...experience].filter((item) => !item.parallel).reverse();
/** `profile.yearsOfExperience` carries the value + unit ("10+ years"); the rail shows the value alone. */
export const years = profile.yearsOfExperience.replace(" years", "");
