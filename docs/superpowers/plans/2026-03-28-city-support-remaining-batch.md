# City Support Remaining Batch

## Operating Rules

- Follow `/home/marvin/Projecten/go2thailand.com/CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Use `/home/marvin/Projecten/go2thailand.com/city-support-upgrade-tracker.json` as source of truth
- Start with `execution.next_pending`
- Before any new pass begins, recompute `execution.next_pending` from the first city whose status is not done and correct the tracker immediately if it has drifted
- Work city by city in sequence
- Do not mark a city `done` until the full support cluster passes validation, including any routes intentionally kept `noindex`
- Commit one fully validated city per commit by default; only batch consecutive cities when the same shared-template fix applies cleanly across them, and never include more than 3 fully validated cities in one commit
- Stop only for blockers that cannot be resolved from the runbook, tracker, local validation, or primary-source research
- If every city status is `done`, set `execution.next_pending` to `null` and treat the workflow as complete; otherwise keep `execution.next_pending` set to the first city whose status is not `done`
- Update tracker statuses deterministically: set a route to `in_progress` when it becomes the active route for the city selected by `execution.next_pending`; set it to `done` only after its route-level validation passes; if the final full-cluster validation fails for that route, move it back to `in_progress`
- Before marking a single route `done`, run the route-level validation procedure for that route: `jq empty data/enhanced/[slug].json`, `npx tsc --noEmit`, route HTTP `200`, leak scan, passing rendered visible-source check, and any required indexing-note recording
- If all 9 routes are `done` but the final full-cluster validation pass has not yet succeeded, set the city status to `validation_pending`
- When the final full-cluster validation pass succeeds, set the city status to `done` and advance `execution.next_pending` to the first city whose status is not `done`, or to `null` if no such city remains
- Recompute the stored city status from the route-status rollup after every route-status change and correct any stale stored value before continuing
- Record intentional `noindex` decisions during execution in tracker notes using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`; do not record indexing decisions for routes intended to remain indexable; a `noindex` route still must return HTTP `200` and pass the same technical/content validation as an indexable route; only mark a city `done` after the full support cluster passes validation
- Record temporary visible-source exceptions during execution in tracker notes using this exact schema: `visible_source_exception: temporary; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`; use the exception only when the shared template cannot yet surface visible sources, the route still has source-backed content, and the shared template fix is being applied in the same pass; do not use the exception for routes that already support visible-source presentation; the exception records a temporary blocker and does not allow the route to move to `done`

## Per-City Checklist

1. Take the first city from `execution.next_pending`
2. If a shared template issue blocks multiple routes, fix it once before resuming route-by-route work
3. Set the first not-yet-done route in `route_order_within_city` to `in_progress`
4. Audit, gather sources, rewrite, fix internal links, remove stale leaks, and validate that single active route
5. Move that route to `done` only after its route-level gates pass, including any intentional `noindex` note recorded in tracker notes and a passing rendered visible-source check where required
6. Recompute and correct the stored city status after the route-status change
7. Repeat steps 3-6 for the next not-yet-done route in that city
8. Once all 9 routes are `done`, run the final full-cluster validation pass, including HTTP `200`, leak-scan, visible-source, and content checks for any intentionally `noindex` routes
9. If the final full-cluster validation fails, keep execution on the same city, move the failing route back to `in_progress`, and do not advance to the next pending city until the city validates cleanly
10. Only after the final full-cluster validation passes cleanly, continue to the next pending city

## Validation Commands

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

Render each route and scan the HTML for stale AI copy, scrape leftovers, affiliate-first copy, and missing source signals before marking a city complete:

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

Run the visible source-backed trust-signal gate by rendering each route to its own saved HTML artifact before scanning it:

```bash
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  html="/tmp/[slug]-${route}.html"
  curl -s "$BASE_URL/city/[slug]/${route}/" > "$html"
  if ! rg -q 'Sources|Source:|Official site|Official website|MICHELIN|UNESCO|Tourism Authority of Thailand|Fine Arts Department' "$html"; then
    echo "missing visible source signal: ${route}"
    exit 1
  fi
done
```

Any `missing visible source signal:` output fails the route. If that route's shared template does not yet support visible source presentation and the shared template issue is being fixed in the same pass, record the temporary visible-source exception, keep the route in `in_progress`, and do not move the route to `done` until the shared template fix lands and the visible-source check passes.

For any route intentionally kept noindex, run a separate check:

```bash
curl -s "$BASE_URL/city/[slug]/[route]/" | rg -n '<meta[^>]*name="robots"[^>]*content="[^"]*noindex'
```

Record the tracker note before marking the city complete using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`. A `noindex` decision never replaces route-health validation; it only changes indexing treatment.
