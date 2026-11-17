import type { SkillArtifact } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import ArtifactBadge from "./ArtifactBadge";
import { pad, questsUsing, statusClass, statusLabel, tierMeta } from "./skillMeta";

export interface ArtifactCardProps {
  artifact: SkillArtifact;
  index: number;
  selected: boolean;
  equipped: boolean;
  onSelect: (id: string) => void;
}

const cardBase =
  "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xs border text-left transition-[border-color,box-shadow,background-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2";
const cardSurface =
  "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-primary)_10%,var(--color-hud-card-solid))_0%,var(--color-hud-panel-strong)_100%)]";
const idleBorder = "border-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]";
const selectedBorder =
  "border-primary shadow-[0_0_28px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]";
const indexClass =
  "font-hud text-[9px] leading-none tracking-[1px] text-[color-mix(in_srgb,var(--color-text-dim)_70%,var(--color-void))]";

export default function ArtifactCard({
  artifact,
  index,
  selected,
  equipped,
  onSelect,
}: ArtifactCardProps) {
  const tier = tierMeta[artifact.tier];
  const status = statusLabel(artifact, equipped);

  if (artifact.signature) {
    const quests = questsUsing(artifact.name).length;

    return (
      <button
        type="button"
        id={`artifact-card-${artifact.id}`}
        aria-pressed={selected}
        aria-label={`${artifact.name} — ${tier.label} artifact`}
        onClick={() => onSelect(artifact.id)}
        class={cn(
          cardBase,
          "col-span-2 min-h-42 border-[color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)] bg-[linear-gradient(270deg,color-mix(in_srgb,var(--color-accent-gold)_8%,transparent)_0%,var(--color-hud-panel-strong)_55%,var(--color-hud-panel)_100%)] p-3 @min-[900px]:col-span-3 mobile:min-h-35 mobile:px-3 mobile:py-2.5",
          selected && selectedBorder,
        )}
      >
        <span
          class="absolute top-0 left-0 size-3 border-t border-l border-accent-gold/50"
          aria-hidden="true"
        />
        <span
          class="absolute top-0 right-0 size-3 border-t border-r border-accent-gold/50"
          aria-hidden="true"
        />
        <span
          class="absolute bottom-0 left-0 size-3 border-b border-l border-accent-gold/50"
          aria-hidden="true"
        />
        <span
          class="absolute right-0 bottom-0 size-3 border-r border-b border-accent-gold/50"
          aria-hidden="true"
        />

        <span class="flex flex-none items-center justify-between gap-2">
          <span class={indexClass}>{pad(index)}</span>
          <span
            class={cn(
              "rounded-[1px] border px-1.5 py-0.5 font-hud text-[9px] leading-none tracking-[1px]",
              equipped
                ? "border-[color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)] bg-tint-gold text-accent-gold"
                : "border-border-subtle bg-tint-ghost text-text-dim",
            )}
          >
            {equipped ? "EQUIPPED" : status}
          </span>
        </span>

        <span class="flex min-w-0 flex-1 items-center gap-3.5 mobile:gap-2.5">
          <ArtifactBadge artifact={artifact} tone="signature" class="size-19.5 mobile:size-14" />
          <span class="flex min-w-0 flex-1 flex-col gap-1.5">
            <span class="font-hud text-[9.5px] tracking-[1.2px] text-accent-gold">
              {`// SIGNATURE ARTIFACT · ${artifact.code}`}
            </span>
            <span class="font-display text-[30px] leading-none font-bold text-text-primary mobile:text-[22px]">
              {artifact.name}
            </span>
            <span class="max-w-90 font-body text-[12px] leading-normal text-text-secondary mobile:hidden">
              {artifact.description}
            </span>
          </span>
        </span>

        <span class="flex flex-none items-end gap-5 mobile:hidden">
          {[
            { label: "QUESTS", value: pad(quests) },
            { label: "SINCE", value: artifact.since ?? "—" },
            { label: "STACK", value: artifact.stack ?? "—" },
          ].map((item) => (
            <span key={item.label} class="flex flex-col gap-0.75">
              <span class="font-hud text-[9.5px] tracking-[1.2px] text-text-dim">{item.label}</span>
              <span class="font-hud text-[10.5px] tracking-[1px] text-text-secondary">
                {item.value}
              </span>
            </span>
          ))}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      id={`artifact-card-${artifact.id}`}
      aria-pressed={selected}
      aria-label={`${artifact.name} — ${tier.label} artifact`}
      onClick={() => onSelect(artifact.id)}
      class={cn(
        cardBase,
        cardSurface,
        "min-h-42 justify-between p-2.5 px-3 mobile:min-h-33 mobile:px-2.5 mobile:py-2",
        selected ? selectedBorder : idleBorder,
      )}
    >
      <span class="flex flex-none items-center justify-between gap-1">
        <span class={indexClass}>{pad(index)}</span>
        <span class={cn("font-hud text-[9.5px] leading-none", tier.text)}>{tier.symbol}</span>
      </span>

      <span class="flex min-w-0 flex-col items-center gap-1.5">
        <ArtifactBadge artifact={artifact} size="sm" />
        <span class="line-clamp-2 text-center font-display text-[12.5px] leading-[1.15] font-semibold text-text-primary mobile:text-[12px]">
          {artifact.name}
        </span>
      </span>

      <span class="flex flex-none items-center justify-between gap-1">
        <span class="font-hud text-[9px] leading-none tracking-[1px] text-text-disabled">
          {`// ${artifact.code}`}
        </span>
        <span
          class={cn(
            "font-hud text-[9px] leading-none tracking-[1px]",
            statusClass(artifact, equipped),
          )}
        >
          {status}
        </span>
      </span>
    </button>
  );
}
