---
title: "Valid Parentheses"
problem: 20
difficulty: "Easy"
pattern: "Stack"
tags: ["string", "stack", "hash-map"]
leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/"
publishedAt: 2026-05-01
description: "A walkthrough of the classic stack-based approach to LeetCode 20, with the trigger-pattern-insight framing I use for every note."
---

## Problem recap

Given a string containing only the six bracket characters `()[]{}`, decide whether every opening bracket is matched by a closing bracket of the same type, and that brackets close in the correct nested order.

The key insight: validity is fundamentally about the **most recent unmatched opener**. When you see `)`, the closest preceding unmatched bracket must be `(`. This "last in, first out" structure is exactly what a **stack** models.

## Pattern trigger

> Matching nested structure → stack. Trigger words: brackets, balanced, nested, "valid" sequence.

If a problem asks about pairing things up where the pairings can be nested, a stack is almost certainly the right tool. A counter (e.g. `(` minus `)`) is tempting but breaks the moment multiple bracket *types* interact — `"([)]"` has a balanced count but is invalid.

## Approach: stack with a closer→opener map

### Intuition

Walk through the string left to right. Every time you meet an opening bracket, push it onto a stack — it's now waiting for its partner. When you meet a closing bracket, the top of the stack must be its matching opener; otherwise the string is invalid. At the end, the stack must be empty.

To make the matching check fast and clean, keep a **closer → opener** map. Why this direction? The bracket on top of the stack is always an opener; the one we just read is the closer we're testing. Mapping closer → opener lets the check collapse to a single equality.

Three failure modes the algorithm must catch:

1. A closing bracket arrives when the stack is empty → no opener to match.
2. A closing bracket doesn't match the top of the stack → wrong type or wrong order.
3. The stack is non-empty at the end → unmatched openers remain.

### Algorithm

1. Build a map `closeToOpen = {'}':'{', ')':'(', ']':'['}` and an empty `stack`.
2. For each character `c` in `s`:
   - If `c` is a **closer** (`c in closeToOpen`):
     - If the stack is non-empty *and* its top equals `closeToOpen[c]`, pop it — a successful match.
     - Otherwise return `False` — either nothing to match against, or a type mismatch.
   - Else `c` is an **opener** — push it onto the stack.
3. After the loop, return `True` only if the stack is empty.

The combined check `if stack and stack[-1] == closeToOpen[c]` handles failure modes 1 and 2 in one expression: if the stack is empty, Python's short-circuit `and` skips the comparison and falls into the `else` branch returning `False`. Failure mode 3 is caught by the final empty-check.

### Code

```python
class Solution:
    def isValid(self, s: str) -> bool:
        closeToOpen = {'}':'{', ')':'(', ']':'['}
        stack = []

        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)

        return True if not stack else False
```

### Complexity

- **Time:** O(n) — each character is examined once, with O(1) push/pop/peek/dict-lookup work per step.
- **Space:** O(n) — worst case `"(((("` pushes the entire string onto the stack.

## Walkthrough on `"([)]"`

| Step | Char | Branch | Action | Stack |
|------|------|--------|--------|-------|
| 1 | `(` | opener | push | `['(']` |
| 2 | `[` | opener | push | `['(', '[']` |
| 3 | `)` | closer | top is `[`, expected `(` → **return False** | — |

This is exactly why a stack is essential. We need the *most recent* opener, not just any opener.

## Walkthrough on `"([])"` (a valid case)

| Step | Char | Branch | Action | Stack |
|------|------|--------|--------|-------|
| 1 | `(` | opener | push | `['(']` |
| 2 | `[` | opener | push | `['(', '[']` |
| 3 | `]` | closer | top `[` matches → pop | `['(']` |
| 4 | `)` | closer | top `(` matches → pop | `[]` |

Loop ends, stack is empty → return `True`.

## Common pitfalls

- **Popping before checking emptiness.** `if stack.pop() == closeToOpen[c]` raises `IndexError` on input `")"`. Guarding with `if stack and ...` uses Python's short-circuit evaluation so `stack[-1]` is only read when the stack is non-empty.
- **Forgetting the final empty check.** Input `"("` never enters the closer branch and never returns `False` mid-loop. Without the final `not stack` check, this incorrectly returns `True`.
- **Mapping the wrong direction.** Mapping opener → closer forces a reverse lookup at pop time. Closer → opener mirrors the data flow.
- **Style nitpick.** `return True if not stack else False` is equivalent to `return not stack`. Both are correct; the shorter form is more idiomatic.

## Follow-ups interviewers ask

1. **What if the string also contains non-bracket characters?** Skip them in the loop, or treat the string as invalid — clarify the contract.
2. **Return the position of the first invalid char.** Track the index when returning `False`.
3. **Generalize to arbitrary bracket pairs.** The map already handles this — extend `closeToOpen`.

## Related problems

The stack-for-nested-structure pattern reappears in:

- **32 — Longest Valid Parentheses** (Hard): same trigger, but you track indices.
- **921 — Min Add to Make Parentheses Valid** (Medium): a counting variant that *does* work because there's only one bracket type.
- **856 — Score of Parentheses** (Medium): stack stores partial scores instead of brackets.
- **1249 — Minimum Remove to Make Valid Parentheses** (Medium): stack of indices, not characters.

Pattern to remember: **matching nested structure → stack.**
