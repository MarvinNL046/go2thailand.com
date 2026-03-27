# Top-10 Cluster Upgrade Runbook

Use this runbook to upgrade `/city/[slug]/top-10-*` routes to the same quality bar as the rebuilt city clusters.

## Goal

Each English top-10 cluster should be:

- non-thin
- AdSense-safe
- EEAT-oriented
- source-backed
- internally coherent
- free of scrape-era baggage in rendered HTML

This applies to:

- `/city/[slug]/top-10-attractions/`
- `/city/[slug]/top-10-restaurants/`
- `/city/[slug]/top-10-hotels/`

Treat the three routes as one city-level cluster. A city is only `done` when all three pass.

## Quality Rules

- Use web search for fact checking on unstable facts.
- Do not rely on memory alone for live or changeable details.
- Fact-check every materially unstable claim before keeping it.
- Prefer official venue pages, official hotel pages, airport or transport authorities, MICHELIN, TAT, UNESCO, Fine Arts Department, national parks, and other strong primary sources.
- Do not invent first-person stories, local encounters, or personal anecdotes.
- Do not keep vague AI filler if it sounds polished but says nothing practical.
- Do not keep TripAdvisor-style ratings, review counts, scraped guest-review snippets, or affiliate-driven ranking logic.
- Do not use unsupported exact prices unless the source is clear and recent enough.
- Prefer durable wording over brittle exact numbers when pricing, schedules, or transport may change.
- Do not keep legacy `scraped`, `trip_affiliate_url`, `affiliate_url`, `review_count`, or similar fields if they can leak into HTML or `__NEXT_DATA__`.
- If the shared top-10 templates leak weak copy or misleading badges across cities, fix the template before marking cities done.
- Source URLs should not stay hidden in JSON only; the rendered page should expose visible source-backed trust signals where the template supports them.
- Internal linking must be intentional. Do not route users from a strong top-10 page to thin support pages or weak sister pages.

## Standard Workflow

### 1. Audit the full top-10 cluster

Check:

- `data/top10/[slug]-attractions.json`
- `data/top10/[slug]-restaurants.json`
- `data/top10/[slug]-hotels.json`
- rendered `/city/[slug]/top-10-attractions/`
- rendered `/city/[slug]/top-10-restaurants/`
- rendered `/city/[slug]/top-10-hotels/`
- the shared templates in:
  - `pages/city/[slug]/top-10-attractions.tsx`
  - `pages/city/[slug]/top-10-restaurants.tsx`
  - `pages/city/[slug]/top-10-hotels.tsx`

Look for:

- first-person AI intros
- scrape-era ranking logic
- unsupported exact prices
- review-count or rating spam
- `tripadvisor`, `tp.media`, `affiliate_url`, `trip_affiliate_url`
- empty or weak `content_sources`
- misleading badges like `Current Rates`, `Verified Hotel Data`, or `Updated Info` when the evidence is weak
- `noindex` rules that do not fit the desired indexable quality bar
- schema claims that are too broad or false

### 2. Gather sources before rewriting

Minimum source set should usually cover:

- attraction references for the attractions page
- restaurant references for the restaurants page
- hotel references for the hotels page
- transport or airport context when it materially improves hotel planning

For every source-backed claim that could change:

- confirm it with web search
- prefer the strongest primary source available
- downgrade to durable wording if the claim is too brittle to defend cleanly

Preferred source types:

- official venue pages
- official hotel pages
- MICHELIN
- Tourism Authority of Thailand
- UNESCO
- Fine Arts Department
- official airport / transport authorities

### 3. Rewrite the top-10 data files

For each of the three data files:

- replace generic intros with city-specific editorial framing
- remove scrape-era ranking logic
- keep item descriptions compact, factual, and differentiated
- use durable price labels like `Budget`, `Mid-range`, `Luxury`, `Upscale`, `Seasonal`, or equivalent when exact prices are not worth keeping
- add or refresh `content_sources`
- keep lists selective and coherent rather than padded to hit a count

### 4. Remove legacy leak fields

Search the three JSON files for:

- `scraped`
- `trip_affiliate_url`
- `affiliate_url`
- `review_count`
- `rating`
- `tripadvisor`
- `tp.media`
- old first-person story fields like `story`, `personal_moment`, `why_locals_love_it`, `price_reality`, `location_details` if they no longer fit the quality bar

If these fields remain, they can still leak into rendered HTML or `__NEXT_DATA__`.

### 5. Upgrade shared templates when needed

Do not patch around a weak shared template city by city.

If the shared top-10 templates still:

- render misleading badges
- imply unsupported `current prices`, `guest reviews`, or `verified data`
- inject thin generic sidebars
- output inaccurate schema
- force `noindex` on otherwise strong pages

then fix the template layer in the same pass.

### 6. Fix internal links and support signals

On each top-10 route:

- link back to the strong city page
- link sideways only to strong sister top-10 routes
- keep supporting links useful and non-thin
- ensure `content_sources` and `reviewed_by` or equivalent editorial trust signals are visible in rendered output where the template supports them
- ensure source URLs are actually renderable or visibly attributable, not buried in data only
- remove or replace links to weak, placeholder, or scrape-era pages

## Validation Gates

Before marking a city done, run:

```bash
jq empty data/top10/[slug]-attractions.json
jq empty data/top10/[slug]-restaurants.json
jq empty data/top10/[slug]-hotels.json
npx tsc --noEmit
```

Then render-check the local routes:

```bash
curl -s http://127.0.0.1:3010/city/[slug]/top-10-attractions/
curl -s http://127.0.0.1:3010/city/[slug]/top-10-restaurants/
curl -s http://127.0.0.1:3010/city/[slug]/top-10-hotels/
```

Search the rendered HTML for:

- `TripAdvisor`
- `tripadvisor`
- `tp.media`
- `review_count`
- `affiliate`
- old removed venue names
- first-person AI strings
- unsupported exact-price strings that should be gone
- missing source URLs
- missing editorial trust signals
- weak internal links pointing to thin pages

## Pass Criteria

Mark a city `done` only if all are true:

- top-10 attractions route renders `200`
- top-10 restaurants route renders `200`
- top-10 hotels route renders `200`
- rendered English HTML contains no scrape-era review/rating spam
- rendered English HTML contains no stale first-person AI copy
- rendered English HTML contains no stale affiliate or TripAdvisor leftovers
- source-backed trust signals are present
- material unstable claims are web-fact-checked
- internal links point only to strong pages

## Commit Strategy

- Prefer batching 1 to 4 cities per commit.
- Update the tracker after each city cluster passes validation.
- Do not mark a city complete before render validation is clean.

## Execution Order

- Start with the first pending city in `top10-upgrade-tracker.json`.
- Continue sequentially until no pending cities remain.
