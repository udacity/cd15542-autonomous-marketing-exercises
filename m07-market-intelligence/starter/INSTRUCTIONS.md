# Build Your Own Competitive Intelligence Agent

## Goal

Build the competitive-intelligence agents Solstice Active runs against its
tracked competitor set. You'll author a **weekly** market-intelligence agent
that sweeps three distinct source types into a short, decision-ready brief,
then — with less hand-holding — a **daily** crisis-alert agent that catches
sudden bad news before the weekly brief would. You're building the agents; the
skills and the competitor list are already provided.

You'll build two agents, with decreasing hand-holding:

1. **`sa-market-intelligence-agent`** — the weekly brief. You watched this one
   get set up in the demo. Build your own version now.
2. **`sa-competitor-crisis-alert`** — the daily bad-news watch. Build this one
   **independently** once the weekly agent works. Same competitor list, a
   narrower job.

## What you're given

- **`.claude/skills/sa-competitor-watch/`** — the skill both agents read before
  any sweep. `SKILL.md` explains the tiering method; `references/sa-competitor-list.md`
  is the actual tiered competitor set for Solstice (Tier 1–3, already filled in).
  A brand left off this list never gets checked, in any source.
- **`.claude/skills/sa-brand-voice/`** — Solstice's voice and tone, used only if
  a brief or alert finding later gets turned into customer-facing copy.
- **`briefs/`** — where each weekly brief is written (`[YYYY-MM-DD]-brief.md`).
  Contains `sa-blank-competitor-list-template.md`, an empty tier template if you
  ever stand up a competitor set for a different brand.
- **`alerts/`** — where each daily crisis alert is written (`[YYYY-MM-DD]-alert.md`).
- **`CLAUDE.md`** — the workspace's ground rules: three genuinely different
  queries per source, source + date on everything that ships, tier before you
  search, no fabricated findings, and which agent goes through human review.

You are **not** given the two agent files — writing them is the exercise.

## Prerequisites

- Claude Code with sub-agent support (a `.claude/agents/` folder).
- Anthropic's built-in `web_search` and `web_fetch` tools. No MCP connector is
  needed for this exercise.

## Steps

1. **Start in plan mode.** Describe the weekly agent to Claude before any file
   is written: sweep three sources (general Web Search, News, AI Citation Watch)
   against the provided competitor list, and produce a four-section brief —
   Competitor Moves, Category Trends, AI Citation Watch, Recommended Action.
   Review the plan before approving.
2. **Author `.claude/agents/sa-market-intelligence-agent.md`.** Give it YAML
   frontmatter (`name`, `description`, `tools:` limited to `web_search`/`web_fetch`,
   and a `model`), then a body that: reads the competitor-watch skill first;
   runs each source type with its **own** query pattern (a relabeled repeat of
   one search is not three sources); applies a new / relevant / actionable
   filter to every finding; weights Tier 1 above Tier 3 even for a bigger
   headline; and writes the brief to `briefs/[YYYY-MM-DD]-brief.md`. Require a
   real source and date on every item that ships, and a human-review gate before
   the brief is final.
3. **Test small before the full run.** Fire only the seeded queries for each
   source type on a handful of brands and confirm each source returns
   *different* results — don't draft a full brief yet. Save any test run to a
   `-test-[source]` filename so it never overwrites a real brief.
4. **Run the full weekly brief** and open the file in `briefs/`. Confirm all
   four sections are present, each shipped item carries source + date, and the
   close has a single aggregate "filtered this week" line, not a per-item log.
5. **Build the daily crisis alert independently.** Author
   `.claude/agents/sa-competitor-crisis-alert.md`: same competitor list, one
   recency-scoped news source, **tier-scaled thresholds** (Tier 1 alerts on 2+
   negative items in 24h, Tier 2 on 3+, Tier 3 only on a single severe event),
   and it **always writes a file** — even "All clear" — so a missing file never
   reads as "nothing happened." Unlike the weekly brief, it has no review gate.
6. **(Optional) Schedule it.** Once a manual run looks right, wire either agent
   to a recurring routine with `/schedule`. Scheduling automates the sweep and
   the file write; it does not remove the weekly brief's human-review gate.

## Done when

- `.claude/agents/sa-market-intelligence-agent.md` produces a four-section brief
  in `briefs/`, every shipped finding carries a real source and date, Tier 1
  leads over Tier 3, and nothing is fabricated.
- `.claude/agents/sa-competitor-crisis-alert.md` writes an alert file every run
  (even on a quiet day) and applies the tier-scaled thresholds rather than one
  bar for every brand.
