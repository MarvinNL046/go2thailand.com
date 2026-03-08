// scripts/scrape-hotels.ts
// Scrapes real hotel data from Booking.com, Trip.com, and TripAdvisor
// Uses Jina Search + Jina Reader + Bright Data (fallback) + Claude Haiku (parser)
// Usage: npx tsx scripts/scrape-hotels.ts [--city phuket] [--dry-run]

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const { getAllCities } = require('../lib/cities');

const TOP10_DIR = path.join(process.cwd(), 'data', 'top10');
const AFFILIATE_LIST_PATH = path.join(process.cwd(), 'data', 'hotel-affiliate-list.json');

const JINA_API_KEY = process.env.JINA_API_KEY;
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || 'go2_projects';

interface ScrapedHotel {
  name: string;
  source: 'booking.com' | 'trip.com' | 'tripadvisor';
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

// -------------------------------------------------------------------
// Scraping helpers
// -------------------------------------------------------------------

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 30000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// Jina Reader: scrape a URL to markdown
async function jinaRead(url: string): Promise<string | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'text/markdown',
      'X-Return-Format': 'markdown',
    };
    if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;

    const res = await fetchWithTimeout(`https://r.jina.ai/${url}`, { headers });
    if (res.ok) {
      const content = await res.text();
      if (content && content.length > 200) return content;
    }
  } catch (err) {
    // silent fail
  }
  return null;
}

// Jina Search: search the web
async function jinaSearch(query: string): Promise<Array<{ title: string; description: string; url: string }>> {
  try {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;

    const res = await fetchWithTimeout(`https://s.jina.ai/${encodeURIComponent(query)}`, { headers }, 30000);
    if (!res.ok) return [];

    const data = await res.json();
    return (data.data || []).map((item: any) => ({
      title: item.title || '',
      description: item.description || '',
      url: item.url || '',
    }));
  } catch {
    return [];
  }
}

// Bright Data: scrape a URL (raw HTML, for sites that block Jina)
async function brightDataScrape(url: string): Promise<string | null> {
  if (!BRIGHT_DATA_API_KEY) return null;
  try {
    const res = await fetchWithTimeout('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
      },
      body: JSON.stringify({ zone: BRIGHT_DATA_ZONE, url, format: 'raw' }),
    }, 45000);

    if (res.ok) {
      const html = await res.text();
      // Strip HTML to text for AI parsing
      const text = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, '\n')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
      return text.length > 500 ? text : null;
    }
  } catch {
    // silent fail
  }
  return null;
}

// -------------------------------------------------------------------
// Multi-source hotel data gathering
// -------------------------------------------------------------------

async function gatherHotelData(cityName: string): Promise<{ content: string; source: string } | null> {
  console.log(`  [search] Searching for hotels in ${cityName}...`);

  // Strategy 1: Jina Search for hotel listings (gets TripAdvisor, Booking snippets)
  const searchResults = await jinaSearch(`top 10 best hotels ${cityName} Thailand 2025 2026 prices reviews rating`);

  const relevantResults = searchResults.filter(r =>
    (r.url.includes('tripadvisor') || r.url.includes('booking.com') || r.url.includes('trip.com')) &&
    !r.url.includes('Bot-or-Not')
  );

  console.log(`  [search] Found ${relevantResults.length} relevant results from target sources`);

  // Strategy 2: Try to scrape the actual pages (TripAdvisor via Jina, Booking/Trip via Bright Data)
  let fullContent = '';
  let mainSource = '';

  for (const result of relevantResults.slice(0, 3)) {
    const hostname = new URL(result.url).hostname;
    const sourceName = hostname.includes('tripadvisor') ? 'tripadvisor'
      : hostname.includes('booking') ? 'booking.com'
      : hostname.includes('trip.com') ? 'trip.com' : hostname;

    console.log(`  [scrape] Trying ${sourceName}: ${result.url}`);

    // Try Jina Reader first
    let pageContent = await jinaRead(result.url);

    // Fallback to Bright Data
    if (!pageContent) {
      console.log(`  [scrape] Jina failed, trying Bright Data...`);
      pageContent = await brightDataScrape(result.url);
    }

    if (pageContent && pageContent.length > 500) {
      fullContent += `\n\n=== SOURCE: ${sourceName} (${result.url}) ===\n${pageContent.slice(0, 8000)}`;
      if (!mainSource) mainSource = sourceName;
      console.log(`  [scrape] Got ${pageContent.length} chars from ${sourceName}`);
    }
  }

  // Strategy 3: Even if page scraping failed, use search snippet descriptions
  // (Jina Search returns TripAdvisor hotel names/ratings in the description)
  if (relevantResults.length > 0) {
    const snippets = relevantResults.map(r => `${r.title}\n${r.description}`).join('\n\n');
    fullContent += `\n\n=== SEARCH SNIPPETS ===\n${snippets}`;
    if (!mainSource && relevantResults[0]) {
      const hostname = new URL(relevantResults[0].url).hostname;
      mainSource = hostname.includes('tripadvisor') ? 'tripadvisor'
        : hostname.includes('booking') ? 'booking.com'
        : hostname.includes('trip.com') ? 'trip.com' : hostname;
    }
  }

  // Strategy 4: Direct Booking.com scrape via Bright Data (always try as extra source)
  if (!fullContent.includes('booking.com')) {
    const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(cityName + ', Thailand')}&order=popularity`;
    console.log(`  [scrape] Trying direct Booking.com via Bright Data...`);
    const bookingContent = await brightDataScrape(bookingUrl);
    if (bookingContent && bookingContent.length > 1000) {
      fullContent += `\n\n=== SOURCE: booking.com ===\n${bookingContent.slice(0, 8000)}`;
      if (!mainSource) mainSource = 'booking.com';
      console.log(`  [scrape] Got ${bookingContent.length} chars from Booking.com`);
    }
  }

  if (!fullContent || fullContent.length < 200) {
    return null;
  }

  return { content: fullContent, source: mainSource || 'mixed' };
}

// -------------------------------------------------------------------
// AI parsing (parse only, NEVER invent)
// -------------------------------------------------------------------

async function parseHotelsWithAI(
  scrapedContent: string,
  cityName: string,
  source: string
): Promise<ScrapedHotel[]> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `Extract the top 10 real hotels from the scraped content below for ${cityName}, Thailand.

CRITICAL RULES — VIOLATIONS ARE UNACCEPTABLE:
1. ONLY extract hotels that are EXPLICITLY NAMED in the scraped content.
2. Do NOT invent, fabricate, or hallucinate ANY hotel name or data point.
3. If the content mentions fewer than 10 hotels, return ONLY what is found. An empty array [] is valid.
4. Every single field must come DIRECTLY from the scraped content. If a field is not in the content, omit it.
5. Hotel names must be EXACT as they appear in the source (e.g., "Splash Beach Resort" not "Splash Resort").

For each hotel, extract ONLY what is present:
- name: exact hotel name from the content
- source: "${source}"
- price_per_night: exact price as shown (with currency)
- rating: numerical rating (e.g., 8.7 or 4.5)
- review_count: number of reviews (as integer)
- address: location/area if mentioned
- facilities: amenities listed
- review_snippets: guest review quotes if present

Return ONLY a valid JSON array. No explanation, no markdown.
If no real hotels can be identified, return: []

Content:
${scrapedContent.slice(0, 15000)}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const hotels = JSON.parse(jsonMatch[0]);
    return hotels
      .filter((h: any) => h.name && h.name !== 'Unknown' && h.name.length > 2)
      .slice(0, 10)
      .map((h: any) => ({
        name: h.name,
        source: (h.source || source) as ScrapedHotel['source'],
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
    console.error(`  [AI] Parse failed: ${err}`);
    return [];
  }
}

// -------------------------------------------------------------------
// Orchestration per city
// -------------------------------------------------------------------

async function scrapeHotelsForCity(
  citySlug: string,
  cityName: string
): Promise<CityHotelResult | null> {
  const data = await gatherHotelData(cityName);
  if (!data) return null;

  const hotels = await parseHotelsWithAI(data.content, cityName, data.source);
  if (hotels.length === 0) return null;

  return {
    city_slug: citySlug,
    city_name: cityName,
    hotels,
    source: data.source,
    scraped_at: new Date().toISOString(),
  };
}

// -------------------------------------------------------------------
// File updater
// -------------------------------------------------------------------

function updateTop10File(citySlug: string, cityName: string, result: CityHotelResult) {
  if (!fs.existsSync(TOP10_DIR)) fs.mkdirSync(TOP10_DIR, { recursive: true });

  const filePath = path.join(TOP10_DIR, `${citySlug}-hotels.json`);

  const items = result.hotels.map((hotel, index) => ({
    rank: index + 1,
    name: hotel.name,
    description: [
      `${hotel.name} is a${hotel.rating ? ` ${hotel.rating}-rated` : ''} hotel in ${cityName}`,
      hotel.address ? `located at ${hotel.address}` : null,
      hotel.facilities ? `Features include ${hotel.facilities.slice(0, 4).join(', ')}` : null,
      hotel.review_snippets?.[0] ? `Guests say: "${hotel.review_snippets[0]}"` : null,
    ].filter(Boolean).join('. ') + '.',
    location: hotel.address || cityName,
    current_price: hotel.price_per_night || undefined,
    highlights: hotel.facilities?.slice(0, 3) || [],
    insider_tips: hotel.review_snippets || [],
    current_info: [
      hotel.price_per_night ? `Price: ${hotel.price_per_night}` : null,
      hotel.rating ? `Rating: ${hotel.rating}/${hotel.source === 'booking.com' ? '10' : '5'}` : null,
      hotel.review_count ? `${hotel.review_count.toLocaleString()} reviews` : null,
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
    affiliate_url: undefined,
  }));

  const output = {
    title: `Top ${items.length} Hotels in ${cityName} — Real Reviews & Prices`,
    meta_description: `The ${items.length} best hotels in ${cityName}, Thailand with real prices, ratings and guest reviews from ${result.source}. Updated ${new Date().toISOString().split('T')[0]}.`,
    intro: `Discover the best hotels in ${cityName}, Thailand. These recommendations are based on real guest reviews and current pricing from ${result.source}.`,
    items,
    city_slug: citySlug,
    city_name: cityName,
    category: 'hotels' as const,
    data_sources: [result.source, 'scraped'],
    last_scraped: result.scraped_at,
    generated_at: new Date().toISOString(),
    hybrid: false,
    scraped: true,
  };

  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`  Saved: ${filePath} (${items.length} hotels)`);
}

// -------------------------------------------------------------------
// Main
// -------------------------------------------------------------------

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
  console.log(`[scrape-hotels] Sources: Booking.com, Trip.com, TripAdvisor`);
  console.log(`[scrape-hotels] Jina: ${JINA_API_KEY ? 'configured' : 'MISSING'}`);
  console.log(`[scrape-hotels] Bright Data: ${BRIGHT_DATA_API_KEY ? 'configured' : 'MISSING'}`);

  const affiliateList: Record<string, string[]> = {};
  let successCount = 0;
  let failCount = 0;

  for (const city of cities) {
    try {
      console.log(`\n=== ${city.name.en} (${city.slug}) ===`);
      const result = await scrapeHotelsForCity(city.slug, city.name.en);

      if (result && result.hotels.length > 0) {
        affiliateList[city.slug] = result.hotels.map((h: ScrapedHotel) => h.name);

        if (!dryRun) {
          updateTop10File(city.slug, city.name.en, result);
        } else {
          console.log(`  [DRY RUN] Would save ${result.hotels.length} hotels:`);
          result.hotels.forEach((h, i) =>
            console.log(`    ${i + 1}. ${h.name} — ${h.price_per_night || 'no price'} — ${h.rating || 'no rating'} (${h.source})`)
          );
        }

        console.log(`  ✓ ${result.hotels.length} hotels from ${result.source}`);
        successCount++;
      } else {
        console.warn(`  ✗ No hotels found`);
        failCount++;
      }

      // Rate limiting: wait 5s between cities
      const idx = cities.indexOf(city);
      if (idx < cities.length - 1) {
        await new Promise((r) => setTimeout(r, 5000));
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err}`);
      failCount++;
    }
  }

  // Write affiliate list
  if (!dryRun && Object.keys(affiliateList).length > 0) {
    const affiliateOutput = {
      generated_at: new Date().toISOString().split('T')[0],
      total_cities: Object.keys(affiliateList).length,
      total_hotels: Object.values(affiliateList).reduce((sum, arr) => sum + arr.length, 0),
      cities: affiliateList,
    };
    fs.writeFileSync(AFFILIATE_LIST_PATH, JSON.stringify(affiliateOutput, null, 2));
    console.log(`\nAffiliate list saved: ${AFFILIATE_LIST_PATH}`);
  }

  console.log(`\n[scrape-hotels] Done: ${successCount} success, ${failCount} failed out of ${cities.length}`);
}

main().catch(console.error);
