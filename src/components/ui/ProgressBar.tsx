import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const bar = cva("block h-full rounded-[inherit] transition-[width] duration-200 ease-linear", {
  variants: {
    tone: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      gold: "bg-accent-gold",
      success: "bg-success",
      danger: "bg-danger",
    },
  },
  defaultVariants: { tone: "primary" },
});

export interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "primary" | "secondary" | "gold" | "success" | "danger";
  size?: "sm" | "md";
  class?: string;
}

export default function ProgressBar({
  value,
  label,
  tone = "primary",
  size = "sm",
  class: className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      class={cn(
        "w-full h-1 rounded-xs bg-[color:color-mix(in_srgb,var(--color-text-primary)_7%,transparent)] overflow-hidden",
        size === "md" ? "h-1.5" : "",
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
    >
      <span class={bar({ tone })} style={{ width: `${clamped}%` }} />
    </div>
  );
}
