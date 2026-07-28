# English Boat Noodles owner audit

**Route:** `https://go2-thailand.com/food/boat-noodles/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Boat Noodles owner. It owns Guay Tiew Ruea naming, canal and small-bowl context, dark aromatic broth, pork-or-beef and noodle choices, blood and nam-tok explanation, ordering, dietary boundaries and safe home-preparation framing. Sukhothai Noodles, Tom Yum Noodles and grilled-meat nam tok remain separate owners.

## Research evidence

- Two DataForSEO clusters with 211 raw keyword records and 50 competitor-domain records.
- Primary UK metrics: `boat noodles` volume 1,300 / KD 4 and `thai boat noodles` volume 1,300 / KD 1.
- Ten current UK-English SERPs with 72 organic results.
- 55 People Also Ask appearances and 41 unique genuine questions.
- Three complete DFS source parses: Hot Thai Kitchen, SBS Food and Eating Thai Food.
- Current official-context evidence from the Thailand Ministry of Foreign Affairs food guide; one recurring Serious Eats competitor capture returned no DFS markdown and supplied no factual payload.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Branded instant-noodle, London restaurant, near-me and unrelated nam-tok leakage was excluded.

## Design and content

- Added `components/food/BoatNoodlesGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/boat-noodles-canal-bowl-hero.webp` (1,672 x 941; 117,304 bytes).
- The image uses a fully cooked small bowl with dark broth, rice noodles, sliced meat, meatball, greens and separate condiments on the right, a Bangkok canal cue behind it and a deep-jade copy zone on the left. It contains no visible blood, raw meat, text or brand.
- Added a four-signal taste compass, eight ingredient signals, explicit blood/offal/soy/wheat/fish/halal boundaries, pork-versus-beef-versus-blood-free choice cards, a three-decision ordering route, controlled stock-and-noodle sequence, ten researched FAQs, source methodology and three canonical next steps.
- The owner explains the different noodle-broth and grilled-meat-salad meanings of `nam tok` without merging their search tasks.
- Fixed prices, bowl counts, calories, universal health or heat verdicts, automatic dietary labels, universal blood content, raw-blood instructions and permanent restaurant recommendations were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and an eight-inch granite mortar, both using `Check current price at Amazon` wording.
- Product copy explains the actual task and requires current edition, seller, format, usable dimensions, weight or worktop checks; neither product is described as necessary.
- One disclosed Klook cooking-class route requiring users to verify Boat Noodles are on the current menu and ask about blood, food handling, allergens and language.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/sukhothai-noodles/`, `/food/tom-yum-noodles/` and `/travel-guides/thai-cuisine-food-guide/`.

## Structured data and visual QA

- One H1: `Boat Noodles`.
- Canonical: `https://go2-thailand.com/food/boat-noodles/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; the hero, bowl, typography and at-a-glance panel remain distinct.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, no horizontal overflow, sticky destination search and bottom navigation present.
- Progressive mobile scrolling loaded all six images; no image returned a broken state.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component - no errors or warnings after removing one unused icon import.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-boat-noodles-final-2026-07-28.json`.

The independently researched English dish system now covers thirteen premium owners. Thirty-six sitemap food-detail routes remain available for their own research and upgrade.
