import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import Panel from "../ui/Panel";

export interface StatusRow {
  term: string;
  value: string;
  tone?: "success";
}

export const statusRows: StatusRow[] = [
  { term: "ALIGNMENT", value: profile.alignment },
  { term: "PREFERRED STACK", value: profile.preferredStack },
  { term: "WORK MODE", value: profile.workMode },
  { term: "AVAILABILITY", value: profile.availability, tone: "success" },
];

export default function PlayerStatus() {
  return (
    <Panel
      variant="hud"
      class="flex-none bg-hud-panel-soft border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
      spine={false}
      bodyClass="p-0 gap-0"
      aria-label="Player status"
    >
      <div class="flex items-center justify-between gap-2 h-8.5 px-4 short-1000:h-7.5 short-900:h-6.5 short-820:h-5.5">
        <p class={cn(text({ role: "hud-label" }), "text-[8.5px] tracking-[1.6px] text-text-faint")}>
          {"// PLAYER STATUS"}
        </p>
        <span class="font-hud text-[8.5px] leading-[1.2] tracking-[1px] uppercase text-success">
          SYNCED
        </span>
      </div>
      <dl class="m-0">
        {statusRows.map((row) => (
          <div
            key={row.term}
            class="flex items-center justify-between gap-3 h-8 px-4 border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] font-hud text-[8.5px] leading-[1.2] uppercase short-1000:h-7 short-900:h-6.25 short-820:h-5.5"
          >
            <dt class="tracking-[1.2px] text-text-faint">{row.term}</dt>
            <dd
              class={cn(
                "m-0 tracking-[1px] text-text-primary text-right",
                row.tone === "success" && "text-success",
              )}
            >
              {row.value.toUpperCase()}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
