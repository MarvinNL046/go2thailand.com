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

**Implementation order** (simplest → most complex): region → restaurants → muay-thai → food → islands

#### 1a. `pages/city/[slug]/top-10-restaurants.tsx`
- **Current**: Hard-coded Klook (`klook.tpo.lv/aq6ZFxvc`) and GYG (`getyourguide.tpo.lv/GuAFfGGK`) links in a "Book a Food Experience" section at bottom. Also has a `TripcomWidget` above it.
- **Change**: Replace the hard-coded "Book a Food Experience" section with `<AffiliateBox type="activities" />`. Keep the `TripcomWidget` as-is (it's a separate widget, not a hard-coded link).
- **Why**: Consistent styling, centralized link management

#### 1b. `pages/city/[slug]/muay-thai.tsx`
- **Current**: Per-item GYG "View on GetYourGuide" buttons on individual activity cards (lines ~256, 324, 389) PLUS a bottom CTA section with both GYG and Klook links (lines ~491-519).
- **Change**: Replace the **bottom CTA section only** with `<AffiliateBox type="activities" />`. Keep per-item GYG buttons as-is — they provide contextual deep links that are more relevant than generic links.
- **Why**: Bottom section is the generic CTA; per-item links serve a different purpose (direct booking for that specific gym).

#### 1c. `pages/food/[slug].tsx`
- **Current**: Inline Klook cooking class link (`klook.tpo.lv/aq6ZFxvc` — cooking-class-specific deep link) + GYG food tour links (hard-coded)
- **Change**: Replace hard-coded links with a custom "Learn to Cook This Dish" CTA section. Use a **new lightweight component** (not AffiliateBox) that:
  - Links to `/best-cooking-classes-in-thailand/` (internal link)
  - Includes Klook cooking-class deep link (`klook.tpo.lv/aq6ZFxvc`) — keep this specific URL, not the generic one from affiliates.ts, as it converts better
  - Includes GYG food tour link
  - Does NOT use `cityName` in heading (food pages are not city-specific)
- **Why**: AffiliateBox's interface requires `cityName` and renders "Book in {cityName}" headings, which is misleading for non-city-specific food pages. A small dedicated CTA component avoids modifying AffiliateBox's interface.
- **Internal link**: Add contextual link to `/best-cooking-classes-in-thailand/`

#### 1d. `pages/islands/[slug].tsx`
- **Current**: Hard-coded affiliate links across 4+ sections:
  - Transport section: 12Go + Trip.com + AffiliateWidget
  - Where to Stay section: Booking.com + Trip.com
  - Sidebar Tours & Activities: Klook + GYG
  - Sidebar Plan Your Visit: 12Go, Booking.com, Trip.com, Klook, Saily, GYG
- **Change**:
  - "Where to Stay" section: Replace hard-coded Booking.com/Trip.com with `<AffiliateBox type="hotels" />`
  - "Tours & Activities" sidebar: Replace hard-coded Klook/GYG with `<AffiliateBox type="activities" />`
  - Transport section: Keep 12Go/Trip.com inline CTAs as-is (AffiliateBox doesn't cover transport partners)
  - "Plan Your Visit" sidebar: Keep as curated link list (this is a navigation section, not a CTA block)
  - Saily eSIM link: Keep as-is (specialty product)
- **Note**: Use island→city mapping (see Technical Details) to resolve `getAffiliates()` city slug.

#### 1e. `pages/region/[slug].tsx`
- **Current**: Has hard-coded affiliate links (Booking.com, Trip.com, 12Go) in a sidebar section with an affiliate disclosure. NOT zero CTAs as initially assessed.
- **Change**: Replace the hard-coded sidebar affiliate links with `<AffiliateBox type="hotels" />` for the top 2 featured cities in the region (see mapping below). Add `<AffiliateBox type="activities" />` for tours. Keep affiliate disclosure.
- **Data**: Use the `cities` prop (array of city objects filtered by region from `getAllCities()`) to pick featured cities.

### 2. Internal Linking Improvements

#### 2a. Food pages → Cooking classes
- Each `food/[slug].tsx` page: add a "Learn to Cook This" callout linking to `/best-cooking-classes-in-thailand/`
- Contextual, not spammy — only where relevant (main dishes, curries, soups)
- Integrated into the new food CTA component from section 1c

#### 2b. Region pages → Cluster subpages
- Region pages list cities but only link to `/city/[slug]/`
- Add links to cluster subpages: hotels, things-to-do, top-10 guides
- Use the `cities` prop which has city slugs
- **Where**: In the cities grid section, add small links below each city card

#### 2c. Island pages → Transport routes
- Island pages should link to relevant transport routes (e.g., "How to get to Koh Samui" → transport route page)
- Use `data/transport-routes.json` to find matching routes
- **Where**: In the existing transport section of each island page

#### 2d. Cluster hub → Top 10 cross-links
- In `pages/city/[slug]/index.tsx` (destination hub), add a "Top Guides for [City]" section
- Link to top-10-restaurants, top-10-hotels, top-10-attractions
- **Where**: After the main overview section, before the ClusterNav section
- Only show links for pages that actually exist (check data availability)

### 3. AffiliateBox Component — No Changes

Keep AffiliateBox as-is. For food pages, create a small dedicated `FoodAffiliateCTA` component. For 12Go/Trip.com/Saily, keep inline CTAs.

## Out of Scope

- Creating new pages (luxury resorts, Thai massage guides, etc.) — focus on existing pages first
- Modifying the `AffiliateBox` component interface
- Adding new affiliate partners to `lib/affiliates.ts`
- Translation of new CTA text (follow-up batch — new strings: "Learn to Cook This Dish", "Book a Thai Cooking Class", "Top Guides for [City]")
- Standardizing hard-coded links in pages NOT listed above (e.g., `phuket-beaches.tsx`, `islands/index.tsx`, `esim/index.tsx`)

## Technical Details

### Island → City Affiliate Mapping

Islands don't have their own entries in `lib/affiliates.ts`. Map islands to nearest city:

| Island | City Slug | Notes |
|--------|-----------|-------|
| koh-samui | koh-samui | Direct match |
| koh-phangan | koh-samui | Same archipelago |
| koh-tao | koh-samui | Same archipelago |
| koh-lanta | krabi | Krabi province |
| koh-phi-phi | krabi | Krabi province |
| koh-chang | pattaya | Trat province, nearest major city |
| koh-samet | pattaya | Rayong province, nearest major city |
| koh-lipe | hat-yai | Satun province, nearest major city |
| koh-yao-noi | phuket | Phang Nga Bay, nearest major city |
| koh-mak | pattaya | Trat province, nearest major city |
| phuket | phuket | Direct match (island page = city page) |

### Region → Featured Cities

| Region | Featured Cities (for AffiliateBox) |
|--------|-----------------------------------|
| northern | chiang-mai, chiang-rai |
| central | bangkok, ayutthaya |
| southern | phuket, krabi |
| isaan | khon-kaen, udon-thani |

### Food Page CTA Component (`FoodAffiliateCTA`)

Small component, ~30 lines. Props: none (or optional `dishCategory` for conditional display).
- Heading: "Want to Learn Thai Cooking?"
- Link to `/best-cooking-classes-in-thailand/`
- Klook cooking class deep link: `klook.tpo.lv/aq6ZFxvc`
- GYG food tour link: `getyourguide.tpo.lv/GuAFfGGK`
- Affiliate disclosure text
- Only renders on main-dish, soup, curry, salad categories (skip drinks, desserts)

## Success Criteria

- All 5 targeted page types use AffiliateBox or dedicated CTA components (consistent styling)
- Zero hard-coded Travelpayouts links remaining in the 5 targeted page types
- Region pages replace hard-coded sidebar links with AffiliateBox
- Food pages link to cooking classes page
- Island pages have complete island→city mapping
- No hallucinated data or prices in any CTA
