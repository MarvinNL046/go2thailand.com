# English Khanom Jeen Nam Ya owner audit

**Canonical:** `https://go2-thailand.com/food/kanom-jeen-nam-ya/`

**Audited:** 28 July 2026

**Result:** production-ready owner implementation; all scoped gates green.

## Independent research

- Two UK-English DataForSEO clusters with four raw records.
- Exact head term volume 10; no returned keyword difficulty or competitor-domain table.
- Ten current UK-English SERPs: 70 organic results, 53 PAA appearances and 30 unique genuine questions.
- Exact owner rankings: zero keywords.
- Exact owner backlink summary: no reportable signal.
- Three complete fresh DFS source parses: Hot Thai Kitchen (9,593 markdown characters), Tourism Authority of Thailand (11,604) and Thai Trade and Economic Office / Royal Thai Embassy Taipei (9,322).
- Current FSA and Coeliac UK safety material retained for allergen, packaged-sauce and shared-equipment boundaries.

## Content and ownership

- Corrects the old universal-fermentation claim: some khanom jeen is fermented, but many current versions are not.
- Separates noodle (`khanom jeen`) from sauce (`nam ya`) and keeps Northern nam ngiao, green-curry noodles, generic rice vermicelli and generic fish curry independent.
- Covers fish, shrimp paste, fish sauce, coconut, fingerroot, vegetables, pickles, egg, heat, fermentation, gluten, halal, vegetarian and perishable-food boundaries.
- No fixed price, calorie, health, permanent restaurant, automatic dietary, universal heat, storage-time, compulsory-fermentation, one-formula or Recipe-schema claim.
- Ten genuine PAA answers are specific to the owner rather than generic health filler.
- Natural main-content links connect Nakhon Si Thammarat, Phuket and Nam Prik Goong Siap.

## Premium design and asset

- Independent component: `components/food/KhanomJeenNamYaGuideEn.tsx` on the shared premium `DishEditorialTemplate`.
- Unique text-free ImageGen hero: `public/images/redesign/khanom-jeen-nam-ya-southern-noodles-hero.webp`.
- Asset is 1,672 × 941 WebP, 228,720 bytes, with a calm jade copy field and recognisable noodle coils, cooked fish curry, vegetables, herbs, pickles and egg.
- Hero, taste compass, eight signal cards, three service choices, ordering sequence, controlled preparation, FAQ, source ledger and related-owner close form one coherent editorial journey.

## Affiliate handling

- Registered `/go/simple-thai-food-cookbook/` and `/go/thai-granite-mortar-eight-inch/` exits only.
- Both render `rel="noopener noreferrer nofollow sponsored"` and use “Check current price at Amazon”; no stale price appears.
- Klook uses a disclosed current-option CTA with a route-specific SubID and explicit menu, allergen, language and cancellation checks.
- `npm run affiliate:verify`: green.

## Runtime and responsive evidence

- Local route: HTTP 200.
- Desktop browser at 1,280 × 900: one H1, canonical exact, no horizontal overflow (`1265/1265`), 1,265 × 690 rendered hero.
- Mobile browser at 390 × 844: no horizontal overflow (`375/375`), 343px H1 width, 375 × 824.84 hero and fixed bottom navigation present.
- Open mobile FAQ answer is dark and clearly legible on the light surface; visual screenshot inspection green.
- Schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage; Recipe absent.
- Both Amazon exits carry the full sponsored relation.
- TypeScript: green.
- Focused ESLint: zero errors; only two pre-existing generic fallback `<img>` warnings in `pages/food/[slug].tsx`.
- Cannibalisation: zero hard collisions and zero warnings.
- Design-system verifier: green.
- Final layered English runtime report: `seo/audits/runtime/en-khanom-jeen-nam-ya-final-2026-07-28.json`.
- Runtime result: 1,583/1,583 routes without hard errors, zero warnings; the owner route and its new image were freshly audited while unchanged targets reused the immediately preceding green report.

## Decision

The owner may be counted as implemented after the tracker changes from `implementing` to `implemented`. It is not a recipe page and must retain the no-Recipe-schema boundary.
