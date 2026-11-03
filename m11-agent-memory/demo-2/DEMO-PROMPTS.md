# Module 11 Demo 2: Auditing the Draft Against Product Accuracy

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The `sa-customer-story-agent` from Demo 1, set to Haiku, is in `.claude/agents/`, and the skills are in `.claude/skills/`. `drafts/jordan-case-study.md` is the brand-voice first pass from Demo 1. Its product accuracy audit hasn't run yet. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P3: Run the product accuracy audit**
```
Proceed with the sa-product-accuracy audit on the first pass of Jordan's interview in the drafts folder.
```
Expected: a per-claim table. Most quotes are approved, but Jordan's comparison to a named competitor (Vertex) is banned, and the result says not to ship the draft until a human reviews it.
