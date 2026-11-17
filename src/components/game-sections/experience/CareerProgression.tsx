import { ChevronRight, TrendingUp } from "lucide-preact";
import { cn } from "../../../lib/cn";
import Panel from "../../ui/Panel";
import { progression, questTone, pad, years } from "./experienceMeta";

const nodeSizes = ["size-9", "size-10.5", "size-12", "size-13.5", "size-15"];
const mobileNodeSizes = ["size-3.5", "size-4", "size-4.5", "size-5", "size-6"];

const lastRank = progression.length - 1;
const railSpan = `${progression[0]?.start ?? ""} — ${progression[lastRank]?.end ?? ""}`;

function RankLabel({ index }: { index: number }) {
  if (index === lastRank) {
    return (
      <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-success">
        CURRENT RANK
      </span>
    );
  }
  return (
    <span class="font-hud text-[8px] leading-none tracking-[1.4px] text-text-disabled">
      {`RANK ${pad(index + 1)}`}
    </span>
  );
}

export default function CareerProgression() {
  return (
    <section
      class="flex flex-none flex-col gap-4 mobile:gap-3"
      aria-labelledby="career-progression-heading"
    >
      <div class="flex items-end justify-between gap-6 mobile:flex-col mobile:items-start mobile:gap-2">
        <div class="flex min-w-0 flex-col gap-2">
          <span class="flex items-center gap-2">
            <span class="h-px w-4.5 bg-secondary" aria-hidden="true" />
            <span class="font-hud text-[10px] leading-none tracking-[1.6px] text-text-dim">
              05.3 — GROWTH CURVE
            </span>
          </span>
          <h3
            id="career-progression-heading"
            class="m-0 font-display text-[46px] leading-[1.02] font-bold tracking-[-1px] text-text-primary mobile:text-[31px] mobile:tracking-[-0.5px]"
          >
            CAREER PROGRESSION
          </h3>
          <p class="m-0 max-w-165 font-body text-[13px] leading-[1.55] text-text-muted">
            One continuous build. The titles grew as the work did.
          </p>
        </div>
        <span class="flex-none font-hud text-[9px] leading-none tracking-[1.4px] text-text-ghost mobile:pt-1">
          {`${railSpan} · ${pad(progression.length)} RANKS`}
        </span>
      </div>

      <Panel
        as="div"
        variant="hud"
        class="bg-hud-panel-soft"
        bodyClass="p-5 gap-5 mobile:p-3.5 mobile:gap-4"
      >
        <span
          class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-primary)_60%,transparent),transparent)]"
          aria-hidden="true"
        />

        {/* Desktop growth curve: rail behind the node row */}
        <div class="relative hidden @min-[900px]:block">
          <span
            class="absolute left-[10%] right-[10%] top-13.75 h-0.5 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-primary)_20%,transparent),var(--color-primary-hover)_55%,var(--color-secondary))]"
            aria-hidden="true"
          />
          {[20, 40, 60, 80].map((percent) => (
            <span
              key={percent}
              class="absolute top-13.75 z-0 -translate-x-1/2 -translate-y-1/2 bg-hud-panel-soft px-0.5 text-text-disabled"
              style={{ left: `${percent}%` }}
              aria-hidden="true"
            >
              <ChevronRight size={10} strokeWidth={1.5} />
            </span>
          ))}
          <div
            class="relative z-10 grid"
            style={{ gridTemplateColumns: `repeat(${progression.length}, minmax(0, 1fr))` }}
          >
            {progression.map((item, index) => {
              const tone = questTone(index);
              const current = index === lastRank;
              return (
                <div
                  key={`${item.company}-${item.start}`}
                  class="flex flex-col items-center gap-2.5 px-2 text-center"
                >
                  <span class="flex h-4 items-center font-hud text-[8.5px] leading-none tracking-[1.2px] text-text-dim">
                    {`${item.start} · ${item.company.split(" ")[0].toUpperCase()}`}
                  </span>
                  <span class="flex h-15 w-full items-center justify-center">
                    <span
                      class={cn(
                        "flex items-center justify-center rounded-full border bg-void",
                        nodeSizes[index % nodeSizes.length],
                        current
                          ? "border-primary-hover text-primary-hover shadow-[0_0_22px_color-mix(in_srgb,var(--color-primary-hover)_45%,transparent)]"
                          : "border-[color-mix(in_srgb,var(--color-text-primary)_18%,transparent)]",
                      )}
                    >
                      <span
                        class={cn(
                          "font-display text-[12px] font-semibold",
                          current ? "text-primary-hover" : tone.text,
                        )}
                      >
                        {pad(index + 1)}
                      </span>
                    </span>
                  </span>
                  <span class="font-body text-[11.5px] leading-tight text-text-primary">
                    {item.role}
                  </span>
                  <RankLabel index={index} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile growth curve: vertical rail with stacked ranks */}
        <div class="relative @min-[900px]:hidden">
          <span
            class="absolute bottom-3 left-3 top-3 w-0.5 bg-[linear-gradient(180deg,var(--color-secondary),var(--color-primary-hover))]"
            aria-hidden="true"
          />
          <ol class="m-0 grid list-none gap-4 p-0">
            {progression.map((item, index) => {
              const tone = questTone(index);
              const current = index === lastRank;
              return (
                <li
                  key={`${item.company}-${item.start}`}
                  class="relative flex items-center gap-3.5"
                >
                  <span class="flex w-6.5 flex-none items-center justify-center">
                    <span
                      class={cn(
                        "relative z-10 flex flex-none items-center justify-center rounded-full border bg-void",
                        mobileNodeSizes[index % mobileNodeSizes.length],
                        current
                          ? "border-primary-hover shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary-hover)_45%,transparent)]"
                          : "border-[color-mix(in_srgb,var(--color-text-primary)_18%,transparent)]",
                      )}
                      aria-hidden="true"
                    >
                      <span
                        class={cn("size-1 rounded-full", current ? "bg-primary-hover" : tone.dot)}
                      />
                    </span>
                  </span>
                  <span class="flex min-w-0 flex-col gap-1">
                    <span class="font-hud text-[8.5px] leading-none tracking-[1.2px] text-text-dim">
                      {`${item.start} · ${item.company.split(" ")[0].toUpperCase()}`}
                    </span>
                    <span class="truncate font-body text-[11.5px] leading-tight text-text-primary">
                      {item.role}
                    </span>
                    <RankLabel index={index} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div class="flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] pt-3.5 mobile:flex-col mobile:items-start mobile:gap-2">
          <span class="flex min-w-0 items-center gap-2 font-hud text-[8px] leading-normal tracking-[1px] text-text-ghost">
            <TrendingUp
              size={11}
              strokeWidth={1.5}
              class="flex-none text-success"
              aria-hidden="true"
            />
            Each rank marks a role actually held — growth measured in shipped work
          </span>
          <span class="flex-none font-hud text-[8px] leading-none tracking-[1.2px] text-accent-gold">
            {`${years} YEARS IN MOTION`}
          </span>
        </div>
      </Panel>
    </section>
  );
}
