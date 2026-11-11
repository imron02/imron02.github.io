import { experience } from "../../data/experience";
import Badge from "../ui/Badge";

export default function ExperienceLog() {
  return (
    <ol class="log-list">
      {experience.map((item) => (
        <li key={`${item.company}-${item.period}`} class="log-entry">
          <p class="log-entry__period">{item.period}</p>
          <h3 class="ds-heading-3">
            {item.role} · {item.company}
          </h3>
          <p class="ds-body-sm ds-text-muted">{item.summary}</p>
          <ul>
            {item.achievements.map((achievement) => (
              <li key={achievement} class="ds-body-sm ds-text-muted">
                {achievement}
              </li>
            ))}
          </ul>
          <ul class="ds-chip-list">
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