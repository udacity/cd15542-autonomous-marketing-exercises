# Module 13 — Try It Yourself: Test Files and Prompts

Open this `starter/` folder in Claude Code. Copy each prompt below exactly, or change the wording to your own once you've seen it work. The expected results are listed so you can check your auditor. Try each step on your own before you read its expected result.

---

## Step 1 — Build the auditor (Demo 1)

Turn on Plan Mode (Shift+Tab until the footer says "plan mode"), then paste:

> Create a subagent called brg-brand-auditor. It only reviews marketing content. Before it audits anything, it loads the brg-brand-voice and brg-fair-housing-accuracy skills. It can read files but never write or edit them. Every finding must cite the skill and the rule it's based on. Ask me any questions before you build it.

If it asks how to handle a claim that isn't on the listing sheet, answer:

> Flag it as unverified and leave the decision to a person. Don't fill the gap with general knowledge about real estate.

Before you accept the plan, check it for all four:
- [ ] `tools:` lists Read, Grep, and Glob only. Write and Edit are not there.
- [ ] `description:` says to call this agent after content is drafted and before a person reviews it.
- [ ] The body tells the agent to load both skills and the listing sheet before it reviews anything.
- [ ] The output format lists verdict, severity, exact line, skill and rule, and suggested fix.

## Step 2 — Test the auditor on planted errors (Demo 1)

> Use the brg-brand-auditor to audit test-content/brg-test-email.md.

**Expected:** 2 blockers.
- "3 full baths": brg-fair-housing-accuracy, rule 1. The listing sheet says 2.5.
- "a great fit for empty nesters looking to downsize": brg-brand-voice, rule 2 (Fair Housing).

## Step 3 — Practice on your own

Audit the four files in `practice-files/` one at a time. Before you run each one, write down what you think the auditor should find, then compare.

> Use the brg-brand-auditor to audit practice-files/brg-practice-1-facebook-post.md.

| File | What a careful auditor should find |
|---|---|
| practice-1-facebook-post | Blocker, accuracy rule 1: price shows $498,000, but the listing sheet says $489,000. |
| practice-2-postcard | Blocker, brand-voice rule 2: "ideal for retirees" describes the buyer by age. |
| practice-3-text-message | Blocker, accuracy rule 4: "top-rated Maple Creek Elementary" is a school-ranking claim with no approved evidence. It may also cite brand-voice rule 3. |
| practice-4-email-banner | No findings. This is a clean control. If your auditor flags it, check whether the finding names a rule. |

## Step 4 — Audit a whole batch (Demo 2)

> Use the brg-brand-auditor to audit every file in content-batch-demo2/, and group the findings by channel.

**Expected:**
| Asset | Result |
|---|---|
| Email | Pass |
| Instagram caption | Blocker. "Perfect for a growing family" breaks brand-voice rule 2. |
| Meta ad | 2 blockers. 2,400 sq ft breaks accuracy rule 1 (the sheet says 2,340), and "guaranteed to appreciate" breaks accuracy rule 4. |
| Video script | Blocker. "A smart investment that will only go up in value" breaks accuracy rule 4. |
| Listing page | Warning. "Move-in ready" is flagged under accuracy rule 2, but this flag is wrong for this listing. See Step 5. |

Read across the channels. The Meta ad and the video script make the same kind of overpromise. Open `.claude/agents/brg-listing-writer.md` and find the instruction that caused it.

## Step 5 — Fix the causes, not just the assets

1. **Fix the writer (upstream).** Replace the paid ads and short-form video instruction with:
   > State facts from the listing sheet only. Never predict value, appreciation, or sale timing.
2. **Fix the wrong flag.** Don't approve "move-in ready" for every listing. Point the auditor at a signal on this listing's sheet:
   > Add a section to listings/brg-142-ashgrove-lane.md called "Approved language for this listing" with the line: "move-in ready" — no outstanding repairs, confirmed by Dana Ferris 9/10/2026. Then update rule 2 of the brg-fair-housing-accuracy skill: a condition phrase is supported only if it appears in the listing sheet's "Approved language for this listing" section.
3. Re-run the batch audit. The listing page should now pass. The other findings should still be there, because you fixed the writer's instructions, not these five drafts.
4. Ask the main agent to write the review sheet:
   > Write review/brg-review-sheet.md with one row per asset: asset, channel, result, cited rule.
