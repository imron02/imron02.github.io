import { Bot } from "lucide-preact";
import { profile } from "../../data/profile";

export default function Companion() {
  const { companion } = profile;

  return (
    <aside class="companion" aria-label="Support companion">
      <span class="companion__tile" aria-hidden="true">
        <Bot size={28} strokeWidth={1.5} />
        <span class="companion__signal" />
        <span class="companion__scanline" />
      </span>
      <div class="companion__dialogue">
        <p class="companion__speaker">
          {companion.name} // {companion.role}
        </p>
        <p class="companion__line">{companion.line}</p>
      </div>
    </aside>
  );
}