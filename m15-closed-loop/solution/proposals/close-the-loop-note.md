# Close-the-Loop Note: Round 1 vs Round 2 (204 Willowmere Court)

Source: `query_memory`, cross-checked against `dashboard/memory/campaign-memory.json`. Date: 2026-10-05.

## Short answer

Round two looks better on average, but that doesn't count as evidence yet. Round two is one variant with 4 conversions. It is not enough to call a result.

## The numbers

| | Round 1 (5 valid variants) | Round 2 (1 variant: v_7f691c4d, low-hoa) |
|---|---|---|
| Pulls per variant | 4 | 2 |
| Impressions | 11,993 | 960 |
| Clicks | 322 | 35 |
| Conversions | 22 | 4 |
| Spend | $822.04 | $89.83 |
| CTR (pooled) | 2.69% | 3.65% |
| CPA (pooled) | $37.37 | $22.46 |

The closest like-for-like comparison is the round-1 low-hoa variant (v_78931fb8): CTR 3.32%, CPA $25.76, 9 conversions. Round two edges it on both, by 0.33 points of CTR and about $3.30 of CPA. That gap is well inside the noise at this volume.

## How much data sits behind it

- Round two: 960 impressions, 35 clicks, 4 conversions, $89.83 spend, across 2 pulls. Single-digit conversions, and the 10+ conversion threshold set in round 2 is not met.
- Round one: 22 conversions across 5 variants, with 0 to 9 per variant. Only low-hoa is near the threshold (9).
- "Better on average" here compares a 1-variant round to a 5-variant round. A single creative is one draw, not an average.

## Data-quality caveats

- `v_test_zerospend` (2 conversions, $0 spend) is excluded from both rounds as a tracking error, per the person's round-2 decision. `query_memory`'s by-tag rollup still counts it (open-house shows `variant_count: 2`), so its open-house averages are contaminated. The figures above are computed from per-variant rows, not the rollup.
- Round two is a second creative for an existing tag (low-hoa). It tests whether the lead belongs to the angle or to one specific variant. Its direction matches round 1, which is encouraging but not confirmation. The low-hoa lesson stays at low confidence, and the two creatives are not pooled in the memory lesson.
- The round-2 open-house + HOA combined creative proposed in `round-2-proposal.md` has no launched row in memory, so it is not part of this comparison.

## What this supports

- Keep collecting on low-hoa. A confidence upgrade to medium is plausible at the next pull if CPA holds. It is not warranted today.
- No scale, pause, or rebudget call on this data. Any such change needs a person's approval, with the memory entry cited, and any new creative still goes through the auditor first.
