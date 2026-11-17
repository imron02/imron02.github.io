import { ScrollText } from "lucide-preact";
import type { ExperienceItem } from "../../../data/experience";
import { cn } from "../../../lib/cn";
import Panel from "../../ui/Panel";
import { pad, period, questTone } from "./experienceMeta";

export interface QuestLogIndexProps {
  items: ExperienceItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function QuestLogIndex({ items, selectedIndex, onSelect }: QuestLogIndexProps) {
  return (
    <Panel
      as="div"
      variant="hud"
      bodyClass="p-0 gap-0"
      spineClass="bg-[linear-gradient(180deg,var(--color-secondary),var(--color-primary))]"
    >
      <div class="flex h-8.5 flex-none items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] px-4">
        <span class="flex items-center gap-2">
          <ScrollText size={12} strokeWidth={1.5} class="text-secondary" />
          <span class="font-hud text-[9px] leading-none tracking-[1.6px] text-accent-lilac">
            QUEST LOG INDEX
          </span>
        </span>
        <span class="font-hud text-[9px] leading-none tracking-[1.4px] text-text-ghost">
          {`${pad(items.length)} RECORDS`}
        </span>
      </div>
      <ul class="m-0 grid list-none p-0">
        {items.map((item, index) => {
          const selected = index === selectedIndex;
          return (
            <li key={`${item.company}-${item.start}`}>
              <button
                type="button"
                aria-current={selected ? "true" : undefined}
                onClick={() => onSelect(index)}
                class={cn(
                  "flex h-9.75 w-full cursor-pointer items-center justify-between gap-3 border-t border-border-subtle px-4 text-left transition-colors duration-150 first:border-t-0 focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-0",
                  selected ? "bg-tint-primary" : "bg-transparent hover:bg-tint-ghost",
                )}
              >
                <span class="flex min-w-0 items-center gap-2.5">
                  <span
                    class={cn(
                      "flex-none font-hud text-[8.5px] leading-none tracking-[1px]",
                      selected ? "text-primary-hover" : "text-text-disabled",
                    )}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    class={cn(
                      "truncate font-body text-[11px] leading-none",
                      selected ? "text-text-primary" : "text-text-muted",
                    )}
                  >
                    {item.company}
                  </span>
                </span>
                <span class="flex flex-none items-center gap-2">
                  <span
                    class={cn(
                      "font-hud text-[8px] leading-none tracking-[0.8px]",
                      selected ? "text-text-secondary" : "text-text-disabled",
                    )}
                  >
                    {period(item)}
                  </span>
                  <span
                    class={cn("size-1 flex-none rounded-full", questTone(index).dot)}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
