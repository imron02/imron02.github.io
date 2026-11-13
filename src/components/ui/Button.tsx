import { cva } from "class-variance-authority";
import type { ComponentChildren, HTMLAttributes } from "preact";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "disabled";

const button = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-cta border border-transparent uppercase font-hud font-medium leading-none tracking-[0.18em] no-underline cursor-pointer transition-[translate,box-shadow,background-color,border-color,color,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2 aria-disabled:opacity-40 aria-disabled:shadow-none aria-disabled:translate-y-0 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "px-6 py-3.75 text-[11px] text-text-primary border-focus-ring bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-primary-dark))] shadow-[0_8px_26px_var(--color-glow-primary),inset_0_1px_0_var(--color-tint-highlight)] hover:bg-[linear-gradient(180deg,var(--color-accent-orchid),var(--color-primary))] hover:shadow-[0_10px_34px_color-mix(in_srgb,var(--color-primary)_65%,transparent)] hover:-translate-y-px active:bg-[linear-gradient(180deg,var(--color-primary),var(--color-primary-deep))] active:shadow-[inset_0_2px_6px_var(--color-shadow-inset-strong)] active:translate-y-0",
        secondary:
          "px-5 py-3.25 text-[10px] text-secondary border-secondary bg-tint-secondary hover:bg-[color:color-mix(in_srgb,var(--color-secondary)_15%,transparent)] hover:shadow-[0_0_14px_color-mix(in_srgb,var(--color-secondary)_35%,transparent)] hover:-translate-y-px active:bg-[color:color-mix(in_srgb,var(--color-secondary)_6%,transparent)] active:shadow-[inset_0_2px_6px_var(--color-shadow-inset)] active:translate-y-0",
        ghost:
          "px-5 py-3.75 text-[11px] text-text-secondary border-border bg-tint-ghost hover:bg-[color:color-mix(in_srgb,var(--color-text-primary)_8%,transparent)] hover:text-text-primary hover:border-primary hover:shadow-[0_0_14px_var(--color-glow-primary)] hover:-translate-y-px active:bg-[color:color-mix(in_srgb,var(--color-text-primary)_4%,transparent)] active:shadow-[inset_0_2px_6px_var(--color-shadow-inset)] active:translate-y-0",
        danger:
          "px-5 py-3.25 text-[10px] text-danger border-danger bg-tint-danger hover:bg-[color:color-mix(in_srgb,var(--color-danger)_15%,transparent)] hover:shadow-[0_0_14px_color-mix(in_srgb,var(--color-danger)_25%,transparent)] hover:-translate-y-px active:bg-[color:color-mix(in_srgb,var(--color-danger)_6%,transparent)] active:shadow-[inset_0_2px_6px_var(--color-shadow-inset)] active:translate-y-0",
        disabled:
          "px-5 py-3.25 text-[10px] text-text-disabled border-border-subtle bg-surface-hover opacity-60 cursor-not-allowed shadow-none translate-y-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface ButtonProps extends Omit<HTMLAttributes<HTMLElement>, "ref" | "role"> {
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
  const rootClass = cn(button({ variant }), className);

  const content = [
    icon ? (
      <span class="inline-flex" aria-hidden="true">
        {icon}
      </span>
    ) : null,
    <span>{children}</span>,
    variant === "primary" && trailingIcon ? (
      <span class="w-px h-3.5 bg-tint-divider" aria-hidden="true" />
    ) : null,
    trailingIcon ? (
      <span class="inline-flex" aria-hidden="true">
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
    <button type={type} class={rootClass} disabled={disabled || variant === "disabled"} {...rest}>
      {content}
    </button>
  );
}
