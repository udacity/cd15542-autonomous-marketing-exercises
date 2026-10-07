# Module 13 Starter — Writer + Auditor Pipeline on a New Campaign

**Use case:** A price-improvement and open-house campaign for 204 Willowmere Court, drafted from a listing agent's brief. This is different from the demos, which audited content that was already written. Here the learner builds the writer and runs the full loop: Write → independent audit → one revision round → human review sheet.

## What's here
- `brg-campaign-brief.md`: The listing agent's brief. It contains a stale HOA figure and a seller request that breaks the rules, on purpose.
- `brg-204-willowmere-court.md`: The listing sheet (the only fact source), with per-listing approved language.
- `brg-brand-bible.md` and `.claude/skills/`: The same rules the demos ended with.
- `.claude/agents/brg-brand-auditor.md`: The auditor, provided (pointed at this listing).
- `CLAUDE.md`: Facts, with the workflow section left for the learner to write.
- `LEARNER-PROMPTS.md`: step-by-step prompts.

## What the learner builds
The `brg-listing-writer` subagent, the workflow section of `CLAUDE.md`, one full pipeline run, and the review sheet.

The finished reference is in `../solution-key/`.
