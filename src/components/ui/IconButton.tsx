import type { ButtonHTMLAttributes, ComponentChildren } from "preact";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ComponentChildren;
  tone?: "default" | "primary" | "danger";
  size?: "sm" | "md";
}

export default function IconButton({
  label,
  icon,
  tone = "default",
  size = "md",
  type = "button",
  class: className,
  ...rest
}: IconButtonProps) {
  const rootClass = [
    "ds-icon-button",
    size === "sm" ? "ds-icon-button--sm" : null,
    tone === "default" ? null : `ds-icon-button--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      class={rootClass}
      aria-label={label}
      title={label}
      {...rest}
    >
      {icon}
    </button>
  );
}