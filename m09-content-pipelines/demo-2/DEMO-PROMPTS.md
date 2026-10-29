# Module 09 Demo 2: Building the Descriptions Sub-Agent and Handoff

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The headlines sub-agent from Demo 1 and the descriptions sub-agent are in `.claude/agents/`, and the orchestration rules are in `CLAUDE.md`. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P2: Generate the headlines and hand off**
```
Use the @.claude/agents/sa-rsa-headlines-agent.md to generate headlines from @briefs/sa-momentum-launch-brief.md
```
When Claude asks whether to run the descriptions agent, and then whether to combine the two outputs, answer yes.

Expected: 15 headlines, then 4 descriptions, then one merged set of headlines and descriptions ready for CSV export.
