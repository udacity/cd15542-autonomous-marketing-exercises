# Author TODOs & Flags

Outstanding items surfaced while organizing the exercises. Please review each.

## M03 — Build a Marketing Skills Library

### ⛔ Needs you to provide files — Product Accuracy inputs
The Product Accuracy skill and the exercise `INSTRUCTIONS.md` both reference two
files that **don't exist yet**. Please create them and drop them in
`m03-marketing-skills/starter/`:

- **`gsj-claims-tracker.xlsx`** — the approved / banned claims tracker the skill
  checks copy against.
- **`gsj-product-facts.pdf`** — the source product facts to verify claims from.

(The `gsj-product-accuracy/SKILL.md` in `solution/` already expects these under
its `references/` folder.) Once you add them, tell me and I'll re-sync.

### ℹ️ Files removed — please confirm
Removed from the M03 starter because nothing referenced them after the
brand-voice skill was aligned to the demo:
- `approved-examples.md` — the old solution skill used this; the demo (now the
  canonical build) uses the guide + email/social/customer-service examples instead.
- `groundswell-sample-fall-socialmedia.pdf` — not referenced by any skill.

If either was meant to be used, let me know and I'll restore it.

### ℹ️ Naming to reconcile — brand-voice skill
The brand-voice skill's `SKILL.md` frontmatter `name:` is
**`groundswell-brand-voice`** (matches the demo video's "slash groundswell"),
but the folder is **`gsj-brand-voice`** and its siblings are `gsj-product-accuracy`
/ `gsj-platform-best-practices`. Folder ≠ name. Pick one and I'll make it
consistent:
- folder → `groundswell-brand-voice` (match the video + frontmatter), or
- frontmatter → `gsj-brand-voice` (match the folder + siblings; diverges from the video).

### ℹ️ Product Accuracy has no demo — by design
Neither video builds Product Accuracy. That's intentional now: Brand Voice is
the demo, Platform Best-Practices is the solution walk-through, and Product
Accuracy is the learner's independent build (same validator pattern as Platform).
The solution page will note it follows the same process.
