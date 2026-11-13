import { masteryLevels, skillGroups } from "../../data/skills";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import SkillMeter from "../ui/SkillMeter";

export default function SkillsTree() {
  return (
    <div class="grid gap-[0.9rem]">
      {skillGroups.map((group) => (
        <div key={group.id} class="grid gap-2">
          <h3 class={cn(text({ role: "hud-label" }), "text-secondary")}>{group.title}</h3>
          <ul class="grid gap-2 list-none m-0 p-0">
            {group.skills.map((skill) => (
              <li key={skill.name} class="flex items-center justify-between gap-3 text-[14px]">
                <span class={text({ role: "body-sm" })}>{skill.name}</span>
                <SkillMeter
                  level={masteryLevels[skill.mastery]}
                  label={`${skill.mastery} mastery`}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
