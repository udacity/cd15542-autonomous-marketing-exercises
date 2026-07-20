---
name: gsj-competitor-juice
description: Weekly competitive and news research on US juice bars and wellness-beverage brands for a marketing team, delivered as a PDF committed to the repo.
---

# Juice Bar Competitor Research

Research recent news and competitive activity from US juice and
wellness-beverage brands, then deliver a dated PDF digest to the repo.

Two reference files define this skill's scope and output — read both before
starting:

- `references/competitor-list.md` — the tiered list of brands to search for
  (Tier 1 direct cold-pressed competitors, Tier 2 adjacent wellness shots,
  Tier 3 peripheral functional beverages), plus scoping notes on parent
  companies and exclusions.
- `references/report-outline.md` — the exact section-by-section structure the
  final report must follow.

## Steps

1. Read `references/competitor-list.md`. Search the web for news from the
   past 7 days on every brand listed, plus each brand's parent company (a lot
   of real news — pricing, distribution, reformulation — breaks at the parent
   level, e.g. PepsiCo for Naked/Poppi, Hain for BluePrint, Keurig Dr Pepper
   for Bai).

2. Collect items across: new menu items and reformulations (functional
   add-ins, adaptogens, protein, gut-health blends); openings, closings,
   expansions, franchise/distribution news; promotions, loyalty, pricing,
   limited-time offers; partnerships, sponsorships, influencer deals,
   rebrands; marketing campaigns and notable social/PR moments; funding,
   M&A, leadership changes; wellness-beverage trends these brands adopt.

3. Rank and select the top 10 items, weighting Tier 1 brands above Tier 2
   above Tier 3 per `references/competitor-list.md`. Drop anything older than
   7 days or purely local with no strategic read. If fewer than 10 genuinely
   relevant items surface, report fewer rather than padding with weak items —
   note the shortfall in the Methodology & gaps section.

4. Fill out `references/report-outline.md` exactly: top takeaways, the top 10
   news items (each with date, competitor, category, priority, source,
   what-happened, why-it-matters, and competitive angle), trends & watch
   list, and methodology & gaps. Do not drop or rename sections.

5. Render the completed outline to a PDF named
   `juice-competitors-<YYYY-MM-DD>.pdf`.

6. Save the PDF to the `research-output/` folder in the repo, commit it to a
   `claude/`-prefixed branch, and open a pull request. Create the folder if
   it doesn't exist.
