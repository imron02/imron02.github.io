import { Briefcase, Code, Mail } from "lucide-preact";
import type { ContactChannelId } from "../../../data/contact";

/**
 * Per-channel presentation metadata for the contact composition. Every value
 * is a complete literal class string (design tokens only); the card and the
 * terminal rows read the same entry so the three channels stay in tone.
 */
export const channelMeta: Record<
  ContactChannelId,
  {
    Icon: typeof Mail;
    text: string;
    border: string;
    cardBg: string;
    accent: string;
    chip: string;
    iconBox: string;
    openBox: string;
    rowIcon: string;
    rowArrow: string;
  }
> = {
  email: {
    Icon: Mail,
    text: "text-primary-hover",
    border: "border-[color-mix(in_srgb,var(--color-primary-hover)_24%,transparent)]",
    cardBg: "bg-hud-panel-soft",
    accent: "bg-[linear-gradient(90deg,var(--color-primary-hover),transparent_75%)]",
    chip: "bg-[color-mix(in_srgb,var(--color-primary-hover)_8%,transparent)] border-[color-mix(in_srgb,var(--color-primary-hover)_20%,transparent)]",
    iconBox:
      "bg-[color-mix(in_srgb,var(--color-primary-hover)_10%,transparent)] border-[color-mix(in_srgb,var(--color-primary-hover)_30%,transparent)]",
    openBox:
      "bg-[color-mix(in_srgb,var(--color-primary-hover)_6%,transparent)] border-[color-mix(in_srgb,var(--color-primary-hover)_30%,transparent)]",
    rowIcon: "text-primary-hover",
    rowArrow: "text-primary-hover",
  },
  linkedin: {
    Icon: Briefcase,
    text: "text-secondary",
    border: "border-[color-mix(in_srgb,var(--color-secondary)_40%,transparent)]",
    cardBg: "bg-[color-mix(in_srgb,var(--color-surface)_90%,transparent)]",
    accent: "bg-[linear-gradient(90deg,var(--color-secondary),transparent_75%)]",
    chip: "bg-[color-mix(in_srgb,var(--color-secondary)_8%,transparent)] border-[color-mix(in_srgb,var(--color-secondary)_20%,transparent)]",
    iconBox:
      "bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] border-[color-mix(in_srgb,var(--color-secondary)_30%,transparent)]",
    openBox:
      "bg-[color-mix(in_srgb,var(--color-secondary)_6%,transparent)] border-[color-mix(in_srgb,var(--color-secondary)_30%,transparent)]",
    rowIcon: "text-secondary",
    rowArrow: "text-secondary",
  },
  github: {
    Icon: Code,
    text: "text-accent-pink",
    border: "border-[color-mix(in_srgb,var(--color-accent-pink)_24%,transparent)]",
    cardBg: "bg-hud-panel-soft",
    accent: "bg-[linear-gradient(90deg,var(--color-accent-pink),transparent_75%)]",
    chip: "bg-[color-mix(in_srgb,var(--color-accent-pink)_8%,transparent)] border-[color-mix(in_srgb,var(--color-accent-pink)_20%,transparent)]",
    iconBox:
      "bg-[color-mix(in_srgb,var(--color-accent-pink)_10%,transparent)] border-[color-mix(in_srgb,var(--color-accent-pink)_30%,transparent)]",
    openBox:
      "bg-[color-mix(in_srgb,var(--color-accent-pink)_6%,transparent)] border-[color-mix(in_srgb,var(--color-accent-pink)_30%,transparent)]",
    rowIcon: "text-accent-pink",
    rowArrow: "text-accent-pink",
  },
};
