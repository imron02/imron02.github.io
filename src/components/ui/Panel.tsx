import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "preact";
import { cn } from "../../lib/cn";

const panel = cva("relative flex min-w-0 text-left", {
  variants: {
    variant: {
      hud: "bg-hud-panel border border-[color:color-mix(in_srgb,var(--color-primary)_30%,transparent)] rounded-xs shadow-[0_18px_44px_var(--color-shadow-panel)] overflow-hidden",
      glass:
        "bg-tint-glass border border-tint-glass-border rounded-m overflow-hidden backdrop-blur-[18px]",
      floating:
        "bg-surface-elevated border border-accent-gold rounded-s shadow-[0_18px_40px_var(--color-shadow-panel)]",
      modal:
        "bg-surface-elevated border border-border rounded-m shadow-[0_24px_60px_var(--color-shadow-modal)]",
    },
  },
  defaultVariants: { variant: "hud" },
});

const body = cva("flex flex-col w-full min-w-0", {
  variants: {
    variant: {
      hud: "",
      glass: "py-4.5 px-5 gap-2.5",
      floating: "p-4.5 gap-2.5",
      modal: "p-5 gap-3",
    },
  },
  defaultVariants: { variant: "hud" },
});

const spine = cva("flex-[0_0_2px] w-0.5 self-stretch", {
  variants: {
    accent: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      gold: "bg-accent-gold",
      pink: "bg-accent-pink",
      danger: "bg-danger",
    },
  },
});

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "ref" | "role"> {
  variant?: "hud" | "glass" | "floating" | "modal";
  accent?: "primary" | "secondary" | "gold" | "pink" | "danger";
  as?: "section" | "aside" | "nav" | "div" | "article";
  bodyClass?: string;
  spine?: boolean;
  spineClass?: string;
}

export default function Panel({
  variant = "hud",
  accent,
  as = "section",
  spine: spineEnabled = true,
  bodyClass,
  spineClass,
  class: className,
  children,
  ...rest
}: PanelProps) {
  const Tag = as;
  const showsSpine = spineEnabled && (variant === "hud" || variant === "glass");
  const spineAccent = accent ?? (variant === "glass" ? "secondary" : "primary");

  return (
    <Tag class={cn(panel({ variant }), className)} {...rest}>
      {showsSpine ? (
        <span class={cn(spine({ accent: spineAccent }), spineClass)} aria-hidden="true" />
      ) : null}
      <div class={cn(body({ variant }), bodyClass)}>{children}</div>
    </Tag>
  );
}
