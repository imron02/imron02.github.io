export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  level: number;
  rank: string;
  xp: { current: number; goal: number };
  avatar: string;
  locationShort: string;
  timeZone: string;
  utcOffsetLabel: string;
  email: string;
  yearsOfExperience: string;
  specializationLabel: string;
  country: string;
  currentFocus: string;
  alignment: string;
  preferredStack: string;
  workMode: string;
  achievements: number;
  completion: number;
  tagline: string;
  bio: string;
  availability: string;
  chapter: {
    index: number;
    title: string;
    objectivesDone: number;
    objectivesTotal: number;
  };
  session: { index: number; name: string };
  companion: { name: string; role: string; lines: string[] };
  socials: SocialLink[];
}

const email = "imron02@gmail.com";

export const profile: Profile = {
  name: "Imron Rosdiana",
  title: "Senior Frontend Engineer",
  level: 32,
  rank: "A",
  xp: { current: 8420, goal: 12000 },
  avatar: "images/avatar.webp",
  locationShort: "Jakarta, ID",
  timeZone: "Asia/Jakarta",
  utcOffsetLabel: "GMT +7",
  email,
  yearsOfExperience: "10+ years",
  specializationLabel: "Frontend Development",
  country: "Indonesia",
  currentFocus: "Web & Mobile Apps",
  alignment: "Product Craftsman",
  preferredStack: "React / Next.js",
  workMode: "Remote-first",
  achievements: 12,
  completion: 100,
  tagline: "Crafting beautiful and engaging digital experiences with modern technologies.",
  bio: "Passionate about building modern digital experiences through frontend engineering, creative problem-solving, and continuous learning.",
  availability: "Open to work",
  chapter: {
    index: 1,
    title: "The Frontend Wilds",
    objectivesDone: 3,
    objectivesTotal: 5,
  },
  session: { index: 1, name: "HOME" },
  companion: {
    name: "RIN",
    role: "SUPPORT UNIT",
    lines: [
      "Let's create something amazing together!",
      "Systems nominal. Ready to go.",
      "Your next quest is waiting.",
      "Press Enter to begin the journey.",
      "Coffee reserves at 82%. All good.",
    ],
  },
  socials: [
    { label: "GitHub", href: "https://github.com/imron02" },
    { label: "LinkedIn", href: "https://id.linkedin.com/in/imron-rosdiana-099a14132" },
    { label: "Email", href: `mailto:${email}` },
  ],
};

export const xpPercent = Math.round((profile.xp.current / profile.xp.goal) * 100);

export const xpRemaining = profile.xp.goal - profile.xp.current;

export const chapterPercent = Math.round(
  (profile.chapter.objectivesDone / profile.chapter.objectivesTotal) * 100,
);
