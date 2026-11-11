import { ArrowUpRight, Mail } from "lucide-preact";
import { profile } from "../../data/profile";
import Button from "../ui/Button";

const externalLinks = profile.socials.filter(
  (social) => !social.href.startsWith("mailto:"),
);

export default function ContactPanel() {
  return (
    <div class="ds-stack ds-stack--tight">
      <p class="ds-body-sm ds-text-muted">{profile.tagline}</p>
      <Button
        href={`mailto:${profile.email}`}
        variant="ghost"
        class="ds-button--block"
        trailingIcon={<Mail size={13} strokeWidth={1.5} />}
      >
        {profile.email}
      </Button>
      {externalLinks.map((social) => (
        <Button
          key={social.label}
          href={social.href}
          external
          variant="ghost"
          class="ds-button--block"
          trailingIcon={<ArrowUpRight size={13} strokeWidth={1.5} />}
        >
          {social.label}
        </Button>
      ))}
    </div>
  );
}