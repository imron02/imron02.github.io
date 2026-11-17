export type ContactChannelId = "email" | "linkedin" | "github";

export interface ContactChannel {
  id: ContactChannelId;
  code: string;
  title: string;
  eyebrow: string;
  state: string;
  description: string;
}

export interface ContactChannelLink extends ContactChannel {
  href: string;
  handle: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    code: "CH-01",
    title: "EMAIL",
    eyebrow: "SEND AN EMAIL",
    state: "DIRECT",
    description:
      "For professional inquiries, collaborations, and opportunities that deserve a considered plan.",
  },
  {
    id: "linkedin",
    code: "CH-02",
    title: "LINKEDIN",
    eyebrow: "CONNECT ON LINKEDIN",
    state: "PROFESSIONAL",
    description:
      "Let's connect professionally — conversations about product, frontend craft, and new quests.",
  },
  {
    id: "github",
    code: "CH-03",
    title: "GITHUB",
    eyebrow: "EXPLORE MY CODE",
    state: "PUBLIC",
    description:
      "Discover the projects, experiments, and open-source artifacts behind this portfolio.",
  },
];

export const contactCopy = {
  eyebrow: "INCOMING TRANSMISSION",
  index: "/ 06",
  title: "LET'S\nCONNECT",
  description:
    "Every great adventure starts with a conversation. Have an idea, opportunity, or interesting project? Let's talk.",
  ticker: "AWAITING INCOMING SIGNAL",
  channels: {
    eyebrow: "SELECT A CHANNEL",
    title: "COMMUNICATION CHANNELS",
    intro: "Three ways into the chamber. Pick whichever fits the conversation you want to start.",
    meta: "RESPONSES ARE MANUAL — NO AUTO-REPLY",
  },
  closing: {
    kicker: "CHANNEL 06 // OPEN",
    title: "READY FOR THE NEXT QUEST?",
    quote: "Let's turn an interesting idea into something meaningful.",
  },
} as const;
