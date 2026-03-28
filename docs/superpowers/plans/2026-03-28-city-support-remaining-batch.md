# City Support Remaining Batch

## Operating Rules

- Follow `/home/marvin/Projecten/go2thailand.com/CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Use `/home/marvin/Projecten/go2thailand.com/city-support-upgrade-tracker.json` as source of truth
- Start with `execution.next_pending`
- Work city by city in sequence
- Do not mark a city `done` until the full support cluster passes validation
- Commit one fully validated city per commit by default; only batch consecutive cities when the same shared-template fix applies cleanly across them, and never include more than 3 fully validated cities in one commit
- Stop only for blockers that cannot be resolved from the runbook, tracker, local validation, or primary-source research
- If `execution.next_pending` is empty, the workflow is complete; otherwise keep `execution.next_pending` set to the first city whose status is not `done`
- Update tracker statuses deterministically: set a route to `in_progress` when it becomes the active route for the city selected by `execution.next_pending`; set it to `done` only after its route-level validation passes; if the final full-cluster validation fails for that route, move it back to `in_progress`
- Record intentional `noindex` decisions during execution in tracker notes using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`; only mark a city `done` after the full support cluster passes validation

## Per-City Checklist

1. Audit `/city/[slug]/food/`
2. Audit `/city/[slug]/hotels/`
3. Audit `/city/[slug]/attractions/`
4. Audit `/city/[slug]/best-time-to-visit/`
5. Audit `/city/[slug]/budget/`
6. Audit `/city/[slug]/cooking-classes/`
7. Audit `/city/[slug]/muay-thai/`
8. Audit `/city/[slug]/elephant-sanctuaries/`
9. Audit `/city/[slug]/diving-snorkeling/`
10. Fix shared template issues before patching city-by-city around them
11. Gather web-fact-checked primary sources
12. Rewrite or harden weak route content
13. Fix internal links
14. Remove stale legacy leaks from rendered HTML and `__NEXT_DATA__`
15. Validate locally
16. Update route statuses as `pending` -> `in_progress` -> `done` during the city pass; if the final full-cluster validation fails for any route, move that route back to `in_progress`
17. Continue to the next pending city

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

Run the visible source-backed trust-signal gate on the same saved HTML before marking a route `done`:

```bash
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  if ! rg -q 'Sources|Source:|Official site|Official website|MICHELIN|UNESCO|Tourism Authority of Thailand|Fine Arts Department' "/tmp/[slug]-${route}.html"; then
    echo "missing visible source signal: ${route}"
  fi
done
```

Any `missing visible source signal:` output fails the route unless that route's shared template does not yet support visible source presentation and the shared template issue is being fixed in the same pass. Do not move the route to `done` while that limitation remains unresolved.

For any route intentionally kept noindex, run a separate check:

```bash
curl -s "$BASE_URL/city/[slug]/[route]/" | rg -n '<meta[^>]*name="robots"[^>]*content="[^"]*noindex'
```

Record the tracker note before marking the city complete using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`.
