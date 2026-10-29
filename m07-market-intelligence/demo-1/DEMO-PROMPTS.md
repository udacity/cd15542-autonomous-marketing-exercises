# Module 07 Demo 1: Configuring Multi-Source Input

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. The competitor list is in `.claude/skills/sa-competitor-watch/references/`. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P1: Plan the agent (plan mode, Shift+Tab)**
```
I want to build a market intelligence agent for Solstice Active, our direct to consumer athleisure brand. It should sweep 3 sources. That's your general search, news, AI citation against our competitor list, which you will find in our project folder. Produce a weekly intelligence brief with four sections: competitor moves, category trends, AI citation watch, and recommended action. Use only Anthropic’s built-in web search and web fetch tools, run it on Sonnet 5, and make sure nothing publishes without a human reviewing it first. Walk me through how you'd set it up before building anything.
```
Review the plan, then approve it so Claude builds the agent.

**P2: Test the three sources**
```
Run the three seeded input-source queries from the sa-market-intelligence-agent - don't draft the full brief yet. I just want to see each source's result: Web Search for 'Vuori news August 2026', News for 'Alo Yoga press release August 2026', and AI Citation Watch for 'best leggings for running.'
```
Expected: raw results grouped by source, with links. No brief is drafted.
