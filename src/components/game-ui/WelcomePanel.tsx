import { useStore } from "@nanostores/preact";
import { Play } from "lucide-preact";
import { useEffect } from "preact/hooks";
import { profile } from "../../data/profile";
import { $section, gameActions } from "../../state/game";

export default function WelcomePanel() {
  const section = useStore($section);
  const isPlaying = section !== "home";

  useEffect(() => {
    if (isPlaying) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("button, a, input, textarea, select")
      ) {
        return;
      }
      gameActions.goTo("about");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPlaying]);

  if (isPlaying) return null;

  return (
    <section class="welcome-panel" aria-label="Welcome">
      <div class="welcome-panel__eyebrow">
        <span class="welcome-panel__dash" aria-hidden="true" />
        <span class="welcome-panel__eyebrow-text">WELCOME TO MY WORLD</span>
      </div>
      <h1 class="welcome-panel__title" id="welcome-title" tabIndex={-1}>
        <span>Build.</span> <span>Play.</span> <span>Explore.</span>
      </h1>
      <p class="welcome-panel__tagline">{profile.tagline}</p>
      <div class="welcome-panel__start">
        <button
          type="button"
          class="welcome-panel__cta"
          onClick={() => gameActions.goTo("about")}
        >
          <span class="welcome-panel__sheen" aria-hidden="true" />
          <span class="welcome-panel__accent" aria-hidden="true" />
          <span class="welcome-panel__inner-frame" aria-hidden="true" />
          <Play
            class="welcome-panel__cta-icon"
            size={22}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span class="welcome-panel__cta-label">START PLAY</span>
          <span class="welcome-panel__cta-spacer" aria-hidden="true" />
          <span class="welcome-panel__cta-chevrons" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <span class="welcome-panel__corner welcome-panel__corner--tl" aria-hidden="true" />
        <span class="welcome-panel__corner welcome-panel__corner--tr" aria-hidden="true" />
        <span class="welcome-panel__corner welcome-panel__corner--bl" aria-hidden="true" />
        <span class="welcome-panel__corner welcome-panel__corner--br" aria-hidden="true" />
      </div>
      <p class="welcome-panel__hint">
        <span class="welcome-panel__key">ENTER</span>
        <span class="welcome-panel__hint-text--desktop">
          PRESS TO BEGIN THE JOURNEY
        </span>
        <span class="welcome-panel__hint-text--mobile">
          TAP TO BEGIN THE JOURNEY
        </span>
        <span class="welcome-panel__caret" aria-hidden="true" />
      </p>
    </section>
  );
}