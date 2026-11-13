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
  location: string;
  locationShort: string;
  timeZone: string;
  utcOffsetLabel: string;
  email: string;
  class: string;
  yearsOfExperience: string;
  specialization: string[];
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
  companion: { name: string; role: string; line: string };
  socials: SocialLink[];
}

const email = "hello@example.com";

export const profile: Profile = {
  name: "Imron Rosdiana",
  title: "Senior Frontend Engineer",
  level: 32,
  rank: "A",
  xp: { current: 8420, goal: 12000 },
  avatar: "images/avatar.webp",
  location: "Jakarta, Indonesia",
  locationShort: "Jakarta, ID",
  timeZone: "Asia/Jakarta",
  utcOffsetLabel: "GMT +7",
  email,
  class: "Frontend Engineer",
  yearsOfExperience: "10+ years",
  specialization: ["React", "Next.js", "React Native", "TypeScript"],
  tagline: "Crafting beautiful and engaging digital experiences with modern technologies.",
  bio: "Passionate about building modern digital experiences through frontend engineering, creative problem-solving, and continuous learning.",
  availability: "Open to work",
  chapter: {
    index: 1,
    title: "The Frontend Wilds",
    objectivesDone: 3,
    objectivesTotal: 5,
  },
  session: { index: 1, name: "KAGURA SHRINE" },
  companion: {
    name: "RIN",
    role: "SUPPORT UNIT",
    line: "Let's create something amazing together!",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/imron02" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/imron-rosdiana" },
    { label: "Email", href: `mailto:${email}` },
  ],
};

export const xpPercent = Math.round((profile.xp.current / profile.xp.goal) * 100);

export const xpRemaining = profile.xp.goal - profile.xp.current;

export const chapterPercent = Math.round(
  (profile.chapter.objectivesDone / profile.chapter.objectivesTotal) * 100,
);
