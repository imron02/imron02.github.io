import type { ComponentChildren } from "preact";

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
  const rootClass = ["ds-nav-item", className].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      class={rootClass}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      <span class="ds-nav-item__spine" aria-hidden="true" />
      <span class="ds-nav-item__icon" aria-hidden="true">
        {icon}
      </span>
      <span class="ds-nav-item__label">{label}</span>
      <span class="ds-nav-item__index">{index}</span>
    </button>
  );
}