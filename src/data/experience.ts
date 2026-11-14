export interface ExperienceItem {
  /** Milestone start label, e.g. "2024" or "APR 2026". */
  start: string;
  /** Milestone end label, e.g. "2024", "AUG 2026" or "PRESENT". */
  end: string;
  role: string;
  company: string;
  technologies: string[];
  active?: boolean;
  summary?: string;
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
  },
  {
    start: "APR 2026",
    end: "AUG 2026",
    company: "My InOut (iO)",
    role: "Web Developer · Part-time",
    technologies: [],
  },
  {
    start: "SEP 2024",
    end: "NOV 2024",
    company: "Corom Music Entertainment",
    role: "Software Developer · Freelance",
    technologies: ["Web Development", "Android Development"],
  },
  {
    start: "2022",
    end: "2024",
    company: "Meteor Inovasi Digital",
    role: "Software Developer",
    technologies: ["React", "Laravel", "NestJS"],
  },
  {
    start: "2016",
    end: "2018",
    company: "Dataon",
    role: "Web Developer",
    technologies: ["Angular", "Ionic", "TypeScript"],
  },
  {
    start: "2014",
    end: "2016",
    company: "Freelance",
    role: "Senior Web Developer",
    technologies: ["PHP", "Laravel", "CodeIgniter", "AngularJS"],
  },
  {
    start: "2013",
    end: "2014",
    company: "Xinix",
    role: "Junior Web Developer",
    technologies: ["PHP", "JavaScript", "MySQL"],
  },
];
