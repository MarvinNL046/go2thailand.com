// scripts/scrape-restaurants.ts
// Scrapes real restaurant data from TripAdvisor, Google, and travel sites
// Uses Jina Search + Jina Reader + Bright Data (fallback) + Claude Haiku (parser)
// Usage: npx tsx scripts/scrape-restaurants.ts [--city phuket] [--dry-run]

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const { getAllCities } = require('../lib/cities');

const TOP10_DIR = path.join(process.cwd(), 'data', 'top10');
const AFFILIATE_LIST_PATH = path.join(process.cwd(), 'data', 'restaurant-affiliate-list.json');

const JINA_API_KEY = process.env.JINA_API_KEY;
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || 'go2_projects';

// Travelpayouts affiliate config
const MARKER = '602467';
const TRS = '421888';
const TRIP_PROGRAM = '7631';

interface ScrapedRestaurant {
  name: string;
  source: 'tripadvisor' | 'google' | 'other';
  cuisine?: string;
  price_range?: string;
  rating?: number;
  review_count?: number;
  address?: string;
  highlights?: string[];
  review_snippets?: string[];
  scraped_at: string;
}

interface CityRestaurantResult {
  city_slug: string;
  city_name: string;
  restaurants: ScrapedRestaurant[];
  source: string;
  scraped_at: string;
}

// -------------------------------------------------------------------
// Scraping helpers (same as hotel scraper)
// -------------------------------------------------------------------

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 30000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

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
  } catch {
    // silent fail
  }
  return null;
}

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
// Multi-source restaurant data gathering
// -------------------------------------------------------------------

async function gatherRestaurantData(cityName: string): Promise<{ content: string; source: string } | null> {
  console.log(`  [search] Searching for restaurants in ${cityName}...`);

  const searchResults = await jinaSearch(`best restaurants ${cityName} Thailand 2025 2026 reviews rating TripAdvisor`);

  const relevantResults = searchResults.filter(r =>
    (r.url.includes('tripadvisor') || r.url.includes('thefork') || r.url.includes('timeout') || r.url.includes('cntraveler') || r.url.includes('michelin')) &&
    !r.url.includes('Bot-or-Not')
  );

  // Also include general travel food guides
  const foodGuides = searchResults.filter(r =>
    !relevantResults.includes(r) &&
    (r.title.toLowerCase().includes('restaurant') || r.title.toLowerCase().includes('food') || r.title.toLowerCase().includes('eat')) &&
    (r.title.toLowerCase().includes(cityName.toLowerCase()))
  );

  const allResults = [...relevantResults, ...foodGuides.slice(0, 2)];

  console.log(`  [search] Found ${allResults.length} relevant results`);

  let fullContent = '';
  let mainSource = '';

  for (const result of allResults.slice(0, 4)) {
    const hostname = new URL(result.url).hostname;
    const sourceName = hostname.includes('tripadvisor') ? 'tripadvisor'
      : hostname.replace('www.', '').split('.')[0];

    console.log(`  [scrape] Trying ${sourceName}: ${result.url}`);

    let pageContent = await jinaRead(result.url);

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

  // Search snippets as additional data
  if (allResults.length > 0) {
    const snippets = allResults.map(r => `${r.title}\n${r.description}`).join('\n\n');
    fullContent += `\n\n=== SEARCH SNIPPETS ===\n${snippets}`;
    if (!mainSource && allResults[0]) {
      const hostname = new URL(allResults[0].url).hostname;
      mainSource = hostname.includes('tripadvisor') ? 'tripadvisor' : 'other';
    }
  }

  // Direct TripAdvisor restaurants scrape via Bright Data
  if (!fullContent.includes('tripadvisor')) {
    const taUrl = `https://www.tripadvisor.com/Restaurants-${cityName.replace(/\s+/g, '_')}-Thailand.html`;
    console.log(`  [scrape] Trying direct TripAdvisor restaurants via Bright Data...`);
    const taContent = await brightDataScrape(`https://www.tripadvisor.com/Search?q=${encodeURIComponent('best restaurants ' + cityName + ' Thailand')}`);
    if (taContent && taContent.length > 1000) {
      fullContent += `\n\n=== SOURCE: tripadvisor ===\n${taContent.slice(0, 8000)}`;
      if (!mainSource) mainSource = 'tripadvisor';
      console.log(`  [scrape] Got ${taContent.length} chars from TripAdvisor`);
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

async function parseRestaurantsWithAI(
  scrapedContent: string,
  cityName: string,
  source: string
): Promise<ScrapedRestaurant[]> {
  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `Extract the top 10 real restaurants from the scraped content below for ${cityName}, Thailand.

CRITICAL RULES — VIOLATIONS ARE UNACCEPTABLE:
1. ONLY extract restaurants that are EXPLICITLY NAMED in the scraped content.
2. Do NOT invent, fabricate, or hallucinate ANY restaurant name or data point.
3. If the content mentions fewer than 10 restaurants, return ONLY what is found. An empty array [] is valid.
4. Every single field must come DIRECTLY from the scraped content. If a field is not in the content, omit it.
5. Restaurant names must be EXACT as they appear in the source.
6. Prefer well-known, highly-rated restaurants over random mentions.

For each restaurant, extract ONLY what is present:
- name: exact restaurant name from the content
- cuisine: type of cuisine (Thai, Seafood, Italian, Street Food, etc.)
- price_range: price indicator ($, $$, $$$, or specific range like "200-500 THB")
- rating: numerical rating (e.g., 4.5)
- review_count: number of reviews (as integer)
- address: location/area if mentioned
- highlights: notable dishes or features
- review_snippets: guest review quotes if present

Return ONLY a valid JSON array. No explanation, no markdown.
If no real restaurants can be identified, return: []

Content:
${scrapedContent.slice(0, 15000)}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const restaurants = JSON.parse(jsonMatch[0]);
    return restaurants
      .filter((r: any) => r.name && r.name !== 'Unknown' && r.name.length > 2)
      .slice(0, 10)
      .map((r: any) => ({
        name: r.name,
        source: (source.includes('tripadvisor') ? 'tripadvisor' : 'other') as ScrapedRestaurant['source'],
        cuisine: r.cuisine || undefined,
        price_range: r.price_range || undefined,
        rating: typeof r.rating === 'number' ? r.rating : undefined,
        review_count: typeof r.review_count === 'number' ? r.review_count : undefined,
        address: r.address || undefined,
        highlights: Array.isArray(r.highlights) ? r.highlights : undefined,
        review_snippets: Array.isArray(r.review_snippets) ? r.review_snippets : undefined,
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

async function scrapeRestaurantsForCity(
  citySlug: string,
  cityName: string
): Promise<CityRestaurantResult | null> {
  const data = await gatherRestaurantData(cityName);
  if (!data) return null;

  const restaurants = await parseRestaurantsWithAI(data.content, cityName, data.source);
  if (restaurants.length === 0) return null;

  return {
    city_slug: citySlug,
    city_name: cityName,
    restaurants,
    source: data.source,
    scraped_at: new Date().toISOString(),
  };
}

// -------------------------------------------------------------------
// File updater
// -------------------------------------------------------------------

function updateTop10File(citySlug: string, cityName: string, result: CityRestaurantResult) {
  if (!fs.existsSync(TOP10_DIR)) fs.mkdirSync(TOP10_DIR, { recursive: true });

  const filePath = path.join(TOP10_DIR, `${citySlug}-restaurants.json`);

  const items = result.restaurants.map((rest, index) => ({
    rank: index + 1,
    name: rest.name,
    description: [
      `${rest.name} is a${rest.rating ? ` ${rest.rating}-rated` : ''} ${rest.cuisine || ''} restaurant in ${cityName}`.trim(),
      rest.address ? `located at ${rest.address}` : null,
      rest.highlights ? `Known for ${rest.highlights.slice(0, 3).join(', ')}` : null,
      rest.review_snippets?.[0] ? `Guests say: "${rest.review_snippets[0]}"` : null,
    ].filter(Boolean).join('. ') + '.',
    location: rest.address || cityName,
    current_price: rest.price_range || undefined,
    highlights: rest.highlights?.slice(0, 3) || [],
    insider_tips: rest.review_snippets || [],
    current_info: [
      rest.cuisine ? `Cuisine: ${rest.cuisine}` : null,
      rest.price_range ? `Price: ${rest.price_range}` : null,
      rest.rating ? `Rating: ${rest.rating}/5` : null,
      rest.review_count ? `${rest.review_count.toLocaleString()} reviews` : null,
    ].filter(Boolean).join(' • '),
    scraped: {
      source: rest.source,
      cuisine: rest.cuisine,
      price_range: rest.price_range,
      rating: rest.rating,
      review_count: rest.review_count,
      address: rest.address,
      highlights: rest.highlights,
      review_snippets: rest.review_snippets,
      scraped_at: rest.scraped_at,
    },
    // Auto-generate Trip.com affiliate link (restaurants nearby search)
    trip_affiliate_url: `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${TRIP_PROGRAM}&u=${encodeURIComponent(`https://www.trip.com/hotels/list?keyword=${encodeURIComponent(rest.name + ' ' + cityName)}`)}`,
  }));

  const output = {
    title: `Top ${items.length} Restaurants in ${cityName} — Real Reviews & Ratings`,
    meta_description: `The ${items.length} best restaurants in ${cityName}, Thailand with real ratings and guest reviews from ${result.source}. Updated ${new Date().toISOString().split('T')[0]}.`,
    intro: `Discover the best restaurants in ${cityName}, Thailand. These recommendations are based on real guest reviews and ratings from ${result.source}.`,
    items,
    city_slug: citySlug,
    city_name: cityName,
    category: 'restaurants' as const,
    data_sources: [result.source, 'scraped'],
    last_scraped: result.scraped_at,
    generated_at: new Date().toISOString(),
    hybrid: false,
    scraped: true,
  };

  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`  Saved: ${filePath} (${items.length} restaurants)`);
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

  console.log(`[scrape-restaurants] Starting for ${cities.length} cities${dryRun ? ' (DRY RUN)' : ''}`);
  console.log(`[scrape-restaurants] Sources: TripAdvisor, travel guides`);
  console.log(`[scrape-restaurants] Jina: ${JINA_API_KEY ? 'configured' : 'MISSING'}`);
  console.log(`[scrape-restaurants] Bright Data: ${BRIGHT_DATA_API_KEY ? 'configured' : 'MISSING'}`);

  const affiliateList: Record<string, string[]> = {};
  let successCount = 0;
  let failCount = 0;

  for (const city of cities) {
    try {
      console.log(`\n=== ${city.name.en} (${city.slug}) ===`);
      const result = await scrapeRestaurantsForCity(city.slug, city.name.en);

      if (result && result.restaurants.length > 0) {
        affiliateList[city.slug] = result.restaurants.map((r: ScrapedRestaurant) => r.name);

        if (!dryRun) {
          updateTop10File(city.slug, city.name.en, result);
        } else {
          console.log(`  [DRY RUN] Would save ${result.restaurants.length} restaurants:`);
          result.restaurants.forEach((r, i) =>
            console.log(`    ${i + 1}. ${r.name} — ${r.cuisine || 'unknown cuisine'} — ${r.rating || 'no rating'} (${r.source})`)
          );
        }

        console.log(`  ✓ ${result.restaurants.length} restaurants from ${result.source}`);
        successCount++;
      } else {
        console.warn(`  ✗ No restaurants found`);
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
      total_restaurants: Object.values(affiliateList).reduce((sum, arr) => sum + arr.length, 0),
      cities: affiliateList,
    };
    fs.writeFileSync(AFFILIATE_LIST_PATH, JSON.stringify(affiliateOutput, null, 2));
    console.log(`\nAffiliate list saved: ${AFFILIATE_LIST_PATH}`);
  }

  console.log(`\n[scrape-restaurants] Done: ${successCount} success, ${failCount} failed out of ${cities.length}`);
}

main().catch(console.error);
