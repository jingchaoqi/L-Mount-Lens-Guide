import { defineConfig } from 'astro/config';

// GitHub Pages deployment settings.
// If you deploy to https://<user>.github.io/<repo>/, set `site` to your
// GitHub Pages URL and `base` to `/<repo>/`.
// If you deploy to a custom domain or a *.github.io user/org root page,
// set `base` back to '/'.
const REPO_NAME = 'L-Mount-Lens-Guide';

export default defineConfig({
  site: `https://jingchaoqi.github.io`,
  base: `/${REPO_NAME}/`,
  outDir: './dist',
});
