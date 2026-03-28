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

### 0. Preflight the tracker before a new pass

Before starting a new city pass, recompute `execution.next_pending` from the first city in `cities[]` whose status is not `done`.

- If the stored value already matches that first non-done city, continue.
- If the stored value has drifted, correct it before any route work, validation, or status change begins.
- Do not start a new pass while `execution.next_pending` still points at a city whose status is `done`.

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

### 6. Validate each active route before marking it done

Before you mark a single route `done`, run the route-level validation procedure for that route.

Use one `BASE_URL` for the check and keep the route under test explicit:

```bash
BASE_URL=http://127.0.0.1:3010
route=[route]
html="/tmp/[slug]-${route}.html"

jq empty data/enhanced/[slug].json
npx tsc --noEmit
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/${route}/")" = "200"
curl -s "$BASE_URL/city/[slug]/${route}/" > "$html"

if rg -q "TripAdvisor|tp\\.media|review_count|affiliate_url|trip_affiliate_url|book now|current rates|verified hotel data|I visited|I stayed|our insider|first-person|isAccessibleForFree" "$html"; then
  echo "dirty leak scan: ${route}"
  exit 1
fi

if ! rg -q 'Sources|Source:|Official site|Official website|MICHELIN|UNESCO|Tourism Authority of Thailand|Fine Arts Department' "$html"; then
  echo "missing visible source signal: ${route}"
  exit 1
fi
```

- A route may move `in_progress -> done` only after this route-level procedure succeeds.
- If a route is intentionally kept `noindex`, the rendered HTML must still return `200`, the leak scan must stay clean, and the tracker notes must record the decision before the route is marked `done`.
- The visible-source gate is satisfied only when the rendered HTML contains an explicit source signal.
- A temporary visible-source exception is allowed only when the route's shared template cannot yet render visible source presentation, the route still has source-backed content, and the shared template fix is being applied in the same pass. If used, record it in the city notes as `visible_source_exception: temporary; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`, keep the affected route in `in_progress`, and clear the exception after the shared template fix lands and the route renders explicit source signals.

## Route Status Lifecycle

Use route status values deterministically during each city pass:

- `pending`: no active editing or validation has started for that route in the current city pass
- `in_progress`: the route is the active route for the city selected by `execution.next_pending` and route-level editing, source gathering, or validation has started, but the route has not yet cleared the route-level gates below
- `done`: the route has cleared all route-level gates below during the current city pass

Apply these transitions exactly:

- before any route work begins for the city selected by `execution.next_pending`, run the preflight rule above and correct `execution.next_pending` if it has drifted
- when work begins on the city selected by `execution.next_pending`, set the first not-yet-done route in `route_order_within_city` to `in_progress`
- move `in_progress` -> `done` only after the route-level validation procedure above succeeds, including any required indexing decision and an explicit rendered visible-source signal when that gate applies
- a route that is intentionally kept `noindex` still must render `200` and pass the same technical and content validation; `noindex` changes indexing treatment only, not route health
- if the route-level validation for any route fails after it was marked `done`, move that route back to `in_progress` immediately

Derive and correct the stored city status from the route statuses after every route-status change:

- `pending`: all 9 route statuses are `pending`
- `in_progress`: at least 1 route status is `in_progress` or `done`, and fewer than 9 route statuses are `done`
- `validation_pending`: all 9 route statuses are `done`, but the final full-cluster validation pass has not yet succeeded
- `done`: all 9 route statuses are `done` and the final full-cluster validation pass has succeeded

Apply the city-status correction rules exactly:

- if the stored city status disagrees with the derived city status, correct the stored value to match the derived value before continuing
- if `execution.next_pending` has drifted away from the first city whose status is not `done`, correct it before starting the next pass
- if all 9 routes are `done` but the final full-cluster validation pass has not yet succeeded, set the city to `validation_pending`, not `done`
- when the final full-cluster validation pass succeeds, set the city to `done` and advance `execution.next_pending` to the first city whose status is not `done`, or set it to `null` if no such city remains
- if the final full-cluster validation fails for any route, keep execution on the same city, move that route back to `in_progress`, and do not advance `execution.next_pending` until the city validates cleanly
- do not leave the city in `pending` once any route is `in_progress` or `done`

## Local Render Port Convention

Choose one `BASE_URL` for the full validation pass.

- Default example: `BASE_URL=http://127.0.0.1:3010`
- Run the app on the host and port behind `BASE_URL` before checking routes.
- Do not mix multiple base URLs inside the same validation pass.
- If the app is already running on a different host or port, set `BASE_URL` once at the start of the pass and reuse it everywhere below.

## Validation Gates

Before marking a city done, run:

```bash
BASE_URL=http://127.0.0.1:3010
jq empty data/enhanced/[slug].json
npx tsc --noEmit
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/food/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/hotels/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/attractions/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/best-time-to-visit/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/budget/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/cooking-classes/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/muay-thai/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/elephant-sanctuaries/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/city/[slug]/diving-snorkeling/")" = "200"
```

Then check the rendered HTML for explicit leak patterns. A clean leak scan means `rg` exits with status `1` because it found no matches. A dirty leak scan means `rg` exits with status `0` because it found a match and the route must fail validation. Any other `rg` exit status is a scan error.

```bash
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  html="/tmp/[slug]-${route}.html"
  curl -s "$BASE_URL/city/[slug]/${route}/" > "$html"
  if rg -q "TripAdvisor|tp\\.media|review_count|affiliate_url|trip_affiliate_url|book now|current rates|verified hotel data|I visited|I stayed|our insider|first-person|isAccessibleForFree" "$html"; then
    echo "dirty leak scan: ${route}"
    exit 1
  else
    status=$?
    if [ "$status" -eq 1 ]; then
      echo "clean leak scan: ${route}"
    else
      echo "leak scan error: ${route}"
      exit "$status"
    fi
  fi
done
```

Then run the visible source-backed trust-signal check on routes whose templates support visible sources:

```bash
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  curl -s "$BASE_URL/city/[slug]/${route}/" > "/tmp/[slug]-${route}.html"
  if ! rg -q 'Sources|Source:|Official site|Official website|MICHELIN|UNESCO|Tourism Authority of Thailand|Fine Arts Department' "/tmp/[slug]-${route}.html"; then
    echo "missing visible source signal: ${route}"
    exit 1
  fi
done
```

Treat any `missing visible source signal:` output as a failed gate for that route. If the template for that route does not support visible source presentation yet and that limitation is the shared issue currently being fixed in the same pass, record a temporary visible-source exception in the tracker notes, keep the route `in_progress`, and do not mark it `done` until the shared template fix lands and the visible-source check passes.

If a route is intentionally kept `noindex`, confirm and document it before the city can be marked done:

- Write the decision in the city support tracker notes as `indexing_decision: noindex` with the route list, reason, and review date. Do not record indexing decisions for routes that are intended to be indexable.
- Confirm the rendered HTML contains a `meta[name="robots"]` tag whose content includes `noindex`, and still confirm the route returns HTTP `200`.
- Keep the route in the same pass only if it also passes the same leak scan, visible-source checks, and content-quality validation as an indexable route; `noindex` does not relax any route-quality gate.
- If the tracker note and rendered HTML do not match, treat the route as undecided and do not mark the city done.

If a temporary visible-source exception is used, confirm and document it while the route remains blocked:

- Use the exception only for a route whose shared template cannot yet surface visible source presentation, whose route content is still source-backed, and whose shared template fix is being applied in the same pass.
- Write the decision in the city support tracker notes as `visible_source_exception: temporary; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`. Do not record the exception for routes whose template already supports visible source presentation.
- Keep the route in `in_progress` until the shared template fix lands, the exception note is removed or replaced with a resolved note, and the rendered visible-source check passes cleanly.

Mark a city `done` only if all of these are true:

- all 9 support routes render `200`, including any routes intentionally kept `noindex`
- no first-person AI copy remains in rendered English HTML
- no stale rating-spam or scrape-era copy remains
- no stale affiliate-first or booking-first template leak dominates the page
- visible source-backed trust signals are present where supported
- internal links point only to strong pages
- materially unstable claims are web-fact-checked

## Current Reference Pattern

Use this runbook together with the city and top-10 runbooks when a city needs both the core page and the support cluster upgraded in the same pass.
