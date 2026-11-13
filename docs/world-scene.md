# World scene

> Read when: change opening-screen backdrop, hero art, fades, petals, or world assets.

Home world = flat layer stack rendered by `src/components/world/WorldScene.astro` — static Astro, no island, no canvas. Every position = percentage of 1920×1080 design frame (`qlSqT` in `design/CV-Game.pen`); `mobile:` variant re-maps to 430×932 frame (`NG14P`). All styling = Tailwind utilities inline in `.astro` markup.

## Layer stack

Desktop order bottom → top:

| Layer | Element | Geometry (1920×1080) | Style |
|---|---|---|---|
| Background | root `<img>` (`z-0`, `object-cover object-center`) | full bleed | `images/world-bg.webp` |
| Ambient | first radial `<div>` (`z-[1]`) | 180,420 · 1000×660 | radial primary-dark → secondary → transparent, opacity 0.5, blur 60 |
| Fog | horizontal band `<div>` (`z-[2]`) | 0,700 · 100%×200 | horizontal secondary gradient, opacity 0.35, blur 60 |
| Aura | character halo `<div>` (`z-[3]`) | 560,270 · 660×700 | radial primary, opacity 0.7 |
| Shadow | ground shadow `<div>` (`z-[4]`) | 700,804 · 340×32 | radial void, opacity 0.55, blur 8 |
| Character | `<div>` wrapper (`z-[5]`) around one `<picture>` | 678,392 · 433×687 | `images/character.webp` (desktop), `character-mobile.webp` via `media="(max-width: 1023px)"`, `object-fit: cover` |
| Petals | petal `<span>`s (`z-[6]`) ×16 desktop + 7 mobile | `--x --y --w --h --rot` custom props | `rounded-full`, accent-pink, `--o` opacity |
| Fades | left/right `<span>`s (left `z-[7]` + right no z-index, both `mobile:hidden`) + top/bottom (`mobile:z-[1]`) | see utilities | void gradients as `bg-[linear-gradient(...)]` |

Mobile reorders via `z-index`: two fades sit directly on background, then ambient, fog, aura add light on top; character and petals stay above. Left/right fades and shadow hidden, character swaps to `character-mobile.webp` (`object-fit: contain`, right-aligned), seven mobile petals replace desktop sixteen.

## Assets

`design/CV-Game-assets/` = local source-art archive (gitignored; not in repo). `public/images/` holds shipped WebP versions:

| Output | Source | Notes |
|---|---|---|
| `world-bg.webp` | `generated-3.png` | 1376×768, cover crop |
| `character.webp` | `generated.webp` | cropped to alpha bbox `(430,16)-(897,756)`; design's `cover` + scale-3.027 transform pre-applied by crop |
| `character-mobile.webp` | `char-cutout-fade.png` | cropped to `(431,22)-(894,514)` |
| `avatar.webp` | `generated-2.png` | 320×320 face crop |
| `quest-01…03.webp` | `generated-4/5/6.png` | 640×272, q80 |
| `quest-04.webp` | `stock-quest-05-ai-experiments.jpg` | 640×272, q80 |

Regenerate with Pillow (WebP alpha survives; verify `mode == "RGBA"` for character files). Never ship PNG sources.

## Motion

Petal drift uses `motion-safe:animate-petal-float` — alternating petals use `motion-safe:animate-petal-float-long` (old `:nth-of-type(odd)` counted all span siblings and four decorative spans precede petals, so even array indices get long animation). Welcome-panel float = `motion-safe:animate-panel-float` on `WelcomePanel`. Global `prefers-reduced-motion: reduce` block in `global.css` pins animation to 0.01 ms. New backdrop motion must follow same `motion-safe:` pattern.

## Invariants

- `WorldScene` renders once in `index.astro` before HUD, with `aria-hidden="true"` and empty `alt` on background and character images.
- Background image = `loading="eager"` + `fetchpriority="high"`; `LoadingScreen` also preloads it with `new Image()`.
- Every colour derives from `@theme` tokens via `color-mix()`; no raw hex.
- Do not add canvas, WebGL, or animation loop. World intentionally static layers.