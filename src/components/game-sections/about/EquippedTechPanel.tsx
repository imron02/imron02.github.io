import {
  Atom,
  Braces,
  Cat,
  Code,
  Container,
  FileCode,
  Flame,
  GitBranch,
  Hexagon,
  Package,
  RefreshCw,
  Rocket,
  Smartphone,
  Sparkles,
  Swords,
  Triangle,
  Wind,
} from "lucide-preact";
import type { ComponentType } from "preact";
import { techGroups, techInventory } from "../../../data/tech";
import type { TechGroup, TechIcon } from "../../../data/tech";
import { cn } from "../../../lib/cn";
import DesignPanel from "./DesignPanel";

const icons: Record<TechIcon, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  atom: Atom,
  triangle: Triangle,
  "file-code": FileCode,
  braces: Braces,
  rocket: Rocket,
  wind: Wind,
  smartphone: Smartphone,
  package: Package,
  hexagon: Hexagon,
  cat: Cat,
  code: Code,
  flame: Flame,
  "git-branch": GitBranch,
  container: Container,
  "refresh-cw": RefreshCw,
  sparkles: Sparkles,
};

const groupTone: Record<TechGroup, { dot: string; slot: string; icon: string }> = {
  frontend: {
    dot: "bg-primary",
    slot: "border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]",
    icon: "text-primary-hover",
  },
  mobile: {
    dot: "bg-secondary",
    slot: "border-[color-mix(in_srgb,var(--color-secondary)_15%,transparent)]",
    icon: "text-secondary",
  },
  backend: {
    dot: "bg-accent-pink",
    slot: "border-[color-mix(in_srgb,var(--color-accent-pink)_15%,transparent)]",
    icon: "text-accent-pink",
  },
  tools: {
    dot: "bg-accent-gold",
    slot: "border-[color-mix(in_srgb,var(--color-accent-gold)_15%,transparent)]",
    icon: "text-accent-gold",
  },
};

const SLOTS_PER_ROW = 4;
const rows = Array.from(
  { length: Math.ceil(techInventory.length / SLOTS_PER_ROW) },
  (_, rowIndex) =>
    techInventory.slice(rowIndex * SLOTS_PER_ROW, rowIndex * SLOTS_PER_ROW + SLOTS_PER_ROW),
);

export default function EquippedTechPanel({
  class: className,
  interactive,
}: {
  class?: string;
  interactive?: boolean;
}) {
  return (
    <DesignPanel
      title="EQUIPPED TECHNOLOGIES"
      icon={<Swords size={11} strokeWidth={1.5} />}
      meta={
        <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-text-muted">
          {techInventory.length} / {techInventory.length}
        </span>
      }
      class={className}
      interactive={interactive}
      bodyClass="pt-2.5 pr-4 pb-0 pl-4 gap-0"
    >
      <ul class="flex items-center gap-1 list-none m-0 mb-1 p-0 mobile:gap-3.5">
        {techGroups.map((group) => (
          <li key={group.id} class="flex min-w-0 flex-1 items-center gap-1.25">
            <span
              class={cn("w-1 h-1 flex-none rounded-full", groupTone[group.id].dot)}
              aria-hidden="true"
            />
            <span class="truncate font-hud text-[6.5px] leading-none tracking-[0.6px] uppercase text-text-ghost mobile:text-[7px]">
              {group.label}
            </span>
          </li>
        ))}
      </ul>

      <ul class="grid gap-1.5 list-none m-0 p-0 pb-4">
        {rows.map((row, rowIndex) => (
          <li key={`tech-row-${rowIndex}`} class="grid grid-cols-4 gap-1.5">
            {row.map((item) => {
              const Icon = icons[item.icon];
              const tone = groupTone[item.group];
              return (
                <div
                  key={item.label}
                  class={cn(
                    "flex min-w-0 flex-col items-center justify-center gap-1.5 h-14.5 rounded-xs border",
                    item.equipped
                      ? "border-primary-hover bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
                      : cn("bg-hud-card", tone.slot),
                  )}
                >
                  <span
                    class={cn("flex-none", item.equipped ? "text-accent-lilac" : tone.icon)}
                    aria-hidden="true"
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  <span
                    class={cn(
                      "w-full truncate px-0.5 text-center font-hud text-[7px] leading-none tracking-[0.5px] uppercase",
                      item.equipped
                        ? "text-text-primary"
                        : "text-[color-mix(in_srgb,var(--color-text-primary)_72%,var(--color-text-ghost))]",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </DesignPanel>
  );
}
