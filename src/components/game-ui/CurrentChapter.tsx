import { chapterPercent, profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import Panel from "../ui/Panel";
import ProgressBar from "../ui/ProgressBar";

export default function CurrentChapter() {
  const { chapter } = profile;

  return (
    <Panel
      variant="hud"
      class="flex-none bg-hud-panel-soft border-[color:color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
      spine={false}
      bodyClass="gap-2 px-4 py-3.25 short-1000:gap-1.5 short-1000:py-2.5 short-900:gap-1 short-900:px-3.5 short-900:py-2 short-820:gap-0.75 short-820:px-3 short-820:py-1.5"
      aria-label="Current chapter"
    >
      <div class="flex items-center justify-between gap-2 font-hud text-[8.5px] leading-[1.2] tracking-[1.6px] uppercase">
        <p class={cn(text({ role: "hud-label" }), "text-[8.5px] tracking-[1.6px] text-text-faint")}>
          {"// CURRENT CHAPTER"}
        </p>
        <span class="tracking-[1.2px] text-secondary">
          {String(chapter.index).padStart(2, "0")}
        </span>
      </div>
      <h2 class="m-0 font-display text-[17px] leading-[1.2] font-semibold text-text-primary short-1000:text-[15px] short-900:text-[14px] short-820:text-[13px]">
        {chapter.title}
      </h2>
      <ProgressBar
        value={chapterPercent}
        label="Chapter progress"
        tone="secondary"
        class="h-0.75 rounded-[1px] bg-hud-track [&>span]:bg-primary short-820:h-0.5"
      />
      <div class="flex items-center justify-between gap-2 font-hud text-[8px] leading-[1.2] tracking-[1px] uppercase text-text-dim">
        <span>
          {String(chapter.objectivesDone).padStart(2, "0")} /{" "}
          {String(chapter.objectivesTotal).padStart(2, "0")} OBJECTIVES
        </span>
        <span class="text-primary-hover">{chapterPercent}%</span>
      </div>
    </Panel>
  );
}
