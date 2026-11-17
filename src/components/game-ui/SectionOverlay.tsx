import { useStore } from "@nanostores/preact";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-preact";
import type { ComponentType } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { $section, gameActions } from "../../state/game";
import type { GameSection } from "../../state/game";
import AboutPanel from "../game-sections/AboutPanel";
import AboutSectionId from "../game-sections/about/AboutSectionId";
import ProjectsArchive from "../game-sections/ProjectsArchive";
import SkillsArchive from "../game-sections/SkillsArchive";
import ExperienceLog from "../game-sections/ExperienceLog";
import ContactPanel from "../game-sections/ContactPanel";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Panel from "../ui/Panel";
import CloseButton from "./CloseButton";
import { cn } from "../../lib/cn";
import { prefersReducedMotion } from "../../lib/reduceMotion";
import { text } from "../../lib/typography";

type SectionId = Exclude<GameSection, "home">;

/** About, Projects and Skills float their own compositions over the world; the rest render inside the modal shell. */
type ModalSectionId = Exclude<SectionId, "about" | "projects" | "skills">;

const sections: Record<ModalSectionId, { label: string; Body: ComponentType }> = {
  experience: { label: "ADVENTURE LOG", Body: ExperienceLog },
  contact: { label: "COMMUNICATION PORTAL", Body: ContactPanel },
};

// Insertion order = panel order in the overlay.
const sectionOrder = Object.keys(sections) as ModalSectionId[];

/** About composition (`LnfWr` / `lTXor`): design header + floating panels, no modal shell. */
function AboutOverlay({ active, onClose }: { active: boolean; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [atBottom, setAtBottom] = useState(true);

  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight <= 8);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild instanceof HTMLElement) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [active]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div
      hidden={!active}
      data-about-active={active ? "true" : undefined}
      class="pointer-events-auto relative flex h-full min-h-0 w-full flex-col gap-3.5 rounded-m bg-[color-mix(in_srgb,var(--color-void)_62%,transparent)] p-3.5 mobile:rounded-none mobile:bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--color-void)_55%,transparent)_58%,var(--color-void)_78%)] mobile:p-0 mobile:pt-[env(safe-area-inset-top)]"
    >
      <div class="flex flex-none items-center justify-between gap-3 pt-1 mobile:rounded-xs mobile:bg-[color-mix(in_srgb,var(--color-void)_78%,transparent)] mobile:px-3 mobile:pb-2.5 mobile:pt-0 mobile:backdrop-blur-[2px] mt-3.5">
        <AboutSectionId id="section-heading-about" />
        <span class="flex mobile:order-first">
          <CloseButton onClose={onClose} />
        </span>
      </div>
      <div ref={scrollRef} class="min-h-0 flex-1 overflow-y-auto scrollbar-none">
        <AboutPanel />
        <div class="hidden mobile:block mobile:px-6 mobile:pb-4.5 mobile:pt-3">
          <Button
            variant="ghost"
            class="w-full justify-between"
            icon={<ArrowLeft size={13} strokeWidth={1.5} />}
            trailingIcon={<ChevronRight size={13} strokeWidth={1.5} />}
            onClick={onClose}
          >
            RETURN TO WORLD
          </Button>
        </div>
      </div>
      <div
        class={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-[linear-gradient(0deg,var(--color-void)_0%,transparent_100%)] pt-12 pb-3 mobile:hidden",
          atBottom && "hidden",
        )}
      >
        <IconButton
          size="sm"
          label="Scroll to the end of the profile"
          class="pointer-events-auto rounded-full"
          icon={
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              class="motion-safe:animate-scroll-cue motion-reduce:animate-none"
            />
          }
          onClick={scrollToBottom}
        />
      </div>
    </div>
  );
}

export default function SectionOverlay() {
  const section = useStore($section);

  const closeSection = () => {
    gameActions.goTo("home");
    requestAnimationFrame(() => document.getElementById("welcome-title")?.focus());
  };

  useEffect(() => {
    if (section === "home") return;
    document.getElementById(`section-heading-${section}`)?.focus();
  }, [section]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || $section.get() === "home") return;
      if (document.querySelector("[data-artifact-sheet]")) return;
      closeSection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AboutOverlay active={section === "about"} onClose={closeSection} />
      <ProjectsArchive active={section === "projects"} onClose={closeSection} />
      <SkillsArchive active={section === "skills"} onClose={closeSection} />
      {sectionOrder.map((id) => {
        const { label, Body } = sections[id];

        return (
          <Panel
            key={id}
            variant="modal"
            class="w-full max-h-full overflow-y-auto pointer-events-auto my-auto ml-auto max-w-[min(488px,34vw)] mobile:my-0 mobile:ml-0 mobile:max-w-none"
            hidden={section !== id}
            aria-labelledby={`section-heading-${id}`}
          >
            <div class="flex justify-between items-start gap-3">
              <p
                class={cn(text({ role: "hud-label" }), "focus-visible:outline-none")}
                id={`section-heading-${id}`}
                tabIndex={-1}
              >
                {`${label} // ARCHIVE`}
              </p>
              <CloseButton onClose={closeSection} />
            </div>
            <div class="grid gap-[0.9rem]">
              <Body />
            </div>
          </Panel>
        );
      })}
    </>
  );
}
