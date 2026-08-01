# English Khao Man Gai owner audit

**Route:** `https://go2-thailand.com/food/khao-man-gai/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Khao Man Gai owner. It owns Thai poached chicken rice, its Hainanese relationship, taste, sauce, soup, ordering, dietary boundaries, home-preparation safety and the Khao Man Gai Tod comparison. Thai chicken fried rice and Hat Yai fried chicken remain separate owners.

## Research evidence

- Two DataForSEO clusters with 237 raw keyword records and 61 competitor-domain records.
- Primary UK metrics: `khao man gai` volume 590 / KD 0 and `thai chicken rice` volume 260 / KD 11.
- Ten current UK-English SERPs with 72 organic results.
- 47 People Also Ask appearances and 36 unique genuine questions.
- Three complete DFS source parses: Eating Thai Food, Hot Thai Kitchen and Marion's Kitchen.
- Current Michelin Guide Thailand editorial evidence and an official UK Food Standards Agency poultry control.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Fried-rice, generic soup, basil-chicken, restaurant-near-me and one-recipe-only leakage was excluded.

## Design and content

- Added `components/food/KhaoManGaiGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/khao-man-gai-thai-chicken-rice-hero.webp` (1,672 x 941; 134,602 bytes).
- The composition shows fully cooked sliced poached chicken, fragrant rice, cucumber, separate ginger-chilli soybean sauce and clear broth on the right, with a deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, explicit soy/wheat/stock/halal/offal boundaries, poached-versus-fried-versus-mixed choice cards, a three-decision ordering route, safe poultry sequence, ten researched FAQs, source methodology and three canonical next steps.
- The origin explanation describes a Thai adaptation within the wider Hainanese chicken-rice family without assigning one modern inventor or collapsing Southeast Asian versions into one formula.
- Fixed prices, calories, universal health or halal verdicts, automatic gluten-free status, mandatory offal, one sauce or soup recipe and unsafe poultry advice were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and a six-cup rice cooker, both using `Check current price at Amazon` wording.
- Rice-cooker copy explicitly requires current capacity, programme, local voltage, plug, warranty, bowl-care and seller checks; OneLink is not described as a compatibility guarantee.
- One disclosed Klook cooking-class route that requires users to confirm the current menu and raw-poultry handling.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/thai-fried-rice/`, `/food/gai-tod-hat-yai/` and `/travel-guides/thai-cuisine-food-guide/`.

## Structured data and visual QA

- One H1: `Khao Man Gai`.
- Canonical: `https://go2-thailand.com/food/khao-man-gai/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; the hero, typography and at-a-glance panel remain legible without covering the plate.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, no horizontal overflow, sticky destination search and bottom navigation present.
- Progressive mobile scrolling loaded all six images; no image returned a broken state.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component and dispatcher - no errors; the generic fallback retains two pre-existing `<img>` performance warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-khao-man-gai-final-2026-07-28.json`.

The independently researched English dish system now covers twelve premium owners. Thirty-seven sitemap food-detail routes remain available for their own research and upgrade.
