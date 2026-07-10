# Data License

The lens specification data in this repository (`src/data/lenses.json` and any
other structured data files under `src/data/`) is licensed under the
**Creative Commons Attribution-ShareAlike 4.0 International License
(CC BY-SA 4.0)**.

Full license text: https://creativecommons.org/licenses/by-sa/4.0/

## Why CC BY-SA instead of CC0 or MIT

- Lens specifications are compiled community effort (aggregated from
  manufacturer sites, press materials, and public listings). CC BY-SA
  requires downstream reusers to **credit the project** and to
  **share alike** (keep derivative datasets open under the same terms),
  which keeps the dataset from being forked into a closed/proprietary
  product without giving back.
- CC0 (public domain) would allow that; MIT is a software license and is a
  poor fit for a data license (it doesn't address attribution/share-alike
  for factual compilations the way CC licenses do).
- Raw specifications (a focal length, an aperture value) are facts and not
  independently copyrightable, but the **compiled, structured, curated
  dataset as a whole** (selection, arrangement, added fields such as
  category tags and compatibility notes) can be protected as a compilation/
  database, which is what CC BY-SA covers here.

## What this means in practice

- You may copy, redistribute, and adapt the data for any purpose, including
  commercially.
- You must give appropriate credit (e.g. "Lens data from the L-Mount Lens
  Guide project, https://github.com/<org>/L-Mount-Lens-Guide") and indicate
  if changes were made.
- If you publish a modified/derived version of the dataset, it must be
  distributed under the same CC BY-SA 4.0 license.

## Underlying facts are not owned by this project

Individual specifications (focal length, weight, aperture, release year,
etc.) are factual and generally available from manufacturers' own published
materials. This project does not claim ownership over the underlying facts —
only over the compiled dataset. When adding data, always cite your
`sourceUrls` so provenance stays traceable back to primary sources.
