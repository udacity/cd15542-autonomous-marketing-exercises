# Module 17 Demo 1: LLM-as-Judge with Deterministic Checks

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. To start over, run `git checkout -- . && git clean -fd` from this folder.

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
