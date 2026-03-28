# City Support Remaining Batch

## Operating Rules

- Follow `CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Use `city-support-upgrade-tracker.json` as source of truth
- Start with `execution.next_pending`
- Work city by city in sequence
- Do not mark a city `done` until the full support cluster passes validation
- Commit in sensible batches
- Stop only for real blockers

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
16. Update tracker only after the city passes
17. Continue to the next pending city

## Validation

```bash
jq empty data/enhanced/[slug].json
npx tsc --noEmit
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  curl -I -s "http://127.0.0.1:3010/city/[slug]/${route}/" | head -n 1
done
```

Run the rendered HTML leak checks for stale AI copy, scrape leftovers, affiliate-first copy, and missing source signals before marking a city complete.
