---
name: sa-product-accuracy
description: Fact-checks Solstice Active copy against the approved/banned claims tracker before it ships. Use whenever Solstice copy makes a factual, performance, comparative, or durability claim — fabric performance (moisture-wicking, compression, stretch), competitor comparisons, recovery/health effects, sizing/fit claims — in case studies, ads, social captions, web, or customer-service replies. Run before publishing, in addition to sa-brand-voice. This skill governs whether a claim is substantiated; brand-voice governs how it is phrased. Applies to claims regardless of source, including a customer's own quoted words in an interview transcript.
---

# Solstice Active — product accuracy

A claim is either **approved**, **banned**, or **unverified** — there is no fourth category called "sounds fine." Plausibility is never a reason to approve. This is the safety net that runs before copy ships: it checks every factual and comparative claim against the tracker, so nothing goes out that Solstice can't back up.

## What this skill does, and its boundary with brand-voice

This skill answers one question about each claim: **is it substantiated?** — meaning it matches an approved row in the tracker, stays within that row's limits, and carries its required caveat.

It is the factual counterpart to `[[sa-brand-voice]]`, which governs *how* copy is phrased. When copy is going out, **run both.** A line can be perfectly on-voice and still make an unsubstantiated claim, and vice versa.

## The tracker is the only authority

At the start of every review, read `references/sa-claims-tracker.md`. That file is the source of truth for what is approved, banned, or unverified. It changes over time.

- **Never approve a claim from memory, or from the examples in this file.**
- Applies to **every** claim in the copy, including claims that came directly from a customer's own quoted words in an interview. A customer saying something enthusiastic and specific does not make it substantiated — the source of a claim doesn't change whether Solstice can prove it.

## Process — check the copy step by step

1. **Extract every claim.** Read the copy and list each factual or comparative assertion separately — fabric performance, fit/sizing, competitor comparisons, recovery/health effects. Quote each one exactly. If a sentence bundles two claims, split them.

2. **Match against the Approved list by meaning, not wording.** Copy paraphrases; the tracker won't contain the exact sentence.

3. **Check for banned wording first — this is the centerpiece check.** Solstice has never run a substantiated head-to-head comparison against any named competitor. Any claim that names a competitor and compares Solstice favorably against them — "better than [Competitor]," "outperforms [Competitor]," "unlike [Competitor], this actually..." — is **BANNED outright**, regardless of how the customer phrased it, how enthusiastic it sounds, or how plausible the comparison seems. There is no version of a named-competitor comparison that is currently approvable.

4. **Check for upgrades / overreach.** An approved claim pushed past its stated limit becomes a violation — e.g., "moisture-wicking" upgraded to "keeps you completely dry" or "supports recovery" upgraded to "cures muscle soreness."

5. **Check required caveats.** Some approvals are conditional — see the tracker's Limits column.

6. **Anything unmatched → UNVERIFIED (hard block).** If a claim matches no approved row, it cannot ship, regardless of how reasonable it sounds. Emit the exact tracker row that would need to be added.

7. **Confirm every ban carries its reason.** Each BANNED finding must cite the reason on file from the tracker.

## Verdict for each claim

Assign exactly one:

- **APPROVED** — matches an approved row, within limits, caveat present (or none required).
- **APPROVED — WITH REQUIRED CAVEAT** — approved only once the missing caveat is added; state which.
- **NEEDS CAVEAT** — same as above when the caveat is simply absent from the copy.
- **UPGRADE/OVERREACH** — based on an approved claim but pushed past its limit; state the limit.
- **BANNED** — matches a banned row (most commonly: a named-competitor comparison); cite the reason on file. Give the in-voice, non-comparative replacement.
- **UNVERIFIED — cannot ship** — on neither list; emit the tracker row that would need to be added.

## Output format

Return a per-claim table:

| Quoted claim | Verdict | Tracker row / proof source | Required fix |
|--------------|---------|----------------------------|--------------|

Then a one-line gate: **SHIPS** (all claims approved) or **DOES NOT SHIP — escalate**, followed by the list of blockers.

## Do not invent proof

Never fabricate a proof source, a test result, or a comparison to make a claim passable. An unknown specific is UNVERIFIED, not a guess. A competitor comparison is BANNED regardless of how it's sourced, since Solstice has no approved comparative-testing claim in the tracker at all.

## Known gaps to watch (blind spots)

- **Named-competitor comparisons show up unprompted in customer interviews far more than in written copy.** A customer volunteering "it's way better than [Competitor]" as an offhand compliment is common — treat it exactly like any other banned claim, not as a special case because it's "just their opinion."
- **Recovery/performance claims are time- and person-specific.** A single customer's outcome ("cut my recovery time") is an anecdote, not a substantiated brand claim, unless the tracker has an approved row for it.
- **Approved ≠ unconditional.** Several approvals only hold with their caveat. A bare version of an approved claim is not automatically shippable.
