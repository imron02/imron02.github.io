import type { ComponentChildren } from "preact";
import { cn } from "../../../lib/cn";
import Panel from "../../ui/Panel";

export interface DesignPanelProps {
  id?: string;
  title: string;
  icon: ComponentChildren;
  meta?: ComponentChildren;
  class?: string;
  bodyClass?: string;
  /** Hover lift + primary glow for the interactive About cards. */
  interactive?: boolean;
  children: ComponentChildren;
}

const interactiveChrome =
  "transition-[translate,border-color,box-shadow] duration-200 ease-[ease] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] hover:shadow-[0_18px_44px_var(--color-shadow-panel),0_0_26px_color-mix(in_srgb,var(--color-primary)_22%,transparent)]";

/**
 * Archive panel chrome shared by the About overlay: HUD fill, purple hairline,
 * gradient accent spine, top-right corner tick and a compact HUD head.
 */
export default function DesignPanel({
  id,
  title,
  icon,
  meta,
  class: className,
  bodyClass,
  interactive,
  children,
}: DesignPanelProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <Panel
      as="section"
      variant="hud"
      class={cn("w-full bg-hud-panel-strong", interactive && interactiveChrome, className)}
      bodyClass="p-0 gap-0"
      spineClass="bg-[linear-gradient(180deg,var(--color-primary-hover),var(--color-secondary))]"
      aria-labelledby={headingId}
    >
      <span
        class="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
        aria-hidden="true"
      />
      <div class="flex items-center justify-between gap-3 h-10 pl-5.5 pr-5 border-b border-[color-mix(in_srgb,var(--color-text-primary)_10%,transparent)] mobile:h-9.5 mobile:px-3.5">
        <h2
          id={headingId}
          class="m-0 flex min-w-0 items-center gap-2 font-hud text-[9px] leading-none font-normal tracking-[1.9px] uppercase text-text-primary"
        >
          <span class="flex-none text-primary-hover" aria-hidden="true">
            {icon}
          </span>
          <span class="truncate">{title}</span>
        </h2>
        {meta ? <div class="flex flex-none items-center gap-2">{meta}</div> : null}
      </div>
      <div class={cn("flex min-w-0 flex-col gap-3.5 pt-4.5 pr-5 pb-5 pl-5.5", bodyClass)}>
        {children}
      </div>
    </Panel>
  );
}
