# Design system

> Read when: adding/changing UI, writing utilities, checking accessibility.

## One stylesheet

| File | Scope |
|---|---|
| `src/styles/global.css` | Tailwind import, the five `@custom-variant` breakpoints, `@theme` tokens (incl. `--animate-*` keys + keyframes), base resets, reduced-motion neutralizer |

Only project stylesheet; font packages are imported in `MainLayout.astro`. No `.ds-*` or BEM stylesheets — every component styled with Tailwind utilities in the `.tsx` / `.astro` file that renders it. Shared class data lives in two helpers:

- **`cn(...)`** (`src/lib/cn.ts`) = `twMerge(clsx(...))`. Conflicting utilities in same class group collapse, **last argument wins**. Caller's `class` / `bodyClass` / `spineClass` always the last `cn` argument. Tuned so `font-size` does not resolve against `leading`, and the three project animations merge as one group. Single-source classes skip it: a lone literal is `class="…"`, a lone cva call is `class={panel({ variant })}`.
- **`cva(...)`** (`class-variance-authority`) — variants as data: `ui/` primitives (Panel, Button, Badge, NavItem, ProgressBar, SkillMeter, StatTile) plus component-local recipes (QuestBoard card, TabBar item). cva only concatenates; wrap it in `cn(...)` only when another source must merge over it — `cn(panel({ variant }), className)`.

Hard rules:

- Trailing `!` allowed only when a utility must beat an **ancestor** rule or `@layer base`. None today. Component-to-component precedence: `cn` argument order; variant precedence (`xs:` over `mobile:`): CSS emission order.
- Never build class names dynamically. Every class string a complete literal in source; cva variant maps the only indirection, their values literals.
- Gradients are background **images**: `bg-[linear-gradient(...)]` / `bg-[radial-gradient(...)]`, never the `[background:…]` arbitrary property — that group can never be overridden by a later `bg-<color>`.
- Always spell transitions in full: `transition-[background-color,color] duration-150 ease-[ease]`.
- Underscores inside arbitrary values become spaces: `bg-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]`.
- Canonical classes first: when the scale class or `@theme` token is numerically identical, use the utility — `py-[6px]`→`py-1.5`, `p-[13px]`→`p-3.25`, `w-[62px]`→`w-15.5`, `gap-[0.5rem]`→`gap-2`, `rounded-[var(--radius-m)]`→`rounded-m`, `opacity-[0.85]`→`opacity-85`, `duration-[150ms]`→`duration-150`, `aspect-[16/9]`→`aspect-video`. Spacing utilities are rem-based (`--spacing: 0.25rem`), so they follow the root font size; a raw `px` arbitrary value does not.
- Keep arbitrary values only where no exact class exists: non-quarter multipliers (`gap-[0.9rem]`), fluid `clamp()`/`env()`/`min()` lengths, multi-value padding/margin without exact parts, sub-pixel font sizes and tracking (`text-[8.5px]`, `tracking-[1.4px]`), `color-mix(in srgb, …)` alpha derivations, gradients, shadows, `flex-[…]`/`grid-cols-[…]` templates. `pnpm lint` enforces the padding/gap/radius cases (`nursery/noTailwindArbitraryValue`, allowlist in `biome.json`).

## Tokens (`@theme` in `global.css`)

All CSS custom properties under `:root` via `@theme`.

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

**Radii:** `--radius-xs` 2px, `--radius-cta` 3px, `--radius-s` 4px, `-m` 8px, `-l` 12px, `-xl` 16px, `-pill` 999px — referenced as `rounded-xs`, `rounded-cta`, `rounded-s`, `rounded-m`, `rounded-l`, `rounded-xl`; `--radius-pill` (999px) is `rounded-full`, which Tailwind emits as `calc(infinity * 1px)` — use it only on square elements; a `50%` ellipse needs `rounded-[50%]`

**Space:** `--space-4` … `--space-96` (4/8/12/16/24/32/48/64/80/96)

Never introduce a raw color literal in TSX or CSS. Whole-token values use generated utilities (`text-text-muted`, `bg-hud-panel`, `border-border-subtle`, `bg-tint-gold`); alpha derivations keep the expression without the redundant `color:` type hint: `bg-[color-mix(…)]`, `text-[color-mix(…)]`, `border-[color-mix(…)]`.

## Typography (`src/lib/typography.ts`)

`text({ role })` cva replaces old `.ds-*` classes. Roles: `heading-2` (28px display) · `heading-3` (22px) · `body-sm` (14px) · `caption` (12px) · `hud-label` (9px Orbitron, uppercase, 0.18em, muted) · `hud-micro` (8px, disabled). Every role bundles `m-0`, family, line-height, tracking where relevant, color. HUD roles = "game UI" voice (uppercase Orbitron, wide tracking); body copy Inter; headings Space Grotesk.

`cn` no longer resolves font-size against line-height, so callers can resize a role without losing leading: `cn(text({ role: "hud-label" }), "text-[8px]")`.

Color helpers plain utilities: `text-text-primary`, `-secondary`, `-muted`, `-disabled`, `text-info`, `text-accent-gold`. Gradient-filled text uses `gradientText`; add `[-webkit-background-clip:text]` only where original CSS had the prefixed declaration — welcome title relies on it.

## Layout helpers

Inline recipes — no classes:

- stack `grid gap-[0.9rem]` · tight stack `grid gap-2`
- chip list `flex flex-wrap gap-1.5 list-none m-0 p-0`
- info rows `flex items-center justify-between gap-4 py-1.5 border-t border-border-subtle first:border-t-0`, their `dd`: `m-0 text-right`
- block button `w-full justify-between` (passed as `class`; `cn` merges it over base `justify-center`)

## Primitives

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` `primary\|secondary\|ghost\|danger\|disabled`, `icon`, `trailingIcon`, `href`, `external`, `disabled`, `type` | Renders `<a>` when `href` set; `external` adds `target="_blank" rel="noreferrer"`. Full-width rows get `class="w-full justify-between"`. |
| `IconButton` | `label` (required), `icon`, `tone` `default\|primary\|danger`, `size` `sm\|md` | Always sets `aria-label` + `title`. Icon-only buttons must use this, not `Button`. |
| `Panel` | `variant` `hud\|glass\|floating\|modal`, `accent` `primary\|secondary\|gold\|pink\|danger`, `as` `section\|aside\|nav\|div\|article`, `bodyClass`, `spine` (default `true`), `spineClass` | `hud`/`glass` render 2px left spine unless `spine={false}`. `bodyClass`/`spineClass` merge after variant utilities, so padding/gap/gradient overrides win. |
| `Badge` | `tone` `gold\|primary\|secondary\|muted\|success\|danger\|info` | Non-interactive chip. |
| `NavItem` | `index`, `label`, `icon`, `active`, `onClick` | Styles baked for GameMenu context (only consumer). Sets `aria-current="page"` when active. |
| `ProgressBar` | `value` 0–100, `label`, `tone`, `size` `sm\|md` | Clamps internally, exposes `role="progressbar"`. Caller `class` lands on root; tone bar is a `[&>span]` target for overrides. |
| `SkillMeter` | `level`, `max` (default 4), `label` | Segmented pips, `role="img"` + label. |
| `StatTile` | `label`, `value`, `sub`, `subTone` | Static metric block. Currently unused — available for stat rows. |

Primitive conventions to copy:

```tsx
const panel = cva("relative flex min-w-0 text-left", {
  variants: { variant: { hud: "bg-hud-panel …", glass: "…" } },
  defaultVariants: { variant: "hud" },
});

<Tag class={cn(panel({ variant }), className)} {...rest}>
```

Boolean/optional props use defaults in destructure; `class: className` aliasing; `...rest` spread last (except where explicit prop must win); default export; no React namespace usage.

## Accessibility baseline

- Exactly one `<h1>` on page — `WelcomePanel`'s title. Detail panels use `<h2>`; nested group titles `<h3>`. `SkillsTree` starts at `<h3>` (renders group headings inside overlay). Do not add a heading level purely to satisfy a numbering rule, and never add a second `<h1>`.
- Every icon-only control has an accessible name (`IconButton`'s `label`).
- Decorative images use `alt=""`; whole `WorldScene` layer is `aria-hidden`.
- Loading state is a `role="status"` region with `aria-live="polite"`.
- Focus: global `:focus-visible` gives 3px `--color-focus-ring` outline; components may narrow to 2px. Never remove the outline.
- Overlay headings: `tabIndex={-1}` programmatic focus targets, suppress focus ring; opening a section moves focus to its heading, `Escape` returns home and restores focus to `#welcome-title`.
- Interactive targets are real `<button type="button">` or `<a>`. Do not attach `onClick` to `div`s.
- State communicated visually must also be duplicated semantically — e.g. `aria-current`, `aria-valuenow`, meter's `aria-label`.

## Motion

- `@keyframes` for `panel-float`, `petal-float`, `bar-shimmer`, `hint-fade`, `reveal-right`, `reveal-up`, `chevron-loop`, `bot-bob`, `status-ping`, `glow-pulse`, `sheen-sweep` and `caret-blink` live inside `@theme` in `global.css`, exposed as matching `--animate-*` tokens (`petal-float-long` encodes `9s` / `-3s` delay in shorthand). Apply only via `motion-safe:animate-*` — welcome panel float, petal drift, loading-bar shimmer, loading-hint fade, HUD entrance reveals, CTA chevron wave, companion bot bob/status ping, active-item glow and sheen, typewriter caret. Register every new name in the `cn.ts` tailwind-merge `animate` theme too. Decorative overlays that only exist to animate (active-item sheen/glow rings, status ping ring) also carry `motion-reduce:hidden`.
- Entrance reveals (`reveal-right` on `GameMenu` rows, `reveal-up` on `QuestBoard` cards) start when `$isLoading` turns false, not at mount, so the 10 s loading cover never hides them. They are gated through a mount-time latch (`useRevealed`): the reveal runs only if the island mounted while the loading cover was still up. Preact hydration does not patch attributes, so the post-mount state flag makes the class appear one render later; if the loader was already gone at mount (warm cache), the HUD was painted without the reveal class, and replaying it would hide already-visible content.
- Per-item stagger is an inline `animationDelay` (`index * 55ms` / `index * 70ms`); it is inert while the class is absent and stays a literal style, never a dynamic class.
- Global `prefers-reduced-motion: reduce` block pins animation/transition durations to 0.01 ms with `animation-iteration-count: 1`.
- New motion: add keyframe + `--animate-*` token in `@theme`, apply behind `motion-safe:`.
- JS hover feedback lives in `src/lib/hoverMotion.ts` (`hoverStart`/`hoverStop`), wired via `onPointerEnter`/`onPointerLeave` with module-level keyframe constants (`NavItem`, `WelcomePanel` CTA, `QuestBoard` cards; spring 400/25 from the `motion` vanilla `animate()`). JS drives `transform` only; CSS owns colour and shadow (`hover:shadow-*` + `transition-[…,box-shadow]`), so cva variants restore their own shadow and `color-mix()` shadows interpolate natively. A component's CSS `transition-` list must exclude `transform` where motion writes it per frame. The inline `transform` is removed when the leave spring settles, so later CSS transforms on the node keep working. Handlers no-op under `prefers-reduced-motion: reduce`; the `motion-safe:` CSS parts (CTA chevron stagger) disappear with it. `motion` is an approved runtime dependency (AGENTS.md rule 9) and the only JS animation source.

## Responsive

Five custom variants registered in `global.css`. Tailwind emits `@custom-variant` blocks in registration order, so **later wins without `!`** — `mobile` before `xs` is load-bearing:

| Variant | Condition |
|---|---|
| `mobile:` | `(max-width: 1023px)` |
| `xs:` | `(max-width: 400px)` — overrides `mobile:` at ≤400px by registration order |
| `short-1000:` | `(min-width: 1024px) and (max-height: 1000px) and (height > 900px)` |
| `short-900:` | `(min-width: 1024px) and (max-height: 900px) and (height > 820px)` |
| `short-820:` | `(min-width: 1024px) and (max-height: 820px)` |

Three short tiers mutually exclusive, together cover every height. Design's old stacked `max-height` media queries were cumulative: when matching them, compute **effective value per band** (>1000px / 901–1000 / 821–900 / ≤820) and emit it on the matching variant. `mobile:` layout restacks HUD to rows (system → chips → companion → welcome → quests → tabs), swaps world layer positions/images, reveals tab bar; desktop short tiers shrink rail so it never scrolls. Spacing/font sizes elsewhere use `clamp()`. Check both layouts and all three desktop tiers for any UI change.