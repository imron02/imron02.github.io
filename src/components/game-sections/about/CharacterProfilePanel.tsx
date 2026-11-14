import { IdCard, Swords } from "lucide-preact";
import DesignPanel from "./DesignPanel";
import ProfileDetails from "./ProfileDetails";
import ProfileIdentity from "./ProfileIdentity";

const refMeta = (
  <span class="flex items-baseline gap-1.5 font-hud text-[8px] leading-none tracking-[1.4px] uppercase text-text-muted">
    REF
    <span class="text-primary-hover">001-A</span>
  </span>
);

/** Desktop character profile panel (`ZkYnC`). */
export default function CharacterProfilePanel({
  class: className,
  interactive,
}: {
  class?: string;
  interactive?: boolean;
}) {
  return (
    <DesignPanel
      id="about-profile"
      title="CHARACTER PROFILE"
      icon={<Swords size={11} strokeWidth={1.5} />}
      meta={refMeta}
      class={className}
      interactive={interactive}
    >
      <ProfileIdentity />
      <span
        class="h-px w-full bg-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)]"
        aria-hidden="true"
      />
      <ProfileDetails />
    </DesignPanel>
  );
}

/** Mobile character sheet (`pcAYY`): same details, identity lives in the hero. */
export function CharacterSheetPanel({ class: className }: { class?: string }) {
  return (
    <DesignPanel
      id="about-sheet"
      title="CHARACTER SHEET"
      icon={<IdCard size={11} strokeWidth={1.5} />}
      meta={refMeta}
      class={className}
      bodyClass="pt-3.5 pr-3.5 pb-3.75 pl-3.5 gap-3"
    >
      <ProfileDetails />
    </DesignPanel>
  );
}
