# English Laab Kua owner audit

**Route:** `https://go2-thailand.com/food/laab-kua/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English dish fallback has been replaced with a premium, evidence-bounded Laab Kua owner. It owns the cooked Northern Thai and Lanna intent around Laab Kua, Laab Khua, Larb Kua, prik laab and makhwaen, while preserving `/food/larb/` for the broader Isan-style larb topic.

## Research evidence

- Three independent DataForSEO clusters with four keyword records; the exact head term records have very limited volume and no reported keyword difficulty.
- Ten current UK-English SERPs with 67 organic results.
- 55 People Also Ask appearances and 32 unique genuine questions.
- Three complete source parses plus a current primary Chiang Mai University source capture.
- Exact ranking and backlink checks for `/food/laab-kua/`: zero ranking terms and no reportable backlink summary signal.
- Research boundaries cross-checked against Northern Thai context, current cooking technique and WHO food-safety guidance.
- Restaurant-near-me, universal spice-list, fixed-calorie, automatic dietary and unsafe raw-meat questions were excluded or carefully bounded.

## Design and content

- Added `components/food/LaabKuaGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/laab-kua-lanna-table-hero.webp` (1,920 x 1,080; 204,064 bytes).
- The composition is deliberately distinct from the Larb owner: dark cooked spice-led mince, fried shallot, herbs, makhwaen and dried-chilli bowls on a Lanna indigo-and-rust setting, with a charcoal copy zone on the left.
- Added a roasted-aromatic taste compass, eight ingredient signals, Northern-versus-raw-versus-Isan boundary cards, a cooked preparation sequence, practical ordering guidance, researched FAQs, source methodology and canonical next steps.
- The copy explains that spice blends vary and that Sichuan pepper may be a substitute for makhwaen but is not identical.
- Unsupported fixed prices, calories, universal health or safety labels, automatic gluten-free or vegetarian claims and one-authentic-spice-list language were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: a Thai cookbook and granite mortar, both using `Check current price at Amazon` wording.
- One disclosed Klook cooking-class route with current-menu, allergen and food-handling checks.
- All three commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/larb/`, `/city/chiang-mai/` and `/blog/khao-soi-chiang-mai-guide/`.
- The Khao Soi handoff was corrected from the redirecting legacy route to its final canonical destination before the final runtime audit.

## Structured data and technical QA

- One H1: `Laab Kua`.
- Canonical: `https://go2-thailand.com/food/laab-kua/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px, no horizontal overflow and all assets loaded.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px, no horizontal overflow, sticky search and bottom navigation present.
- Both Amazon CTAs are 277 x 68 px on mobile; the Klook CTA is 277 x 48 px.
- Progressive full-page loading found zero broken images; expanded FAQ copy remains legible on mobile.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component and route dispatcher - passed with no errors; the generic route retains two pre-existing `<img>` performance warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs of 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-laab-kua-final-2026-07-28.json`.

The reusable dish system now covers ten independently researched English dish owners without collapsing the Northern cooked-spiced variant into the broader Larb owner or forcing unrelated commercial products into the page.
