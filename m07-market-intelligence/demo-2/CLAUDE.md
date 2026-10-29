# Solstice Active — Market Intelligence Agent Workspace

## What This Project Is
This workspace runs the weekly competitive-intelligence sweep for
Solstice Active. One agent (`sa-market-intelligence-agent`) pulls from
three distinct source types — Web Search, News, and AI Citation Watch —
and turns them into a short, structured brief for the Marketing Lead.
The brief stays deliberately light: it is a decision tool, not a
research audit.

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
- A human reviews every brief before it is treated as final — this
  applies whether the brief came from a manual run or a scheduled one.
  Scheduling the sweep is not the same as scheduling the publish.

## Reference Files
- `.claude/skills/sa-brand-voice/SKILL.md` — Solstice Active's voice and
  tone (used if any brief content gets turned into customer-facing or
  Canva-designed copy downstream)
- `.claude/skills/sa-competitor-watch/SKILL.md` — tiered competitor set
  and scoping notes that steer all three source types
- `.claude/agents/sa-market-intelligence-agent.md` — the agent itself
- `briefs/sa-blank-competitor-list-template.md` — empty tier-structure
  template for a new competitor set

## Workflow
1. Confirm `.claude/skills/sa-competitor-watch/references/sa-competitor-list.md`
   is current before running a sweep — a brand left off the list never
   gets checked, in any source.
2. Invoke `sa-market-intelligence-agent` for a manual run, or let a
   scheduled routine trigger it.
3. The agent sweeps Web Search, News, and AI Citation Watch, applies the
   three-question filter, and drafts the four-section brief.
4. Output lands in `/briefs/[YYYY-MM-DD]-brief.md`.
5. A human reviews the brief before anything is treated as final or
   handed off (e.g. to Canva for a designed one-pager). This step does
   not go away once the sweep is scheduled.
