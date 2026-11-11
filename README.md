# Imron World — Anime RPG Portfolio

Personal portfolio for [imron02.github.io](https://imron02.github.io), built as a runnable anime-RPG opening screen: a layered Japanese-fantasy/cyberpunk illustration behind game-UI panels.

## Stack

- [Astro](https://astro.build) static site, deployed to GitHub Pages
- [Preact](https://preactjs.com) islands (`@astrojs/preact`)
- TypeScript (strict, `verbatimModuleSyntax`)
- [Tailwind CSS v4](https://tailwindcss.com) via the Vite plugin (`@theme` tokens in `src/styles/global.css`)
- [Nano Stores](https://github.com/nanostores/nanostores) for state shared across islands
- [lucide-preact](https://lucide.dev) for icons

Requires **Node ≥ 22.23.4** and **pnpm 12.4.1**.

## Commands

```sh
pnpm install   # install dependencies
pnpm dev       # dev server at http://localhost:4321
pnpm check     # astro check (type diagnostics)
pnpm build     # static build → dist/
pnpm preview   # preview the production build
```

## Folder map

```text
public/                 static assets served as-is
  images/               world background, character, avatar, quest thumbnails (WebP)
  models/  textures/  audio/  icons/   empty drop points for future real assets
src/
  layouts/MainLayout.astro    document head, fonts, global CSS
  pages/index.astro           island composition and HUD grid wrappers
  components/
    ui/                       global design-system primitives (button, panel, badge, nav, progress…)
    game-ui/                  HUD islands: profile, menu, quest board, welcome, overlay, loading
    game-sections/            About, Projects, Skills, Experience, Contact panels
    world/                    layered backdrop (images, fades, petals) — static Astro
  data/                       all copy and links (typed lorem placeholders)
  state/game.ts               shared section/play/selection/loading state
  styles/
    global.css                Tailwind import + `@theme` design tokens (single source)
    design-system.css         global `.ds-*` primitive styles
    game-ui.css               HUD layout, positioning, scene and responsive rules
```

## Editing content

All site content lives in `src/data/*`:

- `profile.ts` — name, title, level, XP, avatar, bio, socials
- `projects.ts` — quests/projects, thumbnails, technologies, links
- `skills.ts` — skill groups with ordinal mastery
- `experience.ts` — roles, periods, achievements

Components read this data directly; update the files and the UI follows. The home tagline, bio, and project descriptions carry the design's real copy; demo URLs, `hello@example.com`, and `Lorem Labs` are still scaffolding.

## World art

The opening screen is a flat layer stack, not a 3D scene: `world-bg.webp` + `character.webp` behind CSS ambient/fog/aura layers, fades and 16 petals (7 on mobile). Sources live in the local `design/CV-Game-assets/` archive (gitignored; not part of the repo). Shipped WebPs are generated with Pillow and live in `public/images/`. See [`docs/world-scene.md`](./docs/world-scene.md) for the layer table and the crop rules.

`public/models/`, `public/textures/`, `public/audio/` and `public/icons/` are empty drop points. Do not add binary models until real assets exist.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds with `withastro/action@v6` (pnpm detected from `pnpm-lock.yaml`) and publishes to GitHub Pages.

Repository setting: **Settings → Pages → Source: GitHub Actions**.

## For AI agents

Start at [`AGENTS.md`](./AGENTS.md). It maps each kind of task to a single file in [`docs/`](./docs) so an agent reads ~50–110 lines instead of the whole repo:

| Doc | Covers |
|---|---|
| `docs/architecture.md` | Shell, islands, HUD grid, nanostores state, loading |
| `docs/design-system.md` | Tokens, `ds-*` primitives, a11y, motion, breakpoint |
| `docs/content.md` | `src/data/*` schemas and editing rules |
| `docs/world-scene.md` | Backdrop layers, world images, fades, petals |
| `docs/workflow.md` | Commands, verification, CI/deploy, failure modes |