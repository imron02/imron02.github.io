import {
  BookOpen,
  Building2,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Code2,
  CreditCard,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-preact";
import { useStore } from "@nanostores/preact";
import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cva } from "class-variance-authority";
import { projects, tierMeta } from "../../data/projects";
import { $selectedProject, gameActions } from "../../state/game";
import { cn } from "../../lib/cn";
import { hoverStart, hoverStop } from "../../lib/hoverMotion";
import Badge from "../ui/Badge";
import IconButton from "../ui/IconButton";
import Panel from "../ui/Panel";
import { useRevealed } from "./useRevealed";

const PAGE_SIZE = 3;
// Horizontal travel (px) that commits a page turn; shorter drags stay a tap.
const SWIPE_THRESHOLD = 40;

const card = cva(
  "group relative w-full flex flex-col p-0 rounded-xs bg-hud-card text-text-primary text-left overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-200 ease-[ease] hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] h-26 short-1000:h-24 short-900:h-22 short-820:h-20 mobile:h-15 mobile:shadow-none",
  {
    variants: {
      active: {
        false:
          "border border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]",
        true: "border border-primary-hover shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] hover:border-primary-hover mobile:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]",
      },
    },
    defaultVariants: { active: false },
  },
);

const pagerButton =
  "w-6 h-6 rounded-xs shadow-none border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] bg-transparent text-text-muted hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] hover:text-accent-lilac hover:shadow-none active:translate-y-0 active:shadow-none mobile:w-6 mobile:h-6";

const hoverEnter = { y: -4, scale: 1.02 };

const hoverRest = { y: 0, scale: 1 };

// Project-id overrides win over the category fallback.
// "Creative" is absent: the fallback already renders the same Sparkles.
const glyphs: Partial<Record<string, ComponentChildren>> = {
  q003: <Sparkles size={24} strokeWidth={1.5} />,
  q005: <ChartColumn size={24} strokeWidth={1.5} />,
  q006: <Workflow size={24} strokeWidth={1.5} />,
  q007: <Code2 size={24} strokeWidth={1.5} />,
  q008: <Users size={24} strokeWidth={1.5} />,
  q009: <Building2 size={24} strokeWidth={1.5} />,
  q010: <BookOpen size={24} strokeWidth={1.5} />,
  q011: <Palette size={24} strokeWidth={1.5} />,
  q012: <CreditCard size={24} strokeWidth={1.5} />,
  "Web Application": <ShoppingBag size={24} strokeWidth={1.5} />,
  Mobile: <Smartphone size={24} strokeWidth={1.5} />,
};

const fallbackGlyph = <Sparkles size={24} strokeWidth={1.5} />;

const featuredProjects = projects.filter((project) => project.featured);

const pageCount = Math.max(1, Math.ceil(featuredProjects.length / PAGE_SIZE));

export default function QuestBoard() {
  const revealed = useRevealed();
  const selectedId = useStore($selectedProject);
  const [page, setPage] = useState(0);
  const pageProjects = featuredProjects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const firstIndex = page * PAGE_SIZE + 1;
  const lastIndex = page * PAGE_SIZE + pageProjects.length;
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  // Set when a horizontal drag pages the board, so the drag does not also select a card.
  const swipeHandled = useRef(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  // A keyboard page turn remounts the list (key={page}), destroying the focused
  // card. The flag asks the post-commit effect to move focus onto the new page.
  const restoreFocus = useRef(false);

  // Runs after the remount: key={page} replaces the list, so focus is moved onto
  // the first card of the page that just appeared.
  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    listRef.current?.querySelector<HTMLButtonElement>("li button")?.focus();
  }, [page]);

  const pageBy = (delta: number) => {
    const next = Math.min(Math.max(page + delta, 0), pageCount - 1);
    // At an edge nothing remounts, so no focus move is needed or attempted.
    if (next === page) return;
    restoreFocus.current = true;
    setPage(next);
  };

  return (
    <Panel
      variant="hud"
      class="mobile:border-0 mobile:rounded-none mobile:bg-hud-board mobile:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
      spine={false}
      bodyClass="gap-3 p-4 short-1000:gap-2.5 short-1000:py-3 short-900:gap-2 short-900:px-3.5 short-900:py-2.5 short-820:gap-1.5 short-820:px-3 short-820:py-2 mobile:gap-2 mobile:px-6 mobile:py-3 xs:px-4"
      aria-label="Quest board"
      as="section"
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        pageBy(event.key === "ArrowLeft" ? -1 : 1);
      }}
      onPointerDown={() => {
        // Any fresh press clears the drag guard, so a stray flag can never swallow a real click.
        swipeHandled.current = false;
      }}
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
      <div class="flex items-center justify-between gap-3 h-7 short-1000:h-6 short-900:h-5.5 short-820:h-5 mobile:h-5.5">
        <div class="flex items-center gap-2.5 mobile:gap-2">
          <Sparkles class="text-primary-hover" size={12} strokeWidth={1.5} aria-hidden="true" />
          <p class="m-0 font-hud text-[10.5px] leading-[1.2] tracking-[2.4px] uppercase text-text-primary mobile:text-[9.5px] mobile:tracking-[1.5px]">
            Quest Board
          </p>
          <span class="px-1.5 py-0.5 rounded-[1px] bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] font-hud text-[8px] leading-[1.2] tracking-[1px] text-accent-lilac mobile:px-1.25 mobile:text-[7px]">
            {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>
        <div class="flex items-center gap-1.5 mobile:gap-1">
          <p class="m-0 font-hud text-[8px] leading-[1.2] tracking-[1.2px] uppercase text-text-dim mobile:hidden">
            ← → Navigate
          </p>
          <p class="hidden m-0 font-hud text-[6.5px] leading-[1.2] tracking-[1px] uppercase text-text-dim mobile:block">
            Swipe
          </p>
          <span class="font-hud text-[8px] leading-[1.2] tracking-[1px] text-text-ghost mobile:text-[6.5px]">
            {String(page + 1).padStart(2, "0")}/{String(pageCount).padStart(2, "0")}
          </span>
          <IconButton
            label="Previous quests"
            size="sm"
            class={pagerButton}
            disabled={page === 0}
            onClick={() => pageBy(-1)}
            icon={<ChevronLeft size={11} strokeWidth={1.5} />}
          />
          <IconButton
            label="Next quests"
            size="sm"
            class={pagerButton}
            disabled={page === pageCount - 1}
            onClick={() => pageBy(1)}
            icon={<ChevronRight size={11} strokeWidth={1.5} />}
          />
        </div>
      </div>
      <p class="sr-only" aria-live="polite">
        {pageProjects.length > 0
          ? `Page ${page + 1} of ${pageCount}, quests ${firstIndex} to ${lastIndex}`
          : "No quests available"}
      </p>
      <ul key={page} ref={listRef} class="list-none m-0 p-0 grid grid-cols-3 gap-3 mobile:gap-2">
        {pageProjects.map((project, index) => {
          const isSelected = project.id === selectedId;
          return (
            <li
              key={project.id}
              class={cn(revealed && "motion-safe:animate-reveal-up")}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <button
                type="button"
                class={card({ active: isSelected })}
                aria-current={isSelected ? "true" : undefined}
                onClick={(event) => {
                  // A paging swipe ends with a synthetic click (detail > 0); keyboard activation must still select.
                  const fromSwipe = swipeHandled.current && event.detail > 0;
                  swipeHandled.current = false;
                  if (!fromSwipe) gameActions.selectProject(project.id);
                }}
                onPointerEnter={(event) => hoverStart(event.currentTarget, hoverEnter)}
                onPointerLeave={(event) => hoverStop(event.currentTarget, hoverRest)}
              >
                <span class="relative block h-15 overflow-hidden short-1000:h-13 short-900:h-11 short-820:h-9.5 mobile:h-8">
                  <img
                    class="block w-full h-full object-cover transition-transform duration-500 ease-[ease] motion-safe:group-hover:scale-105"
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt=""
                    width={640}
                    height={272}
                    loading="eager"
                    decoding="async"
                  />
                  <span
                    class="absolute inset-0 bg-[radial-gradient(ellipse_160%_190%_at_18%_100%,transparent_0%,color-mix(in_srgb,var(--color-void)_30%,transparent)_45%,color-mix(in_srgb,var(--color-void)_90%,transparent)_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-10 -top-17.5 w-55 h-37.5 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-text-primary)_20%,transparent),transparent_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-0 top-8.5 w-66 h-6.5 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--color-hud-card-solid)_80%,transparent)_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-56 top-4.5 grid place-items-center w-6 h-6 text-[color-mix(in_srgb,var(--color-text-primary)_70%,transparent)] opacity-85 mobile:hidden"
                    aria-hidden="true"
                  >
                    {glyphs[project.id] ?? glyphs[project.category] ?? fallbackGlyph}
                  </span>
                  <span
                    class={cn(
                      "absolute left-2 top-2 px-1.5 py-0.75 rounded-[1px] border border-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] bg-[color-mix(in_srgb,var(--color-void)_60%,transparent)] font-hud text-[8px] leading-[1.2] tracking-[1px]",
                      isSelected ? "text-accent-lilac" : "text-text-secondary",
                      "mobile:hidden",
                    )}
                  >
                    {project.id.slice(0, 1).toUpperCase()}-{project.id.slice(1)}
                  </span>
                  {isSelected && (
                    <span
                      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-text-primary)_22%,transparent),transparent)] motion-safe:animate-sheen-sweep motion-reduce:hidden"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span class="grid gap-0.75 pt-2 px-2.5 pb-2.25 short-900:py-1.5 short-900:px-2.25 short-820:py-1.25 short-820:px-2 mobile:gap-px mobile:py-1 mobile:px-1.75">
                  <span class="flex items-center justify-between gap-1.5">
                    <span
                      class={cn(
                        "font-hud text-[7.5px] leading-[1.2] tracking-[1.2px] uppercase",
                        isSelected ? "text-primary-hover" : "text-text-ghost",
                        "mobile:text-[6px] mobile:tracking-[0.7px]",
                      )}
                    >
                      {isSelected ? "// ACTIVE QUEST" : "// QUEST"}
                    </span>
                    {project.tier && (
                      <Badge
                        tone={tierMeta[project.tier].tone}
                        class="shrink-0 px-1 py-0.5 text-[6.5px] leading-[1.2] tracking-[0.8px] mobile:hidden"
                      >
                        {tierMeta[project.tier].chip}
                      </Badge>
                    )}
                  </span>
                  <span class="font-display text-[12px] leading-tight font-semibold text-text-primary short-820:text-[11px] mobile:font-body mobile:text-[9px] mobile:leading-[1.2] mobile:truncate">
                    {project.title}
                  </span>
                </span>
                <span
                  class="hidden absolute left-0 bottom-0 w-0.5 h-7 bg-primary-hover mobile:block"
                  aria-hidden="true"
                />
                {isSelected && (
                  <span
                    class="pointer-events-none absolute inset-0 rounded-xs shadow-[inset_0_0_24px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] motion-safe:animate-glow-pulse motion-reduce:hidden"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
