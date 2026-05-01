# Steven Armenta — LeetCode Notes

Personal study journal for LeetCode problems, built with [Astro](https://astro.build).
Pattern-first notes, public by default.

Live at: **[stevenarmenta.com](https://stevenarmenta.com)** *(after deploy)*

---

## Tech stack

- **[Astro 4](https://astro.build)** — static site generator, ships zero JS by default
- **MDX + Content Collections** — type-safe markdown with frontmatter validation
- **Shiki** — syntax highlighting (light/dark dual theme)
- **Vercel** — hosting + automatic deploys on git push
- Custom CSS — no Tailwind, no UI framework, ~10KB total

## Getting started locally

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:4321

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

## Project structure

```
src/
├── components/         Reusable Astro components (Header, Footer, NoteCard)
├── content/
│   ├── config.ts       Content collection schema (frontmatter validation)
│   └── notes/          ⭐ Each LeetCode note is a .md file here
├── layouts/
│   ├── BaseLayout.astro    Site-wide HTML shell, SEO meta, Person schema
│   └── NoteLayout.astro    Article shell, TechArticle schema
├── pages/              File-based routing
│   ├── index.astro     Homepage
│   ├── about.astro     About page (key for name SEO)
│   ├── notes/          /notes/ index + dynamic [slug] route
│   ├── patterns/       Patterns index page
│   └── rss.xml.js      Auto-generated RSS feed
└── styles/global.css   All styles, design tokens, light/dark themes
public/
├── favicon.svg
└── robots.txt
```

## Adding a new LeetCode note

1. Create a new file in `src/content/notes/` named `<problem-number>-<kebab-slug>.md`.
   Example: `src/content/notes/121-best-time-to-buy-and-sell-stock.md`
2. Copy the frontmatter template from `CONTENT_CHECKLIST.md`.
3. Write the note in markdown. Code blocks support syntax highlighting via Shiki —
   use language tags like ` ```python ` or ` ```cpp `.
4. `git add . && git commit -m "Add note: 121 Best Time to Buy and Sell Stock" && git push`
5. Vercel auto-deploys in ~30 seconds.

The frontmatter schema is enforced at build time — if you miss a required field
(or use an invalid difficulty), the build will fail loudly. Run `npm run build`
locally before pushing if you want to catch this early.

### Frontmatter template

```yaml
---
title: "Problem Title"
problem: 121
difficulty: "Easy"          # Easy | Medium | Hard
pattern: "Sliding Window"   # The technique this problem teaches
tags: ["array", "dp"]
leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
publishedAt: 2026-05-04
description: "One-sentence summary used for meta description and listing cards."
draft: false
---
```

## Deployment to Vercel

1. **Push this project to a new GitHub repo.**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:<your-username>/leetcode-notes.git
   git push -u origin main
   ```

2. **Import the repo in Vercel.** Visit [vercel.com/new](https://vercel.com/new),
   choose your GitHub repo. Vercel auto-detects Astro and uses the right build
   settings. Click **Deploy**.

3. **Add your custom domain.** In Vercel dashboard → your project → **Settings →
   Domains**. Add `stevenarmenta.com` (or whichever domain you bought) and follow
   Vercel's DNS instructions. Propagation usually takes minutes, sometimes hours.

4. **Update `astro.config.mjs`.** Change the `site` value to your real domain.
   This is critical — sitemap, RSS, canonical URLs, and OG tags all use it.
   Commit and push.

## SEO checklist (do these in week 1)

- [ ] Update `astro.config.mjs` `site` to real domain
- [ ] Update `public/robots.txt` sitemap URL to real domain
- [ ] Add a real Open Graph image at `public/og-default.png` (1200×630px)
- [ ] Submit `https://yoursite.com/sitemap-index.xml` to
      [Google Search Console](https://search.google.com/search-console)
- [ ] Submit the same to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Add the site URL to your LinkedIn profile, GitHub bio, Twitter/X bio
- [ ] In `src/layouts/BaseLayout.astro`, fill in additional `sameAs` links
      in the Person schema (GitHub, Twitter, etc.)
- [ ] Verify the homepage `<title>` is exactly your name on first load

## SEO maintenance (ongoing)

- Publish 2–3 notes per week, consistently. Cadence beats volume for ranking.
- Each note title should include the problem name and number — they get indexed
  for both "leetcode 20 valid parentheses" *and* "valid parentheses solution"
  type queries, which build domain authority.
- Internal-link liberally between related notes ("see also: 32, 921").
- Don't delete notes once published. Stable URLs accumulate ranking over time.

## License

Notes content: CC BY 4.0 (attribution appreciated).
Site code: MIT.
