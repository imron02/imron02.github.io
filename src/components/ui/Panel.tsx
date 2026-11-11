import type { HTMLAttributes } from "preact";

export interface PanelProps
  extends Omit<HTMLAttributes<HTMLElement>, "ref" | "role"> {
  variant?: "hud" | "glass" | "floating" | "modal";
  accent?: "primary" | "secondary" | "gold" | "pink" | "danger";
  as?: "section" | "aside" | "nav" | "div" | "article";
}

export default function Panel({
  variant = "hud",
  accent,
  as = "section",
  class: className,
  children,
  ...rest
}: PanelProps) {
  const Tag = as;
  const rootClass = ["ds-panel", `ds-panel--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const showsSpine = variant === "hud" || variant === "glass";
  const spineAccent = accent ?? (variant === "glass" ? "secondary" : "primary");

  return (
    <Tag class={rootClass} {...rest}>
      {showsSpine ? (
        <span class={`ds-panel__spine ds-panel__spine--${spineAccent}`} aria-hidden="true" />
      ) : null}
      <div class="ds-panel__body">{children}</div>
    </Tag>
  );
}