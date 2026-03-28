# Evergreen Hub Upgrade Runbook

Use this runbook for the related hub and index layers:

- `/activities/`
- `/islands/`
- `/practical-info/`
- `/blog/`
- `/itineraries/`
- related category, tag, and slug pages where the hub system still behaves as thin or affiliate-first

## Purpose

These routes should behave as editorial navigation layers, not affiliate directories. They need to group users into strong next clicks, support the paired editorial pillars, and stay clean enough for AdSense and EEAT review.

## Paired-Track Order

Work the clusters in this order:

1. beaches + islands
2. temples + practical-info links where relevant
3. street food + supporting blog links where relevant
4. activities support pages
5. itineraries cleanup

Keep the hub routes paired to the strongest pillar pages they support. Remove weak cross-links rather than spraying more of them.

## Quality Rules

- Use web search for materially unstable claims.
- Prefer official sources, Tourism Authority of Thailand, UNESCO, Fine Arts Department, MICHELIN, official venue or operator pages, transport authorities, and other primary references.
- Show visible source links when the route template supports them.
- Remove generic "best deals", "guest reviews", and similar scrape-era copy.
- Remove or demote weak internal links.
- Do not let booking widgets, partner promotions, or urgency modules dominate the page.
- Record an explicit indexing decision for every route.
- Keep thin or transitional routes noindex until they genuinely clear the quality bar.

## Tracker Rules

- Update the tracker after every route-level change.
- Keep `status`, `needs_rewrite`, `sources_verified`, `render_validated`, `indexing_decision`, and `notes` current on every route.
- Run `jq empty evergreen-hub-upgrade-tracker.json` after each tracker edit.
- Keep `execution.next_pending` aligned with the first route whose `status` is not `done`.

## Validation Before Marking a Route Done

Run all of these before changing a route to `done`:

- `jq empty evergreen-hub-upgrade-tracker.json`
- `npx tsc --noEmit`
- localhost render check for the route
- rendered HTML leak scan for affiliate, review, scrape-era, and thin-navigation markers
- visible source-signal check in rendered HTML
- indexing decision recorded in the tracker

## Done Definition

A route is done only when:

- it returns HTTP 200 locally
- the rendered HTML is clean of stale affiliate and review leakage
- visible source signals are present where the template supports them
- source-backed claims are verified
- the route has a recorded indexing decision
- the route behaves like a credible navigation or discovery layer

