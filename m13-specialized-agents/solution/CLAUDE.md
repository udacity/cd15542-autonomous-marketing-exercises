# Bellwood Realty Group — 204 Willowmere Court Price-Improvement Campaign

## Facts every agent in this project works from
- Company: Bellwood Realty Group, a residential brokerage.
- Brand bible: `brg-brand-bible.md`
- Listing sheet (the only source of facts): `brg-204-willowmere-court.md`
- Campaign brief (for the writer only): `brg-campaign-brief.md`
- Skills: `.claude/skills/brg-brand-voice/SKILL.md`, `.claude/skills/brg-fair-housing-accuracy/SKILL.md`
- Auditor (already built, provided for this project): `.claude/agents/brg-brand-auditor.md`

## Ground Rules
- The auditor reviews draft files only — never the campaign brief. The brief carries the seller's requests and the writer's instructions, and an auditor that can read those risks treating a request as if it were already approved rather than judging the asset on its own merits.
- A blocked asset gets exactly one revision round. Send the writer only that asset and its specific findings (quoted line, skill, rule, suggested fix) — not the whole batch, and not a second round of open-ended feedback.
- An asset still blocked after its one revision round does not get a third pass. Mark it "Needs a person" and stop — looping again past the cap just delays the same outcome.
- A person approves before anything is published. This applies to every asset, with no volume-based or channel-based exception — there is no "this one's low-risk enough to skip review" carve-out in this workflow.

## Workflow rule

1. `brg-listing-writer` drafts every asset in `brg-campaign-brief.md` and saves them to `outputs/round-1/`.
2. The main agent sends `brg-brand-auditor` the draft files only. The auditor never receives the brief. The brief holds the seller's requests and the writer's instructions, and an auditor that reads them can end up treating a request as if it were approved.
3. Any asset with a blocker goes back to the writer **once**, with only that asset and its findings (quoted line, skill, rule, suggested fix). The writer saves revisions to `outputs/round-2/`.
4. The auditor re-reviews only the revised assets. Revisions are capped at one round. If an asset is still blocked after round 2, mark it "Needs a person" on the review sheet and stop. Don't loop again.
5. The main agent writes `review/brg-review-sheet.md`: asset, channel, round-1 result, round-2 result, cited rule, status. A person approves before anything is published.
