# City Support Cluster Upgrade Runbook

Use this runbook to upgrade `/city/[slug]/` support routes to the current Go2Thailand quality bar.

## Goal

Each English city support cluster should be:

- non-thin
- AdSense-safe
- EEAT-oriented
- source-backed
- internally coherent
- free of stale legacy claims in rendered HTML

This applies to:

- `/city/[slug]/food/`
- `/city/[slug]/hotels/`
- `/city/[slug]/attractions/`
- `/city/[slug]/best-time-to-visit/`
- `/city/[slug]/budget/`
- `/city/[slug]/cooking-classes/`
- `/city/[slug]/muay-thai/`
- `/city/[slug]/elephant-sanctuaries/`
- `/city/[slug]/diving-snorkeling/`

Treat the nine routes as one city-level unit. A city is only `done` when the full support cluster is clean.

## Quality Rules

- Use web search for fact checking on unstable facts.
- Prefer official sources, official venue pages, official hotel pages, airport or transport authorities, MICHELIN, TAT, UNESCO, Fine Arts Department, and other strong primary references.
- Do not invent first-person stories, local encounters, or personal anecdotes.
- Do not keep vague AI filler, fake insider framing, or generic planning copy.
- Do not lean on TripAdvisor-style ratings, review counts, or scraped review snippets.
- Do not use unsupported exact prices unless the source is clear and current enough to defend.
- Prefer durable wording over brittle exact numbers when pricing, schedules, or logistics may change.
- Source links should be visible in rendered output where the template supports them.
- If an internal link points to something weak or missing, improve that target or stop linking to it.
- Do not let affiliate modules outrun the editorial value of the page.

## Standard Workflow

### 1. Audit the full support cluster

Check:

- rendered `/city/[slug]/food/`
- rendered `/city/[slug]/hotels/`
- rendered `/city/[slug]/attractions/`
- rendered `/city/[slug]/best-time-to-visit/`
- rendered `/city/[slug]/budget/`
- rendered `/city/[slug]/cooking-classes/`
- rendered `/city/[slug]/muay-thai/`
- rendered `/city/[slug]/elephant-sanctuaries/`
- rendered `/city/[slug]/diving-snorkeling/`
- shared templates used by those routes
- relevant data in `data/enhanced/[slug].json`
- relevant attraction detail/index data where linked

Look for:

- first-person AI filler
- stale exact price claims
- unsupported review or rating language
- affiliate-heavy sections that dominate the route
- weak fallback copy
- hidden legacy fields leaking into `__NEXT_DATA__`
- thin internal links
- noindex rules that no longer match the route quality

### 2. Gather sources before rewriting

Before you rewrite anything, gather source material that can defend the page.

Minimum source set should usually cover:

- food references for the food page
- hotel references for the hotels page
- attraction references for the attractions page
- seasonal or climate references for the best-time-to-visit page
- budget context for the budget page
- class, sport, sanctuary, or dive operator references for the activity pages when those pages make specific claims

Preferred source types:

- official venue pages
- official hotel pages
- MICHELIN
- Tourism Authority of Thailand
- UNESCO
- Fine Arts Department
- official airport / transport authorities
- operator pages only when they are the strongest available source for a specific activity claim

For every claim that could change:

- confirm it with web search
- prefer the strongest primary source available
- switch to durable wording if the claim is too brittle to defend cleanly

### 3. Rewrite the support data and templates

Update the route data and shared presentation layer as needed:

- replace generic intros with city-specific editorial framing
- remove scrape-era ranking logic
- keep item descriptions compact, factual, and differentiated
- use durable labels like `Budget`, `Mid-range`, `Luxury`, `Seasonal`, or equivalent when exact prices are not worth keeping
- add or refresh visible source-backed trust signals where the template supports them
- keep lists selective and coherent rather than padded to hit a count
- remove legacy leak fields that can still surface in rendered HTML or `__NEXT_DATA__`

If a weak pattern affects multiple support pages or multiple cities:

- fix the shared template or shared data pattern first
- do not patch around the problem city by city

### 4. Review internal links across the cluster

On the city support routes:

- link to strong sister support pages only when the destination adds value
- link to real attraction detail pages when they exist
- link to strong city-level pages when they support the route
- stop linking to thin, placeholder, or stale pages

If a linked page is weak but materially useful:

- upgrade the target first
- then link to it

### 5. Review route indexing based on actual page quality

Indexing must follow page quality, not the other way around.

Check whether each route should be:

- indexable because it has enough standalone value
- intentionally kept noindex while still carrying strong non-thin content

Do not force indexability onto a weak page, and do not leave `noindex` in place if the page has been upgraded enough to deserve crawling and ranking.

## Validation Gates

Before marking a city done, run:

```bash
jq empty data/enhanced/[slug].json
npx tsc --noEmit
curl -s http://127.0.0.1:3010/city/[slug]/food/
curl -s http://127.0.0.1:3010/city/[slug]/hotels/
curl -s http://127.0.0.1:3010/city/[slug]/attractions/
curl -s http://127.0.0.1:3010/city/[slug]/best-time-to-visit/
curl -s http://127.0.0.1:3010/city/[slug]/budget/
curl -s http://127.0.0.1:3010/city/[slug]/cooking-classes/
curl -s http://127.0.0.1:3010/city/[slug]/muay-thai/
curl -s http://127.0.0.1:3010/city/[slug]/elephant-sanctuaries/
curl -s http://127.0.0.1:3010/city/[slug]/diving-snorkeling/
```

Mark a city `done` only if all of these are true:

- all 9 support routes render `200` or are intentionally kept noindex with strong non-thin content
- no first-person AI copy remains in rendered English HTML
- no stale rating-spam or scrape-era copy remains
- no stale affiliate-first or booking-first template leak dominates the page
- visible source-backed trust signals are present where supported
- internal links point only to strong pages
- materially unstable claims are web-fact-checked

## Current Reference Pattern

Use this runbook together with the city and top-10 runbooks when a city needs both the core page and the support cluster upgraded in the same pass.
