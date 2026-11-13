import { useEffect, useState } from "preact/hooks";
import { profile } from "../../data/profile";

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timeZone,
});

/** Ticks every 30s; `null` until mounted so SSR markup stays stable. */
export function useLocalClock(): string | null {
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setClock(clockFormatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
}
