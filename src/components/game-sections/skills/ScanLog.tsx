import { ScanLine } from "lucide-preact";
import { useState } from "preact/hooks";
import { scanEntries } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import SkillsPanel from "./SkillsPanel";

export default function ScanLog() {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? scanEntries : scanEntries.slice(0, 5);

  return (
    <SkillsPanel
      title="// SCAN LOG"
      icon={<ScanLine size={12} strokeWidth={1.5} />}
      tone="primary"
      meta={
        <span class="flex items-center gap-1.5 font-hud text-[9.5px] tracking-[1px] text-success">
          <span
            class="size-1 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]"
            aria-hidden="true"
          />
          LIVE
        </span>
      }
      foot={
        <>
          <span class="font-hud text-[9px] tracking-[0.9px] text-text-ghost">
            {"07 SCANS · LAST SYNC T-06:12"}
          </span>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            class="cursor-pointer border-0 bg-transparent p-0 font-hud text-[9px] tracking-[0.9px] text-primary-hover hover:text-accent-lilac focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2"
          >
            {expanded ? "COLLAPSE" : "VIEW ALL"}
          </button>
        </>
      }
    >
      <div class="flex flex-col">
        {rows.map((entry) => (
          <div
            key={entry.id}
            class="flex h-13 items-center gap-2 border-t border-border-subtle px-4 first:border-t-0"
          >
            <span
              class={cn(
                "size-1.25 flex-none rounded-full",
                entry.ok ? "bg-success" : "bg-text-dim",
              )}
              aria-hidden="true"
            />
            <span class="flex min-w-0 flex-1 flex-col gap-0.75">
              <span class="truncate font-hud text-[9.5px] tracking-[0.9px] text-text-secondary">
                {entry.name}
              </span>
              <span class="truncate font-hud text-[9px] tracking-[0.7px] text-text-ghost">
                {entry.state}
              </span>
            </span>
            <span class="flex flex-none items-center gap-1.5">
              <span class="font-hud text-[9px] tracking-[0.7px] text-text-dim">{entry.time}</span>
              <span
                class={cn(
                  "font-hud text-[10px] leading-none",
                  entry.ok ? "text-success" : "text-text-dim",
                )}
                aria-hidden="true"
              >
                {entry.mark}
              </span>
            </span>
          </div>
        ))}
      </div>
    </SkillsPanel>
  );
}
