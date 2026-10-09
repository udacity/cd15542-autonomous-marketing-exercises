# Bellwood Realty Group — Listing-Copy Workflow

This project drafts and checks listing copy for Bellwood Realty Group. It runs whenever listings are added or changed, and as a bulk re-check of every active listing whenever a rule changes.

## Facts
- Company: Bellwood Realty Group.
- Active listings: `active-listings.md`. Each listing's facts are in `listings/`, and its current approved email is in `live-copy/`.
- Brand rules, banned phrases, and the required disclosure: `brand/brg-brand-bible.md`.
- Calibration set: `calibration/brg-ten-listing-emails.md` and `calibration/brg-human-scores.md`.

## Workflow order (do not change)
1. `brg-listing-copy-writer` drafts the copy.
2. Run `node brg-check-script.js <copy-file>` on the draft. Only copy that passes moves to step 3. If it fails, give the writer the exact failures. The writer fixes them once, then the check script runs again.
3. Copy that passes the check script is scored by the `brg-brand-judge` subagent.
4. Anything the judge scores below 3 overall goes to a person. Add it to results/review-sheet.md with the judge's quotes. It's never published automatically.

## Judge fallback
If `brg-brand-judge` fails because its model is unavailable or retired, score the copy with `brg-brand-judge-backup` instead. Don't use the backup for any other failure.
- Record which judge scored each listing in results/results-log.md.
- Mark every listing the backup scored "SPOT-CHECK" in that log, so a person reviews its scores.
- The below-3 rule in step 4 applies to the backup's scores the same way.

## Bulk re-check
1. At the start of every run, read `results/checkpoint.json` and skip any listing already recorded there.
2. Work through `active-listings.md` in order, in batches of 10. Run the listings in a batch in parallel.
3. For each listing, run `node brg-check-script.js live-copy/<listing>.md`.
   - Pass: record "no change needed."
   - Fail: the writer revises it once and saves the revision in `revised/`. Run the check script on the revision. If it passes, it goes to the judge. If it still fails, add it to `results/needs-attention.md` with the failures.
4. As soon as a listing is finished, add it to `results/checkpoint.json` and `results/results-log.md`.
5. If a batch hits a rate-limit error, wait one minute and retry that batch, up to three times. If it still fails, add the batch's unfinished listings to `results/needs-attention.md` and stop the run.
