import { ShoppingBag, Smartphone, Sparkles } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { projects } from "../../data/projects";
import { gameActions } from "../../state/game";
import Panel from "../ui/Panel";

const defaultGlyph = () => <Sparkles size={24} strokeWidth={1.5} />;

// Project-id overrides win over the category fallback.
const questGlyphs: Record<string, () => ComponentChildren> = {
  q003: defaultGlyph,
  "Web Application": () => <ShoppingBag size={24} strokeWidth={1.5} />,
  Mobile: () => <Smartphone size={24} strokeWidth={1.5} />,
  Creative: defaultGlyph,
};

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export default function QuestBoard() {
  return (
    <Panel
      variant="hud"
      class="quest-board"
      aria-label="Quest board"
      as="section"
    >
      <div class="quest-board__head">
        <div class="quest-board__title-row">
          <Sparkles
            class="quest-board__head-icon"
            size={12}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p class="quest-board__title">Quest Board</p>
          <span class="quest-board__count">
            {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <ul class="quest-board__grid">
        {featuredProjects.map((project, index) => (
          <li key={project.id}>
            <button
              type="button"
              class={[
                "quest-card",
                index === 0 ? "quest-card--active" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => gameActions.selectProject(project.id)}
            >
              <span class="quest-card__thumb">
                <img
                  class="quest-card__image"
                  src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                  alt=""
                  width={640}
                  height={272}
                  loading="lazy"
                  decoding="async"
                />
                <span class="quest-card__spotlight" aria-hidden="true" />
                <span class="quest-card__glow" aria-hidden="true" />
                <span class="quest-card__fade" aria-hidden="true" />
                <span class="quest-card__glyph" aria-hidden="true">
                  {questGlyphs[project.id]?.() ??
                    questGlyphs[project.category]?.() ??
                    defaultGlyph()}
                </span>
                <span class="quest-card__code">
                  {project.id.slice(0, 1).toUpperCase()}-{project.id.slice(1)}
                </span>
              </span>
              <span class="quest-card__body">
                <span class="quest-card__category">
                  {index === 0 ? "// ACTIVE QUEST" : "// QUEST"}
                </span>
                <span class="quest-card__title">{project.title}</span>
              </span>
              <span class="quest-card__spine" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}