# Bellwood Realty Group — Listing Marketing Project

## Facts every agent in this project works from
- Company: Bellwood Realty Group, a residential brokerage — about 40 agents across three suburban offices.
- Brand bible (voice pillars, Fair Housing rules, required disclosure): `brand/brg-brand-bible.md`
- Listing sheet (the only source of facts for this property): `listings/brg-142-ashgrove-lane.md`
- Skills: `.claude/skills/brg-brand-voice/SKILL.md`, `.claude/skills/brg-fair-housing-accuracy/SKILL.md`
- Agents: `.claude/agents/` — shared with the whole team through this project folder. Change a rule once and every agent that loads it picks up the change.

## Workflow rule
1. `brg-listing-writer` drafts marketing content.
2. `brg-brand-auditor` reviews every file before any person sees it. Nothing reaches a human reviewer until the auditor has checked it.
3. The auditor receives the content files only. It never receives the writer's brief (the notes, seller requests, and instructions the writer drafted from).
4. Any asset with a blocker goes back to the writer once, with the findings attached.
5. The auditor only reads. The main agent — not the writer and not the auditor — writes the review sheet to `review/brg-review-sheet-YYYYMMDD.md` (review date, so every export is distinct for archival and tracking; if a sheet for that date already exists, add the time: `brg-review-sheet-YYYYMMDD-HHMM.md`; never overwrite an earlier sheet): asset, channel, result, cited rule.
