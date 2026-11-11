import { useStore } from "@nanostores/preact";
import { X } from "lucide-preact";
import type { ComponentType } from "preact";
import { useEffect } from "preact/hooks";
import { $section, gameActions } from "../../state/game";
import type { GameSection } from "../../state/game";
import AboutPanel from "../game-sections/AboutPanel";
import ProjectPanel from "../game-sections/ProjectPanel";
import SkillsTree from "../game-sections/SkillsTree";
import ExperienceLog from "../game-sections/ExperienceLog";
import ContactPanel from "../game-sections/ContactPanel";
import IconButton from "../ui/IconButton";
import Panel from "../ui/Panel";

type SectionId = Exclude<GameSection, "home">;

const sections: Record<SectionId, { label: string; Body: ComponentType }> = {
  about: { label: "CHARACTER PROFILE", Body: AboutPanel },
  projects: { label: "QUEST LOG", Body: ProjectPanel },
  skills: { label: "SKILL TREE", Body: SkillsTree },
  experience: { label: "ADVENTURE LOG", Body: ExperienceLog },
  contact: { label: "COMMUNICATION PORTAL", Body: ContactPanel },
};

const sectionOrder: SectionId[] = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
];

export default function SectionOverlay() {
  const section = useStore($section);

  const closeSection = () => {
    gameActions.goTo("home");
    requestAnimationFrame(() =>
      document.getElementById("welcome-title")?.focus(),
    );
  };

  useEffect(() => {
    if (section === "home") return;
    document.getElementById(`section-heading-${section}`)?.focus();
  }, [section]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || $section.get() === "home") return;
      closeSection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {sectionOrder.map((id) => {
        const { label, Body } = sections[id];
        return (
          <Panel
            key={id}
            variant="modal"
            class="section-overlay"
            hidden={section !== id}
            aria-labelledby={`section-heading-${id}`}
          >
            <div class="section-overlay__head">
              <p
                class="ds-hud-label section-overlay__heading"
                id={`section-heading-${id}`}
                tabIndex={-1}
              >
                {label} // ARCHIVE
              </p>
              <IconButton
                size="sm"
                label="Back to opening screen"
                icon={<X size={14} strokeWidth={1.5} />}
                onClick={closeSection}
              />
            </div>
            <div class="section-overlay__body">
              <Body />
            </div>
          </Panel>
        );
      })}
    </>
  );
}