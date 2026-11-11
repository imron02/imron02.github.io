import { profile, xpPercent, xpRemaining } from "../../data/profile";
import Panel from "../ui/Panel";
import ProgressBar from "../ui/ProgressBar";

export default function PlayerProfile() {
  return (
    <Panel
      as="aside"
      variant="hud"
      accent="secondary"
      class="profile-panel"
      aria-label="Player profile"
    >
      <div class="profile-panel__identity">
        <span class="profile-panel__avatar-wrap">
          <span class="profile-panel__ring" aria-hidden="true" />
          <img
            class="profile-panel__avatar"
            src={`${import.meta.env.BASE_URL}${profile.avatar}`}
            width={52}
            height={52}
            alt=""
          />
          <span class="profile-panel__level">{profile.level}</span>
        </span>
        <div class="profile-panel__info">
          <h2 class="profile-panel__name">{profile.name}</h2>
          <p class="profile-panel__class">{profile.title}</p>
          <p class="profile-panel__status">
            <span class="profile-panel__lv">LV. {profile.level}</span>
            <span class="profile-panel__sep" aria-hidden="true" />
            <span class="profile-panel__online">● ONLINE</span>
          </p>
        </div>
      </div>
      <div class="profile-panel__xp">
        <div class="profile-panel__xp-labels">
          <span>EXPERIENCE</span>
          <span class="profile-panel__xp-value">
            {profile.xp.current.toLocaleString("en-US")} /{" "}
            {profile.xp.goal.toLocaleString("en-US")}
          </span>
        </div>
        <ProgressBar
          value={xpPercent}
          label="Experience"
          class="profile-panel__bar"
        />
        <div class="profile-panel__xp-meta">
          <span>
            NEXT LV. {profile.level + 1} —{" "}
            {xpRemaining.toLocaleString("en-US")} XP
          </span>
          <span class="profile-panel__rank">RANK {profile.rank}</span>
        </div>
      </div>
    </Panel>
  );
}