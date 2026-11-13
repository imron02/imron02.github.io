import { useStore } from "@nanostores/preact";
import { Bot } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { profile } from "../../data/profile";
import { prefersReducedMotion, REDUCED_MOTION_QUERY } from "../../lib/reduceMotion";
import { $isLoading } from "../../state/game";

const TYPING_MS = 45;
const DELETING_MS = 18;
const HOLD_MS = 2400;
const BETWEEN_MS = 350;

/** Random next line index other than `current`; only called when `count > 1`. */
const nextPhrase = (current: number, count: number): number =>
  (current + 1 + Math.floor(Math.random() * (count - 1))) % count;

export default function Companion() {
  const { companion } = profile;
  const isLoading = useStore($isLoading);
  const [text, setText] = useState(companion.lines[0]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const lines = companion.lines;

    if (reduced || prefersReducedMotion()) {
      setText(lines[0]);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let phrase = 0;
    let chars = lines[0].length;
    let deleting = true;

    const step = () => {
      if (deleting) {
        chars -= 1;
        setText(lines[phrase].slice(0, chars));

        if (chars > 0) {
          timer = setTimeout(step, DELETING_MS);
          return;
        }

        if (lines.length > 1) phrase = nextPhrase(phrase, lines.length);
        deleting = false;
        timer = setTimeout(step, BETWEEN_MS);
        return;
      }

      chars += 1;
      setText(lines[phrase].slice(0, chars));

      if (chars < lines[phrase].length) {
        timer = setTimeout(step, TYPING_MS);
        return;
      }

      deleting = true;
      timer = setTimeout(step, HOLD_MS);
    };

    timer = setTimeout(step, HOLD_MS);

    return () => clearTimeout(timer);
  }, [isLoading, reduced, companion.lines]);

  return (
    <aside
      class="flex items-end gap-2.5 w-[min(378px,100%)] mobile:w-42.5 mobile:gap-1.75 mobile:py-1.25 mobile:px-1.75 mobile:border mobile:border-[color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] mobile:rounded-xs mobile:bg-hud-panel-menu"
      aria-label="Support companion"
    >
      <span
        class="relative flex-[0_0_62px] grid place-items-center w-15.5 h-15.5 rounded-xs border border-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)] bg-hud-panel text-secondary-soft shadow-[0_0_26px_color-mix(in_srgb,var(--color-secondary)_30%,transparent)] short-900:flex-[0_0_50px] short-900:w-12.5 short-900:h-12.5 short-900:[&_svg]:w-5.5 short-900:[&_svg]:h-5.5 short-820:flex-[0_0_50px] short-820:w-12.5 short-820:h-12.5 short-820:[&_svg]:w-5.5 short-820:[&_svg]:h-5.5 mobile:flex-[0_0_22px] mobile:w-5.5 mobile:h-5.5 mobile:border-[color-mix(in_srgb,var(--color-secondary)_25%,transparent)] mobile:bg-hud-tile mobile:shadow-none mobile:[&_svg]:w-3.25 mobile:[&_svg]:h-3.25"
        aria-hidden="true"
      >
        <Bot class="motion-safe:animate-bot-bob" size={28} strokeWidth={1.5} />
        <span class="absolute left-12 top-2 w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_10px_color-mix(in_srgb,var(--color-success)_80%,transparent)] short-900:left-9.25 short-820:left-9.25 mobile:hidden">
          <span
            class="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--color-success)_70%,transparent)] motion-safe:animate-status-ping motion-reduce:hidden"
            aria-hidden="true"
          />
        </span>
        <span class="absolute left-2 top-12.5 w-11.5 h-px bg-[color-mix(in_srgb,var(--color-secondary)_30%,transparent)] short-900:top-10 short-900:w-8.5 short-820:top-10 short-820:w-8.5 mobile:hidden" />
      </span>
      <div class="grid gap-1.25 w-76.5 max-w-full py-2.5 px-3.5 border border-[color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] rounded-xs bg-hud-panel-strong mobile:w-auto mobile:gap-px mobile:p-0 mobile:border-0 mobile:bg-transparent">
        <p class="m-0 font-hud text-[8px] leading-[1.2] tracking-[1.4px] uppercase text-secondary mobile:text-[5.5px] mobile:tracking-[0.9px]">
          {`${companion.name} // ${companion.role}`}
        </p>
        <p class="relative m-0 min-h-[1.5em] font-body text-[12px] leading-normal text-text-primary short-900:text-[11px] short-820:text-[11px] mobile:min-h-[2.4em] mobile:text-[8px] mobile:leading-[1.2]">
          <span class="sr-only">{companion.lines[0]}</span>
          <span aria-hidden="true">{text}</span>
          <span
            class="ml-0.5 inline-block h-[1em] w-px align-text-bottom bg-secondary-soft motion-safe:animate-caret-blink"
            aria-hidden="true"
          />
        </p>
      </div>
    </aside>
  );
}
