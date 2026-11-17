export type ProjectCategory = "Web Application" | "Mobile" | "Creative";

/** Archive filter buckets — one quest may belong to several. */
export type ProjectFilter = "web" | "mobile" | "fullstack" | "labs";

export type ProjectStatus = "completed" | "ongoing";

export type ProjectDifficulty = "normal" | "advanced" | "expert";

/** Glyph keys resolved by `techGlyphs` in `projects/questMeta.tsx`. */
export type ProjectTechIcon =
  | "smartphone"
  | "rocket"
  | "file-code"
  | "server"
  | "terminal"
  | "orbit"
  | "atom"
  | "wind"
  | "layers"
  | "boxes"
  | "sparkles"
  | "bot"
  | "brain"
  | "home"
  | "map-pin"
  | "camera"
  | "globe"
  | "gift"
  | "star"
  | "users"
  | "utensils"
  | "shopping-cart"
  | "target"
  | "coins"
  | "ticket"
  | "music"
  | "mic"
  | "video"
  | "store"
  | "megaphone"
  | "gamepad-2"
  | "clipboard-check"
  | "user-check"
  | "building"
  | "briefcase"
  | "search"
  | "award"
  | "heart"
  | "repeat"
  | "shield-check"
  | "calendar"
  | "clock";

// Single source for the HUD board tier chip: tone + short label.
export const tierMeta: Record<"recommended" | "future", { tone: "gold" | "info"; chip: string }> = {
  recommended: { tone: "gold", chip: "Rec" },
  future: { tone: "info", chip: "Future" },
};

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Card copy on the quest card; detail view may use `summary`. */
  description: string;
  thumbnail: string;
  technologies: string[];
  /** Card glyph strip, up to four decorative glyphs; not aligned with `technologies`. */
  techIcons: ProjectTechIcon[];
  /** Card category line, e.g. "MOBILE / COMMERCE". */
  sector: string;
  filters: ProjectFilter[];
  status: ProjectStatus;
  difficulty: ProjectDifficulty;
  demoUrl?: string;
  featured: boolean;
  tier?: "recommended" | "future";
  /** Long detail description; falls back to `description`. */
  summary?: string;
  /** Detail subtitle; falls back to `sector` without the separators. */
  subtitle?: string;
  role?: string;
  platform?: string;
  completedAt?: string;
  contributions?: string[];
}

export const projects: Project[] = [
  {
    id: "q001",
    title: "ALFAMIND",
    category: "Mobile",
    sector: "MOBILE / COMMERCE",
    description:
      "Virtual retail and commerce platform for independent store owners — sell products and digital services via smartphone.",
    thumbnail: "images/quest-01.webp",
    technologies: ["React Native", "Expo", "TypeScript", "Frappe", "Python"],
    techIcons: ["smartphone", "rocket", "file-code", "server", "terminal"],
    filters: ["mobile"],
    status: "ongoing",
    difficulty: "normal",
    demoUrl: "https://alfamind.id/",
    featured: true,
    subtitle: "MOBILE COMMERCE PLATFORM",
    summary:
      "A mobile commerce application designed to help small retail entrepreneurs manage products, sales, and digital services.",
    role: "Fullstack Developer",
    platform: "Android",
    completedAt: "2024",
    contributions: [
      "Mobile application development",
      "UI architecture and component implementation",
      "API integration",
      "Application performance improvements",
    ],
  },
  {
    id: "q002",
    title: "COROM",
    category: "Web Application",
    sector: "WEB / MUSIC TECH",
    description:
      "Platform for independent artists: community, learning programs, and live-music experiences in one place.",
    thumbnail: "images/quest-02.webp",
    technologies: ["React Native", "TypeScript", "Firebase"],
    techIcons: ["orbit", "atom", "file-code", "wind"],
    filters: ["web"],
    status: "completed",
    difficulty: "advanced",
    demoUrl: "https://corom.me/",
    featured: true,
  },
  {
    id: "q003",
    title: "MYINOUT PORTAL",
    category: "Web Application",
    sector: "WEB / FINTECH / AI",
    description:
      "AI-powered collaborative financial platform uniting personal, family, and business finances in one portal.",
    thumbnail: "images/quest-03.webp",
    technologies: ["Node.js", "TypeScript", "Astro", "Python"],
    techIcons: ["atom", "layers", "boxes", "file-code"],
    filters: ["fullstack"],
    status: "completed",
    difficulty: "expert",
    demoUrl: "https://myinout.io",
    featured: true,
    tier: "recommended",
  },
  {
    id: "q004",
    title: "TALENTDNA",
    category: "Web Application",
    sector: "WEB / AI / TALENT",
    description:
      "AI talent discovery platform mapping DRIVE, NETWORK, and ACTION to reveal natural potential.",
    thumbnail: "images/quest-04.webp",
    technologies: ["Flutter"],
    techIcons: ["terminal", "file-code", "sparkles", "server"],
    filters: ["fullstack"],
    status: "completed",
    difficulty: "advanced",
    demoUrl: "https://talentdna.me",
    featured: true,
    tier: "recommended",
  },
  {
    id: "q005",
    title: "AI EXPERIMENTS",
    category: "Creative",
    sector: "EXPERIMENTAL / AI",
    description:
      "Personal exploration of LLMs, RAG, agents, and AI-assisted engineering workflows.",
    thumbnail: "images/quest-05.webp",
    technologies: ["Python", "LLM", "RAG", "Preact"],
    techIcons: ["bot", "brain", "terminal", "sparkles"],
    filters: ["labs"],
    status: "ongoing",
    difficulty: "expert",
    featured: true,
    tier: "future",
  },
  {
    id: "q006",
    title: "ANANTA VILLA",
    category: "Web Application",
    sector: "WEB / HOSPITALITY",
    description: "Elegant villa website for a Bali accommodation destination.",
    thumbnail: "images/quest-06.webp",
    technologies: ["Angularjs", "Firebase"],
    techIcons: ["home", "map-pin", "camera", "globe"],
    filters: ["web"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q007",
    title: "SUBWAY LOYALTY",
    category: "Mobile",
    sector: "MOBILE / LOYALTY",
    description: "Customer loyalty and rewards experience associated with Subway.",
    thumbnail: "images/quest-07.webp",
    technologies: ["React", "Tailwind CSS", "Laravel"],
    techIcons: ["gift", "star", "smartphone", "users"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q008",
    title: "YUMMYSHOP",
    category: "Mobile",
    sector: "MOBILE / FOOD COMMERCE",
    description: "Online food commerce for merchants: selling, delivery, sales records.",
    thumbnail: "images/quest-08.webp",
    technologies: ["React Native", "Midtrans"],
    techIcons: ["utensils", "shopping-cart", "map-pin", "smartphone"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "advanced",
    featured: true,
  },
  {
    id: "q009",
    title: "VELOsofi",
    category: "Mobile",
    sector: "MOBILE / LIFESTYLE",
    description: "Lifestyle rewards app with missions, points, and voucher redemption.",
    thumbnail: "images/quest-09.webp",
    technologies: ["React Native", "TypeScript"],
    techIcons: ["target", "coins", "ticket", "gift"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q010",
    title: "MUSIKBAGUS",
    category: "Web Application",
    sector: "WEB / MUSIC COMMUNITY",
    description: "Platform connecting artists and enthusiasts around music discovery.",
    thumbnail: "images/quest-10.webp",
    technologies: ["Flutter"],
    techIcons: ["music", "mic", "video", "users"],
    filters: ["web"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q011",
    title: "ROOMME MOBILE",
    category: "Mobile",
    sector: "MOBILE / PROPTECH",
    description: "Boarding-house discovery app with room listings and resident community.",
    thumbnail: "images/quest-11.webp",
    technologies: ["React Native", "TypeScript"],
    techIcons: ["home", "map-pin", "users", "smartphone"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "advanced",
    featured: true,
  },
  {
    id: "q012",
    title: "BOOSTPENJUAL",
    category: "Mobile",
    sector: "MOBILE / MERCHANT",
    description: "Merchant loyalty app with digital promotions and rewards.",
    thumbnail: "images/quest-12.webp",
    technologies: ["React Native", "TypeScript", "React Native Paper"],
    techIcons: ["store", "gift", "users", "megaphone"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q013",
    title: "BOOSTPLAY",
    category: "Mobile",
    sector: "MOBILE / GAMIFICATION",
    description: "Shopping gamification app — play games, earn Boost coupons.",
    thumbnail: "images/quest-13.webp",
    technologies: ["React Native", "React Native Paper", "TypeScript", "Gamification"],
    techIcons: ["gamepad-2", "gift", "star", "coins"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "advanced",
    featured: true,
  },
  {
    id: "q014",
    title: "BOOSTPRENEUR",
    category: "Mobile",
    sector: "MOBILE / FIELD AGENT",
    description: "Field-agent app to register and validate merchants across the network.",
    thumbnail: "images/quest-14.webp",
    technologies: ["React Native", "Google Maps"],
    techIcons: ["clipboard-check", "user-check", "map-pin", "building"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    featured: true,
  },
  {
    id: "q015",
    title: "IDTALENT",
    category: "Web Application",
    sector: "WEB / HRTECH",
    description: "Talent and career development platform connecting people and orgs.",
    thumbnail: "images/quest-15.webp",
    technologies: ["Laravel", "MySQL"],
    techIcons: ["briefcase", "users", "search", "award"],
    filters: ["web"],
    status: "completed",
    difficulty: "normal",
    demoUrl: "https://example.com/quests/q015",
    featured: true,
  },
  {
    id: "q016",
    title: "FLUTTER ASIA",
    category: "Mobile",
    sector: "MOBILE / SOCIAL",
    description: "Social discovery app for finding and matching with nearby people.",
    thumbnail: "images/quest-16.webp",
    technologies: ["Angular"],
    techIcons: ["heart", "map-pin", "users", "repeat"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    demoUrl: "https://example.com/quests/q016",
    featured: true,
  },
  {
    id: "q017",
    title: "SUNFISHGO ONBOARD",
    category: "Mobile",
    sector: "MOBILE / HRTECH",
    description: "Enterprise HR mobile experience for employee onboarding.",
    thumbnail: "images/quest-17.webp",
    technologies: ["Angular"],
    techIcons: ["shield-check", "calendar", "users", "clipboard-check"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    demoUrl: "https://example.com/quests/q017",
    featured: true,
  },
  {
    id: "q018",
    title: "SUNFISH GO",
    category: "Mobile",
    sector: "MOBILE / HRTECH",
    description: "Employee self-service mobile app: attendance, leave, claims.",
    thumbnail: "images/quest-18.webp",
    technologies: ["Angular", "Loopback"],
    techIcons: ["clock", "calendar", "file-code", "users"],
    filters: ["mobile"],
    status: "completed",
    difficulty: "normal",
    demoUrl: "https://example.com/quests/q018",
    featured: true,
  },
];
