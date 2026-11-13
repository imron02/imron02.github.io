import { ArrowUpRight, Mail } from "lucide-preact";
import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { text } from "../../lib/typography";
import Button from "../ui/Button";

const externalLinks = profile.socials.filter((social) => !social.href.startsWith("mailto:"));

export default function ContactPanel() {
  return (
    <div class="grid gap-2">
      <p class={cn(text({ role: "body-sm" }), "text-text-muted")}>{profile.tagline}</p>
      <Button
        href={`mailto:${profile.email}`}
        variant="ghost"
        class="w-full justify-between"
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
          class="w-full justify-between"
          trailingIcon={<ArrowUpRight size={13} strokeWidth={1.5} />}
        >
          {social.label}
        </Button>
      ))}
    </div>
  );
}
