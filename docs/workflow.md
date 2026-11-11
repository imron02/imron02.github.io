# Workflow

> Read when: verifying a change, debugging a build, or dealing with CI/deploy.

## Commands

```sh
pnpm install
pnpm dev       # astro dev, http://localhost:4321, HMR
pnpm check     # astro check — type + template diagnostics
pnpm build     # astro build → dist/
pnpm preview   # serve the built dist/
```

The four `package.json` scripts are `dev`, `check`, `build`, and `preview`. There is no test runner, linter, or formatter. `pnpm check` and `pnpm build` are the gate; do not substitute `npx tsc` or `eslint`.

There is **no** conventional `pnpm test`; stating "tests pass" is meaningless here. Say what you actually ran.

## What `astro check` catches

- TypeScript errors under strict + `verbatimModuleSyntax` (type-only imports must use `import type`).
- `.astro` frontmatter and template expressions.
- Preact/TSX prop mismatches on the primitives.
- Unused locals are **not** flagged (`noUnusedLocals` is off), so dead code passes the gate — check it yourself.

`verbatimModuleSyntax` means: `import type { X }` for types, plain `import` for values. Mixing these up is the most common check failure in this repo.

## Build

`astro build` emits a static site to `dist/`. `@astrojs/preact` hydrates the HUD islands client-side; `WorldScene` is plain Astro and ships as static markup. Tailwind v4 compiles through the Vite plugin (`@tailwindcss/vite`), not PostCSS.

`dist/` is generated. Never edit it; it is gitignored.

## CI / deploy

`.github/workflows/deploy.yml`:
- Trigger: push to `main`, or manual `workflow_dispatch`.
- Build job: `actions/checkout@v7` → `withastro/action@v6` (detects pnpm from `pnpm-lock.yaml`, runs install + build, uploads the Pages artifact).
- Deploy job: `actions/deploy-pages@v5` in the `github-pages` environment.
- Permissions: `contents: read`, `pages: write`, `id-token: write`.

Repository prerequisite: **Settings → Pages → Source: GitHub Actions**. If deploy fails at the artifact step, that setting is the first thing to check.

The workflow does **not** run `pnpm check`. Run it locally before pushing — type errors ship silently otherwise.

## Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Image/video 404 on Pages, works locally | Absolute `/images/...` path | Prefix with `${import.meta.env.BASE_URL}` |
| `astro check` — "X is a type and must be imported using a type-only import" | `verbatimModuleSyntax` | `import type { X }` |
| Build ok, blank page | Island hydration or a thrown runtime error | Check the browser console; confirm the eight interactive islands still have `client:load` |
| Loading screen never clears | A preload never settles | `LoadingScreen` falls back after 3 s; verify the fallback and `preloadTargets()` still exist |
| Background art missing | Image path or base URL | Confirm `public/images/world-bg.webp` ships and the src goes through `BASE_URL` |
| Feature works locally, fails in CI | Node/pnpm version drift | `engines.node >= 22.23.4`, `packageManager: pnpm@12.4.1` |
| Lockfile conflict / install surprise | `pnpm-workspace.yaml` touched | It is a `minimumReleaseAgeExclude` allowlist, not a workspace definition — revert |
| Tailwind classes missing | Styles added outside the imported chain | Only `global.css`, `design-system.css`, `game-ui.css` are imported |

## Browser verification

Use `pnpm dev` and open `http://localhost:4321`. Check:

1. Loading screen appears, then clears to the opening screen.
2. "Start Play" opens the About overlay; Enter does the same.
3. All five content routes (about, projects, skills, experience, contact) render, and Home returns to the opening screen.
4. Quest card → project detail → back, and the quest log list still opens every project.
5. Resize through 1920×1080, 1440×900 and 1024×768: the rail never scrolls and the quest board keeps three cards.
6. Resize to 430×932 and 390×844: system bar, chips, companion, title block, board and tab bar all fit without horizontal scroll; all six tabs fit at 390.
7. With reduced motion enabled in the OS, petals and the welcome panel are static.
8. Console is free of errors/warnings.

If you have the chrome-devtools MCP available, load `.agents/skills/browser-testing-with-devtools` and drive the checks with real DOM/console/network data.

## Definition of done (repeat)

1. `pnpm check` clean.
2. `pnpm build` succeeds.
3. UI verified in the browser at both layouts, or explicitly noted as unverified.
4. Content changes landed in `src/data/*`.
5. No new dependencies, no new binary assets, no edits inside `dist/`, `.astro/`, `node_modules/`, `.omp/`.
6. If a convention changed, the matching `docs/` file was updated.
