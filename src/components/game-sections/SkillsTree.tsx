import { masteryLevels, skillGroups } from "../../data/skills";
import SkillMeter from "../ui/SkillMeter";

export default function SkillsTree() {
  return (
    <div class="ds-stack">
      {skillGroups.map((group) => (
        <div key={group.id} class="ds-stack ds-stack--tight">
          <h3 class="ds-hud-label skill-group__title">{group.title}</h3>
          <ul class="skill-list">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <span class="ds-body-sm">{skill.name}</span>
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