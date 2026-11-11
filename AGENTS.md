# AGENTS.md

Guide for AI agents working on **Imron World** — an anime-RPG portfolio (Astro static site + Preact islands + layered image world), deployed to GitHub Pages.

## Token budget: read this file, then only the one doc you need

Do **not** read every file in `docs/`. Use the routing table below, read the matching doc (usually 50–110 lines), then open only the source files you will actually edit.

Never read: `dist/`, `node_modules/`, `.astro/`, `.omp/`, `pnpm-lock.yaml`, `skills-lock.json`. Read `src/styles/design-system.css` (~760 lines) by grepping for the class you need, not top to bottom.

## Project snapshot

- Static portfolio, no backend, no SSR, no database, no auth.
- One page: `src/pages/index.astro`, wrapped by `src/layouts/MainLayout.astro`.
- Site content lives in `src/data/*`; components import it directly.
- A single shared store (`src/state/game.ts`) drives the HUD → overlay flow.
- The world backdrop is a fixed stack of design images and CSS layers (no canvas, no 3D runtime).
- Site art lives in `public/images/*.webp`; the sources are in `design/CV-Game-assets/`.
- Placeholder content is intentional (`lorem ipsum`, `example.com`, `Lorem Labs`). Do not "fix" it unless asked.

## Environment

| Item | Value |
|---|---|
| Node | ≥ 22.23.4 |
| Package manager | pnpm 12.4.1 (declared in `package.json`) |
| Module type | ESM (`"type": "module"`) |
| TypeScript | strict + `verbatimModuleSyntax` (extends `astro/tsconfigs/strict`) |
| Output | `static` → `dist/` |
| Site / base | `https://imron02.github.io`, base `/` |

## Commands

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # astro check (types + .astro diagnostics)
pnpm build     # static build → dist/
pnpm preview   # serve dist/
```

There is **no** `test`, `lint`, or `format` script. Do not invent one, and do not run `npx` equivalents as a substitute. `pnpm check` + `pnpm build` are the verification gate.

## Doc routing

| If the task is… | Read | Skip |
|---|---|---|
| Edit copy, projects, skills, experience, links | `docs/content.md` | all other docs |
| Add/modify a UI component, CSS, layout, a11y | `docs/design-system.md` | `docs/world-scene.md` |
| HUD composition, islands, state, overlays, loading | `docs/architecture.md` | `docs/content.md` |
| World backdrop, hero art layers, fades, petals | `docs/world-scene.md` | `docs/design-system.md` |
| Build errors, CI, deploy, "how do I verify" | `docs/workflow.md` | — |

When a task spans two areas, read the two docs — still not all of them.

## Skills

Project skills live in `.agents/skills/` (managed by `skills-lock.json`; do not edit those files by hand).

| Skill | Load when |
|---|---|
| `frontend-ui-engineering` | Building or reworking UI, layout, accessibility |
| `browser-testing-with-devtools` | Verifying runtime behavior in a real browser — only if a chrome-devtools MCP server is configured |
| `code-review-and-quality` | Reviewing a diff before merge |
| `code-simplification` | Refactoring for clarity with no behavior change |
| `performance-optimization` | Measured perf work (bundle, animation, load) |
| `using-agent-skills` | Unsure which skill applies |

Load a skill **only** when its trigger matches. Do not preload them for token savings.

## Non-negotiable rules

1. **Site content lives in `src/data/*`.** Bios, projects, skills, experience, and social links come from `profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`. Fixed UI chrome ("// MAIN MENU", "Start Play", "Back to quest log") is inline by design. Page `<title>`/description defaults live in `MainLayout.astro` props.
2. **Design tokens only for CSS.** Colors, fonts, radii, spacing come from `@theme` in `src/styles/global.css`; reference `var(--color-*)`. No new raw hex values in TSX or CSS. Backdrop gradients derive from tokens with `color-mix()` — see `docs/world-scene.md`.
3. **Reuse primitives.** `src/components/ui/*` (`Button`, `Panel`, `Badge`, `IconButton`, `NavItem`, `ProgressBar`, `SkillMeter`, `StatTile`) plus the `.ds-*` classes in `src/styles/design-system.css`. Class merge pattern is always: array → `.filter(Boolean)` → `.join(" ")`.
4. **Preact, not React.** Default-export function components. `class`, not `className`. Hooks from `preact/hooks`. Icons from `lucide-preact`.
5. **Keep hydration directives intact** in `src/pages/index.astro`: `WorldScene` is static Astro (no directive), the HUD islands are `client:load`. Do not turn `WorldScene` into an island.
6. **`import.meta.env.BASE_URL` for every `public/` asset.** GitHub Pages breaks on absolute `/images/...` paths.
7. **Respect `prefers-reduced-motion`.** Petal drift and panel float are already gated in CSS; new motion must too.
8. **Preload the world art.** `LoadingScreen` warms `world-bg.webp` + the breakpoint's character image and has a 3 s fallback so it can never stick. Keep both when swapping assets.
9. **Do not add dependencies** without explicit approval. Do not add binary models, fonts, or media until real assets exist.
10. **Touch only what the task needs.** No drive-by refactors, no "cleanup" of placeholders, no reordering unrelated exports.
11. **Never edit generated or vendored paths:** `dist/`, `.astro/`, `node_modules/`, `.omp/`, `pnpm-lock.yaml`.
12. **`pnpm-workspace.yaml` is a pin allowlist, not a workspace config.** Do not restructure it.

## Definition of done

- `pnpm check` passes with no errors.
- `pnpm build` passes.
- UI change verified at `localhost:4321` (desktop **and** the `max-width: 1023px` layout) — or state plainly that it was not.
- New site content added to `src/data/*`, not inline.
- If you changed a convention, updated exactly one matching file in `docs/` in the same change.
