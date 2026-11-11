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
    <ul class="social-links" aria-label="Social links">
      {profile.socials.map((social) => {
        const isExternal = social.href.startsWith("http");
        return (
          <li key={social.label}>
            <a
              class="social-links__item"
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