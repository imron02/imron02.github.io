export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
  technologies: string[];
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "2022 — Present",
    role: "Senior Frontend Engineer",
    company: "Lorem Labs",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.",
    technologies: ["Preact", "TypeScript", "Astro"],
    achievements: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Vestibulum id ligula porta felis euismod semper.",
    ],
  },
  {
    period: "2018 — 2022",
    role: "Frontend Engineer",
    company: "Ipsum Studio",
    summary:
      "Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    achievements: [
      "Maecenas faucibus mollis interdum.",
      "Donec ullamcorper nulla non metus auctor fringilla.",
    ],
  },
  {
    period: "2014 — 2018",
    role: "Web Developer",
    company: "Dolor Systems",
    summary:
      "Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Morbi leo risus, porta ac consectetur.",
    technologies: ["JavaScript", "HTML", "CSS"],
    achievements: [
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      "Etiam porta sem malesuada magna mollis euismod.",
    ],
  },
];