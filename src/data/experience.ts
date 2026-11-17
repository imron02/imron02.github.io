export interface ExperienceItem {
  /** Milestone start label, e.g. "2024" or "APR 2026". */
  start: string;
  /** Milestone end label, e.g. "2024", "AUG 2026" or "PRESENT". */
  end: string;
  role: string;
  company: string;
  technologies: string[];
  /** Newest-first entry: highlighted node, ACTIVE QUEST status. */
  active?: boolean;
  /** Contract run alongside another quest: excluded from company count and career progression. */
  parallel?: boolean;
  /** `projects.ts` id whose quest this role shipped — links the dossier to the archive. */
  projectId?: string;
  /** Card + dossier description. */
  summary?: string;
  /** Dossier responsibilities; omit the block when absent. */
  achievements?: string[];
}

export const experience: ExperienceItem[] = [
  {
    start: "2024",
    end: "PRESENT",
    company: "Mindstores / WIR Group",
    role: "Fullstack Developer",
    technologies: ["React Native", "Expo", "Frappe", "Python"],
    active: true,
    projectId: "q001",
    summary:
      "Virtual retail and commerce platform enabling independent store owners to manage digital businesses, sell products, and provide digital services through a mobile application.",
    achievements: [
      "Developed and maintained the Alfamind Android application",
      "Built mobile application features using React Native and Expo",
      "Integrated frontend functionality with Frappe backend services",
      "Worked on product discovery, application performance, and UX",
      "Implemented application integrations and mobile platform functionality",
    ],
  },
  {
    start: "APR 2026",
    end: "AUG 2026",
    company: "My InOut (iO)",
    role: "Web Developer · Part-time",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    parallel: true,
    projectId: "q003",
    summary: "Part-time web development across React, Next.js, and Tailwind CSS.",
  },
  {
    start: "SEP 2024",
    end: "NOV 2024",
    company: "Corom Music Entertainment",
    role: "Software Developer · Freelance",
    technologies: ["React Native", "Android Development", "Firebase"],
    parallel: true,
    projectId: "q002",
    summary:
      "Contributed to application integrations and validation workflows during a parallel contract engagement alongside the Mindstores quest.",
  },
  {
    start: "2022",
    end: "2024",
    company: "Meteor Inovasi Digital",
    role: "Software Developer",
    technologies: ["React", "Laravel", "NestJS"],
    summary:
      "Worked on web application development and digital product solutions — React interfaces, Laravel and NestJS services.",
  },
  {
    start: "2016",
    end: "2018",
    company: "Dataon",
    role: "Web Developer",
    technologies: ["Angular", "Ionic", "TypeScript"],
    summary: "Worked on web and mobile application development across company products.",
  },
  {
    start: "2014",
    end: "2016",
    company: "Freelance",
    role: "Senior Web Developer",
    technologies: ["PHP", "Laravel", "CodeIgniter", "AngularJS"],
    summary:
      "Worked independently on web development projects, building applications and delivering solutions for different requirements.",
  },
  {
    start: "2013",
    end: "2014",
    company: "Xinix",
    role: "Junior Web Developer",
    technologies: ["PHP", "JavaScript", "MySQL"],
    summary:
      "Started the professional software development journey, focusing on web application development.",
  },
];
