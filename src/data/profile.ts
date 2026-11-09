// Placeholder content — swap with real data here; components stay untouched.
import type { Locale } from "../i18n/config";

export type SocialIcon = "github" | "linkedin" | "mail";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  href: string;
}

export interface Profile {
  name: string;
  greeting: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
  contactIntro: string;
  about: string[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  socials: SocialLink[];
}

export const profile: Record<Locale, Profile> = {
  id: {
    name: "Imron",
    greeting: "Halo, saya",
    role: "Senior Frontend Engineer",
    tagline: "Membangun antarmuka web yang cepat, elegan, dan mudah dirawat — didukung fondasi full-stack yang kuat.",
    location: "Jakarta, Indonesia",
    email: "halo@imron.dev",
    availability: "Terbuka untuk peluang remote",
    contactIntro: "Punya proyek menarik atau posisi yang cocok? Saya senang mendengar dari Anda.",
    about: [
      "Saya engineer frontend dengan 7+ tahun pengalaman merancang dan membangun produk digital — dari design system, storefront e-commerce, hingga dashboard internal. Fokus saya: performa, aksesibilitas, dan detail interaksi.",
      "Di luar frontend, saya nyaman bekerja lintas stack: API Node.js, skema basis data PostgreSQL, pipeline CI/CD, dan observabilitas. Saya percaya produk terbaik lahir dari engineer yang memahami seluruh lapisannya.",
    ],
    skillGroups: [
      { title: "Frontend", skills: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS", "Vite"] },
      { title: "Backend", skills: ["Node.js", "PostgreSQL", "Redis", "REST API", "GraphQL"] },
      { title: "Tooling & Praktik", skills: ["Git", "Docker", "CI/CD", "Vitest", "Playwright", "Design System", "Aksesibilitas"] },
    ],
    experience: [
      {
        period: "2023 — Sekarang",
        role: "Senior Frontend Engineer",
        company: "PT Digital Nusantara",
        summary: "Memimpin pengembangan design system internal yang dipakai 4 produk dan 30+ engineer.",
        highlights: [
          "Menurunkan waktu rilis fitur UI hingga 40% lewat komponen dan token yang terstandardisasi.",
          "Menaikkan skor Lighthouse aplikasi utama dari 68 ke 95+.",
          "Mentoring 5 engineer junior melalui program code review terstruktur.",
        ],
      },
      {
        period: "2021 — 2023",
        role: "Frontend Engineer",
        company: "TokoPintar",
        summary: "Membangun storefront e-commerce headless dengan 2 juta pengunjung bulanan.",
        highlights: [
          "Mengimplementasikan rendering hybrid (SSR + ISR) yang memangkas LCP 55%.",
          "Menulis 300+ unit dan integration test; coverage frontend naik ke 85%.",
        ],
      },
      {
        period: "2019 — 2021",
        role: "Full-Stack Developer",
        company: "PT Karya Kreatif",
        summary: "Pengembang penuh untuk platform SaaS B2B, dari database hingga antarmuka.",
        highlights: [
          "Merancang REST API Node.js + PostgreSQL yang melayani 20 ribu permintaan/hari.",
          "Membangun antarmuka React dari nol untuk 3 modul produk.",
        ],
      },
    ],
    projects: [
      {
        title: "Luma Design System",
        description: "Pustaka komponen React + token desain dengan dokumentasi interaktif dan visual regression di CI.",
        stack: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
        href: "https://github.com/imron02",
      },
      {
        title: "TokoPintar Storefront",
        description: "Storefront e-commerce headless dengan checkout satu halaman dan skor Lighthouse 95+.",
        stack: ["Next.js", "TypeScript", "Node.js"],
        href: "https://github.com/imron02",
      },
      {
        title: "Kanal Analytics",
        description: "Dashboard analitik internal dengan visualisasi real-time dan ekspor laporan PDF.",
        stack: ["React", "D3.js", "PostgreSQL"],
        href: "https://github.com/imron02",
      },
      {
        title: "kirim.email",
        description: "CLI untuk menguji template email transaksional secara lokal sebelum dikirim ke produksi.",
        stack: ["Node.js", "TypeScript", "CLI"],
        href: "https://github.com/imron02",
      },
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/imron02", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/imron02", icon: "linkedin" },
      { label: "Email", href: "mailto:halo@imron.dev", icon: "mail" },
    ],
  },
  en: {
    name: "Imron",
    greeting: "Hi, I'm",
    role: "Senior Frontend Engineer",
    tagline: "Building fast, elegant, maintainable web interfaces — backed by a strong full-stack foundation.",
    location: "Jakarta, Indonesia",
    email: "halo@imron.dev",
    availability: "Open to remote opportunities",
    contactIntro: "Have an interesting project or role in mind? I'd love to hear from you.",
    about: [
      "I'm a frontend engineer with 7+ years of experience designing and building digital products — from design systems and e-commerce storefronts to internal dashboards. My focus: performance, accessibility, and interaction detail.",
      "Beyond the frontend, I'm comfortable working across the stack: Node.js APIs, PostgreSQL schemas, CI/CD pipelines, and observability. I believe the best products come from engineers who understand every layer.",
    ],
    skillGroups: [
      { title: "Frontend", skills: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS", "Vite"] },
      { title: "Backend", skills: ["Node.js", "PostgreSQL", "Redis", "REST API", "GraphQL"] },
      { title: "Tooling & Practices", skills: ["Git", "Docker", "CI/CD", "Vitest", "Playwright", "Design Systems", "Accessibility"] },
    ],
    experience: [
      {
        period: "2023 — Present",
        role: "Senior Frontend Engineer",
        company: "PT Digital Nusantara",
        summary: "Leading an internal design system used by 4 products and 30+ engineers.",
        highlights: [
          "Cut UI feature release time by 40% through standardized components and tokens.",
          "Raised Lighthouse scores of core apps from 68 to 95+.",
          "Mentored 5 junior engineers through a structured code review program.",
        ],
      },
      {
        period: "2021 — 2023",
        role: "Frontend Engineer",
        company: "TokoPintar",
        summary: "Built a headless e-commerce storefront serving 2 million monthly visitors.",
        highlights: [
          "Implemented hybrid rendering (SSR + ISR) that reduced LCP by 55%.",
          "Wrote 300+ unit and integration tests, lifting frontend coverage to 85%.",
        ],
      },
      {
        period: "2019 — 2021",
        role: "Full-Stack Developer",
        company: "PT Karya Kreatif",
        summary: "Solo developer for a B2B SaaS platform, from database to interface.",
        highlights: [
          "Designed a Node.js + PostgreSQL REST API serving 20k requests/day.",
          "Built the React interface from scratch for 3 product modules.",
        ],
      },
    ],
    projects: [
      {
        title: "Luma Design System",
        description: "React component library + design tokens with interactive docs and CI visual regression.",
        stack: ["React", "TypeScript", "Storybook", "Tailwind CSS"],
        href: "https://github.com/imron02",
      },
      {
        title: "TokoPintar Storefront",
        description: "Headless e-commerce storefront with single-page checkout and 95+ Lighthouse score.",
        stack: ["Next.js", "TypeScript", "Node.js"],
        href: "https://github.com/imron02",
      },
      {
        title: "Kanal Analytics",
        description: "Internal analytics dashboard with real-time visualizations and PDF report export.",
        stack: ["React", "D3.js", "PostgreSQL"],
        href: "https://github.com/imron02",
      },
      {
        title: "kirim.email",
        description: "A CLI to test transactional email templates locally before shipping to production.",
        stack: ["Node.js", "TypeScript", "CLI"],
        href: "https://github.com/imron02",
      },
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/imron02", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/imron02", icon: "linkedin" },
      { label: "Email", href: "mailto:halo@imron.dev", icon: "mail" },
    ],
  },
};
