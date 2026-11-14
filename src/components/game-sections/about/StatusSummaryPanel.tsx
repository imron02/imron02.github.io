import { Activity } from "lucide-preact";
import { cn } from "../../../lib/cn";
import { statusRows } from "../../game-ui/PlayerStatus";
import DesignPanel from "./DesignPanel";

/** Mobile player status grid (`CI6P5`), two cells per row. */
export default function StatusSummaryPanel({ class: className }: { class?: string }) {
  return (
    <DesignPanel
      id="about-status"
      title="PLAYER STATUS"
      icon={<Activity size={11} strokeWidth={1.5} />}
      meta={
        <span class="flex items-center gap-1.25 font-hud text-[7.5px] leading-none tracking-[1.1px] uppercase text-success">
          <span
            class="w-1 h-1 flex-none rounded-full bg-success shadow-[0_0_6px_color-mix(in_srgb,var(--color-success)_60%,transparent)]"
            aria-hidden="true"
          />
          SYNCED
        </span>
      }
      class={className}
      bodyClass="px-3.5 pt-3 pr-3.5 pb-3.25 pl-3.5 gap-2.5"
    >
      <dl class="m-0 grid grid-cols-2 gap-x-3.5 gap-y-2.5">
        {statusRows.map((cell) => (
          <div
            key={cell.term}
            class="grid gap-0.75 pt-2 border-t border-[color-mix(in_srgb,var(--color-text-primary)_7%,transparent)]"
          >
            <dt class="font-hud text-[6.5px] leading-none tracking-[1.2px] uppercase text-text-muted">
              {cell.term}
            </dt>
            <dd
              class={cn(
                "m-0 font-hud text-[8px] leading-none tracking-[0.9px] uppercase text-text-primary",
                cell.tone === "success" && "text-success",
              )}
            >
              {cell.value.toUpperCase()}
            </dd>
          </div>
        ))}
      </dl>
    </DesignPanel>
  );
}
