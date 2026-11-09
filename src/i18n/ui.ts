import type { Locale } from "./config";

export interface Ui {
  nav: { about: string; skills: string; experience: string; projects: string; contact: string };
  actions: { downloadCv: string; viewProjects: string };
  a11y: { skipToContent: string; navToggle: string; langSwitch: string };
  meta: { title: string; description: string };
  footer: { built: string };
}

export const ui: Record<Locale, Ui> = {
  id: {
    nav: { about: "Tentang", skills: "Keahlian", experience: "Pengalaman", projects: "Proyek", contact: "Kontak" },
    actions: { downloadCv: "Unduh CV", viewProjects: "Lihat proyek" },
    a11y: {
      skipToContent: "Lewati ke konten",
      navToggle: "Buka menu navigasi",
      langSwitch: "Ganti bahasa ke Inggris",
    },
    meta: {
      title: "Imron — Senior Frontend Engineer",
      description: "Portofolio dan CV Imron — Senior Frontend Engineer dengan kemampuan full-stack. Membangun antarmuka web yang cepat, elegan, dan mudah dirawat.",
    },
    footer: { built: "Dibuat dengan Astro, Tailwind CSS, dan TypeScript." },
  },
  en: {
    nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects", contact: "Contact" },
    actions: { downloadCv: "Download CV", viewProjects: "View projects" },
    a11y: {
      skipToContent: "Skip to content",
      navToggle: "Toggle navigation menu",
      langSwitch: "Switch to Bahasa Indonesia",
    },
    meta: {
      title: "Imron — Senior Frontend Engineer",
      description: "Portfolio and CV of Imron — Senior Frontend Engineer with full-stack capabilities. Building fast, elegant, maintainable web interfaces.",
    },
    footer: { built: "Built with Astro, Tailwind CSS, and TypeScript." },
  },
};
