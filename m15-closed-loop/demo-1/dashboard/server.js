#!/usr/bin/env node
// Mock Ad Platform MCP server — a practice ad platform for learning the
// closed-loop optimization pattern (launch -> measure -> remember -> regenerate)
// without needing a real Meta Ads account.
//
// This server has NO knowledge of any specific brand. Angle tags and copy
// arrive as call arguments from whoever is using it. This copy is configured
// with Bellwood Realty Group's listing-campaign angle tags for Module 15.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMORY_DIR = path.join(__dirname, "memory");
const MEMORY_FILE = path.join(MEMORY_DIR, "campaign-memory.json");

// Hidden "true" performance bias per angle tag. The learner never sees this
// table directly — they only see it show up in the noisy numbers get_performance
// returns, the same way a real marketer only sees results, not ground truth.
const TAG_MULTIPLIERS = {
  "virtual-tour": 1.6,
  "neighborhood-highlight": 1.5,
  "low-hoa": 1.7, // new designed winner for the Module 15 Solution's 204 Willowmere Court campaign
  "walk-to-transit": 1.2,
  "agent-intro": 1.1,
  "open-house": 1.3,
  "local-agent": 1.1,
  "price-drop": 1.0,
  "generic-fee": 0.7, // plain, no-angle placeholder ad, included on purpose as the weak baseline
};
const DEFAULT_MULTIPLIER = 1.0;
const BASE_CTR = 0.022; // 2.2% baseline click-through rate
const BASE_CONVERSION_RATE = 0.05; // 5% of clicks convert, before tag effects

async function ensureMemoryFile() {
  if (!existsSync(MEMORY_DIR)) await mkdir(MEMORY_DIR, { recursive: true });
  if (!existsSync(MEMORY_FILE)) {
    await writeFile(MEMORY_FILE, JSON.stringify({ variants: [] }, null, 2));
  }
}

async function loadMemory() {
  await ensureMemoryFile();
  const raw = await readFile(MEMORY_FILE, "utf-8");
  return JSON.parse(raw);
}

async function saveMemory(memory) {
  await writeFile(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

function tagMultiplier(tags) {
  if (!tags || tags.length === 0) return DEFAULT_MULTIPLIER;
  const values = tags.map((t) => TAG_MULTIPLIERS[t] ?? DEFAULT_MULTIPLIER);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// Gaussian-ish jitter via sum of uniforms (cheap Irwin-Hall approximation),
// centered on 0, roughly bounded to +/- spread.
function jitter(spread) {
  return ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2 * spread;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

const server = new Server(
  { name: "mock-ad-platform", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const TOOLS = [
  {
    name: "launch_variant",
    description:
      "Publish a new ad variant into the simulated campaign. Returns a variant_id you'll use to pull performance later.",
    inputSchema: {
      type: "object",
      properties: {
        headline: { type: "string", description: "Ad headline text" },
        description: { type: "string", description: "Ad description/body text" },
        angle_tags: {
          type: "array",
          items: { type: "string" },
          description:
            "Labels describing the pitch this variant makes (e.g. 'open-house', 'virtual-tour', 'price-drop', 'neighborhood-highlight', 'local-agent', 'generic-fee'). Free-form, but consistent tags let query_memory compare like-for-like.",
        },
      },
      required: ["headline", "description", "angle_tags"],
    },
  },
  {
    name: "get_performance",
    description:
      "Pull simulated performance for a variant (impressions, clicks, CTR, conversions, spend, CPA). Each call simulates more flight time accumulating on top of prior pulls — call it more than once across a session to see how the numbers firm up.",
    inputSchema: {
      type: "object",
      properties: {
        variant_id: { type: "string" },
      },
      required: ["variant_id"],
    },
  },
  {
    name: "query_memory",
    description:
      "Read back everything launched so far, aggregated by angle tag, so you can decide what to do more of and what to drop. Optionally filter to specific tags.",
    inputSchema: {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Optional: only include variants carrying at least one of these tags.",
        },
      },
    },
  },
  {
    name: "pause_variant",
    description: "Stop a variant that's underperforming. Logged to memory like everything else.",
    inputSchema: {
      type: "object",
      properties: {
        variant_id: { type: "string" },
        reason: { type: "string", description: "Why you're pausing it (for the memory log)." },
      },
      required: ["variant_id"],
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const memory = await loadMemory();

  if (name === "launch_variant") {
    const variant_id = "v_" + crypto.randomBytes(4).toString("hex");
    const record = {
      variant_id,
      headline: args.headline,
      description: args.description,
      angle_tags: args.angle_tags ?? [],
      status: "active",
      launched_at: new Date().toISOString(),
      pulls: 0,
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
        ctr: null,
        cpa: null,
      },
      // hidden per-variant "true" rates, fixed at launch so repeated pulls
      // converge toward a consistent number rather than re-rolling from scratch
      _truth: {
        ctr: clamp(BASE_CTR * tagMultiplier(args.angle_tags), 0.002, 0.15),
        conv: clamp(BASE_CONVERSION_RATE * tagMultiplier(args.angle_tags), 0.005, 0.4),
        cpc: clamp(2.5 + jitter(0.8), 0.5, 6),
      },
      events: [{ type: "launched", at: new Date().toISOString() }],
    };
    memory.variants.push(record);
    await saveMemory(memory);
    return {
      content: [
        {
          type: "text",
          text: `Launched ${variant_id}: "${args.headline}" (tags: ${(args.angle_tags || []).join(", ") || "none"}). Call get_performance("${variant_id}") after a moment to see how it's doing.`,
        },
      ],
    };
  }

  if (name === "get_performance") {
    const v = memory.variants.find((x) => x.variant_id === args.variant_id);
    if (!v) {
      return { content: [{ type: "text", text: `No variant found with id ${args.variant_id}` }], isError: true };
    }
    // simulate another chunk of flight time landing
    const newImpressions = Math.round(300 + Math.random() * 600);
    const noisyCtr = clamp(v._truth.ctr + jitter(v._truth.ctr * 0.6), 0, 1);
    const newClicks = Math.round(newImpressions * noisyCtr);
    const noisyConv = clamp(v._truth.conv + jitter(v._truth.conv * 0.5), 0, 1);
    const newConversions = Math.round(newClicks * noisyConv);
    const newSpend = +(newClicks * v._truth.cpc).toFixed(2);

    v.pulls += 1;
    v.performance.impressions += newImpressions;
    v.performance.clicks += newClicks;
    v.performance.conversions += newConversions;
    v.performance.spend = +(v.performance.spend + newSpend).toFixed(2);
    v.performance.ctr = v.performance.impressions
      ? +(v.performance.clicks / v.performance.impressions).toFixed(4)
      : null;
    v.performance.cpa = v.performance.conversions
      ? +(v.performance.spend / v.performance.conversions).toFixed(2)
      : null;
    v.events.push({ type: "performance_pull", at: new Date().toISOString(), pull_number: v.pulls });

    await saveMemory(memory);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              variant_id: v.variant_id,
              pulls: v.pulls,
              cumulative_performance: v.performance,
              note:
                v.pulls === 1
                  ? "Only one pull so far — this number is noisy, call get_performance again later for a steadier read."
                  : `Based on ${v.pulls} pulls.`,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "query_memory") {
    const tags = args?.tags;
    const relevant = tags?.length
      ? memory.variants.filter((v) => v.angle_tags.some((t) => tags.includes(t)))
      : memory.variants;

    const byTag = {};
    for (const v of relevant) {
      for (const t of v.angle_tags) {
        byTag[t] ??= { variant_count: 0, total_impressions: 0, total_clicks: 0, total_conversions: 0, total_spend: 0 };
        byTag[t].variant_count += 1;
        byTag[t].total_impressions += v.performance.impressions;
        byTag[t].total_clicks += v.performance.clicks;
        byTag[t].total_conversions += v.performance.conversions;
        byTag[t].total_spend += v.performance.spend;
      }
    }
    const summary = Object.fromEntries(
      Object.entries(byTag).map(([tag, s]) => [
        tag,
        {
          variant_count: s.variant_count,
          avg_ctr: s.total_impressions ? +(s.total_clicks / s.total_impressions).toFixed(4) : null,
          avg_cpa: s.total_conversions ? +(s.total_spend / s.total_conversions).toFixed(2) : null,
        },
      ])
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              variants: relevant.map((v) => ({
                variant_id: v.variant_id,
                headline: v.headline,
                angle_tags: v.angle_tags,
                status: v.status,
                pulls: v.pulls,
                performance: v.performance,
              })),
              performance_by_tag: summary,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "pause_variant") {
    const v = memory.variants.find((x) => x.variant_id === args.variant_id);
    if (!v) {
      return { content: [{ type: "text", text: `No variant found with id ${args.variant_id}` }], isError: true };
    }
    v.status = "paused";
    v.events.push({ type: "paused", at: new Date().toISOString(), reason: args.reason ?? null });
    await saveMemory(memory);
    return { content: [{ type: "text", text: `Paused ${v.variant_id}.${args.reason ? " Reason logged: " + args.reason : ""}` }] };
  }

  return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
});

async function main() {
  await ensureMemoryFile();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Mock ad platform MCP server failed to start:", err);
  process.exit(1);
});
