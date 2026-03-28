# City Support Cluster Design

**Date:** 2026-03-28

**Goal**

Upgrade the English `/city/[slug]/` support-route cluster into source-backed, non-thin, AdSense-safe, EEAT-oriented pages that match the quality level of the rebuilt city pages and city top-10 clusters.

## Product Intent

The city support layer should stop behaving like a mix of placeholder guides, affiliate-first side pages, and weak template spillover. Each city should have a coherent set of support routes that actually helps users plan a trip, deepens internal linking, and exposes visible editorial trust signals.

This work should make the support routes feel like a real planning cluster rather than leftover SEO appendages.

## Scope

### In scope

Treat the following as one city-level support cluster:

- `/city/[slug]/food/`
- `/city/[slug]/hotels/`
- `/city/[slug]/attractions/`
- `/city/[slug]/best-time-to-visit/`
- `/city/[slug]/budget/`
- `/city/[slug]/cooking-classes/`
- `/city/[slug]/muay-thai/`
- `/city/[slug]/elephant-sanctuaries/`
- `/city/[slug]/diving-snorkeling/`

Also in scope:

- shared templates and shared components used by those routes
- route-level SEO, indexing, schema, and trust-signal presentation
- internal linking across the city cluster
- cleanup of stale legacy content or affiliate-heavy template leaks that lower quality

### Out of scope

- rebuilding the main `/city/[slug]/` page unless a shared fix is required
- rebuilding already-finished `/city/[slug]/top-10-*` pages unless a shared fix is required
- adding new affiliate modules, widgets, or promotional blocks
- broad unrelated sitewide refactors

## Quality Bar

Every support route in the cluster must be:

- non-thin
- index-worthy only if the rendered page truly meets that bar
- AdSense-safe
- EEAT-oriented
- source-backed
- internally coherent with the rebuilt city cluster
- free of stale legacy claims in rendered HTML and `__NEXT_DATA__`

The support routes must avoid:

- generic AI travel copy
- invented first-person anecdotes
- fake insider framing
- TripAdvisor-style review spam
- unsupported exact price claims
- stale scrape-era claims about ratings, deals, or booking urgency
- affiliate-first layouts where monetization outruns planning value

## Source and Fact-Checking Rules

- Web search is mandatory for materially unstable facts.
- Memory alone is not sufficient for current claims about prices, schedules, official status, hotel positioning, transport access, or opening details.
- Prefer official sources, official venue pages, official hotel pages, airport or transport authorities, Tourism Authority of Thailand, MICHELIN, UNESCO, Fine Arts Department, national parks, and strong primary references.
- If a claim cannot be defended cleanly with current evidence, rewrite it into durable wording instead of keeping a brittle exact statement.
- Source links should be visible in the rendered page where the template supports them, not buried only in data files.

## Cluster Model

Each city gets one tracker status for the full support cluster. A city is only `done` when all nine support routes pass the runbook and render validation.

This is intentionally stricter than splitting the routes into multiple phases. The point is to prevent a city from looking complete while weak support pages still dilute the cluster.

## Route Roles

### `/food/`

Purpose:

- translate the city food angle into an actual eating guide
- connect city framing, top-10 restaurants, and useful practical food context

Should include:

- city-specific dining patterns
- neighborhood or area logic where relevant
- what to prioritize rather than generic “must-try everything” copy
- strong internal links to the city top-10 restaurants page and related strong pages

### `/hotels/`

Purpose:

- help users choose where and how to stay in the city
- explain area-fit, stay-shape, and hotel style rather than acting like a booking widget wrapper

Should include:

- city-specific stay zones or practical tradeoffs
- hotel examples only where they add planning value
- restrained source-backed hotel references

### `/attractions/`

Purpose:

- function as the city’s attraction hub
- connect the main city page, attraction detail pages, and top-10 attractions page

Should include:

- a useful planning frame for how to approach the city’s sights
- links only to strong attraction detail pages
- no blanket claims about fees or hours unless defended

### `/best-time-to-visit/`

Purpose:

- give seasonality guidance that is genuinely trip-planning useful
- avoid fake precision or brittle month-by-month promises

Should include:

- durable weather and season framing
- event or transport caveats only when supported
- clear tradeoffs instead of generic “any time is good” filler

### `/budget/`

Purpose:

- explain the city’s budget reality without collapsing into affiliate booking copy

Should include:

- practical spending patterns
- realistic tradeoffs by travel style
- durable ranges or category-based framing when exact prices are not worth defending

### Activity support routes

Routes:

- `/cooking-classes/`
- `/muay-thai/`
- `/elephant-sanctuaries/`
- `/diving-snorkeling/`

Purpose:

- only remain indexable if they are genuinely useful, source-backed, and city-specific
- otherwise they should be cleaned up, de-emphasized, or kept noindex until they are strong enough

These routes are part of the same city-level cluster review because weak activity pages can still drag down perceived site quality and internal-link quality.

## Internal Linking Rules

Support routes should strengthen the city cluster, not spray users into weak destinations.

Rules:

- link back to the main city page where relevant
- link sideways only to strong support pages
- link to strong top-10 pages where they materially help
- link to attraction detail pages only when those detail pages are strong
- remove or replace links to placeholder, scrape-era, or weak pages
- do not add internal links just to create more links; every link should help the user decide what to read next

## Indexing Rules

The current support layer includes routes that were explicitly treated as thin and noindexed. This project should not blindly flip everything to index.

Indexing decisions must follow quality, not ambition:

- if a route becomes genuinely strong, it can be indexable
- if a route remains narrow, repetitive, or commercially padded, keep it noindex until it clears the quality bar
- the runbook should require explicit route-by-route indexing review rather than assuming one rule fits every support page

## Shared Template Cleanup

The support-route upgrade must include template-level cleanup where needed.

Expected shared issues:

- misleading booking or deals framing
- embedded affiliate-heavy sections that dominate the route
- unsupported review or rating presentation
- fallback sections that read as placeholder content
- thin route variants hidden behind generic templates
- schema that makes inaccurate claims

If a shared template leaks weak copy or weak monetization patterns across multiple cities, the template must be fixed before cities are marked done.

## Tracking Model

Create a dedicated tracker:

- `city-support-upgrade-tracker.json`

The tracker should include:

- project metadata
- scope definition
- done definition
- city list in fixed sequential order
- per-city status
- per-city notes
- per-city route checklist for the nine support routes
- `updated_at`

The tracker should also support sequential execution without extra user prompting by clearly exposing the next pending city in order.

## Sequential Execution Model

Execution should follow the same practical pattern as the city and top-10 trackers:

- start with the first pending city
- fully audit and upgrade that city’s support cluster
- validate all required routes
- mark the city done only after passing validation
- continue to the next pending city in sequence

To support this, the implementation should include a lightweight task-list pattern in the tracker or adjacent execution docs so work can continue city by city without re-deciding scope every time.

This is not a claim of hidden background execution. It is a structured queue for active sessions and automation runs.

## Validation Model

The runbook should require, at minimum:

- JSON validation where JSON data files are touched
- `npx tsc --noEmit`
- localhost render checks for all support routes in scope
- rendered HTML leak checks for:
  - TripAdvisor or scrape leftovers
  - affiliate-heavy or booking-first wording where inappropriate
  - stale legacy fields
  - first-person AI filler
  - missing visible source signals
  - weak internal links

Cities should not be marked `done` until the full support cluster passes.

## Recommended Order

Build this workflow in the following order:

1. Create the runbook
2. Create the tracker
3. Audit shared templates and shared route risks
4. Start sequential city execution from the first pending city

## Success Criteria

This project succeeds when:

- every city in the tracker is `done`
- the city support routes are materially stronger and no longer obviously thin
- route templates no longer leak weak affiliate-first or scrape-era patterns
- visible sources and fact-checked claims are standard across the support layer
- internal linking across city clusters points to genuinely strong pages
