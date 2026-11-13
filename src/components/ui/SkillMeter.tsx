import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const pip = cva("block w-2.5 h-1 rounded-full", {
  variants: {
    on: {
      true: "bg-primary shadow-[0_0_8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)]",
      false: "bg-[color:color-mix(in_srgb,var(--color-text-muted)_25%,transparent)]",
    },
  },
  defaultVariants: { on: false },
});

export interface SkillMeterProps {
  level: number;
  max?: number;
  label: string;
  class?: string;
}

export default function SkillMeter({ level, max = 4, label, class: className }: SkillMeterProps) {
  const steps = Array.from({ length: max }, (_, index) => index);

  return (
    <span class={cn("inline-flex gap-0.75", className)} role="img" aria-label={label}>
      {steps.map((index) => (
        <i key={index} class={pip({ on: index < level })} aria-hidden="true" />
      ))}
    </span>
  );
}
