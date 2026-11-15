import { Award, Crosshair, Diamond, ExternalLink, ScanLine, Shield, Sparkles } from "lucide-preact";
import type { ComponentChildren } from "preact";
import type { Project } from "../../../data/projects";
import { cn } from "../../../lib/cn";
import Button from "../../ui/Button";
import Panel from "../../ui/Panel";
import {
  chipBase,
  detailPlatform,
  DifficultyBars,
  difficultyMeta,
  questCode,
  statusMeta,
  StatusChip,
} from "./questMeta";

export interface QuestDetailsProps {
  project: Project;
  total: number;
}

function SectionHead({ children }: { children: ComponentChildren }) {
  return (
    <div class="flex items-center gap-2">
      <span class="font-hud text-[8.5px] tracking-[2px] text-text-secondary uppercase">
        {children}
      </span>
      <span class="h-px flex-1 bg-tint-ghost" aria-hidden="true" />
    </div>
  );
}

function DetailRow({
  label,
  children,
  tone,
}: {
  label: string;
  children: ComponentChildren;
  tone?: string;
}) {
  return (
    <div class="flex h-6.75 items-center justify-between border-t border-border-subtle first:border-t-0">
      <span class="font-hud text-[8.5px] tracking-[1.3px] text-text-faint uppercase">{label}</span>
      <span class={cn("font-body text-[12px] font-medium text-text-primary", tone)}>
        {children}
      </span>
    </div>
  );
}

export default function QuestDetails({ project, total }: QuestDetailsProps) {
  const code = questCode(project);
  const status = statusMeta[project.status];
  const difficulty = difficultyMeta[project.difficulty];
  const subtitle = project.subtitle ?? project.sector.replaceAll(" / ", " ");

  return (
    <Panel
      variant="hud"
      spineClass="bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]"
      bodyClass="p-0 gap-0"
      class="min-h-full overflow-hidden rounded-xs border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-hud-panel-strong shadow-[0_18px_44px_var(--color-shadow-panel)]"
      aria-labelledby="quest-details-heading"
    >
      <div class="flex h-9.5 flex-none items-center justify-between border-b border-border-subtle px-4.5">
        <div class="flex items-center gap-2">
          <ScanLine size={12} strokeWidth={1.5} class="text-primary-hover" aria-hidden="true" />
          <h3
            id="quest-details-heading"
            class="m-0 font-hud text-[9.5px] tracking-[2.2px] text-text-primary"
          >
            QUEST DETAILS
          </h3>
        </div>
        <span class="font-hud text-[8px] tracking-[1.4px] text-primary-hover">
          {`REF ${code} / ${String(total).padStart(2, "0")}`}
        </span>
      </div>

      <div class="relative h-53.5 flex-none overflow-hidden mobile:h-50">
        <img
          class="absolute inset-0 h-full w-full object-cover"
          src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
          alt=""
          width={1280}
          height={512}
          loading="lazy"
          decoding="async"
        />
        <span
          class="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_85%,transparent),transparent)]"
          aria-hidden="true"
        />
        <span
          class="absolute inset-x-0 bottom-0 h-22.5 bg-[linear-gradient(0deg,var(--color-hud-panel-strong),transparent)]"
          aria-hidden="true"
        />
        <div class="absolute inset-x-0 top-0 flex items-start justify-between px-3 pt-3">
          <span
            class={cn(
              chipBase,
              "gap-1.25 border-primary-hover/40 bg-tint-primary text-[7.5px] tracking-[1.2px] text-accent-lilac",
            )}
          >
            <Crosshair size={8} strokeWidth={1.5} />
            SELECTED QUEST
          </span>
          <StatusChip status={project.status} class="text-[7px] tracking-[1px]" />
        </div>
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2">
          <span class="flex items-center gap-1.5 font-hud text-[7px] tracking-[1.2px]">
            <span class="text-text-dim">DIFFICULTY</span>
            <DifficultyBars level={difficulty.bars} class="w-2.75" />
            <span class="text-secondary">{difficulty.label}</span>
          </span>
          <span class="font-hud text-[7px] tracking-[1.2px] text-text-dim">
            {`${status.label}${project.completedAt ? ` · ${project.completedAt}` : ""}`}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-3 pt-4 pr-4.5 pb-4 pl-5 mobile:gap-2.75 mobile:px-3.5 mobile:pt-3.25 mobile:pb-3.5">
        <div class="flex items-center justify-between gap-2 font-hud text-[8px] tracking-[1.8px] text-primary-hover">
          <span>{`QUEST ${code} · ${project.category.toUpperCase()}`}</span>
          <span class="text-accent-gold">{status.rank}</span>
        </div>

        <h4 class="m-0 bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_45%,var(--color-accent-orchid)_80%,var(--color-primary-hover)_100%)] bg-clip-text font-display text-[36px] leading-[1.05] font-bold tracking-[-0.5px] text-transparent mobile:text-[30px]">
          {project.title}
        </h4>

        <p class="m-0 font-hud text-[8.5px] tracking-[2px] text-text-dim">{subtitle}</p>

        <p class="m-0 font-body text-[12px] leading-[1.6] text-text-secondary mobile:text-[11px]">
          {project.summary ?? project.description}
        </p>

        <span class="h-px w-full bg-tint-ghost" aria-hidden="true" />

        <SectionHead>MISSION DETAILS</SectionHead>
        <div>
          {project.role ? <DetailRow label="ROLE">{project.role}</DetailRow> : null}
          <DetailRow label="PLATFORM">{detailPlatform(project)}</DetailRow>
          <DetailRow label="CATEGORY">{project.category}</DetailRow>
          <DetailRow label="STATUS" tone={cn("capitalize", status.textClass)}>
            {status.label}
          </DetailRow>
        </div>

        <SectionHead>TECHNOLOGY EQUIPMENT</SectionHead>
        <ul class="m-0 flex list-none flex-wrap gap-1.25 p-0">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              class="flex items-center rounded-xs border border-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)] bg-tint-ghost px-2 py-1.5"
            >
              <span class="font-hud text-[9px] tracking-[1px] text-text-secondary mobile:text-[8px] mobile:tracking-[0.6px]">
                {technology}
              </span>
            </li>
          ))}
        </ul>

        {project.contributions?.length ? (
          <>
            <SectionHead>CONTRIBUTION</SectionHead>
            <ul class="m-0 flex list-none flex-col gap-1.25 p-0">
              {project.contributions.map((contribution) => (
                <li
                  key={contribution}
                  class="flex items-center gap-2 font-body text-[12px] text-text-secondary mobile:text-[10.5px]"
                >
                  <Diamond size={6} strokeWidth={1.5} class="text-primary-hover" />
                  {contribution}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div class="flex items-center justify-between pt-0.5">
          <span class="flex items-center gap-1.5">
            <span class="flex items-center gap-1" aria-hidden="true">
              {[Award, Shield, Sparkles].map((Glyph, index) => (
                <span
                  key={`achievement-${index}`}
                  class="grid size-7 place-items-center rounded-xs border border-primary/30 bg-tint-primary text-primary-hover"
                >
                  <Glyph size={12} strokeWidth={1.5} />
                </span>
              ))}
            </span>
            <span class="font-hud text-[7.5px] tracking-[1.2px] text-text-secondary">
              {`${String(status.achievements).padStart(2, "0")} ACHIEVEMENTS`}
            </span>
          </span>
          <span class="font-hud text-[7.5px] tracking-[1.2px] text-accent-gold">{status.rank}</span>
        </div>

        {project.demoUrl ? (
          <div class="flex flex-none gap-2 border-t border-tint-ghost pt-3">
            <Button
              variant="primary"
              href={project.demoUrl}
              external
              class="w-full"
              icon={<ExternalLink size={12} strokeWidth={1.5} />}
            >
              VIEW LIVE PROJECT
            </Button>
          </div>
        ) : null}
      </div>
    </Panel>
  );
}
