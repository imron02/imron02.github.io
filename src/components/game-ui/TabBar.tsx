import { cva } from "class-variance-authority";
import { useStore } from "@nanostores/preact";
import { cn } from "../../lib/cn";
import { $section, gameActions } from "../../state/game";
import { menuItems } from "./GameMenu";

const tabItem = cva(
  "flex flex-col items-center justify-center gap-1 w-16.5 h-13 p-0 border-0 bg-none font-hud text-[6px] tracking-[0.7px] uppercase whitespace-nowrap cursor-pointer text-text-ghost xs:w-14.5",
  {
    variants: {
      active: {
        true: "text-text-primary",
      },
    },
  },
);

const tabIcon = cva("grid place-items-center w-6.5 h-5 rounded-xs text-inherit", {
  variants: {
    active: {
      true: "bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] text-accent-lilac",
    },
  },
});

export default function TabBar() {
  const section = useStore($section);

  return (
    <nav
      class="hidden mobile:flex flex-col px-2.5 pt-1.5 pb-2.5 bg-hud-bar shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text-primary)_12%,transparent)]"
      aria-label="Main menu"
    >
      <ul class="flex items-center justify-between gap-0.5 list-none m-0 p-0 h-13">
        {menuItems.map((item) => {
          const active = section === item.id;
          return (
            <li key={item.id} class="flex-[0_0_auto]">
              <button
                type="button"
                class={cn(tabItem({ active }))}
                aria-current={active ? "page" : undefined}
                onClick={() => gameActions.goTo(item.id)}
              >
                <span class={cn(tabIcon({ active }))}>{item.tabIcon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <span
        class="block w-33.5 h-1 mx-auto my-1.5 rounded-xs bg-[color-mix(in_srgb,var(--color-text-primary)_60%,transparent)]"
        aria-hidden="true"
      />
    </nav>
  );
}
