import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import Badge from "../ui/Badge";

const facts = [
  { term: "Class", value: profile.class },
  { term: "Experience", value: profile.yearsOfExperience },
  { term: "Location", value: profile.location },
  { term: "Status", value: "Available for quests" },
];

export default function AboutPanel() {
  return (
    <div class="grid gap-[0.9rem]">
      <div>
        <h2 class={text({ role: "heading-2" })}>{profile.name}</h2>
        <p class={cn(text({ role: "body-sm" }), "text-text-muted")}>{profile.title}</p>
      </div>
      <dl class="m-0">
        {facts.map((fact) => (
          <div
            key={fact.term}
            class="flex items-center justify-between gap-4 py-1.5 border-t border-border-subtle first:border-t-0"
          >
            <dt class={text({ role: "hud-micro" })}>{fact.term}</dt>
            <dd class={cn(text({ role: "caption" }), "text-text-secondary", "m-0 text-right")}>
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
      <div class="grid gap-2">
        <p class={text({ role: "hud-label" })}>SPECIALIZATION</p>
        <ul class="flex flex-wrap gap-1.5 list-none m-0 p-0">
          {profile.specialization.map((item) => (
            <li key={item}>
              <Badge tone="secondary">{item}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <div class="grid gap-2">
        <p class={text({ role: "hud-label" })}>CHARACTER DESCRIPTION</p>
        <p class={cn(text({ role: "body-sm" }), "text-text-muted")}>{profile.bio}</p>
      </div>
    </div>
  );
}
