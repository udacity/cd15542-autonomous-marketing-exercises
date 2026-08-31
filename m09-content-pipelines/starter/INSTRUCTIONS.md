# Build Your Own RSA Pipeline for a Provided Brief

## Goal

Build a two-agent content pipeline that turns a Solstice Active campaign brief
into an upload-ready Google Responsive Search Ad (RSA): 15 headlines (≤30 chars
each) and 4 descriptions (≤90 chars each). A **headlines** sub-agent runs first
and hands its output to a **descriptions** sub-agent, which writes to complement
those headlines rather than repeat them. You're building the two agents; the
skills, the validation script, the export script, and the brief are provided.

## What you're given

- **`briefs/sa-momentum-launch-brief.md`** — the sample campaign brief you'll
  run the pipeline against (Momentum Collection legging + jogger launch, with
  product facts, audience, offer, seed keywords, landing page, and compliance
  notes). `briefs/sa-blank-brief-template.md` is the empty version for a new
  campaign.
- **`.claude/skills/sa-brand-voice/`** — Solstice's voice and tone. Both agents
  run copy through this before returning it.
- **`.claude/skills/sa-google-rsa-best-practices/`** — the RSA rules. `SKILL.md`
  and `references/sa-google-rsa-specs.md` hold the character limits and
  non-length rules (no duplicate headlines, each headline stands alone). Its
  `scripts/sa_check_copy.py` counts characters **exactly** — never eyeball a
  count.
- **`scripts/sa_export_rsa_csv.py`** — the aggregation/export step. Feed it an
  aggregated JSON object; it validates lengths and writes a Google Ads
  Editor-compatible CSV to `output/`. See its docstring for the JSON shape and
  the auto-generated filename behavior.
- **`output/`** — where the exported CSV lands.
- **`CLAUDE.md`** — the pipeline's ground rules: explicit sequencing, exact
  character counts, brand-voice checked not assumed, a deliberately "dumb"
  merge step, and no fabricated product facts.

You are **not** given the two agent files — writing them is the exercise.

## Prerequisites

- Claude Code with sub-agent support (a `.claude/agents/` folder).
- `python3` on your PATH, to run the validation and export scripts.

## Steps

1. **Read the brief and `CLAUDE.md`.** Note the product specs, the offer, and
   the compliance notes (no medical claims, sizing stays neutral, returns say
   "30 days") — every claim in the copy must trace back to the brief.
2. **Author `.claude/agents/sa-rsa-headlines-agent.md`.** It runs **first** and
   never sees descriptions. It takes a brief path, drafts exactly 15 headlines
   in Solstice's voice (using `sa-brand-voice` in Write mode), derives `path1`
   and `path2`, validates **every** headline and path individually with
   `sa_check_copy.py`, and enforces the non-length rules (no duplicates, each
   headline stands alone). Have it return the 15 headlines plus paths in a fixed
   format that the next agent can consume verbatim.
3. **Author `.claude/agents/sa-rsa-descriptions-agent.md`.** It runs **second**
   and **requires** the 15 headlines pasted into its prompt — if they're
   missing, it must stop and ask rather than draft blind. It writes exactly 4
   descriptions that complement (do not restate) the headlines, in brand voice,
   each validated at ≤90 chars with `sa_check_copy.py`.
4. **Run the headlines agent** against `briefs/sa-momentum-launch-brief.md` and
   confirm 15 headlines that each pass the character check.
5. **Hand off to the descriptions agent**, passing the 15 headlines as context.
   Confirm the 4 descriptions add new specifics instead of echoing headlines.
6. **Aggregate** the two lists into one JSON object (headlines, descriptions,
   landing-page URL, path values) — no new copy is written at this step.
7. **Export** by running `scripts/sa_export_rsa_csv.py` against that JSON.
   Leave `--out` off so it auto-names the file under `output/`. Fix any error
   the script's validation raises (wrong counts, over-limit, duplicates).
8. **Review.** A human reads the CSV and the underlying copy before it's treated
   as final — whether the run was manual or scheduled.

## Done when

A CSV in `output/` holds 15 distinct headlines and 4 descriptions, every field
is within its Google limit (the export script exits clean, not blocked), the
descriptions complement rather than repeat the headlines, and no claim in the
copy is absent from the brief.
