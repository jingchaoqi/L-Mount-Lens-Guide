# Contributing

Thanks for helping keep the L-Mount Lens Guide accurate and up to date. Most
contributions are data changes to `src/data/lenses.json` — no code changes
required.

## Adding a new lens

1. Open `src/data/lenses.json`.
2. Add a new object to the array, following this shape (see
   `src/lib/types.ts` for the authoritative type definitions):

   ```json
   {
     "id": "brand-model-slug",
     "brand": "Brand Name",
     "model": "Model Name",
     "mount": "L-Mount",
     "allianceMember": false,
     "format": "Full Frame",
     "lensType": "Prime",
     "focusType": "AF",
     "focalLengthMin": 35,
     "focalLengthMax": 35,
     "maxAperture": 1.4,
     "minAperture": 16,
     "weightGram": 645,
     "filterThreadMm": 67,
     "minFocusDistanceM": 0.27,
     "maxMagnification": 0.19,
     "stabilization": false,
     "weatherSealed": true,
     "category": ["Standard"],
     "releaseYear": 2024,
     "officialUrl": "https://example.com/lens-page",
     "sourceUrls": ["https://example.com/lens-page"],
     "notes": "",
     "notesZh": "",
     "affiliateUrls": [],
     "retailerSearchUrls": []
   }
   ```

3. **`id`** must be a unique, lowercase, kebab-case slug (letters, numbers,
   hyphens only). This becomes the URL: `/lenses/<id>`. Convention:
   `brand-model-key-specs`, e.g. `sigma-35mm-f1-4-dg-dn-art`.

4. **`allianceMember`** — set to `true` only if the brand is a publicly
   listed member of the L-Mount Alliance (as of writing: Leica, Panasonic,
   Sigma). For every other brand, set it to `false`. This flag drives a
   visible "Alliance member" vs. "Third-party" badge on the site — please
   get it right, since misrepresenting a third-party product as an Alliance
   product is exactly what this project exists to avoid. If a brand's
   membership status is unclear or has recently changed, note it in `notes`
   and link a source.

5. **`category`** — pick one or more from: `Wide Angle`, `Standard`,
   `Portrait`, `Telephoto`, `Macro`, `Cine`.

6. **`sourceUrls`** (required, non-empty) — at least one link to where you
   got the specifications (manufacturer product page, official press
   release, or manufacturer spec sheet). Prefer the manufacturer's own page
   over third-party retailers or blogs. `officialUrl` should also generally
   be a manufacturer link.

7. **`notesZh`** (optional) — a Chinese translation of `notes`, shown instead
   of the English text when the site is switched to Chinese. If omitted, the
   English `notes` text is shown regardless of language.

8. **`affiliateUrls`** / **`retailerSearchUrls`** — leave `affiliateUrls`
   empty (`[]`) unless you are the maintainer setting up a disclosed
   monetization program. `retailerSearchUrls` can contain plain,
   non-monetized "search this retailer for this lens" links — do not add
   personal affiliate/referral links here.

## Editing or correcting an existing lens

Same file, find the existing entry by `id`, update the fields, and make sure
`sourceUrls` reflects where the corrected value comes from.

## Validating your changes

Before opening a pull request, run:

```bash
npm install
npm run validate:data
```

This checks:
- all required fields are present and correctly typed
- `id` is unique and kebab-case
- `mount`, `format`, `lensType`, `focusType`, `category` values are from the
  allowed set
- `officialUrl`, `sourceUrls`, `affiliateUrls[].url`, and
  `retailerSearchUrls[].url` are well-formed `http(s)` URLs
- `focalLengthMin` ≤ `focalLengthMax` and `maxAperture` ≤ `minAperture`
  (as f-numbers)

Also run `npm run build` locally to confirm the site builds and your new
lens page renders correctly at `/lenses/<id>`.

## Pull request checklist

- [ ] `npm run validate:data` passes
- [ ] `npm run build` succeeds
- [ ] New/changed lens entries include at least one `sourceUrls` link
- [ ] `allianceMember` is set correctly for the brand
- [ ] No manufacturer logos, Leica red dot, or other trademarked graphics
      were added anywhere in the project (text-only brand names are fine)

## Code changes

For changes beyond the data file (new filters, layout tweaks, etc.), keep
pages data-driven — don't hardcode lens information into components or
pages. Run `npm run lint` (Astro's type checker) before submitting.
