// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// IMPORTANT: change `site` to your real domain before deploy.
// Used for sitemap, RSS, canonical URLs, and Open Graph.
export default defineConfig({
  site: 'https://stevenarmenta.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Light/dark dual theme. Shiki applies both; CSS picks which to show.
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaLabel: 'Link to section' },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
});
