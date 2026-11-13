import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, tuned for this design system.
 *
 * - "font-size" no longer conflicts with "leading": our typography recipes set
 *   `text-[14px] leading-[1.57]` and callers override only the size, which stock
 *   tailwind-merge would otherwise resolve by dropping the line-height.
 * - The project animations are registered so `motion-safe:animate-*`
 *   overrides collapse instead of piling up two animation shorthands.
 */
const twMerge = extendTailwindMerge({
  override: {
    conflictingClassGroups: { "font-size": [] },
  },
  extend: {
    theme: {
      animate: [
        "panel-float",
        "petal-float",
        "petal-float-long",
        "bar-shimmer",
        "hint-fade",
        "reveal-right",
        "reveal-up",
        "chevron-loop",
        "bot-bob",
        "status-ping",
        "glow-pulse",
        "sheen-sweep",
        "caret-blink",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
