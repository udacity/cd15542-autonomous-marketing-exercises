#!/usr/bin/env node
// PreToolUse guard for brg-campaign-analyst: Write is allowed only on the
// memory file and inside the proposals/ folder. Anything else is blocked.
import path from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;

const { tool_input } = JSON.parse(input || "{}");
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const target = path.resolve(root, tool_input?.file_path ?? "");

const memoryFile = path.join(root, "dashboard", "memory", "campaign-memory.json");
const proposalsDir = path.join(root, "proposals") + path.sep;

if (target === memoryFile || target.startsWith(proposalsDir)) process.exit(0);

console.error(
  `Blocked: brg-campaign-analyst may only write dashboard/memory/campaign-memory.json or files in proposals/. Refused: ${target}`
);
process.exit(2);
