import type { ComponentChildren, HTMLAttributes } from "preact";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "disabled";

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLElement>, "ref" | "role"> {
  variant?: ButtonVariant;
  icon?: ComponentChildren;
  trailingIcon?: ComponentChildren;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  icon,
  trailingIcon,
  href,
  external = false,
  disabled = false,
  type = "button",
  class: className,
  children,
  ...rest
}: ButtonProps) {
  const rootClass = ["ds-button", `ds-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const content = [
    icon ? (
      <span class="ds-button__icon" aria-hidden="true">
        {icon}
      </span>
    ) : null,
    <span>{children}</span>,
    variant === "primary" && trailingIcon ? (
      <span class="ds-button__divider" aria-hidden="true" />
    ) : null,
    trailingIcon ? (
      <span class="ds-button__icon" aria-hidden="true">
        {trailingIcon}
      </span>
    ) : null,
  ];

  if (href) {
    return (
      <a
        href={href}
        class={rootClass}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-disabled={disabled ? "true" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      class={rootClass}
      disabled={disabled || variant === "disabled"}
      {...rest}
    >
      {content}
    </button>
  );
}