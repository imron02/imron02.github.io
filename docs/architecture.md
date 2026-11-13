# Architecture

> Read when composing islands, changing HUD layout, adding sections, touching shared state.

## Shell

```
MainLayout.astro            <html>, fonts, meta, the single imported stylesheet (global.css)
└─ main                     utilities: relative h-dvh overflow-hidden bg-void
   └─ index.astro
      ├─ WorldScene          static Astro     → layered backdrop (images + utilities, aria-hidden)
      ├─ LoadingScreen       client:load      → #loading-screen, fixed z-50 cover, min 10 s unless art is HTTP-cache warm
      ├─ HUD grid            utilities: absolute z-10 CSS grid of [data-slot] wrappers
      │  ├─ rail             PlayerProfile (static), GameMenu, CurrentChapter (static), PlayerStatus (stacked)
      │  ├─ system           SystemBar            right top, fullscreen + ambient audio island
      │  ├─ welcome          WelcomePanel + SectionOverlay   right, one visible at a time
      │  ├─ quests           QuestBoard            left bottom, overflows the rail column
      │  ├─ corner           Companion (island) + SocialLinks (static)  right bottom
      │  ├─ chips            PlayerChips           mobile only
      │  └─ tabs             TabBar                mobile only
      └─ corner brackets     decorative frame brackets div, aria-hidden
```

`index.astro` owns composition. Each island renders a `Panel`, reads what it needs; no island gets content props.

`WelcomePanel` and `SectionOverlay` share `data-slot="welcome"`. Both key off `$section`: `WelcomePanel` returns `null` unless section is `home`. `SectionOverlay` keeps all five section bodies mounted, toggles `hidden` per panel (`home` hides all five) — so every section's copy stays in server-rendered HTML, crawlable. Tailwind preflight's `[hidden] { display: none !important }` keeps inactive panels out of layout. Only the matching panel is visible, so the slot still holds one thing at a time. Preserve both invariants when adding to that slot.

Astro wraps every hydrated component in an `<astro-island>` element. `[&_astro-island]:contents` on the HUD grid root lets rendered panels join the slot's flex/grid layout directly. Without it, siblings stack at zero height and overlap. Do not remove it, and do not assume an island's own tag is a layout box.

Only components reading a store or attaching a handler get `client:load` — ten now: `LoadingScreen`, `GameMenu`, `PlayerStatus`, `WelcomePanel`, `SectionOverlay`, `QuestBoard`, `PlayerChips`, `TabBar`, `Companion`, `SystemBar`. `PlayerProfile`, `CurrentChapter` and `SocialLinks` stay static imports: plain HTML, no `<astro-island>` wrapper, smaller JS payload. Add a hook or handler to one → add `client:load` back in `index.astro`.

## Layers

| z-index | Element |
|---|---|
| auto | world layer stack (see `docs/world-scene.md`) |
| 10 | HUD grid |
| 11 | frame corner brackets |
| 50 | `#loading-screen` |

HUD grid root is `pointer-events-none`; every `[data-slot]` wrapper re-enables with `pointer-events-auto`. Clicks pass through the empty `world` column and the HUD does not swallow the page. Preserve the pair unless you deliberately want a full-screen blocker.

## Grid

Desktop (`>1023px`) — slots placed with `col-start-*`/`row-start-*`/`row-span-*` utilities (no grid-template-areas):

```
"rail   world system"
"rail   world welcome"
"quests world corner"
```

Columns are `min(344px, 27vw) | 1fr | min(488px, 34vw)` with a `clamp()` gutter, matching the 64px design frame at 1920. `rail` holds profile, command menu, chapter and status panels. `system`, `welcome` and `corner` right-aligned; `quests` bottom-left and wider than its column (`min(812px, 62vw)`), overflowing into the empty `world` column. Three compaction tiers (`max-height` 1000/900/820) shrink panel rows so the rail never scrolls down to 768px tall.

Below `1023px` collapses to one column plus a fixed bottom tab bar:

```
"system"
"chips"
"companion"
"welcome"
"quests"
"tabs"
```

`rail` and desktop `SocialLinks` hidden there; `PlayerChips` + `Companion` replace them, system bar renders compact. `welcome` row takes remaining height, anchors content to bottom, scrolls internally so `SectionOverlay` never overflows behind the tab bar. Below 400px header chips shrink (name truncates, chapter chip narrows) instead of overflowing. No other breakpoint — do not invent one without a reason.

## State

`src/state/game.ts` — one module, nanostores atoms, no context/provider.

| Atom | Type | Meaning |
|---|---|---|
| `$section` | `GameSection` | `home \| about \| projects \| skills \| experience \| contact` |
| `$selectedProject` | `string \| null` | Project id for the detail view |
| `$progress` | `number` | 0–1 load progress |
| `$isLoading` | `boolean` | Loading screen visible |

`gameActions` is the only writer: `goTo(section)`, `selectProject(id)`, `clearProject()`, `setProgress(value)`, `finishLoading()`. Components call `gameActions`, never `$atom.set()` directly. Read with `useStore($atom)` from `@nanostores/preact`.

Invariants:
- `goTo()` always clears `$selectedProject`.
- "Playing" not stored — it is `$section !== "home"`.
- `setProgress()` clamps to 0–1.
- Add a section → update `GameSection`, the `sections` record in `SectionOverlay.tsx` (keyed by `Exclude<GameSection, "home">`, so a missing entry fails `pnpm check`), `menuItems` in `GameMenu.tsx` (also consumed by `TabBar`), and the matching panel.

## Loading sequence

0. Before hydration, a blocking inline `<head>` script (`MainLayout.astro`) probes both preload targets with `fetch(url, { cache: "only-if-cached", mode: "same-origin" })`. All hits set `<html data-world-warm>` (inline CSS hides `#loading-screen` at first paint) and `__worldWarmProbe` resolves `true`; `LoadingScreen` then calls `gameActions.finishLoading()`. Any miss (cold visit, `no-cache` dev server) resolves `false` and steps 1-4 run unchanged. Target URLs come from `src/lib/worldAssets.ts`.
1. `$isLoading` starts `true`; `LoadingScreen` covers the page for a minimum of `MIN_LOADING_MS` (10 s) when the art is not already HTTP-cache fresh.
2. `LoadingScreen` preloads `images/world-bg.webp` plus the current breakpoint's character image (`character-mobile.webp` below 1024px, `character.webp` above) with `new Image()`; `load` and `error` both count as settled. A 100 ms wall-clock ticker drives `gameActions.setProgress` 0→95% ease-out over the 10 s.
3. Cover clears only when 10 s elapsed **and** every target settled → `gameActions.finishLoading()` (sets progress `1`, `isLoading` `false`).
4. A 12 s hard ceiling (`MIN_LOADING_MS + 2 s`) calls `finishLoading()` regardless, so the cover never sticks on a hung request. Change the duration via `MIN_LOADING_MS` only (ceiling is derived). Remove a preload target → update `preloadTargets()`, not the ceiling.
5. Hint line rotates every 2.5 s through `loadingHints` (never repeats back-to-back); the `<p>` is `aria-hidden` — the `role="status"` percent line + progressbar carry announcements. Shimmer + hint fade are `motion-safe:animate-*` only.

## Where new code goes

| Kind | Location |
|---|---|
| Backdrop layers / world art | `src/components/world/` (utilities inline in `WorldScene.astro`) |
| Global primitive (reusable anywhere) | `src/components/ui/` (cva + utilities in the component itself) |
| HUD chrome | `src/components/game-ui/` (utilities inline) |
| Shared class helpers / text recipes | `src/lib/cn.ts`, `src/lib/typography.ts` |
| Section body shown in the overlay | `src/components/game-sections/` |
| Content | `src/data/` |
| Shared state | `src/state/game.ts` |
| Design tokens / variants / keyframes | `src/styles/global.css` (the only stylesheet) |

Section panels stay mounted and are visible only when `$section` matches their id; never assume a body is the visible one. Write them to render correctly inside a `hidden` ancestor — no layout measurement, no focus stealing on mount.

## Imports and paths

- All relative imports extensionless (`../../data/profile`), matching `moduleResolution: "Bundler"`.
- `src/` has no path aliases (`@/`). Use relative imports.
- Static assets go through `${import.meta.env.BASE_URL}`.