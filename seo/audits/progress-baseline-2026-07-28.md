# Go2Thailand production-readiness baseline

**Measured:** 28 July 2026  
**Scope:** 2,276 sitemap routes — 693 NL and 1,583 EN

## Corrected progress model

The former `106 / 1,583` percentage was invalid because it divided exact ContentOps owner records by all sitemap routes. One researched owner and one reusable template can support many generated routes. Progress is therefore measured in separate layers.

| Layer | NL | EN | Total | Meaning |
|---|---:|---:|---:|---|
| HTTP/technical route coverage | 693/693 | 1,583/1,583 | 2,276/2,276 | Current sitemap routes render successfully and pass the layered route audit |
| Shared premium design signature | 692/693 | 1,582/1,583 | 2,274/2,276 | Rendered HTML contains the shared canvas, container, display-heading and section primitives |
| Custom premium homepage signature | 1/693 | 1/1,583 | 2/2,276 | Both homepages intentionally use a custom composition and three shared redesign primitives rather than the generic canvas marker |
| Implemented ContentOps records | 106 records | 106 records | 212 records | Independently researched content owners; this is not a sitemap-page denominator |
| Exact implemented owner routes currently in sitemap | 99 | 105 | 204 | Implemented owner records whose exact canonical appears in the current locale sitemap |

Effective rendered redesign coverage is therefore **2,276/2,276**, with 2,274 generic premium signatures and two intentionally custom premium homepages. This proves shared design-system adoption, not unique-copy or page-level editorial completeness.

## Remaining completion work

- Audit unique value and indexation quality across the large generated families, especially 425 EN hotel-detail routes and other template-scaled pages.
- Continue independent locale-specific DFS, current SERP, competitor and genuine PAA research for high-value owners and clusters; do not perform one paid research cycle for every generated child URL when one cluster owner governs the intent.
- Review the 936 routes without a language pair and distinguish intentional locale-only pages from missing translations or missing sitemap entries.
- Resolve eight implemented ContentOps owners absent from their locale sitemap: seven NL and one EN. These include NL nightlife, Ban Krut and Koh Tao owners plus EN Pattaya nightlife; each needs canonical, indexation and sitemap evidence before a decision.
- Continue source, internal-link, affiliate, schema, accessibility, responsive, performance and content-quality QA per family.
- Keep Amazon OneLink contextual: packing, transport, food, cooking and practical gear only where the product helps the reader; hotel selection remains Trip.com-led and activities remain Klook-led.

## Time expectation

With family-level batching and reusable templates, the remaining production-readiness work is estimated at roughly **five to nine continuous working days**. This is a working range, not a guarantee; unpaired-route and unique-value findings can move it. The estimate does not assume 2,276 individual DFS jobs or 2,276 bespoke designs.

## Evidence

- `seo/audits/design-coverage-nl-2026-07-28.md`
- `seo/audits/design-coverage-en-2026-07-28.md`
- `seo/audits/runtime/design-coverage-nl-2026-07-28.json`
- `seo/audits/runtime/design-coverage-en-2026-07-28.json`
- `seo/inventory/routes.csv`
- `seo/inventory/unpaired-routes.json`
- `seo/keywords-nl.csv`
- `seo/keywords-en.csv`
