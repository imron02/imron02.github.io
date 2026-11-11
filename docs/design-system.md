# Design system

> Read when: adding or changing UI, writing CSS, or checking accessibility. Do not read the whole of `design-system.css` — grep for the class.

## Three style layers

| File | Scope | Imported by |
|---|---|---|
| `src/styles/global.css` | Tailwind import + `@theme` tokens + base resets | `MainLayout.astro` |
| `src/styles/design-system.css` | Global `.ds-*` primitives (the reusable kit) | `MainLayout.astro` |
| `src/styles/game-ui.css` | HUD layout, panel-specific classes, responsive rules, keyframes | `MainLayout.astro` |

Order matters — tokens, then primitives, then HUD overrides.

**Rule of placement:** if a class could be used outside the HUD, it belongs in `design-system.css`. If it encodes HUD composition (`profile-panel`, `quest-board`, `welcome-panel`, `section-overlay`), it belongs in `game-ui.css`. Never add a fourth stylesheet.

Tailwind utilities are available but the codebase is class-based CSS. Match the surrounding style (`.ds-*` classes + `Panel`/`Button` primitives) rather than rewriting to utilities.

## Tokens (`@theme` in `global.css`)

All are CSS custom properties under `:root` via `@theme`.

**Surfaces:** `--color-bg` `#080b25`, `--color-surface`, `--color-surface-elevated`, `--color-surface-overlay`, `--color-surface-hover`

**Brand:** `--color-primary` (purple), `--color-primary-hover`, `--color-primary-dark`, `--color-primary-deep` (`#6b21a8`), `--color-secondary` (cyan), `--color-accent-pink`, `--color-accent-gold`

**Text:** `--color-text-primary`, `-secondary`, `-muted`, `-disabled`

**Lines & status:** `--color-border`, `--color-border-subtle`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`

**Tints (translucent fills):** `--color-tint-ghost`, `-glass`, `-glass-border`, `-divider`, `-highlight`, `-primary`, `-secondary`, `-danger`, `-gold`, `-success`

**Effects:** `--color-focus-ring`, `--color-glow-primary`, `--color-shadow-panel`, `--color-shadow-modal`, `--color-shadow-inset`, `--color-shadow-inset-strong`

**HUD surfaces (opening screen):** `--color-void`, `--color-hud-panel`, `--color-hud-panel-strong`, `-soft`, `-menu`, `-quiet`, `--color-hud-chip`, `--color-hud-card`, `--color-hud-card-solid`, `--color-hud-board`, `--color-hud-tile`, `--color-hud-bar`, `--color-hud-track`

**HUD text tiers:** `--color-text-faint` (`#a3a9cc`), `--color-text-dim` (`#9aa1c6`), `--color-text-ghost` (`#8a91b4`), plus `--color-accent-lilac`, `--color-accent-ice`, `--color-accent-orchid`, `--color-secondary-soft`

**CTA:** `--color-cta-start/mid/deep/end`, `--color-cta-stroke`

**Type:** `--font-display` (Space Grotesk Variable), `--font-body` (Inter Variable), `--font-hud` (Orbitron Variable) — loaded via `@fontsource-variable/*` in `MainLayout.astro`

**Radii:** `--radius-xs` 2px, `--radius-cta` 3px, `--radius-s` 4px, `-m` 8px, `-l` 12px, `-xl` 16px, `-pill` 999px

**Space:** `--space-4` … `--space-96` (4/8/12/16/24/32/48/64/80/96)

Never introduce a new color literal in TSX or in the HUD stylesheet. Alpha variants of a token are derived at use-site with `color-mix(in srgb, var(--color-x) N%, transparent)`; `game-ui.css` is token-only. Both token-only stylesheets forbid color literals and radius literals that have a token; derive alpha variants at use-site with `color-mix()`.

## Typography classes

`ds-display-xl` (64) · `ds-display-lg` (48) · `ds-heading-1` (36) · `ds-heading-2` (28) · `ds-heading-3` (22) · `ds-body-lg` (18) · `ds-body` (16) · `ds-body-sm` (14) · `ds-caption` (12) · `ds-hud` (11, uppercase, 0.18em) · `ds-hud-label` (9, muted) · `ds-hud-micro` (8, disabled)

HUD classes are the "game UI" voice: uppercase Orbitron with wide tracking. Body copy uses `ds-body*`. Headings use Space Grotesk.

Color helpers: `ds-text-primary`, `-secondary`, `-muted`, `-disabled`, `-info`, `-gold`, `ds-gradient-text`.

## Layout helpers

`ds-stack` (grid, 0.9rem gap) · `ds-stack--tight` (0.5rem) · `ds-chip-list` · `ds-info-list` + `ds-info-row` (label/value rows with top borders) · `ds-divider`

## Primitives

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` `primary\|secondary\|ghost\|danger\|disabled`, `icon`, `trailingIcon`, `href`, `external`, `disabled`, `type` | Renders `<a>` when `href` is set; `external` adds `target="_blank" rel="noreferrer"`. `ds-button--block` makes it full-width. |
| `IconButton` | `label` (required), `icon`, `tone` `default\|primary\|danger`, `size` `sm\|md` | Always sets `aria-label` + `title`. Icon-only buttons must use this, not `Button`. |
| `Panel` | `variant` `hud\|glass\|floating\|modal`, `accent` `primary\|secondary\|gold\|pink\|danger`, `as` `section\|aside\|nav\|div\|article` | `hud`/`glass` render the 2px left spine. `modal`/`floating` do not. |
| `Badge` | `tone` `gold\|primary\|secondary\|muted\|success\|danger\|info` | Non-interactive chip. |
| `NavItem` | `index`, `label`, `icon`, `active`, `onClick` | Sets `aria-current="page"` when active. |
| `ProgressBar` | `value` 0–100, `label`, `tone`, `size` `sm\|md` | Clamps internally, exposes `role="progressbar"`. |
| `SkillMeter` | `level`, `max` (default 4), `label` | Segmented pips, `role="img"` + label. |
| `StatTile` | `label`, `value`, `sub`, `subTone` | Static metric block. Currently unused — available for stat rows. |

Primitive conventions to copy:

```tsx
const rootClass = ["ds-button", `ds-button--${variant}`, className]
  .filter(Boolean)
  .join(" ");
```

Boolean/optional props use defaults in the destructure; `class: className` aliasing; `...rest` spread last (except where an explicit prop must win); default export; no React namespace usage.

## Accessibility baseline

- Exactly one `<h1>` on the page — `WelcomePanel`'s title. Detail panels use `<h2>`; nested group titles use `<h3>`. `SkillsTree` starts at `<h3>` (it renders group headings inside the overlay). Do not add a heading level purely to satisfy a numbering rule, and never add a second `<h1>`.
- Every icon-only control has an accessible name (`IconButton`'s `label`).
- Decorative images use `alt=""`; the whole `WorldScene` layer is `aria-hidden`.
- Loading state is a `role="status"` region with `aria-live="polite"`.
- Focus: global `:focus-visible` gives a 3px `--color-focus-ring` outline; components may narrow it to 2px. Never remove the outline.
- Overlay headings are `tabIndex={-1}` programmatic focus targets and suppress the focus ring; opening a section moves focus to its heading, `Escape` returns home and restores focus to `#welcome-title`.
- Interactive targets are real `<button type="button">` or `<a>`. Do not attach `onClick` to `div`s.
- State communicated visually must also be duplicated semantically — e.g. `aria-current`, `aria-valuenow`, the meter's `aria-label`.

## Motion

- Global reduced-motion block in `game-ui.css` neutralizes animation/transition for `prefers-reduced-motion: reduce`.
- New animations go behind `@media (prefers-reduced-motion: no-preference)`; the petal drift and welcome-panel float are the current pair.

## Responsive

Single breakpoint: `@media (max-width: 1023px)`. It restacks `.game-hud` to the mobile rows (system → chips → companion → welcome → quests → tabs), swaps the world layer's positions and images, and reveals the tab bar. Desktop also has three `max-height` compaction tiers (1000/900/820) that shrink the rail so it never scrolls. Spacing/font sizes elsewhere use `clamp()`. Check both layouts for any UI change.
