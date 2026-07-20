# Schedule a Weekly Marketing Operations Routine

## Goal

Turn the provided `gsj-marketing-ops-brief` skill into a **weekly cloud
routine** that reads the marketing-operations data, drafts a brief, publishes
it to GitHub, and notifies you on success or failure — so a recurring
reporting task runs on its own without you.

## What you're given

- **`gsj-marketing-ops-brief/`** — the skill to schedule. You are *not*
  authoring this skill; your job is to schedule it.
  - `SKILL.md` — reads the ops data and produces a four-section brief
    (Campaign Status, Content Pipeline, Blockers, Needs Decision).
  - `references/gsj-marketing-ops.xlsx` — this week's marketing-operations
    data (Campaigns, Content Calendar, Blockers tabs). This is **input** the
    skill reads, not something you fill in.
  - `references/gsj-marketing-ops-ERROR.xlsx` — a deliberately broken copy of
    that data, for the test step below.

## Prerequisites

- A GitHub account (register first if you don't have one).
- Claude Code, with the ability to add an MCP connector.

## Steps

1. **Create a GitHub repo** to store the routine's output (e.g.
   `gsj-marketing-ops`).
2. **Turn on notifications** for the repo — Settings → Notifications, and set
   Watch → All Activity — so you're emailed when the routine runs or fails.
3. **Create a fine-grained personal access token (PAT)** scoped to *only* that
   repo, with **Issues: read/write** and **Contents: read/write**. Set an
   expiration and keep it private.
4. **Connect Claude to GitHub via MCP** using the token, then confirm the MCP
   server shows connected.
5. **Run a read-only test** — ask Claude to check the repo for any failures —
   to confirm the connection works *before* you schedule anything.
6. **Schedule the routine** with `/schedule`: turn `gsj-marketing-ops-brief`
   into a **weekly** routine (pick a day/time, e.g. Friday evening) that reads
   `references/gsj-marketing-ops.xlsx`, writes the brief to your repo, and
   reports on **both success and failure**.
7. **Test before you rely on it.** Manually run the routine once and confirm
   the brief appears in your repo.
   - **Optional — prove your alerts work:** swap in
     `references/gsj-marketing-ops-ERROR.xlsx` (in place of the good file) and
     run again. Confirm your **failure notification actually fires** — a
     scheduled routine is only as trustworthy as its alerting.

## Deliverable

A live weekly routine, plus a published brief in your GitHub repo.

## Note

Refresh `gsj-marketing-ops.xlsx` with new data each week so the brief stays
accurate — the routine is only as current as its input.
