import type { ComponentChildren } from "preact";
import { cn } from "../../../lib/cn";
import Panel from "../../ui/Panel";

const spineTone = {
  gold: "bg-[linear-gradient(180deg,var(--color-accent-gold),var(--color-accent-pink))]",
  primary: "bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]",
  pink: "bg-[linear-gradient(180deg,var(--color-accent-pink),var(--color-primary))]",
  secondary: "bg-[linear-gradient(180deg,var(--color-secondary),var(--color-primary))]",
} as const;

export interface SkillsPanelProps {
  id?: string;
  title: string;
  icon: ComponentChildren;
  meta?: ComponentChildren;
  foot?: ComponentChildren;
  tone?: keyof typeof spineTone;
  class?: string;
  bodyClass?: string;
  children: ComponentChildren;
}

/**
 * Side-rail chrome for the Skills inventory: 36px HUD head, optional foot and a
 * tone-driven accent spine. The body is unpadded so every panel owns its layout.
 */
export default function SkillsPanel({
  id,
  title,
  icon,
  meta,
  foot,
  tone = "primary",
  class: className,
  bodyClass,
  children,
}: SkillsPanelProps) {
  return (
    <Panel
      as="section"
      variant="hud"
      class={cn("w-full bg-hud-panel-strong", className)}
      bodyClass="p-0 gap-0"
      spineClass={spineTone[tone]}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div class="flex h-10 flex-none items-center justify-between gap-3 border-b border-border-subtle pl-4 pr-3.5">
        <h2
          id={id ? `${id}-heading` : undefined}
          class="m-0 flex min-w-0 items-center gap-2 font-hud text-[11px] leading-none font-normal tracking-[1.9px] uppercase text-text-primary"
        >
          <span class="flex-none text-primary-hover" aria-hidden="true">
            {icon}
          </span>
          <span class="truncate">{title}</span>
        </h2>
        {meta ? <div class="flex flex-none items-center gap-2">{meta}</div> : null}
      </div>
      <div class={cn("flex min-w-0 flex-col", bodyClass)}>{children}</div>
      {foot ? (
        <div class="flex h-10 flex-none items-center justify-between gap-2 border-t border-border-subtle px-3.5">
          {foot}
        </div>
      ) : null}
    </Panel>
  );
}
