import { Maximize, Volume2 } from "lucide-preact";
import { profile } from "../../data/profile";

export default function SystemBar() {
  return (
    <div
      class="flex items-center gap-4 font-hud text-[8.5px] leading-[1.2] tracking-[1.4px] uppercase text-text-faint mobile:justify-start mobile:gap-2 mobile:min-h-4.5 mobile:text-[8px] mobile:tracking-[0.9px]"
      aria-hidden="true"
    >
      <span class="text-success mobile:tracking-[0.8px]">● ONLINE</span>
      <span class="w-px h-3.25 bg-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] mobile:h-2.25" />
      <span class="tracking-[1.2px] text-text-faint mobile:tracking-[0.9px]">
        SESSION {String(profile.session.index).padStart(2, "0")} — {profile.session.name}
      </span>
      <span class="flex gap-4 mobile:ml-auto mobile:gap-3">
        <span class="grid place-items-center w-7.5 h-7.5 rounded-xs border border-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] text-text-secondary mobile:w-auto mobile:h-auto mobile:border-0 mobile:rounded-none mobile:text-text-faint mobile:[&_svg]:w-3 mobile:[&_svg]:h-3">
          <Volume2 size={13} strokeWidth={1.5} />
        </span>
        <span class="grid place-items-center w-7.5 h-7.5 rounded-xs border border-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] text-text-secondary mobile:w-auto mobile:h-auto mobile:border-0 mobile:rounded-none mobile:text-text-faint mobile:[&_svg]:w-3 mobile:[&_svg]:h-3">
          <Maximize size={13} strokeWidth={1.5} />
        </span>
      </span>
    </div>
  );
}
