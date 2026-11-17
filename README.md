# Portfolio

Personal site for Kamesh Raj Shanmugam, built with [Astro](https://astro.build) and deployed as static files.

```
npm install
npm run dev      # local dev server
npm run build    # outputs to dist/
```

## Where things live

- `src/pages/index.astro`: home page (hero claims and their sources, software, design, about, contact).
- `src/pages/work/*.astro`: the four design case studies.
- `src/data/repos.ts`: reads public repos from the GitHub API at build time. If the request fails it falls back to `repos.fallback.json`. Set `GITHUB_TOKEN` in CI to avoid rate limits. Add a description for a repo in `DESCRIPTIONS` if it has none on GitHub.
- `src/data/work.ts`: the design project list on the home page.
- `src/assets/images/`: source images. Use `<Img src="Folder/file.png" alt="..." />`; Astro resizes and converts them at build.
- `public/documents/`: resume PDFs.
