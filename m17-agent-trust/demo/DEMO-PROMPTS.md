# Module 17 Demo Prompts

The prompts used on camera, in order. Run them from this `demo/` folder in Claude Code.

## Demo 1: LLM-as-Judge with Deterministic Checks

**Run the check script and fix**
```
Run brg-check-script.js on test/brg-142-ashgrove-lane-planted-errors.md. Then have brg-listing-copy-writer fix exactly the failures it reports, save the fix in drafts/, and run the check script again on the fixed version.
```
Expected: 3 FAILs (numbers, disclosure, banned phrase), the fix saved in `drafts/`, then PASS on the rerun.

**Build the judge (plan mode, Shift+Tab)**
```
Create a subagent called brg-brand-judge. It scores listing copy from one to five on brand voice, clarity, and fit with the listing, plus one overall score. For each score, it quotes the line that supports it. It returns its scores as JSON. Read-only tools. Pin it to the model claude-opus-5-5, which is different from the writer's model.
```

**Calibrate**
```
Calibrate brg-brand-judge. Run it on each of the ten emails in calibration/brg-ten-listing-emails.md separately, in parallel: one judge per email, and each judge sees only its own email. Then put the judge's overall scores next to the human scores from calibration/brg-human-scores.md in one table, and flag any email where they differ by more than one point.
```

**Length rubric line**
```
Add a line to brg-brand-judge's rubric: don't reward length on its own. Longer copy earns a higher score only when the extra length gives the reader information they need. Then rerun the calibration on emails D and H only.
```

**Below-3 escalation rule.** Typed directly into `CLAUDE.md` as workflow step 4:
```
4. Anything the judge scores below 3 overall goes to a person. Add it to results/review-sheet.md with the judge's quotes. It's never published automatically.
```

## Demo 2: Adding a Fallback

First, add `- safe neighborhood` and `- exclusive community` under "Banned phrases" in `brand/brg-brand-bible.md`.

**Build the backup judge and failover rule (plan mode)**
```
Create a subagent called brg-brand-judge-backup. Copy brg-brand-judge's rubric and output exactly, but pin it to claude-haiku-4-5-20251001. Then add a rule to CLAUDE.md: if brg-brand-judge fails because its model is unavailable or retired, score the copy with brg-brand-judge-backup instead, and record which judge scored each listing in results/results-log.md, marking anything the backup scored for a spot-check.
```

**Calibrate the backup**
```
Calibrate brg-brand-judge-backup the same way: one judge per email in calibration/brg-ten-listing-emails.md, in parallel, each seeing only its own email. Put its overall scores next to the human scores and flag any email where they differ by more than one point.
```
The recorded result is in `results/backup-judge-calibration.md`.

**Bulk re-check setup (plan mode)**
```
Update the bulk re-check in CLAUDE.md. Work through active-listings.md in order, in batches of ten, running the listings in each batch in parallel. For each listing, run brg-check-script.js on its live copy. If it fails, the writer revises it once into revised/, the check script runs again, and copy that passes goes to the judge. Record each finished listing in results/checkpoint.json, and at the start of every run, skip listings already recorded there. If a batch hits a rate-limit error, wait a minute and retry it, up to three times. If it still fails, write the unfinished listings to results/needs-attention.md and stop.
```

**Run the recheck**
```
Run the bulk re-check.
```
Let batch 1 finish, then press Esc. Then:
```
Run the bulk re-check again.
```
Expected: the restart begins at listing 11. In the recorded run, all five revised listings passed, so `results/needs-attention.md` was never created.
