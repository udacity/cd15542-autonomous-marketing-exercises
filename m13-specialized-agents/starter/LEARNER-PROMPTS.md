# Module 13 Solution Activity — Prompts

**What's new here:** in the demos, the auditor checked content that was already written. This time you run the whole pipeline. You build the writer, give it a real brief from a listing agent, send its drafts through the auditor, and run one revision round. Then a person gets a review sheet with the full audit history.

The auditor is already built (`.claude/agents/brg-brand-auditor.md`). You build everything else.

## Step 1 — Read the brief and the listing sheet yourself
Open `brg-campaign-brief.md` and `brg-204-willowmere-court.md` side by side. Write down anything in the brief you wouldn't want published. You'll compare your list with the auditor's results later.

## Step 2 — Write the workflow into CLAUDE.md
Fill in the "Workflow rule" section. Your own words are fine. Example:

> 1. brg-listing-writer drafts every asset in the brief and saves them to outputs/round-1/.
> 2. The main agent sends brg-brand-auditor the draft files only — never the brief.
> 3. Any asset with a blocker goes back to the writer once, with only that asset and its findings. The writer saves revisions to outputs/round-2/.
> 4. The auditor re-reviews the revised assets. Revisions are capped at one round. If an asset is still blocked, mark it "Needs a person" on the review sheet. Don't loop again.
> 5. The main agent writes review/brg-review-sheet.md: asset, channel, round-1 result, round-2 result, cited rule, status. A person approves before anything is published.

## Step 3 — Build the writer
Turn on Plan Mode and paste:

> Create a subagent called brg-listing-writer. It drafts Bellwood Realty marketing content from brg-campaign-brief.md and saves each asset as its own file in the drafts folder it's given. Before drafting, it loads the brg-brand-voice skill. Its tools are Read, Write, and Skill. Use the sonnet model. When it receives audit findings, it revises only the assets it was sent and fixes exactly what each finding cites. Ask me any questions before you build it.

Check before accepting: the writer **has** Write and the auditor **doesn't**. The writer loads brand-voice only. The auditor loads both skills.

## Step 4 — Run the pipeline
> Follow the workflow in CLAUDE.md for the campaign in brg-campaign-brief.md.

Let it finish without stepping in.

## Step 5 — Check your results
- How many assets passed in round 1? Which were blocked, and which rule did each finding cite?
- Open the round-2 file for each blocked asset. Did the writer fix exactly what was cited and nothing else?
- Open the review sheet. Could a person approve or reject each asset without rereading every draft?

Compare with `../solution/brg-answer-key.md` **after** you finish. Focus on whether you caught the blockers. Your wording, and the severity you give smaller issues, may differ.
