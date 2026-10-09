#!/usr/bin/env node
// brg-check-script.js — deterministic checks for Bellwood Realty listing copy (Module 17).
// Provided to learners. Nobody needs to edit this file to change the rules:
//   - listing facts come from the listing sheet in listings/
//   - the required disclosure and the banned-phrase list come from brand/brg-brand-bible.md
// Gives the same answer every time it runs. No AI model is involved.
//
// Usage:
//   node brg-check-script.js <copy-file> [listing-sheet]
// If the listing sheet is left out, it's matched by file name: live-copy/brg-118-fenwick-court.md
// is checked against listings/brg-118-fenwick-court.md.

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const BRAND_BIBLE = path.join(ROOT, "brand", "brg-brand-bible.md");
const LISTINGS_DIR = path.join(ROOT, "listings");

function read(file) {
  return fs.readFileSync(file, "utf-8");
}

function toNumber(text) {
  return Number(String(text).replace(/[$,]/g, ""));
}

// ---- Read the rules -------------------------------------------------------

function readListingFacts(file) {
  const facts = {};
  for (const line of read(file).split(/\r?\n/)) {
    const row = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
    if (!row) continue;
    const field = row[1].toLowerCase();
    const value = row[2];
    const num = value.match(/[\d,.]+/);
    if (!num) continue;
    if (field === "bedrooms") facts.bedrooms = toNumber(num[0]);
    if (field === "bathrooms") facts.bathrooms = toNumber(num[0]);
    if (field === "square footage") facts.sqft = toNumber(num[0]);
    if (field === "list price") facts.price = toNumber(num[0]);
    if (field === "hoa fee") facts.hoa = toNumber(num[0]);
  }
  return facts;
}

function readBrandRules() {
  const lines = read(BRAND_BIBLE).split(/\r?\n/);
  const banned = [];
  const disclosure = [];
  let section = "";
  for (const line of lines) {
    if (/^#{2,3}\s/.test(line)) {
      section = line.toLowerCase();
      continue;
    }
    if (section.includes("banned phrases") && /^\s*-\s+\S/.test(line)) {
      banned.push(line.replace(/^\s*-\s+/, "").trim().toLowerCase());
    }
    if (section.includes("required disclosure") && /^\s*>/.test(line)) {
      disclosure.push(line.replace(/^\s*>\s?/, "").trim());
    }
  }
  return { banned, disclosure: disclosure.join(" ").trim() };
}

// ---- The three checks -----------------------------------------------------

function checkNumbers(lines, facts) {
  const problems = [];
  const patterns = [
    { key: "bedrooms", label: "bedrooms", re: /(\d+(?:\.\d+)?)[\s-]*(?:bed(?:room)?s?|br)\b/gi },
    { key: "bathrooms", label: "bathrooms", re: /(\d+(?:\.\d+)?)[\s-]*(?:bath(?:room)?s?|ba)\b/gi },
    { key: "sqft", label: "sq ft", re: /([\d,]{3,})\s*(?:sq\.?\s*ft\.?|square\s+feet|sqft)/gi },
  ];
  lines.forEach((line, i) => {
    for (const p of patterns) {
      if (facts[p.key] == null) continue;
      for (const m of line.matchAll(p.re)) {
        const found = toNumber(m[1]);
        if (found !== facts[p.key]) {
          problems.push(`line ${i + 1}: says ${m[0].trim()} — listing sheet says ${facts[p.key].toLocaleString("en-US")} ${p.label}`);
        }
      }
    }
    for (const m of line.matchAll(/\$\s?([\d,]+(?:\.\d+)?)/g)) {
      const found = toNumber(m[1]);
      const before = line.slice(Math.max(0, m.index - 25), m.index);
      const after = line.slice(m.index + m[0].length, m.index + m[0].length + 15);
      const isHoa = /hoa/i.test(before) || /^\s*(\/\s*mo|per month|a month|monthly)/i.test(after);
      if (isHoa && facts.hoa != null && found !== facts.hoa) {
        problems.push(`line ${i + 1}: says HOA $${found.toLocaleString("en-US")} — listing sheet says $${facts.hoa.toLocaleString("en-US")}/month`);
      } else if (!isHoa && found >= 10000 && facts.price != null && found !== facts.price) {
        problems.push(`line ${i + 1}: says price $${found.toLocaleString("en-US")} — listing sheet says $${facts.price.toLocaleString("en-US")}`);
      }
    }
  });
  return problems;
}

function checkDisclosure(text, disclosure) {
  const normalized = text.replace(/^\s*>\s?/gm, "").replace(/\s+/g, " ");
  return normalized.includes(disclosure)
    ? []
    : ["the equal-housing disclosure from the brand bible is missing or not word for word"];
}

function checkBannedPhrases(lines, banned) {
  const problems = [];
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    for (const phrase of banned) {
      if (lower.includes(phrase)) problems.push(`line ${i + 1}: banned phrase "${phrase}"`);
    }
  });
  return problems;
}

// ---- Run --------------------------------------------------------------------

function findListingSheet(copyFile) {
  const base = path.basename(copyFile, ".md");
  const match = fs
    .readdirSync(LISTINGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((name) => base.startsWith(name))
    .sort((a, b) => b.length - a.length)[0];
  return match ? path.join(LISTINGS_DIR, `${match}.md`) : null;
}

function main() {
  const copyArg = process.argv[2];
  if (!copyArg) {
    console.error("Usage: node brg-check-script.js <copy-file> [listing-sheet]");
    process.exit(2);
  }
  const copyFile = path.resolve(process.cwd(), copyArg);
  const sheet = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : findListingSheet(copyFile);
  if (!sheet || !fs.existsSync(sheet)) {
    console.error(`No listing sheet found for ${copyArg}. Pass one as the second argument.`);
    process.exit(2);
  }

  const text = read(copyFile);
  const lines = text.split(/\r?\n/);
  const facts = readListingFacts(sheet);
  const rules = readBrandRules();

  const results = [
    { name: "Numbers match the listing sheet", problems: checkNumbers(lines, facts) },
    { name: "Equal-housing disclosure, word for word", problems: checkDisclosure(text, rules.disclosure) },
    { name: "No banned phrases", problems: checkBannedPhrases(lines, rules.banned) },
  ];

  const total = results.reduce((n, r) => n + r.problems.length, 0);
  console.log(`CHECK RESULTS: ${path.relative(ROOT, copyFile)}`);
  console.log(`Checked against: ${path.relative(ROOT, sheet)} and brand/brg-brand-bible.md\n`);
  for (const r of results) {
    console.log(`${r.problems.length ? "FAIL" : "PASS"}  ${r.name}`);
    for (const p of r.problems) console.log(`        ${p}`);
  }
  console.log(`\nResult: ${total ? `FAIL (${total} problem${total === 1 ? "" : "s"})` : "PASS"}`);
  process.exit(total ? 1 : 0);
}

main();
