# English Thai curry guide owner audit

Date: 2026-07-26  
Owner: `https://go2-thailand.com/blog/thai-curry-guide-green-red-yellow-massaman-panang/`

## Outcome

The existing ranking URL now has an independent English premium owner rather than falling through to the generic blog renderer. The Dutch owner remains unchanged. The English page reuses the shared editorial design primitives and existing custom curry visuals, while its copy, PAA set, schema and search strategy are English-specific.

## Search and content evidence

- Protected 49 existing English ranking queries for the URL.
- Dedicated sections answer the strongest comparison intent: green vs red, heat level, Massaman vs Panang, Panang vs red and beginner choice.
- Independent DataForSEO runs retained exact English PAA evidence. The rendered FAQ uses 11 questions returned by those runs and does not invent PAA wording.
- Four competitor parses are stored under `seo/research/en/sources/`; three measurable bodies ranged from 768 to 2,279 words.
- The rendered page contains about 2,251 visible body words in browser verification, inside the deliberately expanded useful-content target for this ranking owner.
- Recipe intent remains separate: the owner explains a reusable cooking workflow but does not publish five duplicate recipes.
- Content brief: `seo/research/en/2026-07-26-thai-curry-guide-content-brief.md`.

## Information gain

- Colour is explicitly separated from heat.
- Travellers choose by aroma, sauce texture and meal context.
- Green vs red and Massaman vs Panang receive dedicated decision paths.
- Ordering guidance explains that a pre-cooked rice-and-curry pot may not be adjustable.
- Vegetarian, fish sauce, shrimp paste, peanut and cross-contact questions are separated.
- Allergy guidance is supported by the UK Food Standards Agency and includes a clear non-medical disclaimer.

## Affiliate and price implementation

- Klook appears only in the learn-to-cook context with `Check current class price at Klook`.
- Three relevant Amazon products appear only in the home-cooking kit: granite mortar, rice cooker and a Thai cookbook.
- Every Amazon card says `Check current price at Amazon`.
- No unstable hard price is published.
- Amazon links use the central `/go/` router and explain OneLink/local-store variation.
- Browser output contains 3 Amazon `/go/` links, 5 sponsored links in total and clear disclosures.
- All external commercial links use sponsored/nofollow attributes.

## Technical SEO

- HTTP 200 on English and Dutch owner routes.
- Exactly one visible H1 and one main landmark.
- Canonical: `https://go2-thailand.com/blog/thai-curry-guide-green-red-yellow-massaman-panang/`.
- Hreflang: English, Dutch and x-default all resolve to the expected URLs.
- Structured data: Organization, Article, FAQPage, BreadcrumbList and ItemList.
- Article `inLanguage` is `en`; FAQPage contains 11 questions.
- All seven rendered non-affiliate internal routes returned HTTP 200.
- No Dutch copy leak detected in the English owner.

## Browser and responsive QA

- Desktop: 1280 x 720, no horizontal overflow, no framework error overlay.
- Mobile: 390 x 844, no horizontal overflow, H1 visible, no console errors.
- Hero, quick taste card, premium comparison modules and cooking section visually inspected.
- The lazy-loaded cooking image completed at 390 px with a 390 px natural render.
- All three Amazon current-price cards are simultaneously readable on mobile.

## Gates

- `npm run affiliate:verify`: passed, 16 used slugs / 18 registered products.
- `npm run seo:cannibalization`: passed, 0 hard collisions / 0 warnings.
- `npm run design:verify`: passed, 7 primitives / 26 pilot templates.
- `npx tsc --noEmit --incremental false`: passed.
- Local server remains active on port 3000.
