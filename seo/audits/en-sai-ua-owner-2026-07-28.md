# English Sai Ua owner audit

**Route:** `https://go2-thailand.com/food/sai-ua/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Sai Ua owner. It owns Sai Ua / Sai Oua spelling and pronunciation, Northern fresh herbal pork sausage, curry-paste and herb signals, casing, grilling, accompaniments, heat, ordering and safe doneness. Fermented Sai Krok Isan remains a separate owner.

## Research evidence

- Two DataForSEO clusters with 43 raw keyword records and 100 competitor-domain records.
- UK metrics: `sai oua` volume 590 / KD 0, `sai ua` volume 90 / KD 0 and `northern thai sausage` volume 70 / KD 0.
- Ten current UK-English SERPs with 75 organic results.
- 52 People Also Ask appearances and 34 unique genuine questions.
- Four complete DFS source parses: Hot Thai Kitchen, Meatwave, Ian Benites and Thailand Foundation.
- Current primary Thai context from Chiang Mai University and Thailand Foundation plus a current Michelin Guide Thailand capture.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Near-me, frozen-product, best-market, Chinese-sausage and recipe-only leakage was excluded.

## Design and content

- Added `components/food/SaiUaGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/sai-ua-northern-sausage-hero.webp` (1,672 x 941; 138,176 bytes).
- The composition shows a fully cooked browned coil and slices with visible herb flecks beside sticky rice, vegetables and nam prik noom on the right, with a dark Lanna setting and deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, explicit casing/fish/shrimp/soy/wheat/halal boundaries, market-versus-shared-plate-versus-caseless choice cards, a three-decision ordering route, safe fresh-sausage sequence, ten researched FAQs, source methodology and three Northern canonical next steps.
- The owner makes fresh aromatic Sai Ua and fermented sour Sai Krok Isan materially distinct without treating either as a universal recipe.
- Fixed prices, calories, permanent market rankings, guaranteed heat, automatic dietary status, fixed shelf life, raw-centre reassurance and one authentic formula were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and an eight-inch granite mortar, both using `Check current price at Amazon` wording.
- Product copy requires current edition, format, seller, capacity, weight and worktop checks; no equipment is presented as necessary.
- One disclosed Klook cooking-class route requiring users to verify Sai Ua is on the current menu and ask about stuffing, raw-pork handling, allergens and language.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/laab-kua/`, `/blog/khao-soi-chiang-mai-guide/` and `/city/chiang-mai/`.

## Structured data and visual QA

- One H1: `Sai Ua`.
- Canonical: `https://go2-thailand.com/food/sai-ua/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; sliced sausage, sticky rice, copy and at-a-glance panel remain distinct.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, no horizontal overflow, sticky destination search and bottom navigation present.
- Progressive mobile scrolling loaded all six images; no image returned a broken state.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component - no errors or warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-sai-ua-final-2026-07-28.json`.

The independently researched English dish system now covers fourteen premium owners. Thirty-five sitemap food-detail routes remain available for their own research and upgrade.
