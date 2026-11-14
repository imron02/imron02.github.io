import {
  Code,
  Layers,
  LayoutDashboard,
  Puzzle,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
} from "lucide-preact";
import { attributes, attributeScale } from "../../../data/attributes";
import type { AttributeIcon, AttributeTier, AttributeTone } from "../../../data/attributes";
import { cn } from "../../../lib/cn";
import DesignPanel from "./DesignPanel";

const icons = {
  code: Code,
  smartphone: Smartphone,
  layout: LayoutDashboard,
  puzzle: Puzzle,
  layers: Layers,
  sparkles: Sparkles,
} satisfies Record<AttributeIcon, unknown>;

const toneText: Record<AttributeTone, string> = {
  primary: "text-primary-hover",
  pink: "text-accent-pink",
  secondary: "text-secondary",
  gold: "text-accent-gold",
};

const tierChip: Record<AttributeTier, string> = {
  SPECIALIZATION:
    "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-primary-hover",
  STRONG:
    "border-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-secondary)_8%,transparent)] text-secondary",
  EXPERIENCED:
    "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-text-primary)_3%,transparent)] text-accent-pink",
  EXPLORING:
    "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-text-primary)_3%,transparent)] text-accent-gold",
};

export default function AttributesPanel({
  class: className,
  interactive,
}: {
  class?: string;
  interactive?: boolean;
}) {
  return (
    <DesignPanel
      title="CHARACTER ATTRIBUTES"
      icon={<SlidersHorizontal size={11} strokeWidth={1.5} />}
      meta={
        <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-text-muted">
          {String(attributes.length).padStart(2, "0")}
        </span>
      }
      class={className}
      interactive={interactive}
      bodyClass="pt-3.5 pr-4 pb-0 pl-4 gap-0"
    >
      <ul class="grid gap-3 list-none m-0 p-0 mobile:gap-2.75">
        {attributes.map((attribute) => {
          const Icon = icons[attribute.icon];
          return (
            <li key={attribute.name} class="grid gap-1.5">
              <div class="flex min-w-0 items-center gap-2">
                <span class={cn("flex-none", toneText[attribute.tone])} aria-hidden="true">
                  <Icon size={11} strokeWidth={1.5} />
                </span>
                <span class="truncate font-hud text-[8.5px] leading-none tracking-[0.4px] text-[color-mix(in_srgb,var(--color-text-primary)_88%,var(--color-accent-lilac))]">
                  {attribute.name}
                </span>
                <span class="flex-1" aria-hidden="true" />
                <span
                  class={cn(
                    "flex-none px-1.25 py-0.5 rounded-[1px] border font-hud text-[6.5px] leading-none font-normal tracking-[0.8px] uppercase",
                    tierChip[attribute.tier],
                  )}
                >
                  {attribute.tier}
                </span>
              </div>
              <div
                class="flex items-center gap-1 h-1 w-full mobile:gap-0.75 mobile:h-0.75"
                role="img"
                aria-label={`${attribute.name}: ${attribute.tier}, ${attribute.level} of ${attributeScale}`}
              >
                {Array.from({ length: attributeScale }, (_, index) => (
                  <span
                    key={`${attribute.name}-${index}`}
                    class={cn(
                      "flex-1 h-full rounded-[1px]",
                      index >= attribute.level
                        ? "bg-[color-mix(in_srgb,var(--color-text-primary)_7%,transparent)]"
                        : index === attribute.level - 1
                          ? "bg-primary-hover"
                          : "bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]",
                    )}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <div class="flex items-center justify-between gap-3 mt-3.5 py-2.25 border-t border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] font-hud text-[6.5px] leading-none tracking-[0.8px] uppercase text-text-disabled">
        <span>QUALITATIVE ASSESSMENT</span>
        <span>NO NUMERIC SCORES</span>
      </div>
    </DesignPanel>
  );
}
