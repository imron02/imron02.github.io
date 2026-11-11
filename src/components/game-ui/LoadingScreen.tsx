import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { $isLoading, $progress, gameActions } from "../../state/game";
import ProgressBar from "../ui/ProgressBar";

const preloadTargets = (): string[] => [
  "images/world-bg.webp",
  window.matchMedia("(max-width: 1023px)").matches
    ? "images/character-mobile.webp"
    : "images/character.webp",
];

export default function LoadingScreen() {
  const isLoading = useStore($isLoading);
  const progress = useStore($progress);

  useEffect(() => {
    if (!isLoading) return;

    let settled = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      gameActions.finishLoading();
    };

    const fallback = window.setTimeout(finish, 3000);
    gameActions.setProgress(0.15);

    const targets = preloadTargets();

    const onSettle = () => {
      if (finished) return;
      settled += 1;
      gameActions.setProgress(0.15 + (settled / targets.length) * 0.85);
      if (settled >= targets.length) finish();
    };

    for (const path of targets) {
      const image = new Image();
      image.addEventListener("load", onSettle, { once: true });
      image.addEventListener("error", onSettle, { once: true });
      image.src = `${import.meta.env.BASE_URL}${path}`;
    }

    return () => window.clearTimeout(fallback);
  }, [isLoading]);

  if (!isLoading) return null;

  const percent = Math.round(progress * 100);

  return (
    <div class="loading-screen" role="status">
      <p class="loading-screen__title ds-gradient-text">IMRON WORLD</p>
      <p class="loading-screen__label">LOADING GAME WORLD</p>
      <ProgressBar value={percent} label="Loading game world" />
      <p class="loading-screen__percent">{percent}%</p>
      <p class="loading-screen__label">Preparing your journey...</p>
    </div>
  );
}