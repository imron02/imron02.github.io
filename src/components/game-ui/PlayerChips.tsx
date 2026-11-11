import { chapterPercent, profile } from "../../data/profile";
import ProgressBar from "../ui/ProgressBar";
import { useLocalClock } from "./useLocalClock";

export default function PlayerChips() {
  const clock = useLocalClock();

  return (
    <div class="player-chips">
      <div class="player-chips__player">
        <img
          class="player-chips__avatar"
          src={`${import.meta.env.BASE_URL}${profile.avatar}`}
          width={30}
          height={30}
          alt=""
        />
        <div class="player-chips__identity">
          <p class="player-chips__name">{profile.name}</p>
          <p class="player-chips__level">
            LV. {profile.level} · RANK {profile.rank}
          </p>
        </div>
      </div>
      <div class="player-chips__chapter">
        <div class="player-chips__chapter-labels">
          <span>CH. {String(profile.chapter.index).padStart(2, "0")}</span>
          <span class="player-chips__chapter-pct">{chapterPercent}%</span>
        </div>
        <ProgressBar
          value={chapterPercent}
          label="Chapter progress"
          tone="secondary"
          class="player-chips__bar"
        />
        <p class="player-chips__chapter-title">{profile.chapter.title}</p>
      </div>
      <div class="player-chips__location">
        <p>{profile.locationShort.toUpperCase()}</p>
        <p class="player-chips__time">
          {profile.utcOffsetLabel} · {clock ?? "--:--"}
        </p>
        <p class="player-chips__availability">
          ● {profile.availability.toUpperCase()}
        </p>
      </div>
    </div>
  );
}