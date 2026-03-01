# Thailand Travel & Cost Index 2026 — Design Document

**Date:** 2026-03-01
**Status:** Approved
**Type:** Authority Magnet — Hub + Subpages

## Overview

Build a comprehensive "Thailand Travel & Cost Index 2026" as a hub page with deep-dive subpages. The index aggregates existing city data (33 cities) into sortable/filterable rankings across budget, weather, transport, and more. Designed as an SEO authority magnet with E-E-A-T compliance.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Page format | Hub + subpages | Better long-tail targeting, scalable to other countries, more ranking opportunities |
| Data approach | Aggregation script → JSON | Matches existing pipeline pattern (CSV → script → JSON → pages) |
| Language | EN-first, NL via translate pipeline | Matches site-wide pattern |
| Interactivity | Interactive tables + sticky TOC | Better dwell time, fits "index" positioning |
| Initial scope | Hub + 3 subpages (budget, best-time, digital-nomad) | Pragmatic MVP, expand later |

## URL Structure

```
/thailand-index/              → Hub page (authority magnet)
/thailand-index/budget        → Budget deep-dive
/thailand-index/best-time     → Season & weather per region
/thailand-index/digital-nomad → Internet, coworking, community
/thailand-index/safety        → (later)
/thailand-index/transport     → (later)
```

## Data Architecture

### Aggregation Script: `scripts/generate-index-data.js`

Reads all 33 enhanced city JSONs + city-weather.json + transport-routes.json + regions/*.json and generates a single `data/thailand-index.json`.

### Output: `data/thailand-index.json`

```json
{
  "cities": [{
    "slug": "chiang-mai",
    "name": {"en": "Chiang Mai", "nl": "Chiang Mai"},
    "region": "north",
    "location": {"lat": 18.79, "lng": 98.98},

    "budget": {
      "raw": {"budget": "$30-50 per day", "mid": "$50-100 per day", "luxury": "$100+ per day"},
      "currency": "USD",
      "tier_budget": {"min": 30, "max": 50, "median": 40},
      "tier_mid": {"min": 50, "max": 100, "median": 75},
      "tier_luxury": {"min": 100, "max": null, "median": 150}
    },

    "weather": {
      "raw_best_time_text": "November - February",
      "best_months": ["Nov", "Dec", "Jan", "Feb"],
      "month_scores": {"Jan": 0.96, "Feb": 0.91},
      "avg_temp_c": 27.4,
      "rainfall_score": 0.84,
      "humidity_score": 0.71,
      "comfort_score": 0.82
    },

    "transport": {
      "connections": 12,
      "unique_destinations": 10,
      "popular_routes": 5,
      "hubness": 0.66,
      "top_routes": [{"to": "bangkok", "duration": "10-12 hours", "modes": ["bus","train","flight"]}]
    },

    "scores": {
      "budget_score": 0.81,
      "weather_score": 0.82,
      "transport_score": 0.66,
      "overall_score": 0.76
    },
    "score_components": {
      "budget": {"tier_budget_median_usd": 40, "normalized": 0.81},
      "weather": {"comfort_score": 0.82, "best_month_count": 4},
      "transport": {"hubness": 0.66, "popular_count": 5}
    }
  }],

  "rankings": {
    "cheapest": {
      "metric": "budget.tier_budget.median",
      "order": "asc",
      "items": [{"slug": "pai", "value": 25, "rank": 1}]
    },
    "best_weather_jan": {
      "metric": "weather.month_scores.Jan",
      "order": "desc",
      "items": [{"slug": "chiang-mai", "value": 0.96, "rank": 1}]
    },
    "most_connected": {
      "metric": "transport.hubness",
      "order": "desc",
      "items": [{"slug": "bangkok", "value": 1.0, "rank": 1}]
    }
  },

  "regions": {
    "north": ["chiang-mai", "chiang-rai", "pai", "lampang", "phitsanulok", "chiang-khan"],
    "central": ["bangkok", "ayutthaya", "kanchanaburi", "lopburi", "nakhon-ratchasima", "khon-kaen", "udon-thani", "nong-khai", "ubon-ratchathani", "mukdahan", "nakhon-phanom", "bueng-kan"],
    "andaman": ["phuket", "krabi", "koh-phi-phi", "trang"],
    "gulf": ["koh-samui", "koh-phangan", "chumphon", "surat-thani", "nakhon-si-thammarat", "hat-yai"],
    "east": ["pattaya", "rayong", "trat"]
  },

  "metadata": {
    "generated_at": "2026-03-01T12:00:00Z",
    "city_count": 33,
    "data_version": "1.0.0",
    "sources": {
      "cities_dir_hash": "sha256...",
      "weather_file_hash": "sha256...",
      "transport_file_hash": "sha256...",
      "regions_dir_hash": "sha256..."
    }
  }
}
```

### Budget Parsing Strategy

The script must handle multiple formats from city JSONs:
- `"$30-50 per day"` → `{min: 30, max: 50, median: 40}`
- `"$30-50"` → same
- `"฿1000-1500"` → convert to USD
- `"$100+"` → `{min: 100, max: null, median: 150}` (estimate)
- `"~$40/day"` → `{min: 35, max: 45, median: 40}`

Normalize all to USD. Store raw string for debugging.

### Weather Scoring

Comfort score per month per city, computed from `city-weather.json`:
```
comfort_score = weighted_average(
  temp_comfort(temp_high, temp_low),   // weight: 0.3 (penalize >35°C and <18°C)
  rainfall_inverse(rainfall_mm),       // weight: 0.35
  humidity_inverse(humidity),          // weight: 0.2
  rainfall_days_inverse(rainfall_days) // weight: 0.15
)
```

### Transport Hubness Score

```
hubness = normalized(
  connections * 0.3 +
  popular_routes * 0.4 +
  unique_destinations * 0.3
)
```

### Enrichment Layer (Future)

```
data/enrichments/thailand-nomad.json    → wifi_mbps, coworking_spaces, nomad_score
data/enrichments/thailand-safety.json   → safety_score, scam_types, solo_safe_score
```

Generator merges enrichments by slug. `null` fallback when enrichment is missing.

## Page Architecture

### Hub Page: `/thailand-index/`

**Sections (mapped to H2 structure):**

1. **Hero** — H1: "Thailand Travel & Cost Index 2026: 50 Destinations Compared on Budget, Season, Safety & Internet" + last-updated badge
2. **At a Glance** — TL;DR bullets + Top 10 cards (cheapest, nomad-friendly, family-friendly)
3. **Interactive Overview Table** — All 33 cities, sortable by budget/weather/transport score, filterable by region
4. **Why This Index** — Context, audience (backpacker, nomad, couple, family), how to use
5. **Methodology** — Data sources, definitions (budget/midrange/comfort), score calculation, limitations, changelog (E-E-A-T)
6. **Budget Preview** — Top 10 cheapest + top 10 most expensive + "Full budget breakdown →"
7. **Season Preview** — Region-based best months matrix + "Complete season guide →"
8. **Nomad Preview** — Top 5 for remote work + "Digital nomad guide →"
9. **Recommended Routes** — Internal link hub to existing itinerary pages
10. **FAQ** — Schema.org FAQPage markup (6-8 questions targeting featured snippets)
11. **About the Author** — E-E-A-T section with methodology transparency

**Interactive elements:**
- Sticky TOC sidebar (desktop), collapsible drawer (mobile)
- Main table: sort by any column, filter by region/travel type
- Smooth scroll + active section highlighting via IntersectionObserver

### Subpage: `/thailand-index/budget`

- Full interactive budget table (all 33 cities, 3 tiers)
- Budget per region breakdown
- Budget per traveler type (backpacker vs nomad vs family)
- Street food index per city
- Saving tips
- FAQ

### Subpage: `/thailand-index/best-time`

- Month-by-region matrix (color-coded comfort scores)
- Per-region breakdown (North, Central, Andaman, Gulf) with best months
- Crowd index: when to go / when to avoid
- Events calendar
- FAQ

### Subpage: `/thailand-index/digital-nomad`

- Note: Limited data initially (no wifi/coworking scores yet)
- MVP: curated content for well-known nomad cities (Chiang Mai, Bangkok, Koh Phangan, Pai, Koh Lanta)
- Placeholder for enrichment data
- SIM/eSIM guide
- Community & expat info (link to /expat/)
- FAQ

## New Components

| Component | Purpose |
|-----------|---------|
| `components/index/IndexTable.tsx` | Sortable/filterable table with city data, column headers, sort indicators |
| `components/index/TableOfContents.tsx` | Sticky TOC sidebar (desktop) with IntersectionObserver active section tracking |
| `components/index/ScoreBadge.tsx` | Visual score indicator (color gradient green→yellow→red based on 0-1 score) |
| `components/index/RankingCard.tsx` | Top 10 card: rank number, city name, key metric value, link to city page |
| `components/index/RegionFilter.tsx` | Region filter buttons/chips for table |
| `components/index/MethodologySection.tsx` | E-E-A-T methodology with expandable details |
| `components/index/MonthMatrix.tsx` | Color-coded month × region matrix for best-time page |

### Reused Components

- `SEOHead.tsx` — Meta tags + schema.org (Article, FAQPage, Dataset)
- `Breadcrumbs.tsx` — Navigation breadcrumbs
- `Header.tsx` / `Footer.tsx` — Site layout
- `AuthorBio.tsx` — E-E-A-T author section
- `CityCard.tsx` — City cards in ranking sections

## Schema.org Markup

- **Hub page:** `Article` + `FAQPage` + `Dataset`
- **Subpages:** `Article` + `FAQPage`
- **Tables:** `Dataset` schema (bonus for E-E-A-T/authority)

## Build Integration

Add to `package.json` scripts:
```
"data:index": "node scripts/generate-index-data.js"
"data:generate": "... && npm run data:index"  // append to existing pipeline
```

## Phasing

### Phase 1 (Now)
- Aggregation script (`scripts/generate-index-data.js`)
- Hub page (`/thailand-index/`)
- Budget subpage (`/thailand-index/budget`)
- Best-time subpage (`/thailand-index/best-time`)
- All new components

### Phase 2 (Later)
- Digital nomad subpage (after enrichment data)
- Safety subpage (after enrichment data)
- Transport subpage
- Enrichment scripts for wifi/coworking/safety scores

### Phase 3 (Future)
- Thailand vs Vietnam vs Bali comparison
- Downloadable budget sheet
- Email capture integration
- Country expansion (`/vietnam-index/`, `/bali-index/`)
