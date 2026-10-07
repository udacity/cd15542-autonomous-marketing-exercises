# Production Notes — Influencer Scout Trial Run

`brg-influencer-scout` has never been wrapped in a check, a judge, or a fallback. The marketing team noticed two problems while trialing it on last campaign's list, before any framework existed around it.

1. **The scout is pinned to one model version, and nothing handles its retirement.** The scout's frontmatter names one exact model version. Every pinned version is retired on a schedule the provider publishes. When this one is, every research call fails and the campaign's list goes nowhere. Look up the date on the provider's model deprecations page and put it on the team calendar.
2. **Running the whole list at once hit a rate limit twice.** The trial sent all 20 candidates to the scout at the same moment. Both times it hit the provider's rate limit partway through. There was no retry and no record of which candidates had finished, so the trial was restarted from the beginning both times.

**Action needed before the next campaign:** add a backup for the retirement risk, and add batching, retries, and a checkpoint for the rate-limit risk.
