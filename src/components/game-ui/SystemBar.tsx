import { Maximize, Volume2 } from "lucide-preact";
import { profile } from "../../data/profile";

export default function SystemBar() {
  return (
    <div class="system-bar" aria-hidden="true">
      <span class="system-bar__online">● ONLINE</span>
      <span class="system-bar__sep" />
      <span class="system-bar__session">
        SESSION {String(profile.session.index).padStart(2, "0")} —{" "}
        {profile.session.name}
      </span>
      <span class="system-bar__controls">
        <span class="system-bar__control">
          <Volume2 size={13} strokeWidth={1.5} />
        </span>
        <span class="system-bar__control">
          <Maximize size={13} strokeWidth={1.5} />
        </span>
      </span>
    </div>
  );
}