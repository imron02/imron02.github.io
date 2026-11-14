import { profile } from "../../../data/profile";
import { cn } from "../../../lib/cn";

export interface ProfileIdentityProps {
  /** Hero variant shows the level/rank/sanctum meta chips below the class row. */
  chips?: boolean;
  class?: string;
}

/**
 * Portrait identity block: availability chip, gradient name, class row.
 * The desktop profile panel and the mobile hero both mount it.
 */
export default function ProfileIdentity({ chips = false, class: className }: ProfileIdentityProps) {
  const metaChips = [
    { label: `LV. ${profile.level}`, class: "text-accent-lilac" },
    { label: `RANK ${profile.rank}`, class: "text-accent-gold" },
    {
      label: `SANCTUM ${String(profile.chapter.index).padStart(2, "0")}`,
      class: "text-text-dim",
    },
  ];

  return (
    <div class={cn("flex flex-col gap-1.5", className)}>
      <p class="m-0 flex w-fit items-center gap-1.5 px-2 py-1 rounded-[1px] border border-[color-mix(in_srgb,var(--color-success)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)] font-hud text-[7.5px] leading-none font-normal tracking-[1.3px] uppercase text-[color-mix(in_srgb,var(--color-success)_70%,var(--color-text-primary))]">
        <span
          class="w-1.25 h-1.25 flex-none rounded-full bg-success shadow-[0_0_6px_color-mix(in_srgb,var(--color-success)_60%,transparent)]"
          aria-hidden="true"
        />
        {profile.availability}
        <span
          class="ml-3.5 text-[color-mix(in_srgb,var(--color-success)_60%,transparent)]"
          aria-hidden="true"
        >
          ◈
        </span>
      </p>
      <p class="m-0 font-display text-[30px] leading-[1.05] font-bold tracking-[-0.6px] uppercase bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_45%,var(--color-accent-orchid)_80%,var(--color-primary-hover)_100%)] bg-clip-text text-transparent mobile:text-[34px] mobile:leading-none mobile:tracking-[-0.8px]">
        {profile.name}
      </p>
      <p class="m-0 flex min-w-0 items-center gap-2 font-hud text-[9px] leading-none font-normal tracking-[1.8px] uppercase text-accent-lilac">
        <span class="flex-none text-secondary" aria-hidden="true">
          ⚔
        </span>
        <span class="truncate">{profile.title}</span>
        <span class="flex-1" aria-hidden="true" />
        <span class="flex-none text-[7px] tracking-[1.2px] text-text-muted">PRIMARY CLASS</span>
      </p>
      {chips ? (
        <ul class="flex flex-wrap items-center gap-1.5 list-none m-0 mt-1 p-0">
          {metaChips.map((chip) => (
            <li
              key={chip.label}
              class={cn(
                "px-1.5 py-0.75 rounded-[1px] border border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-text-primary)_3%,transparent)] font-hud text-[7px] leading-none font-normal tracking-[1px] uppercase",
                chip.class,
              )}
            >
              {chip.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
