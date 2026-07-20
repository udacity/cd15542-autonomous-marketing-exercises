# Git & Folder Setup — A Beginner's Guide

This guide shows you how to organize exercise files and save them to git so
the course tooling can find them. No prior git experience needed — copy the
commands exactly.

> Everything here happens **inside the `Exercises/` folder**. Open your
> terminal there first. (In VS Code: right-click the `Exercises` folder →
> "Open in Integrated Terminal".)

---

## 1. What this repo is

This is the **source of truth for every exercise** in the course. It has its
own home on GitHub:
`github.com/udacity/cd15542-autonomous-marketing-exercises`. It is a
**separate repo** from the main course-content folder — you save and push
exercises here, independently of the course content.

---

## 2. The folder structure (and naming rules)

Every module lives in **one module folder**. Inside it are up to three
subfolders — one per kind of thing in the module:

```
m<NN>-<content-name>/
├── starter/     ← what the LEARNER is given to start (+ INSTRUCTIONS.md)
├── solution/    ← the finished EXERCISE solution
└── demo/        ← artifacts the instructor builds/uses on-screen in DEMO videos
```

- Not every module has all three. A module with no demo has just
  `starter/` + `solution/`. A conceptual module with no exercise has no
  folder here at all.
- **`demo/` is new for this course** — it gives the files you build live in a
  demo video a home, instead of zipping them into the starter. If a module
  has more than one demo, give each its own subfolder inside `demo/`
  (e.g. `demo/competitor-watch/`).

**Naming rules:**

- **Prefix the top folder with its classroom module number**, e.g.
  `m07-market-intelligence`. `NN` is the module's number in the course
  dictionary (M07 = *Build a Market Intelligence Agent*), so the folder maps
  1:1 to the classroom and to the tooling's `source/code/M<NN>/`. This is a
  deliberate choice for this course — it overrides the generic "don't number"
  note in the repo README.
- After the prefix, use a **content-based name** (`market-intelligence`), not
  a generic one (`module-3`).
- **The three subfolders are named exactly `starter/`, `solution/`, and
  `demo/`** — nothing else. Don't put the exercise name on them (no
  `build-skills-starter`). The tooling classifies every file by looking for
  the words `demo`, `solution`, or `starter` *anywhere in its path* (in that
  priority order), so a folder whose name is exactly the slot keyword is the
  safest — an exercise name that happened to contain one of those words could
  send files to the wrong slot. The exercise's name lives in the module folder
  and in `INSTRUCTIONS.md`, not on these three.
- Keep the `.gitkeep` file in an empty `solution/` folder. **Delete it once
  you add real solution files** — it only exists to keep an empty folder in
  git.

### This course's folders → course modules

| Folder | Course module |
|---|---|
| `m03-marketing-skills` | M03 · Author a Marketing Skills Library |
| `m05-scheduled-routines` | M05 · Schedule a Marketing Operations Routine |
| `m07-market-intelligence` | M07 · Build a Market Intelligence Agent |
| `m09-content-pipelines` | M09 · Build an RSA Pipeline |
| `m11-agent-memory` | M11 · Build a Customer Story Generation Agent |
| `m13-specialized-agents` | M13 · Build a Brand-Safety Auditor Agent |
| `m15-closed-loop` | M15 · Connect Your Agent Fleet to an Ad Platform |
| `m17-agent-trust` | M17 · Build a Marketing Agent Trust Framework |

### A Skill is a folder, and its data lives in `references/`

A Claude Skill is a **folder** containing a `SKILL.md` plus a `references/`
subfolder with the files the skill reads. When the `SKILL.md` says
`Read references/gsj-marketing-ops.xlsx`, that file must actually sit at
`references/gsj-marketing-ops.xlsx` next to it. So a finished skill looks
like:

```
gsj-marketing-ops-brief/
├── SKILL.md
└── references/
    └── gsj-marketing-ops.xlsx
```

**Do not zip skills together.** Lay each one out as its own folder so the
tooling (and the learner) can read it directly.

### Worked example: how `m03-marketing-skills` is organized

```
m03-marketing-skills/
├── starter/                                   ← the "provided brand context" the learner gets
│   ├── INSTRUCTIONS.md
│   ├── brand-voice-guide.md                   (raw inputs — learner builds skills FROM these)
│   ├── approved-examples.md, email-examples.md, social-examples.md, …
│   └── gsj-platform-specs.xlsx
├── solution/                                  ← the three finished skills (the "answer")
│   ├── gsj-brand-voice/SKILL.md
│   ├── gsj-product-accuracy/SKILL.md
│   └── gsj-platform-best-practices/SKILL.md
└── demo/                                       ← skills built on-screen in the two demo videos
    ├── gsj-brand-voice/SKILL.md
    └── gsj-platform-best-practices/SKILL.md
```

**Deciding where a file goes — ask "who is this for?"**

| The file is… | It goes in… |
|---|---|
| something the **learner opens to begin** the exercise | `starter/` |
| the **finished answer** to the exercise | `solution/` |
| something the **instructor builds or shows in a demo video** | `demo/` |
| **data a skill reads** (a spreadsheet, a list, a reference doc) | that skill's `references/` folder |
| a **deliberately broken / error version** of a data file, for a "test your error handling" step | `starter/` (next to the good file) |

### A few things that trip people up

- **Input data is provided *populated*, not blank.** If a skill *reads* a file
  (a spreadsheet, a list) to do its job, ship it filled in — that's input the
  learner's agent consumes, not something the learner fills out. A blank file
  makes the exercise produce empty, meaningless output. (Only give a blank/
  partial file when *filling it in* is literally the exercise.)
- **Error/test files live with the exercise they test, not the demo.** A demo
  can *teach* "test before you ship," but the broken data file the learner
  actually tests with belongs in that exercise's `starter/`, matched to the
  exercise's own dataset.
- **Some exercises don't produce a file at all.** When the deliverable is
  *external* — a scheduled cloud routine, a connected service, a configured
  integration — the `starter/` and `solution/` folders can look almost
  identical (the same provided skill + data). That's expected: the real work
  lives in the steps, so put it in `INSTRUCTIONS.md`, not in extra solution
  files.
- **When an exercise builds several similar things, you don't have to demo
  every one.** Scaffold it: show one in a **demo**, walk through one in the
  **solution**, and leave one for the learner to do **independently**. In the
  solution page, walk through *one* in full and say the others follow the same
  process — but only claim that when it's actually true (same *kind* of thing,
  same build steps), not just because they're related. The demo/solution/
  independent split keeps a multi-part exercise from being three repetitive
  walk-throughs.

---

## 3. The everyday git workflow

Git saves snapshots of your work. Four commands cover almost everything.

**Before you start working**, get the latest version:

```bash
git pull
```

**After you've added or changed files**, save and upload them:

```bash
git status          # 1. See what changed (nothing is saved yet)
git add .           # 2. Stage everything you changed
git commit -m "Add competitive-intelligence-agent starter files"   # 3. Save a snapshot
git push            # 4. Upload the snapshot to GitHub
```

That's the whole loop: **pull → work → status → add → commit → push.**

**Tips:**

- Run `git status` any time you're unsure — it never changes anything, it
  just shows you where things stand.
- Write commit messages that say what you did: `"Add RSA pipeline solution"`,
  `"Fix typo in brand-safety INSTRUCTIONS"`.
- Commit small and often. Each commit is a save point you can return to.

---

## 4. Adding a brand-new exercise folder

The 8 folders above are already set up. If you ever need another exercise,
**copy an existing folder** rather than building one by hand — that keeps the
starter/solution/INSTRUCTIONS structure intact:

```bash
cp -R m07-market-intelligence m19-my-new-topic
# the copy already has starter/ and solution/ — just edit the files inside:
git add .
git commit -m "Add m19-my-new-topic exercise"
git push
```

Name the copy with its own classroom module number (`m19-…`) — check the
course dictionary for the module's number. The `starter/` and `solution/`
subfolders keep their names (don't rename them).

Use `git mv` (not the Finder) to rename folders that are already in git — it
keeps the file history connected.

---

## 5. How this connects to the course tooling

When exercises are ready, the content-generation tooling reads a **copy** of
your code from the main course folder (under `source/code/M<NN>/`). You don't
manage that copy — it's synced from here. Your job is just to keep this
Exercises repo tidy and pushed. Ask Sofia (or the content tooling) to re-sync
after you add a new exercise's starter/solution.

---

## Quick reference

| I want to… | Command |
|---|---|
| Get the latest | `git pull` |
| See what changed | `git status` |
| Stage my changes | `git add .` |
| Save a snapshot | `git commit -m "message"` |
| Upload to GitHub | `git push` |
| Rename a tracked folder | `git mv old-name new-name` |
