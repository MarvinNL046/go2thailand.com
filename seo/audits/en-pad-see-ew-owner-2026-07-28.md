# English Pad See Ew owner audit — 2026-07-28

## Owner decision

`/food/pad-see-ew/` remains the canonical English owner for dish definition, name meaning, taste, fresh wide noodles, sauce, mildness, protein, dietary checks, ordering and comparison intent. It is the only English Pad See Ew route in the sitemap.

Exact DFS checks returned no current ranking keywords and no reportable live backlink-summary signal. That creates room to rebuild the thin fallback without a consolidation. Two stale editorial links used `/food/pad-see-ev/`; the English link now resolves to this owner and the Dutch link now resolves directly to `/nl/food/pad-see-ew/`.

## Research evidence

- `pad see ew`: UK volume 9,900, KD 19.
- `thai dish pad see ew`: UK volume 9,900, KD 8.
- `pad see ew recipe`: UK volume 1,300, KD 5; researched as adjacent technique intent without claiming Recipe schema.
- `pad see ew noodles`: UK volume 480, KD 8.
- `pad see ew vs pad thai`: UK volume 480, KD 11.
- `pad see ew vs pad kee mao`: UK volume 210, KD 0.
- DataForSEO cluster: 242 keyword records and 50 competitor domains.
- Ten current UK-English SERPs: 75 organic results, 58 PAA appearances and 46 unique genuine questions.
- Four usable full parses: Hot Thai Kitchen, Tourism Authority of Thailand, Thailand Foundation and RecipeTin Eats.
- Fixed-calorie, healthiest/unhealthiest, restaurant-near-me, brand-menu, exact-origin-date and unsupported first-hand intent was excluded.

## Premium implementation

- New rights-safe ImageGen hero showing broad glossy fresh rice-noodle folds, gai lan, egg, pork and a dark wok in a warm Yaowarat shophouse.
- Hero converted to a 1,672 × 941 WebP at 131,416 bytes, with a deep-jade copy zone and all identifiable noodle action on the right.
- Reuses `DishEditorialTemplate` but has a unique noodle-fold/wok-motion composition rather than a plated curry or Pad Kra Pao scene.
- Covers taste and texture, eight ingredient signals, fresh `sen yai`, noodle variants, light/black soy, oyster/fish sauce, egg, protein and chilli-vinegar context.
- States the dietary boundary precisely: rice noodles alone do not make the finished dish gluten-free, vegetarian or vegan; labels, marinades and shared woks matter.
- Replaces old fixed-price and generic restaurant claims with made-to-order stall, food-court/restaurant and home/class decision cards.
- Explains Pad Thai and Pad Kee Mao differences without claiming those entire comparison clusters.
- Uses Article, BreadcrumbList, ItemList and FAQPage schema. Recipe schema remains absent because quantities, yield and timings were not independently tested and republished.

## Affiliates and internal links

- One disclosed Klook cooking-class exit with sub-ID `en-pad-see-ew-thailand-cooking-class` and an explicit current-menu check.
- One restrained Amazon OneLink product through `/go/simple-thai-food-cookbook/` with “Check current price at Amazon” language.
- A random wok product was deliberately not added without current product research; the page does not force a gadget merely to create a second commission opportunity.
- Natural links connect the owner to Pad Thai, the street-food guide and English food hub.
- The stale English and Dutch `/food/pad-see-ev/` links now point directly to the correct locale owners.

## Verification

- TypeScript passed with `--incremental false`.
- Targeted ESLint returned zero errors; only two inherited `<img>` warnings remain in the generic fallback page.
- SEO cannibalisation: 0 hard collisions and 0 warnings.
- Amazon affiliate verification: 16 used slugs and 20 registered products.
- Design-system verification: 7 primitives and 26 pilot templates.
- Desktop QA at 1,280 px: one H1, distinct hero, 1,265 px document width, no horizontal overflow, five rendered schema types and the Amazon route.
- Mobile QA at 390 × 844: 375 px document width, no horizontal overflow, 343 px H1 width, working sticky search and bottom navigation, and the Amazon CTA at 277 × 68 px.
- No broken loaded images; the new hero loaded successfully.
- Owner route returned HTTP 200. The corrected Dutch blog route returned HTTP 200 and renders the locale-aware Pad See Ew owner link.
- Final layered English runtime audit: 1,583/1,583 routes passed, zero hard failures and zero warnings.
- Sitemap inventory remains 1,583 EN + 693 NL = 2,276 public URLs.

Runtime evidence: `seo/audits/runtime/en-pad-see-ew-final-2026-07-28.json`.
