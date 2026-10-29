# Module 05 Solution: Scheduling the Weekly Marketing Operations Brief

Run the steps below in order from this folder in Claude Code to follow along with the solution video.

First, create the `gsj-marketing-ops` GitHub repo, turn on notifications, create a fine-grained personal access token for that repo, and add the GitHub MCP server, as described in `starter/INSTRUCTIONS.md`. Run `/mcp` to confirm it's connected. The `gsj-marketing-ops-brief` skill is installed in `.claude/skills/`, so Claude Code finds it from this folder.

**P1: Read-only connection test**
```
List open issues in gsj-marketing-ops tagged routine-failure.
```
Expected: no failures, because nothing has run yet.

**P2: Schedule the routine**
```
/schedule Turn gsj-marketing-ops-brief into a weekly routine, Fridays at 8:30 am.
Commit the output directly to /marketing/ops-briefs-preview/{date}.md in gsj-marketing-ops, pushing directly to the main branch.

When the brief runs successfully, open a GitHub issue titled
"Brief Published - {date}" with a link to the committed file, and assign it to aireadygrowthlab.

If the run fails for any reason, open a GitHub issue titled
"ROUTINE FAILED - Marketing Ops Brief - {date}" tagged routine-failure, include the error in the issue body, and assign it to aireadygrowthlab.
```
Replace `aireadygrowthlab` with your own GitHub username.
