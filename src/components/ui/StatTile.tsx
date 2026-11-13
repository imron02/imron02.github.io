import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const sub = cva("font-hud text-[8px] leading-[1.2] tracking-[0.12em] uppercase", {
  variants: {
    subTone: {
      secondary: "text-secondary",
      gold: "text-accent-gold",
      success: "text-success",
      danger: "text-danger",
      muted: "text-text-muted",
    },
  },
  defaultVariants: { subTone: "secondary" },
});

export interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  subTone?: "secondary" | "gold" | "success" | "danger" | "muted";
  class?: string;
}

export default function StatTile({
  label,
  value,
  sub: subText,
  subTone = "secondary",
  class: className,
}: StatTileProps) {
  return (
    <div
      class={cn(
        "flex flex-col gap-2 px-5.5 py-5 bg-surface border border-border rounded-m",
        className,
      )}
    >
      <span class="font-hud text-[8px] leading-[1.2] font-normal tracking-[0.18em] uppercase text-text-muted">
        {label}
      </span>
      <span class="font-display text-[28px] leading-none font-semibold text-text-primary">
        {value}
      </span>
      {subText ? <span class={sub({ subTone })}>{subText}</span> : null}
    </div>
  );
}
