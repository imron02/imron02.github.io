import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Crosshair,
  GitFork,
  LayoutGrid,
  Shield,
  Target,
} from "lucide-preact";
import type { ComponentType } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import {
  skillArtifacts,
  skillCategories,
  skillProfile,
  type SkillCategory,
} from "../../data/skills";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/reduceMotion";
import Button from "../ui/Button";
import CloseButton from "../game-ui/CloseButton";
import IconButton from "../ui/IconButton";
import ArtifactAnalysis from "./skills/ArtifactAnalysis";
import ArtifactSheet from "./skills/ArtifactSheet";
import ArsenalStatus from "./skills/ArsenalStatus";
import CurrentlyLearning from "./skills/CurrentlyLearning";
import FieldRecords from "./skills/FieldRecords";
import ScanLog from "./skills/ScanLog";
import SkillShelf from "./skills/SkillShelf";
import SkillTreePanel from "./skills/SkillTreePanel";
import { artifactById, categoryOf, pad } from "./skills/skillMeta";

type ViewMode = "grid" | "tree";
type ClassId = (typeof skillCategories)[number]["id"];

const totalArtifacts = skillArtifacts.length;
const classCount = skillCategories.length;

const titleGradient =
  "bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_40%,var(--color-accent-orchid)_75%,var(--color-primary-hover)_100%)] bg-clip-text text-transparent";

const holoStats: {
  label: string;
  value: string;
  meta?: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; class?: string }>;
}[] = [
  { label: "CLASS", value: skillProfile.classLabel, icon: Shield },
  { label: "SPECIALIZATION", value: skillProfile.specialization, icon: Crosshair },
  { label: "EXPERIENCE", value: skillProfile.experience, icon: Clock },
  { label: "CURRENT FOCUS", value: skillProfile.focus, meta: skillProfile.focusMeta, icon: Target },
];

const VIEW_MODES = [
  { id: "grid" as const, label: "GRID", icon: LayoutGrid },
  { id: "tree" as const, label: "TREE", icon: GitFork },
];

const TIER_LEGEND = [
  { label: "PRIMARY", tone: "text-primary-hover" },
  { label: "SUPPORT", tone: "text-secondary" },
  { label: "SCOUTING", tone: "text-text-dim" },
];

const initialEquipped = Object.fromEntries(
  skillArtifacts.map((artifact) => [artifact.id, artifact.equippedByDefault]),
);

function HoloStat({ label, value, meta, icon: Icon }: (typeof holoStats)[number]) {
  return (
    <div class="relative flex flex-col gap-1.5 border border-border-subtle bg-hud-panel-soft py-3 pr-3 pl-4">
      <span class="absolute inset-x-0 top-0 h-px bg-primary" aria-hidden="true" />
      <span
        class="absolute inset-y-0 left-0 w-0.5 bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]"
        aria-hidden="true"
      />
      <span class="flex items-center gap-1.5">
        <Icon size={12} strokeWidth={1.5} class="text-primary-hover" />
        <span class="font-hud text-[11px] tracking-[1.2px] text-text-dim">{label}</span>
      </span>
      <span class="font-display text-[22px] leading-none font-semibold text-text-primary mobile:text-[19px] mobile:leading-[1.05]">
        {value}
      </span>
      {meta ? (
        <span class="font-hud text-[10.5px] tracking-[1px] text-text-ghost mobile:hidden">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

interface ClassTabButtonProps {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  variant: "desktop" | "mobile";
}

function ClassTabButton({ category, isActive, onClick, variant }: ClassTabButtonProps) {
  const label = variant === "desktop" ? category.tabLabel : category.mobileLabel;

  if (variant === "desktop") {
    return (
      <button
        type="button"
        aria-pressed={isActive}
        onClick={onClick}
        class={cn(
          "relative flex h-11 cursor-pointer items-center gap-2 border border-b-2 px-3 transition-[background-color,border-color,color] duration-150 ease-out",
          isActive
            ? "border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] border-b-primary bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
            : "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] bg-transparent hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
        )}
      >
        {isActive ? (
          <span class="absolute inset-y-0 left-0 w-0.5 bg-primary-hover" aria-hidden="true" />
        ) : null}
        <span
          class={cn(
            "font-hud text-[9.5px] tracking-[0.9px]",
            isActive ? "text-accent-lilac" : "text-text-disabled",
          )}
        >
          {category.index}
        </span>
        <span
          class={cn(
            "font-hud text-[10.5px] tracking-[1.3px]",
            isActive ? "text-text-primary" : "text-text-dim",
          )}
        >
          {label}
        </span>
        <span
          class={cn(
            "font-hud text-[9.5px] tracking-[0.9px]",
            isActive ? "text-primary-hover" : "text-text-disabled",
          )}
        >
          {pad(category.artifacts.length)}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      class={cn(
        "flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-[1px] border px-2.5",
        isActive
          ? "border-primary bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]"
          : "border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] bg-hud-chip",
      )}
    >
      <span
        class={cn(
          "font-hud text-[9.5px] tracking-[0.8px]",
          isActive ? "text-accent-lilac" : "text-text-disabled",
        )}
      >
        {category.index}
      </span>
      <span
        class={cn(
          "font-hud text-[10.5px] tracking-[1.3px]",
          isActive ? "text-text-primary" : "text-text-dim",
        )}
      >
        {label}
      </span>
      <span
        class={cn(
          "font-hud text-[9.5px] tracking-[0.8px]",
          isActive ? "text-primary-hover" : "text-text-disabled",
        )}
      >
        {pad(category.artifacts.length)}
      </span>
    </button>
  );
}

interface ViewToggleButtonProps {
  item: (typeof VIEW_MODES)[number];
  isActive: boolean;
  onClick: () => void;
}

function ViewToggleButton({ item, isActive, onClick }: ViewToggleButtonProps) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      class={cn(
        "flex h-full cursor-pointer items-center gap-1.5 border px-2.75 font-hud text-[10px] tracking-[1.2px]",
        isActive
          ? "border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] text-text-primary"
          : "border-transparent text-text-dim hover:text-text-secondary",
      )}
    >
      <Icon size={11} strokeWidth={1.5} aria-hidden="true" />
      {item.label}
    </button>
  );
}

export interface SkillsArchiveProps {
  active: boolean;
  onClose: () => void;
}

export default function SkillsArchive({ active, onClose }: SkillsArchiveProps) {
  const [view, setView] = useState<ViewMode>("grid");
  const [activeClass, setActiveClass] = useState<ClassId>("frontend");
  const [selectedId, setSelectedId] = useState("react");
  const equippedState = initialEquipped;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [tracedId, setTracedId] = useState("react");

  const selected = artifactById[selectedId] ?? skillArtifacts[0];
  const selectedCategory = categoryOf(selected.id);
  const isSelectedEquipped = equippedState[selected.id] ?? selected.equippedByDefault;

  const selectArtifact = useCallback((id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1023px)").matches) setSheetOpen(true);
  }, []);

  const jumpToClass = (id: ClassId) => {
    setActiveClass(id);
    if (view === "tree") setView("grid");
    requestAnimationFrame(() => {
      document.getElementById(`skill-class-${id}`)?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const cycleClass = (delta: number) => {
    const index = skillCategories.findIndex((category) => category.id === activeClass);
    const next = (index + delta + classCount) % classCount;
    jumpToClass(skillCategories[next].id);
  };

  useEffect(() => {
    if (!active) setSheetOpen(false);
  }, [active]);

  return (
    <section
      hidden={!active}
      data-skills-active={active ? "true" : undefined}
      aria-labelledby="section-heading-skills"
      class="pointer-events-auto relative flex h-full min-h-0 w-full flex-col gap-4.5 overflow-x-clip overflow-y-auto @container rounded-m bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_42%,transparent)_0%,color-mix(in_srgb,var(--color-void)_82%,transparent)_55%,var(--color-void)_100%)] p-3.5 mobile:h-full mobile:gap-4 mobile:rounded-none mobile:bg-void mobile:px-6 mobile:pb-5 mobile:pt-1"
    >
      <div class="flex flex-none items-center gap-2.75">
        <span class="h-px w-6.5 bg-accent-gold" aria-hidden="true" />
        <span class="font-hud text-[10.5px] tracking-[2.6px] text-accent-gold mobile:tracking-[2px]">
          CHARACTER INVENTORY / CHAPTER 04
        </span>
        <span class="ml-auto flex mobile:hidden">
          <CloseButton onClose={onClose} />
        </span>
        <span class="ml-auto hidden mobile:flex">
          <CloseButton onClose={onClose} />
        </span>
      </div>

      <div class="grid flex-none gap-8 @min-[900px]:grid-cols-[minmax(0,540px)_minmax(0,464px)] @min-[900px]:justify-between mobile:flex mobile:flex-col mobile:gap-5">
        <div class="flex min-w-0 flex-col">
          <h2
            id="section-heading-skills"
            tabIndex={-1}
            class={cn(
              "m-0 whitespace-pre-line font-display text-[clamp(56px,6.5vw,104px)] leading-[0.9] font-bold tracking-[-3px] focus-visible:outline-none mobile:text-[40px] mobile:tracking-[-1.2px]",
              titleGradient,
            )}
          >
            {"MY\nSKILLS"}
          </h2>
          <p class="mt-4 mb-0 max-w-107.5 font-body text-[15.5px] leading-[1.6] text-text-secondary mobile:mt-2.5 mobile:text-[13px]">
            A living register of the tools, frameworks, and systems in the loadout — equipped,
            support, and still scouting.
          </p>

          <div class="mt-6 flex items-center gap-5 mobile:mt-4 mobile:gap-3">
            {[
              { value: String(totalArtifacts), label: "ARTIFACTS" },
              { value: pad(classCount), label: "CLASSES" },
              { value: skillProfile.experience.replace(" Years", ""), label: "YEARS" },
            ].map((metric, index) => (
              <div key={metric.label} class="flex items-center gap-5 mobile:gap-3">
                {index > 0 ? (
                  <span class="h-10 w-px bg-border-subtle mobile:h-8" aria-hidden="true" />
                ) : null}
                <span class="flex flex-col gap-0.5">
                  <span class="font-display text-[38px] leading-none font-bold text-text-primary mobile:text-[26px]">
                    {metric.value}
                  </span>
                  <span class="font-hud text-[10.5px] tracking-[1.4px] text-text-dim mobile:text-[9.5px]">
                    {metric.label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div class="hidden min-w-0 flex-col justify-end gap-2.5 @min-[900px]:flex">
          <div class="grid grid-cols-2 gap-2.5">
            {holoStats.map((stat) => (
              <HoloStat key={stat.label} {...stat} />
            ))}
          </div>
          <div class="flex items-center justify-between gap-2 font-hud text-[9.5px] tracking-[1.2px]">
            <span class="text-text-ghost">{skillProfile.syncLabel}</span>
            <span class="text-accent-gold">{skillProfile.syncValue}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 @min-[900px]:hidden">
        {holoStats.map((stat) => (
          <HoloStat key={stat.label} {...stat} />
        ))}
      </div>

      <div class="flex flex-none flex-col gap-2.5">
        <div class="flex items-center gap-2">
          <span class="h-px w-4.5 bg-primary" aria-hidden="true" />
          <span class="font-hud text-[10px] tracking-[1.3px] text-text-dim">
            <span class="mobile:hidden">ARSENAL REGISTER / 06 CLASSIFICATIONS</span>
            <span class="hidden mobile:inline">ARSENAL REGISTER</span>
          </span>
          <span class="ml-auto font-hud text-[10px] tracking-[1.3px] text-text-ghost">
            <span class="flex items-center gap-1.5 mobile:hidden">
              <span class="size-1 rounded-full bg-success" aria-hidden="true" />
              {`● CODEX SYNCED · ${totalArtifacts} ARTIFACTS REGISTERED`}
            </span>
            <span class="hidden mobile:inline">{`${totalArtifacts} ARTIFACTS`}</span>
          </span>
        </div>

        <div class="flex items-center justify-between gap-4">
          <h3 class="m-0 font-display text-[58px] leading-none font-bold tracking-[-1.6px] mobile:text-[30px] mobile:tracking-[-0.8px]">
            <span class={cn("bg-clip-text text-transparent", titleGradient)}>SKILL INVENTORY</span>
          </h3>
          <div class="hidden h-10 flex-none items-center gap-0.75 rounded-xs border border-tint-glass-border bg-hud-chip p-0.75 @min-[900px]:flex">
            {VIEW_MODES.map((mode) => (
              <ViewToggleButton
                key={mode.id}
                item={mode}
                isActive={view === mode.id}
                onClick={() => setView(mode.id)}
              />
            ))}
          </div>
        </div>

        <div class="flex items-end justify-between gap-6">
          <p class="m-0 max-w-165 font-body text-[14px] leading-[1.6] text-text-secondary mobile:text-[12px]">
            Every class in the register, from signature artifacts to open scouting targets. Select
            an artifact to inspect its loadout data.
          </p>
          <div class="hidden flex-none items-center gap-4 @min-[900px]:flex">
            {TIER_LEGEND.map((legend) => (
              <span key={legend.label} class="flex items-center gap-1.5">
                <span class={cn("text-[10px] leading-none", legend.tone)} aria-hidden="true">
                  ◆
                </span>
                <span class="font-hud text-[9.5px] tracking-[1px] text-text-ghost">
                  {legend.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav aria-label="Skill classes" class="hidden flex-none items-center gap-1.25 mobile:hidden">
        {skillCategories.map((category) => (
          <ClassTabButton
            key={category.id}
            category={category}
            isActive={category.id === activeClass}
            variant="desktop"
            onClick={() => jumpToClass(category.id)}
          />
        ))}
        <span class="ml-auto hidden font-hud text-[9.5px] tracking-[1px] text-text-ghost @min-[1100px]:inline">
          HOVER TO INSPECT · SELECT TO ANALYSE
        </span>
        <span class="h-5 w-px bg-border-subtle" aria-hidden="true" />
        <IconButton
          size="sm"
          label="Previous skill class"
          class="h-6.5 w-6.5"
          icon={<ChevronRight size={12} strokeWidth={1.5} class="rotate-180" />}
          onClick={() => cycleClass(-1)}
        />
        <IconButton
          size="sm"
          label="Next skill class"
          class="h-6.5 w-6.5"
          icon={<ChevronRight size={12} strokeWidth={1.5} />}
          onClick={() => cycleClass(1)}
        />
      </nav>

      <div class="relative hidden mobile:flex">
        <div class="scrollbar-none -mx-6 flex h-10 items-center gap-1.5 overflow-x-auto px-6">
          {skillCategories.map((category) => (
            <ClassTabButton
              key={category.id}
              category={category}
              isActive={category.id === activeClass}
              variant="mobile"
              onClick={() => jumpToClass(category.id)}
            />
          ))}
        </div>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 w-19.5 bg-[linear-gradient(90deg,transparent,var(--color-void))]"
          aria-hidden="true"
        />
      </div>

      <div class="grid gap-6 @min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(0,380px)] @min-[1200px]:items-start">
        <div class="min-w-0">
          {view === "tree" ? (
            <div class="flex flex-col gap-3.5">
              <div class="flex items-center gap-2">
                <span class="h-px w-5 bg-primary" aria-hidden="true" />
                <h3 class="m-0 font-display text-[24px] font-bold tracking-[-0.5px] text-text-primary">
                  {"SKILL TREE // FRONTEND BRANCH"}
                </h3>
              </div>
              <p class="m-0 font-body text-[13px] leading-normal text-text-muted">
                Select any node to trace related abilities.
              </p>
              <SkillTreePanel tracedId={tracedId} onTrace={setTracedId} expanded />
            </div>
          ) : (
            <div class="grid gap-9.5 mobile:gap-5">
              {skillCategories.map((category) => (
                <SkillShelf
                  key={category.id}
                  category={category}
                  selectedId={selected.id}
                  equipped={equippedState}
                  onSelect={selectArtifact}
                />
              ))}
            </div>
          )}
        </div>

        <aside class="grid gap-3.5 mobile:hidden @min-[900px]:grid-cols-2 @min-[900px]:items-start @min-[1200px]:grid-cols-1">
          <ArtifactAnalysis
            artifact={selected}
            category={selectedCategory}
            equipped={isSelectedEquipped}
          />
          {view === "grid" ? <SkillTreePanel tracedId={tracedId} onTrace={setTracedId} /> : null}
          <ArsenalStatus />
          <FieldRecords />
          <ScanLog />
        </aside>
      </div>

      <CurrentlyLearning />

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

      <ArtifactSheet
        open={sheetOpen}
        artifact={selected}
        category={selectedCategory}
        equipped={isSelectedEquipped}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
}
