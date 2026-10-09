# Module 13 Demo Prompts

The prompts and edits used on camera, in order. Run them from this `demo/` folder in Claude Code.

## Demo 1: Building the Auditor

**P1: Build the auditor (plan mode, Shift+Tab)**
```
Create a subagent called brg-brand-auditor. It only reviews marketing content. Before it audits anything, it loads the brg-brand-voice and brg-fair-housing-accuracy skills. It can read files and invoke skills, but never write or edit them. Every finding must cite the skill and the rule it's based on. Ask me any questions before you build it.
```

**P2: Answer to the clarifying question**
```
Flag it as unverified and leave the decision to a person. Don't fill the gap with general knowledge about real estate. Use the opus model.
```

**P3: Audit the test email**
```
Use the brg-brand-auditor to audit test-content/brg-test-email.md.
```
Expected: 2 blockers. "3 full baths" (brg-fair-housing-accuracy rule 1; the sheet says 2.5) and "empty nesters" (brg-brand-voice rule 2).

## Demo 2: Auditing the Cross-Channel Listing Batch

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

**Review file naming rule.** The dated naming rule (`review/brg-review-sheet-YYYYMMDD.md`, with `-HHMM` added if a sheet for that date already exists) is workflow step 5 in `CLAUDE.md`. The sheets in `review/` are the ones produced during recording.
