# Evergreen Editorial Upgrade Runbook

Use this runbook for the nationwide editorial pillars:

- `/best-beaches-in-thailand/`
- `/thailand-islands/`
- `/thailand-temples/`
- `/thailand-street-food/`
- `/best-cooking-classes-in-thailand/`
- `/best-muay-thai-in-thailand/`
- `/best-elephant-sanctuaries-in-thailand/`
- `/best-diving-snorkeling-in-thailand/`

## Purpose

These pages should read like real editorial planning assets, not thin listicles or affiliate wrappers. Each route must be source-backed, internally coherent, visibly trustworthy in rendered HTML, and free of stale commercial filler.

## Paired-Track Order

Work the clusters in this order:

1. beaches + islands
2. temples + practical-info links where relevant
3. street food + supporting blog or hub links where relevant
4. cooking classes + activities
5. muay thai + activities
6. elephant sanctuaries + activities
7. diving and snorkeling + activities

Treat the paired routes as one editorial system. Do not mark one side of a cluster done while the paired internal-link structure is still weak.

## Quality Rules

- Use web search for materially unstable facts.
- Prefer official sources, Tourism Authority of Thailand, UNESCO, Fine Arts Department, MICHELIN, official venue or operator pages, transport authorities, and other primary references.
- Do not invent first-person stories, insider anecdotes, or fake review framing.
- Do not keep generic AI filler or scrape-era marketing language.
- Do not keep unsupported exact price claims unless the source is strong enough to defend them.
- Keep visible source links or source signals in rendered HTML when the template supports them.
- Keep affiliate links secondary to editorial value.
- Remove TripAdvisor-style review spam, rating fluff, and urgency copy such as "best deals" or "current prices" unless a claim is genuinely defensible.

## Tracker Rules

- Update the tracker after every route-level change.
- Keep `status`, `needs_rewrite`, `sources_verified`, `render_validated`, `indexing_decision`, and `notes` current on every route.
- Run `jq empty evergreen-editorial-upgrade-tracker.json` after each tracker edit.
- Keep `execution.next_pending` aligned with the first route whose `status` is not `done`.

## Validation Before Marking a Route Done

Run all of these before changing a route to `done`:

- `jq empty evergreen-editorial-upgrade-tracker.json`
- `npx tsc --noEmit`
- localhost render check for the route
- rendered HTML leak scan for affiliate, review, scrape-era, and first-person filler markers
- visible source-signal check in rendered HTML
- indexing decision recorded in the tracker

## Done Definition

A route is done only when:

- it returns HTTP 200 locally
- the rendered HTML is clean of stale affiliate and review leakage
- visible source signals are present where the template supports them
- source-backed claims are verified
- the route has a recorded indexing decision
- the paired cluster remains internally coherent

