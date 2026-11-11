# World scene

> Read when: changing the opening-screen backdrop, hero art, fades, petals, or world assets.

The home world is a flat layer stack rendered by `src/components/world/WorldScene.astro` — static Astro, no island, no canvas. Every position is a percentage of the 1920×1080 design frame (`qlSqT` in `design/CV-Game.pen`); the `max-width: 1023px` block re-maps them to the 430×932 frame (`NG14P`).

## Layer stack

Desktop order bottom → top:

| Layer | Element | Geometry (1920×1080) | Style |
|---|---|---|---|
| Background | `.world-scene__bg` | full bleed | `images/world-bg.webp`, `object-fit: cover` |
| Ambient | `.world-scene__ambient` | 180,420 · 1000×660 | radial primary-dark → secondary → transparent, opacity 0.5, blur 60 |
| Fog | `.world-scene__fog` | 0,700 · 100%×200 | horizontal secondary band, opacity 0.35, blur 60 |
| Aura | `.world-scene__aura` | 560,270 · 660×700 | radial primary, opacity 0.7 |
| Shadow | `.world-scene__shadow` | 700,804 · 340×32 | radial void, opacity 0.55, blur 8 |
| Character | `.world-scene__character` | 678,392 · 433×687 | one `<picture>`: `images/character.webp` (desktop), `character-mobile.webp` via `media="(max-width: 1023px)"`, `object-fit: cover` |
| Petals | `.world-scene__petal--desktop` ×16 | `--x --y --w --h --rot` custom props | 50% radius, accent-pink, `--o` opacity |
| Fades | `--left/right/top/bottom` | see CSS | void gradients |

Mobile reorders with `z-index`: the two fades sit directly on the background, then ambient, fog and aura add light on top; character and petals stay above. Left/right fades and the shadow are hidden, the character swaps to `character-mobile.webp` (`object-fit: contain`, right-aligned), and seven mobile petals replace the desktop sixteen.

## Assets

`design/CV-Game-assets/` is the local source-art archive (gitignored; not part of the repo). `public/images/` holds the shipped WebP versions:

| Output | Source | Notes |
|---|---|---|
| `world-bg.webp` | `generated-3.png` | 1376×768, cover crop |
| `character.webp` | `generated.webp` | cropped to the alpha bbox `(430,16)-(897,756)`; the design's `cover` + scale-3.027 transform is pre-applied by the crop |
| `character-mobile.webp` | `char-cutout-fade.png` | cropped to `(431,22)-(894,514)` |
| `avatar.webp` | `generated-2.png` | 320×320 face crop |
| `quest-01…03.webp` | `generated-4/5/6.png` | 640×272, q80 |
| `quest-04.webp` | `stock-quest-05-ai-experiments.jpg` | 640×272, q80 |

Regenerate with Pillow (WebP alpha survives; verify `mode == "RGBA"` for the character files). Never ship the PNG sources.

## Motion

Petal drift and the welcome-panel float live behind `@media (prefers-reduced-motion: no-preference)`. The global `reduce` block pins animation to 0.01 ms. New backdrop motion must follow the same pair.

## Invariants

- `WorldScene` is rendered once in `index.astro` before the HUD, with `aria-hidden="true"` and empty `alt` on the background and character images.
- The background image is `loading="eager"` + `fetchpriority="high"`; `LoadingScreen` also preloads it with `new Image()`.
- Every colour derives from `@theme` tokens via `color-mix()`; no raw hex.
- Do not add a canvas, WebGL, or animation loop. The world is intentionally static layers.