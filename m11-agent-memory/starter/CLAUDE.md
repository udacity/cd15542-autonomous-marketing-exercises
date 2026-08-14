# Solstice Active — Customer Story Agent Workspace

## What This Project Is
This workspace turns raw customer interview transcripts into structured,
brand-safe case-study drafts for Solstice Active. One agent
(`sa-customer-story-agent`) does the whole job: load the transcript, draft
the four-section case study, audit every claim, and escalate anything it
can't confidently ship.

## Ground Rules
- Never publish a claim that hasn't passed the Product Accuracy Skill —
  this applies to claims that came from the customer's own quoted words,
  not just claims the agent wrote itself.
- Drafting and auditing are two distinct passes over the copy, run in that
  order. Never let the same pass write a claim and grade it.
- Never invent a customer quote, a number, or a claim that was not present
  in the transcript. An unclear or missing outcome is left unclear, not
  filled in with a plausible-sounding guess.
- The "Customer Voice" section preserves the customer's actual wording
  (filler trimmed, meaning and phrasing intact). Every other section is
  written in Brand Voice.
- Anything the Product Accuracy audit marks BANNED, NEEDS CAVEAT, or
  UNVERIFIED must be escalated, not silently dropped or silently shipped.
  See "Escalation format" below.
- A human reviews every draft — including escalated ones — before it is
  treated as final. Escalation output should make that review fast, not
  replace it.

## Escalation Format
When a claim fails the Product Accuracy audit, the agent:
1. Keeps the rest of the draft intact — an escalated claim does not block
   the sections around it.
2. Flags the specific sentence inline, e.g. `[FLAGGED — BANNED: ...]`.
3. States the exact next action a human needs to take to resolve it (not
   a generic "needs review").

## Reference Files
- `.claude/skills/sa-brand-voice/SKILL.md` — Solstice Active's voice, tone,
  and banned language
- `.claude/skills/sa-product-accuracy/SKILL.md` — approved/banned/unverified
  claims tracker and verdict process
- `.claude/agents/sa-customer-story-agent.md` — the agent itself

## Workflow
1. Drop a raw transcript into `transcripts/raw/`.
2. Invoke `sa-customer-story-agent` against it.
3. The agent drafts the four-section case study in Brand Voice, then runs
   the Product Accuracy audit as a second pass.
4. Output lands in `drafts/`. Anything escalated is flagged inline with a
   specific follow-up action; everything else is ready for human sign-off.
