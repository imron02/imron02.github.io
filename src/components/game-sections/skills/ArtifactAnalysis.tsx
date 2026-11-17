import { Swords } from "lucide-preact";
import type { SkillArtifact, SkillCategory } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import ArtifactBadge from "./ArtifactBadge";
import { artifactById, questsUsing, tierMeta, yearsSince } from "./skillMeta";
import SkillsPanel from "./SkillsPanel";

const STATUS_LOOKUP = {
  equipped: { text: "text-primary-hover", dot: "bg-primary-hover", label: "EQUIPPED" },
  scout: { text: "text-text-dim", dot: "bg-text-dim", label: "SCOUTING" },
  standby: { text: "text-text-ghost", dot: "bg-text-ghost", label: "STANDBY" },
} as const;

export interface ArtifactAnalysisProps {
  artifact: SkillArtifact;
  category: SkillCategory;
  equipped: boolean;
  sheet?: boolean;
}

export default function ArtifactAnalysis({
  artifact,
  category,
  equipped,
  sheet = false,
}: ArtifactAnalysisProps) {
  const tier = tierMeta[artifact.tier];
  const statusKey = equipped ? "equipped" : artifact.baseStatus === "scout" ? "scout" : "standby";
  const status = STATUS_LOOKUP[statusKey];
  const questCount = questsUsing(artifact.name).length;
  const questsText =
    questCount === 0 ? "NO QUESTS YET" : `${questCount} ${questCount === 1 ? "QUEST" : "QUESTS"}`;
  const linked = (
    artifact.synergy
      ? artifact.synergy.map((id) => artifactById[id])
      : category.artifacts.filter((item) => item.id !== artifact.id)
  )
    .filter((item): item is SkillArtifact => Boolean(item))
    .slice(0, 4);

  const body = (
    <div class={cn("flex min-w-0 flex-col", sheet ? "gap-2.5 px-4 pb-5" : "gap-3 p-4")}>
      <div class="flex items-center gap-3">
        <ArtifactBadge artifact={artifact} size="lg" />
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <h3
            id={sheet ? "artifact-sheet-title" : undefined}
            class="m-0 font-display text-[27px] leading-none font-semibold text-text-primary"
          >
            {artifact.name}
          </h3>
          <span class="font-hud text-[10px] tracking-[1.1px] text-text-muted">
            {artifact.signature
              ? `SIGNATURE · ${category.title}`
              : `${tier.label} · ${category.title}`}
          </span>
        </div>
        <span
          class={cn(
            "flex flex-none items-center gap-1.25 rounded-[1px] border border-border-subtle bg-tint-ghost px-1.75 py-1 font-hud text-[9px] tracking-[1px]",
            status.text,
          )}
        >
          <span class={cn("size-1 rounded-full", status.dot)} aria-hidden="true" />
          {status.label}
        </span>
      </div>

      <p class="m-0 font-body text-[13px] leading-normal text-text-muted">{artifact.description}</p>

      <span class="h-px w-full bg-border-subtle" aria-hidden="true" />

      <dl class="m-0 flex flex-col">
        <div class="flex items-center justify-between border-t border-border-subtle py-1.5 first:border-t-0">
          <dt class="font-hud text-[10px] tracking-[1.2px] text-text-muted">CATEGORY</dt>
          <dd class="m-0 text-right font-hud text-[10.5px] tracking-[0.8px] text-text-secondary">
            {category.title}
          </dd>
        </div>
        {artifact.since ? (
          <div class="flex items-center justify-between border-t border-border-subtle py-1.5">
            <dt class="font-hud text-[10px] tracking-[1.2px] text-text-muted">EQUIPPED</dt>
            <dd class="m-0 text-right font-hud text-[10.5px] tracking-[0.8px] text-text-secondary">
              {`${artifact.since} · ${yearsSince(artifact.since)} YRS`}
            </dd>
          </div>
        ) : null}
        <div class="flex items-center justify-between border-t border-border-subtle py-1.5">
          <dt class="font-hud text-[10px] tracking-[1.2px] text-text-muted">SHIPPED IN</dt>
          <dd class="m-0 text-right font-hud text-[10.5px] tracking-[0.8px] text-text-secondary">
            {questsText}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-border-subtle py-1.5">
          <dt class="font-hud text-[10px] tracking-[1.2px] text-text-muted">STATUS</dt>
          <dd class="m-0 text-right font-hud text-[10.5px] tracking-[0.8px] text-text-secondary">
            {artifact.signature
              ? "SIGNATURE"
              : artifact.baseStatus === "scout"
                ? "SCOUTING"
                : equipped
                  ? "EQUIPPED"
                  : "STANDBY"}
          </dd>
        </div>
      </dl>

      <div class="flex items-center justify-between">
        <span class="font-hud text-[10px] tracking-[1.2px] text-text-muted">SYNERGY</span>
        <span class="font-hud text-[9.5px] tracking-[1px] text-text-ghost">
          {`${linked.length} LINKED`}
        </span>
      </div>
      <div class="flex items-center gap-2">
        {linked.map((item) => (
          <ArtifactBadge key={item.id} artifact={item} size="xs" />
        ))}
      </div>
    </div>
  );

  if (sheet) return body;

  return (
    <SkillsPanel
      title="// ARTIFACT ANALYSIS"
      icon={<Swords size={12} strokeWidth={1.5} />}
      tone="gold"
      meta={
        <span class="font-hud text-[10px] tracking-[1.1px] text-accent-gold">{artifact.code}</span>
      }
    >
      {body}
    </SkillsPanel>
  );
}
