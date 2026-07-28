# English Pla Pao owner audit

**Canonical:** `https://go2-thailand.com/food/pla-pao/`

**Audited:** 28 July 2026

**Result:** production-ready owner implementation; all scoped gates green.

## Independent research

- Two UK-English DataForSEO clusters with five raw records.
- Exact `pla pao` volume 40; two related variants returned volume 10. No returned keyword difficulty or competitor-domain table.
- Ten current UK-English SERPs: 70 organic results, 52 PAA appearances and 24 unique genuine questions.
- Exact owner rankings: zero keywords.
- Exact owner backlink summary: no reportable signal.
- Three complete DFS source parses: Hungry in Thailand (10,573 markdown characters), Eating Thai Food (10,517) and current UK Food Standards Agency cooking guidance (792 plus live capture).

## Content and ownership

- Separates salt-crusted whole grilled Pla Pao from fermented Pla Ra, prawn-based Pla Goong Pao, generic grilled fish and generic salt-baked fish.
- Treats Miang Pla Pao as a service set around the same grilled-fish owner, not a second cooking owner.
- Covers fish species, salt binder, protective scales/skin, aromatics, charcoal, whole-fish doneness, bones, sauce, gluten, soy, peanut, fish and halal boundaries.
- No fixed price, calorie, health, permanent restaurant, automatic dietary, universal saltiness/heat/cooking/storage, compulsory species, one-formula or Recipe-schema claim.
- Ten PAA answers consolidate duplicate fish-species intent and add a high-value Pla Pao-versus-Pla Ra boundary.
- Natural main-content links connect Nong Khai, Som Tam and Larb.

## Premium design and asset

- Independent component: `components/food/PlaPaoGuideEn.tsx` on the shared premium `DishEditorialTemplate`.
- Unique text-free ImageGen hero: `public/images/redesign/pla-pao-salt-crusted-grilled-fish-hero.webp`.
- Initial generated composition passed layout review but exposed flesh looked too glossy/pink; a targeted ImageGen edit preserved composition while making the flesh unmistakably matte, opaque, pearly white and flaky, removing the dark central line.
- Final asset is 1,672 × 941 WebP, 209,418 bytes, with a calm jade copy field, cracked salt crust, herb cavity, lettuce, herbs, rice noodles and two sauces.
- Hero, taste compass, eight signal cards, three service choices, ordering/boning sequence, controlled whole-fish preparation, FAQ, source ledger and related-owner close form one coherent editorial journey.

## Affiliate handling

- One deliberately relevant registered `/go/simple-thai-food-cookbook/` exit; no irrelevant product stuffing.
- It renders `rel="noopener noreferrer nofollow sponsored"` and “Check current price at Amazon”; no stale price appears.
- Klook uses a disclosed current-option CTA with a route-specific SubID and explicit menu, fish-species, bones, gluten, peanut, soy, halal, language and cancellation checks.
- `npm run affiliate:verify`: green.

## Runtime and responsive evidence

- Local route: HTTP 200.
- Desktop browser at 1,280 × 900: one H1, canonical exact, no horizontal overflow (`1265/1265`), 1,265 × 690 rendered hero.
- Mobile browser at 390 × 844: no horizontal overflow (`375/375`), 343px H1 width, 375 × 763.19 hero and fixed bottom navigation present.
- Mobile FAQ: ten details; open answer renders dark `rgb(41, 53, 49)` text at 14px / 28px on the light surface.
- Schema types: Organization, Article, BreadcrumbList, ItemList and FAQPage; Recipe absent.
- Amazon exit carries the full sponsored relation.
- TypeScript: green.
- Focused ESLint: zero errors; only two pre-existing generic fallback `<img>` warnings in `pages/food/[slug].tsx`.
- Cannibalisation: zero hard collisions and zero warnings.
- Design-system verifier: green.
- Final layered English runtime report: `seo/audits/runtime/en-pla-pao-final-2026-07-28.json`.
- Runtime result: 1,583/1,583 routes without hard errors, zero warnings; the owner route and final edited image were freshly audited while unchanged targets reused the immediately preceding green report.

## Decision

The owner may be counted as implemented after the tracker changes from `implementing` to `implemented`. It is not a recipe page and must retain the no-Recipe-schema boundary.
