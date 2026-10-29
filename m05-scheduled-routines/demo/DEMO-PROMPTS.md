# Module 05 Demo: Configuring a Weekly Routine That Invokes a Skill

This folder is the starting point for the demo. Run the steps below in order from this folder in Claude Code to follow along with the video. The `gsj-competitor-juice` skill, with its competitor list and report outline, is installed in `.claude/skills/` so Claude Code finds it from this folder. A copy to browse is in `competitor-watch/`. The video assumes GitHub is already connected to Claude. Run `/schedule list` first to see the routines you already have, so you don't create a duplicate. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P1: Schedule the weekly routine**
```
/schedule For every Monday at 10:37 PM. Run the gsj-competitor-juice skill. Give me 10 company updates.
```
