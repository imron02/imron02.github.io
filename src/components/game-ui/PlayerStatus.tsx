import { profile } from "../../data/profile";
import Panel from "../ui/Panel";
import { useLocalClock } from "./useLocalClock";

export default function PlayerStatus() {
  const clock = useLocalClock();

  return (
    <Panel variant="hud" class="status-panel" aria-label="Player status">
      <div class="status-panel__head">
        <p class="ds-hud-label status-panel__label">// PLAYER STATUS</p>
        <span class="status-panel__sync">SYNCED</span>
      </div>
      <dl class="status-panel__rows">
        <div class="status-panel__row">
          <dt>AVAILABILITY</dt>
          <dd class="status-panel__value--success">
            {profile.availability.toUpperCase()}
          </dd>
        </div>
        <div class="status-panel__row">
          <dt>LOCATION</dt>
          <dd>{profile.locationShort.toUpperCase()}</dd>
        </div>
        <div class="status-panel__row">
          <dt>LOCAL TIME</dt>
          <dd>
            {profile.utcOffsetLabel} · {clock ?? "--:--"}
          </dd>
        </div>
      </dl>
    </Panel>
  );
}