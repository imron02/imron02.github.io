import { cva } from "class-variance-authority";
import type { ComponentChildren } from "preact";
import { cn } from "../../lib/cn";

const item = cva(
  "flex items-center gap-3 w-full h-12 px-4 bg-transparent font-hud text-[12px] font-medium tracking-[1.5px] uppercase text-left cursor-pointer border-t transition-[background-color,color] duration-150 ease-[ease] focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:-outline-offset-2 short-1000:h-10.5 short-900:h-9.5 short-900:text-[11px] short-820:h-8 short-820:text-[10px] short-820:tracking-[1.2px]",
  {
    variants: {
      active: {
        false:
          "border-t-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] text-text-secondary hover:bg-[color-mix(in_srgb,var(--color-text-primary)_3%,transparent)] hover:text-text-primary",
        true: "border-t-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] text-text-primary shadow-[0_0_26px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] hover:text-text-primary",
      },
    },
    defaultVariants: { active: false },
  },
);

const spine = cva("flex-[0_0_2px] w-0.5 h-12 short-1000:h-10.5 short-900:h-9.5 short-820:h-8", {
  variants: {
    active: {
      false: "bg-transparent",
      true: "bg-primary-hover shadow-[0_0_14px_color-mix(in_srgb,var(--color-primary-hover)_80%,transparent)]",
    },
  },
  defaultVariants: { active: false },
});

export interface NavItemProps {
  index: string;
  label: string;
  icon: ComponentChildren;
  active?: boolean;
  onClick: () => void;
  class?: string;
}

export default function NavItem({
  index,
  label,
  icon,
  active = false,
  onClick,
  class: className,
}: NavItemProps) {
  return (
    <button
      type="button"
      class={cn(item({ active }), className)}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      <span class={spine({ active })} aria-hidden="true" />
      <span class={cn("inline-flex", active ? "text-accent-lilac" : "text-text-muted")}>
        {icon}
      </span>
      <span class={cn("flex-1", active ? "text-text-primary" : "text-text-secondary")}>
        {label}
      </span>
      <span
        class={cn("text-[7.5px] tracking-[1px]", active ? "text-primary-hover" : "text-text-ghost")}
      >
        {index}
      </span>
    </button>
  );
}
