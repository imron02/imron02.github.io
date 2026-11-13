import { Briefcase, Code, Mail } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { profile } from "../../data/profile";

const icons: Record<string, ComponentChildren> = {
  GitHub: <Code size={13} strokeWidth={1.5} />,
  LinkedIn: <Briefcase size={13} strokeWidth={1.5} />,
  Email: <Mail size={13} strokeWidth={1.5} />,
};

export default function SocialLinks() {
  return (
    <ul class="flex gap-2 list-none m-0 p-0 mobile:hidden" aria-label="Social links">
      {profile.socials.map((social) => {
        const isExternal = social.href.startsWith("http");
        return (
          <li key={social.label}>
            <a
              class="grid place-items-center w-7.5 h-7.5 rounded-xs border border-[color:color-mix(in_srgb,var(--color-text-primary)_15%,transparent)] bg-hud-panel-quiet text-text-secondary transition-[color,border-color] duration-150 ease-[ease] hover:text-text-primary hover:border-primary"
              href={social.href}
              aria-label={social.label}
              title={social.label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {icons[social.label] ?? <Mail size={13} strokeWidth={1.5} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
