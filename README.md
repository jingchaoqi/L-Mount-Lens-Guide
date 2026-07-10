# L-Mount Lens Guide

An unofficial, community-maintained lens database and navigation site for the
**L-Mount** lens mount system. It indexes lenses from L-Mount Alliance members
(Leica, Panasonic, Sigma, and other brands publicly listed at
[l-mount.com](https://l-mount.com/)) as well as third-party manufacturers that
make L-Mount lenses (TTArtisan, 7Artisans, Laowa, and others) — clearly
labeled so the two are never confused.

**This project is not affiliated with, sponsored by, or endorsed by Leica
Camera AG, the L-Mount Alliance, Panasonic, Sigma, or any other manufacturer.**
"L-Mount" is a trademark of Leica Camera AG. See [`/about`](src/pages/about.astro)
for the full disclaimer.

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
  pages are plain HTML/CSS with a small vanilla-JS island for search/filter.
- TypeScript for data types and page logic.
- Data lives in `src/data/lenses.json`, validated by a Node script before
  every build.
- No backend, no database — deploys as static files to GitHub Pages.

## Project structure

```
src/
  data/lenses.json        # the lens database (edit this to add/update lenses)
  lib/types.ts             # TypeScript shape of a lens entry
  lib/lenses.ts             # data-loading & formatting helpers
  components/               # LensCard, LensTable, FilterBar, Header, Footer
  layouts/Layout.astro      # shared HTML shell + SEO meta tags
  pages/index.astro          # home page: searchable/filterable lens list
  pages/lenses/[id].astro    # lens detail page (one per lens, auto-generated)
  pages/about.astro           # About & Disclaimer page
  scripts/filter.js           # client-side search/filter/sort/view-toggle
scripts/validate-data.mjs     # data validation script (required fields, ids, URLs)
```

## Adding or editing a lens

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full guide. Short version:

1. Add an entry to `src/data/lenses.json` following the shape in
   `src/lib/types.ts`.
2. Set `allianceMember` accurately — `true` only for lenses from a brand that
   is a publicly listed L-Mount Alliance member (currently Leica, Panasonic,
   Sigma). Everything else is `false`.
3. Include at least one `sourceUrls` entry citing where the specs came from.
4. Run `npm run validate:data` and fix any reported errors.
5. Open a pull request.

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
purchasing. Full disclaimer: `src/pages/about.astro` (rendered at `/about`).
