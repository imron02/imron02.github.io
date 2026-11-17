import { ArrowRight, BrainCircuit, Layers, Lock, Network } from "lucide-preact";
import type { ComponentType } from "preact";
import { researchThreads, scoutingTags } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import { gameActions } from "../../../state/game";
import Panel from "../../ui/Panel";

const threadTone = {
  pink: {
    text: "text-accent-pink",
    border: "border-[color-mix(in_srgb,var(--color-accent-pink)_30%,transparent)]",
    accent: "bg-accent-pink",
    fill: "bg-[color-mix(in_srgb,var(--color-accent-pink)_10%,transparent)]",
  },
  primary: {
    text: "text-primary-hover",
    border: "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]",
    accent: "bg-primary-hover",
    fill: "bg-tint-primary",
  },
  secondary: {
    text: "text-secondary",
    border: "border-[color-mix(in_srgb,var(--color-secondary)_30%,transparent)]",
    accent: "bg-secondary",
    fill: "bg-tint-secondary",
  },
} as const;

const threadIcons: Record<
  (typeof researchThreads)[number]["icon"],
  ComponentType<{ size?: number; strokeWidth?: number; class?: string }>
> = {
  "brain-circuit": BrainCircuit,
  layers: Layers,
  network: Network,
};

export default function CurrentlyLearning() {
  return (
    <Panel
      variant="hud"
      bodyClass="p-0 gap-0"
      class="w-full flex-none border-[color-mix(in_srgb,var(--color-accent-gold)_25%,transparent)] bg-hud-panel-strong"
      spineClass="bg-[linear-gradient(180deg,var(--color-accent-gold),var(--color-accent-pink),var(--color-primary))]"
    >
      <span
        class="absolute top-1.5 left-1.5 size-4 border-t border-l border-accent-gold/60"
        aria-hidden="true"
      />
      <span
        class="absolute top-1.5 right-1.5 size-4 border-t border-r border-accent-gold/60"
        aria-hidden="true"
      />
      <span
        class="absolute bottom-1.5 left-1.5 size-4 border-b border-l border-accent-gold/60"
        aria-hidden="true"
      />
      <span
        class="absolute right-1.5 bottom-1.5 size-4 border-r border-b border-accent-gold/60"
        aria-hidden="true"
      />

      <div class="hidden h-10 items-center justify-between border-b border-border-subtle px-4 mobile:flex mobile:px-3.5">
        <span class="font-hud text-[10px] tracking-[1.6px] text-accent-gold">
          {"// QUEST LOG — OPEN"}
        </span>
        <span class="font-hud text-[9.5px] tracking-[1.1px] text-accent-gold">
          {`${String(researchThreads.length).padStart(2, "0")} ACTIVE`}
        </span>
      </div>

      <div class="grid gap-8 px-8 py-7 @min-[1200px]:grid-cols-[minmax(0,590px)_minmax(0,1fr)] @min-[1200px]:gap-11.5 mobile:block mobile:gap-5 mobile:px-5 mobile:pb-5 mobile:pt-4">
        <div class="flex min-w-0 flex-col">
          <div class="flex items-center gap-2">
            <span class="h-px w-5 bg-accent-gold" aria-hidden="true" />
            <span class="font-hud text-[10px] tracking-[1.8px] text-accent-gold">
              THE JOURNEY CONTINUES
            </span>
          </div>
          <h2 class="mt-3.5 mb-0 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent-gold))] bg-clip-text font-display text-[54px] leading-[0.94] font-bold tracking-[-2px] whitespace-pre-line text-transparent mobile:mt-2.5 mobile:text-[30px] mobile:tracking-[-1px]">
            {"CURRENTLY\nLEARNING"}
          </h2>
          <p class="mt-4 mb-0 font-display text-[17px] leading-[1.55] text-accent-lilac mobile:mt-3 mobile:text-[12.5px]">
            "The edge of the map is where the real work starts."
          </p>
          <p class="mt-3 mb-0 font-body text-[13px] leading-[1.6] text-text-muted mobile:mt-2 mobile:text-[11px]">
            Every artifact in the arsenal started as a scouting target. Current threads focus on
            applied AI, island architecture, and systems that hold up under growth.
          </p>

          <div class="mt-5 flex items-center gap-2.5 border-t border-border-subtle pt-3.5 mobile:mt-4">
            <Lock
              size={12}
              strokeWidth={1.5}
              class="flex-none text-accent-gold"
              aria-hidden="true"
            />
            <span class="flex flex-col gap-0.75">
              <span class="font-hud text-[9px] tracking-[1.2px] text-text-ghost">NEXT UNLOCK</span>
              <span class="font-hud text-[10px] tracking-[1px] text-text-secondary">
                RAG EVALUATION HARNESS
              </span>
            </span>
            <span class="ml-auto flex-none font-hud text-[9px] tracking-[1px] text-accent-gold">
              IN PROGRESS
            </span>
          </div>
        </div>

        <div class="flex min-w-0 flex-col mobile:hidden">
          <div class="flex items-center justify-between gap-2">
            <span class="font-hud text-[10px] tracking-[1.4px] text-text-muted">
              {"// ACTIVE RESEARCH THREADS"}
            </span>
            <span class="font-hud text-[9px] tracking-[1px] text-text-ghost">
              NO PROFICIENCY CLAIMS
            </span>
          </div>

          <div class="mt-3 grid grid-cols-3 gap-3.5">
            {researchThreads.map((thread, index) => {
              const tone = threadTone[thread.tone];
              const Icon = threadIcons[thread.icon];

              return (
                <div
                  key={thread.id}
                  class={cn(
                    "flex min-h-72 min-w-0 flex-col rounded-xs border bg-[color-mix(in_srgb,var(--color-hud-card-solid)_82%,transparent)] p-3.5",
                    tone.border,
                  )}
                >
                  <span class={cn("h-0.5 w-16 flex-none", tone.accent)} aria-hidden="true" />
                  <div class="mt-2.5 flex items-center justify-between">
                    <span class="font-hud text-[9.5px] tracking-[1px] text-text-ghost">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      class={cn(
                        "flex items-center gap-1 font-hud text-[9px] tracking-[0.9px]",
                        tone.text,
                      )}
                    >
                      <span class={cn("size-1 rounded-full", tone.accent)} aria-hidden="true" />
                      ACTIVE
                    </span>
                  </div>
                  <span
                    class={cn(
                      "mt-2.5 flex size-10 items-center justify-center rounded-xs border",
                      tone.border,
                      tone.fill,
                      tone.text,
                    )}
                  >
                    <Icon size={19} strokeWidth={1.25} />
                  </span>
                  <h3 class="mt-2.5 mb-0 font-display text-[19px] leading-[1.05] font-semibold text-text-primary">
                    {thread.title}
                  </h3>
                  <p class="mt-2 mb-0 font-body text-[12px] leading-[1.45] text-text-muted">
                    {thread.description}
                  </p>
                  <span class="mt-auto h-px w-full bg-border-subtle" aria-hidden="true" />
                  <span class="mt-2 font-hud text-[9px] tracking-[1px] text-text-ghost">
                    NEXT MILESTONE
                  </span>
                  <span class="mt-1 font-hud text-[9.5px] leading-[1.3] tracking-[0.8px] text-text-secondary">
                    {thread.milestone}
                  </span>
                  <span class="mt-2 flex items-center gap-0.75" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, tick) => (
                      <span
                        key={tick}
                        class={cn(
                          "h-0.75 w-1.25",
                          tick < 5
                            ? tone.accent
                            : "bg-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)]",
                        )}
                      />
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div class="hidden flex-col mobile:flex">
          <div class="flex items-center justify-between gap-2">
            <span class="font-hud text-[9.5px] tracking-[1.4px] text-text-muted">
              {"// ACTIVE RESEARCH THREADS"}
            </span>
            <span class="font-hud text-[9px] tracking-[0.9px] text-text-ghost">
              NO PROFICIENCY CLAIMS
            </span>
          </div>

          <div class="mt-2.5 flex flex-col">
            {researchThreads.map((thread) => {
              const tone = threadTone[thread.tone];
              const Icon = threadIcons[thread.icon];

              return (
                <div
                  key={thread.id}
                  class="flex h-17 items-center gap-2.5 border-t border-border-subtle first:border-t-0"
                >
                  <span
                    class={cn(
                      "flex size-7 flex-none items-center justify-center rounded-xs border",
                      tone.border,
                      tone.fill,
                      tone.text,
                    )}
                  >
                    <Icon size={14} strokeWidth={1.25} />
                  </span>
                  <span class="flex min-w-0 flex-1 flex-col gap-0.75">
                    <span class="truncate font-display text-[12px] leading-none font-semibold text-text-primary">
                      {thread.title}
                    </span>
                    <span class="truncate font-body text-[10.5px] leading-none text-text-muted">
                      {thread.descriptionShort}
                    </span>
                  </span>
                  <span class={cn("flex-none font-hud text-[9px] tracking-[0.9px]", tone.text)}>
                    ACTIVE
                  </span>
                </div>
              );
            })}
          </div>

          <div class="mt-3 flex flex-wrap items-center gap-1.5">
            {["LLM", "RAG", "VECTOR"].map((tag) => (
              <span
                key={tag}
                class="rounded-[1px] border border-border-subtle bg-hud-chip px-1.5 py-0.75 font-hud text-[9px] tracking-[0.8px] text-text-dim"
              >
                {tag}
              </span>
            ))}
            <span class="rounded-[1px] border border-border-subtle bg-hud-chip px-1.5 py-0.75 font-hud text-[9px] tracking-[0.8px] text-text-ghost">
              +2
            </span>
          </div>

          <div class="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
            <span class="flex flex-col gap-0.75">
              <span class="font-hud text-[9px] tracking-[1px] text-text-ghost">NEXT UNLOCK</span>
              <span class="font-hud text-[10px] tracking-[0.9px] text-text-secondary">
                RAG EVALUATION HARNESS
              </span>
            </span>
            <button
              type="button"
              onClick={() => gameActions.goTo("experience")}
              aria-label="Track the journey in the adventure log"
              class="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-hud text-[9px] tracking-[0.9px] text-accent-gold"
            >
              TRACK THE JOURNEY
              <ArrowRight size={10} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex h-12 items-center justify-between gap-3 border-t border-border-subtle px-5 mobile:hidden">
        <div class="flex items-center gap-2">
          <span class="font-hud text-[9.5px] tracking-[1.2px] text-accent-gold">SCOUTING</span>
          <span class="h-3 w-px bg-border-subtle" aria-hidden="true" />
          {scoutingTags.map((tag) => (
            <span
              key={tag}
              class="flex items-center gap-1 font-hud text-[9px] tracking-[0.8px] text-text-dim"
            >
              <span class="text-text-ghost" aria-hidden="true">
                ◇
              </span>
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => gameActions.goTo("experience")}
          class="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-hud text-[9.5px] tracking-[1px] text-accent-gold hover:text-accent-lilac focus-visible:outline-2 focus-visible:outline-accent-gold focus-visible:outline-offset-2"
        >
          TRACK THE JOURNEY
          <ArrowRight size={11} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </Panel>
  );
}
