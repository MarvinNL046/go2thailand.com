# English 7-Eleven Thailand owner audit — 2026-07-26

## Outcome

`/travel-guides/7-eleven-thailand/` is the independent English owner for 7-Eleven Thailand products, food, practical first baskets, broad price orientation, payment, SIM availability, opening hours and current alcohol-sale rules. It keeps the GA4 route supplied by the site owner and uses the shared premium practical-guide template without translating the Dutch copy literally.

## Research and search ownership

- The supplied GA4 report shows 244 views and 179 active users, making this the largest route in that report.
- DFS found no exact-owner ranking keywords and no backlink-summary signal to preserve beyond the stable route itself.
- The cluster produced 171 useful records and 34 competitor domains. `7 eleven in thailand` and its hyphenated variant each have 1,000 UK volume; the base phrase has 390.
- Twelve live English SERPs cover entity, product, food, price, payment, SIM, alcohol, opening, store count, snacks and heating intent.
- Three full competitor parses contain 1,197, 2,609 and 5,673 words. The owner deliberately replaces novelty-list length with travel decisions and current checks.
- Ten useful exact PAA questions render visibly and in FAQPage schema. Cigarette, unsupported medicine, sexualised and unrelated generic-budget PAA were excluded.

## Design and information gain

- Premium editorial storefront hero and quick-decision glass card.
- Need-first baskets, first-arrival visual, three food moments, four travel scenarios, broad price table, six service cards, night-rules banner, local-versus-pre-departure split, four mistake cards, FAQ and related guides.
- Six dedicated 7-Eleven editorial assets render through the shared design system.
- The owner separates store opening, product availability, payment acceptance, SIM activation and alcohol-sale time instead of treating 7-Eleven as one universal product list.
- Broad price bands are explicitly orientation only; shelf label, pack size, promotion and checkout remain decisive.

## Current facts and sources

- CP ALL’s official Q2 2025 financial statement supports the date-stamped 15,595-store figure at 30 June 2025. The page does not present it as a live 2026 count.
- Official CP ALL and 7-Eleven pages support Counter Service and digital-service context while the copy warns that visitor eligibility and branch availability vary.
- TAT’s 29 May 2026 update replaces the stale split retail windows with the general 11:00–24:00 alcohol-sales window and retains age, date, venue and location conditions.
- NBTC material supports identity and tourist-SIM boundaries.

## Affiliate architecture

- Amazon appears only in the pre-departure equipment decision: universal adapter, power bank and packable daypack.
- Each card visibly says `Check current price at Amazon`; no hard Amazon price is stored.
- Links use the central `/go/` OneLink routes, `nofollow sponsored noopener noreferrer` and visible disclosure.
- All three local redirects returned HTTP 307 to tagged Amazon product URLs.
- Cookware is intentionally absent because this is a store-visit owner, not a home-cooking owner.

## Technical and responsive QA

- Desktop at 1280 px: one H1, correct English canonical, EN/NL/x-default alternates, Organization plus Article/FAQPage/BreadcrumbList/ItemList schema, all affiliate links and zero horizontal overflow.
- Mobile at 390 × 844: sticky search, bottom navigation and all three current-price product cards remain readable; all 12 progressive images loaded with no broken image and zero horizontal overflow.
- Ten FAQ controls render with dark readable answer text.
- English and Dutch owner, SIM guide, budget guide and travel-gear routes return HTTP 200.
- Dutch owner also renders the updated 11.00–24.00 rule and three localized current-price CTAs.

## Gates

- Targeted ESLint — passed for the shared template; typed data files are excluded by project lint configuration.
- TypeScript `--noEmit --incremental false` — passed.
- Cannibalisation, design, affiliate and diff checks are run before commit.
