import { cva } from "class-variance-authority";
import type { ComponentChildren } from "preact";
import { cn } from "../../lib/cn";

const badge = cva(
  "inline-flex items-center px-2.5 py-1.25 rounded-xs border font-hud text-[8px] leading-none font-normal tracking-[0.14em] uppercase whitespace-nowrap",
  {
    variants: {
      tone: {
        gold: "text-accent-gold border-accent-gold bg-tint-gold",
        primary: "text-primary-hover border-primary-hover bg-tint-primary",
        secondary: "text-secondary border-secondary bg-tint-secondary",
        muted: "text-text-muted border-text-muted bg-tint-ghost",
        success: "text-success border-success bg-tint-success",
        danger: "text-danger border-danger bg-tint-danger",
        info: "text-info border-info bg-tint-secondary",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export interface BadgeProps {
  tone?: "gold" | "primary" | "secondary" | "muted" | "success" | "danger" | "info";
  class?: string;
  children?: ComponentChildren;
}

export default function Badge({ tone = "muted", class: className, children }: BadgeProps) {
  return <span class={cn(badge({ tone }), className)}>{children}</span>;
}
