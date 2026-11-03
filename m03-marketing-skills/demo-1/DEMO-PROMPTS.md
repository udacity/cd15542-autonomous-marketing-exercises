# Module 03 Demo 1: Authoring the Brand Voice Skill

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. The brand voice guide and the approved examples (`social-examples.md`, `email-examples.md`, `customer-service-examples.md`) are in this folder. To start over, run `git checkout -- . && git clean -fd` from this folder.

This demo uses Anthropic's `skill-creator` plugin. If it isn't installed, open `/plugin`, add Anthropic's official plugin marketplace, install `skill-creator`, and restart Claude Code. Type `/skill-creator` to invoke it before P1.

**P1: Create the brand voice skill (plan mode, Shift+Tab)**
```
Make a new skill called GSJ Brand Voice. It should review, edit, or write marketing copy for Groundswell Juice Company so it matches our brand voice. Use our brand voice guide to pull the personality traits, the brand words list, and the preferred terminology table from this into the skill. Use these as approved examples of the voice done right. Reference them, don't copy them into the skill body word for word
```
When asked where to install the skill, choose this project.

**P2: Test the skill (invoke it with `/`, then paste the sample caption after the prompt)**
```
Review this draft caption and flag anything off-brand.
```
Sample caption:
```
Great news — our cups are now 100% sustainable and compostable everywhere! We've always put the planet first, and this proves it. Clinically proven to break down faster than any cup on the market.
```
