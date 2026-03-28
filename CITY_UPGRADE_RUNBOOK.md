# City Upgrade Runbook

Use this runbook to upgrade `/city/[slug]/` pages to the current Go2Thailand quality bar.

## Goal

Each English city cluster should be:

- non-thin
- AdSense-safe
- EEAT-oriented
- source-backed
- internally coherent
- free of stale legacy claims in rendered HTML

This applies to:

- `/city/[slug]/`
- `/city/[slug]/top-10-attractions/`
- `/city/[slug]/top-10-restaurants/`
- `/city/[slug]/top-10-hotels/`

## Quality Rules

- Use web search for fact checking on unstable facts.
- Prefer official sources, official venue/hotel pages, airport or transport authorities, MICHELIN, TAT, and other strong primary references.
- Do not invent first-person stories, local encounters, or personal anecdotes.
- Do not keep vague AI filler if it sounds nice but says nothing practical.
- Do not lean on TripAdvisor-style ratings, review counts, or generic scraped copy.
- Do not use unsupported exact prices unless the source is clear and recent enough.
- Prefer durable wording over brittle exact numbers when pricing or logistics may change.
- If an internal link points to something weak or missing, improve that target or stop linking to it.

## Standard Workflow

### 1. Audit the city page

Check:

- `data/enhanced/[slug].json`
- rendered `/city/[slug]/`
- current source layer
- current metadata
- current internal links

Look for:

- AI-like `enhanced_description`
- stale `extended_description`
- duplicated old/new models
- unsupported ratings and price claims
- old `whereToEat` / `topHotels` style data leaking into output
- no `reviewed_by`
- no `contentSources`

### 2. Audit the linked cluster pages

Check:

- `data/top10/[slug]-attractions.json`
- `data/top10/[slug]-restaurants.json`
- `data/top10/[slug]-hotels.json`

If these are weak, upgrade them in the same pass.

### 3. Gather sources before rewriting

Minimum source set should usually cover:

- city basics or population framing
- main attraction references
- restaurant references
- hotel references
- transport or airport context where relevant

Preferred source types:

- official venue pages
- official hotel pages
- MICHELIN
- official airport / bus / transport pages
- Tourism Authority of Thailand
- city or provincial official reference pages

### 4. Rewrite the main city data

Update these sections in `data/enhanced/[slug].json` as needed:

- `seo.metaTitle.en`
- `seo.metaDescription.en`
- `enhanced_description`
- `overview`
- `hidden_gems`
- `authentic_experiences`
- `foodie_adventures`
- `local_insights`
- `seasonal_secrets`
- `budget_reality`
- `top_attractions`
- `top_restaurants`
- `top_hotels`
- `travel_tips`
- `best_time_to_visit`
- `budget_info`
- `thingsToDo`
- `whereToStay`
- `whereToEat`
- `topHotels`
- `gettingAround`
- `bestTimeToVisit`
- `budgetGuide`
- `safetyTips`
- `faq`
- `practicalInfo`
- `contentSources`
- `reviewed_by`
- `enhanced_at`
- `factchecked_at`

### 5. Remove legacy leaks

Do not stop after the first block looks clean.

Search the same JSON file for:

- `extended_description`
- `getting_there`
- `best_time`
- `budget`
- `neighborhoods`
- `must_try_food`
- `local_tips`
- `day_trips`
- old exact price strings
- old attraction names that should no longer be used

If these fields remain, they can still leak into `__NEXT_DATA__`.

### 6. Upgrade supporting cluster files

For `top-10-attractions`, `top-10-restaurants`, and `top-10-hotels`:

- remove scraped/rating-driven copy
- replace with curated picks
- add `content_sources`
- keep intros factual and compact
- remove TripAdvisor dependence

### 7. Fix internal links

On the city page:

- link to strong attraction detail pages when they exist
- link to real food pages if they exist
- link to city support pages like `food`, `best-time-to-visit`, and top-10 guides

If a needed linked page does not exist and the link would materially improve the cluster:

- create or upgrade that page

Do not point users to thin or empty pages.

## Validation Gates

Before marking a city done, run:

```bash
jq empty data/enhanced/[slug].json
jq empty data/top10/[slug]-attractions.json
jq empty data/top10/[slug]-restaurants.json
jq empty data/top10/[slug]-hotels.json
npx tsc --noEmit
```

Then render-check the live local route:

```bash
curl -s http://localhost:3001/city/[slug]/
curl -s http://localhost:3001/city/[slug]/top-10-attractions/
curl -s http://localhost:3001/city/[slug]/top-10-restaurants/
curl -s http://localhost:3001/city/[slug]/top-10-hotels/
```

Search the rendered HTML for:

- old AI intro strings
- stale price claims
- old restaurant names removed from the new curated set
- `TripAdvisor`
- missing `reviewed_by`
- missing source URLs

## Pass Criteria

Mark a city `done` only if all are true:

- city page renders `200`
- top-10 attractions renders `200`
- top-10 restaurants renders `200`
- top-10 hotels renders `200`
- no first-person AI copy remains in rendered English HTML
- no stale rating-spam remains in rendered English HTML
- no stale legacy exact-price strings remain in rendered English HTML
- `reviewed_by` is present
- `contentSources` is present
- internal links point to real, non-thin pages

## Commit Strategy

- Prefer batching 1 to 4 cities per commit.
- Update the tracker after each city is validated.
- Do not mark a city complete before render validation is clean.

## Current Reference Cities

Use these as quality examples inside this repo:

- `bangkok`
- `chiang-mai`
- `phuket`
- `pattaya`
