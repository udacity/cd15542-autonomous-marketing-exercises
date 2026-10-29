---
name: sa-google-rsa-best-practices
description: Check and adapt Solstice Active Google Ads RSA (Responsive Search Ad) copy against Google's real formatting rules and character limits. Use whenever RSA headlines, descriptions, or paths are being written, reviewed, or fitted — or when someone asks whether copy "fits," is "within limits," or needs trimming for Google Ads. Counts characters exactly (never estimated) and, when copy is over, reports exactly how many characters over.
---

# Solstice Active — Google RSA best practices

Validate and fit Solstice Active RSA copy against Google's real asset counts
and character limits. The limits live in a spec file — **always read them
from the file, never from memory** — and character counts are always
**exact, never estimated**.

## Source of truth

All limits and rules come from:

`references/sa-google-rsa-specs.md`

Do not hard-code or recall limits from this SKILL.md — that reference file
is authoritative. If it changes, follow the new numbers.

## The exact-count rule (non-negotiable)

Never eyeball or estimate a character count. Every count must come from
`scripts/sa_check_copy.py`, which uses `len()` over the raw string. When
copy is over, state **exactly how many characters over** and how many to
trim — the script prints this for you.

## How to check a piece of copy

Run one field at a time. Prefer `--stdin` so quotes, apostrophes, and emoji
in the copy can't break shell quoting:

```bash
printf '%s' "Squat-Proof. Sweat-Tested." \
  | python3 scripts/sa_check_copy.py --field headline --stdin
```

Or pass it inline with `--text "..."`. Fields: `headline` (30 chars),
`description` (90 chars), `path` (15 chars).

The script prints the exact length and a verdict: `OK — n/limit, x to
spare` or `OVER by x characters — trim x`. Exit code is `0` when within
limit, `1` when over.

Check **every** headline and description individually — never assume one
passing means the rest do.

## Workflow

1. Confirm the asset counts you need from the spec file: this pipeline
   always targets 15 headlines and 4 descriptions.
2. Run `sa_check_copy.py` per field. Report the exact count vs. limit for
   each.
3. For anything **over**, say by exactly how many characters, then rewrite
   to fit — preserving meaning and Solstice Active brand voice — and re-run
   the script to confirm the rewrite is within limit.
4. Apply the non-length rules from the spec file too: no duplicate
   headlines, each headline stands alone, descriptions complement (don't
   repeat) headline claims, pin sparingly.

## Notes on counting

Counts are by character (Unicode code point), matching how Google counts.
An emoji counts as its code points.

## Brand voice and claims

This skill governs **fit and formatting only**. It does not check brand
voice — run `sa-brand-voice` for that. Order: get the message right (voice),
then use this skill to fit it to Google's limits.
