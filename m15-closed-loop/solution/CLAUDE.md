# Bellwood Realty Group — 204 Willowmere Court Open-House Campaign Loop

## Facts every agent in this project works from
- Company: Bellwood Realty Group.
- Brand bible: `brg-brand-bible.md`
- Listing sheet (the only source of facts): `brg-204-willowmere-court.md`
- Campaign brief: `brg-campaign-brief.md`
- Skills: `.claude/skills/brg-brand-voice/SKILL.md`, `.claude/skills/brg-fair-housing-accuracy/SKILL.md`
- Auditor (already built, shared from the listing-marketing project): `.claude/agents/brg-brand-auditor.md`
- Memory file: `dashboard/memory/campaign-memory.json`
- The `dashboard/` folder's live viewer is called the **Performance Console**.
- MCP server: `mock-ad-platform` (read tools only for the analyst — `get_performance`, `query_memory`)

## Ground Rules
- The analyst has no write access to the ad platform — no `launch_variant`, no pause, no rebudget tool. Only a person, acting from the main session, can launch or change spend. This separation is what makes sure nothing here spends money without a person approving it first — not the approval step alone.
- Platform numbers are not trusted on arrival. A row with conversions logged but zero spend, or a sudden spike, gets flagged before it counts as signal — a closed loop is only as reliable as the data feeding it, and mock or real, platform data can arrive malformed.
- Memory accumulates; it doesn't reset. If a lesson already exists for a tag, update its confidence with new evidence — never write a duplicate entry. A fresh lesson is only for a tag with no prior entry at all.
- Every recommendation must cite the specific memory entry behind it. A proposal with no named evidence doesn't go to approval.
- The auditor's review (before launch) and the person's approval (before acting on a recommendation) are two separate gates. Clearing one is never treated as clearing both — an angle the auditor blocks stays blocked regardless of what the performance data later suggests.

## Workflow order (do not change)
1. **Generate angles.** Draft one ad variant per angle from `brg-campaign-brief.md`, using only facts from `brg-204-willowmere-court.md`.
2. **Audit them.** `brg-brand-auditor` reviews every drafted variant before anything launches — the same brand-safety auditor used for listing marketing, now pointed at this listing. A blocker keeps the angle out of round one.
3. **A person launches the approved angles** through `launch_variant`, from the main session. The `brg-campaign-analyst` subagent never launches, pauses, or rebudgets anything — it has no tools for that.
4. **Pull performance.** `brg-campaign-analyst` calls `get_performance` for each launched variant.
5. **Validate.** Flag any row with conversions logged but zero spend, and flag any sudden spike, before either counts as real signal.
6. **Update memory.** If a lesson already exists for a tag, update its confidence with the new evidence — never duplicate it. Write a fresh lesson only for a tag with no prior entry.
7. **Proposal.** Every recommendation must name the specific memory entry that justifies it. Save each round's proposal under its own file name.
8. **Approval.** A person approves or rejects each recommendation, with a logged reason for any rejection. Nothing here acts on its own — a person signs off before anything changes.
9. **Next round.** Repeat from step 1 for any new angle, or from step 3 for an approved change to an existing one.

Any angle the auditor blocks in step 2, or flags again after a change in a later round, does not launch until it passes — the loop's approval step and the auditor's review are separate checks, and both have to clear.
