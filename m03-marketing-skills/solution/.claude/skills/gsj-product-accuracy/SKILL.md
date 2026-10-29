---
name: gsj-product-accuracy
description: Fact-checks Groundswell (GSJ) product and marketing copy against the approved/banned claims tracker before it ships. Use whenever GSJ copy makes a factual, health, sourcing, sustainability, packaging/compostability, or community-impact claim — health effects of ingredients (tart cherry, beet, ginger, turmeric), "clinically proven" or "guaranteed"-style wording, compostable/recyclable/eco/sustainable claims, city counts or pounds-diverted figures, farm-sourcing claims, or competitor comparisons — in emails, social captions, packaging, web, ads, or customer-service replies. Run before publishing, in addition to gsj-brand-voice. This skill governs whether a claim is substantiated; brand-voice governs how it is phrased.
---

# Groundswell Juice Co. — product accuracy

Groundswell copy has shipped unsupported claims before — the "clinically proven" line in the cup
email that legal flagged. This skill is the safety net that runs before copy goes out: it checks
every factual claim against the claims tracker, so nothing ships that the brand can't back up.

The rule that makes this work: **a claim is either on the approved list, on the banned list, or
unverified. There is no fourth category called "sounds fine."** Plausibility is never a reason to
approve. If a claim isn't in the tracker, it is blocked until someone adds it with a proof source.

## What this skill does, and its boundary with brand-voice

This skill answers one question about each claim: **is it substantiated?** — meaning it matches an
approved row in the tracker, stays within that row's limits, and carries its required caveat.

It is the factual counterpart to `[[gsj-brand-voice]]`, which governs *how* copy is phrased (tone,
register, banned hype words, punctuation). The two overlap on a few terms — "clinically proven,"
"eco-friendly," "detox" are called out in both — but they judge different things: brand-voice asks
*does this sound like Groundswell*, this skill asks *can we prove it*. When copy is going out,
**run both.** A line can be perfectly on-voice and still make an unverified claim, and vice versa.

## The tracker is the only authority

At the **start of every review, read `references/gsj-claims-tracker.md`.** That file (a mirror of
the marketing/legal-owned `gsj-claims-tracker.xlsx`) is the source of truth for what is approved and
what is banned. It changes over time.

- **Never approve a claim from memory, or from the examples in this file.** The examples below are
  illustrations of the *process*, not a substitute for reading the current tracker.
- Use `references/gsj-product-facts.pdf` only as supporting evidence for *why* a tracker row is
  approved (formulation, sourcing, packaging, community facts). It is **not** an independent approval
  source — a fact appearing there does not make a claim shippable unless the tracker approves it.

## Process — check the copy step by step

Work through every claim in the copy in this order.

1. **Extract every claim.** Read the copy and list each factual assertion separately — ingredient/
   health effects, sourcing, sustainability and packaging (compostable/recyclable), community-impact
   figures (pounds, cities, events), and any competitor comparison. Quote each one exactly. If a
   sentence bundles two claims, split them.

2. **Match against the Approved list by meaning, not wording.** Copy paraphrases; the tracker won't
   contain the exact sentence. Match on intent. "Beets help your blood flow" maps to A2.

3. **Check for banned wording.** Scan for the banned terms and close variants (B1–B5): "clinically
   proven," unqualified "eco-friendly"/"100% sustainable," "detox"/"cleanse," "guaranteed," "all
   cities compost." If matched → **BANNED**, and cite the reason on file from the tracker (see the
   next section — every ban must carry its reason).

4. **Check for upgrades / overreach.** An approved claim pushed past its stated limit becomes a
   violation. Use the tracker's "Limits" column: A1 "supports recovery" upgraded to "cures soreness"
   or "clinically proven" → violation; A5 "compostable in 47 of 55 cities" inflated to "compostable
   everywhere" or "most cities" → violation. Flag as **UPGRADE/OVERREACH** with the limit it broke.

5. **Check required caveats.** Some approvals are conditional, not standalone:
   - A6 recycling claim must be **paired with the compost-coverage caveat** (47 of 55).
   - A5 composting must **state the specific number**, never "most"/"all."
   - A4 sourcing must **name the farm and location** (Traverse City family farm).
   - A7's ~900 lbs figure is **Riverside-only** — do not apply it to any other city.
   A claim missing its required caveat is **NEEDS CAVEAT**, not approved as written.

6. **Anything unmatched → UNVERIFIED (hard block).** If a claim matches no approved row, it **cannot
   ship** — regardless of how reasonable it sounds. Do not approve because it "seems fine" or "is
   probably true." Emit the exact tracker row that would need to be added: the claim, and what proof
   source would be required to approve it. Approving it is the job of marketing/legal updating the
   tracker, not of this review.

7. **Confirm every ban carries its reason.** Each BANNED finding must cite the reason-on-file from
   the tracker. If you believe a claim should be banned but no reason is recorded in the tracker,
   **flag the tracker as incomplete** rather than asserting the ban unsupported — the requirement is
   symmetric: no ban without a reason, no approval without a proof source.

## Verdict for each claim

Assign exactly one:

- **APPROVED** — matches an approved row, within limits, caveat present (or none required).
- **APPROVED — WITH REQUIRED CAVEAT** — approved only once the missing caveat is added; state which.
- **NEEDS CAVEAT** — same as above when the caveat is simply absent from the copy.
- **UPGRADE/OVERREACH** — based on an approved claim but pushed past its limit; state the limit.
- **BANNED** — matches a banned row; cite the reason on file. Give the in-voice replacement.
- **UNVERIFIED — cannot ship** — on neither list; emit the tracker row that would need to be added.

## Output format

Return a per-claim table:

| Quoted claim | Verdict | Tracker row / proof source | Required fix |
|--------------|---------|----------------------------|--------------|

Then a one-line gate: **SHIPS** (all claims approved) or **DOES NOT SHIP**, followed by the list of
blockers (every BANNED, UPGRADE/OVERREACH, NEEDS CAVEAT, and UNVERIFIED item).

## Do not invent proof

Never fabricate a proof source, a number, a farm, or a city count to make a claim passable. This
mirrors the brand-voice invented-fact rule: a fabricated specific is worse than an honest gap,
because the brand's credibility rests on its specifics being real. An unknown specific is
**UNVERIFIED**, not a guess.

## Known gaps to watch (blind spots)

- **Golden Hour has no tracker rows.** Any health claim about it (turmeric, mango, pineapple) is
  automatically UNVERIFIED until marketing adds approved rows. This will recur — flag it every time
  rather than reasoning from general knowledge about turmeric.
- **Facts are time-bound.** "47 of 55 cities, as of this spring" and "~900 lbs last year" drift. If
  copy restates a figure, confirm it against the current tracker/product-facts dates; a number that
  was right last quarter can be stale now.
- **Location generalization.** Riverside's partner (Riverside Conservation Group) and its figure are
  city-specific. Do not let copy apply either to another location — confirm per city.
- **Approved ≠ unconditional.** Several approvals only hold with their caveat (steps 4–5). A bare
  version of an approved claim is not automatically shippable.
