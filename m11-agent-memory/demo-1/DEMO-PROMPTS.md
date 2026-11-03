# Module 11 Demo 1: Transcript-to-Draft Generation with Skills

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. The `sa-customer-story-agent` is in `.claude/agents/`, the `sa-brand-voice` and `sa-product-accuracy` skills are in `.claude/skills/`, and the raw interview transcripts are in `transcripts/raw/`. The agent writes its draft to `drafts/`. To start over, run `git checkout -- . && git clean -fd` from this folder.

**Before P1: Set the agent's model to Haiku**

Open `.claude/agents/sa-customer-story-agent.md` and add `model: haiku` to the frontmatter, below the `tools:` line. Save the file.

**P1: Run the agent's first pass**
```
Run the sa-customer-story-agent.md and only complete the first pass with the sa-brand-voice skill.
```

**P2: Point the agent at Jordan's transcript**
```
Inside the transcripts/raw folder, pull Jordan's transcript and run the sa-customer-story-agent.md. Only complete the first pass with the sa-brand-voice skill before proceeding.
```
Expected: a brand-voice draft of Jordan's case study in `drafts/`. The product accuracy audit has not run yet.
