# Module 15 Instructor Demo — Closed-Loop Performance Ads with Memory

Open this folder in Claude Code for Demo 1 and Demo 2. Nothing here has an agent built yet — building `brg-campaign-analyst` is what Demo 1 walks through.

## What's here
- `CLAUDE.md` — project facts and the never-acts-alone rule.
- `dashboard/` — the mock ad platform MCP server and its live viewer. `dashboard/memory/campaign-memory.json` is seeded with one low-confidence `virtual-tour` lesson from a prior week, for 142 Ashgrove Lane. **Pending:** the seeded memory file is not in this folder yet and will be added from the clean copy. Until then, the server creates an empty memory file on first run.
- `demo2-replay/` — a five-week replay memory file and an archive file, used only in Demo 2's context-rot segment. Swap `brg-five-week-replay-memory.json` in over the live memory file for that segment, then restore the seeded starting file afterward.

## One-time setup
```
cd dashboard
npm install
claude mcp add mock-ad-platform -- node "$(pwd)/server.js"
```
Then, in a separate terminal tab, from the same `dashboard` folder:
```
npm run dashboard
```
Open `http://localhost:4319` and leave the tab open.

## What you build
A subagent at `.claude/agents/brg-campaign-analyst.md`: reads Meta Ads performance and memory (`get_performance`, `query_memory` only — no launch or pause tools), validates the data, and writes a proposal. A person launches variants and approves every change from the main session.

The Solution activity is a separate, learner-facing folder using a different property (204 Willowmere Court) — see `../starter/` (not this folder).
