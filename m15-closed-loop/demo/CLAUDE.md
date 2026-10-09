# Bellwood Realty Group 

This project runs a closed loop for a Bellwood Realty Meta Ads test campaign: performance data comes in from the mock ad platform's MCP server, memory sits in the middle and holds what the loop has learned, and a proposal for the next round goes out for a person to approve.

## Facts
- Company: Bellwood Realty Group.
- Test campaign: 142 Ashgrove Lane open house, see `brg-campaign-brief.md` if present, or the on-screen brief for this demo.
- Memory file: `dashboard/memory/campaign-memory.json` — already seeded with one lesson from a prior week's testing.
- The `dashboard/` folder's live viewer is called the **Performance Console**.
- MCP server: `mock-ad-platform` — not yet connected. Run the one-time setup steps on the Demo 1 page before building the agent.

## Workflow rule
Nothing built in this project launches, pauses, or rebudgets a live campaign on its own. A person launches variants and approves every recommendation. The agent's job is to read performance, validate it, and propose — never to act.
