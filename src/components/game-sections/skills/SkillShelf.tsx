import { GitFork, Radar } from "lucide-preact";
import type { ComponentChildren } from "preact";
import type { SkillCategory } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import ArtifactCard from "./ArtifactCard";
import { categoryTone, pad } from "./skillMeta";

const featureShell =
  "flex h-42 flex-col justify-between rounded-xs border bg-[color-mix(in_srgb,var(--color-hud-card-solid)_82%,transparent)] p-3.5";

function FeatureHead({ label, hint, tone }: { label: string; hint?: string; tone?: string }) {
  return (
    <div class="flex flex-none items-center justify-between gap-2">
      <span class="font-hud text-[9.5px] tracking-[1.4px] text-text-muted">{label}</span>
      {hint ? (
        <span class={cn("font-hud text-[9px] tracking-[1px]", tone ?? "text-text-dim")}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

function FlowChip({ children, tone }: { children: ComponentChildren; tone?: string }) {
  return (
    <span
      class={cn(
        "rounded-[1px] border border-border-subtle bg-hud-chip px-1.5 py-0.75 font-hud text-[9px] leading-none tracking-[0.8px] text-text-secondary",
        tone,
      )}
    >
      {children}
    </span>
  );
}

function TreeLinkPanel() {
  return (
    <div
      class={cn(
        featureShell,
        "col-span-2 border-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)]",
      )}
    >
      <FeatureHead label="// TREE LINK" hint="OPEN" tone="text-secondary" />
      <div class="flex items-center gap-1.5">
        <FlowChip>REACT</FlowChip>
        <span
          class="font-hud text-[10px] leading-none text-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]"
          aria-hidden="true"
        >
          →
        </span>
        <FlowChip>NEXT</FlowChip>
        <span
          class="font-hud text-[10px] leading-none text-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]"
          aria-hidden="true"
        >
          →
        </span>
        <FlowChip>TAILWIND</FlowChip>
      </div>
      <div class="flex items-center gap-2">
        <GitFork size={11} strokeWidth={1.5} class="flex-none text-secondary" aria-hidden="true" />
        <p class="m-0 font-body text-[10.5px] leading-[1.45] text-text-muted">
          Related abilities share a branch. Select any node to trace the link.
        </p>
      </div>
    </div>
  );
}

function ReleasePipelinePanel() {
  const steps = ["EXPO DEV", "EAS BUILD", "STORE REVIEW"];

  return (
    <div
      class={cn(
        featureShell,
        "hidden border-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] @min-[900px]:flex",
      )}
    >
      <FeatureHead label="// PIPELINE" hint="SHIP" tone="text-secondary" />
      <ol class="m-0 flex list-none flex-col gap-1.5 p-0">
        {steps.map((step, index) => (
          <li key={step} class="flex items-center gap-1.5">
            <span class="flex size-3.5 flex-none items-center justify-center rounded-[1px] border border-secondary/40 bg-tint-secondary font-hud text-[9px] leading-none text-secondary">
              {index + 1}
            </span>
            <span class="font-hud text-[9px] tracking-[0.8px] text-text-dim">{step}</span>
          </li>
        ))}
      </ol>
      <span class="font-hud text-[9px] tracking-[1px] text-text-ghost">IOS · ANDROID</span>
    </div>
  );
}

function RequestFlowPanel() {
  const stages = ["CLIENT", "REST API", "NESTJS / LARAVEL", "POSTGRES / MYSQL"];

  return (
    <div
      class={cn(
        featureShell,
        "col-span-2 hidden border-[color-mix(in_srgb,var(--color-accent-pink)_25%,transparent)] @min-[900px]:col-span-4 @min-[900px]:flex",
      )}
    >
      <FeatureHead label="// REQUEST FLOW" hint="PRODUCTION" tone="text-accent-pink" />
      <div class="flex flex-wrap items-center gap-1.5">
        {stages.map((stage, index) => (
          <span key={stage} class="flex items-center gap-1.5">
            {index > 0 ? (
              <span
                class="font-hud text-[10px] leading-none text-[color-mix(in_srgb,var(--color-accent-pink)_40%,transparent)]"
                aria-hidden="true"
              >
                →
              </span>
            ) : null}
            <FlowChip>{stage}</FlowChip>
          </span>
        ))}
      </div>
      <div class="flex items-center justify-between gap-2">
        <span class="font-hud text-[9px] tracking-[0.8px] text-text-ghost">
          AUTH · RATE LIMITS · VERSIONING · QUEUES
        </span>
        <span class="flex items-center gap-1 font-hud text-[9px] tracking-[0.8px] text-success">
          <span class="size-1 rounded-full bg-success" aria-hidden="true" /> HEALTHY
        </span>
      </div>
    </div>
  );
}

function DataLatticePanel() {
  const rows = [
    { label: "RELATIONAL MODELLING", value: "SCHEMA" },
    { label: "INDEXING & QUERY PLANS", value: "PERF" },
    { label: "MIGRATIONS & BACKUPS", value: "SAFE" },
  ];

  return (
    <div
      class={cn(
        featureShell,
        "col-span-2 border-[color-mix(in_srgb,var(--color-success)_25%,transparent)] @min-[900px]:col-span-3",
      )}
    >
      <FeatureHead label="// DATA LATTICE" hint="03 ENGINES ONLINE" tone="text-success" />
      <div class="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            class="flex items-center justify-between gap-2 border-t border-border-subtle py-1 first:border-t-0"
          >
            <span class="font-hud text-[9px] tracking-[0.7px] text-text-dim">{row.label}</span>
            <span class="font-hud text-[9px] tracking-[0.7px] text-success">{row.value}</span>
          </div>
        ))}
      </div>
      <span class="font-hud text-[9px] tracking-[1px] text-text-ghost">RELATIONAL CORE</span>
    </div>
  );
}

function ReservedSlotPanel() {
  return (
    <div class="flex h-42 flex-col items-center justify-center gap-2 rounded-xs border border-dashed border-[color-mix(in_srgb,var(--color-text-primary)_16%,transparent)] bg-tint-ghost p-3.5 text-center">
      <Radar size={18} strokeWidth={1.25} class="text-text-dim" aria-hidden="true" />
      <span class="font-hud text-[9.5px] tracking-[1.2px] text-text-dim">SLOT RESERVED</span>
      <span class="font-hud text-[9px] tracking-[1px] text-text-ghost">NEXT SIGNAL</span>
    </div>
  );
}

function CategoryFeature({ id }: { id: SkillCategory["id"] }) {
  switch (id) {
    case "frontend":
      return <TreeLinkPanel />;
    case "mobile":
      return <ReleasePipelinePanel />;
    case "backend":
      return <RequestFlowPanel />;
    case "database":
      return <DataLatticePanel />;
    case "exploration":
      return <ReservedSlotPanel />;
    default:
      return null;
  }
}

export interface SkillShelfProps {
  category: SkillCategory;
  selectedId: string;
  equipped: Record<string, boolean>;
  onSelect: (id: string) => void;
}

export default function SkillShelf({ category, selectedId, equipped, onSelect }: SkillShelfProps) {
  const tone = categoryTone[category.tone];

  return (
    <section
      id={`skill-class-${category.id}`}
      aria-labelledby={`skill-class-${category.id}-heading`}
      class="scroll-mt-4"
    >
      <div class={cn("h-px w-full", tone.rail)} aria-hidden="true" />

      <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span class={cn("font-hud text-[11px] leading-none tracking-[1.4px]", tone.text)}>
          {category.index}
        </span>
        <h3
          id={`skill-class-${category.id}-heading`}
          class="m-0 font-display text-[24px] leading-none font-bold tracking-[-0.5px] text-text-primary mobile:text-[20px]"
        >
          {category.title}
        </h3>
        <span
          class={cn(
            "rounded-[1px] border px-2 py-0.75 font-hud text-[9.5px] leading-none tracking-[1.2px]",
            tone.border,
            tone.text,
          )}
        >
          {category.rank}
        </span>
        <span class="ml-auto font-hud text-[10px] tracking-[1.4px] text-text-ghost">
          {`${pad(category.artifacts.length)} ARTIFACTS`}
        </span>
      </div>

      <div class="mt-2.5 flex items-center gap-2">
        <span class="h-px flex-1 bg-border-subtle" aria-hidden="true" />
        <span class="font-hud text-[9px] tracking-[1.4px] text-text-dim">CATALOGUED</span>
      </div>

      <p class="mt-3 mb-0 max-w-170 font-body text-[13px] leading-normal text-text-muted">
        {category.description}
      </p>

      <div class="mt-4 grid grid-cols-2 gap-3 @min-[900px]:grid-cols-6 mobile:gap-2.5">
        {category.artifacts.map((artifact, index) => (
          <ArtifactCard
            key={artifact.id}
            artifact={artifact}
            index={index + 1}
            selected={artifact.id === selectedId}
            equipped={equipped[artifact.id] ?? artifact.equippedByDefault}
            onSelect={onSelect}
          />
        ))}
        <CategoryFeature id={category.id} />
      </div>
    </section>
  );
}
