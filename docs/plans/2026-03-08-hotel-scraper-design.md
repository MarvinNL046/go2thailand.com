# Hotel Data Scraper & Enrichment — Design Doc

**Date**: 2026-03-08
**Goal**: Scrape real hotel data from Trip.com/Booking.com for all 33 cities and enrich existing top-10 hotel pages

## Architecture

```
npm run scrape:hotels
    ↓
scripts/scrape-hotels.ts
    ↓
Per city: scrape Trip.com → parse hotel data → fallback Booking.com
    ↓
Update data/top10/{city}-hotels.json (add scraped fields)
    ↓
Output: data/hotel-affiliate-list.json (hotel names per city for manual affiliate linking)
```

## Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Primary source | Trip.com | Better affiliate deal |
| Fallback source | Booking.com | Most coverage |
| Frequency | Manual (one-off script) | User preference |
| Affiliate links | Manual by user | User creates deep links in Travelpayouts |
| Scraper | Existing lib/pipeline/scraper.ts | Jina Reader → Bright Data fallback |
| Scope | All 33 cities | Full coverage |

## Data Model Extension

Existing `HotelItem` gets new fields:

```typescript
{
  // existing fields unchanged
  name: string;
  current_price?: string;
  location?: string;
  // new
  scraped?: {
    source: 'trip.com' | 'booking.com';
    price_per_night?: string;       // "1,200 THB"
    rating?: number;                 // 8.7
    review_count?: number;           // 2341
    address?: string;                // "123 Beach Rd, Patong"
    facilities?: string[];           // ["Pool", "Spa", "Free WiFi"]
    photo_url?: string;              // direct image URL
    review_snippets?: string[];      // ["Great location", "Clean rooms"]
    scraped_at: string;              // ISO timestamp
  };
  affiliate_url?: string;           // manually filled by user
}
```

## Scraping Strategy

1. Per city, search Trip.com for "top hotels in {city} Thailand"
2. Parse results: extract hotel name, price, rating, review count, address, facilities, photo, review snippets
3. If Trip.com fails or returns insufficient data, fallback to Booking.com
4. Fuzzy match scraped hotel names against existing `items[].name` in top-10 data
5. For cities without existing top-10 data: generate new JSON file with scraped data

## Output

### Enriched hotel data
Updated `data/top10/{city}-hotels.json` files with `scraped` field per hotel item.

### Affiliate list
`data/hotel-affiliate-list.json` — flat list of hotel names per city for user to create affiliate deep links manually.

```json
{
  "generated_at": "2026-03-08",
  "cities": {
    "phuket": ["The Nai Harn", "Amanpuri", "Kata Rocks"],
    "bangkok": ["Mandarin Oriental", "The Peninsula", "Chatrium"]
  }
}
```

## Out of Scope (YAGNI)

- No automatic affiliate link generation
- No cron automation
- No photo downloads (URL only)
- No frontend changes (pages already render hotel data)
- No YouTube transcript integration (separate feature)
