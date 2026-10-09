# Module 13 Demo 2: Auditing the Cross-Channel Listing Batch

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The auditor built in Demo 1 is already in `.claude/agents/`. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P4: Audit the batch by channel (fresh session, normal mode)**
```
Use the brg-brand-auditor to audit every file in content-batch-demo2, and group the findings by channel.
```

**T1: Fix the writer.** In `.claude/agents/brg-listing-writer.md`, replace the paid ads and short-form video line with:
```
- **Paid ads and short-form video:** State facts from the listing sheet only. Never predict value, appreciation, or sale timing.
```

**T2: Approved language.** Add to `listings/brg-142-ashgrove-lane.md`:
```
## Approved language for this listing
- "move-in ready" — no outstanding repairs, confirmed by Dana Ferris 9/10/2026.
```

**T3: Accuracy skill rule 2.** Replace rule 2 in `.claude/skills/brg-fair-housing-accuracy/SKILL.md` with:
```
2. **Condition claims need a listing-specific approval.** A condition phrase — "move-in ready," "turnkey," "no repairs needed" — is supported only if it appears in the listing sheet's "Approved language for this listing" section. Approval is per listing, never global: the same phrase on a listing without that approval is still flagged as unverified. Severity: warning.
```

**P5: Re-audit the listing page**
```
Use the brg-brand-auditor to audit content-batch-demo2/brg-listing-page.md again.
```

**P6: Write the review sheet**
```
Write review/brg-review-sheet.md with one row per asset in content-batch-demo2: asset, channel, result, cited rule. Note the pattern across channels and the listing-page fix.
```

The review sheet is saved with a dated name (`review/brg-review-sheet-YYYYMMDD.md`), following workflow step 5 in `CLAUDE.md`.
