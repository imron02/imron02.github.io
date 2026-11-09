# imron02.github.io

Personal portfolio & CV site for [imron02.github.io](https://imron02.github.io) — premium, dark, minimalist, developer-oriented. Single page with anchor navigation; bilingual: Bahasa Indonesia (default, `/`) and English (`/en/`).

Stack: [Astro](https://astro.build) + TypeScript + Tailwind CSS v4 + Lucide icons + Motion (scroll-reveal). Zero client-side React — icons render statically, no hydration islands.

Print-to-PDF CV: the hero **"Unduh CV"** button opens the browser print dialog; a `@media print` stylesheet re-skins the page into a light A4 document (nav, CTAs, and footer hidden).

## Commands

```sh
pnpm install   # install dependencies
pnpm dev       # dev server at http://localhost:4321
pnpm build     # static build → dist/
pnpm preview   # preview the production build
pnpm check     # astro check (type diagnostics)
```

## Editing content

- **All site copy** lives in `src/data/profile.ts` — typed, per-locale (`id` / `en`). Swap placeholders with real data there; components stay untouched.
- **UI chrome strings** (nav labels, buttons, meta) live in `src/i18n/ui.ts`.
- **Theme** lives in `src/styles/global.css` — change `--accent` (and the favicon color in `public/favicon.svg`) to re-skin.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to GitHub Pages. Repo Settings → Pages → Source must be set to **"GitHub Actions"**.
