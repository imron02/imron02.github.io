import {
  Atom,
  Award,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  Building,
  Calendar,
  Camera,
  ClipboardCheck,
  Clock,
  Coins,
  FileCode,
  Gamepad2,
  Gift,
  Globe,
  Heart,
  Home,
  Layers,
  MapPin,
  Megaphone,
  Mic,
  Music,
  Orbit,
  Repeat,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  Terminal,
  Ticket,
  UserCheck,
  Users,
  Utensils,
  Video,
  Wind,
} from "lucide-preact";
import type { ComponentType } from "preact";
import { cn } from "../../../lib/cn";
import type {
  Project,
  ProjectDifficulty,
  ProjectStatus,
  ProjectTechIcon,
} from "../../../data/projects";

interface StatusMeta {
  label: string;
  rank: string;
  achievements: number;
  achievement: string;
  chipClass: string;
  textClass: string;
}

/** Single source for quest status presentation in cards, details and the status bar. */
export const statusMeta: Record<ProjectStatus, StatusMeta> = {
  completed: {
    label: "COMPLETED",
    rank: "RANK A",
    achievements: 3,
    achievement: "MISSION COMPLETE",
    chipClass: "border-success/40 bg-tint-success text-success",
    textClass: "text-success",
  },
  ongoing: {
    label: "ONGOING",
    rank: "RANK C",
    achievements: 1,
    achievement: "FIELD RESEARCH",
    chipClass: "border-accent-gold/40 bg-tint-gold text-accent-gold",
    textClass: "text-accent-gold",
  },
};

export const difficultyMeta: Record<ProjectDifficulty, { label: string; bars: number }> = {
  normal: { label: "NORMAL", bars: 1 },
  advanced: { label: "ADVANCED", bars: 2 },
  expert: { label: "EXPERT", bars: 3 },
};

/** Chip shell shared by quest badges in cards and the detail dossier. */
export const chipBase =
  "flex items-center rounded-[1px] border px-1.75 py-1 font-hud leading-none uppercase";

/** Status badge: tone chip plus dot and label, from `statusMeta`. */
export function StatusChip({
  status,
  class: className,
}: {
  status: ProjectStatus;
  class?: string;
}) {
  const meta = statusMeta[status];
  return (
    <span class={cn(chipBase, "gap-1.25", meta.chipClass, className)}>
      <span class="size-1 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

/** Three-bar difficulty meter; `class` sets the bar width per surface. */
export function DifficultyBars({ level, class: className }: { level: number; class?: string }) {
  return (
    <span class="flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          class={cn("h-0.75", className, bar < level ? "bg-secondary" : "bg-tint-glass")}
        />
      ))}
    </span>
  );
}

export type TechGlyph = ComponentType<{ size?: number; strokeWidth?: number; class?: string }>;

export const techGlyphs: Record<ProjectTechIcon, TechGlyph> = {
  smartphone: Smartphone,
  rocket: Rocket,
  "file-code": FileCode,
  server: Server,
  terminal: Terminal,
  orbit: Orbit,
  atom: Atom,
  wind: Wind,
  layers: Layers,
  boxes: Boxes,
  sparkles: Sparkles,
  bot: Bot,
  brain: Brain,
  home: Home,
  "map-pin": MapPin,
  camera: Camera,
  globe: Globe,
  gift: Gift,
  star: Star,
  users: Users,
  utensils: Utensils,
  "shopping-cart": ShoppingCart,
  target: Target,
  coins: Coins,
  ticket: Ticket,
  music: Music,
  mic: Mic,
  video: Video,
  store: Store,
  megaphone: Megaphone,
  "gamepad-2": Gamepad2,
  "clipboard-check": ClipboardCheck,
  "user-check": UserCheck,
  building: Building,
  briefcase: Briefcase,
  search: Search,
  award: Award,
  heart: Heart,
  repeat: Repeat,
  "shield-check": ShieldCheck,
  calendar: Calendar,
  clock: Clock,
};

/** Three-digit quest number shown in UI labels (`q007` → `007`). */
export function questCode(project: Project): string {
  return project.id.slice(1).padStart(3, "0");
}

/** Platform line for the detail dossier; `mobile` filters imply both stores. */
export function detailPlatform(project: Project): string {
  if (project.platform) return project.platform;
  if (project.filters.includes("mobile")) return "Android · iOS";
  return "Web";
}
