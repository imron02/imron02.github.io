import { ShieldCheck } from "lucide-preact";
import { skillArtifacts, skillCategories } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import { categoryTone, tierMeta } from "./skillMeta";
import SkillsPanel from "./SkillsPanel";

const tierKey = [
  { label: "SIG", tone: tierMeta.signature.fill, text: "text-accent-gold" },
  { label: "PRIMARY", tone: tierMeta.primary.fill, text: "text-primary-hover" },
  { label: "SUPPORT", tone: tierMeta.support.fill, text: "text-secondary" },
  { label: "SCOUT", tone: tierMeta.scout.fill, text: "text-text-dim" },
];

export default function ArsenalStatus() {
  const total = skillArtifacts.length;

  return (
    <SkillsPanel
      title="// ARSENAL STATUS"
      icon={<ShieldCheck size={12} strokeWidth={1.5} />}
      tone="primary"
      meta={
        <span class="font-hud text-[10px] tracking-[1px] text-primary-hover">
          {`${total} / ${total}`}
        </span>
      }
    >
      <div class="flex flex-col gap-1.5 p-4">
        {skillCategories.map((category) => {
          const tone = categoryTone[category.tone];
          const count = category.artifacts.length;

          return (
            <div key={category.id} class="flex items-center gap-2">
              <span class="w-4 font-hud text-[9.5px] tracking-[0.8px] text-text-ghost">
                {category.index}
              </span>
              <span class={cn("size-1.25 flex-none rounded-full", tone.dot)} aria-hidden="true" />
              <span class="min-w-0 flex-1 truncate font-hud text-[9.5px] tracking-[0.9px] text-text-secondary">
                {category.title}
              </span>
              <span class="flex flex-none items-center gap-0.75" aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                  <span
                    key={index}
                    class={cn(
                      "h-1 w-1.25",
                      index < count
                        ? tone.dot
                        : "bg-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)]",
                    )}
                  />
                ))}
              </span>
              <span class="w-5 text-right font-hud text-[9.5px] tracking-[0.8px] text-text-dim">
                {String(count).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>

      <div class="mx-4 h-px bg-border-subtle" aria-hidden="true" />

      <div class="flex items-center justify-between gap-2 p-4 pt-3">
        {tierKey.map((tier) => (
          <span key={tier.label} class="flex items-center gap-1">
            <span class={cn("size-1.25", tier.tone)} aria-hidden="true" />
            <span class={cn("font-hud text-[9px] tracking-[0.8px]", tier.text)}>{tier.label}</span>
          </span>
        ))}
      </div>
    </SkillsPanel>
  );
}
