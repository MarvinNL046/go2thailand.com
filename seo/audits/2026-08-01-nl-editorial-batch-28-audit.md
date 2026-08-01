# NL editorial batch 28 audit

Date: 2026-08-01
Scope: seven routes only. Trat and Koh Kood excluded. Central ledger, keyword ownership, manifest, redirects, sitemap and Next config were not edited.

## Outcome

| Route | Cluster | Lifecycle | Indexability | Primary keyword | Redirect advice |
|---|---|---|---|---|---|
| `thailand-star-green-tourism-accreditation-2026` | news-trends | ready | index | STAR Thailand | none |
| `thailand-tat-crisis-monitoring-centre-march-2026` | news-trends | archived | noindex | TAT crisiscentrum maart 2026 | none |
| `thailand-temple-etiquette-dress-code-guide-2026` | culture-wellness | ready | index | tempel etiquette Thailand | none |
| `thailand-tourism-festival-2026-zero-waste-sustainability-zone` | events | archived/elapsed | noindex | Thailand Tourism Festival 2026 zero waste | none |
| `thailand-visa-restrictions-2026-asian-countries-tourism-impact` | policy | archived/announced | noindex | Thailand visumwijzigingen 2026 | `/nl/visa/` |
| `thainosaur-museum-bangkok-dinosaur-attraction-2026` | attractions | archived/superseded | noindex | THAINOSAUR Museum Bangkok archief | `/nl/blog/bangkok-spectacular-2026-awc-thainosaur-museum-chao-phraya/` |
| `visakha-bucha-day-2026-thailand-guide` | events | archived/elapsed | noindex | Visakha Bucha 2026 Thailand | none |

## Editorial safeguards

- Removed unsupported STAR 70% target.
- Kept March crisis figures explicitly historical.
- Separated venue-specific temple rules from general etiquette.
- Described Zero Waste as announced operations, not verified outcome.
- Separated visa announcement, Gazette publication and effectiveness.
- Corrected THAINOSAUR opening to 23 December 2025 and ceded ownership to the accepted route.
- Marked Visakha Bucha elapsed, avoided universal closure claims and removed animal-release encouragement.
- No fixed commercial prices and no affiliate blocks were added.

## Assets

Seven unique imagegen heroes were generated, resized to 1536 × 1024 WebP at quality 84, and assigned route-owned alt text. All final files are below 450 KB.

## QA

- Targeted profile loader: pass for 7/7; statuses and lifecycle discriminators parsed.
- `npm run seo:verify:nl-editorial-assets`: pass; 217 accepted heroes checked, all local/matched/unique while indexable and at most 450 KB.
- `npx tsc --noEmit`: pass, exit 0.
- `npm run design:verify`: pass; 7 primitives and 34 pilot templates.
- `npm run affiliate:verify`: pass; 17 used slugs and 21 registered products.
- `npm run seo:cannibalization`: pass; 0 hard collisions, 0 warnings.
- Scoped `git diff --check`: pass for all 23 batch-owned files.
- Forbidden central-file status: clean for ledger, keyword files, manifest, Next config and sitemap.
