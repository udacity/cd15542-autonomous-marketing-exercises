# Round 2 Proposal - 142 Ashgrove Lane open house

Status: PROPOSAL ONLY. Nothing has been launched, paused, or rebudgeted. A person must launch or approve every change.

## 1. What is new vs. memory
- Already in memory: the virtual-tour angle, one variant, low-confidence "watch, don't scale" stance.
- New: pull 2 for v_seed_virtualtour. Cumulative 2,414 impressions, 60 clicks, 3 conversions, $105 spend, 2.49% CTR, $35 CPA (pull 1 was 2.30% CTR, $42 CPA). Direction is mildly positive.
- Not new: no conclusion changes. Confidence stays low.
- No other angle tags exist yet, so there is nothing to compare like-for-like.

## 2. Data-quality caveats
- Two pulls only, and 3 conversions total (single digits). The CPA drop from $42 to $35 comes from one added conversion and could easily be noise.
- One variant, one angle: no baseline or comparison group.
- Pull 2 alone added roughly 314 impressions, 12 clicks, 1 conversion, $21 spend, a small increment.
- The memory file contains a `_truth` block (simulator ground truth). It was not used in any analysis here.

## 3. Lesson changes made (dashboard/memory/campaign-memory.json)
- Updated the existing `virtual-tour` lesson (no duplicate added): evidence now cites 2 pulls with the numbers above; recommendation updated; confidence kept at low; `listing: "142 Ashgrove Lane"` added.
- `variants` and all other keys left exactly as the platform wrote them (the platform had already recorded pull 2).

## 4. Proposed variants for round 2
Goal: create comparison angles so virtual-tour can be judged like-for-like. Each should run the same budget and window as the seed. Claims below are placeholders and must be checked against the actual listing facts before launch.

1. Headline: "Open House This Saturday at 142 Ashgrove Lane"
   Description: "Tour the updated kitchen and primary bath in person. Doors open, no appointment needed."
   Angle tags: `open-house`, `urgency`
   Why: the campaign's actual conversion event is the open house, and this tests a direct-event angle against the virtual tour.

2. Headline: "Your Next Kitchen Is Waiting on Ashgrove Lane"
   Description: "See the renovated kitchen and spa-style primary bath at 142 Ashgrove Lane."
   Angle tags: `features`, `renovation`
   Why: tests a property-features angle, reusing the kitchen and bath details from the seed without the virtual-tour framing.

3. Headline: "Walk Through 142 Ashgrove Lane From Anywhere, Then Visit Saturday"
   Description: "Preview the 3D tour online, then see it in person at the open house."
   Angle tags: `virtual-tour`, `open-house`
   Why: a second virtual-tour data point with an event call to action. It tells us whether the tour angle drives open-house intent and adds a second `virtual-tour` variant so that angle is not resting on one ad.

## 5. Pause / scale recommendations (for a person to decide)
- Seed virtual-tour variant: keep running; do not scale and do not pause. 3 conversions is too few for either call.
- No pause recommendation for any variant. A winner or loser call needs more pulls and conversions in double digits per angle.
- Recommend a person decide the round-2 budget split so all variants get comparable spend.

## 6. Open questions for the person
- What is the real open house date and time, and is there a registration step? This affects headline 1 and 3 and what counts as a conversion.
- Are the "spa-style" and "renovated" descriptions accurate for the listing, and does compliance need to review the copy?
- Should round 2 hold the seed budget level, or is there a total cap to split across the new variants?
- How many conversions per angle would you like before we treat a result as actionable?
- Is the 3D tour link live and mobile-friendly? A weak landing experience could explain results independent of the angle.
