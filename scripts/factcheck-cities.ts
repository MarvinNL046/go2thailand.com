// scripts/factcheck-cities.ts
// Fact-checks and updates enhanced city data with real, verified information
// Uses WebSearch + Claude Haiku to verify prices, attractions, transport, etc.
// Usage: npx tsx scripts/factcheck-cities.ts [--city bangkok] [--dry-run]

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const { getAllCities } = require('../lib/cities');

const ENHANCED_DIR = path.join(process.cwd(), 'data', 'enhanced');
const JINA_API_KEY = process.env.JINA_API_KEY;
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || 'go2_projects';

// -------------------------------------------------------------------
// Scraping helpers (reused from hotel scraper)
// -------------------------------------------------------------------

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
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

async function jinaRead(url: string): Promise<string | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'text/markdown',
      'X-Return-Format': 'markdown',
    };
    if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;
    const res = await fetchWithTimeout(`https://r.jina.ai/${url}`, { headers }, 30000);
    if (res.ok) {
      const content = await res.text();
      if (content && content.length > 200) return content;
    }
  } catch {}
  return null;
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
  } catch {}
  return null;
}

// -------------------------------------------------------------------
// Gather real facts for a city
// -------------------------------------------------------------------

async function gatherCityFacts(cityName: string, citySlug: string): Promise<string> {
  console.log(`  [search] Gathering facts for ${cityName}...`);

  const allContent: string[] = [];

  // Wikipedia name mapping for cities with different Wikipedia article names
  const wikiNames: Record<string, string> = {
    'bangkok': 'Bangkok',
    'chiang-mai': 'Chiang_Mai',
    'chiang-rai': 'Chiang_Rai',
    'phuket': 'Phuket_(city)',
    'pattaya': 'Pattaya',
    'ayutthaya': 'Ayutthaya_(city)',
    'krabi': 'Krabi_(city)',
    'hat-yai': 'Hat_Yai',
    'sukhothai': 'Sukhothai_(city)',
    'surat-thani': 'Surat_Thani',
    'pai': 'Pai,_Thailand',
    'mae-hong-son': 'Mae_Hong_Son',
    'lampang': 'Lampang',
    'khon-kaen': 'Khon_Kaen',
    'udon-thani': 'Udon_Thani',
    'nakhon-ratchasima': 'Nakhon_Ratchasima',
    'ubon-ratchathani': 'Ubon_Ratchathani',
    'kanchanaburi': 'Kanchanaburi_(city)',
    'hua-hin': 'Hua_Hin',
    'lopburi': 'Lop_Buri',
    'phitsanulok': 'Phitsanulok',
    'trat': 'Trat',
    'rayong': 'Rayong',
    'koh-samui': 'Ko_Samui',
    'nakhon-si-thammarat': 'Nakhon_Si_Thammarat',
    'trang': 'Trang_(city)',
    'chumphon': 'Chumphon',
    'chanthaburi': 'Chanthaburi',
    'chiang-khan': 'Chiang_Khan',
    'nong-khai': 'Nong_Khai',
    'bueng-kan': 'Bueng_Kan',
    'nakhon-phanom': 'Nakhon_Phanom',
    'mukdahan': 'Mukdahan',
  };

  // 1. Scrape Wikipedia directly (no search needed)
  const wikiName = wikiNames[citySlug] || cityName.replace(/ /g, '_');
  const wikiUrl = `https://en.wikipedia.org/wiki/${wikiName}`;
  console.log(`  [scrape] Wikipedia: ${wikiName}...`);
  try {
    const wikiContent = await jinaRead(wikiUrl);
    if (wikiContent) {
      allContent.push(`\n--- Wikipedia ${cityName} ---\n${wikiContent.slice(0, 5000)}`);
      console.log(`  [scrape] Got ${wikiContent.length} chars from Wikipedia`);
    } else {
      console.log(`  [scrape] Wikipedia: no content via Jina, trying Bright Data...`);
      const bdContent = await brightDataScrape(wikiUrl);
      if (bdContent) {
        allContent.push(`\n--- Wikipedia ${cityName} ---\n${bdContent.slice(0, 5000)}`);
        console.log(`  [scrape] Got ${bdContent.length} chars from Wikipedia (BD)`);
      }
    }
  } catch (err: any) {
    console.log(`  [scrape] Wikipedia failed: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 1000));

  // 2. One search for travel data (skip TripAdvisor scrape - we already have that in top10 files)
  console.log(`  [search] Travel data...`);
  try {
    const searchResults = await jinaSearch(`${cityName} Thailand travel guide 2025 2026 budget transport attractions price`);
    for (const result of searchResults.slice(0, 5)) {
      allContent.push(`[${result.title}] ${result.description}`);
    }
    console.log(`  [search] Got ${searchResults.length} search results`);
  } catch (err: any) {
    console.log(`  [search] Failed: ${err.message}`);
  }

  return allContent.join('\n\n');
}

// -------------------------------------------------------------------
// AI: Fact-check and generate corrected city data
// -------------------------------------------------------------------

async function factcheckWithAI(
  cityName: string,
  citySlug: string,
  currentData: any,
  scrapedFacts: string
): Promise<any> {
  const anthropic = new Anthropic();

  // Load real top10 data if available (already scraped)
  let realHotels: any[] = [];
  let realRestaurants: any[] = [];
  try {
    const hotelsPath = path.join(process.cwd(), 'data', 'top10', `${citySlug}-hotels.json`);
    if (fs.existsSync(hotelsPath)) {
      const hd = JSON.parse(fs.readFileSync(hotelsPath, 'utf-8'));
      realHotels = (hd.items || []).slice(0, 5).map((h: any) => ({
        name: h.name,
        rating: h.scraped?.rating,
        price: h.scraped?.price_per_night,
        source: h.scraped?.source,
      }));
    }
  } catch {}
  try {
    const restPath = path.join(process.cwd(), 'data', 'top10', `${citySlug}-restaurants.json`);
    if (fs.existsSync(restPath)) {
      const rd = JSON.parse(fs.readFileSync(restPath, 'utf-8'));
      realRestaurants = (rd.items || []).slice(0, 5).map((r: any) => ({
        name: r.name,
        cuisine: r.scraped?.cuisine,
        rating: r.scraped?.rating,
        source: r.scraped?.source,
      }));
    }
  } catch {}

  const prompt = `You are a Thailand travel data fact-checker. You MUST output valid JSON only.

TASK: Fact-check and correct the city data for ${cityName}, Thailand. Replace fake/AI-hallucinated data with real, verified information.

CURRENT DATA PROBLEMS TO FIX:
1. "top_attractions" may list fake/generic names, activities instead of real attractions, or wrong rankings
2. "top_restaurants" may list dish names instead of real restaurant names
3. "top_hotels" may have fake generic names like "Boutique Hotel ${cityName}"
4. Prices may be outdated (especially entrance fees, transport costs, airport transfers)
5. Population numbers may be outdated
6. Hotel categories may be wrong (e.g. 5-star luxury listed as "midrange")

REAL SCRAPED DATA FROM TRIPADVISOR (use these real names!):
Real Hotels: ${JSON.stringify(realHotels)}
Real Restaurants: ${JSON.stringify(realRestaurants)}

CURRENT ENHANCED DATA (to fact-check and correct):
Population: ${currentData.population}
Overview: ${currentData.overview || 'none'}
ThingsToDo: ${currentData.thingsToDo || 'none'}
GettingAround: ${currentData.gettingAround || 'none'}
BestTimeToVisit: ${currentData.bestTimeToVisit || 'none'}
SafetyTips: ${currentData.safetyTips || 'none'}
BudgetGuide: ${JSON.stringify(currentData.budgetGuide || {})}
TopHotels: ${JSON.stringify((currentData.topHotels || []).slice(0, 3))}
WhereToEat: ${JSON.stringify((currentData.whereToEat || []).slice(0, 3))}
FAQ: ${JSON.stringify((currentData.faq || []).slice(0, 3))}
Top Attractions (current): ${JSON.stringify((currentData.top_attractions || []).slice(0, 5))}
Top Restaurants (current): ${JSON.stringify((currentData.top_restaurants || []).slice(0, 5))}
Top Hotels (current): ${JSON.stringify((currentData.top_hotels || []).slice(0, 5))}
PracticalInfo: ${JSON.stringify(currentData.practicalInfo || {})}

SCRAPED REAL-WORLD FACTS:
${scrapedFacts.slice(0, 12000)}

OUTPUT: Return a JSON object with ONLY the fields that need updating. Include:
{
  "population": <corrected number or null if unchanged>,
  "top_attractions": [{"rank": 1, "name": "REAL attraction name", "description": "factual 1-2 sentence description", "location": "specific area/address", "entrance_fee": "price in THB if applicable", "highlights": ["1 highlight"]}],
  "top_restaurants": [{"rank": 1, "name": "REAL restaurant name from scraped data", "description": "factual description", "cuisine_type": "specific cuisine", "price_range": "realistic price range in THB", "highlights": ["1 highlight"]}],
  "top_hotels": [{"rank": 1, "name": "REAL hotel name from scraped data", "description": "factual description", "price_range": "realistic price range", "category": "budget|midrange|luxury", "highlights": ["1 highlight"]}],
  "topHotels": [{"name": "real name", "category": "budget|midrange|luxury", "priceRange": "$XX-YY/night", "area": "real area", "description": "factual"}],
  "whereToEat": [{"name": "real name", "cuisine": "specific", "priceRange": "$|$$|$$$", "description": "factual"}],
  "thingsToDo": "corrected text with accurate prices in THB and USD",
  "gettingAround": "corrected text with accurate transport prices",
  "budgetGuide": {"budget": {"min": X, "max": Y, "description": "..."}, "midrange": {"min": X, "max": Y, "description": "..."}, "luxury": {"min": X, "max": Y, "description": "..."}},
  "faq": [{"question": "...", "answer": "corrected answer with accurate prices"}],
  "practicalInfo": {"bestMonths": [...], "nearestAirport": "...", "travelTimeFromAirport": "...", "localTransport": [...]},
  "factchecked_at": "${new Date().toISOString()}"
}

RULES:
- Use 5-8 real attractions with real entrance fees (verify against scraped data)
- Use 5-8 REAL restaurant names (from scraped TripAdvisor data, NOT dish names)
- Use 5-8 REAL hotel names with correct categories (from scraped data)
- All prices in THB with USD equivalent where applicable
- Population should be the most recent figure available
- For topHotels: use 8-10 real hotels spanning budget/midrange/luxury
- For whereToEat: use 6-8 real restaurants with correct cuisine types
- Keep descriptions factual and concise, no flowery AI language
- If a field doesn't need changing, still include the corrected version
- For smaller cities that may not have BTS/MRT, use appropriate local transport`;

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((b: any) => b.type === 'text')
    .map((b: any) => b.text)
    .join('');

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error(`  [ai] No JSON found in response`);
    return null;
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error(`  [ai] Failed to parse JSON: ${err}`);
    return null;
  }
}

// -------------------------------------------------------------------
// Merge corrections into existing enhanced data
// -------------------------------------------------------------------

function mergeCorrections(existing: any, corrections: any): any {
  const merged = { ...existing };

  // Direct field updates
  const directFields = [
    'population', 'top_attractions', 'top_restaurants', 'top_hotels',
    'topHotels', 'whereToEat', 'thingsToDo', 'gettingAround',
    'bestTimeToVisit', 'safetyTips', 'budgetGuide', 'faq',
    'practicalInfo', 'overview',
  ];

  for (const field of directFields) {
    if (corrections[field] !== undefined && corrections[field] !== null) {
      merged[field] = corrections[field];
    }
  }

  // Mark as fact-checked
  merged.factchecked_at = corrections.factchecked_at || new Date().toISOString();

  return merged;
}

// -------------------------------------------------------------------
// Main
// -------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const cityArg = args.find((_, i) => args[i - 1] === '--city');

  const allCities = getAllCities();
  const cities = cityArg
    ? allCities.filter((c: any) => c.slug === cityArg)
    : allCities;

  if (cities.length === 0) {
    console.error(`City not found: ${cityArg}`);
    process.exit(1);
  }

  console.log(`\n[factcheck-cities] Starting fact-check for ${cities.length} cities${dryRun ? ' (DRY RUN)' : ''}...\n`);

  let success = 0;
  let failed = 0;

  for (const city of cities) {
    const cityName = typeof city.name === 'object' ? city.name.en : city.name;
    const citySlug = city.slug;
    console.log(`\n--- ${cityName} (${citySlug}) ---`);

    try {
      // Load current enhanced data
      const enhancedPath = path.join(ENHANCED_DIR, `${citySlug}.json`);
      if (!fs.existsSync(enhancedPath)) {
        console.log(`  [skip] No enhanced data found`);
        failed++;
        continue;
      }
      const currentData = JSON.parse(fs.readFileSync(enhancedPath, 'utf-8'));

      // Skip already fact-checked cities (unless --force)
      if (currentData.factchecked_at && !args.includes('--force')) {
        console.log(`  [skip] Already fact-checked at ${currentData.factchecked_at}`);
        success++;
        continue;
      }

      // Gather real facts from the web
      const scrapedFacts = await gatherCityFacts(cityName, citySlug);
      if (scrapedFacts.length < 200) {
        console.log(`  [skip] Insufficient data gathered (${scrapedFacts.length} chars)`);
        failed++;
        continue;
      }
      console.log(`  [search] Gathered ${scrapedFacts.length} chars of real data`);

      // AI fact-check and correction
      console.log(`  [ai] Fact-checking with Claude Haiku...`);
      const corrections = await factcheckWithAI(cityName, citySlug, currentData, scrapedFacts);

      if (!corrections) {
        console.log(`  [fail] AI returned no corrections`);
        failed++;
        continue;
      }

      // Count what was corrected
      const correctedFields = Object.keys(corrections).filter(k => k !== 'factchecked_at');
      console.log(`  [ai] Corrected ${correctedFields.length} fields: ${correctedFields.join(', ')}`);

      if (dryRun) {
        console.log(`  [dry-run] Would update: ${enhancedPath}`);
        if (corrections.population) {
          console.log(`    Population: ${currentData.population} -> ${corrections.population}`);
        }
        if (corrections.top_attractions) {
          console.log(`    Top attractions: ${corrections.top_attractions.slice(0, 3).map((a: any) => a.name).join(', ')}...`);
        }
        if (corrections.top_restaurants) {
          console.log(`    Top restaurants: ${corrections.top_restaurants.slice(0, 3).map((r: any) => r.name).join(', ')}...`);
        }
        if (corrections.top_hotels) {
          console.log(`    Top hotels: ${corrections.top_hotels.slice(0, 3).map((h: any) => h.name).join(', ')}...`);
        }
      } else {
        // Merge and save
        const merged = mergeCorrections(currentData, corrections);
        fs.writeFileSync(enhancedPath, JSON.stringify(merged, null, 2));
        console.log(`  [save] Updated: ${enhancedPath}`);
      }

      success++;

      // Rate limit: wait between cities
      if (cities.length > 1) {
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (err: any) {
      console.error(`  [error] ${err.message}`);
      failed++;
    }
  }

  console.log(`\n[factcheck-cities] Done: ${success} success, ${failed} failed out of ${cities.length}\n`);
}

main().catch(console.error);
