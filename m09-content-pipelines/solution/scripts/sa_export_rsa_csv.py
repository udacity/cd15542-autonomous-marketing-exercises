#!/usr/bin/env python3
"""Aggregate headlines + descriptions into a Google Ads Editor-compatible RSA CSV.

This is deliberately the "dumb" step in the pipeline — the intelligence
(voice, claims, character-fit) already happened in the two sub-agents. This
script only merges and formats. It re-validates lengths on the way out as a
safety net, but it does not rewrite copy.

Input: a JSON file shaped like:

    {
      "campaign": "Momentum Collection Launch",
      "final_url": "https://solsticeactive.com/momentum",
      "path1": "momentum",
      "path2": "leggings",
      "ad_groups": ["Momentum Leggings", "Momentum Joggers"],
      "headlines": ["...", ... exactly 15],
      "descriptions": ["...", ... exactly 4]
    }

"ad_groups" is optional — omit it (or leave it empty) to get a single row
under "Ad Group 1". One CSV row is written per ad group, all sharing the
same headline/description set, matching how a single RSA is duplicated
across ad groups in Google Ads Editor's bulk-upload format.

If --out is omitted, the script writes to output/ using an auto-generated,
collision-safe filename: `sa-<campaign-slug>-rsa-<YYYY-MM-DD>.csv`. If a file
with that name already exists (i.e. this campaign was already exported
today), an HHMMSS timestamp is appended instead of overwriting it:
`sa-<campaign-slug>-rsa-<YYYY-MM-DD>-<HHMMSS>.csv`.

Usage:
    python3 sa_export_rsa_csv.py --input aggregated.json
    python3 sa_export_rsa_csv.py --input aggregated.json --out output/custom-name.csv
"""
import argparse
import csv
import json
import os
import re
import sys
from datetime import date, datetime

HEADLINE_LIMIT = 30
DESCRIPTION_LIMIT = 90
PATH_LIMIT = 15
NUM_HEADLINES = 15
NUM_DESCRIPTIONS = 4

COLUMNS = (
    ["Campaign", "Ad Group"]
    + [f"Headline {i}" for i in range(1, NUM_HEADLINES + 1)]
    + [f"Description {i}" for i in range(1, NUM_DESCRIPTIONS + 1)]
    + ["Path 1", "Path 2", "Final URL"]
)


def validate(data):
    errors = []
    headlines = data.get("headlines", [])
    descriptions = data.get("descriptions", [])

    if len(headlines) != NUM_HEADLINES:
        errors.append(f"expected exactly {NUM_HEADLINES} headlines, got {len(headlines)}")
    if len(descriptions) != NUM_DESCRIPTIONS:
        errors.append(f"expected exactly {NUM_DESCRIPTIONS} descriptions, got {len(descriptions)}")

    for i, h in enumerate(headlines, 1):
        if len(h) > HEADLINE_LIMIT:
            errors.append(f"Headline {i} is {len(h)} chars (limit {HEADLINE_LIMIT}): {h!r}")
    for i, d in enumerate(descriptions, 1):
        if len(d) > DESCRIPTION_LIMIT:
            errors.append(f"Description {i} is {len(d)} chars (limit {DESCRIPTION_LIMIT}): {d!r}")

    for key in ("path1", "path2"):
        val = data.get(key, "")
        if val and len(val) > PATH_LIMIT:
            errors.append(f"{key} is {len(val)} chars (limit {PATH_LIMIT}): {val!r}")

    if len(set(headlines)) != len(headlines):
        errors.append("duplicate headline text found")

    if not data.get("campaign"):
        errors.append("missing 'campaign'")
    if not data.get("final_url"):
        errors.append("missing 'final_url'")

    return errors


def slugify(text):
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "campaign"


def default_output_path(campaign, out_dir="output"):
    slug = slugify(campaign)
    today = date.today().isoformat()
    path = os.path.join(out_dir, f"sa-{slug}-rsa-{today}.csv")
    if os.path.exists(path):
        stamp = datetime.now().strftime("%H%M%S")
        path = os.path.join(out_dir, f"sa-{slug}-rsa-{today}-{stamp}.csv")
    return path


def build_rows(data):
    ad_groups = data.get("ad_groups") or ["Ad Group 1"]
    headlines = data["headlines"]
    descriptions = data["descriptions"]
    rows = []
    for ad_group in ad_groups:
        row = {"Campaign": data["campaign"], "Ad Group": ad_group}
        for i, h in enumerate(headlines, 1):
            row[f"Headline {i}"] = h
        for i, d in enumerate(descriptions, 1):
            row[f"Description {i}"] = d
        row["Path 1"] = data.get("path1", "")
        row["Path 2"] = data.get("path2", "")
        row["Final URL"] = data["final_url"]
        rows.append(row)
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input", required=True, help="Path to the aggregated JSON object")
    ap.add_argument(
        "--out",
        help="Path to write the CSV. If omitted, an auto-generated, "
        "collision-safe path under output/ is used (date-stamped, with an "
        "HHMMSS suffix added if today's file for this campaign already exists).",
    )
    args = ap.parse_args()

    with open(args.input, encoding="utf-8") as f:
        data = json.load(f)

    errors = validate(data)
    if errors:
        print("ERROR: export blocked — fix these before generating the CSV:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    out_path = args.out or default_output_path(data["campaign"])
    out_dir = os.path.dirname(out_path)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    rows = build_rows(data)
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=COLUMNS)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} row(s) to {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
