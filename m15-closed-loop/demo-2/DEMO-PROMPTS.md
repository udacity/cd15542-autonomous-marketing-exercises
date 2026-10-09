# Module 15 Demo 2: Keeping Campaign Memory Healthy

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The `brg-campaign-analyst` subagent from Demo 1 and its proposal are already here. Run the one-time setup first, because each workspace has its own MCP registration. To start over, run `git checkout -- . && git clean -fd` from this folder.

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

**Check the connection (inside Claude Code, from this folder)**
```
/mcp
```
Expected: `mock-ad-platform` connected, listing `get_performance`, `query_memory`, `launch_variant`, and `pause_variant`.

**Replay copy command (from this folder)**
```
cp demo2-replay/brg-five-week-replay-memory.json dashboard/memory/campaign-memory.json
```
Refresh the Performance Console to show the replayed weeks.

**Archive step.** Open `demo2-replay/brg-memory-archive.json` side by side with the live memory file. The stale `neighborhood-highlight` lesson is moved into the archive rather than deleted.

**Afterward,** restore the seeded memory file with `git checkout -- dashboard/memory/campaign-memory.json`.
