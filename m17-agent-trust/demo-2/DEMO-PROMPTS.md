# Module 17 Demo 2: Adding a Fallback

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The `brg-brand-judge` subagent, its length rule, and the below-3 rule from Demo 1 are already in place. To start over, run `git checkout -- . && git clean -fd` from this folder.

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
