import { useStore } from "@nanostores/preact";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Globe,
  Layers,
  LibraryBig,
  MapPin,
  Smartphone,
} from "lucide-preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { projects } from "../../data/projects";
import type { ProjectFilter } from "../../data/projects";
import { $selectedProject, gameActions } from "../../state/game";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/reduceMotion";
import Button from "../ui/Button";
import CloseButton from "../game-ui/CloseButton";
import ArchiveStatus from "./projects/ArchiveStatus";
import QuestCard from "./projects/QuestCard";
import QuestDetails from "./projects/QuestDetails";
import type { TechGlyph } from "./projects/questMeta";

const PAGE_SIZE = 4;
// Horizontal travel (px) that commits a page turn; shorter drags stay a tap.
const SWIPE_THRESHOLD = 40;

type FilterId = "all" | ProjectFilter;

const FILTERS: { id: FilterId; label: string; mobileLabel: string; icon: TechGlyph }[] = [
  { id: "all", label: "ALL QUESTS", mobileLabel: "ALL QUESTS", icon: LibraryBig },
  { id: "web", label: "WEB DEVELOPMENT", mobileLabel: "WEB", icon: Globe },
  { id: "mobile", label: "MOBILE APPLICATIONS", mobileLabel: "MOBILE", icon: Smartphone },
  { id: "fullstack", label: "FULLSTACK", mobileLabel: "FULLSTACK", icon: Layers },
  { id: "labs", label: "EXPERIMENTAL", mobileLabel: "LABS", icon: FlaskConical },
];

const TOTAL = projects.length;
const COMPLETED = projects.filter((project) => project.status === "completed").length;
const ACTIVE = TOTAL - COMPLETED;

const chipBase =
  "flex h-9.5 shrink-0 items-center gap-1.5 rounded-xs border px-2.25 font-hud text-[9px] leading-none tracking-[1px] uppercase mobile:h-8.5 mobile:px-3 mobile:text-[8.5px] mobile:tracking-[0.8px]";
const chipActive =
  "border-primary bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] text-text-primary shadow-[0_0_22px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]";
const chipIdle =
  "border-border-subtle bg-hud-chip text-text-dim hover:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] hover:text-text-secondary";

const pad = (value: number) => String(value).padStart(2, "0");

const filterQuests = (filter: FilterId) =>
  filter === "all" ? projects : projects.filter((project) => project.filters.includes(filter));

function ArchiveStat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div class="flex flex-1 flex-col gap-0.75">
      <span class="font-hud text-[8px] tracking-[1.8px] text-text-dim mobile:text-[6.8px] mobile:tracking-[1.3px]">
        {label}
      </span>
      <span class={cn("font-display text-[22px] font-bold tracking-[0.5px]", tone)}>
        {pad(value)}
      </span>
    </div>
  );
}

export interface ProjectsArchiveProps {
  active: boolean;
  onClose: () => void;
}

export default function ProjectsArchive({ active, onClose }: ProjectsArchiveProps) {
  const selectedId = useStore($selectedProject);
  const [filter, setFilter] = useState<FilterId>("all");
  const [page, setPageState] = useState(0);
  const pageRef = useRef(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  // Set when a horizontal drag pages the archive, so the drag does not also select a card.
  const swipeHandled = useRef(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const restoreFocus = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);

  const setPage = useCallback((next: number) => {
    pageRef.current = next;
    setPageState(next);
  }, []);

  // `key={`${filter}-${page}`}` remounts the list, destroying the focused card.
  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    listRef.current?.querySelector<HTMLButtonElement>("li button")?.focus();
  }, [page]);

  const filtered = filterQuests(filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const selected = projects.find((project) => project.id === selectedId) ?? null;
  const activeFilter = FILTERS.find((item) => item.id === filter) ?? FILTERS[0];
  const firstIndex = page * PAGE_SIZE + 1;
  const lastIndex = page * PAGE_SIZE + pageItems.length;

  // Selection and page stay in sync: a quest opened from the home board lands on
  // the page that holds it, and a filter change never leaves a hidden selection.
  useEffect(() => {
    if (!active) return;
    const current = filterQuests(filter);

    if (!selectedId) {
      if (pageRef.current !== 0) setPage(0);
      const first = current[0]?.id;
      if (first) gameActions.selectProject(first);
      return;
    }

    const index = current.findIndex((project) => project.id === selectedId);
    if (index >= 0) {
      const target = Math.floor(index / PAGE_SIZE);
      if (target !== pageRef.current) setPage(target);
      return;
    }

    // A quest picked outside the archive (home board) must win over a stale filter.
    if (filter !== "all") {
      setFilter("all");
      return;
    }

    // Unknown id in `$selectedProject`: fall back to the first quest.
    const fallback = current[0]?.id;
    if (fallback) gameActions.selectProject(fallback);
  }, [active, selectedId, filter, setPage]);

  // Jumps to a page inside a filter and selects its first quest; clamps at both ends.
  const goToPage = (nextFilter: FilterId, nextPage: number) => {
    const list = filterQuests(nextFilter);
    const lastPage = Math.max(1, Math.ceil(list.length / PAGE_SIZE)) - 1;
    const target = Math.min(Math.max(nextPage, 0), lastPage);
    setFilter(nextFilter);
    setPage(target);
    const firstId = list[target * PAGE_SIZE]?.id;
    if (firstId) gameActions.selectProject(firstId);
  };

  const pageBy = (delta: number) => {
    const next = Math.min(Math.max(page + delta, 0), pageCount - 1);
    // No turn at an edge, so the current page's selection stays untouched.
    if (next === page) return;
    restoreFocus.current = true;
    goToPage(filter, next);
  };

  // Stacked layouts put the dossier below the index; bring it into view on a card tap.
  const revealDetail = () => {
    const node = detailRef.current;
    const frame = sectionRef.current;
    if (!node || !frame) return;
    const box = node.getBoundingClientRect();
    const view = frame.getBoundingClientRect();
    if (box.top >= view.top && box.bottom <= view.bottom) return;
    node.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const onSelect = (id: string, event: { detail: number }) => {
    // A paging swipe ends with a synthetic click (detail > 0); keyboard activation must still select.
    const fromSwipe = swipeHandled.current && event.detail > 0;
    swipeHandled.current = false;
    if (fromSwipe) return;
    const changed = id !== selectedId;
    gameActions.selectProject(id);
    if (changed) revealDetail();
  };

  return (
    <section
      ref={sectionRef}
      hidden={!active}
      data-projects-active={active ? "true" : undefined}
      aria-labelledby="section-heading-projects"
      class="pointer-events-auto relative flex h-full min-h-0 w-full flex-col gap-4.5 overflow-y-auto overflow-x-clip @container rounded-m bg-[color-mix(in_srgb,var(--color-void)_45%,transparent)] p-3.5 mobile:h-full mobile:gap-4 mobile:rounded-none mobile:bg-void mobile:px-6 mobile:pb-5 mobile:pt-1"
      onPointerDown={() => {
        // Any fresh press clears the drag guard, so a stray flag can never swallow a real click.
        swipeHandled.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        pageBy(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div class="grid flex-none grid-cols-1 gap-x-6 gap-y-3.5 @min-[920px]:grid-cols-[minmax(0,1fr)_minmax(0,min(616px,38vw))] mobile:flex mobile:flex-col mobile:gap-y-5">
        <div class="col-start-1 row-start-1 flex flex-none items-start justify-between gap-4 mobile:flex-col mobile:gap-3">
          <div class="flex min-w-0 flex-col gap-3">
            <div class="flex items-center gap-2.75">
              <span class="h-px w-6.5 bg-primary" aria-hidden="true" />
              <span class="font-hud text-[9px] tracking-[2.6px] text-accent-lilac mobile:tracking-[2px]">
                WORLD DATABASE / QUEST SYSTEM
              </span>
              <span class="ml-auto flex items-center gap-1.5 mobile:hidden">
                <span
                  class="size-1.25 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]"
                  aria-hidden="true"
                />
                <span class="font-hud text-[8px] tracking-[1.4px] text-success">
                  ARCHIVE ONLINE
                </span>
              </span>
              <span class="ml-auto hidden font-hud text-[8px] tracking-[1.4px] text-text-ghost mobile:block">
                03
              </span>
            </div>
            <h2
              id="section-heading-projects"
              tabIndex={-1}
              class="m-0 bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_40%,var(--color-accent-orchid)_75%,var(--color-primary-hover)_100%)] bg-clip-text font-display text-[64px] leading-[1.02] font-bold tracking-[-1.6px] text-transparent focus-visible:outline-none short-1000:text-[56px] short-900:text-[48px] short-820:text-[40px] mobile:text-[40px] mobile:tracking-[-1.2px]"
            >
              QUEST ARCHIVE
            </h2>
            <p class="m-0 max-w-172.5 font-body text-[14px] leading-[1.55] text-text-secondary mobile:text-[12px]">
              <span class="mobile:hidden">
                A collection of missions, experiments, and digital experiences I've built throughout
                my engineering journey.
              </span>
              <span class="hidden mobile:inline">
                A collection of missions, experiments, and digital experiences built throughout the
                journey.
              </span>
            </p>
            <div class="flex items-center gap-5 pt-2.5 short-820:pt-1 mobile:gap-3 mobile:rounded-xs mobile:border mobile:border-border-subtle mobile:bg-hud-panel-soft mobile:px-3.5 mobile:py-2.5">
              <ArchiveStat label="TOTAL QUESTS" value={TOTAL} tone="text-text-primary" />
              <span class="h-7.5 w-px bg-border-subtle mobile:h-7" aria-hidden="true" />
              <ArchiveStat label="COMPLETED" value={COMPLETED} tone="text-success" />
              <span class="h-7.5 w-px bg-border-subtle mobile:h-7" aria-hidden="true" />
              <ArchiveStat label="ACTIVE" value={ACTIVE} tone="text-secondary" />
            </div>
          </div>
          <div class="flex flex-none items-start mobile:order-first">
            <CloseButton onClose={onClose} />
          </div>
        </div>

        <div class="col-start-1 row-start-2 flex min-w-0 flex-col gap-2.5">
          <div class="flex flex-none items-center gap-2 mobile:-mx-6">
            <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 @min-[920px]:flex-nowrap @min-[920px]:overflow-x-auto scrollbar-none mobile:px-6">
              {FILTERS.map((item) => {
                const isActive = item.id === filter;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    class={cn(chipBase, isActive ? chipActive : chipIdle)}
                    onClick={() => goToPage(item.id, 0)}
                  >
                    <Icon
                      size={11}
                      strokeWidth={1.5}
                      class={isActive ? "text-accent-lilac" : "text-text-muted"}
                    />
                    <span class="mobile:hidden">{item.label}</span>
                    <span class="hidden mobile:inline">{item.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
            <span class="shrink-0 font-hud text-[7.5px] tracking-[1px] text-text-ghost mobile:hidden">
              {`${pad(pageItems.length)} / ${pad(filtered.length)}`}
            </span>
          </div>
          <div class="hidden items-center justify-between font-hud text-[7px] tracking-[1.1px] text-text-muted mobile:flex">
            <span>{`FILTER · ${activeFilter.label}`}</span>
            <span class="flex items-center gap-1.5">
              {`${pad(pageItems.length)} / ${pad(filtered.length)} RESULTS`}
              <span class="size-1 rounded-full bg-primary" aria-hidden="true" />
            </span>
          </div>
          <p class="sr-only" aria-live="polite">
            {pageItems.length > 0
              ? `Page ${page + 1} of ${pageCount}, quests ${firstIndex} to ${lastIndex}`
              : "No quests available"}
          </p>
          <div class="hidden flex-col gap-1.5 mobile:flex">
            <div class="flex items-center gap-2">
              <span class="h-px w-4.5 bg-primary" aria-hidden="true" />
              <span class="font-hud text-[7.5px] tracking-[1.8px] text-text-dim">
                {"// QUEST INDEX"}
              </span>
              <span class="ml-auto flex items-center gap-1 font-hud text-[7px] tracking-[1.1px] text-text-ghost">
                NEWEST FIRST
                <ChevronDown size={9} strokeWidth={1.5} />
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-display text-[24px] font-bold tracking-[-0.4px] text-text-primary">
                MISSION LOG
              </span>
              <span class="rounded-[1px] border border-border-subtle bg-tint-ghost px-1.75 py-0.75 font-hud text-[7px] tracking-[1px] text-text-secondary">
                {`${pad(pageItems.length)} QUESTS`}
              </span>
            </div>
            <p class="m-0 font-body text-[10.5px] leading-normal text-text-ghost">
              Select a quest to inspect its dossier. Filter the archive to narrow the index.
            </p>
          </div>
        </div>

        <ul
          ref={listRef}
          key={`${filter}-${page}`}
          aria-label="Quest index"
          class="col-start-1 row-start-3 m-0 grid list-none auto-rows-min grid-cols-2 content-start gap-4 @min-[920px]:compact:grid-cols-1 mobile:grid-cols-1 mobile:gap-3.5"
          onTouchStart={(event) => {
            const touch = event.touches[0];
            swipeStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchEnd={(event) => {
            const start = swipeStart.current;
            swipeStart.current = null;
            const touch = event.changedTouches[0];
            if (!start || !touch) return;
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            // Dominant-axis guard: a vertical scroll that drifts sideways must not page.
            if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
            swipeHandled.current = true;
            pageBy(dx < 0 ? 1 : -1);
          }}
        >
          {pageItems.map((project) => (
            <QuestCard
              key={project.id}
              project={project}
              selected={project.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>

        <aside
          ref={detailRef}
          class="@min-[920px]:col-start-2 @min-[920px]:row-start-1 @min-[920px]:row-span-3 compact:self-start"
        >
          {selected ? <QuestDetails project={selected} total={TOTAL} /> : null}
        </aside>
      </div>

      <ArchiveStatus
        total={TOTAL}
        completed={COMPLETED}
        active={ACTIVE}
        page={page}
        pageCount={pageCount}
        onPrev={() => pageBy(-1)}
        onNext={() => pageBy(1)}
      />

      <div class="hidden flex-none overflow-hidden rounded-xs border border-border-subtle bg-hud-panel-soft mobile:block">
        <div class="flex h-8.5 items-center justify-between border-b border-border-subtle px-3.5">
          <span class="flex items-center gap-1.5 font-hud text-[7.5px] tracking-[1.4px] text-text-muted">
            <MapPin size={11} strokeWidth={1.5} class="text-primary-hover" aria-hidden="true" />
            {"// ARCHIVE UPLINK"}
          </span>
          <span class="font-hud text-[7px] tracking-[1.2px] text-success">STABLE</span>
        </div>
        {[
          { label: "REGION", value: "GUILD ARCHIVE" },
          { label: "SECTOR", value: "03-C · CENTRAL" },
          { label: "RECORDS", value: `${projects.length} QUESTS INDEXED` },
        ].map((row) => (
          <div
            key={row.label}
            class="flex h-7.5 items-center justify-between border-t border-border-subtle px-3.5 font-hud text-[7.5px] tracking-[1.2px]"
          >
            <span class="text-text-muted">{row.label}</span>
            <span class="text-text-secondary">{row.value}</span>
          </div>
        ))}
      </div>

      <div class="hidden flex-none items-center justify-between px-0.5 font-hud text-[6.5px] tracking-[1px] text-text-muted mobile:flex">
        <span>X 042.769 / Y 118.402</span>
        <span>SECTOR 03 — ARCHIVE</span>
      </div>

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
    </section>
  );
}
