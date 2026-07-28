# English Mee Hokkien owner audit

**Route:** `https://go2-thailand.com/food/mee-hokkien/`

**Status:** implemented and verified locally

**Audit date:** 28 July 2026

## Outcome

The generic English food fallback has been replaced with a premium, independently researched Phuket Mee Hokkien owner. It owns the local thick yellow wheat-and-egg noodle dish, moist wok finish, seafood/pork/egg/greens signals, Hokkien-Chinese Phuket context, ordering and dietary checks. Singapore, Kuala Lumpur and Penang Hokkien mee systems remain outside the owner.

## Research evidence

- Two DataForSEO clusters with three raw keyword records; DFS returned no competitor-domain table for this local entity cluster.
- UK measurable term: `go tee mee hokkien phuket` volume 10; no volume or KD was returned for the broader phrases.
- Ten current UK-English SERPs with 80 organic results.
- 60 People Also Ask appearances and 39 unique genuine questions.
- Four complete DFS source parses: Tourism Authority of Thailand, Eating Thai Food, Zoy to the World and UNESCO Phuket Creative City.
- Current official Tourism Authority ASEAN heritage context, UNESCO 2024 monitoring evidence and Michelin Guide Thailand editorial evidence.
- Exact ranking check: zero returned keywords. Exact backlink check: no reportable summary signal.
- Singapore, Kuala Lumpur, Penang, recipe, restaurant-ranking, delivery, celebrity and generic-health leakage was excluded.

## Design and content

- Added `components/food/MeeHokkienGuideEn.tsx` on the reusable `DishEditorialTemplate`.
- Added a unique text-free ImageGen hero: `public/images/redesign/mee-hokkien-phuket-wok-hero.webp` (1,672 x 941; 130,606 bytes).
- The composition shows thick golden noodles in a dark wok with fully cooked prawns, squid, pork, choy sum and set egg in a warm Phuket Old Town kopitiam, with a deep-jade copy zone on the left.
- Added a four-signal taste compass, eight ingredient signals, explicit wheat/egg/shellfish/mollusc/fish/soy/pork/halal and shared-wok boundaries, three noodle/egg choices, a three-decision ordering route, safe wok sequence, ten researched FAQs, source methodology and three canonical Phuket next steps.
- The owner explains why a moist Phuket bowl is not interchangeable with Singapore prawn-stock noodles, dark Kuala Lumpur noodles or Penang prawn noodle soup.
- Fixed prices, calories, health verdicts, guaranteed heat, automatic dietary status, permanent restaurant rankings and one formula were excluded.

## Affiliate and internal-link controls

- Two contextual Amazon OneLink-compatible `/go/` routes: `Simple Thai Food` and an eight-inch granite mortar, both using `Check current price at Amazon` wording.
- The mortar is explicitly limited to a tested condiment or paste task and is not presented as required wok equipment.
- One disclosed Klook Phuket food/class route requiring users to confirm Mee Hokkien inclusion, seafood, pork, allergens, Old Town stops, language and cancellation terms.
- All commercial links render with `noopener noreferrer nofollow sponsored` and adjacent disclosure.
- Natural route handoff to `/city/phuket/`, `/phuket/old-town/things-to-do/` and `/food/oh-aew/`.

## Structured data and visual QA

- One H1: `Mee Hokkien`.
- Canonical: `https://go2-thailand.com/food/mee-hokkien/`.
- Rendered schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage. Recipe schema is deliberately absent.
- Desktop QA at 1,280 x 900: document width 1,265 px and no horizontal overflow; the single-line title, wok ingredients and at-a-glance panel remain distinct.
- Mobile QA at 390 x 844: document width 375 px, H1 width 343 px at 75.2 px, controlled two-line title and no horizontal overflow; sticky destination search and bottom navigation are visible.
- Hero resolves through Next Image at 1,114 px on desktop and 390 px on mobile.
- The default-open FAQ answer renders at 14 px / 28 px line height in dark `rgb(41, 53, 49)` text.

## Gates

- `npx tsc --noEmit --incremental false` - passed.
- Focused ESLint for the new component - no errors or warnings.
- SEO cannibalisation - 0 hard collisions and 0 warnings.
- Amazon affiliate verification - 16 used slugs and 20 registered products.
- Design-system verification - 7 primitives and 26 pilot templates.
- Layered English runtime audit - 1,583/1,583 sitemap routes without hard errors; 0 routes with warnings. Report: `seo/audits/runtime/en-mee-hokkien-final-2026-07-28.json`.

The independently researched English dish system now covers seventeen premium owners. Thirty-two sitemap food-detail routes remain available for their own research and upgrade.
