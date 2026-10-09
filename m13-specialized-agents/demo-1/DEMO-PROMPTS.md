# Module 13 Demo 1: Building the Auditor

This folder is the starting point for Demo 1. Run the steps below in order from this folder in Claude Code to follow along with the video. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P1: Build the auditor (plan mode, Shift+Tab)**
```
Create a subagent called brg-brand-auditor. It only reviews marketing content. Before it audits anything, it loads the brg-brand-voice and brg-fair-housing-accuracy skills. It can read files and invoke skills, but never write or edit them. Every finding must cite the skill and the rule it's based on. Ask me any questions before you build it.
```

**P2: Answer to the clarifying question**
```
Flag it as unverified and leave the decision to a person. Don't fill the gap with general knowledge about real estate. Use the opus model.
```

**P3: Audit the test email**
```
Use the brg-brand-auditor to audit test-content/brg-test-email.md.
```
Expected: 2 blockers. "3 full baths" (brg-fair-housing-accuracy rule 1; the sheet says 2.5) and "empty nesters" (brg-brand-voice rule 2).
