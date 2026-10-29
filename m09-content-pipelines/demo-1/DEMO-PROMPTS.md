# Module 09 Demo 1: Building the Headlines Sub-Agent

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. The headlines sub-agent is in `.claude/agents/`, and the campaign brief is in `briefs/`. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P1: Generate the headlines**
```
Use the @.claude/agents/sa-rsa-headlines-agent.md to generate headlines from @briefs/sa-momentum-launch-brief.md
```
Expected: 15 headlines, each under 30 characters. The pipeline stops before descriptions and asks whether to continue.
