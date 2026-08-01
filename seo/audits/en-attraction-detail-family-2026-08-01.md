# English attraction-detail family audit

Date: 2026-08-01
Initial scope: 70 sitemap routes.
Post-audit sitemap synchronization: 99 source-backed indexable routes.

## Result

The family is technically safe but not editorially complete. One route, Wat Plai Laem, has a purpose-built premium researched owner. Twenty-nine legacy records have source URLs and remain eligible for indexing; forty-one unsourced legacy records are gated with `noindex, follow` until independent English research is added.

## Template controls

- Self-referencing canonical and locale-aware hreflang are supplied globally by `Hreflang`.
- Legacy pages now emit `TouristAttraction` plus `BreadcrumbList` schema.
- Fixed legacy admission prices and opening hours are suppressed from visible UI and structured data because their records lack claim-level verification dates.
- Official links are offered as live-check destinations where present.
- Empty-key Google Static Maps requests and raw `<img>` fallback were removed; the accessible map card links to the coordinate/location in Google Maps.
- Klook and GetYourGuide buttons use live-option language, full disclosure and `rel="noopener noreferrer nofollow sponsored"`.
- Commercial modules require a source-backed indexable owner and at least 300 words.
- All 70 referenced hero images exist locally.

## Runtime sample

Four representative pages were fetched from the local server:

| Route type                              | HTTP | Canonical | Attraction schema | Breadcrumb schema | FAQ schema | noindex |            sponsored | stale Offer schema |
| --------------------------------------- | ---: | --------: | ----------------: | ----------------: | ---------: | ------: | -------------------: | -----------------: |
| Wat Plai Laem exact owner               |  200 |       yes |               yes |               yes |        yes |      no |                  yes |                 no |
| Ayutthaya sourced legacy                |  200 |       yes |               yes |               yes |         no |      no | no (under 300 words) |                 no |
| Doi Inthanon unsourced legacy           |  200 |       yes |               yes |               yes |         no |     yes |                   no |                 no |
| Chanthaburi Gem Market unsourced legacy |  200 |       yes |               yes |               yes |         no |     yes |                   no |                 no |

## Remaining editorial queue

The 41 gated records require independent English SERP/PAA research and primary/current source evidence before reindexing. FAQ schema must only be added when genuine questions and supported answers exist; it is deliberately absent on legacy pages today.

## Sitemap synchronization

The first sitemap implementation calculated indexability from the base attraction JSON while the page resolver uses the enhanced record first. That mismatch both retained 41 runtime-noindex routes and omitted 29 enhanced source-backed routes. `lib/sitemap.js` now follows the runtime resolver (enhanced first, base fallback) and applies the identical minimum-word-count plus valid-`contentSources` gate. The regenerated English sitemap therefore contains 99 source-backed attraction-detail routes and excludes the 41 audited unsourced records. An `official_website` URL alone is deliberately not treated as editorial evidence.

## Validation

- `npm run seo:cannibalization`: 0 hard collisions, 0 warnings.
- `npx tsc --noEmit --pretty false --incremental false`: pass.
- Representative local runtime: 4/4 HTTP 200; canonical and expected schema present; no empty Google Maps API request; no legacy price `Offer` schema.
