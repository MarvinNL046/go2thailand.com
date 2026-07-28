# English Massaman Curry owner audit — 2026-07-28

## Owner and intent

`/food/massaman-curry/` is now the premium traveller-facing Massaman owner. It answers recognition, taste, ingredient, heat, ordering, origin, halal and vegetarian intent without becoming an untested recipe page. The broad `/blog/thai-curry-guide-green-red-yellow-massaman-panang/` remains a separate comparison pillar and links naturally to this owner.

The canonical owner returned no ranking keywords and no reportable backlink summary signal in the exact DataForSEO checks, so no competing route or link equity required migration.

## Research evidence

- DataForSEO comparison cluster: 92 keyword records and 50 competitor domains.
- Primary UK signal: `massaman curry thailand`, volume 27,100 and KD 23.
- Ten current UK-English SERPs: 75 organic results, 58 PAA appearances and 48 unique genuine questions.
- Four usable full source parses: Hot Thai Kitchen, two Tourism Authority of Thailand sources and Thailand Foundation.
- Michelin's current history result was retained only as discovery evidence because its DFS parse returned no usable body.
- Recipe-only, celebrity, supermarket, takeaway, fixed-price, fixed-nutrition and unsupported first-hand intent was excluded.

## Premium implementation

- New rights-safe ImageGen hero with copper Massaman, warm spices and Thai-Muslim dining cues; converted to a 1,920 × 1,080 WebP asset at 107,302 bytes.
- Reuses `DishEditorialTemplate` while supplying Massaman-specific taste, texture, ingredients, version decisions, cooking sequence and FAQ content.
- Makes the halal boundary explicit: Muslim roots do not prove meat sourcing, stock, alcohol-free preparation, utensils or certification.
- Makes the vegetarian boundary explicit: paste, shrimp paste, fish sauce, stock, protein and shared equipment require confirmation.
- Presents chicken, beef and deliberately confirmed meat-free versions without authenticity ranking.
- Uses Article, BreadcrumbList, ItemList and FAQPage schema; Recipe schema is intentionally absent because no tested quantities or timings are published.

## Affiliates and internal links

- One disclosed Klook cooking-class exit with sub-ID `en-massaman-curry-dish-cooking-class` and current-option wording.
- Two restrained Amazon OneLink products through central `/go/` routes: a Thai cookbook and an eight-inch granite mortar.
- Both Amazon buttons use “Check current price at Amazon”; no price, seller or availability is implied.
- Natural related links point to the Thai curry comparison pillar, Thai food hub and vegetarian Thailand guide.
- The English food hub's old Massaman block no longer claims fixed baht prices, a universal heat ranking or automatic halal status.

## Verification

- TypeScript: passed with `--incremental false`.
- Targeted ESLint: zero errors; two inherited legacy `<img>` warnings in the fallback dish page only.
- SEO cannibalisation: 0 hard collisions, 0 warnings.
- Amazon affiliate verification: 16 used slugs, 20 registered products.
- Design-system verification: 7 primitives and 26 pilot templates.
- Desktop QA at 1,280 px: one H1, distinct hero, side card, two Amazon exits and one Klook exit rendered correctly.
- Mobile QA at 390 × 844: 375 px document width, no horizontal overflow, 343 px H1 width and both Amazon CTAs remained 277 × 68 px.
- Local runtime: `/` and `/food/massaman-curry/` returned HTTP 200.
- Final EN sitewide audit: 1,585/1,585 routes passed, zero hard failures and zero warnings.
- Sitemap inventory remains 1,585 EN + 693 NL = 2,278 public URLs; no route consolidation was needed.

Runtime evidence: `seo/audits/runtime/en-massaman-curry-final-2026-07-28.json`.
