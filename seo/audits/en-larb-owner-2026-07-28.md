# English Larb owner audit

**Route:** `https://go2-thailand.com/food/larb/`  
**Status:** implemented and verified locally  
**Audit date:** 28 July 2026

## Outcome

The generic English dish fallback has been replaced with a premium, evidence-bounded Larb owner. It keeps broad Isan larb, spelling, ingredient, ordering, heat, cooked-versus-raw and dietary intent on `/food/larb/`, while preserving `/food/laab-kua/` as the independent Northern cooked and dry-spiced variant.

## Research evidence

- 216 DataForSEO keyword records and 50 competitor domains.
- Ten current UK-English SERPs with 76 organic results.
- 53 People Also Ask appearances and 41 unique genuine questions.
- Four complete DFS source parses: Thailand Foundation Isan context, Hot Thai Kitchen technique, WHO food-safety guidance and Thailand Foundation Northern context.
- Exact rankings and backlink checks for both `/food/larb/` and `/food/laab-kua/`: zero ranking terms and no reportable backlink summary signal.
- Ten useful exact-search questions retained; celebrity recipes, restaurant-near-me, fixed-calorie, weight-loss and unrelated dish questions excluded.

## Design and content

- Added `components/food/LarbGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique, text-free ImageGen hero: `public/images/redesign/larb-isaan-table-hero.webp` (1,920 × 1,080; 173,412 bytes).
- The ImageGen composition deliberately places a fully cooked larb plate, sticky-rice basket and vegetables on the right with a deep-jade copy zone on the left; it excludes raw meat, blood, peanuts, curry, noodles, logos and text.
- Added taste compass, eight ingredient signals, allergen and vegetarian boundaries, Isan-versus-Northern-versus-nam-tok choice cards, a three-decision ordering route, safe cooking sequence, ten researched FAQs, source methodology and three natural next steps.
- Unsupported fixed prices, calories, universal health labels, raw-meat reassurance, automatic gluten-free or vegetarian claims and one-authentic-version language were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: the Thai cookbook and granite mortar, both with `Check current price at Amazon` wording.
- One disclosed Klook cooking-class route with current-menu, allergen and handling checks.
- All three commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/food/laab-kua/`, `/food/som-tam/` and `/region/isaan/`; the shared template also links to the Thai food and vegetarian ordering owners.

## Structured data and technical QA

- One H1: `Larb`.
- Canonical: `https://go2-thailand.com/food/larb/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 × 900: document width 1,265 px, no horizontal overflow, all assets loaded.
- Mobile QA at 390 × 844: document width 375 px, H1 width 343 px, no horizontal overflow, sticky search and bottom navigation present.
- Both Amazon CTAs are 277 × 68 px on mobile; the Klook CTA is 277 × 48 px.
- Progressive full-page loading found zero broken images; expanded FAQ copy remains legible on mobile.

## Gates

- `npx tsc --noEmit --incremental false` — passed.
- Focused ESLint for the new component and route dispatcher — passed with zero output.
- SEO cannibalisation — 0 hard collisions and 0 warnings.
- Amazon affiliate verification — 16 used slugs of 20 registered products.
- Design-system verification — 7 primitives and 26 pilot templates.
- Layered English runtime audit — 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-larb-final-2026-07-28.json`.

The reusable dish system now covers nine independently researched English dish owners without reducing `/food/laab-kua/` to a duplicate or forcing a product into unrelated intent.
