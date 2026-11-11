# Content

> Read when: editing copy, links, projects, skills, or experience entries. This is usually the only doc you need.

## Where content lives

| File | Export | Feeds |
|---|---|---|
| `src/data/profile.ts` | `profile`, `Profile`, `SocialLink` | `PlayerProfile`, `WelcomePanel`, `AboutPanel`, `ContactPanel` |
| `src/data/projects.ts` | `projects`, `Project` | `QuestBoard` (featured only), `ProjectPanel` |
| `src/data/skills.ts` | `skillGroups`, `masteryLevels`, `SkillGroup`, `Skill`, `Mastery` | `SkillsTree` |
| `src/data/experience.ts` | `experience`, `ExperienceItem` | `ExperienceLog` |

Components import these directly. Change a value and the UI follows — no CMS, no fetch, no build-time content collection.

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
  companion: { name: string; role: string; line: string };
  socials: SocialLink[];                 // SocialLink = { label, href }
}
```

- `level` is the RPG badge number; `rank` is the letter grade (`A`) rendered beside it.
- `xp` is the source of truth for the XP bar. `xpPercent` and `xpRemaining` are derived exports in the same module — never store a percentage.
- `chapter` drives `CurrentChapter`, the mobile chapter chip and its bar; `chapterPercent` is derived from the objective counts.
- `session` feeds the desktop system bar; `companion` feeds the RIN dialogue box.
- `location` is the long form (`Jakarta, Indonesia`), `locationShort` the HUD chip form (`Jakarta, ID`). `utcOffsetLabel` is a display string; `timeZone` is a real IANA zone used by `Intl.DateTimeFormat` for the live clock.
- `avatar` is a path **relative to `public/`**, no leading slash (`images/avatar.webp`). Components prepend `BASE_URL`. It is a 320×320 face crop of `design/CV-Game-assets/generated-2.png`.
- `socials` is split by `ContactPanel`: entries whose `href` starts with `mailto:` are filtered out of the external list. The email is rendered separately from `profile.email`, so keep `email` authoritative and do not rely on a `mailto:` social for the email button. `SocialLinks` renders all three as icon links.
- `MainLayout.astro` has its own hardcoded `title`/`description` defaults — update those too when the site name or positioning changes.

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

- `id` must be unique; `selectProject(id)` looks it up by id.
- `featured: true` puts it on the HUD quest board. Non-featured projects still appear in the full `ProjectPanel` list and quest log.
- The quest board renders at most the first **three** featured projects (`slice(0, 3)`) in a 3-column grid, so keep the three most important entries first in the array.
- The board's copy follows the design: `q001` "E-commerce Platform", `q002` "Mobile Application", `q003` "Portal System". Their thumbnails are `images/quest-0N.webp`; `q004` uses `quest-04.webp` and only appears in the overlay list.
- The board glyph is keyed by project id (`q001` → shopping bag, `q002` → smartphone, `q003` → sparkles) with a category fallback.

## `skills`

```ts
type Mastery = "novice" | "adept" | "expert" | "master";
// masteryLevels → 1 | 2 | 3 | 4 pips of 4
```

Groups render in array order with the group `title` as a heading. Skill names must be unique **within a group** (used as the Preact key).

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

Newest first. The list key is `company + period`, so both must be distinct.

## Editing rules

1. **Site content belongs in `src/data/`.** Bios, projects, skills, experience, and social links are data. Fixed UI chrome ("// MAIN MENU", "Start Play", "Back to quest log") stays inline in its component — don't move it into a data file.
2. **Assets:** place files in `public/images/` and reference them without a leading slash; components apply `import.meta.env.BASE_URL`. Forgetting this breaks the GitHub Pages build.
3. **Placeholders are intentional.** `hello@example.com`, `example.com/quests/...`, demo URLs, and `Lorem Labs` are scaffolding. Only replace them when asked — do not "improve" copy as a side effect. The home tagline, bio, and project descriptions already carry real copy from the design archive; keep them in `src/data/`.
4. **Types are the contract.** If you add a field, update the `interface` in the same file; `pnpm check` will catch consumers.
5. **No markdown/HTML in data strings.** Plain text only; rendering escapes it.
6. **Keep links real.** `https://github.com/imron02` and the LinkedIn URL are the two non-placeholder socials.

## Composition note

Section bodies read data but keep their own framing (`AboutPanel` adds a "Status: Available for quests" row, `ContactPanel` derives `externalLinks`). Do not push that logic into `src/data/` — data stays declarative, components own presentation.
