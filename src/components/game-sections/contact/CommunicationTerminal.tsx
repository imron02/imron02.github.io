import { ArrowUpRight } from "lucide-preact";
import type { ContactChannelLink } from "../../../data/contact";
import { profile } from "../../../data/profile";
import { cn } from "../../../lib/cn";
import Panel from "../../ui/Panel";
import { channelMeta } from "./channelMeta";

// Fixed decorative traces — literal heights in px, styled per segment group.
const SIGNAL_BARS = [6, 28, 12, 26, 17, 24, 21, 20, 25, 15, 27, 9, 28, 8, 27, 14, 25, 19, 22, 23];
const WAVEFORM = [
  16, 28, 28, 17, 7, 19, 20, 11, 4, 5, 9, 22, 27, 20, 4, 19, 25, 19, 8, 5, 4, 14, 23, 21, 8, 16, 27,
  26, 15, 3, 6, 6,
];

const signalBarClass = (index: number) =>
  index < 12 ? "bg-primary" : index < 16 ? "bg-primary-hover" : "bg-secondary";

const waveformClass = (index: number) =>
  index % 3 === 0 ? "bg-secondary" : index % 3 === 1 ? "bg-primary-hover" : "bg-primary";

/**
 * Desktop-only terminal card (design `Po0hg` right column): portrait rings,
 * identity, signal traces, and the direct-channel row list. Hidden below the
 * 880px container threshold — the card grid carries the mobile composition.
 */
export default function CommunicationTerminal({ channels }: { channels: ContactChannelLink[] }) {
  return (
    <Panel
      as="aside"
      variant="hud"
      spine={false}
      class="hidden w-full bg-hud-panel-menu @min-[880px]:block @min-[880px]:mt-8"
      bodyClass="p-0 gap-0"
      aria-label="Communication terminal"
    >
      <div class="flex h-8.5 items-center justify-between px-4 font-hud text-[8.5px] tracking-[1.8px]">
        <span class="text-text-faint">{"// TERMINAL"}</span>
        <span class="tracking-[1.2px] text-success">CH-06</span>
      </div>

      <div class="flex flex-col items-center gap-3.5 px-4.5 pt-4 pb-5">
        <div class="relative flex h-35.5 w-full items-center justify-center">
          <span
            class="absolute size-32 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]"
            aria-hidden="true"
          />
          <span
            class="absolute size-27.5 rounded-full border border-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)]"
            aria-hidden="true"
          />
          <span
            class="absolute top-0 left-1/2 h-2 w-1 -translate-x-1/2 bg-[color-mix(in_srgb,var(--color-secondary)_60%,transparent)]"
            aria-hidden="true"
          />
          <span
            class="absolute bottom-0 left-1/2 h-2 w-1 -translate-x-1/2 bg-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
            aria-hidden="true"
          />
          <span class="relative size-22">
            <img
              src={`${import.meta.env.BASE_URL}${profile.avatar}`}
              width={88}
              height={88}
              alt=""
              class="size-22 rounded-full border border-[color-mix(in_srgb,var(--color-primary-hover)_40%,transparent)] object-cover"
            />
            <span
              class="absolute -right-1.5 -bottom-0.5 grid size-5.5 place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-success)_40%,transparent)] bg-void"
              aria-hidden="true"
            >
              <span class="size-1.75 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]" />
            </span>
          </span>
        </div>

        <div class="flex flex-col items-center gap-1">
          <span class="font-display text-[16px] font-bold tracking-[0.4px] text-text-primary">
            {profile.name}
          </span>
          <span class="font-hud text-[8px] tracking-[1.6px] text-text-muted uppercase">
            {profile.title}
          </span>
          <span class="mt-0.5 flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-success)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)] px-2.5 py-1.25">
            <span class="size-1 rounded-full bg-success" aria-hidden="true" />
            <span class="font-hud text-[7.5px] tracking-[1.6px] text-success">ONLINE</span>
          </span>
        </div>

        <span
          class="h-px w-full bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-primary)_36%,transparent)_50%,transparent)]"
          aria-hidden="true"
        />

        <div class="flex w-full items-center justify-between font-hud">
          <span class="text-[7.5px] tracking-[1.4px] text-text-muted">SIGNAL INTEGRITY</span>
          <span class="text-[8.5px] tracking-[1px] text-primary-hover">98%</span>
        </div>

        <div class="flex h-7 w-full items-end gap-1" aria-hidden="true">
          {SIGNAL_BARS.map((value, index) => (
            <span
              key={index}
              class={cn("flex-1 rounded-[1px]", signalBarClass(index))}
              style={{ height: `${value}px`, opacity: 0.35 + index * 0.03 }}
            />
          ))}
        </div>

        <div class="flex h-8.5 w-full items-center justify-center gap-0.5" aria-hidden="true">
          {WAVEFORM.map((value, index) => (
            <span
              key={index}
              class={cn("w-0.75 rounded-[1px]", waveformClass(index))}
              style={{ height: `${value}px`, opacity: 0.3 + (index % 6) * 0.1 }}
            />
          ))}
        </div>

        <div class="flex w-full flex-col">
          <div class="flex h-6 items-center justify-between font-hud text-[8px] tracking-[1.4px] text-text-faint">
            <span>{"// DIRECT CHANNELS"}</span>
            <span class="text-primary-hover">{String(channels.length).padStart(2, "0")}</span>
          </div>
          {channels.map((channel) => {
            const meta = channelMeta[channel.id];
            const external = channel.href.startsWith("http");
            const RowIcon = meta.Icon;
            return (
              <a
                key={channel.id}
                href={channel.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                class="flex h-8 items-center gap-2.25 border-t border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] font-hud no-underline hover:text-text-primary"
              >
                <RowIcon size={12} strokeWidth={1.5} class={cn("size-3 shrink-0", meta.rowIcon)} />
                <span class="text-[7.5px] tracking-[1.2px] text-text-faint">{channel.title}</span>
                <span class="flex-1" />
                <span class="truncate text-[7px] tracking-[0.4px] text-text-primary uppercase">
                  {channel.handle}
                </span>
                <ArrowUpRight size={10} strokeWidth={1.5} class={meta.rowArrow} />
              </a>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
