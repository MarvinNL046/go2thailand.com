# SEO Funnel Optimization — Affiliate CTAs & Internal Linking

**Date:** 2026-03-16
**Status:** Draft

## Goal

Monetize existing traffic by adding consistent affiliate CTAs to high-intent pages that currently lack them, standardizing hard-coded affiliate links to use the `AffiliateBox` component, and improving internal linking between TOFU pillar pages and BOFU conversion pages.

## Principles

- **E-E-A-T first**: No fake data, no hallucinated prices. Only add CTAs where they naturally fit the user journey.
- **Real data only**: Use existing `lib/affiliates.ts` config (all 33 cities have links). No inventing affiliate URLs.
- **Concise & valuable**: CTAs should help the reader, not clutter the page.
- **DRY**: Use `AffiliateBox` component everywhere instead of hard-coded links.

## Scope

### 1. Standardize Affiliate CTAs (5 page types)

#### 1a. `pages/city/[slug]/top-10-restaurants.tsx`
- **Current**: Hard-coded Klook/GYG links at bottom of page
- **Change**: Replace with `<AffiliateBox type="activities" />` after restaurant list
- **Why**: Consistent styling, centralized link management

#### 1b. `pages/city/[slug]/muay-thai.tsx`
- **Current**: Hard-coded affiliate links
- **Change**: Replace with `<AffiliateBox type="activities" />` after gym listings
- **Why**: Same as above

#### 1c. `pages/food/[slug].tsx`
- **Current**: Inline Klook cooking class + GYG food tour links (hard-coded)
- **Change**: Add `<AffiliateBox type="activities" />` after the recipe/description section. Use a generic fallback (Bangkok affiliates) since food pages aren't city-specific.
- **Why**: Food pages have buyer intent (people searching recipes often want cooking classes)
- **Internal link**: Add contextual link to `/best-cooking-classes-in-thailand/`

#### 1d. `pages/islands/[slug].tsx`
- **Current**: Extensive hard-coded affiliate links (Booking, Klook, GYG, 12Go, Trip.com, Saily)
- **Change**: Replace hotel section with `<AffiliateBox type="hotels" />`, activity section with `<AffiliateBox type="activities" />`. Keep 12Go/Trip.com/Saily links as separate contextual CTAs (AffiliateBox doesn't cover these).
- **Note**: Island pages may not have a matching city slug in `lib/affiliates.ts`. Need to map island→nearest city or add island-specific affiliate configs.

#### 1e. `pages/region/[slug].tsx`
- **Current**: Zero affiliate CTAs
- **Change**: Add a "Book Your Stay" section after the cities grid showing `<AffiliateBox type="hotels" />` for the top 2-3 cities in the region. Add `<AffiliateBox type="activities" />` for tours.
- **Data**: Use `regionalCities` data already available in region pages to pick featured cities.

### 2. Internal Linking Improvements

#### 2a. Food pages → Cooking classes
- Each `food/[slug].tsx` page: add a "Learn to Cook This" callout linking to `/best-cooking-classes-in-thailand/`
- Contextual, not spammy — only where relevant (main dishes, curries, soups)

#### 2b. Region pages → Cluster subpages
- Region pages list cities but only link to `/city/[slug]/`
- Add links to cluster subpages: hotels, things-to-do, top-10 guides
- Use existing `regionalCities` data which has city slugs

#### 2c. Island pages → Transport routes
- Island pages should link to relevant transport routes (e.g., "How to get to Koh Samui" → transport route page)
- Use `data/transport-routes.json` to find matching routes

#### 2d. Cluster hub → Top 10 cross-links
- Destination hub pages should prominently link to top-10-restaurants, top-10-hotels, top-10-attractions
- Currently ClusterNav handles this, but the hub page content itself doesn't cross-reference

### 3. AffiliateBox Component Enhancement

The current `AffiliateBox` only supports 3 types: hotels, tours, activities. For island pages and transport pages, we need additional affiliate partners (12Go, Trip.com).

**Approach**: Keep AffiliateBox focused on Booking/Klook/GYG. For 12Go transport and Trip.com, use small inline CTAs (existing pattern on island pages is fine, just needs consistent styling).

## Out of Scope

- Creating new pages (luxury resorts, Thai massage guides, etc.) — focus on existing pages first
- Changing the AffiliateBox component interface significantly
- Adding new affiliate partners to `lib/affiliates.ts`
- Translation of new CTA text (can be done in a follow-up batch)

## Technical Details

### Island → City Affiliate Mapping

Islands don't have their own entries in `lib/affiliates.ts`. Map islands to nearest city:

| Island | City Slug |
|--------|-----------|
| koh-samui | koh-samui |
| koh-phangan | koh-samui |
| koh-tao | koh-samui |
| koh-lanta | krabi |
| koh-phi-phi | krabi |
| koh-chang | pattaya |
| koh-samet | pattaya |
| phuket (islands) | phuket |

### Region → Featured Cities

| Region | Featured Cities (for AffiliateBox) |
|--------|-----------------------------------|
| northern | chiang-mai, chiang-rai |
| central | bangkok, ayutthaya |
| southern | phuket, krabi |
| isaan | khon-kaen, udon-thani |

### Food Page Affiliate Strategy

Food pages are not city-specific, so use Bangkok as default affiliate city (highest conversion likelihood). The CTA text should be generic: "Book a Thai Cooking Class" rather than city-specific.

## Success Criteria

- All 5 page types use AffiliateBox (or have consistent CTA styling)
- Zero hard-coded Travelpayouts links remaining in page components
- Region pages have at least one affiliate CTA section
- Food pages link to cooking classes page
- No hallucinated data or prices in any CTA
