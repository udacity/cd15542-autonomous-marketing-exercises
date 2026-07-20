---
name: gsj-platform-best-practices
description: Check and adapt GSJ ad and social copy against platform formatting rules and character limits for Google RSA, Meta (Facebook/Instagram), and LinkedIn. Use whenever GSJ copy is being written, reviewed, or fitted for one of these platforms — RSA headlines/descriptions/paths, Meta primary text/headline/description, LinkedIn posts/hashtags — or when someone asks whether copy "fits," is "within limits," or needs trimming for a platform. Counts characters exactly (never estimated) and, when copy is over, reports exactly how many characters over.
---

# GSJ Platform Best Practices

Validate and adapt Groundswell (GSJ) ad/social copy against each platform's real
formatting rules and character limits. The limits live in a spec file — **always
read them from the file, never from memory** — and character counts are always
**exact, never estimated**.

## Source of truth

All limits and rules come from:

`references/gsj-platform-specs.xlsx`

Three sheets: **Google RSA**, **Meta**, **LinkedIn**. Do not hard-code or recall
limits — if the file changes, the skill must follow it. To see the current specs:

```bash
python3 scripts/check_copy.py --show-specs
# or one platform:
python3 scripts/check_copy.py --show-specs --platform "Google RSA"
```

## The exact-count rule (non-negotiable)

Never eyeball or estimate a character count. Every count must come from the
script, which uses `len()` over the raw string. When copy is over a limit, state
**exactly how many characters over** and how many to trim — the script prints
this for you.

## How to check a piece of copy

Run one field at a time. Prefer `--stdin` so quotes, apostrophes, emoji, and
newlines in the copy can't break shell quoting:

```bash
printf '%s' "Cold-Pressed Organic Juice Delivered Daily" \
  | python3 scripts/check_copy.py --platform "Google RSA" --field "Headline" --stdin
```

Or pass it inline with `--text "..."`. Platform names match the sheet tabs
("Google RSA", "Meta", "LinkedIn"); field names are matched case-insensitively
and by prefix ("Headline", "Primary text", "Description", "Post length", ...).

The script prints the exact length, the rule, notes, and a verdict:
`OK — n/limit, x to spare` or `OVER by x characters — trim x`. Exit code is `0`
when within limit, `1` when over.

For a full ad or post, check **each field separately** (e.g. every RSA headline
and description, each up to the file's stated maximum count of assets).

## Workflow

1. Identify the platform and which field each piece of copy maps to.
2. Run `check_copy.py` per field (use `--stdin`). Report the exact count vs.
   limit for each.
3. For anything **over**, say by exactly how many characters, then rewrite to
   fit — preserving meaning and GSJ brand voice — and re-run the script to
   confirm the rewrite is within limit.
4. Apply the non-length rules from the file too (the `Notes` column and the
   fields with no numeric limit), e.g.:
   - **Google RSA:** provide enough headlines/descriptions per the file's
     min/max; each headline must stand alone; don't repeat the same claim; use
     pinning sparingly.
   - **Meta:** front-load the essential point in the first ~125 chars of primary
     text (mobile truncates hardest); supply the right image crop; don't rely on
     the description showing.
   - **LinkedIn:** keep external links out of the first line (put them in the
     first comment); prefer native video/carousels; write the first 2–3 lines to
     stand alone; end with a genuine question; 3–5 hashtags, no stuffing.
5. Fields with no numeric limit (image ratio, link display, pinning, native
   content, engagement window) are guidance — apply the rule, no count needed.

## Notes on counting

- Counts are by character (Unicode code point), matching how these platforms
  count. An emoji counts as its code points.
- Meta and LinkedIn limits are engagement/truncation thresholds ("recommended",
  "no hard cap after ~N"); the script still reports exact overage against the
  number in the file so you can make an informed trim.

## Brand voice and claims

This skill governs **fit and formatting only**. It does not check brand voice or
factual/health/sustainability claims — run `gsj-brand-voice` and
`gsj-product-accuracy` for those. Order: get the message right (voice + claims),
then use this skill to fit it to each platform.
