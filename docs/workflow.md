# Workflow

> Read when: verifying change, debugging build, or dealing with CI/deploy.

## Commands

```sh
pnpm install
pnpm dev          # astro dev, http://localhost:4321, HMR
pnpm lint         # biome lint — recommended rules; warnings fail
pnpm lint:fix     # biome lint --write — safe fixes only
pnpm format       # biome format --write
pnpm format:check # biome format — check only
pnpm check        # astro check — type + template diagnostics
pnpm build        # astro build → dist/
pnpm preview      # serve the built dist/
```

Biome owns lint + format. `biome.json` includes `src/**/*` and `astro.config.mjs`; `dist/`, `.astro/`, `public/`, `design/`, `.agents/`, `.omp/` stay outside. Astro uses Biome's partial support (frontmatter/scripts only), so `useConst`, `useImportType`, `noUnusedVariables`, and `noUnusedImports` are off for `**/*.astro`. Formatter: 2-space indent, double quotes, semicolons, 100 columns, Tailwind v4 directives enabled. No test runner. Verification gate: `pnpm lint` + `pnpm format:check` + `pnpm check` + `pnpm build`. Tailwind classes are linted too: `tailwind.stylesheet` points at `src/styles/global.css`, `linter.domains.tailwind` plus `nursery/noTailwindArbitraryValue` are on, and `allowedCategories` (layout, color, typography, effects, motion) plus 14 `allowedClasses` entries cover the arbitrary values that have no exact canonical class.

**No** conventional `pnpm test`; "tests pass" meaningless here. Say what you actually ran.

## What `astro check` catches

- TypeScript errors under strict + `verbatimModuleSyntax` (type-only imports must use `import type`).
- `.astro` frontmatter and template expressions.
- Preact/TSX prop mismatches on the primitives.
- Unused locals **not** flagged by `astro check` (`noUnusedLocals` off) — Biome's `lint` catches them instead (`noUnusedVariables`, `noUnusedImports`), so dead code no longer passes the combined gate.

`verbatimModuleSyntax` means: `import type { X }` for types, plain `import` for values. Mixing these up = most common check failure in this repo.

## Build

`astro build` emits static site to `dist/`. `@astrojs/preact` hydrates HUD islands client-side; `WorldScene` is plain Astro, ships as static markup. Tailwind v4 compiles through Vite plugin (`@tailwindcss/vite`), not PostCSS.

`dist/` is generated. Never edit it; gitignored.

## CI / deploy

`.github/workflows/deploy.yml`:
- Trigger: push to `main`, or manual `workflow_dispatch`.
- Build job: `actions/checkout@v7` → `withastro/action@v6` (detects pnpm from `pnpm-lock.yaml`, runs install + build, uploads Pages artifact).
- Deploy job: `actions/deploy-pages@v5` in `github-pages` environment.
- Permissions: `contents: read`, `pages: write`, `id-token: write`.

Repository prerequisite: **Settings → Pages → Source: GitHub Actions**. Deploy fails at artifact step? Check that setting first.

Workflow does **not** run `pnpm check`. Run it locally before pushing — type errors ship silently otherwise.

## Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Image/video 404 on Pages, works locally | Absolute `/images/...` path | Prefix with `${import.meta.env.BASE_URL}` |
| `astro check` — "X is a type and must be imported using a type-only import" | `verbatimModuleSyntax` | `import type { X }` |
| Build ok, blank page | Island hydration or thrown runtime error | Check browser console; confirm eight interactive islands still have `client:load` |
| Loading screen never clears | Preload never settles | `LoadingScreen` force-closes at the 12 s hard ceiling; verify the ceiling timer and `preloadTargets()` still exist |
| Background art missing | Image path or base URL | Confirm `public/images/world-bg.webp` ships and src goes through `BASE_URL` |
| Feature works locally, fails in CI | Node/pnpm version drift | `engines.node >= 22.23.4`, `packageManager: pnpm@12.4.1` |
| Lockfile conflict / install surprise | `pnpm-workspace.yaml` touched | `minimumReleaseAgeExclude` allowlist, not a workspace definition — revert |
| Tailwind classes missing | Utility written outside scanner range | Only `src/styles/global.css` imported; Tailwind utilities live in components; shared class helpers are `src/lib/cn.ts` + `src/lib/typography.ts` |

## Browser verification

Use `pnpm dev`, open `http://localhost:4321`. Check:

1. Loading screen appears, then clears to opening screen.
2. "Start Play" opens About overlay; Enter does same.
3. All five content routes (about, projects, skills, experience, contact) render; Home returns to opening screen.
4. Quest card → project detail → back; quest log list still opens every project.
5. Resize through 1920×1080, 1440×900, 1024×768: rail never scrolls, quest board keeps three cards.
6. Resize to 430×932 and 390×844: system bar, chips, companion, title block, board, tab bar all fit, no horizontal scroll; all six tabs fit at 390.
7. Reduced motion enabled in OS: petals and welcome panel static.
8. Console free of errors/warnings.

chrome-devtools MCP available? Load `.agents/skills/browser-testing-with-devtools` and drive checks with real DOM/console/network data.

## Definition of done (repeat)

1. `pnpm lint` clean.
2. `pnpm format:check` clean.
3. `pnpm check` clean.
4. `pnpm build` succeeds.
5. UI verified in browser at both layouts, or explicitly noted as unverified.
6. Content changes landed in `src/data/*`.
7. No new dependencies beyond the approved `@biomejs/biome` devDependency, no new binary assets, no edits inside `dist/`, `.astro/`, `node_modules/`, `.omp/`.
8. Convention changed? Matching `docs/` file updated.