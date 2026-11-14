export type AttributeTier = "SPECIALIZATION" | "STRONG" | "EXPERIENCED" | "EXPLORING";

export type AttributeTone = "primary" | "pink" | "secondary" | "gold";

export type AttributeIcon = "code" | "smartphone" | "layout" | "puzzle" | "layers" | "sparkles";

export interface Attribute {
  name: string;
  icon: AttributeIcon;
  tier: AttributeTier;
  tone: AttributeTone;
  level: number;
}

/** Every attribute is rated on the same 5-segment qualitative scale. */
export const attributeScale = 5;

export const attributes: Attribute[] = [
  {
    name: "Frontend Engineering",
    icon: "code",
    tier: "SPECIALIZATION",
    tone: "primary",
    level: 5,
  },
  {
    name: "Mobile Development",
    icon: "smartphone",
    tier: "SPECIALIZATION",
    tone: "pink",
    level: 5,
  },
  { name: "UI Architecture", icon: "layout", tier: "STRONG", tone: "secondary", level: 4 },
  { name: "Problem Solving", icon: "puzzle", tier: "STRONG", tone: "secondary", level: 4 },
  { name: "Fullstack Development", icon: "layers", tier: "EXPERIENCED", tone: "pink", level: 3 },
  {
    name: "AI-Assisted Development",
    icon: "sparkles",
    tier: "EXPLORING",
    tone: "gold",
    level: 2,
  },
];
