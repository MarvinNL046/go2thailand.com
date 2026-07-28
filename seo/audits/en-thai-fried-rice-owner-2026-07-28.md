# English Thai Fried Rice / Khao Pad owner audit

**Route:** `https://go2-thailand.com/food/thai-fried-rice/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Thai Fried Rice owner. It owns broad Khao Pad definition, spelling, taste, ingredients, named proteins, ordering, heat, sauce, allergen, comparison and safe preparation intent. Pineapple-specific Khao Pad Sapparot remains a separate supporting owner.

## Research evidence

- Two DataForSEO clusters with 392 raw keyword records and 100 competitor-domain records.
- Primary UK metrics: `thai fried rice` volume 1,300 / KD 20; `khao pad`, `khao pad thai` and `thai fried rice khao pad` volume 1,000 / KD 1.
- Ten current UK-English SERPs with 75 organic results.
- 57 People Also Ask appearances and 41 unique genuine questions.
- Five complete DFS source parses: Thailand Foundation, Eating Thai Food, Rosa's Thai, The Woks of Life and the UK Food Standards Agency.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Near-me, takeaway, unrelated Pad Kra Pao, generic Chinese-fried-rice and one-recipe-only leakage was excluded.

## Design and content

- Added `components/food/ThaiFriedRiceGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/thai-fried-rice-khao-pad-hero.webp` (1,672 x 941; 105,972 bytes).
- The composition uses fully cooked loose jasmine rice, prawn, egg and greens with separate lime, cucumber and prik nam pla on the right, a subtle wok behind it and a deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, fish/shellfish/egg/soy/wheat boundaries, classic-versus-protein-versus-pineapple choice cards, a three-decision ordering route, safe rice handling sequence, ten researched FAQs, source methodology and three canonical next steps.
- The comparison avoids reducing either Thai or Chinese fried-rice traditions to one formula.
- Fixed prices, calories, universal health verdicts, unsafe room-temperature rice advice, automatic dietary labels and one-authentic-recipe claims were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and a six-cup rice cooker, both using `Check current price at Amazon` wording.
- The rice-cooker copy explicitly requires current capacity, local voltage, plug, warranty, bowl-care and seller checks; OneLink is not described as a compatibility guarantee.
- One disclosed Klook cooking-class route that requires users to confirm Khao Pad is actually on the current menu.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/khao-pad-sapparot/`, `/food/pad-krapow/` and `/travel-guides/thai-cuisine-food-guide/`.

## Structured data and visual QA

- One H1: `Thai Fried Rice`.
- Canonical: `https://go2-thailand.com/food/thai-fried-rice/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px, no horizontal overflow, hero loaded at 1,114 x 627 rendered pixels and all lazy images loaded after progressive scrolling.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, no horizontal overflow, sticky destination search and bottom navigation present.
- Both Amazon CTAs are 277 x 68 px on mobile; the Klook CTA is 277 x 48 px.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text and is clearly legible.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component and dispatcher - no errors; the generic fallback retains two pre-existing `<img>` performance warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-thai-fried-rice-final-2026-07-28.json`.

The English dish system now covers eleven independently researched dish owners while keeping the 38 remaining sitemap food-detail routes available for their own research and premium upgrade.
