# L-Mount Lens Guide

English | [中文](README.zh-CN.md)

[![GitHub Repo stars](https://img.shields.io/github/stars/jingchaoqi/L-Mount-Lens-Guide?style=flat)](https://github.com/jingchaoqi/L-Mount-Lens-Guide/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/jingchaoqi/L-Mount-Lens-Guide?style=flat)](https://github.com/jingchaoqi/L-Mount-Lens-Guide/commits/main)

<div align="center">

### ✨ 👉 **[Try the live site — jingchaoqi.github.io/L-Mount-Lens-Guide](https://jingchaoqi.github.io/L-Mount-Lens-Guide/)** 👈 ✨

</div>

---

An unofficial, community-maintained lens database and navigation site for the
**L-Mount** lens mount system. It indexes lenses from L-Mount Alliance members
(Leica, Panasonic, Sigma, and other brands publicly listed at
[l-mount.com](https://l-mount.com/)) as well as third-party manufacturers that
make L-Mount lenses (TTArtisan, 7Artisans, Laowa, and others) — clearly
labeled so the two are never confused.

**This project is not affiliated with, sponsored by, or endorsed by Leica
Camera AG, the L-Mount Alliance, Panasonic, Sigma, or any other manufacturer.**
"L-Mount" is a trademark of Leica Camera AG. See
[`/about`](src/pages/[...locale]/about.astro) for the full disclaimer.

## Goals

- A fast, searchable, filterable directory of L-Mount lenses — a single page
  you can scan on desktop or mobile to compare specs.
- Clear, honest labeling of official Alliance-member lenses vs. third-party
  L-Mount lenses, without implying certification that doesn't exist.
- Fully data-driven: every lens page is generated from structured data, not
  hand-written HTML, so adding a lens is a data change, not a code change.
- Easy for anyone to contribute a correction or a new lens via pull request.

## Tech stack

- [Astro](https://astro.build/) (static output) — no client-side framework;
  pages are plain HTML/CSS with small vanilla-JS islands for search/filter and
  lens comparison.
- TypeScript for data types and page logic.
- Data lives in `src/data/lenses.json`, validated by a Node script before
  every build.
- Bilingual (English/Chinese) by static generation: every page is rendered once
  per language at build time, so there is no client-side translation pass.
- No backend, no database — deploys as static files to GitHub Pages.

## Project structure

```
src/
  data/lenses.json        # the lens database (edit this to add/update lenses)
  lib/types.ts             # TypeScript shape of a lens entry
  lib/lenses.ts             # data-loading & formatting helpers
  lib/locales.js             # the locale registry: which languages the site ships
  lib/i18n.ts                 # build-time translation + locale-aware URL helpers
  lib/i18n-dict.js             # the EN/ZH UI string dictionary
  components/                   # LensCard, LensTable, FilterBar, Header, Footer, Compare*
  layouts/Layout.astro           # shared HTML shell, SEO meta, hreflang, language redirect
  pages/[...locale]/index.astro        # home page: searchable/filterable lens list
  pages/[...locale]/lenses/[id].astro  # lens detail page (one per lens, auto-generated)
  pages/[...locale]/about.astro        # About & Disclaimer page
  pages/[...locale]/compare.astro      # side-by-side lens comparison page
  scripts/filter.js         # client-side search/filter/sort/view-toggle
  scripts/compare.js         # client-side lens-comparison selection
  scripts/i18n.js             # runtime t() for JS-generated strings; remembers language choice
scripts/validate-data.mjs     # data validation script (required fields, ids, URLs, notes locales)
```

Every route lives under `pages/[...locale]/`. Astro generates one static page
per language from each of them (see [Languages](#languages) below).

## Languages

The site ships in English and Chinese. Every page is **server-rendered once per
language at build time**, so the HTML the browser receives is already in the
right language — there is no runtime translation pass and therefore no
wrong-language flash to hide.

- **URLs**: the default language (English) is served un-prefixed — `/`,
  `/about`, `/compare`, `/lenses/<id>`. Every other language is served under its
  own prefix — `/zh/`, `/zh/about`, `/zh/compare`, `/zh/lenses/<id>`. With 112
  lenses and 2 languages, the build emits 230 pages (115 per language).
- **First visit**: a small blocking inline script in `<head>`, present on
  un-prefixed pages only, picks a language — in order of precedence: an
  explicitly saved choice (`localStorage`), then the browser's
  `navigator.languages`, then English. If that resolves to a non-default
  language it redirects to the prefixed URL before the body is parsed, so
  nothing has painted yet. Locale-prefixed URLs never redirect: an explicit URL
  always wins, stays shareable, and cannot bounce in a loop.
- **Switching**: the language switcher in the header is a plain link to the same
  page in the other language, so it works with JavaScript disabled. Clicking it
  also saves the choice, which the first-visit redirect honours next time.
- **SEO**: each language has its own indexable URL, its own translated `<title>`
  and `<meta name="description">`, a per-language canonical, and
  `<link rel="alternate" hreflang>` entries for every language plus `x-default`.
- **Tradeoff**: with JavaScript disabled, a visitor whose browser is set to
  Chinese and who lands on an un-prefixed URL gets the English page (the
  language link still works). A Chinese visitor's first hit to an un-prefixed
  URL also costs one extra client-side redirect.

### Adding a language

1. Add an entry to `src/lib/locales.js` — the locale code (which becomes the URL
   prefix), the `<html lang>` value, the language's own name for itself (used as
   the switcher's link text), and the `navigator.language` prefixes that should
   match it.
2. Add that locale's section to `src/lib/i18n-dict.js`, including a
   `brand.<Brand>` key for every brand.
3. Optionally add `notes.<code>` to entries in `src/data/lenses.json` — anything
   you don't translate falls back to English.

That is the whole change. The routes, the `hreflang` alternates, the language
switcher, the first-visit redirect and the client-side search index all derive
from the registry in `locales.js` — no other code needs to be touched.

## Adding or editing a lens

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide. Short version:

1. Add an entry to `src/data/lenses.json` following the shape in
   `src/lib/types.ts`.
2. Set `allianceMember` accurately — `true` only for lenses from a brand that
   is a publicly listed L-Mount Alliance member; the authoritative roster is the
   member list at [l-mount.com](https://l-mount.com/). The brands currently
   flagged as members in this dataset are Leica, Panasonic, Samyang, Sigma,
   Sirui and Viltrox. Everything else is `false`.
3. Write `notes` as an object keyed by locale code, e.g.
   `{ "en": "...", "zh": "..." }`. The `"en"` entry is required; every other
   language is optional and falls back to English.
4. Include at least one `sourceUrls` entry citing where the specs came from.
5. Run `npm run validate:data` and fix any reported errors.
6. Open a pull request.

No other code changes are needed — the list page, filters, and detail page
are all generated automatically from the data file.

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev        # starts a local dev server with hot reload
```

Other scripts:

```bash
npm run validate:data   # validate src/data/lenses.json
npm run build            # validate data, then build the static site to dist/
npm run preview           # preview the production build locally
npm run lint               # type-check the project (astro check)
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys the site to GitHub Pages automatically on every push
to `main`.

To enable it on your fork/repo:

1. In your GitHub repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Open `astro.config.mjs` and update:
   - `site` — your GitHub Pages URL, e.g. `https://your-username.github.io`
   - `REPO_NAME` — your repository name (used to build the `base` path,
     e.g. `/L-Mount-Lens-Guide/`). If you deploy to a custom domain or a
     `<user>.github.io` root repo, set `base` to `/` instead.
3. Push to `main`. The workflow builds the site with `npm run build` and
   publishes the `dist/` folder to GitHub Pages.

To deploy manually instead:

```bash
npm run build
# then publish the contents of dist/ to your GitHub Pages branch/host of choice
```

## License

- **Code**: [MIT](LICENSE)
- **Lens data** (`src/data/lenses.json`): [CC BY-SA 4.0](DATA_LICENSE.md) —
  see that file for the reasoning and what it requires of reusers.

## Disclaimer (summary)

This is a hobby/community open-source project, not an official resource from
any camera or lens manufacturer. Third-party (non-Alliance) lens listings
indicate only that the manufacturer offers or claims an L-Mount version of
that product — not that it has been certified or endorsed by the L-Mount
Alliance. Always verify specifications with the manufacturer before
purchasing. Full disclaimer: `src/pages/[...locale]/about.astro` (rendered at
`/about`, and at `/zh/about` in Chinese).
