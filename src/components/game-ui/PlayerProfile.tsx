import { profile, xpPercent } from "../../data/profile";
import Panel from "../ui/Panel";
import ProgressBar from "../ui/ProgressBar";

export default function PlayerProfile() {
  return (
    <Panel
      as="aside"
      variant="hud"
      accent="secondary"
      class="flex-none"
      bodyClass="p-0 gap-0"
      spineClass="bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]"
      aria-label="Player profile"
    >
      <div class="flex items-center gap-3.5 pt-4 px-4 pb-3 short-1000:pt-3 short-1000:px-4 short-1000:pb-2 short-900:pt-2.5 short-900:px-3.5 short-900:pb-1.5 short-900:gap-2.5 short-820:pt-2 short-820:px-3 short-820:pb-1.25 short-820:gap-2.5">
        <span class="relative flex-[0_0_60px] w-15 h-15 short-900:flex-[0_0_48px] short-900:w-12 short-900:h-12 short-820:flex-[0_0_40px] short-820:w-10 short-820:h-10">
          <span
            class="absolute inset-0 border border-[color:color-mix(in_srgb,var(--color-primary)_35%,transparent)] rounded-full"
            aria-hidden="true"
          />
          <img
            class="absolute left-1 top-1 block w-13 h-13 rounded-full object-cover short-900:left-0.75 short-900:top-0.75 short-900:w-10.5 short-900:h-10.5 short-820:left-0.5 short-820:top-0.5 short-820:w-9 short-820:h-9"
            src={`${import.meta.env.BASE_URL}${profile.avatar}`}
            width={52}
            height={52}
            alt=""
          />
          <span class="absolute right-0 bottom-0 grid place-items-center w-5.5 h-5.5 rounded-full bg-primary-dark border border-[color:color-mix(in_srgb,var(--color-accent-lilac)_60%,transparent)] font-hud text-[9px] font-bold leading-none text-text-primary short-900:w-4.5 short-900:h-4.5 short-900:text-[8px] short-820:w-4 short-820:h-4 short-820:text-[7px]">
            {profile.level}
          </span>
        </span>
        <div class="grid gap-0.75 min-w-0">
          <h2 class="m-0 font-display text-[17px] leading-[1.2] font-bold tracking-[0.4px] uppercase text-text-primary whitespace-nowrap overflow-hidden text-ellipsis short-900:text-[15px] short-820:text-[14px]">
            {profile.name}
          </h2>
          <p class="m-0 font-hud text-[9px] leading-[1.2] tracking-[1.4px] uppercase text-accent-lilac whitespace-nowrap overflow-hidden text-ellipsis short-900:text-[8px] short-820:text-[7.5px] short-820:tracking-[1px]">
            {profile.title}
          </p>
          <p class="m-0 flex items-center gap-2 pt-1 font-hud text-[8.5px] leading-[1.2] tracking-[1.2px] uppercase short-820:pt-0.5">
            <span class="text-accent-lilac">LV. {profile.level}</span>
            <span
              class="w-px h-2 bg-[color:color-mix(in_srgb,var(--color-text-primary)_15%,transparent)]"
              aria-hidden="true"
            />
            <span class="text-success">● ONLINE</span>
          </p>
        </div>
      </div>
      <div class="mt-5 grid gap-1.5 pt-0 px-4 pb-4 short-900:pt-0 short-900:px-3.5 short-900:pb-2.5 short-900:gap-0.75 short-820:pt-0 short-820:px-3 short-820:pb-2 short-820:gap-0.5">
        <div class="flex items-center justify-between gap-2 font-hud text-[8.5px] leading-[1.2] tracking-[1.6px] uppercase text-text-faint short-820:text-[7.5px]">
          <span>EXPERIENCE</span>
          <span class="tracking-[1px] text-text-primary">
            {profile.xp.current.toLocaleString("en-US")} / {profile.xp.goal.toLocaleString("en-US")}
          </span>
        </div>
        <ProgressBar
          value={xpPercent}
          label="Experience"
          class="h-1.25 rounded-[1px] bg-hud-track [&>span]:rounded-[1px] [&>span]:bg-[linear-gradient(90deg,var(--color-primary-hover),var(--color-accent-pink))] [&>span]:shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary-hover)_60%,transparent)]"
        />
      </div>
    </Panel>
  );
}
