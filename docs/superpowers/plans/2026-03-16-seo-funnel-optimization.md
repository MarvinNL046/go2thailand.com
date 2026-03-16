# SEO Funnel Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Monetize existing traffic by standardizing affiliate CTAs across 5 page types and improving internal linking between TOFU and BOFU content.

**Architecture:** Replace hard-coded Travelpayouts links with `AffiliateBox` component (or new `FoodAffiliateCTA` for food pages). Add `islandAffiliateMap` to `lib/affiliates.ts` for island→city slug resolution. Add internal cross-links on region, food, and cluster hub pages.

**Tech Stack:** Next.js 14 Pages Router, TypeScript, Tailwind CSS, existing `AffiliateBox` component + new `FoodAffiliateCTA` component.

**Spec:** `docs/superpowers/specs/2026-03-16-seo-funnel-optimization-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/affiliates.ts` | Modify | Add `islandAffiliateMap` and `regionFeaturedCities` lookup maps |
| `components/FoodAffiliateCTA.tsx` | Create | Lightweight CTA for food pages (cooking classes + food tours) |
| `pages/region/[slug].tsx` | Modify | Replace hard-coded affiliate section with AffiliateBox |
| `pages/city/[slug]/top-10-restaurants.tsx` | Modify | Replace hard-coded "Book a Food Experience" with AffiliateBox |
| `pages/city/[slug]/muay-thai.tsx` | Modify | Replace bottom CTA section with AffiliateBox |
| `pages/food/[slug].tsx` | Modify | Replace hard-coded CTAs with FoodAffiliateCTA + internal link |
| `pages/islands/[slug].tsx` | Modify | Replace "Where to Stay" and "Tours" sections with AffiliateBox |

---

## Chunk 1: Foundation + Region Pages

### Task 1: Add island and region affiliate mappings to lib/affiliates.ts

**Files:**
- Modify: `lib/affiliates.ts`

- [ ] **Step 1: Add island→city mapping after the `getAffiliates` function**

Add this code at the end of `lib/affiliates.ts`, before the closing of the file:

```typescript
// Island → nearest city mapping for affiliate lookups
export const islandAffiliateMap: Record<string, string> = {
  'koh-samui': 'koh-samui',
  'koh-phangan': 'koh-samui',
  'koh-tao': 'koh-samui',
  'koh-lanta': 'krabi',
  'koh-phi-phi': 'krabi',
  'koh-chang': 'pattaya',
  'koh-samet': 'pattaya',
  'koh-lipe': 'hat-yai',
  'koh-yao-noi': 'phuket',
  'koh-mak': 'pattaya',
  'phuket': 'phuket',
};

// Region → featured cities for affiliate display
export const regionFeaturedCities: Record<string, string[]> = {
  northern: ['chiang-mai', 'chiang-rai'],
  central: ['bangkok', 'ayutthaya'],
  southern: ['phuket', 'krabi'],
  isaan: ['khon-kaen', 'udon-thani'],
};

// Get affiliates for an island (resolves to nearest city)
export function getIslandAffiliates(islandSlug: string): CityAffiliates | null {
  const citySlug = islandAffiliateMap[islandSlug];
  if (!citySlug) return null;
  return getAffiliates(citySlug);
}
```

- [ ] **Step 2: Verify build still works**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds (no imports changed, just exports added)

- [ ] **Step 3: Commit**

```bash
git add lib/affiliates.ts
git commit -m "feat: add island/region affiliate mappings to lib/affiliates.ts"
```

---

### Task 2: Replace hard-coded affiliate section on region pages with AffiliateBox

**Files:**
- Modify: `pages/region/[slug].tsx`

**Context:** The region page currently has a "Plan Your Trip" section (lines ~830-895) with 3 cards: Hotels (hard-coded Booking.com + Trip.com links), Transport (hard-coded 12Go), Activities (internal link to /activities/). We replace the Hotels card with AffiliateBox for the top 2 featured cities. Keep the Transport card with 12Go as-is. Keep the Activities card as-is (it's an internal link, not an affiliate link) but ADD an AffiliateBox below the grid.

- [ ] **Step 1: Add imports at top of file**

At the top of `pages/region/[slug].tsx`, after the existing imports (line ~11), add:

```typescript
import AffiliateBox from '../../components/AffiliateBox';
import { getAffiliates, regionFeaturedCities, CityAffiliates } from '../../lib/affiliates';
```

- [ ] **Step 2: Add affiliates to props interface and component**

In the `RegionPageProps` interface (line ~127), add:

```typescript
featuredCityAffiliates: Array<{ cityName: string; citySlug: string; affiliates: CityAffiliates }>;
```

In the component destructuring (line ~136), add `featuredCityAffiliates` to the props.

- [ ] **Step 3: Replace Hotels card only, keep Transport + Activities cards, add AffiliateBox below grid**

Replace the Hotels card (the `<div>` from line ~844 to line ~860 — the one with `Hotels & Accommodation` heading and Booking.com/Trip.com links) with:

```tsx
{/* Hotels - AffiliateBox per featured city */}
<div className={`bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow scroll-fade-up ${planAnim.isVisible ? 'is-visible' : ''}`}>
  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">Hotels & Accommodation</h3>
  <p className="text-gray-600 text-sm mb-4">Find the best hotels in {region.name.en}.</p>
  {featuredCityAffiliates.map(({ cityName, affiliates }) => (
    <AffiliateBox key={cityName} affiliates={affiliates} cityName={cityName} type="hotels" />
  ))}
</div>
```

Keep the Transport card (lines ~862-874) with the 12Go link **as-is**.
Keep the Activities card (lines ~877-888) with the internal `/activities/` link **as-is** (it's not an affiliate link).

After the closing `</div>` of the 3-column grid (line ~889), and before the affiliate disclosure, add:

```tsx
{/* Tours AffiliateBox */}
{featuredCityAffiliates[0] && (
  <div className="mt-6">
    <AffiliateBox
      affiliates={featuredCityAffiliates[0].affiliates}
      cityName={featuredCityAffiliates[0].cityName}
      type="activities"
    />
  </div>
)}
```

Keep the affiliate disclosure text (line ~891-893) as-is.

- [ ] **Step 4: Add affiliates to getStaticProps**

In the `getStaticProps` function, add the affiliate lookup. Find where `cities` is returned and add:

```typescript
const featuredSlugs = regionFeaturedCities[region.slug] || [];
const featuredCityAffiliates = featuredSlugs
  .map(slug => {
    const aff = getAffiliates(slug);
    const city = cities.find((c: any) => c.slug === slug);
    return aff && city ? { cityName: city.name.en, citySlug: slug, affiliates: aff } : null;
  })
  .filter((x): x is { cityName: string; citySlug: string; affiliates: CityAffiliates } => x !== null);
```

Add `featuredCityAffiliates` to the returned props object.

- [ ] **Step 5: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add pages/region/[slug].tsx
git commit -m "feat(region): replace hard-coded affiliate links with AffiliateBox"
```

---

### Task 3: Add cluster subpage links to region city cards

**Files:**
- Modify: `pages/region/[slug].tsx`

**Context:** Region pages show city cards via `CityCard` component. We want to add small links below each card pointing to top-10 subpages. We check which top-10 JSON files actually exist in `data/top10/` for each city.

- [ ] **Step 1: Find the cities grid section in the region page**

Look for the section that renders city cards (search for `CityCard` usage). Add a helper to check which top-10 data files exist.

In `getStaticProps`, for each city in the region, check top-10 data existence:

```typescript
import fs from 'fs';
import pathModule from 'path';

// Inside getStaticProps, after getting cities:
const top10Dir = pathModule.join(process.cwd(), 'data', 'top10');
const citiesWithTop10Info = cities.map((city: any) => ({
  ...city,
  hasTop10Hotels: fs.existsSync(pathModule.join(top10Dir, `${city.slug}-hotels.json`)),
  hasTop10Restaurants: fs.existsSync(pathModule.join(top10Dir, `${city.slug}-restaurants.json`)),
  hasTop10Attractions: fs.existsSync(pathModule.join(top10Dir, `${city.slug}-attractions.json`)),
}));
```

Replace `cities` with `citiesWithTop10Info` in the returned props.

- [ ] **Step 2: Update the City interface**

Add to the `City` interface in the region page:

```typescript
hasTop10Hotels?: boolean;
hasTop10Restaurants?: boolean;
hasTop10Attractions?: boolean;
```

- [ ] **Step 3: Add top-10 links below each city card**

After each `<CityCard>` component in the cities grid, add:

```tsx
{(city.hasTop10Hotels || city.hasTop10Restaurants || city.hasTop10Attractions) && (
  <div className="flex flex-wrap gap-2 mt-2 px-1">
    {city.hasTop10Hotels && (
      <Link href={`/city/${city.slug}/top-10-hotels/`} className="text-xs text-thailand-blue hover:underline">Hotels</Link>
    )}
    {city.hasTop10Hotels && city.hasTop10Restaurants && <span className="text-gray-300">·</span>}
    {city.hasTop10Restaurants && (
      <Link href={`/city/${city.slug}/top-10-restaurants/`} className="text-xs text-thailand-blue hover:underline">Restaurants</Link>
    )}
    {(city.hasTop10Hotels || city.hasTop10Restaurants) && city.hasTop10Attractions && <span className="text-gray-300">·</span>}
    {city.hasTop10Attractions && (
      <Link href={`/city/${city.slug}/top-10-attractions/`} className="text-xs text-thailand-blue hover:underline">Attractions</Link>
    )}
  </div>
)}
```

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add pages/region/[slug].tsx
git commit -m "feat(region): add cluster subpage links below city cards"
```

---

## Chunk 2: Restaurant + Muay Thai Pages

### Task 4: Replace hard-coded restaurant affiliate CTA with AffiliateBox

**Files:**
- Modify: `pages/city/[slug]/top-10-restaurants.tsx`

**Context:** Lines 372-401 have a "Book a Food Experience" section with hard-coded Klook and GYG links. Replace with `<AffiliateBox type="activities" />`. The `TripcomWidget` above it (lines 363-370) stays.

- [ ] **Step 1: Add imports**

At the top of `pages/city/[slug]/top-10-restaurants.tsx` (after line ~7), add:

```typescript
import AffiliateBox from '../../../components/AffiliateBox';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
```

- [ ] **Step 2: Add affiliates to component props**

Find the component's props interface. Add `affiliates: CityAffiliates | null;` to it.

Add `affiliates` to the component function's destructured props.

- [ ] **Step 3: Replace the hard-coded CTA section (lines 372-401)**

Replace the entire `<div className="bg-surface-cream rounded-2xl shadow-md p-8 text-center border-0">` block (lines 373-401) with:

```tsx
{affiliates && (
  <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="activities" />
)}
```

- [ ] **Step 4: Add affiliates to getStaticProps**

In the `getStaticProps` function (line ~437), add:

```typescript
const affiliates = getAffiliates(params.slug as string);
```

Add `affiliates` to the returned props object.

- [ ] **Step 5: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add pages/city/[slug]/top-10-restaurants.tsx
git commit -m "feat(restaurants): replace hard-coded affiliate CTA with AffiliateBox"
```

---

### Task 5: Replace hard-coded muay-thai bottom CTA with AffiliateBox

**Files:**
- Modify: `pages/city/[slug]/muay-thai.tsx`

**Context:** Lines 491-519 have a "Book Your Muay Thai Experience" section with dark background and hard-coded GYG + Klook links. Replace with AffiliateBox. Keep the per-item GYG buttons on individual cards (lines ~256, 324, 389) untouched.

- [ ] **Step 1: Add imports**

At the top of `pages/city/[slug]/muay-thai.tsx` (after line ~9), add:

```typescript
import AffiliateBox from '../../../components/AffiliateBox';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
```

- [ ] **Step 2: Add affiliates to component props**

Find the component's props interface. Add `affiliates: CityAffiliates | null;`.

Add `affiliates` to the component function's destructured props.

- [ ] **Step 3: Replace the bottom CTA section (lines 491-519)**

Replace the entire `<div className="bg-surface-dark rounded-2xl p-8 mb-12 text-center text-white">` block with:

```tsx
{affiliates && (
  <div className="mb-12">
    <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="activities" />
  </div>
)}
```

- [ ] **Step 4: Add affiliates to getStaticProps**

In the `getStaticProps` function (line ~586), add:

```typescript
const affiliates = getAffiliates(params.slug as string);
```

Add `affiliates` to the returned props object.

- [ ] **Step 5: Add `sponsored` to kept per-item GYG links**

The per-item "View on GetYourGuide" buttons on activity cards (lines ~256, 324, 389) use `rel="noopener noreferrer"` but should include `sponsored` for SEO compliance. Find all per-item GYG links and change their `rel` attribute to `rel="noopener noreferrer sponsored"`.

- [ ] **Step 6: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add pages/city/[slug]/muay-thai.tsx
git commit -m "feat(muay-thai): replace hard-coded bottom CTA with AffiliateBox, add rel=sponsored to per-item links"
```

---

## Chunk 3: Food Pages

### Task 6: Create FoodAffiliateCTA component

**Files:**
- Create: `components/FoodAffiliateCTA.tsx`

**Context:** Food pages are not city-specific, so we can't use AffiliateBox (which requires `cityName` in its heading). This component shows a cooking class + food tour CTA with an internal link to the cooking classes page. Only renders for relevant categories (main-dish, soup, curry, salad, stir-fry, noodle).

- [ ] **Step 1: Create the component**

Create `components/FoodAffiliateCTA.tsx`:

```tsx
import Link from 'next/link';

const COOKING_CATEGORIES = ['main-dish', 'soup', 'curry', 'salad', 'stir-fry', 'noodle'];

interface FoodAffiliateCTAProps {
  category: string;
  dishName: string;
}

export default function FoodAffiliateCTA({ category, dishName }: FoodAffiliateCTAProps) {
  if (!COOKING_CATEGORIES.includes(category)) return null;

  return (
    <div className="bg-thailand-blue/5 border border-thailand-blue/20 rounded-2xl p-6 my-6">
      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
        Want to Learn Thai Cooking?
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Master {dishName} and other Thai dishes with hands-on cooking classes and guided food tours.
      </p>
      <div className="flex flex-wrap gap-3 mb-3">
        <a
          href="https://klook.tpo.lv/aq6ZFxvc"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#FF5722] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#e64a19] transition-colors"
        >
          Cooking Classes on Klook
        </a>
        <a
          href="https://getyourguide.tpo.lv/GuAFfGGK"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-[#1B9E3E] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#157a30] transition-colors"
        >
          Food Tours on GetYourGuide
        </a>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline font-medium">
          See our guide to the best cooking classes in Thailand →
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        We may earn a commission at no extra cost to you. Prices shown are from partner sites.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit components/FoodAffiliateCTA.tsx 2>&1 || echo "Check via build"` then `npx next build 2>&1 | tail -20`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add components/FoodAffiliateCTA.tsx
git commit -m "feat: create FoodAffiliateCTA component for food pages"
```

---

### Task 7: Replace hard-coded food page affiliate CTAs with FoodAffiliateCTA

**Files:**
- Modify: `pages/food/[slug].tsx`

**Context:** There are 3 locations with hard-coded affiliate links:
1. **Inline cooking class CTA** (lines 308-322): green box inside cooking_method section
2. **Inline food tour CTA** (lines 448-461): orange box inside where_to_find section
3. **Bottom "Book a Thai Cooking Class" section** (lines 533-581): large 2-column section with Klook + GYG cards

Replace all 3 with a single `FoodAffiliateCTA` placed after the main content sections.

- [ ] **Step 1: Add import**

At the top of `pages/food/[slug].tsx` (after line ~7), add:

```typescript
import FoodAffiliateCTA from '../../components/FoodAffiliateCTA';
```

- [ ] **Step 2: Remove inline cooking class CTA (lines 308-322)**

Delete ONLY the inner CTA div — NOT the parent `{dish.cooking_method && (...)}` wrapper. Remove the `{/* Inline Cooking Class CTA */}` comment and the `<div className="mt-6 p-4 bg-green-50 ...">` block (from comment line to closing `</div>`). The cooking method section's other content (steps, tips) should remain.

- [ ] **Step 3: Remove inline food tour CTA (lines 448-461)**

Delete ONLY the inner CTA div — NOT the parent `{dish.where_to_find && (...)}` wrapper. Remove the `{/* Inline Food Tour CTA */}` comment and the `<div className="mt-4 p-3 bg-orange-50 ...">` block. The where_to_find section's other content (price ranges, regions) should remain.

- [ ] **Step 4: Replace the bottom "Book a Thai Cooking Class" section (lines 533-581)**

Replace the entire `<section className="bg-surface-cream section-padding">` block that contains the 2-column Klook/GYG cards with:

```tsx
<section className="section-padding">
  <div className="container-custom max-w-4xl mx-auto">
    <FoodAffiliateCTA category={dish.category} dishName={dish.name.en} />
  </div>
</section>
```

- [ ] **Step 5: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add pages/food/[slug].tsx
git commit -m "feat(food): replace hard-coded affiliate CTAs with FoodAffiliateCTA"
```

---

## Chunk 4: Island Pages

### Task 8: Replace island page affiliate sections with AffiliateBox

**Files:**
- Modify: `pages/islands/[slug].tsx`

**Context:** The island page has hard-coded affiliate links in multiple sections. We replace:
- "Where to Stay" footer links (lines 391-409): Booking.com + Trip.com → `AffiliateBox type="hotels"`
- "Tours & Activities" sidebar (lines 536-558): Klook + GYG → `AffiliateBox type="activities"`
- Keep "Plan Your Visit" sidebar (lines 561-622) as-is (navigation section)
- Keep transport section 12Go/Trip.com as-is
- Keep Saily eSIM as-is

- [ ] **Step 1: Add imports**

At the top of `pages/islands/[slug].tsx` (after line ~9), add:

```typescript
import AffiliateBox from '../../components/AffiliateBox';
import { getIslandAffiliates, CityAffiliates } from '../../lib/affiliates';
```

- [ ] **Step 2: Add affiliates to component props**

Find the component's props interface. Add `affiliates: CityAffiliates | null;`.

Add `affiliates` to the component function's destructured props.

- [ ] **Step 3: Replace "Where to Stay" affiliate links (lines 391-409)**

Find the `<div className="mt-4 flex flex-wrap gap-3">` after the accommodation areas grid. Replace the Booking.com link with AffiliateBox but **keep** the Trip.com link (AffiliateBox `type="hotels"` only renders Booking.com). Use `island.name.en` for the heading (not locale-specific, since AffiliateBox headings are always English):

```tsx
<div className="mt-4 space-y-3">
  {affiliates && (
    <AffiliateBox affiliates={affiliates} cityName={island.name.en} type="hotels" />
  )}
  <a
    href="https://trip.tpo.lv/TmObooZ5"
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="inline-block bg-thailand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-blue transition-colors"
  >
    Trip.com →
  </a>
  <p className="text-gray-500 text-xs mt-1">Affiliate links - we may earn a commission at no extra cost to you</p>
</div>
```

- [ ] **Step 4: Replace "Tours & Activities" sidebar (lines 536-558)**

Find the `<div className="bg-white rounded-2xl shadow-md p-6">` with heading "Tours & Activities". Replace the entire div with:

```tsx
{affiliates && (
  <AffiliateBox affiliates={affiliates} cityName={island.name.en} type="activities" />
)}
```

- [ ] **Step 5: Add affiliates to getStaticProps**

In the `getStaticProps` function (line ~632+), add:

```typescript
const affiliates = getIslandAffiliates(params.slug as string);
```

Add `affiliates` to the returned props object.

- [ ] **Step 6: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add pages/islands/[slug].tsx
git commit -m "feat(islands): replace hard-coded hotel/activity CTAs with AffiliateBox"
```

---

## Chunk 5: Internal Linking

### Task 9: Add transport route links to island pages

**Files:**
- Modify: `pages/islands/[slug].tsx`

**Context:** Island pages have a transport section. We should add a link to the relevant transport route page (e.g., Bangkok to Koh Samui).

- [ ] **Step 1: In getStaticProps, find matching transport routes**

The transport routes JSON has structure `{ routes: [...] }` where each route has `from` and `to` as **slugs** (e.g., `"koh-samui"`, not display names). The island slug from `params.slug` can be matched directly.

```typescript
import fs from 'fs';
import pathModule from 'path';

// Inside getStaticProps:
const transportRoutesPath = pathModule.join(process.cwd(), 'data', 'transport-routes.json');
const transportData = JSON.parse(fs.readFileSync(transportRoutesPath, 'utf-8'));
const slug = params.slug as string;
const relevantRoutes = (transportData.routes || [])
  .filter((r: any) => r.to === slug || r.from === slug)
  .slice(0, 3)
  .map((r: any) => ({
    slug: r.slug,
    // Convert slugs to display names: "koh-samui" → "Koh Samui"
    from: r.from.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    to: r.to.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  }));
```

Add `relevantRoutes` to props.

- [ ] **Step 2: Add route links in the transport section**

After the existing transport options list, add:

```tsx
{relevantRoutes && relevantRoutes.length > 0 && (
  <div className="mt-4 p-4 bg-surface-cream rounded-xl">
    <h4 className="font-heading font-semibold text-gray-900 mb-2 text-sm">Transport Route Guides</h4>
    <div className="flex flex-wrap gap-2">
      {relevantRoutes.map((route: any) => (
        <Link
          key={route.slug}
          href={`/transport/${route.slug}/`}
          className="text-sm text-thailand-blue hover:underline"
        >
          {route.from} → {route.to}
        </Link>
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 3: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add pages/islands/[slug].tsx
git commit -m "feat(islands): add transport route internal links"
```

---

### Task 10: Add Top 10 cross-links to cluster hub pages

**Files:**
- Modify: `pages/city/[slug]/index.tsx`

**Context:** Cluster hub (destination) pages should prominently cross-link to top-10 subpages. The `ClusterNav` already provides navigation, but the main content area doesn't reference these guides.

- [ ] **Step 1: Read the cluster hub page to find insertion point**

Read `pages/city/[slug]/index.tsx` to understand the structure and find where to add a "Top Guides" section.

- [ ] **Step 2: Add a "Top Guides" section**

After the main overview/highlights section and before the ClusterNav or footer section, add:

```tsx
{/* Top Guides Cross-Links */}
<div className="bg-white rounded-2xl shadow-md p-6 my-6">
  <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
    Top Guides for {city.name.en}
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <Link
      href={`/city/${city.slug}/top-10-restaurants/`}
      className="flex items-center gap-3 p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all"
    >
      <div className="w-8 h-8 bg-thailand-red rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="font-medium text-gray-800 text-sm">Top 10 Restaurants</span>
    </Link>
    <Link
      href={`/city/${city.slug}/top-10-hotels/`}
      className="flex items-center gap-3 p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all"
    >
      <div className="w-8 h-8 bg-thailand-blue rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <span className="font-medium text-gray-800 text-sm">Top 10 Hotels</span>
    </Link>
    <Link
      href={`/city/${city.slug}/top-10-attractions/`}
      className="flex items-center gap-3 p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all"
    >
      <div className="w-8 h-8 bg-thailand-gold rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <span className="font-medium text-gray-800 text-sm">Top 10 Attractions</span>
    </Link>
  </div>
</div>
```

**Note:** The implementer needs to read `pages/city/[slug]/index.tsx` first to find the exact insertion point. This should go in the main content area, not in a sidebar.

- [ ] **Step 3: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add pages/city/[slug]/index.tsx
git commit -m "feat(cluster-hub): add top-10 cross-links section"
```

---

### Task 11: Final verification — grep for remaining hard-coded links

**Files:**
- None (verification only)

- [ ] **Step 1: Search for remaining hard-coded Travelpayouts links in targeted files**

Run:
```bash
grep -n "tpo\.lv" pages/region/\[slug\].tsx pages/city/\[slug\]/top-10-restaurants.tsx pages/city/\[slug\]/muay-thai.tsx pages/food/\[slug\].tsx pages/islands/\[slug\].tsx
```

Expected: Only links in sections we deliberately kept (12Go transport on islands, 12Go on region, per-item GYG on muay-thai). Zero Booking.com/Klook/GYG hard-coded links in the targeted sections.

- [ ] **Step 2: Full build test**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit all remaining changes if any**

```bash
git status
# If clean, no commit needed
```
