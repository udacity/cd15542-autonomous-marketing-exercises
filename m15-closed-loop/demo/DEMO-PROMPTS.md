# Module 15 Demo Prompts and Commands

The commands and prompts used on camera, in order.

## Demo 1: Setting Up the Ad Platform MCP with Memory

**One-time setup**
```
cd dashboard
npm install
claude mcp add mock-ad-platform -- node "$(pwd)/server.js"
```

**Start the Performance Console (separate terminal, from `dashboard/`)**
```
npm run dashboard
```
Then open `http://localhost:4319`.

**Check the connection (inside Claude Code, from this `demo/` folder)**
```
/mcp
```
Expected: `mock-ad-platform` connected, listing `get_performance`, `query_memory`, `launch_variant`, and `pause_variant`.

**P1: Build the analyst (plan mode, Shift+Tab)**
```
Create a subagent called brg-campaign-analyst. It reads ad performance through the mock-ad-platform MCP server, uses the memory file to decide what's new, and writes a proposal for the next round. It can't use any MCP tool that changes a campaign.
```
Confirm the plan's tools are `Read, Write, get_performance, query_memory` only.

**P2: Run the analyst**
```
Have brg-campaign-analyst read memory, then pull performance for v_seed_virtualtour, then write a proposal.
```
Expected: one `virtual-tour` lesson, confidence moves to `medium`, no duplicate entry, and a proposal in `proposals/`. The recorded proposal is `proposals/round-2-proposal.md`.

## Demo 2: Keeping Campaign Memory Healthy

**Replay copy command (from this `demo/` folder)**
```
cp demo2-replay/brg-five-week-replay-memory.json dashboard/memory/campaign-memory.json
```
Refresh the Performance Console to show the replayed weeks.

**Archive step.** Open `demo2-replay/brg-memory-archive.json` side by side with the live memory file. The stale `neighborhood-highlight` lesson is moved into the archive rather than deleted.

**Afterward,** restore the seeded memory file from your clean copy of this folder.
