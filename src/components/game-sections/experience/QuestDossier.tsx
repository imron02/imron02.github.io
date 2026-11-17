import { ArrowRight, ExternalLink, MapPin, ScanLine } from "lucide-preact";
import type { ExperienceItem } from "../../../data/experience";
import { profile } from "../../../data/profile";
import { gameActions } from "../../../state/game";
import { cn } from "../../../lib/cn";
import Button from "../../ui/Button";
import Panel from "../../ui/Panel";
import { questCode } from "../projects/questMeta";
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

export interface QuestDossierProps {
  item: ExperienceItem;
  index: number;
  total: number;
  onNext: () => void;
  nextDisabled: boolean;
}

function MetaRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div class="flex items-center justify-between gap-4 border-border-subtle pt-1.5 pb-1.5 border-t first:border-t-0">
      <dt class="font-hud text-[8.5px] leading-none tracking-[1.4px] text-text-ghost">{label}</dt>
      <dd
        class={cn(
          "m-0 text-right font-hud text-[9.5px] leading-none tracking-[0.8px] text-text-secondary",
          tone,
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function ArsenalChip({ name }: { name: string }) {
  return (
    <li>
      <span class="flex h-5.75 items-center gap-1.25 rounded-[1px] bg-tint-ghost px-1.75 font-hud text-[9.5px] leading-none tracking-[0.6px] text-text-dim mobile:h-5.25">
        <TechMark name={name} iconSize={12} class="size-3" />
        {name}
      </span>
    </li>
  );
}

export default function QuestDossier({
  item,
  index,
  total,
  onNext,
  nextDisabled,
}: QuestDossierProps) {
  const tone = questTone(index);
  const status = questStatus(item);
  const project = projectFor(item);
  const code = project ? questCode(project) : String(index + 1).padStart(3, "0");
  const achievements = item.achievements ?? [];
  const shownAchievements = Math.min(3, achievements.length);

  return (
    <Panel
      as="div"
      variant="hud"
      bodyClass="p-0 gap-0"
      spineClass="bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]"
      aria-labelledby="experience-dossier-heading"
    >
      <div class="flex h-8.5 flex-none items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] px-4">
        <span class="flex items-center gap-2">
          <ScanLine size={12} strokeWidth={1.5} class="text-secondary" />
          <span class="font-hud text-[9px] leading-none tracking-[1.6px] text-accent-lilac">
            QUEST DOSSIER
          </span>
        </span>
        <span class="font-hud text-[9px] leading-none tracking-[1.4px] text-text-ghost">
          {`${pad(index + 1)} / ${pad(total)}`}
        </span>
      </div>

      <div class="relative h-46.5 flex-none overflow-hidden mobile:h-33">
        {project ? (
          <img
            src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
            alt=""
            width={1280}
            height={512}
            loading="lazy"
            decoding="async"
            class="absolute inset-0 size-full object-cover"
          />
        ) : (
          <>
            <span class="absolute inset-0 bg-hud-card-solid" aria-hidden="true" />
            <span class={cn("absolute inset-0", tone.fill)} aria-hidden="true" />
            <span
              class="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,transparent_0%,color-mix(in_srgb,var(--color-void)_70%,transparent)_100%)]"
              aria-hidden="true"
            />
          </>
        )}
        <span
          class="absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_85%,transparent),transparent)]"
          aria-hidden="true"
        />
        <span
          class="absolute inset-x-0 bottom-0 h-18 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-void)_92%,transparent),transparent)]"
          aria-hidden="true"
        />
        <div class="absolute inset-x-0 top-0 flex items-start gap-2.5 p-3.5">
          <span
            class={cn(
              "flex size-9 flex-none items-center justify-center rounded-xs border font-display text-[13px] font-bold text-text-primary mobile:size-7.5 mobile:text-[11px]",
              tone.fill,
              tone.border,
            )}
            aria-hidden="true"
          >
            {monogram(item.company)}
          </span>
          <span class="flex min-w-0 flex-col gap-1">
            <span class="truncate font-display text-[14px] leading-none font-semibold text-text-primary">
              {item.company}
            </span>
            <span class="truncate font-hud text-[8px] leading-none tracking-[0.9px] text-text-dim">
              {item.role}
            </span>
          </span>
          <span class="ml-auto flex flex-none items-center gap-1.5 rounded-[1px] border border-[color-mix(in_srgb,var(--color-text-primary)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_60%,transparent)] px-2 py-1">
            <StatusIndicator status={status} />
          </span>
        </div>
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3.5">
          <span class="font-hud text-[10px] leading-none tracking-[1px] text-text-secondary">
            {period(item)}
          </span>
          <span class="flex items-center gap-1.5">
            <MapPin size={10} strokeWidth={1.5} class="text-text-ghost" />
            <span class="font-hud text-[8px] leading-none tracking-[1.6px] text-text-ghost">
              {profile.country.toUpperCase()}
            </span>
          </span>
        </div>
      </div>

      <div class="flex min-w-0 flex-col gap-3.5 p-4.5 mobile:p-3">
        <p class="m-0 font-hud text-[8px] leading-none tracking-[1.8px] text-primary-hover">
          {project ? `QUEST ${code} · PROJECT ${project.title}` : `QUEST ${code} · CAREER RECORD`}
        </p>
        <div class="flex flex-col gap-1.5">
          <h3
            id="experience-dossier-heading"
            class="m-0 font-display text-[31px] leading-[1.05] font-semibold tracking-[-0.5px] text-text-primary mobile:text-[24px] mobile:tracking-[-0.3px]"
          >
            {project?.title ?? item.company}
          </h3>
          <p class="m-0 font-hud text-[8.5px] leading-none tracking-[1.4px] text-text-muted">
            {project?.subtitle ?? "CAREER RECORD"}
          </p>
        </div>
        {item.summary ? (
          <p class="m-0 font-body text-[12.5px] leading-[1.6] text-text-secondary">
            {item.summary}
          </p>
        ) : null}

        <dl class="m-0 grid gap-0 border-t border-border-subtle pt-1">
          <MetaRow label="ROLE" value={item.role} />
          <MetaRow label="PERIOD" value={period(item)} />
          {project ? <MetaRow label="PROJECT" value={project.title} /> : null}
          <MetaRow label="STATUS" value={status.label} tone={status.text} />
        </dl>

        {achievements.length > 0 ? (
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-hud text-[8px] leading-none tracking-[1.6px] text-text-dim">
                CORE RESPONSIBILITIES
              </span>
              <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-text-disabled">
                <span class="mobile:hidden">{pad(achievements.length)}</span>
                <span class="hidden mobile:inline">
                  {`${pad(shownAchievements)} / ${pad(achievements.length)}`}
                </span>
              </span>
            </div>
            <ul class="m-0 grid list-none gap-1.5 p-0 mobile:[&>li:nth-child(n+4)]:hidden">
              {achievements.map((achievement) => (
                <li key={achievement} class="flex items-start gap-2">
                  <span
                    class="mt-1 size-1.5 flex-none rotate-45 bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]"
                    aria-hidden="true"
                  />
                  <span class="font-body text-[11.5px] leading-normal text-text-muted">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between gap-2">
            <span class="font-hud text-[8px] leading-none tracking-[1.6px] text-text-dim">
              TECHNOLOGY ARSENAL
            </span>
            <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-text-disabled">
              {pad(item.technologies.length)}
            </span>
          </div>
          <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {item.technologies.map((name) => (
              <ArsenalChip key={name} name={name} />
            ))}
          </ul>
        </div>

        <div class="flex gap-2.5 mobile:flex-col">
          {project ? (
            <Button
              variant="primary"
              class="flex-1"
              icon={<ExternalLink size={12} strokeWidth={1.5} />}
              trailingIcon={<ArrowRight size={12} strokeWidth={1.5} />}
              onClick={() => gameActions.selectProject(project.id)}
            >
              {`EXPLORE ${project.title}`}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            class="flex-1"
            trailingIcon={<ArrowRight size={12} strokeWidth={1.5} />}
            onClick={onNext}
            disabled={nextDisabled}
          >
            NEXT QUEST
          </Button>
        </div>
      </div>
    </Panel>
  );
}
