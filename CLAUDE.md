# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321 (hot reload)
npm run build    # Production build to /dist (also validates frontmatter schema)
npm run preview  # Serve the production build locally
```

There are no tests. `npm run build` is the primary validation step — it will fail with a descriptive error if any note's frontmatter violates the Zod schema in `src/content/config.ts`.

## Architecture

This is an **Astro 4** static site — a pattern-first LeetCode study journal deployed to Vercel.

**Content layer:** All notes live as `.md` files in `src/content/notes/`. Astro's Content Collections enforce a Zod schema at build time. Required frontmatter fields: `title`, `problem` (int), `difficulty` (Easy/Medium/Hard), `pattern`, `leetcodeUrl`, `publishedAt`, `description`. Optional: `tags`, `updatedAt`, `draft` (defaults false; drafts are excluded from listings).

**Routing:**
- `/` — homepage, shows 6 most recent non-draft notes
- `/notes/` — full archive
- `/notes/[slug]/` — dynamic route; slug comes from the filename (e.g. `20-valid-parentheses.md` → `/notes/20-valid-parentheses/`)
- `/patterns/` — notes grouped by `pattern` frontmatter field
- `/rss.xml` — auto-generated RSS feed

**Layout hierarchy:** `BaseLayout.astro` is the HTML shell (global meta, SEO, fonts). `NoteLayout.astro` wraps individual note pages and adds article-specific JSON-LD and Open Graph data. `NoteCard.astro` is the shared listing component used on the homepage, archive, and patterns pages.

**Styling:** Custom CSS only (`src/styles/global.css`, ~10KB). Uses CSS custom properties for theming. Dark mode is `prefers-color-scheme` only — no toggle. No Tailwind, no CSS-in-JS.

**SEO:** `BaseLayout` injects Person JSON-LD; `NoteLayout` injects TechArticle JSON-LD. The site URL (`https://stevenarmenta.com`) is set in `astro.config.mjs` and must match for canonical URLs and the sitemap to be correct.

## Adding a New Note

1. Create `src/content/notes/<problem-number>-<slug>.md` with all required frontmatter.
2. Use `CONTENT_CHECKLIST.md` as a template — it defines the expected sections (intuition, algorithm, complexity, pitfalls, follow-ups).
3. Run `npm run dev` to preview, then `npm run build` to validate schema before pushing.
