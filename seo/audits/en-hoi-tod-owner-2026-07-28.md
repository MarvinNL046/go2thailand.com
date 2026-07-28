# English Hoi Tod owner audit

**Canonical:** `https://go2-thailand.com/food/hoy-tod/`

**Audited:** 28 July 2026

**Result:** production-ready owner implementation; all scoped gates green.

## Independent research

- Two UK-English DataForSEO clusters with thirteen raw records.
- Exact `hoi tod` volume 20; eight related terms returned volume 10. No returned keyword difficulty or competitor-domain table.
- Ten current UK-English SERPs: 71 organic results, 54 PAA appearances and 30 unique genuine questions.
- Exact owner rankings: zero keywords.
- Exact owner backlink summary: no reportable signal.
- Two complete fresh DFS source parses: South China Morning Post Cooking (5,154 markdown characters) and Hungry in Thailand (7,656).
- One current Michelin context capture returned zero DFS markdown and was used only for independent crisp-mussel / bean-sprout context, never as a permanent recommendation.

## Content and ownership

- Separates crisp mussel or oyster Hoi Tod from soft Or Suan, Phuket Oh Tao, Pad Thai, plain Thai omelette and generic East Asian oyster omelettes.
- Covers mollusc species, starch batter, egg, sprouts, chives, seasoning sauce, chilli sauce, frying fat, gluten, soy, fish, halal, vegetarian and safe cooking boundaries.
- No fixed price, calorie, health, permanent restaurant, automatic dietary, universal heat/crispness/storage, shellfish-species, one-formula or Recipe-schema claim.
- Ten genuine PAA answers are specific to the owner; generic health and restaurant-near-me filler is excluded.
- Natural main-content links connect Bangkok, Ayutthaya and Phuket’s independent Oh Tao context.

## Premium design and asset

- Independent component: `components/food/HoiTodGuideEn.tsx` on the shared premium `DishEditorialTemplate`.
- Unique text-free ImageGen hero: `public/images/redesign/hoi-tod-crispy-mussel-omelette-hero.webp`.
- Asset is 1,672 × 941 WebP, 281,970 bytes, with a calm jade copy field and recognisable cooked mussels, lacy crisp batter, egg, sprouts, chives and separate chilli sauce.
- Hero, taste compass, eight signal cards, three texture/shellfish choices, ordering sequence, controlled griddle preparation, FAQ, source ledger and related-owner close form one coherent editorial journey.

## Affiliate handling

- One deliberately relevant registered `/go/simple-thai-food-cookbook/` exit; no irrelevant product stuffing when the registry lacks a suitable griddle.
- It renders `rel="noopener noreferrer nofollow sponsored"` and “Check current price at Amazon”; no stale price appears.
- Klook uses a disclosed current-option CTA with a route-specific SubID and explicit itinerary, shellfish, egg, gluten, halal, language and cancellation checks.
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
- Final layered English runtime report: `seo/audits/runtime/en-hoi-tod-final-2026-07-28.json`.
- Runtime result: 1,583/1,583 routes without hard errors, zero warnings; the owner route and its new image were freshly audited while unchanged targets reused the immediately preceding green report.

## Decision

The owner may be counted as implemented after the tracker changes from `implementing` to `implemented`. It is not a recipe page and must retain the no-Recipe-schema boundary.
