# AGENTS.md

Guide for AI agents on **Imron World** — anime-RPG portfolio (Astro static site + Preact islands + layered image world), deployed to GitHub Pages.

## Token budget: read this file, then only the one doc you need

Do **not** read every file in `docs/`. Use routing table below, read matching doc (usually 50–110 lines), then open only source files you will edit.

Never read: `dist/`, `node_modules/`, `.astro/`, `.omp/`, `pnpm-lock.yaml`, `skills-lock.json`.

## Project snapshot

- Static portfolio, no backend, no SSR, no database, no auth.
- One page: `src/pages/index.astro`, wrapped by `src/layouts/MainLayout.astro`.
- Site content lives in `src/data/*`; components import directly.
- One shared store (`src/state/game.ts`) drives HUD → overlay flow.
- World backdrop = fixed stack of design images + CSS layers (no canvas, no 3D runtime).
- Site art in `public/images/*.webp`; sources in `design/CV-Game-assets/`.
- Placeholder content intentional (`lorem ipsum`, `example.com`, `Lorem Labs`). Do not "fix" unless asked.

## Environment

| Item | Value |
|---|---|
| Node | ≥ 22.23.4 |
| Package manager | pnpm 12.4.1 (in `package.json`) |
| Style helpers | approved deps `clsx` + `tailwind-merge` + `class-variance-authority`, behind `src/lib/cn.ts` / `src/lib/typography.ts` |
| Module type | ESM (`"type": "module"`) |
| TypeScript | strict + `verbatimModuleSyntax` (extends `astro/tsconfigs/strict`) |
| Output | `static` → `dist/` |
| Site / base | `https://imron02.github.io`, base `/` |

## Commands

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm lint         # biome lint — recommended rules; warnings fail
pnpm lint:fix     # biome lint --write — safe fixes
pnpm format       # biome format --write — src + astro.config.mjs
pnpm format:check # biome format — check only
pnpm check        # astro check (types + .astro diagnostics)
pnpm build        # static build → dist/
pnpm preview      # serve dist/
```

No test script. **Biome** owns lint + format (`biome.json`); do not add ESLint/Prettier. `pnpm lint` + `pnpm format:check` + `pnpm check` + `pnpm build` = verification gate.

## Doc routing

| If the task is… | Read | Skip |
|---|---|---|
| Edit copy, projects, skills, experience, links | `docs/content.md` | all other docs |
| Add/modify UI component, CSS, layout, a11y | `docs/design-system.md` | `docs/world-scene.md` |
| HUD composition, islands, state, overlays, loading | `docs/architecture.md` | `docs/content.md` |
| World backdrop, hero art layers, fades, petals | `docs/world-scene.md` | `docs/design-system.md` |
| Build errors, CI, deploy, "how do I verify" | `docs/workflow.md` | — |

Task spans two areas: read the two docs — still not all.

## Skills

Project skills in `.agents/skills/` (managed by `skills-lock.json`; do not edit by hand).

| Skill | Load when |
|---|---|
| `frontend-ui-engineering` | Building or reworking UI, layout, accessibility |
| `browser-testing-with-devtools` | Verifying runtime behavior in real browser — only if chrome-devtools MCP server configured |
| `code-review-and-quality` | Reviewing diff before merge |
| `code-simplification` | Refactoring for clarity, no behavior change |
| `performance-optimization` | Measured perf work (bundle, animation, load) |
| `using-agent-skills` | Unsure which skill applies |

Load skill **only** when trigger matches. Do not preload for token savings.

## Non-negotiable rules

1. **Site content lives in `src/data/*`.** Bios, projects, skills, experience, social links come from `profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`. Fixed UI chrome ("// MAIN MENU", "Start Play", "Back to quest log") inline by design. Page `<title>`/description defaults in `MainLayout.astro` props.
2. **Design tokens only.** Colors, fonts, radii, spacing from `@theme` in `src/styles/global.css`; reference via Tailwind token utilities (`text-text-muted`, `bg-hud-panel`) or `var(--color-*)` in arbitrary values. No new raw hex in TSX or CSS. Alpha derivations keep `color-mix(in srgb, …)` inside arbitrary value. Backdrop gradients derive from tokens with `color-mix()` — see `docs/world-scene.md`.
3. **Reuse primitives.** `src/components/ui/*` (`Button`, `Panel`, `Badge`, `IconButton`, `NavItem`, `ProgressBar`, `SkillMeter`, `StatTile`) = cva recipes styled with Tailwind utilities. Compose classes with `cn(...)` from `src/lib/cn.ts` — last argument wins — and shared text roles via `text({ role })` from `src/lib/typography.ts`. Never build class names dynamically; complete literal strings only.
4. **Preact, not React.** Default-export function components. `class`, not `className`. Hooks from `preact/hooks`. Icons from `lucide-preact`.
5. **Keep hydration directives intact** in `src/pages/index.astro`: `WorldScene` static Astro (no directive), HUD islands `client:load`. Do not turn `WorldScene` into island.
6. **`import.meta.env.BASE_URL` for every `public/` asset.** GitHub Pages breaks on absolute `/images/...` paths.
7. **Respect `prefers-reduced-motion`.** Petal drift + panel float applied with `motion-safe:` utilities, neutralized by global reduce block in `global.css`; new motion follows same pair.
8. **Preload the world art.** `LoadingScreen` warms `world-bg.webp` + breakpoint character image and stays visible a minimum of 10 s (12 s hard ceiling so it never sticks) — only when the `only-if-cached` head probe finds the art not HTTP-cache fresh. Keep both when swapping assets.
9. **Do not add dependencies** without explicit approval. Do not add binary models, fonts, or media until real assets exist.
10. **Touch only what the task needs.** No drive-by refactors, no placeholder "cleanup", no reordering unrelated exports.
11. **Never edit generated or vendored paths:** `dist/`, `.astro/`, `node_modules/`, `.omp/`, `pnpm-lock.yaml`.
12. **`pnpm-workspace.yaml` is a pin allowlist, not workspace config.** Do not restructure it.
13. **Canonical Tailwind classes.** Exact match to a scale class or `@theme` token → use the utility, never an arbitrary value: `p-[13px]`→`p-3.25`, `py-[6px]`→`py-1.5`, `w-[62px]`→`w-15.5`, `gap-[0.5rem]`→`gap-2`, `rounded-[var(--radius-m)]`→`rounded-m`, `opacity-[0.85]`→`opacity-85`, `duration-[150ms]`→`duration-150`, `aspect-[16/9]`→`aspect-video`. Arbitrary values stay where no exact class exists (`gap-[0.9rem]`, `clamp()`/`env()` lengths, `text-[8.5px]`, `tracking-[1.4px]`, `color-mix()` colors, gradients, shadows, `grid-cols-[…]`). `pnpm lint` enforces the padding/gap/radius cases; see `docs/design-system.md`.

## Definition of done

- `pnpm lint` passes, no errors or warnings.
- `pnpm format:check` passes.
- `pnpm check` passes, no errors.
- `pnpm build` passes.
- UI change verified at `localhost:4321` (desktop **and** `mobile:` ≤1023px layout) — or state plainly it was not.
- New site content added to `src/data/*`, not inline.
- Changed a convention: update exactly one matching file in `docs/` in same change.