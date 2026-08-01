# English Mango Sticky Rice owner audit — 2026-07-28

## Owner and consolidation

`/food/mango-sticky-rice/` is now the premium English owner for dish, ingredient, taste, rice, season, dietary, eating and preparation intent. It preserves five existing ranking variants, including both Thailand and recipe-language queries.

The overlapping English `/blog/mango-sticky-rice-season-thailand/` returned no ranking keywords and no reportable backlink summary signal. It now permanently redirects to the stronger owner and is absent from the English sitemap and feed. The Dutch seasonal article remains a live 200 page and was not consolidated.

## Research evidence

- DataForSEO cluster: 37 keyword records and 50 competitor domains.
- `mango sticky rice thailand`: UK volume 720, KD 19.
- `mango sticky rice recipe`: UK volume 2,900, KD 11.
- Ten current UK-English SERPs: 68 organic results, 56 PAA appearances and 50 unique genuine questions.
- Exact ranking and backlink checks completed for both candidate URLs.
- Four usable full DFS source parses: Hot Thai Kitchen, Tourism Authority of Thailand, Thailand Foundation and Coeliac UK.
- Celebrity, London, near-me delivery, fixed-price, fixed-calorie, one-best-shop, exact-invention and unsupported first-hand intent was excluded.

## Premium implementation

- New rights-safe ImageGen hero with golden mango, coconut sticky rice and a Thai canal-orchard setting; converted to a 1,920 × 1,080 WebP asset at 129,884 bytes.
- Reuses `DishEditorialTemplate` with dessert-specific taste, rice identity, topping, season, dietary, selection, eating and preparation content.
- Makes the rice distinction explicit: Thai long-grain glutinous rice is not jasmine, basmati or ordinary long-grain rice.
- Keeps the season evidence accurate: Thailand Foundation gives a broad late-March-to-July mango window and notes year-round availability; TAT supports summer context.
- Gives a coeliac boundary instead of a blanket claim: rice is naturally gluten-free, while thickener, topping, labels and cross-contact still require verification.
- Gives a vegan/dairy boundary instead of assuming every coconut-looking plate is plant-based.
- Uses Article, BreadcrumbList, ItemList and FAQPage schema; Recipe schema remains absent because exact tested quantities and timings are not republished.

## Affiliates and internal links

- One disclosed Klook cooking-class exit with sub-ID `en-mango-sticky-rice-dish-cooking-class` and an explicit current-menu check.
- Two contextual Amazon OneLink products through central `/go/` routes: a Thai cookbook and a six-cup rice cooker.
- The rice-cooker copy requires checking glutinous-rice/steam support, capacity, voltage, plug and warranty.
- Both Amazon buttons use “Check current price at Amazon”; no price or availability is implied.
- Eighteen English content/source files were updated so their natural links point directly to the canonical dish owner.
- Related content points to the Thai food hub, Bangkok street-food guide and vegetarian Thailand guide.

## Verification

- TypeScript: passed with `--incremental false`.
- Targeted ESLint: zero errors; two inherited fallback-page `<img>` warnings only.
- SEO cannibalisation: 0 hard collisions, 0 warnings.
- Amazon affiliate verification: 16 used slugs, 20 registered products.
- Design-system verification: 7 primitives and 26 pilot templates.
- Desktop QA at 1,280 px: one H1, distinct hero, two Amazon exits and one Klook exit rendered correctly.
- Mobile QA at 390 × 844: 375 px document width, no horizontal overflow, 343 px H1 width and both Amazon CTAs remained 277 × 68 px.
- Local runtime: owner 200, English legacy 308 to owner, Dutch legacy 200.
- Final EN sitewide audit: 1,584/1,584 routes passed, zero hard failures and zero warnings.
- Sitemap inventory: 1,584 EN + 693 NL = 2,277 public URLs after one intentional English consolidation.

Runtime evidence: `seo/audits/runtime/en-mango-sticky-rice-final-v2-2026-07-28.json`.
