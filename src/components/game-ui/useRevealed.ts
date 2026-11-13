import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";
import { $isLoading } from "../../state/game";

/**
 * True once the loading cover is gone — and only after mount.
 *
 * Preact hydration does not patch attributes, so a class already true on the
 * first render (warm cache: loader gone before hydration) would never reach the
 * DOM. The post-mount state flag makes the reveal class appear one render later,
 * so the animation always plays. If `$isLoading` was already false at mount, the
 * HUD was painted without the reveal class, so replaying it would hide
 * already-visible content.
 */
export function useRevealed(): boolean {
  const isLoading = useStore($isLoading);
  const [animateOnReveal] = useState(() => $isLoading.get());
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (animateOnReveal && !isLoading) setRevealed(true);
  }, [animateOnReveal, isLoading]);

  return revealed;
}
