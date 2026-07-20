# Build a Marketing Skills Library

## Goal

Build the three foundational marketing Skills for Groundswell Juice Co. — the
same institutional-knowledge library you'll reuse across the rest of the
course. Each is a reusable Skill an agent can load to stay on-brand, accurate,
and platform-correct.

You'll build all three, with decreasing hand-holding:

1. **Brand Voice** — you watched this one get built in the demo. Build your own
   version now.
2. **Platform Best-Practices** — a *validation* Skill (checks copy against
   platform rules). The solution walks through this one if you want a reference.
3. **Product Accuracy** — build this one **independently**. It's the same kind
   of validation Skill as Platform Best-Practices (check copy against a
   reference file, flag what's off), so the process you just used carries over.

## How a Skill is structured

Each Skill is a **folder** containing a `SKILL.md` plus a `references/` folder
with the files it reads:

```
<skill-name>/
├── SKILL.md
└── references/
    └── <the files the skill reads>
```

## What you're given (the "provided brand context")

**Brand Voice**
- `brand-voice-guide.md` — the source of truth for Groundswell's voice
- `email-examples.md`, `social-examples.md`, `customer-service-examples.md` —
  real approved copy, for tone calibration per channel

**Platform Best-Practices**
- `gsj-platform-specs.xlsx` — current format/character rules for Google RSA,
  Meta, and LinkedIn

**Product Accuracy**
- `gsj-claims-tracker.xlsx` — the approved / banned claims tracker
- `gsj-product-facts.pdf` — source facts to verify claims against

## Your task

For each of the three skills:
1. Create the skill folder with a `references/` folder, and put the provided
   files for that skill inside `references/`.
2. Write a `SKILL.md` — YAML frontmatter (`name`, `description`) plus
   instructions telling the agent what the skill does and which reference files
   to read.
3. Test it: run some sample copy through it and confirm it behaves (brand voice
   rewrites/checks tone; the two validators flag violations against their
   reference files).

## Deliverable

Three working Skills (`brand-voice`, `platform-best-practices`,
`product-accuracy`), each with a `SKILL.md` and its `references/` files, tested
against sample input.
