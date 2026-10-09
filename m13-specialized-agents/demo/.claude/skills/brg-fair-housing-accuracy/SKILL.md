---
name: brg-fair-housing-accuracy
description: Checks Bellwood marketing content against the listing sheet and the Fair Housing disclosure requirement, with channel-specific rules. Load before reviewing any Bellwood content. The auditor loads this skill; it needs the listing sheet as evidence.
---

# Fair Housing Disclosure & Listing Accuracy — Bellwood Realty Group

These rules check claims against evidence — the listing sheet and the brand bible.

## Rules

1. **Numbers match the sheet.** Every bedroom count, bathroom count, square footage, price, and HOA fee must match `listings/brg-142-ashgrove-lane.md` exactly. Severity: blocker. In the fix, state the correct number from the sheet.
2. **Condition claims need the sheet's exact wording.** A condition phrase — "move-in ready," "turnkey," "no repairs needed" — is supported only if it appears in the listing sheet's "Approved language for this listing" section. Approval is per listing, never global: the same phrase on a listing without that approval is still flagged as unverified. Severity: warning.
3. **Anything not on the sheet is unverified.** Flag any claim about the property or neighborhood that the sheet doesn't state. Never fill the gap with general knowledge about real estate. A person decides. Severity: warning.
4. **Regulated claims need approved evidence.** Claims about future value or appreciation ("guaranteed to appreciate," "a smart investment," "will only go up"), school rankings, or safety are blockers unless the listing sheet cites approved evidence for them. Severity: blocker.
5. **Disclosure, word for word.** The equal-housing disclosure in `brand/brg-brand-bible.md` must appear exactly in every email, ad, social caption, video script, and listing page. Severity: blocker.

## Channel rules
- **Meta ad:** headline 40 characters or fewer. Housing ads run under Meta's Special Ad Category, so the copy must never describe or target an audience by age, gender, family status, or ZIP code.
- **Listing page:** can carry longer claims, but each one still needs support from the listing sheet.
- **Video script:** the disclosure must appear in the script as on-screen text or voiceover. Same number rules as every other channel.
- **Every channel:** Rule 4 applies everywhere. Regulated claims carry legal risk regardless of the channel they appear in.

## Output when reviewing
For each finding: the exact line, this skill's name, the rule number, the severity, and a suggested fix.
