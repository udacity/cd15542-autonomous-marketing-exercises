# Module 03 Demo 2: Authoring the Product Accuracy Skill

This folder is the starting point for Demo 2. Run the steps below in order from this folder in Claude Code to follow along with the video. The brand voice skill from Demo 1 and the product accuracy skill are already in `.claude/skills/`. The product accuracy skill and its claims tracker still say cups are compostable in 40 of 55 cities. To start over, run `git checkout -- . && git clean -fd` from this folder.

**P3: Update the skill (new session)**
```
Update the GSJ product accuracy skill. We no longer say cups are compostable in 40 of 55 cities. It’s now 47 of 55. Update the claims tracker and make sure the skill reflects the new number and not the old number.
```

**P4: Test caption (new session; paste it without invoking the skill)**
```
We're proud to share that our cups are now compostable in commercial facilities in 40 of our 55 cities, with more markets coming online every season. If your city isn't covered yet, the cup is still accepted in most standard recycling programs.
```
Expected: Claude invokes the product accuracy skill on its own, also checks the brand voice skill, and says not to send the copy.
