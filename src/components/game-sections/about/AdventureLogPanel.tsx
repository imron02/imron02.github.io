import { Award, ScrollText } from "lucide-preact";
import { experience } from "../../../data/experience";
import { cn } from "../../../lib/cn";
import DesignPanel from "./DesignPanel";

const milestoneCount = String(experience.length).padStart(2, "0");

export default function AdventureLogPanel({
  class: className,
  interactive,
}: {
  class?: string;
  interactive?: boolean;
}) {
  return (
    <DesignPanel
      title="ADVENTURE LOG"
      icon={<ScrollText size={12} strokeWidth={1.5} />}
      meta={
        <span class="px-1.5 py-0.5 rounded-[1px] bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] font-hud text-[7.5px] leading-none tracking-[1px] text-accent-lilac">
          {milestoneCount}
        </span>
      }
      class={className}
      interactive={interactive}
      bodyClass="pt-0 pr-0 pb-0 pl-0 gap-0"
    >
      <div class="flex items-center justify-between gap-3 px-5 py-2.25 border-b border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] mobile:px-3.5 mobile:py-2">
        <span class="flex min-w-0 items-center gap-1.75 font-hud text-[7.5px] leading-none tracking-[1.2px] uppercase text-text-dim mobile:gap-1.5 mobile:text-[7px] mobile:tracking-[1.1px]">
          <Award
            class="flex-none text-accent-gold"
            size={11}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span class="truncate">{`${milestoneCount} MILESTONES UNLOCKED`}</span>
        </span>
        <span class="flex-none font-hud text-[7.5px] leading-none tracking-[1.2px] uppercase text-text-disabled mobile:text-[7px] mobile:tracking-[1.1px]">
          <span class="mobile:hidden">CHRONOLOGICAL — NEWEST FIRST</span>
          <span class="hidden mobile:inline">NEWEST FIRST</span>
        </span>
      </div>

      <ol class="grid list-none m-0 px-5 pb-4 pt-3.25 mobile:px-3.5 mobile:pb-3.5 mobile:pt-2.5 short-820:pt-2.5 short-820:pb-3">
        {experience.map((item) => {
          const active = item.active === true;
          return (
            <li
              key={`${item.company}-${item.start}`}
              class={cn(
                "relative grid gap-1.75 py-3.5 pl-6 border-t",
                active
                  ? "border-[color-mix(in_srgb,var(--color-primary-hover)_60%,transparent)]"
                  : "border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]",
                "first:border-t-0",
              )}
            >
              <span
                class={cn(
                  "absolute left-0 top-4.75 flex-none rounded-full",
                  active
                    ? "w-2.25 h-2.25 bg-primary-hover shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary-hover)_22%,transparent)]"
                    : "w-1.75 h-1.75 bg-[color-mix(in_srgb,var(--color-primary-deep)_75%,var(--color-primary-dark))]",
                )}
                aria-hidden="true"
              />
              <div class="flex min-w-0 items-center gap-2">
                <span
                  class={cn(
                    "font-hud text-[11.5px] leading-none tracking-[1.4px]",
                    active ? "text-text-primary" : "text-text-secondary",
                  )}
                >
                  {item.start}
                </span>
                <span
                  class="w-2 h-px flex-none bg-[color-mix(in_srgb,var(--color-text-primary)_20%,transparent)]"
                  aria-hidden="true"
                />
                <span
                  class={cn(
                    "font-hud text-[8px] leading-none tracking-[1.1px] uppercase",
                    active ? "text-primary-hover" : "text-text-muted",
                  )}
                >
                  {item.end}
                </span>
                {active ? (
                  <span class="px-1.25 py-0.5 rounded-[1px] border border-[color-mix(in_srgb,var(--color-success)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)] font-hud text-[6.5px] leading-none tracking-[0.9px] uppercase text-[color-mix(in_srgb,var(--color-success)_70%,var(--color-text-primary))]">
                    ACTIVE
                  </span>
                ) : null}
              </div>
              <p
                class={cn(
                  "m-0 font-display text-[15px] leading-[1.15] font-semibold tracking-[0.2px] uppercase mobile:text-[14.5px]",
                  active
                    ? "text-text-primary"
                    : "text-[color-mix(in_srgb,var(--color-text-primary)_82%,var(--color-text-secondary))]",
                )}
              >
                {item.company}
              </p>
              <p class="m-0 font-hud text-[8px] leading-none tracking-[1.1px] uppercase text-[color-mix(in_srgb,var(--color-primary-hover)_65%,var(--color-accent-lilac))] mobile:text-[7.5px]">
                {item.role}
              </p>
              {item.technologies.length ? (
                <p class="m-0 font-body text-[9.5px] leading-normal text-text-ghost mobile:leading-[1.4]">
                  {item.technologies.join(" · ")}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </DesignPanel>
  );
}
