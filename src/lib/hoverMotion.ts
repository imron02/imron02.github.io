import { animate, type AnimationPlaybackControls, type DOMKeyframesDefinition } from "motion";
import { prefersReducedMotion } from "./reduceMotion";

/**
 * Pointer-hover spring for plain DOM elements. Drives `transform` only — colour
 * and `box-shadow` stay CSS (`hover:` utilities + `transition-[…]`), so cva
 * variants restore their own shadow and `color-mix()` shadows interpolate
 * natively. Handlers no-op under `prefers-reduced-motion: reduce`; the inline
 * `transform` written by the settled leave spring is removed so CSS transforms
 * on the same element keep working.
 */

const spring = { type: "spring", stiffness: 400, damping: 25 } as const;

/** In-flight animation per element; a re-enter stops the running leave. */
const animations = new WeakMap<HTMLElement, AnimationPlaybackControls>();

export function hoverStart(el: HTMLElement, enter: DOMKeyframesDefinition) {
  if (prefersReducedMotion()) return;
  animations.get(el)?.stop();
  animations.set(el, animate(el, enter, spring));
}

export function hoverStop(el: HTMLElement, rest: DOMKeyframesDefinition) {
  const prev = animations.get(el);
  prev?.stop();
  if (!prev || prefersReducedMotion()) {
    el.style.removeProperty("transform");
    animations.delete(el);
    return;
  }
  const controls = animate(el, rest, spring);
  animations.set(el, controls);
  controls.finished
    .then(() => {
      // Only the latest leave spring may clear the inline transform.
      if (animations.get(el) !== controls) return;
      el.style.removeProperty("transform");
      animations.delete(el);
    })
    .catch(() => {});
}
