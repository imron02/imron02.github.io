import { cva } from "class-variance-authority";

export const text = cva("m-0", {
  variants: {
    role: {
      "heading-2":
        "font-display text-[28px] leading-[1.21] font-semibold tracking-[-0.01em] text-text-primary",
      "heading-3":
        "font-display text-[22px] leading-[1.27] font-medium tracking-normal text-text-primary",
      "body-sm": "font-body text-[14px] leading-[1.57] font-normal text-text-primary",
      caption: "font-body text-[12px] leading-normal font-normal text-text-primary",
      "hud-label":
        "font-hud text-[9px] leading-[1.2] font-normal tracking-[0.18em] uppercase text-text-muted",
      "hud-micro":
        "font-hud text-[8px] leading-[1.2] font-normal tracking-[0.12em] uppercase text-text-disabled",
    },
  },
});

/** Gradient-filled text used by LoadingScreen and the welcome title. */
export const gradientText =
  "bg-[linear-gradient(90deg,var(--color-text-primary)_0%,var(--color-primary-hover)_55%,var(--color-secondary)_100%)] bg-clip-text text-transparent";
