import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    problem: z.number().int().positive(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    pattern: z.string(), // e.g. "Stack", "Sliding Window", "Dynamic Programming"
    tags: z.array(z.string()).default([]),
    leetcodeUrl: z.string().url(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    description: z.string(), // Used for meta description and post cards
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
