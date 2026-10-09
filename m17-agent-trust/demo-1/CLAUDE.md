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

## Bulk re-check
When a rule changes, re-check the live copy of every listing in `active-listings.md`. Send all of them through the check script, the writer, and the judge at once.
