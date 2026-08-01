# English Thailand cooking classes owner — 27 July 2026

## Route and ownership

- Owner: `https://go2-thailand.com/best-cooking-classes-in-thailand/`
- Locale: English (`en-GB` article metadata)
- Dutch sibling retained at `/nl/best-cooking-classes-in-thailand/`; the legacy Dutch rendering was not replaced.
- Canonical verified: `https://go2-thailand.com/best-cooking-classes-in-thailand/`
- Reciprocal English and Dutch hreflang tags verified in the local runtime.

## DataForSEO research

- Existing-owner ranking check: no returned ranking keywords.
- Existing-owner backlink check: no returned backlinks.
- Keyword clusters:
  - `thai cooking class`: 211 records and 50 competitor domains.
  - `best cooking classes thailand`: 3 records.
- Main broad English terms in the UK dataset:
  - `thai cooking class`: volume 590, KD 0.
  - `cooking class thai`: volume 590, KD 0.
  - `thai cooking class bangkok`: volume 50, KD 3.
  - `thai cooking class chiang mai`: volume 50, KD 3.
  - `thai cooking class phuket`: volume 50, KD 0.
- Ten live SERPs produced 94 organic results and 33 captured People Also Ask questions.
- Three pages parsed through DataForSEO Content Parsing:
  - The Best Thai Cooking Course.
  - Greta’s Travels Chiang Mai cooking-class article.
  - The Happy Jetlagger Thailand cooking-class article.
- Excluded intent: UK-local classes, London/Manchester/near-me queries, online courses, recipes and non-travel food searches.

## Editorial decisions

- Replaced the unsupported static “best schools” leaderboard with a decision owner organised by city, format and booking checks.
- Did not publish frozen prices, ratings, review counts, schedules or cancellation promises.
- City recommendations are conditional rather than universal rankings.
- Genuine PAA wording is used in the FAQ; answers are independently written and avoid pretending a static price is current.
- Added an information-gain distinction between dishes demonstrated, dishes prepared together and dishes cooked personally.
- Added explicit dietary and allergy guidance covering ingredients and cross-contact, with FARE chef-card and cross-contact sources.

## Affiliate implementation

- Klook links use the central affiliate constants, city-specific routes where available and unique sub IDs.
- Every commercial Klook link is marked `noopener noreferrer nofollow sponsored`.
- CTAs consistently say “check current” rather than presenting stale prices.
- Amazon cross-sell is limited to three context-matched products:
  - granite mortar;
  - Thai cookbook;
  - rice cooker.
- All three use registered `/go/` routes and the existing OneLink strategy.
- Amazon verification passed: 18 used slugs and 20 registered products.

## Schema and technical verification

- Runtime response: 200.
- Premium-template marker: 1.
- JSON-LD: Article, ItemList and FAQPage plus global site schema.
- Sponsored-link occurrences: 11.
- Amazon product routes in HTML: 3.
- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Linked food, curry, vegetarian and product routes checked; editorial routes return 200 and Amazon routes return the expected 307 affiliate redirect.
- Desktop browser QA: 1280 × 720, no document overflow, hero crop and copy hierarchy verified.
- Mobile browser QA: 390 × 844, no document overflow, horizontal section navigation scrolls intentionally, hero/buttons/cards/allergy section/footer remain readable and unobstructed.

## New visual asset

- Source PNG: `public/images/redesign/thailand-cooking-classes-hero-v2.png`
- Optimised WebP: `public/images/redesign/thailand-cooking-classes-hero-v2.webp`
- Output: 1920 × 960 WebP, 144,344 bytes.
- Generation mode: built-in image generation tool.
- Final prompt:

> Use case: photorealistic-natural. Asset type: premium editorial website hero for an English Thailand cooking-class guide. Create a cinematic, believable Thai cooking class in an elegant open-air kitchen in Thailand. A Thai cooking instructor and two adult international travellers work together around a dark timber counter, pounding curry paste in a granite mortar and arranging lemongrass, galangal, kaffir lime leaves, chillies, limes and Thai basil. The moment should feel instructional and candid rather than staged. Lush tropical garden beyond the open kitchen, subtle market baskets and copper cookware, unmistakably Thailand without tourist clichés. High-end natural editorial travel photography, realistic people, hands and food textures, restrained magazine aesthetic. Wide 2:1 landscape; subjects and vivid ingredients concentrated on the right half; calm darker negative space on the left for large headline copy; foreground counter creates depth; no important faces at crop edges. Warm late-afternoon side light, soft tropical haze, confident and intimate, balanced contrast suitable beneath a subtle dark overlay. Deep jade green, warm timber, saffron orange, herb green and natural skin tones. Culturally respectful, food-safe working scene, realistic kitchen tools, no visible brand, text, logo, watermark, restaurant signage, duplicated objects, extra fingers or exaggerated saturation. Avoid generic stock-photo smiles, chef hats, luxury-hotel buffets, floating ingredients and typography.

## Primary sources

- UNESCO Intangible Cultural Heritage — Tomyum Kung (inscribed 2024).
- Tourism Authority of Thailand — Phuket City of Gastronomy context.
- Tourism Authority of Thailand — Chiang Mai destination and Lanna food context.
- Food Allergy Research & Education — chef cards and cross-contact guidance.
