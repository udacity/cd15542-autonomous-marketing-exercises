# Solstice Active — RSA Sub-Agent Pipeline

## What This Project Is

This workspace chains Claude Code sub-agents and Skills into a working
content pipeline for Solstice Active. The deliverable is a Google Ads
Responsive Search Ad (RSA): 15
headlines (≤30 chars each) and 4 descriptions (≤90 chars each), exported as
a Google Ads bulk-upload-ready CSV.

## Ground Rules

- **Sequencing is explicit, not implied.** The headlines agent runs first
  and never sees descriptions. The descriptions agent runs second and
  **must** receive the headlines agent's output as context — descriptions
  complement headlines, so they can't be written blind to them.
- **Character limits are never eyeballed.** Every headline and description
  is validated with `sa_check_copy.py` before it ships. See
  `.claude/skills/sa-google-rsa-best-practices/SKILL.md`.
- **Brand voice is checked, not assumed.** Both agents apply
  `.claude/skills/sa-brand-voice/SKILL.md` before returning copy.
- **Aggregation is deliberately dumb.** Once both agents return, merge their
  two lists into one structured object — no new copy generation happens at
  this step. The intelligence lives in the agents, not the merge.
- **Never fabricate a product fact.** Every claim in the copy traces back to
  something in the campaign brief. If a detail is missing, use a marked
  placeholder rather than inventing one (see `sa-brand-voice`'s Write mode).

## Pipeline steps

1. **Headlines** — invoke `sa-rsa-headlines-agent` with the campaign brief
   path (e.g. `briefs/sa-momentum-launch-brief.md`). It returns exactly 15
   headlines.
2. **Handoff** — invoke `sa-rsa-descriptions-agent` with the campaign brief
   path **and** the headlines agent's 15-item output pasted into the prompt
   as context. It returns exactly 4 descriptions.
3. **Aggregation** — merge the headlines list and descriptions list into one
   structured object (a markdown table or JSON is fine) covering both sets
   plus the brief's landing page URL and any Path 1/Path 2 values.
4. **Export** — run `scripts/sa_export_rsa_csv.py` against the aggregated
   object to produce a Google Ads Editor-compatible RSA CSV in `/output`.
   See that script's docstring for the exact column layout. Don't pass
   `--out` yourself — leave it off so the script auto-generates a
   collision-safe filename: `sa-<campaign-slug>-rsa-<YYYY-MM-DD>.csv`. If a
   file for that campaign already exists for today's date (e.g. a second run
   on the same day), the script appends an `HHMMSS` timestamp instead of
   overwriting it: `sa-<campaign-slug>-rsa-<YYYY-MM-DD>-<HHMMSS>.csv`.
5. **Human review** — a human reviews the CSV (and the underlying copy)
   before it is treated as final or uploaded anywhere. This step applies
   whether the run was manual or triggered on a schedule.

## Reference Files

- `.claude/skills/sa-brand-voice/SKILL.md` — Solstice Active's voice and tone
- `.claude/skills/sa-google-rsa-best-practices/SKILL.md` — RSA limits and the
  exact-count validation workflow
- `.claude/agents/sa-rsa-headlines-agent.md` — headlines sub-agent
- `.claude/agents/sa-rsa-descriptions-agent.md` — descriptions sub-agent
- `scripts/sa_export_rsa_csv.py` — aggregation → CSV export
- `briefs/sa-momentum-launch-brief.md` — sample campaign brief used to run
  the pipeline end-to-end
- `briefs/sa-blank-brief-template.md` — empty brief template for a new
  campaign
