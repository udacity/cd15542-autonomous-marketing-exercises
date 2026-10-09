# Module 17 Solution Activity — Prompts

**What's new here:** you apply the trust framework to a different agent, one that researches real people and drafts emails to them. `brg-influencer-scout` and the rule checker are provided. You build everything around them: one new checker rule, the workflow order, a judge, two fallbacks, and a full run.

Paste each prompt into Claude Code from this folder. Your own wording is fine, as long as it says the same things.

## Step 1 — Read the brief and the scout
Open `brg-campaign-brief.md` and `.claude/agents/brg-influencer-scout.md`. Note the follower range, what counts as a good fit, what a good outreach email does, and that a person approves every send.

## Step 2 — Test the checker before anything else runs
> Run brg-check-script.js on test/brg-planted-bad-profile.json.

You should see four failures: a missing source link, a follower count out of range, an undisclosed sponsored post, and a contact from a lookup site. The engagement math passes.

## Step 3 — Add one rule in plain English
> Add one rule to brg-check-script.js: the outreach email must ask the creator to label the post as a paid partnership. Then run it on test/brg-planted-bad-profile.json again.

You should now see five failures, including the new one. You don't need to read or write the code yourself.

## Step 4 — Set the workflow order
> Add a workflow order to CLAUDE.md. First, brg-influencer-scout researches the creator and drafts the email. Second, run brg-check-script.js on the research file, and only research that passes moves on. If the only failure is the follower range, record the creator as out of range and stop there. Third, brg-campaign-fit-judge scores fit and personalization. Fourth, a person approves every send. Nothing is emailed automatically.

## Step 5 — Build the judge (plan mode)
Press Shift+Tab to switch to plan mode, then:
> Create a subagent called brg-campaign-fit-judge. It scores one creator's research file from one to five on campaign fit, using brg-campaign-brief.md, and from one to five on how personal the outreach email is. For each score, it quotes the detail that supports it. It never scores anything about who a creator's followers are. It never reads the human scores in calibration/brg-candidate-scores.md. It returns JSON. Read-only tools. Pin it to claude-opus-5-5, a different model from the scout's.

Before you accept, check that the tools are read-only and the model is different from the scout's.

## Step 6 — Calibrate the judge
> Calibrate brg-campaign-fit-judge. Score each of the ten creators in calibration/brg-candidate-profiles.md separately, in parallel: one judge per creator, each seeing only its own profile. Put the fit scores next to the human scores in calibration/brg-candidate-scores.md and flag any creator where they differ by more than one point.

Look for any large, off-niche account the judge scored higher than the person did. That means it's treating reach as if it were fit. If you see it:
> Add a line to brg-campaign-fit-judge's rubric: score local relevance and niche above reach. A large national or off-niche following scores low on fit. Then rerun the calibration on the creators it overscored.

## Step 7 — Add the stability fallback (plan mode)
Open `brg-production-notes.md` first. Then, in plan mode:
> Add a stability fallback. Create brg-influencer-scout-backup and brg-campaign-fit-judge-backup, both pinned to claude-sonnet-5-5, each copying the original's instructions. If the scout or the judge fails because its model is unavailable or retired, use its backup and record which one ran. Work through candidates/brg-candidate-list.md in order, in batches of ten, running each batch in parallel. Read results/checkpoint.json at the start of every run and skip creators already recorded there. Record each finished creator as soon as it's done. If a batch hits a rate-limit error, wait a minute and retry it, up to three times. If it still fails, write the unfinished creators to results/needs-attention.md and stop.

Before you accept, check that the plan reads the checkpoint at the very start of the run. Calibrate the backup judge on the same ten creators before you trust it.

## Step 8 — Add the quality fallback (plan mode)
> Add a quality fallback. If brg-check-script.js fails for any reason other than the follower range, have brg-influencer-scout research that creator once more and run the check again. If it still fails, don't score the creator. Add them to results/review-queue.md with the check that failed and why. Any personalization score below 3 goes to results/review-sheet.md with the judge's quotes.

## Step 9 — Run it, and test the checkpoint
> Run the campaign for every creator on candidates/brg-candidate-list.md.

When Claude Code asks to run `node brg-check-script.js`, approve it with "don't ask again." After the first batch of ten finishes, press Esc to stop the run. Then:
> Run the campaign again.

It should start at creator 11, with nobody researched twice.

## Step 10 — Read the results like a reviewer
Open `results/results-log.md`, `results/review-queue.md`, and `results/review-sheet.md`.
- Which creators were out of range?
- Which went to the review queue, and does each one say which check failed and why?
- Which emails need a person to rewrite them?
- Is anything set to send without a person approving it? (It shouldn't be.)

When you're done, compare your work with the finished files in the workspace on the Solution page. Your judge's scores may differ a little. The checker's results won't.
