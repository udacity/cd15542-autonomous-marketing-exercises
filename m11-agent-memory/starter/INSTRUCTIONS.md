# Build a Customer Story Agent for a Provided Transcript

## Goal

Build a single agent that turns a raw Solstice Active customer interview
transcript into an on-brand, fact-checked case-study draft. The agent drafts the
story in brand voice, then runs a **separate** product-accuracy pass that
catches unsubstantiated claims — most importantly a competitor comparison a
happy customer volunteers — and escalates anything it can't safely ship. You're
building the agent; the two skills and the transcripts are provided.

## What you're given

- **`transcripts/raw/sa-jordan-marathon-interview.md`** — a runner's interview
  about the Momentum Legging. This is the one worked through in the demo.
- **`transcripts/raw/sa-priya-pulse-interview.md`** — an instructor's interview
  about the Pulse Sports Bra. Use this one to run your finished agent
  **independently**. Each transcript ends with "Interviewer notes" — instructions
  to you about what to trim, not customer voice to quote.
- **`.claude/skills/sa-brand-voice/`** — Solstice's voice, tone, and banned
  language. Note its carve-out: the Customer Voice section is preserved in the
  customer's own words, not rewritten into brand voice.
- **`.claude/skills/sa-product-accuracy/`** — the fact-check skill.
  `references/sa-claims-tracker.md` is the only authority for what's approved,
  banned, or unverified. Named-competitor comparisons are banned outright,
  regardless of who said them.
- **`drafts/`** — where the finished case-study draft is written.
- **`CLAUDE.md`** — the workspace's ground rules: two distinct passes in order,
  never invent a quote or a number, escalate anything the audit flags, and a
  human reviews every draft.

You are **not** given the agent file — writing it is the exercise.

## Prerequisites

- Claude Code with sub-agent support (a `.claude/agents/` folder) and the
  ability to invoke skills.

## Steps

1. **Read `CLAUDE.md` and both skills** so you know the two-pass rule and the
   Customer Voice carve-out before writing anything.
2. **Author `.claude/agents/sa-customer-story-agent.md`.** One agent, two
   sequential passes. Give it frontmatter (`name`, `description`, tools for
   reading/writing files and invoking skills, a `model`) and a body that walks
   through: read the whole transcript including interviewer notes; extract
   Problem, Approach, Outcome, and candidate direct quotes; then draft.
3. **Pass 1 — draft in brand voice.** Write Problem, Approach, and Outcome with
   `sa-brand-voice` in Write mode. Keep the **Customer Voice** section verbatim
   (trim filler only) — do not run it through the voice rewrite. Exclude
   personal tangents the interviewer notes flag, and never round a vague
   impression into a number the transcript doesn't state.
4. **Pass 2 — fact-check with `sa-product-accuracy`.** Run the full draft,
   including the customer's own quotes, against the claims tracker. Produce the
   skill's per-claim table and its SHIPS / DOES NOT SHIP gate. Catch the
   named-competitor comparison, any unverified personal-outcome metric, and any
   approved claim pushed past its limit.
5. **Resolve every blocker before writing the file.** Cut or replace each BANNED
   / UNVERIFIED / OVERREACH finding with an in-voice, non-comparative
   alternative or a clearly marked placeholder — never fabricate a tracker row
   or a proof source. The draft only gets written once its gate reads SHIPS;
   anything escalated is flagged inline with the exact next action.
6. **Save to `drafts/`** and **run the agent independently against the Priya
   transcript** to confirm it holds up on an interview you didn't watch in the
   demo.

## Done when

A draft in `drafts/` has Problem, Approach, Outcome, and a verbatim Customer
Voice section; its fact-check gate reads SHIPS; the volunteered competitor
comparison is caught and cut (not silently shipped); no metric appears that the
transcript didn't state; and the customer's own quotes are untouched by the
brand-voice rewrite.

## Author TODO

- The provided `sa-customer-story-agent` reference in the solution writes drafts
  to `customer-stories/drafts/`, while this workspace's `CLAUDE.md` and the
  starter's empty `drafts/` folder use `drafts/`. Confirm which path the
  exercise should standardize on before publishing (these instructions assume
  `drafts/`).
