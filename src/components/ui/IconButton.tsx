import { cva } from "class-variance-authority";
import type { ButtonHTMLAttributes, ComponentChildren } from "preact";
import { cn } from "../../lib/cn";

const iconButton = cva(
  "inline-flex items-center justify-center w-10.5 h-10.5 rounded-cta border border-border bg-surface-elevated text-text-secondary cursor-pointer transition-[background-color,border-color,color,box-shadow] duration-150 ease-[ease] hover:bg-surface-hover hover:border-primary hover:text-primary-hover hover:shadow-[0_0_16px_var(--color-glow-primary)] active:translate-y-px active:shadow-[inset_0_2px_6px_var(--color-shadow-inset)] disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2",
  {
    variants: {
      size: { md: "", sm: "w-7.5 h-7.5" },
      tone: { default: "", primary: "text-primary", danger: "text-danger" },
    },
    defaultVariants: { size: "md", tone: "default" },
  },
);

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  return (
    <button
      type={type}
      class={cn(iconButton({ size, tone }), className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      {icon}
    </button>
  );
}
