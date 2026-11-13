export const MOBILE_QUERY = "(max-width: 1023px)";

export const WORLD_ASSETS = {
  background: "images/world-bg.webp",
  characterMobile: "images/character-mobile.webp",
  characterDesktop: "images/character.webp",
} as const;

export const worldAssetUrls = (base: string, isMobile: boolean): string[] => [
  `${base}${WORLD_ASSETS.background}`,
  `${base}${isMobile ? WORLD_ASSETS.characterMobile : WORLD_ASSETS.characterDesktop}`,
];
