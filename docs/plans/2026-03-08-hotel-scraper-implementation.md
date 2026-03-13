# Hotel Data Scraper & Enrichment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scrape real hotel data from Trip.com and Booking.com for all 33 cities and replace the current AI-fabricated hotel data with verified, real hotels.

**Architecture:** A standalone TypeScript script that uses existing scraper infrastructure (Jina Reader → Bright Data fallback) to fetch hotel listings from Trip.com/Booking.com, parses real hotel data (name, price, rating, reviews, address, facilities, photo), and writes enriched JSON files to `data/top10/`. AI (Claude) is used only to parse the scraped HTML/markdown into structured JSON — not to invent data.

**Tech Stack:** TypeScript (tsx), existing `lib/pipeline/scraper.ts`, Claude Haiku for structured parsing, `lib/cities.js` for city list

---

### Task 1: Create the hotel scraper script skeleton

**Files:**
- Create: `scripts/scrape-hotels.ts`

**Step 1: Create the script with CLI interface and city iteration**

```typescript
// scripts/scrape-hotels.ts
// Usage: npx tsx scripts/scrape-hotels.ts [--city phuket] [--dry-run]

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import { scrapeUrl } from '../lib/pipeline/scraper';

const { getAllCities } = require('../lib/cities');

const TOP10_DIR = path.join(process.cwd(), 'data', 'top10');
const AFFILIATE_LIST_PATH = path.join(process.cwd(), 'data', 'hotel-affiliate-list.json');

interface ScrapedHotel {
  name: string;
  source: 'trip.com' | 'booking.com';
  price_per_night?: string;
  rating?: number;
  review_count?: number;
  address?: string;
  facilities?: string[];
  photo_url?: string;
  review_snippets?: string[];
  scraped_at: string;
}

interface CityHotelResult {
  city_slug: string;
  city_name: string;
  hotels: ScrapedHotel[];
  source: string;
  scraped_at: string;
}

// Parse CLI args
const args = process.argv.slice(2);
const cityFilter = args.includes('--city') ? args[args.indexOf('--city') + 1] : null;
const dryRun = args.includes('--dry-run');

async function main() {
  const allCities = getAllCities();
  const cities = cityFilter
    ? allCities.filter((c: any) => c.slug === cityFilter)
    : allCities;

  if (cities.length === 0) {
    console.error(`City not found: ${cityFilter}`);
    process.exit(1);
  }

  console.log(`[scrape-hotels] Starting for ${cities.length} cities${dryRun ? ' (DRY RUN)' : ''}`);

  const affiliateList: Record<string, string[]> = {};
  let successCount = 0;
  let failCount = 0;

  for (const city of cities) {
    try {
      console.log(`\n[scrape-hotels] === ${city.name.en} (${city.slug}) ===`);
      const result = await scrapeHotelsForCity(city.slug, city.name.en);

      if (result && result.hotels.length > 0) {
        affiliateList[city.slug] = result.hotels.map(h => h.name);

        if (!dryRun) {
          updateTop10File(city.slug, city.name.en, result);
        }

        console.log(`[scrape-hotels] ✓ ${city.name.en}: ${result.hotels.length} hotels from ${result.source}`);
        successCount++;
      } else {
        console.warn(`[scrape-hotels] ✗ ${city.name.en}: no hotels found`);
        failCount++;
      }

      // Rate limiting: wait 2s between cities
      if (cities.indexOf(city) < cities.length - 1) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (err) {
      console.error(`[scrape-hotels] ✗ ${city.name.en}: ${err}`);
      failCount++;
    }
  }

  // Write affiliate list
  if (!dryRun) {
    const affiliateOutput = {
      generated_at: new Date().toISOString().split('T')[0],
      total_cities: Object.keys(affiliateList).length,
      total_hotels: Object.values(affiliateList).reduce((sum, arr) => sum + arr.length, 0),
      cities: affiliateList,
    };
    fs.writeFileSync(AFFILIATE_LIST_PATH, JSON.stringify(affiliateOutput, null, 2));
    console.log(`\n[scrape-hotels] Affiliate list saved: ${AFFILIATE_LIST_PATH}`);
  }

  console.log(`\n[scrape-hotels] Done: ${successCount} success, ${failCount} failed`);
}

main().catch(console.error);
```

**Step 2: Commit**

```bash
git add scripts/scrape-hotels.ts
git commit -m "feat: add hotel scraper script skeleton"
```

---

### Task 2: Implement Trip.com and Booking.com scraping + AI parsing

**Files:**
- Modify: `scripts/scrape-hotels.ts`

**Step 1: Add the scraping and parsing functions**

Add these functions before `main()`:

```typescript
// Scrape hotels from Trip.com for a city
async function scrapeTrip(cityName: string): Promise<string | null> {
  const searchUrl = `https://www.trip.com/hotels/list?city=${encodeURIComponent(cityName)}&countryId=1`;
  try {
    console.log(`[scrape-hotels]   Trying Trip.com...`);
    const content = await scrapeUrl(`https://www.trip.com/hotels/${cityName.toLowerCase().replace(/\s+/g, '-')}-hotel/`);
    if (content && content.length > 500) {
      return content;
    }
    // Fallback: search query
    const searchContent = await scrapeUrl(`https://www.trip.com/hotels/list?city=${encodeURIComponent(cityName + ' Thailand')}`);
    return searchContent && searchContent.length > 500 ? searchContent : null;
  } catch (err) {
    console.warn(`[scrape-hotels]   Trip.com failed: ${err}`);
    return null;
  }
}

// Scrape hotels from Booking.com for a city
async function scrapeBooking(cityName: string): Promise<string | null> {
  try {
    console.log(`[scrape-hotels]   Trying Booking.com...`);
    const content = await scrapeUrl(`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cityName + ' Thailand')}&nflt=ht_id%3D204`);
    return content && content.length > 500 ? content : null;
  } catch (err) {
    console.warn(`[scrape-hotels]   Booking.com failed: ${err}`);
    return null;
  }
}

// Use Claude to parse scraped content into structured hotel data
async function parseHotelsWithAI(scrapedContent: string, cityName: string, source: string): Promise<ScrapedHotel[]> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Extract the top 10 real hotels from this scraped ${source} page for ${cityName}, Thailand.

IMPORTANT: Only extract REAL hotels that actually exist. Do NOT invent or fabricate any data.
If you can only find fewer than 10, return what you find. Quality over quantity.

For each hotel extract (if available):
- name: exact hotel name as shown on the website
- price_per_night: in THB if available, otherwise original currency
- rating: numerical rating (e.g., 8.7)
- review_count: number of reviews
- address: street address or area
- facilities: array of key facilities (pool, wifi, breakfast, etc.)
- photo_url: direct image URL if visible in the content
- review_snippets: 1-2 short guest review quotes

Return ONLY valid JSON array. No explanation, no markdown. Example:
[{"name":"Hotel Name","price_per_night":"1,500 THB","rating":8.7,"review_count":234,"address":"123 Beach Rd","facilities":["Pool","WiFi"],"photo_url":"https://...","review_snippets":["Great location"]}]

Scraped content:
${scrapedContent.slice(0, 12000)}`
    }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const hotels = JSON.parse(jsonMatch[0]);
    return hotels.map((h: any) => ({
      name: h.name || 'Unknown',
      source: source as 'trip.com' | 'booking.com',
      price_per_night: h.price_per_night || undefined,
      rating: typeof h.rating === 'number' ? h.rating : undefined,
      review_count: typeof h.review_count === 'number' ? h.review_count : undefined,
      address: h.address || undefined,
      facilities: Array.isArray(h.facilities) ? h.facilities : undefined,
      photo_url: h.photo_url || undefined,
      review_snippets: Array.isArray(h.review_snippets) ? h.review_snippets : undefined,
      scraped_at: new Date().toISOString(),
    }));
  } catch (err) {
    console.error(`[scrape-hotels]   AI parse failed: ${err}`);
    return [];
  }
}

// Main scrape function per city: Trip.com first, Booking.com fallback
async function scrapeHotelsForCity(citySlug: string, cityName: string): Promise<CityHotelResult | null> {
  // Try Trip.com first
  let content = await scrapeTrip(cityName);
  let source = 'trip.com';

  // Fallback to Booking.com
  if (!content) {
    content = await scrapeBooking(cityName);
    source = 'booking.com';
  }

  if (!content) {
    return null;
  }

  const hotels = await parseHotelsWithAI(content, cityName, source);

  if (hotels.length === 0) return null;

  return {
    city_slug: citySlug,
    city_name: cityName,
    hotels,
    source,
    scraped_at: new Date().toISOString(),
  };
}
```

**Step 2: Commit**

```bash
git add scripts/scrape-hotels.ts
git commit -m "feat: add Trip.com/Booking.com scraping with AI parsing"
```

---

### Task 3: Implement the top-10 file updater

**Files:**
- Modify: `scripts/scrape-hotels.ts`

**Step 1: Add the function to update/create top-10 JSON files**

Add before `main()`:

```typescript
// Update or create the top-10 hotel JSON file with scraped data
function updateTop10File(citySlug: string, cityName: string, result: CityHotelResult) {
  const filePath = path.join(TOP10_DIR, `${citySlug}-hotels.json`);

  let existing: any = null;
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      existing = null;
    }
  }

  const items = result.hotels.map((hotel, index) => ({
    rank: index + 1,
    name: hotel.name,
    description: `${hotel.name} is a ${hotel.rating ? `${hotel.rating}-rated ` : ''}hotel in ${cityName}${hotel.address ? `, located at ${hotel.address}` : ''}.${hotel.facilities ? ` Features include ${hotel.facilities.slice(0, 4).join(', ')}.` : ''}${hotel.review_snippets?.[0] ? ` Guests say: "${hotel.review_snippets[0]}"` : ''}`,
    location: hotel.address || cityName,
    current_price: hotel.price_per_night || undefined,
    highlights: hotel.facilities?.slice(0, 3) || [],
    insider_tips: hotel.review_snippets || [],
    current_info: [
      hotel.price_per_night ? `Price: ${hotel.price_per_night}` : null,
      hotel.rating ? `Rating: ${hotel.rating}/10` : null,
      hotel.review_count ? `${hotel.review_count} reviews` : null,
    ].filter(Boolean).join(' • '),
    scraped: {
      source: hotel.source,
      price_per_night: hotel.price_per_night,
      rating: hotel.rating,
      review_count: hotel.review_count,
      address: hotel.address,
      facilities: hotel.facilities,
      photo_url: hotel.photo_url,
      review_snippets: hotel.review_snippets,
      scraped_at: hotel.scraped_at,
    },
    affiliate_url: undefined, // User fills in manually
  }));

  const output = {
    title: existing?.title || `Top 10 Hotels in ${cityName} — Real Reviews & Prices`,
    meta_description: `The ${items.length} best hotels in ${cityName}, Thailand with real prices, ratings and guest reviews from ${result.source}. Updated ${new Date().toISOString().split('T')[0]}.`,
    intro: existing?.intro || `Discover the best hotels in ${cityName}, Thailand. These recommendations are based on real guest reviews and current pricing from ${result.source}.`,
    items,
    city_slug: citySlug,
    city_name: cityName,
    category: 'hotels',
    data_sources: [result.source, 'scraped'],
    last_scraped: result.scraped_at,
    generated_at: new Date().toISOString(),
    hybrid: false,
    scraped: true,
  };

  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`[scrape-hotels]   Saved: ${filePath} (${items.length} hotels)`);
}
```

**Step 2: Commit**

```bash
git add scripts/scrape-hotels.ts
git commit -m "feat: add top-10 file updater with scraped hotel data"
```

---

### Task 4: Add npm script and test with single city

**Files:**
- Modify: `package.json`

**Step 1: Add npm script**

Add to `scripts` in `package.json`:

```json
"scrape:hotels": "tsx scripts/scrape-hotels.ts"
```

**Step 2: Test with a single city (dry run)**

Run: `npm run scrape:hotels -- --city phuket --dry-run`

Expected: Console output showing scraped hotel names from Trip.com or Booking.com, no files written.

**Step 3: Test with a single city (real)**

Run: `npm run scrape:hotels -- --city phuket`

Expected: `data/top10/phuket-hotels.json` updated with real hotel data, `data/hotel-affiliate-list.json` created.

**Step 4: Verify the output**

Check that:
- Hotel names are real (e.g., "The Nai Harn", "Amanpuri", not "The Hidden Oasis")
- Prices are present
- Ratings are numerical
- No fabricated data

**Step 5: Commit**

```bash
git add package.json scripts/scrape-hotels.ts data/top10/phuket-hotels.json data/hotel-affiliate-list.json
git commit -m "feat: add scrape:hotels npm script, verify with phuket data"
```

---

### Task 5: Run full scrape for all 33 cities

**Step 1: Run full scrape**

Run: `npm run scrape:hotels`

This will take ~5-10 minutes (33 cities × 2s rate limit + scrape time).

Expected: All 33 cities scraped, `data/hotel-affiliate-list.json` contains all hotel names.

**Step 2: Review results**

Check: `cat data/hotel-affiliate-list.json | head -50`

Verify hotel names look real across multiple cities.

**Step 3: Commit all data**

```bash
git add data/top10/*-hotels.json data/hotel-affiliate-list.json
git commit -m "feat: scrape real hotel data for all 33 cities"
```

---

### Task 6: Display scraped data on hotel pages

**Files:**
- Modify: `pages/city/[slug]/top-10-hotels.tsx`

**Step 1: Check if the page already renders `scraped` fields**

Read the page component. If it already renders `current_info`, `current_price`, etc., no changes needed — the new data format is backwards compatible.

If the page doesn't show rating/review count from `scraped`, add display for:
- Rating badge (e.g., "8.7/10")
- Review count (e.g., "2,341 reviews")
- Source attribution (e.g., "Prices from Trip.com")
- Affiliate URL button (if `affiliate_url` is set)

**Step 2: Commit if changes made**

```bash
git add pages/city/[slug]/top-10-hotels.tsx
git commit -m "feat: display scraped hotel ratings and source on hotel pages"
```
