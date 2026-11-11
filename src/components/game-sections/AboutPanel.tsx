import { profile } from "../../data/profile";
import Badge from "../ui/Badge";

export default function AboutPanel() {
  return (
    <div class="ds-stack">
      <div>
        <h2 class="ds-heading-2">{profile.name}</h2>
        <p class="ds-body-sm ds-text-muted">{profile.title}</p>
      </div>
      <dl class="ds-info-list">
        <div class="ds-info-row">
          <dt class="ds-hud-micro">Class</dt>
          <dd class="ds-caption ds-text-secondary">{profile.class}</dd>
        </div>
        <div class="ds-info-row">
          <dt class="ds-hud-micro">Experience</dt>
          <dd class="ds-caption ds-text-secondary">
            {profile.yearsOfExperience}
          </dd>
        </div>
        <div class="ds-info-row">
          <dt class="ds-hud-micro">Location</dt>
          <dd class="ds-caption ds-text-secondary">{profile.location}</dd>
        </div>
        <div class="ds-info-row">
          <dt class="ds-hud-micro">Status</dt>
          <dd class="ds-caption ds-text-secondary">Available for quests</dd>
        </div>
      </dl>
      <div class="ds-stack ds-stack--tight">
        <p class="ds-hud-label">SPECIALIZATION</p>
        <ul class="ds-chip-list">
          {profile.specialization.map((item) => (
            <li key={item}>
              <Badge tone="secondary">{item}</Badge>
            </li>
          ))}
        </ul>
      </div>
      <div class="ds-stack ds-stack--tight">
        <p class="ds-hud-label">CHARACTER DESCRIPTION</p>
        <p class="ds-body-sm ds-text-muted">{profile.bio}</p>
      </div>
    </div>
  );
}