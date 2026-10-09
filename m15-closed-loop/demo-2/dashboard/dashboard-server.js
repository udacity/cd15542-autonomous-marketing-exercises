#!/usr/bin/env node
// Tiny local viewer for campaign-memory.json — separate from the MCP server
// (which must stay stdio-only). Zero dependencies, no CDN calls, just Node's
// built-in http module serving one HTML page and one JSON endpoint.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMORY_FILE = path.join(__dirname, "memory", "campaign-memory.json");
const INDEX_FILE = path.join(__dirname, "dashboard.html");
const PORT = process.env.PORT ? Number(process.env.PORT) : 4319;

const server = createServer(async (req, res) => {
  if (req.url === "/api/memory") {
    try {
      const raw = await readFile(MEMORY_FILE, "utf-8");
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(raw);
    } catch {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ variants: [] }));
    }
    return;
  }

  try {
    const html = await readFile(INDEX_FILE, "utf-8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    res.writeHead(500);
    res.end("dashboard.html not found");
  }
});

server.listen(PORT, () => {
  console.log(`Performance Console running at http://localhost:${PORT}`);
  console.log("Leave this running in a terminal tab while you work through activity-guide.md.");
});
