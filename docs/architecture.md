# Architecture

> Read when: composing islands, changing HUD layout, adding sections, or touching shared state.

## Shell

```
MainLayout.astro            <html>, fonts, meta, imports global.css + design-system.css + game-ui.css
└─ main.game-stage          fixed 100dvh, overflow hidden, void background
   └─ index.astro
      ├─ WorldScene          static Astro     → layered backdrop (images + CSS, aria-hidden)
      ├─ LoadingScreen       client:load      → fixed z-50 cover until art preloads
      ├─ .game-hud           absolute z-10 CSS grid of .hud-slot wrappers
      │  ├─ --rail           PlayerProfile (static), GameMenu, CurrentChapter (static), PlayerStatus (stacked)
      │  ├─ --system         SystemBar            right top, decorative, static
      │  ├─ --welcome        WelcomePanel + SectionOverlay   right, one visible at a time
      │  ├─ --quests         QuestBoard            left bottom, overflows the rail column
      │  ├─ --corner         Companion (static) + SocialLinks (static)  right bottom
      │  ├─ --chips          PlayerChips           mobile only
      │  └─ --tabs           TabBar                mobile only
      └─ .hud-corners        decorative frame brackets, aria-hidden
```

`index.astro` owns composition. Each island renders a `Panel` and reads what it needs; no island receives props for content.

`WelcomePanel` and `SectionOverlay` share the same `.hud-slot--welcome`. They key off `$section`: `WelcomePanel` returns `null` when the section is not `home`. `SectionOverlay` keeps all five section bodies mounted and toggles `hidden` on each panel (`home` hides all five), so every section's copy is in the server-rendered HTML and crawlable; `.section-overlay[hidden] { display: none }` is what keeps the inactive panels out of layout. Only the matching panel is visible, so the slot still holds one thing at a time. Preserve both invariants when adding anything to that slot.

Astro wraps every hydrated component in an `<astro-island>` element. `.game-hud astro-island { display: contents }` in `game-ui.css` lets the rendered panels take part in the slot's flex/grid layout directly. Without it, siblings stack at zero height and overlap. Do not remove it, and do not assume an island's own tag is a layout box.

Only components that read a store or attach a handler get `client:load` — currently eight: `LoadingScreen`, `GameMenu`, `PlayerStatus`, `WelcomePanel`, `SectionOverlay`, `QuestBoard`, `PlayerChips`, `TabBar`. `PlayerProfile`, `CurrentChapter`, `SystemBar`, `Companion` and `SocialLinks` are static imports: they render as plain HTML with no `<astro-island>` wrapper, which keeps the JS payload down. Adding a hook or handler to one of them means adding `client:load` back in `index.astro`.

## Layers

| z-index | Element |
|---|---|
| auto | `.world-scene` layer stack (see `docs/world-scene.md`) |
| 10 | `.game-hud` |
| 11 | `.hud-corners` |
| 50 | `.loading-screen` |

`.game-hud` is `pointer-events: none`; `.hud-slot` re-enables it. That lets clicks pass through the empty `world` column and keeps the HUD from swallowing the page. Preserve the pair unless you deliberately want a full-screen blocker.

## Grid

Desktop (`>1023px`):

```
"rail   world system"
"rail   world welcome"
"quests world corner"
```

Columns are `min(344px, 27vw) | 1fr | min(488px, 34vw)` with a `clamp()` gutter, matching the 64px design frame at 1920. `rail` holds the profile, command menu, chapter and status panels. `system`, `welcome` and `corner` are right-aligned; `quests` is bottom-left and wider than its column (`min(812px, 62vw)`), overflowing into the empty `world` column. Three compaction tiers (`max-height` 1000/900/820) shrink panel rows so the rail never scrolls down to 768px tall.

Below `1023px` it collapses to one column and a fixed bottom tab bar:

```
"system"
"chips"
"companion"
"welcome"
"quests"
"tabs"
```

`rail` and the desktop `SocialLinks` are hidden there; `PlayerChips` + `Companion` replace them, and the system bar renders compact. The `welcome` row takes the remaining height, anchors its content to the bottom and scrolls internally so `SectionOverlay` never overflows behind the tab bar. Below 400px the header chips shrink (name truncates, chapter chip narrows) rather than overflowing. There is no other breakpoint — do not invent one without a reason.

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
- "Playing" is not stored — it is `$section !== "home"`.
- `setProgress()` clamps to 0–1.
- Adding a section means updating `GameSection`, the `sections` record in `SectionOverlay.tsx` (keyed by `Exclude<GameSection, "home">`, so a missing entry fails `pnpm check`), `menuItems` in `GameMenu.tsx` (also consumed by `TabBar`), and the matching panel.

## Loading sequence

1. `$isLoading` starts `true`; `LoadingScreen` covers the page.
2. `LoadingScreen` preloads `images/world-bg.webp` and the current breakpoint's character image (`character-mobile.webp` below 1024px, `character.webp` above) with `new Image()` and reports staged progress via `gameActions.setProgress`.
3. Both targets settle (load or error) → `gameActions.finishLoading()`.
4. A 3 s timeout calls `finishLoading()` regardless, so the cover can never stick. Removal of a preload target means updating `preloadTargets()`, not the fallback.

## Where new code goes

| Kind | Location |
|---|---|
| Backdrop layers / world art | `src/components/world/` + a `world-scene` block in `game-ui.css` |
| Global primitive (reusable anywhere) | `src/components/ui/`, styles in `design-system.css` |
| HUD chrome | `src/components/game-ui/`, styles in `game-ui.css` |
| Section body shown in the overlay | `src/components/game-sections/` |
| Content | `src/data/` |
| Shared state | `src/state/game.ts` |

Section panels are always mounted and are only visible when `$section` matches their id; never assume a body is the visible one. Write them so they render correctly inside a `hidden` ancestor — no layout measurement, no focus stealing on mount.

## Imports and paths

- All relative imports are extensionless (`../../data/profile`), matching `moduleResolution: "Bundler"`.
- `src/` has no path aliases (`@/`). Use relative imports.
- Static assets go through `${import.meta.env.BASE_URL}`.