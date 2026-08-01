# English Nam Prik Ong owner audit

**Route:** `https://go2-thailand.com/food/nam-prik-ong/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Nam Prik Ong owner. It owns the Northern Thai pork-and-tomato chilli dip, its taste and texture, stable-versus-variable ingredients, accompaniments, dietary checks, ordering and safe minced-pork handling. Nam Prik Noom, Nam Prik Pao and Prik Nam Pla remain separate intents.

## Research evidence

- Two DataForSEO clusters with 31 raw keyword records and 50 competitor-domain records.
- UK head metric: `nam prik ong` volume 110 / KD 0. The higher-volume `nam prik pao` result is query leakage and was excluded.
- Ten current UK-English SERPs with 72 organic results.
- 55 People Also Ask appearances and 39 unique genuine questions.
- Two complete DFS source parses: Eating Thai Food and Hungry in Thailand.
- Current primary Lanna evidence from Chiang Mai University Library and current official travel context from the Tourism Authority of Thailand.
- Current top-result evidence from Serious Eats and an official UK Food Standards Agency safety boundary.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Recipe-only, near-me, lasagne, packaged-paste, fixed-price, calorie, health and generic lowest-calorie leakage was excluded.

## Design and content

- Added `components/food/NamPrikOngGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique text-free ImageGen hero: `public/images/redesign/nam-prik-ong-lanna-dip-hero.webp` (1,672 x 941; 143,064 bytes).
- The composition shows a clearly cooked chunky red pork-and-tomato dip with cabbage, cucumber, long beans, small eggplants, sticky rice and pork crackling on a Northern table, with a deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, explicit pork/shrimp/fish/soy/wheat/halal boundaries, three service choices, a three-decision ordering route, safe minced-pork sequence, ten researched FAQs, source methodology and three Northern canonical next steps.
- The owner clearly distinguishes red pork-and-tomato Nam Prik Ong from green Nam Prik Noom, roasted Nam Prik Pao and fish-sauce-based Prik Nam Pla.
- Fixed prices, calories, health verdicts, guaranteed heat, automatic dietary status, permanent restaurant rankings, invented history and one authentic formula were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and an eight-inch granite mortar, both using `Check current price at Amazon` wording.
- Product copy requires current edition, format, seller, capacity, weight and worktop checks; no product is presented as required.
- One disclosed Klook cooking-class route requiring users to confirm Nam Prik Ong is on the current menu and verify raw-pork handling, allergens, substitutions, language and cancellation terms.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/sai-ua/`, `/food/laab-kua/` and `/city/chiang-mai/`.

## Structured data and visual QA

- One H1: `Nam Prik Ong`.
- Canonical: `https://go2-thailand.com/food/nam-prik-ong/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; the chunky dip, copy zone and at-a-glance panel remain distinct.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, controlled two-line title and no horizontal overflow; sticky destination search and bottom navigation are visible.
- Hero and brand assets load successfully. Deferred related images have no broken state and remain lazy until their section approaches the viewport.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component - no errors; two pre-existing generic-page `<img>` warnings remain in `pages/food/[slug].tsx` outside the premium owner render path.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-nam-prik-ong-final-2026-07-28.json`.

The independently researched English dish system now covers fifteen premium owners. Thirty-four sitemap food-detail routes remain available for their own research and upgrade.
