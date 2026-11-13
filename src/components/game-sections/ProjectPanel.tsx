import { useStore } from "@nanostores/preact";
import { ArrowLeft, ArrowUpRight } from "lucide-preact";
import { projects } from "../../data/projects";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import { $selectedProject, gameActions } from "../../state/game";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ProjectPanel() {
  const selectedId = useStore($selectedProject);
  const project = projects.find((item) => item.id === selectedId);

  if (project) {
    return (
      <div class="grid gap-[0.9rem]">
        <Button
          variant="ghost"
          icon={<ArrowLeft size={14} strokeWidth={1.5} />}
          onClick={gameActions.clearProject}
        >
          Back to quest log
        </Button>
        <img
          class="w-full aspect-video object-cover rounded-m opacity-85"
          src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
          alt=""
          decoding="async"
        />
        <p class={cn(text({ role: "hud-label" }), "text-secondary")}>{project.category}</p>
        <h2 class={text({ role: "heading-2" })}>{project.title}</h2>
        <p class={cn(text({ role: "body-sm" }), "text-text-muted")}>{project.description}</p>
        <ul class="flex flex-wrap gap-1.5 list-none m-0 p-0">
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
            class="w-full justify-between"
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
            class="w-full justify-between"
            trailingIcon={<ArrowUpRight size={13} strokeWidth={1.5} />}
          >
            View repository
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <ul class="grid gap-2 list-none m-0 p-0">
      {projects.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            class="w-full grid grid-cols-[auto_1fr_auto] items-center gap-[0.6rem] px-[0.6rem] py-2 border border-border-subtle rounded-s bg-surface-overlay text-text-primary text-left cursor-pointer hover:border-primary"
            onClick={() => gameActions.selectProject(item.id)}
          >
            <span class={cn(text({ role: "hud-micro" }), "text-info")}>
              {item.id.toUpperCase()}
            </span>
            <span class="text-[12px]">{item.title}</span>
            <span class={cn(text({ role: "caption" }), "text-text-muted")}>{item.category}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
