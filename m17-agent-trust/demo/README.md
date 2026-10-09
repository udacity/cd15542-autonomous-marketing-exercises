# Module 17 Demos 1 and 2 — Bellwood Realty Listing-Copy Workflow

Open this folder in Claude Code to record Demo 1 and Demo 2. It's the starting state for those two videos only. It isn't a learner activity, and it isn't the same folder as `../starter/`, which is the Solution activity.

## The case
Bellwood's listing-copy workflow runs in two ways. **Routine runs** draft and check copy whenever a listing is added or changed, usually a handful at a time with nobody watching. **Bulk re-checks** run every active listing's live copy against the rules again whenever a rule changes. Bellwood has 30 active listings right now. This week, the compliance lead added two banned phrases, so a bulk re-check is due.

---

## Demo 1 — Setting Up an LLM-as-Judge with Deterministic Checks

**Learning objective:** Set up a two-layer quality gate for AI-written marketing copy. A provided rule checker catches anything with one right answer: the facts, the required disclosure, and banned phrases. A judge subagent you create scores what takes judgment, like brand voice. You calibrate the judge against a person's scores before trusting it, and send anything it scores low to a person.

**Real-world benefit:** This is a brand and legal review checklist that runs on every piece of copy, without anyone giving up control. It catches the mistakes that cost money, like a wrong price or a missing equal-housing disclosure, before a person ever reads the draft. And it shows how to prove an AI reviewer agrees with your team before you rely on it.

**What's built on screen:** the `brg-brand-judge` subagent, a parallel calibration run (one judge per email), one rubric fix, and one routing rule in `CLAUDE.md`. The check script is provided and isn't edited.

---

## Demo 2 — Adding Fallbacks Based on an Audit of the Workflow

**Learning objective:** Turn audit findings into specific backup plans. When the judge's model is retired, a backup judge on a different model takes over, and it's calibrated first. When a bulk run is too big for the rate limit, listings run in batches with retries and a record of what's finished, so a restart never redoes work.

**Real-world benefit:** Automated workflows fail when nobody's watching. After this demo, a marketer can ask vendors and IT the right questions: what happens when this model is retired, what happens if we hit a limit halfway through, and can I see which model made each call? It also shows that the speed of running agents in parallel is exactly what trips limits, and how to keep the speed without the failure.

**What's built on screen:** two new phrases in the brand bible (no code), the `brg-brand-judge-backup` subagent and its calibration, a batch/retry/checkpoint plan added to `CLAUDE.md`, a results log that records which judge scored each listing, and one interrupted-and-restarted bulk re-check.

---

## What's here
- `brg-check-script.js` — **provided.** Checks copy for three things: every number matches the listing sheet, the equal-housing disclosure appears word for word, and no banned phrase appears. It reads the facts from `listings/` and the rules from `brand/brg-brand-bible.md`, so changing a rule means editing the brand bible, not the code. Run it with `node brg-check-script.js <copy-file>`.
- `active-listings.md`, `listings/`, `live-copy/` — the 30 active listings, their fact sheets, and their current approved emails. Five emails use a phrase that becomes banned in Demo 2.
- `brand/brg-brand-bible.md` — voice pillars, the banned-phrase list, and the required disclosure.
- `test/brg-142-ashgrove-lane-planted-errors.md` — a draft with three planted problems (wrong square footage, missing disclosure, a banned phrase) for Demo 1's checker test.
- `calibration/brg-ten-listing-emails.md` and `calibration/brg-human-scores.md` — ten emails and a person's scores, used to calibrate the judge (Demo 1) and the backup judge (Demo 2).
- `brg-audit-findings.md` — the audit Demo 2 responds to.
- `.claude/agents/brg-listing-copy-writer.md` — the writer. Provided, not built in either demo.
- `CLAUDE.md` — the starting workflow order: writer, then check script, then judge. Each demo adds to it. By the end of Demo 2 it should match `../instructor-demo-key/CLAUDE.md`.

## Reset between takes
Keep an untouched copy of this folder before your first take, and copy files back from it.
- Demo 1: delete `.claude/agents/brg-brand-judge.md`, `drafts/`, and any calibration results file. Restore `CLAUDE.md`.
- Demo 2: restore `brand/brg-brand-bible.md`, `CLAUDE.md`, and the Demo 1 version of `.claude/agents/brg-brand-judge.md`. Delete `.claude/agents/brg-brand-judge-backup.md`, `results/`, and `revised/`.

`../instructor-demo-key/` shows the finished state after both demos. Use it to check your work after recording, not as the recording folder.
