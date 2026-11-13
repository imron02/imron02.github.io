import { ShoppingBag, Smartphone, Sparkles } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { cva } from "class-variance-authority";
import { projects } from "../../data/projects";
import { gameActions } from "../../state/game";
import { cn } from "../../lib/cn";
import Panel from "../ui/Panel";

const card = cva(
  "relative w-full flex flex-col p-0 rounded-xs bg-hud-card text-text-primary text-left overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-200 ease-[ease] h-26 short-1000:h-24 short-900:h-22 short-820:h-20 mobile:h-15 mobile:shadow-none",
  {
    variants: {
      active: {
        false:
          "border border-[color:color-mix(in_srgb,var(--color-text-primary)_12%,transparent)] hover:border-[color:color-mix(in_srgb,var(--color-primary)_50%,transparent)]",
        true: "border border-primary-hover shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] hover:border-primary-hover mobile:border-[color:color-mix(in_srgb,var(--color-primary)_35%,transparent)]",
      },
    },
    defaultVariants: { active: false },
  },
);

// Project-id overrides win over the category fallback.
// "Creative" is absent: the fallback already renders the same Sparkles.
const glyphs: Partial<Record<string, ComponentChildren>> = {
  q003: <Sparkles size={24} strokeWidth={1.5} />,
  "Web Application": <ShoppingBag size={24} strokeWidth={1.5} />,
  Mobile: <Smartphone size={24} strokeWidth={1.5} />,
};

const fallbackGlyph = <Sparkles size={24} strokeWidth={1.5} />;

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export default function QuestBoard() {
  return (
    <Panel
      variant="hud"
      class="mobile:border-0 mobile:rounded-none mobile:bg-hud-board mobile:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-text-primary)_10%,transparent)]"
      spine={false}
      bodyClass="gap-3 p-4 short-1000:gap-2.5 short-1000:py-3 short-900:gap-2 short-900:px-3.5 short-900:py-2.5 short-820:gap-1.5 short-820:px-3 short-820:py-2 mobile:gap-2 mobile:px-6 mobile:py-3 xs:px-4"
      aria-label="Quest board"
      as="section"
    >
      <div class="flex items-center justify-between gap-3 h-7 short-1000:h-6 short-900:h-5.5 short-820:h-5 mobile:h-5.5">
        <div class="flex items-center gap-2.5 mobile:gap-2">
          <Sparkles class="text-primary-hover" size={12} strokeWidth={1.5} aria-hidden="true" />
          <p class="m-0 font-hud text-[10.5px] leading-[1.2] tracking-[2.4px] uppercase text-text-primary mobile:text-[9.5px] mobile:tracking-[1.5px]">
            Quest Board
          </p>
          <span class="px-1.5 py-0.5 rounded-[1px] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,transparent)] font-hud text-[8px] leading-[1.2] tracking-[1px] text-accent-lilac mobile:px-1.25 mobile:text-[7px]">
            {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <ul class="list-none m-0 p-0 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 mobile:gap-2">
        {featuredProjects.map((project, index) => {
          const isActive = index === 0;
          return (
            <li key={project.id}>
              <button
                type="button"
                class={card({ active: isActive })}
                onClick={() => gameActions.selectProject(project.id)}
              >
                <span class="relative block h-15 overflow-hidden short-1000:h-13 short-900:h-11 short-820:h-9.5 mobile:h-8">
                  <img
                    class="block w-full h-full object-cover"
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt=""
                    width={640}
                    height={272}
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    class="absolute inset-0 bg-[radial-gradient(ellipse_160%_190%_at_18%_100%,transparent_0%,color-mix(in_srgb,var(--color-void)_30%,transparent)_45%,color-mix(in_srgb,var(--color-void)_90%,transparent)_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-10 -top-17.5 w-55 h-37.5 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-text-primary)_20%,transparent),transparent_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-0 top-8.5 w-66 h-6.5 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--color-hud-card-solid)_80%,transparent)_100%)] mobile:hidden"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute left-56 top-4.5 grid place-items-center w-6 h-6 text-[color:color-mix(in_srgb,var(--color-text-primary)_70%,transparent)] opacity-85 mobile:hidden"
                    aria-hidden="true"
                  >
                    {glyphs[project.id] ?? glyphs[project.category] ?? fallbackGlyph}
                  </span>
                  <span
                    class={cn(
                      "absolute left-2 top-2 px-1.5 py-0.75 rounded-[1px] border border-[color:color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] bg-[color:color-mix(in_srgb,var(--color-void)_60%,transparent)] font-hud text-[8px] leading-[1.2] tracking-[1px]",
                      isActive ? "text-accent-lilac" : "text-text-secondary",
                      "mobile:hidden",
                    )}
                  >
                    {project.id.slice(0, 1).toUpperCase()}-{project.id.slice(1)}
                  </span>
                </span>
                <span class="grid gap-0.75 pt-2 px-2.5 pb-2.25 short-900:py-1.5 short-900:px-2.25 short-820:py-1.25 short-820:px-2 mobile:gap-px mobile:py-1 mobile:px-1.75">
                  <span
                    class={cn(
                      "font-hud text-[7.5px] leading-[1.2] tracking-[1.2px] uppercase",
                      isActive ? "text-primary-hover" : "text-text-ghost",
                      "mobile:text-[6px] mobile:tracking-[0.7px]",
                    )}
                  >
                    {isActive ? "// ACTIVE QUEST" : "// QUEST"}
                  </span>
                  <span class="font-display text-[12px] leading-tight font-semibold text-text-primary short-820:text-[11px] mobile:font-body mobile:text-[9px] mobile:leading-[1.2]">
                    {project.title}
                  </span>
                </span>
                <span
                  class="hidden absolute left-0 bottom-0 w-0.5 h-7 bg-primary-hover mobile:block"
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
