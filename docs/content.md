# Content

> Read when: editing copy, links, projects, skills, experience entries. Usually only doc you need.

## Where content lives

| File | Export | Feeds |
|---|---|---|
| `src/data/profile.ts` | `profile`, `Profile`, `SocialLink` | `PlayerProfile`, `WelcomePanel`, `AboutPanel`, `ContactPanel` |
| `src/data/projects.ts` | `projects`, `Project` | `QuestBoard` (featured only), `ProjectPanel` |
| `src/data/skills.ts` | `skillGroups`, `masteryLevels`, `SkillGroup`, `Skill`, `Mastery` | `SkillsTree` |
| `src/data/experience.ts` | `experience`, `ExperienceItem` | `ExperienceLog` |

Components import directly. Change value, UI follows — no CMS, no fetch, no build-time content collection.

## `profile`

```ts
interface Profile {
  name: string; title: string; level: number; rank: string;
  xp: { current: number; goal: number };
  avatar: string; location: string; locationShort: string;
  timeZone: string; utcOffsetLabel: string;
  email: string; class: string;
  yearsOfExperience: string; specialization: string[]; tagline: string;
  bio: string; availability: string;
  chapter: { index: number; title: string; objectivesDone: number; objectivesTotal: number };
  session: { index: number; name: string };
  companion: { name: string; role: string; lines: string[] };
  socials: SocialLink[];                 // SocialLink = { label, href }
}
```

- `level` is RPG badge number; `rank` is letter grade (`A`) beside it.
- `xp` is source of truth for XP bar. `xpPercent` and `xpRemaining` are derived exports in same module — never store percentage.
- `chapter` drives `CurrentChapter`, mobile chapter chip and its bar; `chapterPercent` derived from objective counts.
- `session` feeds desktop system bar; `companion.lines` rotates through the RIN dialogue box (first line doubles as the SSR and reduced-motion fallback).
- `location` is long form (`Jakarta, Indonesia`), `locationShort` HUD chip form (`Jakarta, ID`). `utcOffsetLabel` is display string; `timeZone` is real IANA zone used by `Intl.DateTimeFormat` for live clock.
- `avatar` is path **relative to `public/`**, no leading slash (`images/avatar.webp`). Components prepend `BASE_URL`.
- `ContactPanel` splits `socials`: entries whose `href` starts with `mailto:` filtered out of external list. Email rendered separately from `profile.email` — keep `email` authoritative, do not rely on `mailto:` social for email button. `SocialLinks` renders all three as icon links.
- `MainLayout.astro` has own hardcoded `title`/`description` defaults — update those too when site name or positioning changes.

## `projects`

```ts
interface Project {
  id: string;            // "q001" — displayed uppercased as quest code
  title: string;
  category: string;      // "Web Application", "Mobile", "Tooling", "Creative"
  description: string;
  thumbnail: string;     // path relative to public/
  technologies: string[];
  demoUrl?: string;      // omit to hide the demo button
  repositoryUrl?: string;// omit to hide the repo button
  featured: boolean;     // true → appears on the QuestBoard
}
```

- `id` must be unique; `selectProject(id)` looks up by id.
- `featured: true` puts on HUD quest board. Non-featured still appear in full `ProjectPanel` list and quest log.
- Quest board renders at most first **three** featured projects (`slice(0, 3)`) in 3-column grid — keep three most important entries first in array.
- Board copy follows design: `q001` "E-commerce Platform", `q002` "Mobile Application", `q003` "Portal System". Thumbnails are `images/quest-0N.webp`; `q004` uses `quest-04.webp`, only appears in overlay list.
- Board glyph keyed by project id (`q001` → shopping bag, `q002` → smartphone, `q003` → sparkles) with category fallback.

## `skills`

```ts
type Mastery = "novice" | "adept" | "expert" | "master";
// masteryLevels → 1 | 2 | 3 | 4 pips of 4
```

Groups render in array order, group `title` as heading. Skill names must be unique **within a group** (used as Preact key).

## `experience`

```ts
interface ExperienceItem {
  period: string;            // "2022 — Present" (em dash, spaced)
  role: string; company: string;
  summary: string;
  technologies: string[];    // rendered as badges
  achievements: string[];    // rendered as bullet list
}
```

Newest first. List key is `company + period` — both must be distinct.

## Editing rules

1. **Site content belongs in `src/data/`.** Bios, projects, skills, experience, social links are data. Fixed UI chrome ("// MAIN MENU", "Start Play", "Back to quest log") stays inline in its component — don't move into data file.
2. **Assets:** place files in `public/images/`, reference without leading slash; components apply `import.meta.env.BASE_URL`. Forgetting breaks GitHub Pages build.
3. **Placeholders are intentional.** `hello@example.com`, `example.com/quests/...`, demo URLs, `Lorem Labs` are scaffolding. Replace only when asked — do not "improve" copy as side effect. Home tagline, bio, project descriptions already carry real copy from design archive; keep in `src/data/`.
4. **Types are the contract.** Add a field, update `interface` in same file; `pnpm check` catches consumers.
5. **No markdown/HTML in data strings.** Plain text only; rendering escapes it.
6. **Keep links real.** `https://github.com/imron02` and LinkedIn URL are two non-placeholder socials.

## Composition note

Section bodies read data but keep own framing (`AboutPanel` adds "Status: Available for quests" row, `ContactPanel` derives `externalLinks`). Do not push that logic into `src/data/` — data stays declarative, components own presentation.