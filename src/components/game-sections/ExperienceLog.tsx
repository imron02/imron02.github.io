import { experience } from "../../data/experience";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import Badge from "../ui/Badge";

export default function ExperienceLog() {
  return (
    <ol class="grid gap-[0.9rem] list-none m-0 p-0">
      {experience.map((item) => (
        <li key={`${item.company}-${item.period}`} class="border-l border-glow-primary pl-3">
          <p class="text-accent-pink">{item.period}</p>
          <h3 class={text({ role: "heading-3" })}>
            {item.role} · {item.company}
          </h3>
          <p class={cn(text({ role: "body-sm" }), "text-text-muted")}>{item.summary}</p>
          <ul class="mt-[0.35rem] mb-0 ml-0 pl-4 text-text-muted leading-normal">
            {item.achievements.map((achievement) => (
              <li key={achievement} class={cn(text({ role: "body-sm" }), "text-text-muted")}>
                {achievement}
              </li>
            ))}
          </ul>
          <ul class="flex flex-wrap gap-1.5 list-none m-0 p-0">
            {item.technologies.map((technology) => (
              <li key={technology}>
                <Badge tone="secondary">{technology}</Badge>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
