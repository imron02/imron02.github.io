/**
 * JS counterpart of the CSS `motion-safe:` / `motion-reduce:` pair. CSS still
 * neutralizes animation durations under reduce; this gate keeps JS-driven
 * transforms and the typewriter loop from starting at all.
 */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
