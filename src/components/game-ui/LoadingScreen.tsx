import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";
import { cn } from "../../lib/cn";
import { gradientText } from "../../lib/typography";
import { $isLoading, $progress, gameActions } from "../../state/game";
import { MOBILE_QUERY, worldAssetUrls } from "../../lib/worldAssets";
import ProgressBar from "../ui/ProgressBar";

declare global {
  interface Window {
    __worldWarmProbe?: Promise<boolean>;
  }
}

const preloadTargets = (): string[] =>
  worldAssetUrls(import.meta.env.BASE_URL, window.matchMedia(MOBILE_QUERY).matches);

const MIN_LOADING_MS = 10_000;
const HARD_CEILING_MS = MIN_LOADING_MS + 2_000;
const HINT_ROTATE_MS = 2_500;

const loadingHints = [
  "Preparing your journey...",
  "Mapping the world canvas...",
  "Warming up the render engine...",
  "Summoning petal physics...",
  "Polishing the HUD crystals...",
  "Loading memories of Imron World...",
  "Brewing coffee for the boss fight...",
  "Almost there, adventurer...",
];

export default function LoadingScreen() {
  const isLoading = useStore($isLoading);
  const progress = useStore($progress);
  const [hint, setHint] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const targets = preloadTargets();
    let settled = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      gameActions.finishLoading();
    };

    const start = Date.now();
    const tick = window.setInterval(() => {
      if (finished) return;
      const t = Math.min(1, (Date.now() - start) / MIN_LOADING_MS);
      // ease-out: fast start, crawls near the cap; bar jumps to 100% on finish
      gameActions.setProgress(0.95 * (1 - (1 - t) * (1 - t)));
      if (t >= 1 && settled >= targets.length) finish();
    }, 100);

    // anti-stick ceiling: if a request hangs without load/error, still open the world
    const ceiling = window.setTimeout(finish, HARD_CEILING_MS);

    const onSettle = () => {
      settled += 1;
    };

    for (const path of targets) {
      const image = new Image();
      image.addEventListener("load", onSettle, { once: true });
      image.addEventListener("error", onSettle, { once: true });
      image.src = path;
    }

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(ceiling);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    const id = window.setInterval(() => {
      setHint(
        (i) =>
          (i + 1 + Math.floor(Math.random() * (loadingHints.length - 1))) % loadingHints.length,
      );
    }, HINT_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isLoading]);

  // warm HTTP cache: the inline head probe found every preload target cached, so the
  // world is already paintable — end the cover immediately instead of holding 10 s
  useEffect(() => {
    let cancelled = false;
    const probe = window.__worldWarmProbe ?? Promise.resolve(false);
    probe
      .catch(() => false)
      .then((warm) => {
        if (!cancelled && warm) gameActions.finishLoading();
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isLoading) return null;

  const percent = Math.round(progress * 100);

  return (
    <div
      id="loading-screen"
      role="status"
      class="fixed inset-0 z-50 grid place-content-center gap-4 text-center bg-[radial-gradient(circle_at_50%_40%,var(--color-surface)_0%,var(--color-bg)_70%)]"
    >
      <p
        class={cn(
          gradientText,
          "font-display text-[clamp(1.8rem,5vw,3rem)] tracking-[0.35em] uppercase",
        )}
      >
        IMRON WORLD
      </p>
      <p class="m-0 font-hud text-[9px] tracking-[0.18em] uppercase text-secondary">
        LOADING GAME WORLD
      </p>
      <div class="relative w-[min(22rem,70vw)] justify-self-center overflow-hidden rounded-xs">
        <ProgressBar value={percent} label="Loading game world" />
        <span
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-0 left-0 w-[35%] motion-safe:animate-bar-shimmer motion-reduce:hidden bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-text-primary)_25%,transparent),transparent)]"
        />
      </div>
      <p class="m-0 font-hud text-[8px] tracking-[0.12em] text-text-disabled">{percent}%</p>
      <p
        key={hint}
        aria-hidden="true"
        class="m-0 font-hud text-[9px] tracking-[0.18em] uppercase text-secondary motion-safe:animate-hint-fade"
      >
        {loadingHints[hint]}
      </p>
    </div>
  );
}
