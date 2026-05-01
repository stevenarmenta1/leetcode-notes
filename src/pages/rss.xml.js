import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return rss({
    title: 'Steven Armenta — LeetCode Notes',
    description:
      'Pattern-first LeetCode study notes by Steven Armenta. Algorithms, data structures, and the mental models behind them.',
    site: context.site,
    items: notes
      .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.publishedAt,
        description: entry.data.description,
        link: `/notes/${entry.slug}/`,
        categories: [entry.data.pattern, entry.data.difficulty, ...entry.data.tags],
      })),
    customData: '<language>en-us</language>',
  });
}
