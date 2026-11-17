import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Layers,
  Mail,
  MessageCircle,
  X,
} from "lucide-preact";
import type { ComponentChildren } from "preact";
import { useRef } from "preact/hooks";
import { contactChannels, contactCopy } from "../../data/contact";
import type { ContactChannelLink } from "../../data/contact";
import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/reduceMotion";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import ChannelCard from "./contact/ChannelCard";
import CommunicationTerminal from "./contact/CommunicationTerminal";

const externalHandle = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channelLinks: ContactChannelLink[] = contactChannels.flatMap((channel) => {
  if (channel.id === "email") {
    return [{ ...channel, href: `mailto:${profile.email}`, handle: profile.email }];
  }
  const social = profile.socials.find((item) => item.label.toLowerCase() === channel.id);
  return social ? [{ ...channel, href: social.href, handle: externalHandle(social.href) }] : [];
});

const cellValue =
  "truncate font-hud text-[8px] tracking-[0.2px] text-text-primary @min-[880px]:text-[10.5px] @min-[880px]:tracking-[0.6px]";

function CharacterCell({ label, children }: { label: string; children: ComponentChildren }) {
  return (
    <div class="flex flex-col gap-1 @min-[880px]:gap-1.25 mobile:flex-row mobile:items-center mobile:justify-between mobile:border-t mobile:border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] mobile:py-2 mobile:first:border-t-0">
      <span class="font-hud text-[6.5px] tracking-[1.1px] text-text-muted @min-[880px]:text-[7.5px] @min-[880px]:tracking-[1.6px]">
        {label}
      </span>
      <span class="flex min-w-0 items-center gap-1.5">{children}</span>
    </div>
  );
}

function SignalStat({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div class="flex items-center gap-1.75">
      <span class="font-hud text-[7px] tracking-[1.2px] text-text-muted">{label}</span>
      <span class={cn("font-hud text-[8.5px] tracking-[1px] text-text-primary", valueClass)}>
        {value}
      </span>
    </div>
  );
}

export interface ContactArchiveProps {
  active: boolean;
  onClose: () => void;
}

/**
 * Contact — communication terminal (design `Po0hg` / `UlwqT`): full-height
 * scrolling section overlay with hero + terminal, channel cards, and closing
 * CTA. World backdrop, rail, system bar and tab bar stay site-owned.
 */
export default function ContactArchive({ active, onClose }: ContactArchiveProps) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const channelsRef = useRef<HTMLElement | null>(null);

  const scrollToChannels = () => {
    const root = scrollRef.current;
    const target = channelsRef.current;
    if (!root || !target) return;
    const top =
      target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
    root.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      hidden={!active}
      data-contact-active={active ? "true" : undefined}
      aria-labelledby="section-heading-contact"
      ref={scrollRef}
      class="@container pointer-events-auto relative flex h-full min-h-0 w-full flex-col overflow-x-clip overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden rounded-m mobile:rounded-none mobile:pt-[env(safe-area-inset-top)]"
    >
      <h2 id="section-heading-contact" tabIndex={-1} class="sr-only focus-visible:outline-none">
        Contact — communication terminal
      </h2>

      <header class="relative z-10 flex-none px-3.5 pt-3.5 mobile:px-6 mobile:pt-2">
        <div class="flex items-center justify-between gap-3 mobile:hidden">
          <div class="flex min-w-0 items-center gap-2.25 font-hud text-[9px] tracking-[3px]">
            <span class="h-px w-6.5 bg-primary" aria-hidden="true" />
            <span class="text-text-muted">TRANSMISSION</span>
            <span class="text-text-disabled">/</span>
            <span class="text-text-primary">CONTACT</span>
            <span class="text-text-disabled">/</span>
            <span class="text-primary-hover">006</span>
            <span
              class="ml-2 size-1.25 rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_80%,transparent)]"
              aria-hidden="true"
            />
            <span class="text-[8px] tracking-[1.4px] text-text-dim">CHANNEL OPEN</span>
          </div>
          <IconButton
            size="sm"
            label="Return to world"
            onClick={onClose}
            icon={<X size={14} strokeWidth={1.5} />}
          />
        </div>

        <div class="hidden items-center gap-2.5 mobile:flex">
          <IconButton
            size="sm"
            label="Return to world"
            onClick={onClose}
            icon={<ChevronLeft size={14} strokeWidth={1.5} />}
          />
          <span class="truncate whitespace-nowrap font-hud text-[7.5px] tracking-[1.2px] text-accent-orchid">
            TRANSMISSION / CONTACT / 006
          </span>
          <span class="flex-1" />
          <span class="size-1.25 rounded-full bg-success" aria-hidden="true" />
          <span class="whitespace-nowrap font-hud text-[7px] tracking-[1.2px] text-text-dim">
            CHANNEL OPEN
          </span>
        </div>
      </header>

      <div class="hidden flex-none items-center gap-2 px-6 pt-4 mobile:flex">
        <span class="h-px w-4 bg-primary" aria-hidden="true" />
        <span class="font-hud text-[7px] tracking-[1.4px] text-primary-hover">
          {"CHANNEL 06 // CONTACT"}
        </span>
        <span class="flex-1" />
        <span class="size-1 rounded-full bg-success" aria-hidden="true" />
        <span class="font-hud text-[6.5px] tracking-[1px] text-success">OPEN</span>
      </div>

      <div class="relative flex-none overflow-hidden px-3.5 pt-6 pb-6 mobile:px-6 mobile:pt-4 mobile:pb-2">
        <span
          class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_60%,transparent)_0%,color-mix(in_srgb,var(--color-void)_42%,transparent)_48%,transparent_100%)] mobile:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-void)_38%,transparent)_0%,color-mix(in_srgb,var(--color-void)_72%,transparent)_58%,color-mix(in_srgb,var(--color-void)_94%,transparent)_100%)]"
          aria-hidden="true"
        />

        <div class="relative grid gap-6 @min-[880px]:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] @min-[880px]:items-start">
          <div class="flex min-w-0 flex-col gap-4.5 mobile:gap-0">
            <div class="flex items-center gap-3">
              <span class="h-px w-6.5 bg-primary mobile:hidden" aria-hidden="true" />
              <span class="font-hud text-[10px] tracking-[3.2px] text-accent-lilac mobile:text-[8px] mobile:tracking-[2.2px]">
                {contactCopy.eyebrow}
              </span>
              <span class="font-hud text-[10px] tracking-[1px] text-text-disabled mobile:hidden">
                {contactCopy.index}
              </span>
            </div>

            <h2 class="m-0 whitespace-pre-line bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_42%,var(--color-accent-orchid)_78%,var(--color-primary-hover)_100%)] bg-clip-text font-display text-[clamp(48px,5.2vw,86px)] leading-[0.94] font-bold tracking-[-2.2px] text-transparent focus-visible:outline-none mobile:text-[44px] mobile:tracking-[-1.4px]">
              {contactCopy.title}
            </h2>

            <p class="max-w-125 font-body text-[16px] leading-[1.65] text-text-secondary mobile:max-w-none mobile:text-[12.5px] mobile:leading-[1.6]">
              {contactCopy.description}
            </p>

            <div class="mt-1.5 flex flex-col gap-4 border-y border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] bg-hud-panel-soft px-3.5 py-4.5 @min-[880px]:grid @min-[880px]:grid-cols-2 @min-[880px]:gap-x-6 @min-[880px]:gap-y-4">
              <CharacterCell label="CHARACTER">
                <span class={cellValue}>{profile.name}</span>
              </CharacterCell>
              <CharacterCell label="STATUS">
                <span class="size-1.25 rounded-full bg-success" aria-hidden="true" />
                <span class={cn(cellValue, "text-success text-[7.5px] @min-[880px]:text-[10px]")}>
                  {profile.availability}
                </span>
              </CharacterCell>
              <CharacterCell label="CLASS">
                <span class={cellValue}>{profile.title}</span>
              </CharacterCell>
              <CharacterCell label="LOCATION">
                <span class={cellValue}>{profile.country}</span>
              </CharacterCell>
            </div>

            <div class="flex flex-col gap-2.5 @min-[880px]:flex-row @min-[880px]:items-center @min-[880px]:gap-3">
              <Button
                variant="primary"
                href={`mailto:${profile.email}`}
                icon={<Mail size={14} strokeWidth={1.5} />}
                trailingIcon={<ArrowDownRight size={14} strokeWidth={1.5} />}
                class="w-full justify-center @min-[880px]:w-auto"
              >
                Initiate contact
              </Button>
              <Button
                variant="ghost"
                class="h-11 w-full justify-center gap-2 @min-[880px]:w-auto"
                icon={<Layers size={13} strokeWidth={1.5} />}
                onClick={scrollToChannels}
              >
                View channels
              </Button>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 font-hud text-[8.5px] tracking-[1.4px] text-text-ghost mobile:text-[7px] mobile:tracking-[1px]">
              <span class="text-primary">{">"}</span>
              <span>{contactCopy.ticker}</span>
              <span
                class="h-2.75 w-px bg-primary-hover motion-safe:animate-caret-blink motion-reduce:hidden"
                aria-hidden="true"
              />
              <span class="flex-1" />
              <span class="text-[8px] tracking-[1.2px] text-success/60 mobile:hidden">
                HANDSHAKE COMPLETE
              </span>
              <span class="hidden text-[6.5px] tracking-[1px] text-success/60 mobile:inline">
                SECURE
              </span>
            </div>
          </div>

          <CommunicationTerminal channels={channelLinks} />
        </div>
      </div>

      <div class="mx-3.5 mb-2 hidden h-21.5 flex-none items-center gap-5.5 overflow-hidden rounded-xs border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] bg-hud-panel-soft px-5.5 shadow-[0_18px_44px_var(--color-shadow-panel)] @min-[880px]:flex">
        <span class="font-hud text-[8.5px] tracking-[1.8px] text-text-faint">
          {"// SIGNAL MONITOR"}
        </span>
        <span
          class="h-6.5 w-px bg-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
          aria-hidden="true"
        />
        <SignalStat label="CHANNEL" value="06" />
        <SignalStat label="ROUTE" value="MAILTO" valueClass="text-secondary-soft" />
        <SignalStat label="ENCRYPTION" value="TLS 1.3" />
        <SignalStat label="TIMEZONE" value={profile.utcOffsetLabel} />
        <span class="flex-1" />
        <button
          type="button"
          onClick={scrollToChannels}
          class="flex cursor-pointer items-center gap-2.25 font-hud text-[8px] tracking-[1.5px] text-text-ghost transition-colors duration-150 ease-[ease] hover:text-text-primary"
        >
          CHANNELS BELOW
          <span class="grid size-6 place-items-center rounded-[1px] border border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)]">
            <ChevronDown size={12} strokeWidth={1.5} />
          </span>
        </button>
      </div>

      <section
        ref={channelsRef}
        class="relative flex-none bg-[linear-gradient(180deg,var(--color-void)_0%,color-mix(in_srgb,var(--color-primary-deep)_12%,var(--color-void))_55%,var(--color-void)_100%)] px-3.5 pt-10 pb-10 mobile:px-6 mobile:pt-9 mobile:pb-9"
      >
        <span
          class="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-primary)_36%,transparent)_35%,color-mix(in_srgb,var(--color-secondary)_36%,transparent)_75%,transparent)]"
          aria-hidden="true"
        />

        <div class="flex flex-col gap-4 @min-[880px]:flex-row @min-[880px]:items-end @min-[880px]:justify-between">
          <div class="flex min-w-0 flex-col gap-2.5">
            <div class="flex items-center gap-2.5">
              <span class="h-px w-6.5 bg-primary" aria-hidden="true" />
              <span class="font-hud text-[9.5px] tracking-[2.8px] text-primary-hover mobile:text-[8px] mobile:tracking-[2.2px]">
                {contactCopy.channels.eyebrow}
              </span>
            </div>
            <h3 class="m-0 font-display text-[clamp(28px,3vw,40px)] leading-[1.05] font-bold tracking-[-1px] text-text-primary mobile:text-[clamp(20px,5.6vw,24px)] mobile:tracking-[-0.6px]">
              {contactCopy.channels.title}
            </h3>
          </div>

          <div class="flex max-w-90 flex-col gap-2 @min-[880px]:items-end @min-[880px]:text-right">
            <p class="font-body text-[13px] leading-[1.6] text-text-secondary mobile:text-[11.5px] mobile:leading-[1.55]">
              {contactCopy.channels.intro}
            </p>
            <p class="font-hud text-[7px] tracking-[1px] text-text-disabled">
              {contactCopy.channels.meta}
            </p>
          </div>
        </div>

        <div class="mt-7 grid gap-3.5 @min-[880px]:grid-cols-3 @min-[880px]:gap-6">
          {channelLinks.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </section>

      <section class="relative flex-none overflow-hidden bg-[linear-gradient(180deg,var(--color-void)_0%,color-mix(in_srgb,var(--color-primary-deep)_12%,var(--color-void))_55%,var(--color-void)_100%)] px-3.5 pt-14 pb-12 mobile:px-6 mobile:pt-12 mobile:pb-10">
        <span
          class="absolute left-1/2 top-0 h-120 w-355 -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-primary)_22%,transparent),color-mix(in_srgb,var(--color-secondary)_8%,transparent)_50%,transparent_100%)] mobile:h-105 mobile:w-100"
          aria-hidden="true"
        />
        <span
          class="absolute left-1/2 top-10 h-100 w-200 -translate-x-1/2 rounded-[50%] border border-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] mobile:h-92.5 mobile:w-92.5"
          aria-hidden="true"
        />
        <span
          class="absolute left-1/2 top-20 h-80 w-160 -translate-x-1/2 rounded-[50%] border border-[color-mix(in_srgb,var(--color-secondary)_8%,transparent)] mobile:top-18.75 mobile:h-75 mobile:w-75"
          aria-hidden="true"
        />
        <span
          class="absolute inset-x-3.5 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-primary)_36%,transparent)_50%,transparent)]"
          aria-hidden="true"
        />

        <div class="relative mx-auto flex max-w-225 flex-col items-center text-center">
          <div class="flex items-center gap-3">
            <span class="h-px w-6.5 bg-primary/40" aria-hidden="true" />
            <span class="font-hud text-[9.5px] tracking-[2.6px] text-primary-hover mobile:text-[8px] mobile:tracking-[2px]">
              {contactCopy.closing.kicker}
            </span>
            <span class="h-px w-6.5 bg-primary/40" aria-hidden="true" />
          </div>

          <h3 class="m-0 mt-4 text-balance bg-[linear-gradient(90deg,var(--color-text-primary)_0%,var(--color-primary-hover)_60%,var(--color-secondary)_100%)] bg-clip-text font-display text-[clamp(40px,4.2vw,64px)] leading-[1.05] font-bold tracking-[-1.6px] text-transparent mobile:mt-3 mobile:text-[32px] mobile:tracking-[-0.8px]">
            {contactCopy.closing.title}
          </h3>

          <p class="mt-3.5 max-w-180 font-body text-[16px] leading-[1.6] text-text-secondary mobile:mt-2.5 mobile:max-w-80 mobile:text-[13px]">
            {contactCopy.closing.quote}
          </p>

          <div class="mt-7 flex w-full flex-col gap-2.5 @min-[560px]:w-auto @min-[560px]:flex-row @min-[560px]:justify-center @min-[560px]:gap-3.5 mobile:mt-5">
            <Button
              variant="primary"
              href={`mailto:${profile.email}`}
              icon={<MessageCircle size={14} strokeWidth={1.5} />}
              trailingIcon={<ArrowRight size={14} strokeWidth={1.5} />}
              class="w-full justify-center @min-[560px]:w-auto"
            >
              Start a conversation
            </Button>
            <Button
              variant="ghost"
              class="h-11 w-full justify-center @min-[560px]:w-auto"
              icon={<ArrowLeft size={13} strokeWidth={1.5} />}
              onClick={onClose}
            >
              Back to homepage
            </Button>
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-center gap-3.5 font-hud text-[8px] tracking-[1.4px] text-text-muted mobile:mt-4 mobile:gap-2 mobile:text-[6.5px] mobile:tracking-[1.1px]">
            <span>DIRECT MAIL</span>
            <span class="size-1 rounded-full bg-current" aria-hidden="true" />
            <span class="break-all text-text-secondary uppercase">{profile.email}</span>
            <span class="size-1 rounded-full bg-current" aria-hidden="true" />
            <span>{`${profile.utcOffsetLabel} · ${profile.country}`}</span>
          </div>
        </div>

        <span
          class="mt-12 h-px w-full bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-primary)_36%,transparent)_50%,transparent)] mobile:mt-10"
          aria-hidden="true"
        />
      </section>
    </section>
  );
}
