import {
  House,
  Layers,
  BriefcaseBusiness,
  FolderGit2,
  Mail,
  Route,
  UserRound,
  Zap,
} from "lucide-preact";
import type { ComponentChildren } from "preact";
import { $section, gameActions } from "../../state/game";
import type { GameSection } from "../../state/game";
import NavItem from "../ui/NavItem";
import Panel from "../ui/Panel";
import { useStore } from "@nanostores/preact";

export const menuItems: {
  id: GameSection;
  label: string;
  icon: ComponentChildren;
  tabIcon: ComponentChildren;
}[] = [
  {
    id: "home",
    label: "Home",
    icon: <House size={14} strokeWidth={1.5} />,
    tabIcon: <House size={15} strokeWidth={1.5} />,
  },
  {
    id: "about",
    label: "About",
    icon: <UserRound size={14} strokeWidth={1.5} />,
    tabIcon: <UserRound size={15} strokeWidth={1.5} />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Layers size={14} strokeWidth={1.5} />,
    tabIcon: <FolderGit2 size={15} strokeWidth={1.5} />,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Zap size={14} strokeWidth={1.5} />,
    tabIcon: <Zap size={15} strokeWidth={1.5} />,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Route size={14} strokeWidth={1.5} />,
    tabIcon: <BriefcaseBusiness size={15} strokeWidth={1.5} />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail size={14} strokeWidth={1.5} />,
    tabIcon: <Mail size={15} strokeWidth={1.5} />,
  },
];

export default function GameMenu() {
  const section = useStore($section);

  return (
    <Panel
      as="nav"
      variant="hud"
      accent="primary"
      class="game-menu"
      aria-label="Main menu"
    >
      <div class="game-menu__head">
        <p class="ds-hud-label game-menu__label">// COMMAND</p>
        <span class="game-menu__count">
          {menuItems.length.toString().padStart(2, "0")}
        </span>
      </div>
      <ul class="ds-nav-list">
        {menuItems.map((item, index) => (
          <li key={item.id}>
            <NavItem
              index={String(index + 1).padStart(2, "0")}
              label={item.label.toUpperCase()}
              icon={item.icon}
              active={section === item.id}
              onClick={() => gameActions.goTo(item.id)}
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
}