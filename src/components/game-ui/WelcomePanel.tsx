import { useStore } from "@nanostores/preact";
import { Play } from "lucide-preact";
import { useEffect } from "preact/hooks";
import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { hoverStart, hoverStop } from "../../lib/hoverMotion";
import { $section, gameActions } from "../../state/game";

// Shared prefix of the four corner brackets around the CTA.
const cornerBracket =
  "absolute w-3.25 h-3.25 border-[color-mix(in_srgb,var(--color-accent-orchid)_70%,transparent)] pointer-events-none";

// Inner chevron glyph; stagger and hover shift are handled by the wrapper.
const chevron =
  "w-1.75 h-1.75 border-t-[1.5px] border-r-[1.5px] border-text-primary transform-[rotate(45deg)] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[ease] motion-safe:group-hover:transform-[translateX(3px)_rotate(45deg)] mobile:w-1.25 mobile:h-1.25";

const hoverEnter = { scale: 1.03 };

const hoverRest = { scale: 1 };

export default function WelcomePanel() {
  const section = useStore($section);
  const isPlaying = section !== "home";

  useEffect(() => {
    if (isPlaying) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      const target = event.target;
      if (target instanceof Element && target.closest("button, a, input, textarea, select")) {
        return;
      }
      gameActions.goTo("about");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPlaying]);

  if (isPlaying) return null;

  return (
    <section
      class="grid gap-5.5 pb-1.5 motion-safe:animate-panel-float short-1000:gap-4.5 short-900:gap-3.5 short-820:gap-2.5 mobile:gap-3 mobile:pb-0 mobile:w-full"
      aria-label="Welcome"
    >
      <div class="flex items-center gap-3 mobile:gap-2.5">
        <span class="w-6.5 h-px bg-primary mobile:w-5" aria-hidden="true" />
        <span class="font-hud text-[10px] leading-[1.2] tracking-[3.2px] uppercase text-accent-lilac mobile:text-[7.5px] mobile:tracking-[2.4px]">
          WELCOME TO MY WORLD
        </span>
      </div>
      <h1
        class="m-0 font-display text-[clamp(2.6rem,4.375vw,5.25rem)] leading-[0.94] font-bold tracking-[-2px] uppercase bg-[linear-gradient(180deg,var(--color-text-primary)_0%,var(--color-accent-ice)_40%,var(--color-accent-orchid)_75%,var(--color-primary-hover)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent short-1000:text-[clamp(2.4rem,4.05vw,4.6rem)] short-900:text-[clamp(2.2rem,3.75vw,4rem)] short-820:text-[clamp(2rem,3.4vw,3.4rem)] mobile:text-[40px] mobile:leading-[0.92] mobile:tracking-[-1.2px]"
        id="welcome-title"
        tabIndex={-1}
      >
        <span class="block mobile:inline">Build.</span>{" "}
        <span class="block mobile:inline">Play.</span> <span class="block">Explore.</span>
      </h1>
      <p class="m-0 font-body text-[15px] leading-[1.6] text-text-secondary short-900:text-[13px] short-820:text-[13px] mobile:text-[12px] mobile:leading-normal">
        {profile.tagline}
      </p>
      <div class="relative w-full h-32.5 short-1000:h-29.5 short-900:h-27 short-820:h-24 mobile:h-17.25">
        <button
          type="button"
          class="absolute left-3 top-5 flex items-center justify-center gap-3.5 w-[min(368px,calc(100%-24px))] h-19.5 py-0 px-7.5 border border-cta-stroke rounded-cta bg-[linear-gradient(90deg,var(--color-cta-start)_0%,var(--color-cta-mid)_32%,var(--color-cta-deep)_68%,var(--color-cta-end)_100%)] text-text-primary font-hud text-[17px] font-bold tracking-[2.8px] uppercase cursor-pointer overflow-hidden shadow-[0_8px_26px_color-mix(in_srgb,var(--color-primary)_20%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--color-text-primary)_24%,transparent)] transition-[box-shadow,filter] duration-200 ease-[ease] hover:shadow-[0_10px_34px_color-mix(in_srgb,var(--color-primary)_35%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--color-text-primary)_24%,transparent)] hover:brightness-[1.08] group short-1000:h-17 short-900:h-15.5 short-900:top-4 short-820:h-14 short-820:top-3 mobile:left-0 mobile:top-2.25 mobile:w-full mobile:h-13 mobile:gap-2.5 mobile:py-0 mobile:px-6 mobile:text-[13px] mobile:tracking-[2.6px]"
          onClick={() => gameActions.goTo("about")}
          onPointerEnter={(event) => hoverStart(event.currentTarget, hoverEnter)}
          onPointerLeave={(event) => hoverStop(event.currentTarget, hoverRest)}
        >
          <span
            class="absolute left-0 top-0 w-full h-5.5 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-text-primary)_12%,transparent)_0%,transparent_100%)] mobile:h-4"
            aria-hidden="true"
          />
          <span
            class="absolute left-0 top-0 w-0.75 h-full bg-[color-mix(in_srgb,var(--color-text-primary)_55%,transparent)] mobile:w-0.5"
            aria-hidden="true"
          />
          <span
            class="absolute inset-1.25 border border-[color-mix(in_srgb,var(--color-text-primary)_18%,transparent)] rounded-[1px] mobile:inset-1"
            aria-hidden="true"
          />
          <Play
            class="relative flex-none mobile:w-4.25 mobile:h-4.25"
            size={22}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span class="relative leading-none">START PLAY</span>
          <span class="relative w-1.5 h-px mobile:w-1" aria-hidden="true" />
          <span class="relative inline-flex items-center gap-2 mobile:gap-1.25" aria-hidden="true">
            <span class="inline-flex motion-safe:animate-chevron-loop">
              <span class={cn(chevron, "opacity-90")} />
            </span>
            <span
              class="inline-flex motion-safe:animate-chevron-loop"
              style={{ animationDelay: "160ms" }}
            >
              <span class={cn(chevron, "opacity-50 motion-safe:group-hover:delay-75")} />
            </span>
            <span
              class="inline-flex motion-safe:animate-chevron-loop"
              style={{ animationDelay: "320ms" }}
            >
              <span class={cn(chevron, "opacity-22 motion-safe:group-hover:delay-150")} />
            </span>
          </span>
        </button>
        <span
          class={cn(
            cornerBracket,
            "top-2 left-0 border-t border-l mobile:w-2.25 mobile:h-2.25 mobile:top-0",
          )}
          aria-hidden="true"
        />
        <span
          class={cn(
            cornerBracket,
            "top-2 right-0 border-t border-r mobile:w-2.25 mobile:h-2.25 mobile:top-0",
          )}
          aria-hidden="true"
        />
        <span
          class={cn(
            cornerBracket,
            "bottom-5 left-0 border-b border-l short-900:bottom-4.25 short-820:bottom-3 mobile:w-2.25 mobile:h-2.25 mobile:bottom-0",
          )}
          aria-hidden="true"
        />
        <span
          class={cn(
            cornerBracket,
            "bottom-5 right-0 border-b border-r short-900:bottom-4.25 short-820:bottom-3 mobile:w-2.25 mobile:h-2.25 mobile:bottom-0",
          )}
          aria-hidden="true"
        />
      </div>
      <p class="flex items-center gap-2.5 m-0 font-hud text-[8.5px] leading-[1.2] tracking-[1.6px] uppercase text-text-faint mobile:gap-1.75 mobile:text-[7.5px] mobile:tracking-[1.5px] mobile:text-text-ghost">
        <span class="py-1.25 px-2.25 border border-[color-mix(in_srgb,var(--color-text-primary)_20%,transparent)] rounded-[1px] bg-[color-mix(in_srgb,var(--color-text-primary)_6%,transparent)] text-[8px] tracking-[1.2px] text-text-secondary mobile:hidden">
          ENTER
        </span>
        <span class="mobile:hidden">PRESS TO BEGIN THE JOURNEY</span>
        <span class="hidden mobile:inline">TAP TO BEGIN THE JOURNEY</span>
        <span class="w-px h-2.75 bg-primary-hover mobile:h-2" aria-hidden="true" />
      </p>
    </section>
  );
}
