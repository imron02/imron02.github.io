import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Database,
  GitFork,
  TriangleAlert,
} from "lucide-preact";
import { useRef, useState } from "preact/hooks";
import { experience } from "../../data/experience";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/reduceMotion";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Panel from "../ui/Panel";
import CloseButton from "../game-ui/CloseButton";
import CareerProgression from "./experience/CareerProgression";
import ExperienceCard from "./experience/ExperienceCard";
import QuestDossier from "./experience/QuestDossier";
import QuestLogIndex from "./experience/QuestLogIndex";
import {
  companyCount,
  pad,
  parallelQuests,
  questTone,
  totalQuests,
  years,
} from "./experience/experienceMeta";

export interface ExperienceArchiveProps {
  active: boolean;
  onClose: () => void;
}

const historySpan =
  totalQuests > 0 ? `${experience[experience.length - 1].start} — ${experience[0].end}` : "PRESENT";

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <span class="flex flex-col gap-1 mobile:gap-0.5">
      <span class="font-display text-[31px] leading-none font-semibold text-text-primary mobile:text-[19px]">
        {value}
      </span>
      <span class="font-hud text-[10px] leading-none tracking-[1.2px] text-text-dim mobile:text-[8px]">
        {label}
      </span>
    </span>
  );
}

function StatGroup({ class: className, dividerClass }: { class: string; dividerClass: string }) {
  return (
    <div class={className}>
      <HeaderStat label="QUESTS" value={pad(totalQuests)} />
      <span class={cn("w-px bg-border-subtle", dividerClass)} aria-hidden="true" />
      <HeaderStat label="COMPANIES" value={pad(companyCount)} />
      <span class={cn("w-px bg-border-subtle", dividerClass)} aria-hidden="true" />
      <HeaderStat label="YEARS" value={years} />
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div class="flex flex-col gap-0.75">
      <span class="font-hud text-[7.5px] leading-none tracking-[1.3px] text-text-ghost">
        {label}
      </span>
      <span class={cn("font-display text-[16px] leading-none font-bold", tone)}>{pad(value)}</span>
    </div>
  );
}

export default function ExperienceArchive({ active, onClose }: ExperienceArchiveProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dossierRef = useRef<HTMLDivElement | null>(null);

  const selected = experience[selectedIndex];

  const select = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), totalQuests - 1);
    setSelectedIndex(clamped);
    // Stacked layouts put the dossier below the timeline; bring it into view on a card tap.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      dossierRef.current?.scrollIntoView({
        block: "start",
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      hidden={!active}
      data-experience-active={active ? "true" : undefined}
      aria-labelledby="section-heading-experience"
      class="pointer-events-auto relative flex h-full min-h-0 w-full flex-col gap-4.5 overflow-x-clip overflow-y-auto @container rounded-m bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_42%,transparent)_0%,color-mix(in_srgb,var(--color-void)_82%,transparent)_55%,var(--color-void)_100%)] p-3.5 mobile:h-full mobile:gap-4 mobile:rounded-none mobile:bg-void mobile:px-6 mobile:pb-5 mobile:pt-1"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        select(selectedIndex + (event.key === "ArrowLeft" ? -1 : 1));
      }}
    >
      <div class="flex flex-none flex-col gap-3.5 mobile:gap-2.5">
        <div class="flex items-center gap-2.75">
          <span class="h-px w-6.5 bg-primary" aria-hidden="true" />
          <span class="font-hud text-[9px] leading-none tracking-[2.4px] text-accent-lilac mobile:tracking-[2px]">
            {"05.1 — QUEST HISTORY // NEWEST FIRST"}
          </span>
          <span class="ml-auto flex flex-none items-center gap-3">
            <span class="flex items-center gap-1.5 mobile:hidden">
              <span
                class="size-1 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]"
                aria-hidden="true"
              />
              <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-success">
                {`ARCHIVE SYNCED · ${historySpan}`}
              </span>
            </span>
            <CloseButton onClose={onClose} />
          </span>
        </div>

        <div class="flex items-start justify-between gap-6">
          <h2
            id="section-heading-experience"
            tabIndex={-1}
            class="m-0 font-display text-[44px] leading-[1.05] font-semibold tracking-[-1px] text-text-primary focus-visible:outline-none mobile:text-[38px] mobile:tracking-[-0.8px]"
          >
            QUEST HISTORY
          </h2>
          <StatGroup class="flex flex-none items-center gap-5 mobile:hidden" dividerClass="h-10" />
        </div>

        <div class="flex items-end justify-between gap-6 mobile:flex-col mobile:items-start">
          <div class="flex min-w-0 flex-col gap-3">
            <p class="m-0 max-w-172.5 font-body text-[14px] leading-[1.55] text-text-secondary mobile:text-[12px]">
              <span class="mobile:hidden">
                Every role, every world, every engineering challenge — recorded in order, with the
                work still visible in the projects it produced.
              </span>
              <span class="hidden mobile:inline">
                {`${pad(totalQuests)} quests, newest first. Select a record to open its dossier.`}
              </span>
            </p>
            <StatGroup
              class="hidden items-center gap-4 rounded-xs border border-border-subtle bg-hud-panel-soft px-3.5 py-2.5 mobile:flex"
              dividerClass="h-8"
            />
          </div>
          <div class="flex flex-none items-center gap-4 mobile:hidden">
            <span class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span class="font-hud text-[7px] leading-none tracking-[1.2px] text-text-ghost">
                ACTIVE
              </span>
            </span>
            <span class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full border border-text-muted" aria-hidden="true" />
              <span class="font-hud text-[7px] leading-none tracking-[1.2px] text-text-ghost">
                COMPLETED
              </span>
            </span>
            <span class="flex items-center gap-1.5">
              <GitFork size={9} strokeWidth={2} class="text-secondary" aria-hidden="true" />
              <span class="font-hud text-[7px] leading-none tracking-[1.2px] text-text-ghost">
                PARALLEL
              </span>
            </span>
          </div>
        </div>
      </div>

      {selected ? (
        <>
          <div class="grid flex-none grid-cols-1 gap-x-6 gap-y-5 @min-[920px]:grid-cols-[minmax(0,1fr)_minmax(0,min(616px,42%))] mobile:flex mobile:flex-col mobile:gap-5">
            <ol aria-label="Career timeline" class="relative m-0 grid list-none gap-3.5 p-0">
              <span
                class="absolute inset-y-2 left-1.25 w-0.5 bg-[linear-gradient(180deg,var(--color-primary-hover)_0%,var(--color-primary)_35%,var(--color-secondary)_70%,var(--color-accent-pink)_100%)]"
                aria-hidden="true"
              />
              {experience.map((item, index) => (
                <li
                  key={`${item.company}-${item.start}`}
                  class="relative min-w-0 pl-10 mobile:pl-7"
                >
                  <span
                    class="absolute left-0 top-8.25 flex size-3 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-text-primary)_25%,transparent)] bg-void mobile:top-5.5"
                    aria-hidden="true"
                  >
                    <span class={cn("size-0.75 rounded-full", questTone(index).dot)} />
                  </span>
                  <span
                    class="absolute left-3 top-9.5 h-0.5 w-6 bg-[color-mix(in_srgb,var(--color-text-primary)_16%,transparent)] mobile:top-6.75 mobile:left-3 mobile:w-4"
                    aria-hidden="true"
                  />
                  <ExperienceCard
                    item={item}
                    index={index}
                    selected={index === selectedIndex}
                    onSelect={() => select(index)}
                  />
                </li>
              ))}
            </ol>

            <aside
              ref={dossierRef}
              class="@min-[920px]:col-start-2 @min-[920px]:row-start-1 @min-[920px]:row-span-2 flex flex-col gap-4"
            >
              <QuestDossier
                item={selected}
                index={selectedIndex}
                total={totalQuests}
                onNext={() => select(selectedIndex + 1)}
                nextDisabled={selectedIndex === totalQuests - 1}
              />
              <div class="hidden @min-[920px]:flex">
                <QuestLogIndex items={experience} selectedIndex={selectedIndex} onSelect={select} />
              </div>
              {parallelQuests.length > 0 ? (
                <div class="hidden @min-[920px]:block">
                  <Panel
                    as="div"
                    variant="hud"
                    accent="secondary"
                    class="border-[color-mix(in_srgb,var(--color-secondary)_35%,transparent)] bg-hud-panel-soft"
                    bodyClass="p-0 gap-0"
                  >
                    <div class="flex h-8.5 items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] px-4">
                      <span class="flex items-center gap-2">
                        <GitFork size={12} strokeWidth={1.5} class="text-secondary" />
                        <span class="font-hud text-[9px] leading-none tracking-[1.6px] text-secondary">
                          PARALLEL CONTRACT
                        </span>
                      </span>
                      <span class="font-hud text-[9px] leading-none tracking-[1.4px] text-text-ghost">
                        {pad(parallelQuests.length)}
                      </span>
                    </div>
                    <p class="m-0 px-4 pt-3 pb-3.5 font-body text-[11.5px] leading-[1.6] text-text-muted">
                      Parallel contracts run alongside the primary role. Two worlds, one timeline —
                      recorded as separate quests rather than career breaks.
                    </p>
                  </Panel>
                </div>
              ) : null}
            </aside>
          </div>

          <div class="flex h-18 flex-none items-center justify-between gap-6 rounded-xs border border-border-subtle bg-hud-panel px-5 shadow-[0_14px_34px_var(--color-shadow-panel)] mobile:hidden">
            <span class="flex flex-none items-center gap-2.5">
              <Database
                size={13}
                strokeWidth={1.5}
                class="flex-none text-secondary"
                aria-hidden="true"
              />
              <span class="font-hud text-[10px] leading-none tracking-[1.4px] whitespace-nowrap text-text-dim">
                CAREER ARCHIVE
              </span>
              <span class="h-6 w-px bg-border-subtle" aria-hidden="true" />
              <TriangleAlert
                size={11}
                strokeWidth={1.5}
                class="flex-none text-warning"
                aria-hidden="true"
              />
              <span class="font-hud text-[9px] leading-none tracking-[1.1px] whitespace-nowrap text-text-muted">
                {`COMPLETE CAREER RECORD · ${pad(companyCount)} COMPANIES · ${pad(totalQuests)} QUESTS`}
              </span>
            </span>
            <div class="flex flex-none items-center gap-7">
              <Metric label="QUESTS" value={totalQuests} tone="text-text-primary" />
              <Metric label="COMPANIES" value={companyCount} tone="text-primary-hover" />
              <Metric label="PARALLEL" value={parallelQuests.length} tone="text-secondary" />
            </div>
            <div class="flex flex-none items-center gap-2.5">
              <span class="font-hud text-[7.5px] leading-none tracking-[1.3px] text-text-ghost">
                QUEST PAGE
              </span>
              <IconButton
                size="sm"
                label="Previous quest"
                class="h-7.5 w-7.5 rounded-xs border-border-subtle bg-hud-panel-soft"
                icon={<ChevronLeft size={12} strokeWidth={1.5} />}
                onClick={() => select(selectedIndex - 1)}
                disabled={selectedIndex === 0}
              />
              <IconButton
                size="sm"
                label="Next quest"
                class="h-7.5 w-7.5 rounded-xs border-border-subtle bg-hud-panel-soft"
                icon={<ChevronRight size={12} strokeWidth={1.5} />}
                onClick={() => select(selectedIndex + 1)}
                disabled={selectedIndex === totalQuests - 1}
              />
              <span class="font-display text-[13px] leading-none font-semibold">
                <span class="text-primary-hover">{pad(selectedIndex + 1)}</span>
                <span class="text-text-disabled">{` / ${pad(totalQuests)}`}</span>
              </span>
            </div>
          </div>

          <CareerProgression />
        </>
      ) : (
        <p class="m-0 font-body text-[12px] text-text-muted">No quests recorded.</p>
      )}

      <div class="hidden flex-none mobile:block">
        <Button
          variant="ghost"
          class="w-full justify-between"
          icon={<ArrowLeft size={13} strokeWidth={1.5} />}
          trailingIcon={<ChevronRight size={13} strokeWidth={1.5} />}
          onClick={onClose}
        >
          RETURN TO WORLD
        </Button>
      </div>

      {selected ? (
        <p class="m-0 sr-only" aria-live="polite">
          {`Quest ${pad(selectedIndex + 1)} ${selected.company} selected.`}
        </p>
      ) : null}
    </section>
  );
}
