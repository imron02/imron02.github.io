# Content

> Read when: editing copy, links, projects, skills, experience entries. Usually only doc you need.

## Where content lives

| File | Export | Feeds |
|---|---|---|
| `src/data/profile.ts` | `profile`, `Profile`, `SocialLink` | `PlayerProfile`, `WelcomePanel`, `AboutPanel`, `ContactPanel`, `PlayerStatus` |
| `src/data/projects.ts` | `projects`, `Project` | `QuestBoard` (featured only), `ProjectsArchive` |
| `src/data/skills.ts` | `skillGroups`, `masteryLevels`, `SkillGroup`, `Skill`, `Mastery` | `SkillsTree` |
| `src/data/experience.ts` | `experience`, `ExperienceItem` | `ExperienceLog`, `AdventureLogPanel` |
| `src/data/attributes.ts` | `attributes`, `attributeScale`, `Attribute`, `AttributeTier`, `AttributeTone` | `AttributesPanel` (About overlay) |
| `src/data/tech.ts` | `techInventory`, `techGroups`, `equippedTech`, `TechItem`, `TechGroup` | `EquippedTechPanel` (About overlay) |

Components import directly. Change value, UI follows — no CMS, no fetch, no build-time content collection.

## `profile`

```ts
interface Profile {
  name: string; title: string; level: number; rank: string;
  xp: { current: number; goal: number };
  avatar: string; locationShort: string;
  timeZone: string; utcOffsetLabel: string;
  email: string;
  yearsOfExperience: string; tagline: string;
  specializationLabel: string;   // short form used by the character sheet row
  country: string;               // location row in the character sheet
  currentFocus: string; alignment: string; preferredStack: string; workMode: string;
  achievements: number; completion: number; // profile completion segments + trophy count
  bio: string; availability: string;
  chapter: { index: number; title: string; objectivesDone: number; objectivesTotal: number };
  session: { index: number; name: string };
  companion: { name: string; role: string; lines: string[] };
  socials: SocialLink[];                 // SocialLink = { label, href }
}
```

- `level` is RPG badge number; `rank` is letter grade (`A`) beside it.
- `specializationLabel`, `country`, `currentFocus`, `alignment`, `preferredStack`, `workMode`, `achievements` and `completion` feed the About overlay only: the character sheet rows (`01 EXPERIENCE` … `04 LOCATION`), the completion meter and the trophy count, plus the mobile `PLAYER STATUS` grid and the `PLAYER STATUS` rail rows.
- `xp` is source of truth for XP bar. `xpPercent` and `xpRemaining` are derived exports in same module — never store percentage.
- `chapter` drives `CurrentChapter`, mobile chapter chip and its bar; `chapterPercent` derived from objective counts.
- `session` feeds desktop system bar; `companion.lines` rotates through the RIN dialogue box (first line doubles as the SSR and reduced-motion fallback).
- `locationShort` is the HUD chip form (`Jakarta, ID`); `country` carries the character-sheet `04 LOCATION` row. `utcOffsetLabel` is display string; `timeZone` is real IANA zone used by `Intl.DateTimeFormat` for live clock.
- `avatar` is path **relative to `public/`**, no leading slash (`images/avatar.webp`). Components prepend `BASE_URL`.
- `ContactPanel` splits `socials`: entries whose `href` starts with `mailto:` filtered out of external list. Email rendered separately from `profile.email` — keep `email` authoritative, do not rely on `mailto:` social for email button. `SocialLinks` renders all three as icon links.
- `MainLayout.astro` has own hardcoded `title`/`description` defaults — update those too when site name or positioning changes.

## `projects`

```ts
interface Project {
  id: string;            // "q001" — archive code is the numeric part ("001")
  title: string;
  category: "Web Application" | "Mobile" | "Creative"; // QuestBoard glyph fallback
  description: string;   // card copy on the quest card
  thumbnail: string;     // path relative to public/
  technologies: string[];
  techIcons: ProjectTechIcon[];  // card glyph strip (<=4, decorative; not 1:1 with technologies)
  sector: string;        // card category line, "MOBILE / COMMERCE"
  filters: ("web" | "mobile" | "fullstack" | "labs")[]; // archive filter buckets
  status: "completed" | "ongoing";
  difficulty: "normal" | "advanced" | "expert";
  demoUrl?: string;      // omit to hide the demo button
  featured: boolean;     // true → appears on the QuestBoard
  tier?: "recommended" | "future"; // HUD board chip, via tierMeta
  summary?: string;      // long detail description; falls back to description
  subtitle?: string;     // detail subtitle; falls back to sector
  role?: string;
  platform?: string;
  completedAt?: string;
  contributions?: string[];
}
```

- `id` must be unique; `selectProject(id)` looks up by id.
- `featured: true` puts on HUD quest board. All eighteen quests are featured → six board pages.
- Quest board pages featured projects **three per page** (`PAGE_SIZE = 3`) in a 3-column grid; header shows `01/04` plus prev/next chevrons (both plain until hover, disabled at the ends) and `← → Navigate` hint, `Swipe` on mobile. Arrow keys page while focus is inside the board and move focus to the new page's first card (`key={page}` remounts the list); an `sr-only` `aria-live` line announces the visible range. A horizontal swipe past `SWIPE_THRESHOLD` (40px) that is more horizontal than vertical pages the board and suppresses the card click it would otherwise fire.
- `// ACTIVE QUEST` and the active border/glow follow `$selectedProject`, not the first card of the page. Selecting a card opens the archive on the page holding that quest; the marker is honest only because it reads real state.
- Eighteen entries (`q001`–`q018`) → five archive pages at `PAGE_SIZE = 4`. Thumbnails are `images/quest-NN.webp` (1280×512). Derived archive counts: 18 total, 16 completed, 2 active; filter buckets — all 18, web 4, mobile 11, fullstack 2, labs 1.
- `ProjectsArchive` owns filter + page state and keeps `$selectedProject` on the visible page; `statusMeta` / `difficultyMeta` / `techGlyphs` in `src/components/game-sections/projects/questMeta.tsx` are the single source for status chips (`chipBase` / `StatusChip`), ranks, achievement counts, difficulty bars (`DifficultyBars`), quest numbers (`questCode()`), and tech glyphs. `detailPlatform()` returns `platform`, else `Android · iOS` for mobile quests, else `Web`.
- `tier` reads `tierMeta` (`src/data/projects.ts`) — one map holds `{ tone, chip }` per tier, so the board chip (`Rec` / `Future`) has one definition. Omit for no marker.
- Board glyph keyed by project id (`q003` → sparkles, `q005` → chart, `q006` → workflow, `q007` → code, `q008` → users, `q009` → building, `q010` → book, `q011` → palette, `q012` → credit card) with category fallback (shopping bag / smartphone / sparkles).

## `skills`

```ts
type Mastery = "novice" | "adept" | "expert" | "master";
// masteryLevels → 1 | 2 | 3 | 4 pips of 4
```

Groups render in array order, group `title` as heading. Skill names must be unique **within a group** (used as Preact key).

## `experience`

```ts
interface ExperienceItem {
  start: string;             // "2022"
  end: string;               // "2024" or "PRESENT"
  role: string; company: string;
  technologies: string[];    // rendered as badges / joined stack line
  active?: boolean;          // newest-first entry: highlighted node, ACTIVE tag
  summary?: string;          // optional long copy (ExperienceLog overlay)
  achievements?: string[];   // optional bullet list (ExperienceLog overlay)
}
```

Newest first. Key is `company` + `start` (both `ExperienceLog` and `AdventureLogPanel` key on the pair). `ExperienceLog` (ADVENTURE LOG section) shows period, summary and achievements; `AdventureLogPanel` in the About overlay renders the same data as the milestone track — do not fork the data, extend this array.

## `attributes` and `tech`

```ts
type AttributeTier = "SPECIALIZATION" | "STRONG" | "EXPERIENCED" | "EXPLORING";
interface Attribute { name: string; icon: AttributeIcon; tier: AttributeTier;
                      tone: AttributeTone; level: number; }   // level of attributeScale (5)
interface TechItem { label: string; icon: TechIcon; group: TechGroup; equipped?: boolean; }
```

`AttributesPanel` renders one row per attribute: icon, name, tier chip and a five-segment bar; the bar is qualitative (`role="img"`, no numeric score in the UI). `EquippedTechPanel` renders `techInventory` as a four-slot-per-row grid grouped by `techGroups` (frontend / mobile / backend / tools) plus a detail strip for the single `equipped` item. `techInventory` renders four slots per row in array order; the row count follows the array length and `techGroups` only supplies the legend labels.

## Editing rules

1. **Site content belongs in `src/data/`.** Bios, projects, skills, experience, social links are data. Fixed UI chrome ("// MAIN MENU", "Start Play", "Back to quest log") stays inline in its component — don't move into data file.
2. **Assets:** place files in `public/images/`, reference without leading slash; components apply `import.meta.env.BASE_URL`. Forgetting breaks GitHub Pages build.
3. **Placeholders are intentional.** `hello@example.com`, `example.com/quests/...`, demo URLs, `Lorem Labs` are scaffolding. Replace only when asked — do not "improve" copy as side effect. Home tagline, bio, project descriptions already carry real copy from design archive; keep in `src/data/`.
4. **Types are the contract.** Add a field, update `interface` in same file; `pnpm check` catches consumers.
5. **No markdown/HTML in data strings.** Plain text only; rendering escapes it.
6. **Keep links real.** `https://github.com/imron02` and LinkedIn URL are two non-placeholder socials.

## Composition note

Section bodies read data but keep own framing (`ContactPanel` derives `externalLinks`, the About composition splits copy across `src/components/game-sections/about/*` panels). Do not push that logic into `src/data/` — data stays declarative, components own presentation.