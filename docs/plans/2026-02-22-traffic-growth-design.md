# Traffic Growth Strategy: Content Machine

**Date**: 2026-02-22 (updated)
**Goal**: Increase organic search traffic through programmatic content generation
**Approach**: Content Machine — maximize automated content at scale

## Constraints

- **Existing blog pipeline is untouched** (`content/blog/`, `lib/blog.js`, blog cron) — it works well and produces good content
- New content types get their **own separate pipelines**
- All new content generated from existing data (33 cities, 295 attractions, 14 itineraries)

## Current Baseline

- 36 blog posts (8 languages)
- 33 cities with enhanced data
- 295 attractions with Google Maps links
- 14 itineraries
- 46 food items, 25 drinks
- ~15 transport routes
- Schema: Article, FAQ, BreadcrumbList, HowTo (itineraries)

---

## Phase 1: Comparison Pages (Priority: HIGH)

**Pipeline**: `scripts/generate-comparisons.js` (separate from blog pipeline)
**Page**: `pages/compare/[slug].tsx`
**Data**: `data/comparisons/[city-a]-vs-[city-b].json`

Generate "[City A] vs [City B]" pages from existing city data:
- Top 50 city combinations (Bangkok vs Chiang Mai, Phuket vs Krabi, etc.)
- Auto-compare: weather, budget (3 tiers), attractions, food, transport, vibe
- Structured data: FAQ schema, ItemList
- Internal links to both city pages, relevant blog posts, transport routes
- Bilingual (en/nl initially, expand to all 8 languages via translation pipeline)

**Target keywords**: "bangkok vs chiang mai", "phuket vs krabi", etc.
**Expected pages**: 50+
**SEO potential**: High — comparison queries have strong commercial/travel intent

---

## Phase 2: Transport Routes Expansion (Priority: HIGH)

**Pipeline**: `scripts/generate-transport-routes.js` (separate pipeline)
**Page**: `pages/transport/[slug].tsx` (existing page template, scale up data)
**Data**: `data/transport/` (extend existing)

Expand from ~15 routes to 100+:
- All major city-to-city routes
- Include: bus, train, flight, ferry options with costs and duration
- Schema: HowTo + FAQ
- Affiliate: 12Go Asia booking links

**Expected pages**: 50-100 new routes
**SEO potential**: High — "how to get from X to Y" = direct travel planning intent

---

## Phase 3: Seasonal City Guides (Priority: MEDIUM)

**Pipeline**: `scripts/generate-seasonal-guides.js` (separate pipeline)
**Page**: `pages/city/[slug]/best-time-to-visit.tsx`
**Data**: Existing weather data + enhanced city data

Generate "Best Time to Visit [City]" for all 33 cities:
- Monthly weather breakdown
- Festival calendar
- Peak/off-peak pricing
- Recommended activities per season
- Schema: FAQ

**Expected pages**: 33
**SEO potential**: Medium — consistent long-tail traffic

---

## Phase 4: Schema Enrichment (Priority: MEDIUM, Ongoing)

Add structured data to existing pages (no new pages):
- FAQ schema on all city pages (FAQ data already in enhanced JSON)
- Enhanced TouristDestination schema on city pages (containsPlace, hasMap)
- BreadcrumbList verification across all page types
- Image schema on blog images

**Expected pages**: 0 new (enriches ~200+ existing pages)
**SEO potential**: Medium — improves rich snippet eligibility

---

## Phase 5: Internal Linking (Priority: MEDIUM, Ongoing)

Improve cross-page linking (no new pages):
- Comparison pages link to both cities + relevant transport route
- Transport routes link to destination city pages
- City pages link to comparisons, transport, and relevant blog posts
- Auto-generate "Related Content" sections on city pages

**Expected pages**: 0 new (enriches existing)
**SEO potential**: Medium — improves crawl depth and authority distribution

---

## Summary

| Phase | Content Type | New Pages | Pipeline | Impact |
|-------|-------------|-----------|----------|--------|
| 1 | Comparison pages | 50+ | `generate-comparisons.js` | High |
| 2 | Transport routes | 50-100 | `generate-transport-routes.js` | High |
| 3 | Seasonal guides | 33 | `generate-seasonal-guides.js` | Medium |
| 4 | Schema enrichment | 0 | Component updates | Medium |
| 5 | Internal linking | 0 | Component updates | Medium |

**Total new indexable pages**: 133-183+
**All fully automated from existing data**
**Existing blog pipeline: UNCHANGED**
