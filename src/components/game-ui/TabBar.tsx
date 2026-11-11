import { useStore } from "@nanostores/preact";
import { $section, gameActions } from "../../state/game";
import { menuItems } from "./GameMenu";

export default function TabBar() {
  const section = useStore($section);

  return (
    <nav class="tab-bar" aria-label="Main menu">
      <ul class="tab-bar__list">
        {menuItems.map((item) => {
          const active = section === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                class="tab-bar__item"
                aria-current={active ? "page" : undefined}
                onClick={() => gameActions.goTo(item.id)}
              >
                <span class="tab-bar__icon">{item.tabIcon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <span class="tab-bar__indicator" aria-hidden="true" />
    </nav>
  );
}