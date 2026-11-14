import { useStore } from "@nanostores/preact";
import { cn } from "../../lib/cn";
import { $section } from "../../state/game";
import AttributesPanel from "./about/AttributesPanel";
import AdventureLogPanel from "./about/AdventureLogPanel";
import CharacterProfilePanel, { CharacterSheetPanel } from "./about/CharacterProfilePanel";
import EquippedTechPanel from "./about/EquippedTechPanel";
import ProfileIdentity from "./about/ProfileIdentity";
import StatusSummaryPanel from "./about/StatusSummaryPanel";

const reveal = "motion-safe:animate-reveal-card";

/**
 * About overlay: whole `LnfWr` composition on desktop (profile in the centre
 * column, attributes + equipped tech on the right, adventure log spanning the
 * full frame); `lTXor` stack on mobile.
 */
export default function AboutPanel() {
  const section = useStore($section);
  const open = section === "about";

  return (
    <div class="grid gap-3.5">
      {/* Mobile hero identity (`ybUnv`) — hidden on desktop. */}
      <div class="hidden mobile:block mobile:px-6 mobile:pt-2.5">
        <ProfileIdentity chips class="mobile:gap-2.5" />
      </div>

      <div class="hidden mobile:grid mobile:gap-3.5 mobile:px-6 mobile:pt-2.5 mobile:pb-4">
        <CharacterSheetPanel />
        <StatusSummaryPanel />
        <AttributesPanel />
        <EquippedTechPanel />
        <AdventureLogPanel />
      </div>

      <div class="grid grid-cols-1 items-start gap-x-[clamp(12px,1.46vw,28px)] gap-y-3.5 mobile:hidden xl:grid-cols-[minmax(0,25rem)_minmax(0,24rem)] xl:justify-between">
        <div class={cn("min-w-0", open && reveal)} style={{ animationDelay: "0ms" }}>
          <CharacterProfilePanel interactive />
        </div>
        <div class="grid w-full gap-3.5">
          <div class={cn("min-w-0", open && reveal)} style={{ animationDelay: "100ms" }}>
            <AttributesPanel interactive />
          </div>
          <div class={cn("min-w-0", open && reveal)} style={{ animationDelay: "200ms" }}>
            <EquippedTechPanel interactive />
          </div>
        </div>
        <div
          class={cn("min-w-0 xl:col-span-2", open && reveal)}
          style={{ animationDelay: "300ms" }}
        >
          <AdventureLogPanel interactive />
        </div>
      </div>
    </div>
  );
}
