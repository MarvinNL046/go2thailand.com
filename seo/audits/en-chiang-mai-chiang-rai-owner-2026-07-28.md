# English Chiang Mai or Chiang Rai owner audit

**Route:** `/blog/chiang-rai-vs-chiang-mai-for-tourists/`

**Status:** production-ready after research, desktop/mobile visual QA, interaction QA and layered English runtime audit

**Audited:** 28 July 2026

## Search and editorial evidence

- Four DataForSEO keyword clusters returned 44 raw records and 40 unique relevant keyword strings.
- Ten current UK-English SERPs returned 76 organic results, 56 People Also Ask records and 35 unique genuine questions.
- Four complete competitor parses, two Tourism Authority of Thailand captures, current Thai Meteorological Department and Air4Thai controls, and exact owner ranking/backlink checks were reviewed.
- Existing rankings for `chiang rai vs chiang mai`, `chiang rai or chiang mai`, `chiang mai vs chiang rai` and `chiang mai or chiang rai` are preserved on the existing URL.
- Golden Triangle drug/crime intent, India intent and generic Thailand noise were excluded. Fixed prices, USD conversions, universal journey times, attraction counts, ethnic stereotypes and guaranteed weather/AQI claims were removed.

## Experience and design

- New reusable `city-comparison` template with a rights-safe split-city hero, short verdict, interactive priority selector, eight-factor comparison, four night splits, day-trip boundary, timing controls, route planner, ten FAQ answers, current-option booking cards and natural onward links.
- Desktop QA at 1280 × 720 and mobile QA at 390 × 844 passed without horizontal overflow, clipped cards or unreadable accordion text.
- Priority and night-plan buttons expose pressed state and update a live recommendation; the first FAQ opens readably on mobile.
- The hero, Chiang Mai, Chiang Rai and sleeper-train images all return HTTP 200. The route returns HTTP 200.

## Technical SEO and monetisation

- Exactly one `<main>` and one H1.
- Canonical: `https://go2-thailand.com/blog/chiang-rai-vs-chiang-mai-for-tourists/`.
- Structured data: `Article`, `BreadcrumbList`, `FAQPage`, `ItemList` and the sitewide `Organization` graph.
- Five disclosed affiliate exits use current-option wording and `noopener noreferrer nofollow sponsored`: one route CTA plus Trip.com for each city, Klook experiences and 12Go transport.
- Amazon was assessed but deliberately not forced: no physical product directly resolves this city-choice intent.
- The Chiang Mai and Chiang Rai destination owners both provide an incoming contextual route to this comparison.
- The comparison keyword was removed from the Chiang Rai destination row after the cannibalisation check correctly identified that the new comparison page now owns that intent.

## Verification

- `npx tsc --noEmit --incremental false`: passed.
- Targeted ESLint for both new comparison components: passed with zero findings.
- `npm run seo:cannibalization`: 0 hard collisions, 0 warnings.
- `npm run affiliate:verify`: passed; 16 used Amazon slugs and 20 registered products remain valid.
- `npm run design:verify`: passed; 7 primitives and 26 pilot templates.
- Layered English runtime report: `seo/audits/runtime/en-chiang-mai-chiang-rai-final-2026-07-28.json`.
- Runtime result: **1,588/1,588 sitemap routes without hard errors and zero warnings**; 1,922 healthy non-sitemap targets were reused and all 790 local image sources have a current passing result.
