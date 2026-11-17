import { Check, GitFork } from "lucide-preact";
import { cn } from "../../../lib/cn";
import { artifactById, pad } from "./skillMeta";
import { skillTree } from "../../../data/skills";
import ArtifactBadge from "./ArtifactBadge";
import SkillsPanel from "./SkillsPanel";

const CORE_CENTER = { x: 166, y: 201 };

export interface SkillTreePanelProps {
  tracedId: string;
  onTrace: (id: string) => void;
  expanded?: boolean;
}

export default function SkillTreePanel({
  tracedId,
  onTrace,
  expanded = false,
}: SkillTreePanelProps) {
  return (
    <SkillsPanel
      title="// SKILL TREE"
      icon={<GitFork size={12} strokeWidth={1.5} />}
      tone="primary"
      meta={
        <span class="font-hud text-[9.5px] tracking-[1px] text-primary-hover">FRONTEND BRANCH</span>
      }
      foot={
        <>
          <span class="font-hud text-[9.5px] tracking-[1px] text-text-ghost">
            {`${pad(skillTree.nodes.length)} NODES · ${pad(skillTree.links)} LINKS`}
          </span>
          <span class="font-hud text-[9px] tracking-[0.9px] text-text-dim">
            SELECT A NODE TO TRACE →
          </span>
        </>
      }
    >
      <div class={cn("flex justify-center", expanded ? "px-4 py-6" : "p-3")}>
        <div class="relative h-100 w-88.5 max-w-full overflow-hidden rounded-xs border border-border-subtle bg-[color-mix(in_srgb,var(--color-void)_70%,transparent)]">
          <span
            class="absolute top-26 left-17.25 size-48.5 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
            aria-hidden="true"
          />
          <span
            class="absolute top-34 left-25.25 size-32.5 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
            aria-hidden="true"
          />

          <svg
            class="absolute inset-0 size-full text-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
            viewBox="0 0 354 400"
            aria-hidden="true"
          >
            {skillTree.nodes
              .filter((node) => !node.core)
              .map((node) => {
                const cx = node.x + 21;
                const cy = node.y + 21;
                return (
                  <g key={node.id}>
                    <line
                      x1={CORE_CENTER.x}
                      y1={CORE_CENTER.y}
                      x2={cx}
                      y2={cy}
                      stroke="currentColor"
                      stroke-width="1"
                    />
                    <circle cx={cx} cy={cy} r="1.5" fill="currentColor" />
                  </g>
                );
              })}
          </svg>

          {skillTree.nodes.map((node) => {
            const artifact = artifactById[node.id];
            if (!artifact) return null;
            const selected = node.id === tracedId;
            const box = node.core ? "size-13.5" : "size-10.5";
            const labelWidth = 92;

            return (
              <div key={node.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Trace ${node.label}`}
                  onClick={() => onTrace(node.id)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  class={cn(
                    "absolute flex items-center justify-center rounded-xs border transition-[border-color,box-shadow] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2",
                    box,
                    selected
                      ? "border-accent-gold bg-tint-gold shadow-[0_0_18px_color-mix(in_srgb,var(--color-accent-gold)_40%,transparent)]"
                      : node.core
                        ? "border-accent-gold/60 bg-tint-gold"
                        : "border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] bg-hud-panel-strong hover:border-primary-hover",
                  )}
                >
                  <ArtifactBadge
                    artifact={artifact}
                    size={node.core ? "md" : "sm"}
                    class="border-0 bg-transparent p-1"
                  />
                </button>
                <span
                  style={{
                    left: `${node.x - 25}px`,
                    top: `${node.y + (node.core ? 57 : 45)}px`,
                    width: `${labelWidth}px`,
                  }}
                  class={cn(
                    "absolute text-center font-hud text-[10px] leading-none tracking-[0.8px]",
                    node.core ? "text-accent-gold" : "text-text-dim",
                  )}
                >
                  {node.label}
                </span>
              </div>
            );
          })}

          <span
            class="absolute right-2 bottom-2 flex h-4.5 w-18.5 items-center justify-center gap-1 rounded-[1px] border border-secondary/30 bg-tint-secondary font-hud text-[9px] leading-none tracking-[0.8px] text-secondary"
            aria-live="polite"
          >
            <Check size={8} strokeWidth={2} aria-hidden="true" />
            TRACING
            <span class="sr-only">{`${artifactById[tracedId]?.name ?? tracedId} traced`}</span>
          </span>
        </div>
      </div>
    </SkillsPanel>
  );
}
