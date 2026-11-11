import { chapterPercent, profile } from "../../data/profile";
import Panel from "../ui/Panel";
import ProgressBar from "../ui/ProgressBar";

export default function CurrentChapter() {
  const { chapter } = profile;

  return (
    <Panel variant="hud" class="chapter-panel" aria-label="Current chapter">
      <div class="chapter-panel__head">
        <p class="ds-hud-label chapter-panel__label">// CURRENT CHAPTER</p>
        <span class="chapter-panel__index">
          {String(chapter.index).padStart(2, "0")}
        </span>
      </div>
      <h2 class="chapter-panel__title">{chapter.title}</h2>
      <ProgressBar
        value={chapterPercent}
        label="Chapter progress"
        tone="secondary"
        class="chapter-panel__bar"
      />
      <div class="chapter-panel__foot">
        <span>
          {String(chapter.objectivesDone).padStart(2, "0")} /{" "}
          {String(chapter.objectivesTotal).padStart(2, "0")} OBJECTIVES
        </span>
        <span class="chapter-panel__pct">{chapterPercent}%</span>
      </div>
    </Panel>
  );
}