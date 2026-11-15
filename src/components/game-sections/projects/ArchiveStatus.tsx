import { ChevronLeft, ChevronRight, Database } from "lucide-preact";
import { cn } from "../../../lib/cn";
import IconButton from "../../ui/IconButton";

export interface ArchiveStatusProps {
  total: number;
  completed: number;
  active: number;
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}

const pagerClass =
  "h-7.5 w-7.5 rounded-xs border-border-subtle bg-hud-panel-soft mobile:h-7 mobile:w-7";

function Metric({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div class="flex flex-1 flex-col gap-0.75">
      <span class="font-hud text-[7.5px] tracking-[1.3px] text-text-ghost">{label}</span>
      <span class={cn("font-display text-[16px] font-bold", tone)}>
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function ArchiveStatus({
  total,
  completed,
  active,
  page,
  pageCount,
  onPrev,
  onNext,
}: ArchiveStatusProps) {
  const atStart = page === 0;
  const atEnd = page === pageCount - 1;
  const current = String(page + 1).padStart(2, "0");
  const last = String(pageCount).padStart(2, "0");

  return (
    <>
      <div class="flex h-18 flex-none items-center justify-between rounded-xs border border-border-subtle bg-hud-panel px-5 shadow-[0_14px_34px_var(--color-shadow-panel)] mobile:hidden">
        <div class="flex items-center gap-3">
          <Database size={14} strokeWidth={1.5} class="text-primary-hover" aria-hidden="true" />
          <span class="font-hud text-[9px] tracking-[2px] text-text-primary">ARCHIVE STATUS</span>
          <span class="hidden items-center gap-3 @min-[920px]:flex">
            <span class="h-4 w-px bg-border-subtle" aria-hidden="true" />
            <span
              class="size-1.25 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]"
              aria-hidden="true"
            />
            <span class="font-hud text-[8px] tracking-[1.2px] text-success">
              DATABASE SYNCED · 100%
            </span>
          </span>
        </div>
        <div class="flex items-center gap-5">
          <Metric label="TOTAL QUESTS" value={total} tone="text-text-primary" />
          <span class="h-6 w-px bg-border-subtle" aria-hidden="true" />
          <Metric label="COMPLETED" value={completed} tone="text-success" />
          <span class="h-6 w-px bg-border-subtle" aria-hidden="true" />
          <Metric label="ACTIVE" value={active} tone="text-secondary" />
        </div>
        <div class="flex items-center gap-2.5">
          <span class="hidden @min-[920px]:inline font-hud text-[8px] tracking-[1.2px] text-text-ghost">
            ← → NAVIGATE
          </span>
          <IconButton
            size="sm"
            label="Previous quest page"
            class={pagerClass}
            disabled={atStart}
            onClick={onPrev}
            icon={<ChevronLeft size={12} strokeWidth={1.5} />}
          />
          <IconButton
            size="sm"
            label="Next quest page"
            class={pagerClass}
            disabled={atEnd}
            onClick={onNext}
            icon={<ChevronRight size={12} strokeWidth={1.5} />}
          />
          <span class="flex items-baseline gap-1">
            <span class="font-hud text-[8px] tracking-[1.2px] text-text-ghost">PAGE</span>
            <span class="font-hud text-[11px] text-text-primary">{current}</span>
            <span class="font-hud text-[8px] text-text-ghost">{`/ ${last}`}</span>
          </span>
        </div>
      </div>

      <div class="hidden flex-none rounded-xs border border-border-subtle bg-hud-panel mobile:block">
        <div class="flex h-9.5 items-center justify-between border-b border-border-subtle px-3.5">
          <span class="font-hud text-[8px] tracking-[1.8px] text-text-primary">ARCHIVE STATUS</span>
          <span class="flex items-center gap-1.5">
            <span class="size-1 rounded-full bg-success" aria-hidden="true" />
            <span class="font-hud text-[7px] tracking-[1.2px] text-success">SYNCED · 100%</span>
          </span>
        </div>
        <div class="flex items-center gap-2.5 px-3.5 py-3">
          <Metric label="TOTAL QUESTS" value={total} tone="text-text-primary" />
          <Metric label="COMPLETED" value={completed} tone="text-success" />
          <Metric label="ACTIVE" value={active} tone="text-secondary" />
        </div>
        <div class="flex items-center justify-between border-t border-border-subtle px-3.5 py-2">
          <span class="flex items-baseline gap-1">
            <span class="font-hud text-[7.5px] tracking-[1.2px] text-text-ghost">PAGE</span>
            <span class="font-hud text-[10px] text-text-primary">{current}</span>
            <span class="font-hud text-[7.5px] text-text-ghost">{`/ ${last}`}</span>
          </span>
          <span class="font-hud text-[7.5px] tracking-[1.2px] text-text-ghost">SWIPE</span>
          <span class="flex items-center gap-1.5">
            <IconButton
              size="sm"
              label="Previous quest page"
              class={pagerClass}
              disabled={atStart}
              onClick={onPrev}
              icon={<ChevronLeft size={11} strokeWidth={1.5} />}
            />
            <IconButton
              size="sm"
              label="Next quest page"
              class={pagerClass}
              disabled={atEnd}
              onClick={onNext}
              icon={<ChevronRight size={11} strokeWidth={1.5} />}
            />
          </span>
        </div>
      </div>
    </>
  );
}
