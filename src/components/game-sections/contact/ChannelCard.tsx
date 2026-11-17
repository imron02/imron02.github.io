import { ArrowUpRight } from "lucide-preact";
import type { ContactChannelLink } from "../../../data/contact";
import { cn } from "../../../lib/cn";
import { channelMeta } from "./channelMeta";

/**
 * One contact channel card — the whole anchor is the link. Tone classes come
 * from `channelMeta`; sizing switches at the 880px container threshold the
 * ContactArchive composition runs against.
 */
export default function ChannelCard({ channel }: { channel: ContactChannelLink }) {
  const meta = channelMeta[channel.id];
  const external = channel.href.startsWith("http");
  const Icon = meta.Icon;

  return (
    <a
      href={channel.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      class={cn(
        "group relative flex h-full min-h-43.5 flex-col overflow-hidden rounded-xs border p-0 no-underline",
        meta.cardBg,
        meta.border,
        "transition-[translate,border-color,box-shadow] duration-200 ease-[ease]",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_var(--color-shadow-panel)]",
        "focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2",
        "@min-[880px]:min-h-75",
      )}
    >
      <span class={cn("h-0.5 w-full", meta.accent)} aria-hidden="true" />
      {channel.id === "linkedin" ? (
        <span
          class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-secondary)_8%,transparent),transparent)]"
          aria-hidden="true"
        />
      ) : null}

      <div class="relative flex flex-1 flex-col px-4 py-3.5 @min-[880px]:px-6 @min-[880px]:pt-5.5 @min-[880px]:pb-5">
        <div class="flex items-center justify-between">
          <span class="font-hud text-[7px] tracking-[1.4px] text-text-muted @min-[880px]:text-[8px] @min-[880px]:tracking-[1.6px]">
            {channel.code}
          </span>
          <span
            class={cn(
              "flex items-center gap-1.5 rounded-full border px-1.75 py-0.75 @min-[880px]:px-2 @min-[880px]:py-1",
              meta.text,
              meta.chip,
            )}
          >
            <span class="size-1 rounded-full bg-current" aria-hidden="true" />
            <span class="font-hud text-[6px] tracking-[1px] @min-[880px]:text-[6.5px] @min-[880px]:tracking-[1.2px]">
              {channel.state}
            </span>
          </span>
        </div>

        <div class="mt-3 flex items-center gap-2.5 @min-[880px]:mt-4">
          <span
            class={cn(
              "grid size-10 shrink-0 place-items-center rounded-xs border @min-[880px]:size-13",
              meta.iconBox,
            )}
          >
            <Icon class="size-4.5 @min-[880px]:size-5.75" strokeWidth={1.5} />
          </span>
          <span class="flex min-w-0 flex-col gap-1">
            <span class="font-hud text-[7px] tracking-[1.4px] text-text-muted @min-[880px]:text-[8px] @min-[880px]:tracking-[1.8px]">
              {channel.eyebrow}
            </span>
            <span class="font-display text-[20px] font-bold tracking-[-0.3px] text-text-primary @min-[880px]:text-[26px] @min-[880px]:tracking-[-0.4px]">
              {channel.title}
            </span>
          </span>
        </div>

        <p class="mt-1.75 flex-1 font-body text-[11.5px] leading-normal text-text-secondary @min-[880px]:text-[13px] @min-[880px]:leading-[1.55]">
          {channel.description}
        </p>

        <div class="mt-3 flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] pt-3">
          <span class="truncate font-hud text-[7px] tracking-[0.6px] text-text-muted @min-[880px]:text-[7.5px] @min-[880px]:tracking-[0.8px]">
            {channel.handle}
          </span>
          <span
            class={cn(
              "grid size-6 shrink-0 place-items-center rounded-[1px] border @min-[880px]:size-6.5",
              meta.openBox,
            )}
            aria-hidden="true"
          >
            <ArrowUpRight
              size={11}
              strokeWidth={1.5}
              class="transition-transform duration-150 group-hover:-translate-y-px @min-[880px]:size-3"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
