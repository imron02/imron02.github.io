import { cn } from "../../../lib/cn";

export interface AboutSectionIdProps {
  id: string;
  class?: string;
}

/**
 * Design section-ID strip (`PLAYER / PROFILE / 001`) plus the green sync dot.
 * Presentational chrome for the About overlay header.
 */
export default function AboutSectionId({ id, class: className }: AboutSectionIdProps) {
  return (
    <div
      id={id}
      tabIndex={-1}
      class={cn(
        "flex min-w-0 flex-1 items-center gap-2 font-hud text-[9px] leading-none tracking-[3px] uppercase focus-visible:outline-none mobile:gap-1.5 mobile:text-[7.5px] mobile:tracking-[1.2px]",
        className,
      )}
    >
      <span class="w-6.5 h-px flex-none bg-primary mobile:hidden" aria-hidden="true" />
      <span class="text-text-muted">PLAYER</span>
      <span class="text-text-disabled" aria-hidden="true">
        /
      </span>
      <span class="text-text-primary">PROFILE</span>
      <span class="text-text-disabled" aria-hidden="true">
        /
      </span>
      <span class="text-primary-hover">001</span>
      <span class="flex-1" aria-hidden="true" />
      <span
        class="w-1.25 h-1.25 flex-none rounded-full bg-success shadow-[0_0_8px_color-mix(in_srgb,var(--color-success)_55%,transparent)]"
        aria-hidden="true"
      />
      <span class="text-[8px] leading-none tracking-[1.4px] uppercase text-text-dim mobile:text-[7px] mobile:tracking-[1.2px]">
        SYNCED
      </span>
    </div>
  );
}
