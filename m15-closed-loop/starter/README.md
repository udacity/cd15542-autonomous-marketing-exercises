# Module 15 Starter — Closed Loop on a New Campaign, With the Brand-Safety Auditor Wired In

**Use case:** a 2-round open-house ad loop for 204 Willowmere Court. The brand-safety auditor from Bellwood's listing-marketing project is copied in here, pointed at this listing, and sits in the loop between drafting an angle and launching it.

## One-time setup
Open this folder in VS Code and open a terminal. Make sure the terminal is in this folder (the one with `CLAUDE.md` in it).

1. Install the mock ad platform:
   ```
   cd dashboard
   npm install
   cd ..
   ```
2. Connect it to Claude Code. Run this from this folder, not from `dashboard/`, so Claude Code finds the server when you start it here:
   ```
   claude mcp add mock-ad-platform -- node "$(pwd)/dashboard/server.js"
   ```
   If you copy this command, check that both quote marks are straight quotes (`"`). Curly quotes will leave the terminal waiting for input.
3. Start the Performance Console. Open a second terminal tab and run:
   ```
   cd dashboard
   npm run dashboard
   ```
   Open `http://localhost:4319` in your browser and leave the tab open.
4. Start Claude Code from this folder (`claude`) and run `/mcp`. `mock-ad-platform` should show as connected.

## What's here
- `CLAUDE.md` — the full loop order: generate → audit → launch (a person) → pull performance → validate → update memory → proposal → approval → next round.
- `brg-campaign-brief.md` — six angles for 204 Willowmere Court.
- `brg-204-willowmere-court.md`, `brg-brand-bible.md`, `.claude/skills/` — the facts and rules the auditor checks against.
- `.claude/agents/brg-brand-auditor.md` — the brand-safety auditor, provided, pointed at this listing.
- `.claude/agents/brg-campaign-analyst.md` — the campaign analyst, provided.
- `dashboard/` — the mock ad platform's MCP server and the Performance Console. Memory starts empty.
- `test-data/brg-zero-spend-row.json` — a bad row for testing the validation step.
- `LEARNER-PROMPTS.md` — step-by-step prompts.

## What you do
Draft the round-one angles, run them through the auditor before anything launches, then run the loop for two rounds: launch → pull performance → validate → update memory → propose → approve or reject → repeat.

When you're done, compare your work with the finished files in the workspace on the Solution page.
