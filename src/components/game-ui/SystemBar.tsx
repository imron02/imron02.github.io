import { Maximize, Minimize, Volume2, VolumeX } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { cn } from "../../lib/cn";
import { profile } from "../../data/profile";

// Shared chrome for the two icon controls; both glyphs swap in place.
const iconControl =
  "grid place-items-center cursor-pointer w-7.5 h-7.5 rounded-xs border border-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] text-text-secondary transition-colors duration-150 ease-[ease] hover:text-primary-hover mobile:w-auto mobile:h-auto mobile:min-w-6 mobile:min-h-6 mobile:border-0 mobile:rounded-none mobile:text-text-faint mobile:[&_svg]:w-3 mobile:[&_svg]:h-3";

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/ambient-loop.mp3`;
const AUDIO_VOLUME = 0.45;

export default function SystemBar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Opted in by the effect: engines without element fullscreen (iOS Safari) keep an
  // invisible placeholder instead of the control, so the bar never reflows.
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  // Created on first click so the 726 KB file never downloads unrequested.
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));

    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
      return;
    }
    void document.documentElement.requestFullscreen().catch(() => {});
  };

  const toggleAudio = () => {
    if (audioOn) {
      audioRef.current?.pause();
      setAudioOn(false);
      return;
    }

    let audio = audioRef.current;
    if (!audio) {
      // preload must be set before src, or the browser sees the URL and starts
      // fetching; the element is only built on click, so this stays unrequested.
      audio = new Audio();
      audio.preload = "none";
      audio.src = AUDIO_SRC;
      audio.loop = true;
      audio.volume = AUDIO_VOLUME;
      audioRef.current = audio;
    }

    audio
      .play()
      .then(() => setAudioOn(true))
      .catch(() => setAudioOn(false));
  };

  return (
    <div class="flex items-center gap-4 font-hud text-[8.5px] leading-[1.2] tracking-[1.4px] uppercase text-text-faint mobile:justify-start mobile:gap-2 mobile:min-h-4.5 mobile:text-[8px] mobile:tracking-[0.9px]">
      <span class="text-success mobile:tracking-[0.8px]" aria-hidden="true">
        ● ONLINE
      </span>
      <span
        class="w-px h-3.25 bg-[color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] mobile:h-2.25"
        aria-hidden="true"
      />
      <span class="tracking-[1.2px] text-text-faint mobile:tracking-[0.9px]" aria-hidden="true">
        SESSION {String(profile.session.index).padStart(2, "0")} — {profile.session.name}
      </span>
      <span class="flex items-center gap-4 mobile:ml-auto mobile:gap-3">
        {/* State lives in aria-pressed; the name stays constant so it is not read twice. */}
        <button
          type="button"
          class={iconControl}
          onClick={toggleAudio}
          aria-label="Ambient audio"
          aria-pressed={audioOn}
          title={audioOn ? "Mute ambient audio" : "Play ambient audio"}
        >
          {audioOn ? (
            <Volume2 size={13} strokeWidth={1.5} />
          ) : (
            <VolumeX size={13} strokeWidth={1.5} />
          )}
        </button>
        <button
          type="button"
          class={cn(iconControl, !canFullscreen && "invisible")}
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          aria-pressed={isFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          tabIndex={canFullscreen ? 0 : -1}
        >
          {isFullscreen ? (
            <Minimize size={13} strokeWidth={1.5} />
          ) : (
            <Maximize size={13} strokeWidth={1.5} />
          )}
        </button>
      </span>
    </div>
  );
}
