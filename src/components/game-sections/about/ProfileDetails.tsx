import { Award, Shield, Sparkles, Target } from "lucide-preact";
import { profile } from "../../../data/profile";
import { cn } from "../../../lib/cn";

const dataRows = [
  { index: "01", key: "EXPERIENCE", value: profile.yearsOfExperience, tone: "default" },
  { index: "02", key: "SPECIALIZATION", value: profile.specializationLabel, tone: "default" },
  { index: "03", key: "CURRENT FOCUS", value: profile.currentFocus, tone: "accent" },
  { index: "04", key: "LOCATION", value: profile.country, tone: "default" },
];

const trophies = [Award, Shield, Sparkles, Target];

const rule = "h-px w-full bg-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)]";

const COMPLETION_SEGMENTS = 12;
const filledSegments = Math.round((profile.completion / 100) * COMPLETION_SEGMENTS);

const segmentTone = (index: number) =>
  index >= filledSegments
    ? "bg-[color-mix(in_srgb,var(--color-text-primary)_7%,transparent)]"
    : index === filledSegments - 1
      ? "bg-accent-pink"
      : "bg-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]";

/**
 * Body content of the character sheet: dev statement, identity data rows,
 * profile completion meter and achievement trophies.
 */
export default function ProfileDetails() {
  return (
    <div class="flex flex-col gap-3.5 mobile:gap-3">
      <figure class="m-0 flex flex-col gap-1.5 border-l border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] pl-3">
        <blockquote class="m-0 font-body text-[12px] leading-[1.65] text-text-secondary mobile:text-[11.5px] mobile:leading-[1.6]">
          {profile.bio}
        </blockquote>
        <figcaption class="font-hud text-[7px] leading-none tracking-[1.3px] uppercase text-text-muted">
          {"// DEV STATEMENT"}
        </figcaption>
      </figure>

      <span class={rule} aria-hidden="true" />

      <dl class="m-0">
        {dataRows.map((row) => (
          <div
            key={row.key}
            class="flex items-center justify-between gap-4 h-8.5 border-t border-[color-mix(in_srgb,var(--color-text-primary)_7%,transparent)] first:border-t-0"
          >
            <dt class="flex items-baseline gap-2 font-hud text-[8px] leading-none tracking-[1.4px] uppercase text-text-muted">
              <span class="text-[7px] tracking-[1px] text-text-disabled" aria-hidden="true">
                {row.index}
              </span>
              {row.key}
            </dt>
            <dd
              class={cn(
                "m-0 font-hud text-[8px] leading-none tracking-[1.1px] uppercase text-text-primary",
                row.tone === "accent" && "text-primary-hover",
              )}
            >
              {row.value.toUpperCase()}
            </dd>
          </div>
        ))}
      </dl>

      <div class="flex flex-col gap-2 pt-4 border-t border-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)] mobile:pt-3.25 mobile:gap-2">
        <div class="flex items-center justify-between gap-3 font-hud text-[8px] leading-none tracking-[1.5px] uppercase text-text-muted">
          <span>PROFILE COMPLETION</span>
          <span class="tracking-[1.2px] text-primary-hover">{profile.completion}%</span>
        </div>
        <div class="flex items-center gap-0.75" aria-hidden="true">
          {Array.from({ length: COMPLETION_SEGMENTS }, (_, index) => (
            <span
              key={`completion-${index}`}
              class={cn("h-0.75 flex-1 rounded-[1px]", segmentTone(index))}
            />
          ))}
        </div>
      </div>

      <div class="flex items-center gap-2 pt-0.5 mobile:pt-2.75 mobile:border-t mobile:border-[color-mix(in_srgb,var(--color-text-primary)_9%,transparent)]">
        <ul class="flex items-center gap-2 list-none m-0 p-0">
          {trophies.map((Trophy, index) => (
            <li
              key={`trophy-${index}`}
              class="grid place-items-center w-7.5 h-7.5 rounded-xs border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-primary-hover mobile:w-6.5 mobile:h-6.5"
            >
              <Trophy size={13} strokeWidth={1.5} aria-hidden="true" />
            </li>
          ))}
        </ul>
        <span class="flex-1" aria-hidden="true" />
        <p class="m-0 font-hud text-[8px] leading-none tracking-[1.2px] uppercase text-text-dim mobile:text-[7.5px]">
          {profile.achievements} ACHIEVEMENTS
        </p>
      </div>
    </div>
  );
}
