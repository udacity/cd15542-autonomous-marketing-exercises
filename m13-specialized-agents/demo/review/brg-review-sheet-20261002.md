# Review Sheet — 2026-10-02

| Asset | Channel | Result | Cited rule |
|---|---|---|---|
| content-batch-demo2/brg-listing-page.md | Listing page | WARNING | brg-fair-housing-accuracy Rule 3 (unverified claim) |

## Findings

**content-batch-demo2/brg-listing-page.md** — WARNING
- Line: `**142 Ashgrove Lane | Maple Creek | $489,000**`
- Rule: brg-fair-housing-accuracy, Rule 3 (anything not on the sheet is unverified). Severity: warning.
- Issue: The header presents "Maple Creek" as the property's location. The listing sheet names Maple Creek only as the school district. It names no neighborhood or town.
- Suggested fix: Remove "Maple Creek" from the header, giving `142 Ashgrove Lane | $489,000`. Or have a person confirm the location name and add it to the listing sheet. The body line "Located in the Maple Creek school district" is supported and can stay.

Everything else passed: numbers, "move-in ready" approved language, renovation and agent facts, no school/safety/value claims, the equal-housing disclosure, and brg-brand-voice Rules 1–5.
