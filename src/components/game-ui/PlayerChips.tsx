import { chapterPercent, profile } from "../../data/profile";
import ProgressBar from "../ui/ProgressBar";
import { useLocalClock } from "./useLocalClock";

export default function PlayerChips() {
  const clock = useLocalClock();

  return (
    <div class="flex items-center gap-2 w-full font-hud uppercase mobile:gap-1">
      <div class="flex items-center gap-1.75 min-w-0 py-1 px-2 rounded-xs border border-[color:color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] bg-hud-chip xs:flex-[1_1_auto]">
        <img
          class="flex-[0_0_30px] w-7.5 h-7.5 rounded-full border border-[color:color-mix(in_srgb,var(--color-primary-hover)_50%,transparent)] object-cover"
          src={`${import.meta.env.BASE_URL}${profile.avatar}`}
          width={30}
          height={30}
          alt=""
        />
        <div class="grid gap-px min-w-0">
          <p class="m-0 font-body text-[10.5px] leading-[1.2] font-bold tracking-[0.2px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis xs:text-[9.5px]">
            {profile.name}
          </p>
          <p class="m-0 text-[7px] leading-[1.2] tracking-[0.7px] text-primary-hover">
            LV. {profile.level} · RANK {profile.rank}
          </p>
        </div>
      </div>
      <div class="grid gap-0.75 flex-[0_0_112px] w-28 ml-auto py-1.25 px-2 rounded-xs border border-[color:color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] bg-hud-chip xs:flex-[0_0_96px] xs:w-24">
        <div class="flex items-center justify-between text-[7px] leading-[1.2] tracking-[0.8px] text-secondary">
          <span>CH. {String(profile.chapter.index).padStart(2, "0")}</span>
          <span class="tracking-[0.4px] text-primary-hover">{chapterPercent}%</span>
        </div>
        <ProgressBar
          value={chapterPercent}
          label="Chapter progress"
          tone="secondary"
          class="h-0.5 rounded-none bg-[color:color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] [&>span]:rounded-none [&>span]:bg-[linear-gradient(90deg,var(--color-primary-hover),var(--color-secondary))]"
        />
        <p class="m-0 font-body text-[7.5px] tracking-[0] normal-case text-text-faint whitespace-nowrap overflow-hidden text-ellipsis">
          {profile.chapter.title}
        </p>
      </div>
      <div class="grid gap-0.5 flex-none text-right text-[7px] leading-[1.2] tracking-[0.6px]">
        <p class="m-0 text-text-faint whitespace-nowrap">{profile.locationShort.toUpperCase()}</p>
        <p class="m-0 text-text-faint whitespace-nowrap">
          {profile.utcOffsetLabel} · {clock ?? "--:--"}
        </p>
        <p class="m-0 text-text-faint whitespace-nowrap">● {profile.availability.toUpperCase()}</p>
      </div>
    </div>
  );
}
