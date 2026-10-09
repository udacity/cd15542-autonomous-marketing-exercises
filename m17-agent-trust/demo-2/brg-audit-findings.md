# Audit Findings — Listing-Copy Workflow

A review of the last month of runs, by dimension of trust. The workflow runs in two ways:

- **Routine runs:** whenever listings are added or changed (new listing, price change, open house added), the workflow drafts and checks copy for just those listings. Usually a handful at a time, with nobody watching.
- **Bulk re-checks:** whenever a rule changes, every active listing's live copy is re-checked against the new rule. There are 30 active listings right now (`active-listings.md`).

## Quality: passed
The check script caught every planted fact error in spot tests. The judge's scores stayed within one point of the human calibration set.

## Compliance: passed
No banned phrases or missing disclosures were found in published copy.

## Stability: two findings

**Finding 1. The judge is pinned to one exact model version, and nothing handles its retirement.**
Pinning keeps the judge's scoring steady, and the calibration depends on that. But every pinned model version is retired on a schedule the provider publishes. When this one is retired, every call to the judge fails, and copy stops moving with nobody notified until someone checks.
*Action:* look up this model's retirement date on the provider's model deprecations page and put it on the team calendar. Add a backup judge on a different model, and calibrate it before trusting it.

**Finding 2. Bulk re-checks send all 30 listings at once, and both of them hit a rate limit.**
Both bulk re-checks this quarter sent every listing to the writer and judge at the same moment. Both hit the provider's rate limit partway through and stopped. Neither run had a record of what had finished, so both were restarted from the beginning, and four listings were processed twice.
*Action:* check the provider's documented rate limit, then process listings in batches with room to spare. Retry a batch that hits the limit, record each finished listing so a restart picks up where it stopped, and send anything that still fails to a person.

## Coming up
Bellwood's compliance lead added two phrases to the banned list this week: "safe neighborhood" and "exclusive community." That means another bulk re-check of all 30 listings. Fix both stability findings before running it.
