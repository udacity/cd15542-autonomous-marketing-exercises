# Google RSA specs — source of truth

Read this file for every limit and rule. Never hard-code or recall a limit
from memory — if this file changes, the skill follows it.

## Asset counts

| Field | Min | Max |
|---|---|---|
| Headlines | 3 | 15 |
| Descriptions | 2 | 4 |

This pipeline always targets the **maximum**: 15 headlines, 4 descriptions.

## Character limits

| Field | Limit (exact characters) |
|---|---|
| Headline | 30 |
| Description | 90 |
| Path 1 | 15 |
| Path 2 | 15 |

Counts are by character (Unicode code point) — an emoji counts as its code
points. Never estimate; always run the count through `sa_check_copy.py`.

## Non-length rules

- **No duplicate headlines.** Every headline must be distinct text — near-
  duplicates (same claim, reworded) defeat the point of having 15 slots.
- **Each headline must stand alone.** Google can show any subset of your
  headlines together in any order. A headline that only makes sense
  following another headline ("...and more!") is not usable.
- **3–5 headlines minimum recommended for real ad strength**, but this
  pipeline always produces the full 15 to maximize combination testing.
- **Pinning is available but used sparingly.** Pinning a headline/description
  to a fixed position (e.g. Headline 1 always shown first) trades away
  Google's automatic combination testing. Default to unpinned; only pin when
  a legal/compliance line must always appear in the same slot.
- **Descriptions complement headlines, not repeat them.** A description
  should not just restate a headline's claim — see the descriptions agent's
  instructions for this handoff rule.

## Path fields

Path 1 and Path 2 append to the display URL (e.g.
`solsticeactive.com/momentum/leggings`). Each is ≤15 characters, no spaces,
descriptive of the landing page section.
