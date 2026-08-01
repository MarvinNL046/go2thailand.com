# English Khao Soi owner audit — 2026-07-28

## Owner and consolidation

`/blog/khao-soi-chiang-mai-guide/` is the premium English owner for the dish definition, Chiang Mai context, taste, ingredients, noodles, heat, dietary checks, eating and preparation intent. It preserves five existing ranking variants.

The overlapping English `/food/khao-soi/` returned zero ranking keywords and no reportable backlink summary signal. It now permanently redirects to the stronger owner and is absent from the English sitemap. The Dutch `/nl/food/khao-soi/` remains a live 200 page and was not consolidated.

## Research evidence

- DataForSEO cluster: 69 keyword records and 50 competitor domains.
- `khao soi recipe`: UK volume 1,300, KD 22.
- `khao soi chiang mai`: UK volume 260, KD 0.
- `khao soi curry`: UK volume 260, KD 26.
- Ten current UK-English SERPs: 77 organic results, 57 PAA appearances and 44 unique genuine questions.
- Exact ranking and backlink checks completed for both candidate URLs.
- Three usable full DFS source parses: two Tourism Authority of Thailand articles and Hot Thai Kitchen. Current Michelin discovery captures add historical and ingredient corroboration; its direct body parser returned no content and was not counted as a full parse.
- Celebrity, near-me, delivery, static restaurant-ranking, fixed-price, fixed-nutrition and unsupported first-hand intent was excluded.

## Premium implementation

- New rights-safe ImageGen hero with a finished Chiang Mai-style bowl, visible soft and crisp noodle layers, condiments and a Lanna shophouse setting; converted to a 1,920 × 1,080 WebP asset at 125,722 bytes.
- Reuses `DishEditorialTemplate` while retaining the rank-bearing blog URL.
- Covers taste, texture, eight ingredient signals, wheat/egg/fish/shrimp/soy/coconut boundaries and vendor-level vegetarian, vegan and halal checks.
- Replaces a brittle “seven best restaurants” promise with specialist-shop, market/food-court and northern-restaurant choices plus current-check signals.
- Explains how to tune lime, pickle, shallot and chilli without promising one fixed spice level.
- Keeps the origin accurate: established northern Thai/Lanna food with regional Yunnan, Myanmar and Chin Haw trade connections, but no invented single creator or uncontested etymology.
- Uses Article, BreadcrumbList, ItemList and FAQPage schema. Recipe schema remains absent because exact independently tested quantities and timings are not republished.

## Affiliates and internal links

- One disclosed Klook Chiang Mai cooking-class exit with sub-ID `en-khao-soi-chiang-mai-cooking-class` and an explicit current-menu check.
- Two contextual Amazon OneLink products through central `/go/` routes: `simple-thai-food-cookbook` and `thai-granite-mortar-eight-inch`.
- Both Amazon buttons use “Check current price at Amazon”; no static price or availability is implied.
- Ten English editorial documents now link directly to the canonical owner.
- Dynamic links in the English food hub, related-dish cards and northern-region page also bypass the redirect, while Dutch routing remains unchanged.

## Verification

- TypeScript: passed with `--incremental false`.
- Targeted ESLint: zero errors; inherited warnings only in existing fallback files.
- SEO cannibalisation: 0 hard collisions and 0 warnings.
- Amazon affiliate verification: 16 used slugs and 20 registered products.
- Design-system verification: 7 primitives and 26 pilot templates.
- Desktop QA at 1,280 px: one H1, distinct hero, no overflow, four page schemas and both Amazon routes rendered correctly.
- Mobile QA at 390 × 844: 375 px document width, no horizontal overflow, 343 px H1 width and both Amazon CTAs remained 277 × 68 px.
- Local runtime: canonical owner 200, English dish duplicate 308 to owner and Dutch dish owner 200.
- English sitemap contains the blog owner once and excludes the duplicate; Dutch sitemap retains its dish owner; the RSS feed contains no duplicate dish URL.
- Final layered English runtime audit: 1,583/1,583 routes passed, zero hard failures and zero warnings.
- Sitemap inventory: 1,583 EN + 693 NL = 2,276 public URLs after the intentional English consolidation.

Runtime evidence: `seo/audits/runtime/en-khao-soi-final-v2-2026-07-28.json`.
