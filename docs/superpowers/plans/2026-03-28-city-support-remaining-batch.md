# City Support Remaining Batch

## Operating Rules

- Follow `/home/marvin/Projecten/go2thailand.com/CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Use `/home/marvin/Projecten/go2thailand.com/city-support-upgrade-tracker.json` as source of truth
- Start with the first city whose status is not `done`
- Work city by city in sequence
- Do not mark a city `done` until the full support cluster passes validation
- Commit one fully validated city per commit by default; only batch consecutive cities when the same shared-template fix applies cleanly across them, and never include more than 3 fully validated cities in one commit
- Stop only for blockers that cannot be resolved from the runbook, tracker, local validation, or primary-source research
- Update tracker statuses to `in_progress` as work starts and record intentional `noindex` decisions during execution in tracker notes using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`; only mark a city `done` after the full support cluster passes validation

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
16. Update tracker statuses and intentional `noindex` notes during execution; when a route is intentionally noindex, write tracker notes using the exact schema `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`; mark the city `done` only after it passes
17. Continue to the next pending city

## Validation Commands

```bash
jq empty data/enhanced/[slug].json
npx tsc --noEmit
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/food/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/hotels/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/attractions/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/best-time-to-visit/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/budget/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/cooking-classes/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/muay-thai/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/elephant-sanctuaries/")" = "200"
test "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:3010/city/[slug]/diving-snorkeling/")" = "200"
```

Render each route and scan the HTML for stale AI copy, scrape leftovers, affiliate-first copy, and missing source signals before marking a city complete:

```bash
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  curl -s "http://127.0.0.1:3010/city/[slug]/${route}/" > "/tmp/[slug]-${route}.html"
  rg -n "TripAdvisor|tp\\.media|review_count|affiliate_url|trip_affiliate_url|book now|current rates|verified hotel data|I visited|I stayed|our insider|first-person|isAccessibleForFree" "/tmp/[slug]-${route}.html"
done
```

For any route intentionally kept noindex, run a separate check:

```bash
curl -s "http://127.0.0.1:3010/city/[slug]/[route]/" | rg -n '<meta[^>]*name="robots"[^>]*content="[^"]*noindex'
```

Record the tracker note before marking the city complete using this exact schema: `indexing_decision: noindex; routes: [route-a, route-b]; reason: [brief rationale]; review_date: YYYY-MM-DD`.
