# Content Checklist — New LeetCode Note

Copy this template into `src/content/notes/<problem-number>-<kebab-slug>.md`
and fill in each section. The frontmatter schema is validated at build time.

```markdown
---
title: "Problem Title"
problem: 121
difficulty: "Easy"          # Easy | Medium | Hard
pattern: "Sliding Window"
tags: ["array"]
leetcodeUrl: "https://leetcode.com/problems/..."
publishedAt: 2026-05-04
description: "One-sentence summary for meta description + listing cards."
draft: false
---

## Problem recap

Restate the problem in your own words (2-4 sentences). Include the key
constraints. End with the core insight that motivates the approach.

## Pattern trigger

> What signal in the problem makes you reach for this technique?

A 1–2 line "trigger" you'd recognize on a future problem you've never seen.

## Approach: <name of approach>

### Intuition

Why this approach works. The mental model. Not the algorithm yet —
the *idea*.

### Algorithm

Numbered steps in plain English (no code). If you can't write the
algorithm without code, you don't understand it well enough yet.

### Code

```python
# Your solution, in your language of choice.
```

### Complexity

- **Time:** O(?)
- **Space:** O(?)

## Walkthrough

A small concrete example traced step-by-step. Use a table when helpful.

| Step | Input | Action | State |
|------|-------|--------|-------|
| 1    | ...   | ...    | ...   |

## Common pitfalls

- Bugs you'd actually make on a re-solve.
- Edge cases the naive version misses.
- Style notes / idiomatic alternatives.

## Follow-ups interviewers ask

1. Likely variation 1.
2. Likely variation 2.

## Related problems

Other problems that use this pattern. Link by problem number and name.
This is what builds your personal pattern catalog.
```

## Cadence rules I follow

- **2–3 notes per week.** Consistency over volume.
- **Re-solve before writing.** If I can't solve it cold the day I write
  the note, the note isn't ready.
- **Pattern first, code second.** If a reader skims only the "Pattern
  trigger" section, they should walk away with something useful.
- **Don't delete published notes.** Update them with `updatedAt` instead.
  Stable URLs build SEO over time.
