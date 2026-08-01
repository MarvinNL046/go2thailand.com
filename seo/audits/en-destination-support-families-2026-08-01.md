# English destination-support family acceptance audit

Date: 2026-08-01

## Scope

| Family                          | Routes | Owner/template                                                             |
| ------------------------------- | -----: | -------------------------------------------------------------------------- |
| Homepage                        |      1 | `pages/index.tsx` + `components/home/RedesignHome.tsx`                     |
| Destination index               |      1 | `pages/city/index.tsx`                                                     |
| Destination attraction overview |     34 | `pages/city/[slug]/attractions.tsx` plus evidence-led exceptions           |
| Destination weather overview    |     11 | `pages/city/[slug]/weather/index.tsx`, five dedicated guides plus fallback |
| Comparison                      |      1 | `/compare/phuket-vs-krabi/` via `PhuketKrabiComparisonGuide`               |

## Findings and repairs

- Destination index: added a distinct `CollectionPage`/`ItemList` and breadcrumb graph, an explicit premium-template boundary, current-source method disclosure, and canvas/tonal/divider treatment. Removed the false “10 cities” description and the volatile year from the English metadata.
- Attraction overview: retained the existing safe deep-link boundary (`hasDetailOwner`), `CollectionPage` + `ItemList` + `TouristAttraction` graph and one-H1 structure. Added a premium family marker, editorial hero treatment, evergreen English title and a visible current-information/affiliate-order caveat. Removed an empty ad section.
- Weather overview: dedicated researched owners remain authoritative. The fallback now derives hottest, coolest, wettest and driest labels from its own monthly dataset instead of applying one national answer to every city. English copy explicitly separates planning averages from forecasts, removes guarantees around weather/crowds/prices, and links to TMD.
- Homepage: already uses the shared premium homepage template, accessible destination combobox, one H1, canonical/hreflang, Organization/WebSite schema, natural destination/itinerary links and disclosed affiliate hand-offs. No duplicate owner introduced.
- Phuket–Krabi comparison: already uses the evidence-led bilingual premium component, independent English copy, WebPage/FAQ/Breadcrumb graphs, current-price CTAs and sponsored rel attributes. The broad retired comparison generator remains noindex and is not accepted as part of this one-route family.

## Runtime evidence

Representative local routes returned HTTP 200 with exactly one H1, canonical and JSON-LD:

- `/`
- `/city/`
- `/city/ayutthaya/attractions/`
- `/city/surat-thani/attractions/`
- `/city/ayutthaya/weather/` (fallback)
- `/city/phuket/weather/` (dedicated owner)
- `/compare/phuket-vs-krabi/`

The destination index, fallback weather and generic attraction routes expose their explicit `data-premium-template` markers. Dedicated weather and comparison routes expose the shared premium primitives directly.

A complete family matrix then fetched all 34 attraction overviews and all 11 weather overviews: 45/45 returned HTTP 200, 45/45 had exactly one H1, 45/45 exposed a canonical and 45/45 emitted JSON-LD; failures: 0.

## Validation

- `npx tsc --noEmit --pretty false --incremental false`: pass.
- `git diff --check`: pass for the touched implementation and evidence files.
- Runtime representative matrix: 7/7 HTTP 200; 7/7 canonical; 7/7 JSON-LD; 7/7 exactly one H1.

## Acceptance

Accepted at family level for English. This acceptance covers the listed route owners and shared templates, not monthly weather detail pages, individual attraction detail pages or the retired programmatic comparison directory.
