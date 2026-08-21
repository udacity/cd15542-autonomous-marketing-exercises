# Solstice Active — Market Intelligence Agent Workspace

## What This Project Is
This workspace runs two competitive-intelligence agents for Solstice
Active, at two different cadences:

- **`sa-market-intelligence-agent`** — weekly, broad. Pulls from three
  distinct source types (Web Search, News, AI Citation Watch) and turns
  them into a short, decision-ready brief for the Marketing Lead. Human-
  reviewed before anything is treated as final.
- **`sa-competitor-crisis-alert`** — daily, narrow. Checks only for
  sudden bad news or a press-volume spike about a tracked competitor, so
  the Marketing Lead isn't finding out about it a week late from the
  weekly brief. No human-review gate — it's a raw internal heads-up, not
  published or customer-facing content.

Both agents read the **same** tiered competitor list — there is only
one list to keep current, not one per agent.

## Ground Rules
- Every source type gets its own genuinely different query. Running the
  same search phrase three times under three headings is not a
  multi-source sweep — see each source's query pattern in
  `.claude/agents/sa-market-intelligence-agent.md`.
- Source + date is required on anything that actually ships in the
  brief. This discipline never relaxes, regardless of how the brief's
  format simplifies elsewhere.
- The brief does **not** require an itemized log of every filtered-out
  item. Signal-vs-noise is a judgment habit applied before drafting, not
  an audit trail included in the output. The brief closes with one
  aggregate line on what got filtered and roughly why — not a per-item
  list.
- A lighter format is not a looser standard: nothing gets included
  because it "sounds plausible." If a viewer or reviewer asks "why
  isn't X in here," there must be a real, statable reason (fails new /
  relevant / actionable), even though that reason isn't printed in the
  brief itself.
- Tier the competitor list before running any search, not after. A
  Tier 1 competitor's move outranks a Tier 3 competitor's bigger one in
  how the brief is structured — see
  `.claude/skills/sa-competitor-watch/SKILL.md`.
- Never fabricate a finding, a citation, or a source. Every item that
  ships carries a real source and date; an AI Citation Watch finding
  carries the exact question asked, the date, and a captured snippet of
  the answer in place of a URL.
- A human reviews every weekly brief before it is treated as final —
  this applies whether the brief came from a manual run or a scheduled
  one. Scheduling the sweep is not the same as scheduling the publish.
  The daily crisis alert is the one exception to this rule — see below.
- The daily crisis alert (`sa-competitor-crisis-alert`) applies
  **tier-scaled thresholds**, not one bar for every brand: Tier 1 alerts
  on 2+ new negative items in 24h, Tier 2 on 3+, Tier 3 only on a single
  severe event (lawsuit, breach, recall, major leadership/ownership
  shakeup) — volume alone never triggers a Tier 3 entry. It always
  writes a file, even on a quiet day ("All clear"), so a missing file is
  never mistaken for "nothing happened." It does **not** go through the
  human-review gate above — it's a raw internal signal, not published
  content — see `.claude/agents/sa-competitor-crisis-alert.md`.

## Reference Files
- `.claude/skills/sa-brand-voice/SKILL.md` — Solstice Active's voice and
  tone (used if any brief or alert content gets turned into customer-
  facing or Canva-designed copy downstream)
- `.claude/skills/sa-competitor-watch/SKILL.md` — tiered competitor set
  and scoping notes that steer both agents
- `.claude/agents/sa-market-intelligence-agent.md` — the weekly brief
  agent
- `.claude/agents/sa-competitor-crisis-alert.md` — the daily crisis-
  alert agent
- `briefs/sa-blank-competitor-list-template.md` — empty tier-structure
  template for a new competitor set

## Workflow
1. Confirm `.claude/skills/sa-competitor-watch/references/sa-competitor-list.md`
   is current before running either agent — a brand left off the list
   never gets checked, in any source, by either agent.
2. **Weekly brief**: invoke `sa-market-intelligence-agent` for a manual
   run, or let a scheduled routine trigger it. It sweeps Web Search,
   News, and AI Citation Watch, applies the three-question filter, and
   drafts the four-section brief to `/briefs/[YYYY-MM-DD]-brief.md`. A
   human reviews it before anything is treated as final or handed off
   (e.g. to Canva for a designed one-pager). This step does not go away
   once the sweep is scheduled.
3. **Daily crisis alert**: invoke `sa-competitor-crisis-alert` for a
   manual run, or let a scheduled routine trigger it. It checks recent
   news per tracked brand, applies tier-scaled thresholds, and writes
   `/alerts/[YYYY-MM-DD]-alert.md` — always, whether or not anything
   qualifies. No review gate before the file lands; if something in it
   turns into customer-facing action, that downstream output still goes
   through normal drafting, including `sa-brand-voice`.
