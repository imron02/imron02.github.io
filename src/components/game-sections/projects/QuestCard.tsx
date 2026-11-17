import { ArrowUpRight, Award, Diamond, ScanLine } from "lucide-preact";
import type { Project } from "../../../data/projects";
import { cn } from "../../../lib/cn";
import {
  chipBase,
  DifficultyBars,
  difficultyMeta,
  questCode,
  statusMeta,
  StatusChip,
  techGlyphs,
} from "./questMeta";

export interface QuestCardProps {
  project: Project;
  selected: boolean;
  onSelect: (id: string, event: { detail: number }) => void;
}

const cardBase =
  "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xs border bg-hud-card text-left transition-[border-color,box-shadow] duration-200 ease-[ease]";

const cardSelected =
  "border-[1.5px] border-primary shadow-[0_0_32px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]";

const cardIdle =
  "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]";

export default function QuestCard({ project, selected, onSelect }: QuestCardProps) {
  const code = questCode(project);
  const status = statusMeta[project.status];
  const difficulty = difficultyMeta[project.difficulty];
  const glyphs = project.techIcons.slice(0, 4);
  const cta = selected
    ? { label: "INSPECTING", icon: ScanLine }
    : { label: project.status === "ongoing" ? "EXPLORE" : "OPEN", icon: ArrowUpRight };
  const CtaIcon = cta.icon;

  return (
    <li>
      <button
        type="button"
        aria-current={selected ? "true" : undefined}
        class={cn(cardBase, selected ? cardSelected : cardIdle)}
        onClick={(event) => onSelect(project.id, event)}
      >
        {selected ? (
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))] shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary)_60%,transparent)]"
            aria-hidden="true"
          />
        ) : null}
        <span class="relative block h-34 overflow-hidden bg-hud-card-solid mobile:h-37.5">
          <img
            class="block h-full w-full object-cover"
            src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
            alt=""
            width={1280}
            height={512}
            loading="eager"
            decoding="async"
          />
          <span
            class="absolute inset-x-0 top-0 h-17.5 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_85%,transparent)_0%,transparent_100%)]"
            aria-hidden="true"
          />
          <span
            class="absolute right-3 top-3 font-display text-[62px] leading-none font-bold text-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] mobile:text-[54px]"
            aria-hidden="true"
          >
            {code}
          </span>
          <span class="absolute inset-x-0 top-0 flex items-start justify-between px-3 pt-2.75 pb-0">
            <span
              class={cn(
                chipBase,
                "gap-1.25 border-tint-glass-border bg-[color-mix(in_srgb,var(--color-void)_80%,transparent)] text-[7.5px] tracking-[1.2px] text-accent-lilac",
              )}
            >
              <Diamond size={8} strokeWidth={1.5} />
              {`QUEST ${code}`}
            </span>
            <StatusChip
              status={project.status}
              class="text-[7px] tracking-[1px] mobile:text-[6.5px] mobile:tracking-[0.9px]"
            />
          </span>
        </span>
        <span class="flex flex-col gap-1.5 border-t border-tint-ghost px-3.25 py-2.75 mobile:gap-1.75 mobile:px-3.25 mobile:py-3">
          <span class="flex items-center justify-between gap-2">
            <span class="font-hud text-[8px] leading-none tracking-[1.5px] text-primary-hover uppercase mobile:text-[7.5px] mobile:tracking-[1.2px]">
              {project.sector}
            </span>
            <span class="flex items-center gap-1.5">
              <DifficultyBars level={difficulty.bars} class="w-2.25" />
              <span class="font-hud text-[7px] tracking-[1.2px] text-text-ghost mobile:text-[6.5px]">
                {difficulty.label}
              </span>
            </span>
          </span>
          <span class="font-display text-[18px] leading-[1.15] font-semibold tracking-[-0.2px] text-text-primary mobile:text-[17px]">
            {project.title}
          </span>
          <span class="line-clamp-2 font-body text-[11px] leading-normal text-text-muted mobile:text-[10.5px]">
            {project.description}
          </span>
          <span class="flex items-center gap-1.25 pt-px">
            {glyphs.map((icon, index) => {
              const Glyph = techGlyphs[icon];
              return (
                <span
                  key={`${project.id}-${icon}-${index}`}
                  class="grid size-5.25 place-items-center rounded-xs border border-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)] bg-tint-ghost mobile:size-5.5"
                >
                  <Glyph
                    size={10}
                    strokeWidth={1.5}
                    class={index === 0 ? "text-accent-lilac" : "text-text-faint"}
                  />
                </span>
              );
            })}
            <span class="ml-auto font-hud text-[7px] tracking-[1px] text-text-ghost mobile:text-[6.5px]">
              {`${String(project.technologies.length).padStart(2, "0")} EQUIP`}
            </span>
          </span>
          <span class="flex items-center justify-between border-t border-tint-ghost pt-1.75 mobile:pt-2">
            <span
              class={cn(
                "flex items-center gap-1.25 font-hud text-[7px] tracking-[1.2px] mobile:text-[6.5px] mobile:tracking-[1px]",
                status.textClass,
              )}
            >
              <Award size={10} strokeWidth={1.5} />
              {status.achievement}
            </span>
            <span class="flex items-center gap-1 font-hud text-[7px] tracking-[1.2px] text-primary-hover">
              {cta.label}
              <CtaIcon size={9} strokeWidth={1.5} />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}
