---
name: sa-competitor-watch
description: Provides the tiered competitor set and scoping notes that steer Solstice Active's market-intelligence sweeps. Use whenever running or configuring the weekly competitive-intelligence brief, or deciding whether a brand/move belongs in the Web Search, News, or AI Citation Watch sweep.
---

# Solstice Active — competitor watch

This Skill is read before any sweep runs. It answers two questions: which
brands does the agent track, and how much weight does a move from each
one carry. `references/sa-competitor-list.md` is the actual list; this
file is the method.

## Why tier before you search, not after

Deciding the tier boundaries up front is a triage habit, not a detail to
fix later. If the agent searched everything with equal weight, it would
spend the same drafting effort on a Tier 3 brand's minor press mention as
a Tier 1 brand's product launch. Tiering first means the brief's
structure — not just its search — already reflects what actually matters
to Solstice's position.

**Rule: a Tier 1 move outranks a Tier 3 move, even a bigger one.** A
Tier 1 competitor's small pricing tweak is more relevant to Solstice than
a Tier 3 giant's major campaign, because Tier 1 is who Solstice's
customer is actually choosing between. When two findings compete for
space in the brief, tier wins over headline size.

## How the tiers apply across all three source types

Every one of the three source types in
`.claude/agents/sa-market-intelligence-agent.md` (Web Search, News, AI
Citation Watch) reads the same list. A brand left off the list here
never gets checked in any source — this is the single steering
document for the whole sweep.

- **Web Search / News:** search each brand by name, and by parent
  company where one exists — a lot of real news (pricing, ownership,
  distribution) breaks at the parent level.
- **AI Citation Watch:** when checking which brands an AI assistant
  cites for a category question, cross-reference the answer against
  this same tiered list — a Tier 1 brand gaining or losing a citation
  matters more than a Tier 3 brand's citation status.

## Scope

In scope: athleisure and performance-apparel brands sold at a comparable
price point and channel to Solstice (DTC + select retail). Out of scope
unless a brand crosses into that comparable price/channel position (see
scoping notes in the list file for current judgment calls).

See `references/sa-competitor-list.md` for the current tiered set.
