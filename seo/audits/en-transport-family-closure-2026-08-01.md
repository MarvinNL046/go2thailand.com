# English transport family closure

Date: 2026-08-01

## Acceptance

All 69 provisional route decisions are resolved: 68 routes are accepted as decision-support owners and Bangkok–Koh Samui remains intentionally consolidated into its dedicated editorial guide. Remaining route decisions: **0**.

Acceptance does not certify the generated modes as direct services. The family is safe because every route now presents them as candidate itinerary shapes, renders only broad planning estimates, and sends readers to current mode-relevant authorities/operators and live ticket inventory.

## Implementation checks

- No generated fare appears in English output; CTAs say “check live price/options”.
- No generated frequency appears in English output.
- “Fastest” and “budget” labels were replaced with neutral flight/surface estimates.
- Arbitrary comfort stars are not rendered in English.
- Unsupported claims about lounges, dining cars, directness, terminal location, always-available taxis, best booking weekdays and fixed arrival buffers were removed from English copy.
- The source block is route-specific: it renders only authority/operator channels relevant to modes recorded for that route.
- Flight evidence explicitly proves airport identity only and never direct service.
- Ferry pages use Marine Department context; only eligible Koh Samui legs expose Lomprayah's current timetable.
- FAQ, Article and Breadcrumb schema retain the same qualified visible answers.
- Canonical/hreflang remain global; internal links pass through English owner normalisation.
- The related-route select now has an accessible label.
- Direct Travelpayouts/12Go links retain `noopener noreferrer nofollow sponsored` and a visible commission disclosure.
- The existing premium template marker and responsive grid/card system remain intact.

## Evidence

The complete 69-route decision matrix is recorded in `seo/research/en/2026-08-01-transport-route-specific-evidence.md`.

## Validation

- Full local runtime sweep: 69/69 decisions passed; 68 pages returned HTTP 200 and Bangkok–Koh Samui returned the expected HTTP 308 to its editorial owner.
- Every rendered route passed assertions for premium-template signature, canonical, FAQ/Article/Breadcrumb schema, dated source boundary, sponsored marker and absence of the removed unsupported English claims.
- `npx tsc --noEmit --pretty false --incremental false`: pass.
- Targeted ESLint: 0 errors and 0 warnings.
- `npm run seo:cannibalization`: 0 hard collisions and 0 warnings.
- `npm run design:verify`: pass (7 primitives, 34 pilot templates).
- Scoped `git diff --check`: pass.
