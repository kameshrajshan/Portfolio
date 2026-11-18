import { defineConfig } from 'astro/config';

// Static output for GitHub Pages. SITE and BASE come from the deploy workflow;
// the defaults below match https://just-0-kam.github.io/Portfolio/.
// For a user site or custom domain, set BASE to '/' (and SITE to that origin).
export default defineConfig({
  site: process.env.SITE ?? 'https://just-0-kam.github.io',
  base: process.env.BASE ?? '/Portfolio',
});
