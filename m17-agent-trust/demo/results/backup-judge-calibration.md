# Calibration — brg-brand-judge-backup (claude-haiku-4-5-20251001)

Date: 2026-10-04. One judge per email in `calibration/brg-ten-listing-emails.md`, run in parallel, each given only its own email. Human scores are from `calibration/brg-human-scores.md`. Flag threshold: difference of more than 1 point.

| Email | Listing | Human | Backup | Difference | Flag |
|---|---|---|---|---|---|
| A | 142 Ashgrove Lane | 5 | 4 | 1 | |
| B | 118 Fenwick Court | 5 | 5 | 0 | |
| C | 76 Stonebridge Way | 4 | 5 | 1 | |
| D | 9 Larkspur Terrace | 2 | 3 | 1 | |
| E | 210 Millbrook Road | 2 | 1 | 1 | |
| F | 33 Hollow Creek Drive | 4 | 5 | 1 | |
| G | 58 Birchwood Lane | 5 | 5 | 0 | |
| H | 401 Cedarview Place | 3 | 3 | 0 | |
| I | 17 Windsor Court | 5 | 5 | 0 | |
| J | 250 Rosewood Ave | 4 | 5 | 1 | |

**Result:** within one point on 10 of 10 (ready bar: 8 of 10). No email flagged. 4 exact matches (B, G, H, I).

## Caveats
- The judges for F and H returned prose instead of the required JSON. Their overall scores (F = 5, H = 3) come from that prose and were not re-run.
- The backup scored above the human on C, F and J and below it on A and E. E is the only email below 3. D scored 3, which does not trigger the step 4 human-review rule.
- The judge rubric points to `calibration/brg-human-scores.md`, which has a note per email. The judge for H said its score "mirrors the issue in calibration sample Email H", so it had seen that note. Whether the other judges read it was not confirmed. A stricter test would re-run with that file removed from the rubric.
