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
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";

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
      class="flex-none bg-hud-panel-menu border-[color:color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
      spine={false}
      bodyClass="p-0 gap-0"
      aria-label="Main menu"
    >
      <div class="flex items-center justify-between gap-2 h-9 px-4 short-1000:h-7.5 short-900:h-7 short-820:h-6">
        <p class={cn(text({ role: "hud-label" }), "text-[9.5px] tracking-[2px] text-text-faint")}>
          {"// COMMAND"}
        </p>
        <span class="font-hud text-[9.5px] leading-[1.2] tracking-[1.4px] text-primary-hover">
          {menuItems.length.toString().padStart(2, "0")}
        </span>
      </div>
      <ul class="list-none m-0 p-0">
        {menuItems.map((item, index) => (
          <li key={item.id}>
            <NavItem
              index={String(index + 1).padStart(2, "0")}
              label={item.label.toUpperCase()}
              icon={item.icon}
              active={section === item.id}
              onClick={() => gameActions.goTo(item.id)}
              class={section === item.id || index === 0 ? undefined : "border-t-border-subtle"}
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
