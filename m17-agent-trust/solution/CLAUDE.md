# Bellwood Realty Group — Creator Outreach

This project researches candidate creators for Bellwood's open-house campaigns and drafts outreach emails. It runs once per campaign, across that campaign's whole candidate list.

## Facts
- Company: Bellwood Realty Group.
- Campaign requirements: `brg-campaign-brief.md`. Known production risks: `brg-production-notes.md`.
- This campaign's candidates: `candidates/brg-candidate-list.md`, with one saved profile snapshot per creator in `candidates/`.
- `brg-influencer-scout` saves its research and draft email for each creator in `research/<handle>.json`.
- Check a research file with `node brg-check-script.js research/<handle>.json`.
- Calibration set: `calibration/brg-candidate-profiles.md` and `calibration/brg-candidate-scores.md`.

## Workflow order
Run these steps in order for each creator on the candidate list:

1. **Research and draft.** `brg-influencer-scout` researches the creator and drafts the outreach email, saving both to `research/<handle>.json`.
2. **Check.** Run `node brg-check-script.js research/<handle>.json`. Only research that passes moves on. If the only failure is the follower range, record the creator as out of range and stop there. If any other check fails, follow the quality fallback below.
3. **Score.** `brg-campaign-fit-judge` scores fit and personalization. If the personalization score is below 3, also follow the quality fallback below.
4. **Approve.** A person approves every send. Nothing is emailed automatically.

## Stability fallback
- If `brg-influencer-scout` or `brg-campaign-fit-judge` fails because its model is unavailable or retired, rerun that step once with `brg-influencer-scout-backup` or `brg-campaign-fit-judge-backup`. Both are pinned to `claude-sonnet-5-5` and copy the original's instructions.
- Use the backup only for model-unavailable or retired errors. Other failures, such as bad output or a failed check, don't switch agents.
- Record which agent ran, original or backup, in `results/results-log.md`: one line per creator and step, with the handle, step, agent used, and outcome.

## Quality fallback
- **Failed check.** If the check fails for any reason other than the follower range, have `brg-influencer-scout` research that creator once more (overwriting `research/<handle>.json`), then run the check again. Only one re-research per creator. If the only failure is the follower range, don't retry. Record `out_of_range` as usual.
- **Still failing.** If the second check still fails, including when the follower range fails together with another check, don't score the creator. Add them to `results/review-queue.md` with the handle, the check that failed, and why (the check name and problem text from the second run). Record `check_failed`.
- **Low personalization.** If the judge's personalization score is below 3, add the creator to `results/review-sheet.md` with the handle, both scores, and the judge's personalization quote and rationale and fit quote, verbatim. The creator is still recorded as `scored`.
- Create `results/review-queue.md` and `results/review-sheet.md` the first time they're needed, and append to them. Never overwrite. Write one entry at a time, since creators in a batch run in parallel.
- This is separate from the stability fallback. If the re-research fails because its model is unavailable or retired, use the backup scout as above. That doesn't count as the quality retry. Log the re-research in `results/results-log.md` as its own line, with step `research-retry`.
- These files are for a person to review. Approval in step 4 still applies, and nothing is emailed automatically.

## Run procedure
1. At the start of every run, read `results/checkpoint.json` and skip creators already recorded there. If the file doesn't exist, create `results/` and start with `{"completed": []}`.
2. Work through `candidates/brg-candidate-list.md` in order, in batches of ten, with the creators in a batch running in parallel. Start the next batch only after the current one finishes.
3. Add each creator to `results/checkpoint.json` as soon as it's finished, not at the end of the batch. Record the handle and its final status: `scored`, `out_of_range`, or `check_failed` (still failing after the quality retry).
4. If a batch hits a rate-limit error, wait a minute and retry its unfinished creators, up to three times. Don't rerun creators already in the checkpoint.
5. If it still fails after three retries, write the unfinished creators to `results/needs-attention.md` (handle, last step reached, error) and stop. Don't start later batches.
