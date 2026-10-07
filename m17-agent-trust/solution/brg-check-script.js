#!/usr/bin/env node
// brg-check-script.js — deterministic checks for brg-influencer-scout research.
// Reads one research file written by brg-influencer-scout (research/<handle>.json)
// and checks it against the rules below. The follower range comes from brg-campaign-brief.md, so
// changing the range means editing the brief, not this file.
// Gives the same answer every time it runs. No AI model is involved.
//
// Usage:
//   node brg-check-script.js <research-file.json>

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const BRIEF = path.join(ROOT, "brg-campaign-brief.md");

const DISCLOSURE_MARKERS = ["paid partnership", "#ad", "#sponsored"];
const PUBLIC_CONTACT_SOURCES = ["profile bio", "contact button", "business website"];
const ENGAGEMENT_TOLERANCE = 0.002; // allows for rounding in the scout's own math

const isUrl = (value) => typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim());

function readFollowerRange() {
  const brief = fs.readFileSync(BRIEF, "utf-8");
  const m = brief.match(/Follower range:\**\s*([\d,]+)\s*[–-]\s*([\d,]+)/i);
  if (!m) throw new Error("Couldn't find the follower range in brg-campaign-brief.md");
  return [Number(m[1].replace(/,/g, "")), Number(m[2].replace(/,/g, ""))];
}

// ---- Check 1: every statistic has a source link ----------------------------
function checkSources(p) {
  const problems = [];
  const sources = p.sources || {};
  if (!isUrl(sources.followers)) problems.push("follower count has no source link");
  if (!isUrl(sources.engagement)) problems.push("engagement rate has no source link");
  return problems;
}

// ---- Check 2: follower count is inside the brief's range -------------------
function checkFollowerRange(p, [min, max]) {
  if (typeof p.followers !== "number") return ["follower count is missing"];
  if (p.followers < min || p.followers > max) {
    return [`${p.followers.toLocaleString("en-US")} followers is outside the brief's range of ${min.toLocaleString("en-US")}–${max.toLocaleString("en-US")}`];
  }
  return [];
}

// ---- Check 3: every sponsored post carried a paid-partnership disclosure ---
function checkSponsoredDisclosure(p) {
  const problems = [];
  for (const post of p.sponsored_history || []) {
    const shown = String(post.disclosure_shown || "").toLowerCase();
    if (!DISCLOSURE_MARKERS.some((marker) => shown.includes(marker))) {
      problems.push(`sponsored post "${post.post || "(no summary)"}" has no paid-partnership disclosure`);
    }
  }
  return problems;
}

// ---- Check 4: contact details come from a public, business-facing source --
function checkContactSource(p) {
  const c = p.contact || {};
  const problems = [];
  if (!c.value) problems.push("no contact details");
  if (!isUrl(c.source)) problems.push("contact details have no source link");
  if (!PUBLIC_CONTACT_SOURCES.includes(String(c.source_type || "").toLowerCase())) {
    problems.push(`contact came from "${c.source_type || "unknown"}", not a profile bio, contact button, or business website`);
  }
  return problems;
}

// ---- Check 5: the outreach email asks for a paid-partnership label ---------
function checkEmailAsksForLabel(p) {
  const email = String(p.outreach_email || "").toLowerCase();
  if (!email) return ["outreach email is missing"];
  const asksForLabel = /paid[\s-]partnership/.test(email) && /\b(label|labell?ed|tag|tagged|mark|marked|disclose|flag)\b/.test(email);
  return asksForLabel ? [] : ["outreach email doesn't ask the creator to label the post as a paid partnership"];
}

// ---- Extra: the scout's own engagement math adds up ------------------------
function checkEngagementMath(p) {
  const b = p.engagement_basis || {};
  if (typeof p.followers !== "number" || typeof p.engagement_rate !== "number" || b.avg_likes == null || b.avg_comments == null) {
    return ["can't recheck engagement rate: followers, engagement_rate, avg_likes, or avg_comments is missing"];
  }
  const expected = (b.avg_likes + b.avg_comments) / p.followers;
  if (Math.abs(expected - p.engagement_rate) > ENGAGEMENT_TOLERANCE) {
    return [`engagement rate reported as ${(p.engagement_rate * 100).toFixed(2)}%, but (avg likes + avg comments) / followers = ${(expected * 100).toFixed(2)}%`];
  }
  return [];
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node brg-check-script.js <research-file.json>");
    process.exit(2);
  }
  const profile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), "utf-8"));
  const range = readFollowerRange();

  const results = [
    { name: "Every statistic has a source link", problems: checkSources(profile) },
    { name: "Follower count inside the brief's range", problems: checkFollowerRange(profile, range) },
    { name: "Sponsored posts disclosed as paid partnerships", problems: checkSponsoredDisclosure(profile) },
    { name: "Contact from a public, business-facing source", problems: checkContactSource(profile) },
    { name: "Outreach email asks for a paid-partnership label", problems: checkEmailAsksForLabel(profile) },
    { name: "Extra: engagement math adds up", problems: checkEngagementMath(profile) },
  ];

  const total = results.reduce((n, r) => n + r.problems.length, 0);
  console.log(`CHECK RESULTS: ${profile.handle || path.basename(file)}\n`);
  for (const r of results) {
    console.log(`${r.problems.length ? "FAIL" : "PASS"}  ${r.name}`);
    for (const p of r.problems) console.log(`        ${p}`);
  }
  const outOfRange = results[1].problems.length > 0;
  const onlyRange = outOfRange && total === results[1].problems.length;
  console.log(`\nResult: ${total ? `FAIL (${total} problem${total === 1 ? "" : "s"})` : "PASS"}`);
  if (onlyRange) console.log("Note: the only failure is the follower range. That's out of scope for this campaign, not a research error.");
  process.exit(total ? 1 : 0);
}

main();
