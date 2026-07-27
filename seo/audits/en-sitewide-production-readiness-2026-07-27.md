# English sitewide production-readiness audit — 2026-07-27

## Scope

- Audited the 1,602 English URLs in the generated sitemap against the local Next.js application.
- Checked response status, canonical, hreflang, title, meta description, H1/main content, schema, affiliate attributes and disclosure, internal targets and local image assets.
- Full machine-readable result: `seo/audits/runtime/en-sitewide-2026-07-27.json` (local runtime evidence).
- Focused recheck: `seo/audits/runtime/en-sitewide-recheck-2026-07-27.json` (local runtime evidence).

## Initial result

- 1,515 of 1,602 routes returned without a hard finding.
- 84 routes timed out while the long-running development server was under crawl load.
- Three broken internal links and one redirecting internal link were confirmed.
- All 697 referenced local image assets checked by the audit were available.
- The 95th-percentile response time in the loaded development environment was 11,662 ms; this is a local development measurement, not a production Core Web Vitals result.

## Repairs

- Chumphon accommodation card: `/city/chumphon/hotels/` → `/best-hotels/chumphon/`.
- Pattaya Koh Larn card: missing attraction detail → existing Koh Larn day-trip guide.
- Trat island card: `/city/koh-chang/` → `/islands/koh-chang/`.
- Trat transport CTA: `/transportation/` → `/transport/`.

During the focused recheck, a generated `.next/prerender-manifest.json` was found to contain concatenated JSON. Multiple incomplete development-server process trees had kept the generated manifest open across earlier restarts. The process tree was stopped, the generated corrupt file was preserved in the operating-system temporary directory, and one clean development server was started on port 3000. The homepage and the Chumphon, Pattaya and Trat owners subsequently returned HTTP 200, and the regenerated manifest parsed as valid JSON.

## Incoming-link warnings

The first crawl reported 527 sitemap URLs without a qualifying incoming link from another page's `<main>` content. This is a warning rather than proof that the URL is inaccessible: navigation, footer and sitemap discovery are deliberately excluded from this metric.

| Route family | Count |
| --- | ---: |
| Hotel detail | 425 |
| Food detail | 22 |
| Drinks detail | 20 |
| City attraction detail | 18 |
| Transport detail | 17 |
| Best-hotels owner | 9 |
| Travel guides | 4 |
| Other city pages | 4 |
| Top-10 pages | 3 |
| Other singleton routes | 5 |

The concentration in hotel detail pages calls for a family-level solution in the relevant accommodation owners and related-hotel modules. It should not be addressed with a sitewide dump of hundreds of links. Food, drinks, attractions and transport should likewise gain contextual links from their natural hubs and related-content components.

Follow-up completed on 2026-07-27: all 426 English hotel detail records now receive a contextual main-content link from their destination hotel owner, and all 1,161 generated similar-hotel references resolve to a canonical sibling record. Eleven previously hidden boutique hotels were restored to their owners, and all 37 specialist hotel guides now receive contextual owner links. The layered sitewide refresh passed 1,602/1,602 routes without a hard finding and reduced incoming-main warnings from 527 to 34. See `seo/audits/en-hotel-internal-links-design-2026-07-27.md`.

## Recheck result

- 87 of 87 original hard-finding routes passed without a hard error or warning.
- All 558 targets that could not be reused from the first report were checked again; 168 valid target results were reused.
- All 63 local image sources that required a fresh request passed; 115 valid asset results were reused.
- Focused-recheck p95 response time was 5,108 ms in development mode.
- The four repaired links resolved directly and the original 84 route time-outs were confirmed as development-server load rather than broken pages.
