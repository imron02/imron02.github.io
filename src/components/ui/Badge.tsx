import type { ComponentChildren } from "preact";

export interface BadgeProps {
  tone?: "gold" | "primary" | "secondary" | "muted" | "success" | "danger" | "info";
  class?: string;
  children?: ComponentChildren;
}

export default function Badge({
  tone = "muted",
  class: className,
  children,
}: BadgeProps) {
  const rootClass = ["ds-badge", `ds-badge--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return <span class={rootClass}>{children}</span>;
}