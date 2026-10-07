# Module 15 Solution Activity — Prompts

**What's new here:** in the demos, you watched one round run on a campaign already in progress. This time you run the whole loop yourself, on a property the demos never touched, for two full rounds — and the brand-safety auditor sits between every drafted angle and the moment it launches.

The `brg-campaign-analyst` and `brg-brand-auditor` subagents are already built for you. Your job is to run the loop and make the approve/reject calls a person has to make.

## Step 1 — Read the brief and the workflow yourself
Open `brg-campaign-brief.md` and `CLAUDE.md` side by side. Note the six angle tags and which one is reserved. Read the nine-step workflow order in `CLAUDE.md` — you'll be doing each of these steps by hand this round.

## Step 2 — Confirm the MCP connection
Run `/mcp` inside Claude Code. Confirm `mock-ad-platform` shows connected before you draft anything — if it's not connected, the failure only shows up later, mid-run.

## Step 3 — Draft round one and get it past the auditor
Write one variant per angle for the five round-one tags (leave the reserved tag out). Then:

> Use brg-brand-auditor to review these drafts before anything launches.

If it blocks anything, fix only what the finding cites and run the auditor again. Nothing launches until every drafted angle passes.

## Step 4 — Launch round one
You launch the approved variants yourself, from the main session, using the MCP server's `launch_variant` tool — `brg-campaign-analyst` never launches anything; it has no tool for that.

## Step 5 — Pull performance and validate on purpose
Pull performance for each variant twice, a few minutes apart. Before trusting the numbers, test validation deliberately: plant the bad row in `test-data/brg-zero-spend-row.json` and confirm it gets flagged and excluded, not folded into the analysis.

## Step 6 — Read memory and write your own checkpoint note
> Have brg-campaign-analyst read memory and write round-one lessons with confidence levels.

Open the memory file and read what it wrote. Then, in your own words, write a short checkpoint note: which angles are winning, which are losing, and how much you'd trust this after only two pulls per variant.

## Step 7 — Round two
> Have brg-campaign-analyst read memory and propose a new set of angles, each citing the memory entry that justifies it.

Run any new or changed drafts through `brg-brand-auditor` again before they launch — the auditor checks every round, not just the first. Approve what the evidence supports; reject anything that outruns two rounds of data, and log your reason. Launch the approved angles and pull performance twice each.

## Step 8 — Close the loop
Call `query_memory` once more and compare round one's aggregate numbers to round two's. Write a short before-and-after note: did round two do better on average? If not, say plainly whether it looks like a data problem, a tag problem, or noise.

## Step 9 — Check your results
- Does round two look different from round one, or did it just repeat itself? If it repeated, check whether memory was actually read first.
- Did your planted bad row get caught?
- Did you reject at least one thing on evidence grounds, with a reason on record?
- Did the auditor catch anything in round two that it didn't need to catch in round one?

Compare with `../solution-key/` **after** you finish. Focus on whether your loop closed and whether you caught what the auditor was built to catch. Your exact angle wording and confidence levels may differ.
