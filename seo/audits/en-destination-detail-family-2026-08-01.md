# English destination-detail family acceptance audit

**Date:** 2026-08-01
**Routes:** 66 (33 attraction shortlists + 33 restaurant shortlists)

## Data and source coverage

- 33/33 attraction JSON owners exist; all 33 contain linked content sources.
- 33/33 restaurant JSON owners exist; all 33 contain linked content sources.
- Attraction records: 245 items; 10 carry an indicative price field.
- Restaurant records: 221 items; all 221 carry an indicative price field and therefore receive a visible current-menu verification qualifier.
- Missing-data states remain `noindex, follow` and do not masquerade as finished owners.

## Shared premium implementation

`components/city/TopTenEditorialGuide.tsx` replaces the two legacy list layouts with one locale-specific premium system:

- city-owned photographic hero, dark jade contrast layer and responsive CTA hierarchy;
- editorial-method, freshness and local-verification trust bar;
- contextual introduction instead of an unexplained numbered ranking;
- accessible numbered cards, visible map actions and semantic headings;
- evergreen H1/metadata without automatic year churn;
- restrained Klook affiliate exit only on attraction pages, with live-option wording, disclosure and `nofollow sponsored`;
- no affiliate exit on restaurant pages;
- current price/menu/access caveats adjacent to the relevant claims;
- source trail, city hub, sibling intent and hotel-guide internal links.

Both route controllers now emit Article, ItemList and BreadcrumbList schema with canonical fragment URLs. `Hotel` or `Product` schema is not fabricated for restaurant entries.

## Runtime sampling

| Route                                   | Result | Notes                                                |
| --------------------------------------- | -----: | ---------------------------------------------------- |
| `/city/bangkok/top-10-attractions/`     |    200 | evergreen H1; one sponsored activity exit            |
| `/city/trat/top-10-attractions/`        |    200 | shared premium renderer; one sponsored activity exit |
| `/city/krabi/top-10-restaurants/`       |    200 | evergreen H1; zero affiliate exits                   |
| `/city/surat-thani/top-10-restaurants/` |    200 | shared premium renderer; zero affiliate exits        |

## Validation

- targeted ESLint: pass;
- full TypeScript (`--incremental false`): pass;
- `git diff --check`: pass (line-ending notices only from concurrent edited files);
- automated browser QA: Bangkok desktop and Krabi at 390 × 844 render meaningful content without a framework error overlay; the mobile hero, buttons and fixed navigation remain within the viewport;
- current-web intent evidence: `seo/research/en/2026-08-01-top-ten-destination-intent-refresh.md`.

## Decision

The 66-route `en:destination-detail` family is ready for central family acceptance. This audit does not accept the separate destination-attraction overview family or individual attraction-detail owners.
