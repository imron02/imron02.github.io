import { useStore } from "@nanostores/preact";
import { ArrowLeft, ArrowUpRight } from "lucide-preact";
import { projects } from "../../data/projects";
import { $selectedProject, gameActions } from "../../state/game";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ProjectPanel() {
  const selectedId = useStore($selectedProject);
  const project = projects.find((item) => item.id === selectedId);

  if (project) {
    return (
      <div class="ds-stack">
        <Button
          variant="ghost"
          icon={<ArrowLeft size={14} strokeWidth={1.5} />}
          onClick={gameActions.clearProject}
        >
          Back to quest log
        </Button>
        <img
          class="quest-detail__thumb"
          src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
          alt=""
          decoding="async"
        />
        <p class="ds-hud-label quest-detail__category">{project.category}</p>
        <h2 class="ds-heading-2">{project.title}</h2>
        <p class="ds-body-sm ds-text-muted">{project.description}</p>
        <ul class="ds-chip-list">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Badge tone="secondary">{technology}</Badge>
            </li>
          ))}
        </ul>
        {project.demoUrl ? (
          <Button
            href={project.demoUrl}
            external
            variant="ghost"
            class="ds-button--block"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.5} />}
          >
            Open live demo
          </Button>
        ) : null}
        {project.repositoryUrl ? (
          <Button
            href={project.repositoryUrl}
            external
            variant="ghost"
            class="ds-button--block"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.5} />}
          >
            View repository
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <ul class="quest-list">
      {projects.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            class="quest-row"
            onClick={() => gameActions.selectProject(item.id)}
          >
            <span class="ds-hud-micro ds-text-info">
              {item.id.toUpperCase()}
            </span>
            <span class="quest-row__title">{item.title}</span>
            <span class="ds-caption ds-text-muted">
              {item.category}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}