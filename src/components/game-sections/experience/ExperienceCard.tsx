import { ArrowUpRight } from "lucide-preact";
import type { ExperienceItem } from "../../../data/experience";
import { cn } from "../../../lib/cn";
import {
  monogram,
  pad,
  period,
  projectFor,
  questStatus,
  questTone,
  StatusIndicator,
  TechMark,
} from "./experienceMeta";

export interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

const cardBase =
  "relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xs border bg-hud-card text-left transition-[border-color,box-shadow] duration-200";
const cardSelected =
  "border-primary shadow-[0_0_32px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]";
const cardIdle =
  "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] hover:shadow-[0_0_22px_color-mix(in_srgb,var(--color-primary)_22%,transparent)]";

function TechChip({ name, showLabel }: { name: string; showLabel: boolean }) {
  return (
    <li>
      <span
        class={cn(
          "flex h-5.5 items-center gap-1 rounded-[1px] bg-tint-ghost font-hud text-[10px] leading-none tracking-[0.6px] text-text-dim mobile:h-5",
          showLabel ? "max-w-36 pl-1.5 pr-2" : "size-5 justify-center",
        )}
      >
        <TechMark name={name} iconSize={11} class="size-2.75" />
        {showLabel ? <span class="truncate">{name}</span> : null}
      </span>
    </li>
  );
}

function TechChipList({
  technologies,
  limit,
  showLabel,
  class: className,
}: {
  technologies: string[];
  limit: number;
  showLabel: boolean;
  class: string;
}) {
  const names = technologies.slice(0, limit);
  const rest = technologies.length - names.length;
  return (
    <ul class={cn("m-0 list-none flex-wrap items-center gap-1.5 p-0", className)}>
      {names.map((name) => (
        <TechChip key={name} name={name} showLabel={showLabel} />
      ))}
      {rest > 0 ? (
        <li class="font-hud text-[9px] leading-none tracking-[0.6px] text-text-disabled">
          {`+${rest}`}
        </li>
      ) : null}
    </ul>
  );
}

/** Named chips on desktop (first 4 + remainder), icon-only chips on mobile (first 3 + remainder). */
function TechRow({ technologies }: { technologies: string[] }) {
  return (
    <>
      <TechChipList technologies={technologies} limit={4} showLabel class="flex mobile:hidden" />
      <TechChipList
        technologies={technologies}
        limit={3}
        showLabel={false}
        class="hidden mobile:flex"
      />
    </>
  );
}

export default function ExperienceCard({ item, index, selected, onSelect }: ExperienceCardProps) {
  const tone = questTone(index);
  const status = questStatus(item);
  const project = projectFor(item);

  return (
    <button
      type="button"
      aria-current={selected ? "true" : undefined}
      onClick={onSelect}
      class={cn(cardBase, selected ? cardSelected : cardIdle)}
    >
      <span
        class={cn(
          "absolute inset-y-0 left-0 w-0.5",
          tone.spine,
          selected && "shadow-[0_0_18px_var(--color-glow-primary)]",
        )}
        aria-hidden="true"
      />
      <span class="flex h-19.5 items-center justify-between gap-3 pl-4 pr-3.5 mobile:h-14 mobile:pl-3.5">
        <span class="flex min-w-0 items-center gap-3">
          <span
            class={cn(
              "flex size-11.5 flex-none items-center justify-center rounded-xs border font-display text-[15px] font-bold text-text-primary mobile:size-8.5 mobile:text-[12px]",
              tone.fill,
              tone.border,
            )}
            aria-hidden="true"
          >
            {monogram(item.company)}
          </span>
          <span class="flex min-w-0 flex-col gap-1.25">
            <span class="truncate font-display text-[16.5px] leading-none font-semibold tracking-[0.1px] text-text-primary mobile:text-[14px]">
              {item.company}
            </span>
            <span class="flex min-w-0 items-center gap-2">
              <span
                class={cn("truncate font-hud text-[9px] leading-none tracking-[0.9px]", tone.text)}
              >
                {item.role}
              </span>
              <span
                class="h-2 w-px flex-none bg-[color-mix(in_srgb,var(--color-text-primary)_24%,transparent)]"
                aria-hidden="true"
              />
              <span class="flex-none font-hud text-[9px] leading-none tracking-[0.9px] text-text-disabled">
                {`QUEST ${pad(index + 1)}`}
              </span>
            </span>
          </span>
        </span>
        <span class="flex flex-none flex-col items-end gap-1.5">
          <span
            class={cn(
              "font-hud text-[11px] leading-none tracking-[1px]",
              selected ? "text-primary" : "text-secondary",
            )}
          >
            {period(item)}
          </span>
          <StatusIndicator status={status} />
        </span>
      </span>
      <span class="flex flex-col gap-2.5 px-4 pb-3.5 mobile:px-3.5 mobile:pb-3">
        <span class="line-clamp-2 font-body text-[11.5px] leading-[1.55] text-text-muted">
          {item.summary}
        </span>
        <TechRow technologies={item.technologies} />
        <span class="flex min-w-0 items-center justify-between gap-3 border-t border-t-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] pt-2.5">
          {project ? (
            <span class="min-w-0 truncate font-hud text-[8.5px] leading-none tracking-[1.1px] text-secondary">
              {`PROJECT · ${project.title}`}
            </span>
          ) : (
            <span class="font-hud text-[8.5px] leading-none tracking-[1.1px] text-text-disabled">
              CAREER RECORD
            </span>
          )}
          <span class="flex flex-none items-center gap-1 font-hud text-[8.5px] leading-none tracking-[1.1px] text-primary-hover">
            OPEN QUEST
            <ArrowUpRight size={11} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </span>
      </span>
    </button>
  );
}
