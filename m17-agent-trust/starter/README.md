# Module 17 Starter — Build and Run the Trust Framework on an Influencer Outreach Agent

Open this folder in Claude Code. You've watched the method in Demos 1 and 2 on Bellwood's listing copy: check first, then judge, calibrate the judge, and add fallbacks for what the audit found. Here you apply it yourself to a different agent, one that researches real people and drafts emails to them.

## The case
Bellwood's marketing team uses `brg-influencer-scout` to research local creators for open-house campaigns. For each creator it reports follower count, engagement, niche, sponsored-post history, and contact details, and it drafts an outreach email. It runs once per campaign, across the campaign's whole list. This campaign has 20 candidates. Nobody has put a trust framework around the scout yet, and a made-up statistic or an undisclosed ad would end up in an email to a real person, with Bellwood's name on it.

---

## Solution — Build and Run the Framework on a Provided Influencer Outreach Agent + Add Two Fallbacks

**Learning objective:** Apply the quality, stability, and compliance framework to an agent that researches real people. You run a provided rule checker and add one rule to it in plain English. You build and calibrate a judge subagent for this campaign, set the order the work happens in, add a backup for model retirement and a batch-retry-checkpoint plan for rate limits, and route anything that can't be verified to a person. A person approves every send.

**Real-world benefit:** Influencer outreach puts a brand's name in front of real people. A made-up follower count, a missing paid-partnership label, or a scraped personal email is a reputational and legal risk. This gives you a review process you could explain to your legal team, and a pattern that carries over to any research agent: competitor research, press lists, or partner scouting.

**What you build:**
- One new rule in `brg-check-script.js`, asked for in plain English (you don't edit the code yourself)
- The workflow order in `CLAUDE.md`: research, then check, then judge, then a person approves every send
- `brg-campaign-fit-judge`, a subagent that scores campaign fit and how personal the outreach email is, calibrated against ten hand-scored creators with one judge per creator
- A stability fallback: backup subagents on different models, batches of ten, retries, and a checkpoint
- A quality fallback: a check that still fails after one more research pass goes to a review queue for a person, with the reason
- One full run and its results log

---

## What's here
- `brg-check-script.js` — **provided.** Checks each research file for four things: every statistic has a source link, the follower count is inside the brief's range, every sponsored post was disclosed as a paid partnership, and the contact came from a public, business-facing source. As an extra, it rechecks the scout's own engagement math. It reads the follower range from the brief. Run it with `node brg-check-script.js research/<handle>.json`.
- `test/brg-planted-bad-profile.json` — a research file with four planted problems, for testing the checker before anything else runs.
- `.claude/agents/brg-influencer-scout.md` — the scout. Provided. It saves its research and draft email for each creator in `research/<handle>.json`.
- `candidates/` — the campaign's candidate list and a saved public profile snapshot for each of the 20 creators. The scout reads these instead of browsing, so everyone gets the same results. All creators are fictional, and every link is an `example.com` address.
- `brg-campaign-brief.md` — what Bellwood needs from a creator and from an outreach email.
- `brg-production-notes.md` — the two problems found in the scout's trial run.
- `calibration/brg-candidate-profiles.md` and `calibration/brg-candidate-scores.md` — ten creators and a person's fit scores, for calibrating your judge.
- `CLAUDE.md` — the project facts. You add the workflow order.
- `LEARNER-PROMPTS.md` — step-by-step prompts for the whole activity.

When you're done, compare your work with `../solution-key/`.
