# English Gaeng Hang Lay owner audit

**Route:** `https://go2-thailand.com/food/gaeng-hang-lay/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Gaeng Hang Lay owner. It owns Gaeng Hang Lay / Gaeng Hung Lay / Kaeng Hang Le spelling, the Northern slow-braised pork curry, no-coconut-milk pattern, ginger/tamarind/warm-spice signals, Myanmar influence, regional variations, heat, dietary checks and ordering. Massaman remains a separate owner.

## Research evidence

- Two DataForSEO clusters with three raw keyword records; DFS returned no competitor-domain table for this low-volume entity cluster.
- UK metrics: `gaeng hang lay` volume 30, `gaeng hang lay chiang mai` volume 10 and `northern thai pork curry` volume 10; no KD value was returned.
- Ten current UK-English SERPs with 72 organic results.
- 53 People Also Ask appearances and 35 unique genuine questions.
- Three complete DFS source parses: Hot Thai Kitchen and two Thailand Foundation context sources.
- Current primary Lanna evidence from Chiang Mai University Library and current Michelin Guide Thailand editorial evidence.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Generic curry rankings, celebrity, nightlife, near-me and recipe-only leakage was excluded.

## Design and content

- Added `components/food/GaengHangLayGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique text-free ImageGen hero: `public/images/redesign/gaeng-hang-lay-braised-pork-hero.webp` (1,672 x 941; 147,850 bytes).
- The composition shows fully cooked tender pork in a deep rust, non-creamy curry with ginger threads and whole garlic beside sticky rice on a Lanna table, with a deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, explicit pork/peanut/shrimp/fish/soy/wheat/sesame/halal boundaries, three regional/service choices, a three-decision ordering route, safe braising sequence, ten researched FAQs, source methodology and three Northern canonical next steps.
- The owner distinguishes Hang Lay from Massaman through its Northern pork-braise identity and familiar absence of coconut milk without claiming one universal recipe.
- Fixed prices, calories, health verdicts, guaranteed heat, automatic dietary status, permanent restaurant rankings, absolute origin claims and one formula were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and an eight-inch granite mortar, both using `Check current price at Amazon` wording.
- Product copy requires current edition, format, seller, mortar capacity, weight and worktop checks; neither product is presented as required.
- One disclosed Klook cooking-class route requiring users to confirm Gaeng Hang Lay is on the current menu and verify pork handling, peanuts, shrimp paste, substitutions, language and cancellation terms.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/nam-prik-ong/`, `/food/sai-ua/` and `/city/chiang-mai/`.

## Structured data and visual QA

- One H1: `Gaeng Hang Lay`.
- Canonical: `https://go2-thailand.com/food/gaeng-hang-lay/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; the three-line title, pork curry and at-a-glance panel remain balanced.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, controlled three-line title and no horizontal overflow; sticky destination search and bottom navigation are visible.
- Hero resolves through Next Image at 1,114 px on desktop and 390 px on mobile.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component - no errors or warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-gaeng-hang-lay-final-2026-07-28.json`.

The independently researched English dish system now covers sixteen premium owners. Thirty-three sitemap food-detail routes remain available for their own research and upgrade.
