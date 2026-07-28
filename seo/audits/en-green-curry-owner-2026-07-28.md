# English Green Curry owner audit — 2026-07-28

## Owner decision

`/food/green-curry/` remains the English owner for dish-definition, taste, ingredients, heat, dietary checks, ordering and preparation intent. It already holds two Thai-name ranking variants and has a distinct search job from `/blog/thai-curry-guide-green-red-yellow-massaman-panang/`.

The broad curry guide retains 49 comparison-oriented ranking keywords. No consolidation or redirect was appropriate: the two pages now serve complementary intents and link naturally within the same food cluster.

## Research evidence

- DataForSEO cluster: 317 keyword records and 50 competitor domains.
- `thai green curry`: UK volume 27,100, KD 31.
- `thai green curry recipe`: UK volume 33,100, KD 16; recipe intent was researched but not falsely claimed with untested Recipe schema.
- `thai green curry paste`: UK volume 5,400, KD 0.
- Vegetarian and vegan variants together expose meaningful demand around ingredient verification rather than a blanket suitability claim.
- Ten current UK-English SERPs: 78 organic results, 51 PAA appearances and 44 unique genuine questions.
- Exact ranking and backlink checks completed for both the dish owner and the comparison owner.
- Three usable full source parses: Thailand Foundation, Hot Thai Kitchen and Tourism Authority of Thailand regional-cuisine material. A current Michelin discovery capture was used as corroboration but not counted as a full body parse.
- Unsupported universal hottest-curry, exact-inventor, fixed-price, fixed-nutrition and automatic vegetarian/vegan claims were excluded.

## Premium implementation

- New rights-safe ImageGen hero showing a creamy herb-green curry, chicken, Thai aubergines, pea aubergines, basil and jasmine rice in a Central Thai riverside setting; converted to a 1,920 × 1,080 WebP asset at 185,376 bytes.
- Reuses `DishEditorialTemplate` with an owner-specific narrative, visual signals and decision support rather than generic swapped copy.
- Covers taste and texture, eight ingredient signals, curry-paste logic, coconut milk, protein choices and vendor-level fish sauce, shrimp paste, stock, soy, coconut, vegetarian and vegan checks.
- Explains that fresh green chillies define the paste while leaves may deepen colour, and avoids the inaccurate claim that `wan` makes every bowl overtly sweet.
- Includes specialist restaurant, market/food-court and home-cooking formats, a practical ordering flow and a cooking sequence without pretending to publish an independently tested recipe.
- Uses Organization, Article, BreadcrumbList, ItemList and FAQPage schema. Recipe schema remains absent.

## Affiliates and internal links

- One disclosed Klook cooking-class exit with sub-ID `en-green-curry-thailand-cooking-class` and a current-option check.
- Two contextual Amazon OneLink products through central `/go/` routes: `simple-thai-food-cookbook` and `thai-granite-mortar-eight-inch`.
- Both Amazon CTAs use current-price language; no static price, stock or delivery promise is shown.
- Natural internal links connect the dish owner to the broad curry comparison, English food hub and relevant cooking-class discovery route.

## Verification

- TypeScript passed with `--incremental false`.
- Targeted ESLint returned zero errors; only two inherited `<img>` warnings remain in the existing fallback page.
- SEO cannibalisation: 0 hard collisions and 0 warnings.
- Amazon affiliate verification: 16 used slugs and 20 registered products.
- Design-system verification: 7 primitives and 26 pilot templates.
- Desktop QA at 1,280 px: one H1, distinct hero, no horizontal overflow, five schema types and both Amazon routes rendered correctly.
- Mobile QA at 390 × 844: 375 px document width, no horizontal overflow, 343 px H1 width and both Amazon CTAs remained 277 × 68 px.
- Local owner route returned HTTP 200 with no broken loaded images.
- Final layered English runtime audit: 1,583/1,583 routes passed, zero hard failures and zero warnings.
- Sitemap inventory remains 1,583 EN + 693 NL = 2,276 public URLs.

Runtime evidence: `seo/audits/runtime/en-green-curry-final-2026-07-28.json`.
