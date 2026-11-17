import {
  Boxes,
  BrainCircuit,
  FileCode,
  Layers,
  PackageCheck,
  PanelTop,
  Radar,
  Route,
  ScanEye,
  WandSparkles,
  Webhook,
} from "lucide-preact";
import type { ComponentType } from "preact";
import { projects } from "../../../data/projects";
import type {
  ArtifactIcon,
  ArtifactTier,
  SkillArtifact,
  SkillCategory,
} from "../../../data/skills";
import { skillArtifacts, skillCategories } from "../../../data/skills";

export const artifactById: Record<string, SkillArtifact> = Object.fromEntries(
  skillArtifacts.map((artifact) => [artifact.id, artifact]),
);

export function categoryOf(artifactId: string): SkillCategory {
  return (
    skillCategories.find((category) =>
      category.artifacts.some((artifact) => artifact.id === artifactId),
    ) ?? skillCategories[0]
  );
}

/** Quest matches derive from the archive's technology list, never a stored count. */
export function questsUsing(name: string) {
  return projects.filter((project) => project.technologies.some((tech) => tech.includes(name)));
}

const tierTone = {
  signature: {
    text: "text-accent-gold",
    border: "border-[color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-accent-gold)_8%,transparent)]",
    glow: "shadow-[0_0_28px_color-mix(in_srgb,var(--color-accent-gold)_22%,transparent)]",
  },
  primary: {
    text: "text-primary-hover",
    border: "border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
    fill: "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
    glow: "shadow-[0_0_28px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]",
  },
  support: {
    text: "text-secondary",
    border: "border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)]",
    fill: "bg-tint-secondary",
    glow: "shadow-[0_0_24px_color-mix(in_srgb,var(--color-secondary)_18%,transparent)]",
  },
  scout: {
    text: "text-text-dim",
    border: "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)]",
    fill: "bg-tint-ghost",
    glow: "shadow-none",
  },
} as const;

export const tierMeta: Record<
  ArtifactTier,
  { symbol: string; label: string; text: string; border: string; fill: string; glow: string }
> = {
  signature: { symbol: "◆", label: "SIGNATURE", ...tierTone.signature },
  primary: { symbol: "◆", label: "PRIMARY", ...tierTone.primary },
  support: { symbol: "◆", label: "SUPPORT", ...tierTone.support },
  scout: { symbol: "◇", label: "SCOUTING", ...tierTone.scout },
};

export const categoryTone: Record<
  SkillCategory["tone"],
  { text: string; dot: string; rail: string; border: string }
> = {
  gold: {
    text: "text-accent-gold",
    dot: "bg-accent-gold",
    border: "border-[color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)]",
    rail: "text-accent-gold bg-[linear-gradient(270deg,currentColor_0%,color-mix(in_srgb,var(--color-text-primary)_10%,transparent)_35%,transparent_100%)]",
  },
  secondary: {
    text: "text-secondary",
    dot: "bg-secondary",
    border: "border-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]",
    rail: "text-secondary bg-[linear-gradient(270deg,currentColor_0%,color-mix(in_srgb,var(--color-text-primary)_10%,transparent)_35%,transparent_100%)]",
  },
  pink: {
    text: "text-accent-pink",
    dot: "bg-accent-pink",
    border: "border-[color-mix(in_srgb,var(--color-accent-pink)_40%,transparent)]",
    rail: "text-accent-pink bg-[linear-gradient(270deg,currentColor_0%,color-mix(in_srgb,var(--color-text-primary)_10%,transparent)_35%,transparent_100%)]",
  },
  success: {
    text: "text-success",
    dot: "bg-success",
    border: "border-[color-mix(in_srgb,var(--color-success)_40%,transparent)]",
    rail: "text-success bg-[linear-gradient(270deg,currentColor_0%,color-mix(in_srgb,var(--color-text-primary)_10%,transparent)_35%,transparent_100%)]",
  },
  scout: {
    text: "text-text-dim",
    dot: "bg-text-dim",
    border: "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)]",
    rail: "text-text-dim bg-[linear-gradient(270deg,currentColor_0%,color-mix(in_srgb,var(--color-text-primary)_10%,transparent)_35%,transparent_100%)]",
  },
};

export function logoUrl(stem: string): string {
  return `${import.meta.env.BASE_URL}images/tech/${stem}.png`;
}

export const artifactGlyphs: Record<
  ArtifactIcon,
  ComponentType<{ size?: number; strokeWidth?: number; class?: string }>
> = {
  route: Route,
  boxes: Boxes,
  "panel-top": PanelTop,
  webhook: Webhook,
  "file-code": FileCode,
  "package-check": PackageCheck,
  "brain-circuit": BrainCircuit,
  layers: Layers,
  radar: Radar,
  "wand-sparkles": WandSparkles,
  "scan-eye": ScanEye,
};

export function statusLabel(artifact: SkillArtifact, equipped: boolean): string {
  if (equipped) return "EQ";
  return artifact.baseStatus === "scout" ? "SCAN" : "STBY";
}

export function statusClass(artifact: SkillArtifact, equipped: boolean): string {
  if (equipped) return "text-primary-hover";
  return artifact.baseStatus === "scout" ? "text-text-dim" : "text-text-ghost";
}

export function yearsSince(year: string): number {
  return new Date().getFullYear() - Number(year);
}

export const pad = (value: number) => String(value).padStart(2, "0");
