# Content Clusters & Internal Linking Design

**Goal:** Build topical authority through enriched region hub pages and systematic cross-content internal linking.

**Architecture:** Two-phase approach — first enrich region pages as cluster hubs, then add cross-content links across city sub-pages, food, transport, and blog content.

**Tech Stack:** Next.js Pages Router, Claude Haiku for content generation, existing data pipeline.

---

## Problem

- Region pages are thin (no content, no cluster links)
- Blog posts are isolated from city/food/island content
- City sub-pages don't cross-link to each other
- Food pages don't link to cities where dishes are popular
- Transport pages don't link to comparison pages
- No topical clustering signals for Google

## Current Stats

- 33 cities, 295 attractions, 46 food items, 25 drinks, 14 itineraries
- 4 region pages (northern, central, southern, isaan) — currently bare
- 75 organic keywords, DR 2.1, 132 ChatGPT citations

---

## Phase 1: Enriched Region Hub Pages

### What

Transform 4 region pages (`/region/northern/`, `/region/central/`, `/region/southern/`, `/region/isaan/`) into content-rich cluster hubs.

### Content Per Region Page

1. **AI-generated intro** (300-500 words, E-E-A-T, via Claude Haiku)
   - Overview of the region, what makes it unique
   - Personal travel experience style
2. **Cities grid** — all cities in that region with short description + link
3. **Islands** — islands in the region (if applicable: southern has most)
4. **Regional food specialities** — popular dishes linked to `/food/[slug]/`
5. **Top itineraries** — itineraries covering the region, linked to `/itineraries/[slug]/`
6. **Popular comparisons** — comparison pages between cities in the region
7. **Best time to visit** — seasonal advice per region
8. **Budget indication** — average daily budget for the region

### Data

- Script: `scripts/enrich-regions.ts`
- Output: `data/regions/[slug]-enriched.json`
- Uses: existing city data (regions, budgets, weather), food data (regional dishes), itinerary data
- AI: Claude Haiku generates intro text + best-time-to-visit + budget summary
- Sources: Wikipedia region pages + existing enhanced city data

### Backlinks

Every city, island, food, and itinerary page that belongs to a region links back to the region page. Add region badge/link in:
- City page header (already shows region tag, make it a link)
- Food page "Where to try this" section (Phase 2B)

### URL Structure

No change — existing `/region/[slug]/` pages get enriched content.

---

## Phase 2: Cross-Content Internal Linking

### 2A: City Sub-Pages → Each Other (HIGH priority, LOW complexity)

**What:** Add "Explore More in [City]" section at bottom of every city sub-page.

**Pages affected:**
- `/city/[slug]/top-10-attractions/`
- `/city/[slug]/top-10-hotels/`
- `/city/[slug]/top-10-restaurants/`
- `/city/[slug]/hotels/`
- `/city/[slug]/food/`
- `/city/[slug]/attractions/`
- `/city/[slug]/best-time-to-visit/`
- `/city/[slug]/budget/`
- `/city/[slug]/cooking-classes/`
- `/city/[slug]/elephant-sanctuaries/`
- `/city/[slug]/diving-snorkeling/`

**Component:** `components/CityExploreMore.tsx`
- Receives city slug + current page type
- Renders grid of links to other sub-pages (excluding current)
- Uses existing city data to check which sub-pages exist

**Data:** No new data needed — uses `getCityBySlug()` + file existence checks at build time.

### 2B: Food → Cities (MEDIUM priority, MEDIUM complexity)

**What:** Add "Where to Try This" section on each food detail page (`/food/[slug]/`).

**Logic:**
- Scan enhanced city data for mentions of the dish in `top_restaurants`, `localFood`, `thingsToDo`
- Map dish slug → list of city slugs where it appears
- Generate at build time via `getStaticProps`

**Component:** `components/FoodCityLinks.tsx`
- Shows 3-6 city cards with "Try [dish] in [city] →" links
- Links to `/city/[slug]/food/` page

**Data:** Build-time mapping function in `lib/food.js`: `getCitiesForDish(dishSlug)`

### 2C: Transport → Comparisons (LOW-MEDIUM priority, LOW complexity)

**What:** On transport route pages, add link to comparison page if one exists.

**Logic:**
- Transport slug: `bangkok-to-chiang-mai`
- Comparison slug: `bangkok-vs-chiang-mai`
- Simple string replacement: `-to-` → `-vs-`
- Check if comparison file exists

**Location:** Already partially done in comparison pages (transport link). This is the reverse direction.

**Implementation:** In `pages/transport/[route].tsx` `getStaticProps`, check for comparison file and pass as prop.

### 2D: Blog → Cities/Food (MEDIUM priority, HIGH complexity)

**What:** Add "Related Destinations" section on blog posts linking to relevant cities and food pages.

**Logic:**
- Parse blog post title + tags for city names and food item names
- Match against known city slugs and food slugs
- Show as "Destinations mentioned in this article" section

**Component:** `components/BlogRelatedDestinations.tsx`
- Shows city cards + food cards if matches found
- Max 4 cities + 3 food items

**Data:** Build-time matching in `lib/blog.js`: `getRelatedDestinations(post)`
- Keyword matching against city name list and food name list
- Tag matching (e.g., tag "bangkok" → city bangkok)

---

## Implementation Order

1. Phase 1: Region hubs (script + page update)
2. Phase 2A: City sub-page cross-links (component + page updates)
3. Phase 2B: Food → Cities links (mapping function + component)
4. Phase 2C: Transport → Comparisons (simple prop addition)
5. Phase 2D: Blog → Cities/Food (keyword matching + component)

## Success Criteria

- All 4 region pages have 300-500 word intros + clustered links
- Every city sub-page links to at least 4 other sub-pages of the same city
- Food pages link to 2+ cities where the dish is popular
- Transport pages link to comparison pages where available
- Blog posts link to mentioned cities/food items
- Improved internal link graph depth (fewer dead ends)
- Expected: more pages indexed, higher topical authority signals
