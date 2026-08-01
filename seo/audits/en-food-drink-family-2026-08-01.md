# English food-and-drink family acceptance audit

Date: 2026-08-01
Sitemap scope: 72/72 English routes

## Route accounting

| Owner group  | Indexed routes | Rendering owner                                                                      |
| ------------ | -------------: | ------------------------------------------------------------------------------------ |
| Food hub     |              1 | `pages/food/index.tsx` / `ThailandFoodGuideEn`                                       |
| Named dishes |             45 | `pages/food/[slug].tsx` / 45 premium `*GuideEn` owners using `DishEditorialTemplate` |
| Drinks hub   |              1 | `pages/drinks/index.tsx` / `ThaiDrinksGuideEn`                                       |
| Named drinks |             25 | `pages/drinks/[slug].tsx` / `DrinkEditorialGuideEn`                                  |
| **Total**    |         **72** | **72 accounted for**                                                                 |

The English `/food/khao-soi/` legacy route is not part of these 72 indexed routes; it permanently redirects to `/blog/khao-soi-chiang-mai-guide/`.

## Checks and outcomes

- **Intent:** broad hubs, named item owners and city-food owners have explicit, non-overlapping jobs.
- **Design:** both hubs and all 70 indexed detail owners use the premium canvas/editorial system. The new drink owner declares `data-premium-template="drink-editorial"`; the 45 dish owners use `DishEditorialTemplate`.
- **Images:** 45/45 dish-owner referenced local images and 25/25 drink images exist. Responsive content images are rendered through `next/image` in the refreshed drink template and design primitives.
- **Metadata:** `SEOHead` supplies effective title, description and Open Graph metadata. Global `Hreflang` remains the canonical/hreflang authority; no page-local duplicate canonical implementation was added.
- **Schema:** dish owners use Article + BreadcrumbList + FAQPage. Drink owners use Article + BreadcrumbList + FAQPage; Recipe is conditionally available only for complete methods and is currently absent on all 25 because the records have no ordered steps.
- **Food safety:** refreshed drink output uses CDC Yellow Book and WHO safety boundaries; no appearance-based safety guarantee is made.
- **Allergens:** CDC traveller guidance supports translated cards and direct communication. Copy explicitly covers premixes and cross-contact and never treats the dataset list as a guarantee.
- **Volatility:** English drink details no longer display fixed price bands, fallback THB ranges or exact alcohol percentages. Label/menu checks replace those claims.
- **Internal links:** each refreshed drink owner links back to `/drinks/`, `/food/` and `/thailand-street-food/`; breadcrumb and section navigation have accessible labels and meaningful link text.
- **Affiliate integrity:** Amazon occurs on only 4/25 drink routes, via registered central `/go/` slugs. CTAs use `noopener noreferrer nofollow sponsored`, disclose the relationship and request a live price check. Existing dish-owner affiliates already use the same central strategy.

## Verification evidence

- Sitemap parse: exactly 72 non-NL `/food/` and `/drinks/` routes.
- Dispatch scan: 45 mapped dish slugs, 45 premium templates, 45 canonical owner declarations, 45 source arrays, 0 missing referenced local assets.
- Drink data scan: 25 records, 0 missing images, 0 missing ingredient lists, 0 complete recipe step sets.
- `npm run affiliate:verify`: passed; 17 used slugs and 21 registered products.
- `npx tsc --noEmit --pretty false --incremental false`: passed.
- Runtime sampling was attempted against port 3000, but the shared development process returned HTTP 500 for unrelated routes too while parallel agents were editing. Source-level and type verification are complete; final consolidated runtime crawl belongs in the parent sitewide gate after the shared server is restarted.

## Files changed by this owner

- `components/food/DrinkEditorialGuideEn.tsx`
- `pages/drinks/[slug].tsx`
- `seo/research/en/2026-08-01-food-drink-family-primary-safety-review.md`
- `seo/audits/en-food-drink-family-2026-08-01.md`
