import { ArrowUpRight, LibraryBig } from "lucide-preact";
import { projects } from "../../../data/projects";
import { gameActions } from "../../../state/game";
import { questsUsing } from "./skillMeta";
import SkillsPanel from "./SkillsPanel";

const records = [
  { id: "q001", code: "Q-001", meta: "MOBILE COMMERCE · 2024" },
  { id: "q011", code: "Q-011", meta: "PROPERTY APP · 2023" },
];

export default function FieldRecords() {
  const reactQuests = questsUsing("React").length;

  return (
    <SkillsPanel
      title="// FIELD RECORDS"
      icon={<LibraryBig size={12} strokeWidth={1.5} />}
      tone="secondary"
      meta={<span class="font-hud text-[10px] tracking-[1px] text-secondary">02 SHIPPED</span>}
      foot={
        <>
          <span class="font-hud text-[9px] tracking-[0.9px] text-text-ghost">
            {`${reactQuests} QUESTS USE REACT`}
          </span>
          <button
            type="button"
            onClick={() => gameActions.goTo("projects")}
            class="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-hud text-[9px] tracking-[0.9px] text-primary-hover hover:text-accent-lilac focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-2"
          >
            OPEN ARCHIVE
            <ArrowUpRight size={9} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </>
      }
    >
      <div class="flex flex-col">
        {records.map((record) => {
          const project = projects.find((item) => item.id === record.id);
          if (!project) return null;

          return (
            <button
              key={record.id}
              type="button"
              onClick={() => gameActions.selectProject(project.id)}
              class="flex h-13 cursor-pointer items-center gap-2.5 border-t border-border-subtle px-4 text-left first:border-t-0 hover:bg-tint-ghost focus-visible:outline-2 focus-visible:outline-primary-hover focus-visible:outline-offset-0"
            >
              <img
                src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                alt=""
                width={1280}
                height={512}
                loading="lazy"
                decoding="async"
                class="size-11 flex-none rounded-[1px] object-cover"
              />
              <span class="flex min-w-0 flex-1 flex-col gap-0.75">
                <span class="truncate font-display text-[14px] leading-none font-semibold text-text-primary">
                  {project.title}
                </span>
                <span class="truncate font-hud text-[9px] tracking-[0.8px] text-text-dim">
                  {record.meta}
                </span>
              </span>
              <span class="flex-none font-hud text-[9.5px] tracking-[0.9px] text-primary-hover">
                {record.code}
              </span>
            </button>
          );
        })}
      </div>
    </SkillsPanel>
  );
}
