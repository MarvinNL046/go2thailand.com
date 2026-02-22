import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
import { jinaSearch } from '../lib/jina';
import { generateWithClaude } from './lib/claude';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), 'data');
const ENHANCED_DIR = path.join(DATA_DIR, 'enhanced');

// Load all city slugs from index
function getCitySlugs(): string[] {
  const indexPath = path.join(DATA_DIR, 'cities', 'index.json');
  try {
    const cities = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    return cities.map((c: any) => c.slug);
  } catch (e: any) {
    console.error(`Failed to load city index: ${e.message}`);
    return [];
  }
}

// Allow filtering via CLI args: `tsx scripts/scrape-cities.ts bangkok phuket`
const REQUESTED = process.argv.slice(2);
const ALL_SLUGS = getCitySlugs();
const CITIES = REQUESTED.length > 0
  ? REQUESTED.filter(s => ALL_SLUGS.includes(s))
  : ALL_SLUGS;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadJson(filePath: string): any {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e: any) {
    console.warn(`Failed to load ${filePath}: ${e.message}`);
  }
  return null;
}

function loadCityData(slug: string): any {
  // Try enhanced first, then base city data
  const enhancedPath = path.join(ENHANCED_DIR, `${slug}.json`);
  const cityPath = path.join(DATA_DIR, 'cities', `${slug}.json`);
  return loadJson(enhancedPath) || loadJson(cityPath) || {};
}

function loadAttractions(slug: string): any[] {
  const indexPath = path.join(DATA_DIR, 'attractions', slug, 'index.json');
  const data = loadJson(indexPath);
  return data?.attractions || [];
}

// ---------------------------------------------------------------------------
// Search & extract
// ---------------------------------------------------------------------------

async function searchAndExtract(query: string): Promise<string> {
  try {
    const result = await jinaSearch(query);
    return result.slice(0, 12000);
  } catch (e: any) {
    console.warn(`  Search failed for "${query}": ${e.message}`);
    return '';
  }
}

// ---------------------------------------------------------------------------
// Generate enriched content for a city
// ---------------------------------------------------------------------------

async function enrichCity(slug: string, cityData: any): Promise<any> {
  const cityName = cityData.name?.en || cityData.name || slug;
  const attractions = loadAttractions(slug);

  console.log(`\n=== Enriching: ${cityName} (${slug}) ===`);
  console.log(`  Found ${attractions.length} attractions`);

  // --- Scrape restaurants ---
  console.log('  Searching for restaurants...');
  const restaurantContent = await searchAndExtract(`best restaurants ${cityName} Thailand 2025 2026`);

  // --- Scrape hotels ---
  console.log('  Searching for hotels...');
  const hotelContent = await searchAndExtract(`best hotels ${cityName} Thailand 2025 2026 budget midrange luxury`);

  // --- Scrape travel context ---
  console.log('  Searching for travel context...');
  const travelContent = await searchAndExtract(`${cityName} Thailand travel guide 2025 2026`);

  // --- Build context ---
  const attractionsSummary = attractions.slice(0, 10).map((a: any) => ({
    name: a.name?.en || a.name,
    type: a.type,
    entrance_fee: a.entrance_fee,
    highlights: a.highlights,
  }));

  const systemPrompt = `You are a travel content expert specializing in Thailand. You write factual, engaging travel guides backed by real data. You never invent facts — you only use information provided to you or well-known facts about the destination.

Output ONLY valid JSON, no markdown wrapping, no explanation text before or after the JSON.`;

  const userPrompt = `Create comprehensive travel content for ${cityName}, Thailand.

EXISTING CITY DATA:
${JSON.stringify({ region: cityData.region, province: cityData.province, description: cityData.description, population: cityData.population, highlights: cityData.highlights, location: cityData.location }, null, 2)}

EXISTING ATTRACTIONS:
${JSON.stringify(attractionsSummary, null, 2)}

RESTAURANT SEARCH RESULTS:
${restaurantContent.slice(0, 4000)}

HOTEL SEARCH RESULTS:
${hotelContent.slice(0, 4000)}

TRAVEL GUIDE SEARCH RESULTS:
${travelContent.slice(0, 4000)}

Generate a JSON object with this EXACT structure:
{
  "overview": "2-3 engaging paragraphs about ${cityName} as a travel destination. Reference real attractions from the data.",
  "thingsToDo": "2-3 paragraphs about what to do in ${cityName}. Reference REAL attractions with their actual entrance fees.",
  "whereToStay": "2-3 paragraphs about accommodation options in different areas and price ranges.",
  "whereToEat": [
    {
      "name": "Real Restaurant Name",
      "cuisine": "Type of cuisine (Thai, Seafood, Street Food, International, etc.)",
      "priceRange": "$" | "$$" | "$$$",
      "description": "1-2 sentence description"
    }
  ],
  "topHotels": [
    {
      "name": "Real Hotel Name",
      "category": "budget" | "midrange" | "luxury",
      "priceRange": "e.g. $15-30/night",
      "area": "Neighborhood/area name",
      "description": "1-2 sentence description with actual amenities"
    }
  ],
  "gettingAround": "1-2 paragraphs about local transport (tuk-tuks, songthaews, motorbike rental, BTS/MRT if applicable, Grab).",
  "bestTimeToVisit": "1-2 paragraphs about weather, monsoon season, best months to visit ${cityName} specifically.",
  "budgetGuide": {
    "budget": { "min": 20, "max": 40, "description": "Budget traveler daily costs - guesthouse, street food, local transport" },
    "midrange": { "min": 50, "max": 100, "description": "Mid-range daily costs - 3-star hotel, restaurants, activities" },
    "luxury": { "min": 150, "max": 400, "description": "Luxury daily costs - 5-star resort, fine dining, private tours" }
  },
  "safetyTips": "1-2 paragraphs of area-specific safety advice for ${cityName}.",
  "faq": [
    { "question": "Common question about ${cityName}?", "answer": "Factual answer." }
  ],
  "practicalInfo": {
    "bestMonths": ["Nov", "Dec", "Jan", "Feb"],
    "nearestAirport": "Airport name and code",
    "travelTimeFromAirport": "X minutes/hours by car",
    "localTransport": ["Tuk-tuk", "Songthaew", "Grab"]
  }
}

RULES:
- whereToEat: Extract 5-8 REAL restaurants from the search results. Only use real restaurant names.
- topHotels: Extract 8-10 REAL hotels from the search results. Include a mix of budget (2-3), midrange (3-4), and luxury (2-3). Only use real hotel names.
- faq: Include 5-7 real questions travelers ask. Use data-backed answers with real prices where possible.
- budgetGuide: Use realistic USD prices for Thailand (much cheaper than Western countries).
- All text content should be engaging and useful for travelers, not generic filler.
- bestTimeToVisit: Be specific to this city/region, not generic Thailand advice.
- Output ONLY the JSON object. No markdown. No code fences.`;

  const result = await generateWithClaude(systemPrompt, userPrompt, 8192);

  let enrichedContent: any;
  try {
    const jsonStr = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    enrichedContent = JSON.parse(jsonStr);
  } catch (e: any) {
    console.error(`  Failed to parse Claude response for ${slug}: ${e.message}`);
    console.error('  Raw response (first 500 chars):', result.slice(0, 500));
    return null;
  }

  // --- Merge with existing city data ---
  const enhanced = {
    ...cityData,
    // Enriched content
    overview: enrichedContent.overview,
    thingsToDo: enrichedContent.thingsToDo,
    whereToStay: enrichedContent.whereToStay,
    whereToEat: enrichedContent.whereToEat || [],
    topHotels: enrichedContent.topHotels || [],
    gettingAround: enrichedContent.gettingAround,
    bestTimeToVisit: enrichedContent.bestTimeToVisit,
    budgetGuide: enrichedContent.budgetGuide,
    safetyTips: enrichedContent.safetyTips,
    faq: enrichedContent.faq || [],
    practicalInfo: enrichedContent.practicalInfo,
    // Metadata
    enrichedAt: new Date().toISOString(),
  };

  return enhanced;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Thailand City Enrichment Scraper');
  console.log('================================\n');
  console.log(`Cities to enrich: ${CITIES.length}`);
  console.log(`Cities: ${CITIES.join(', ')}\n`);

  // Ensure output directory exists
  fs.mkdirSync(ENHANCED_DIR, { recursive: true });

  let successCount = 0;

  for (const slug of CITIES) {
    try {
      const cityData = loadCityData(slug);
      if (!cityData || (!cityData.name && !cityData.slug)) {
        console.error(`No data found for city: ${slug}, skipping`);
        continue;
      }

      const enhanced = await enrichCity(slug, cityData);
      if (!enhanced) {
        console.error(`  Skipping ${slug} due to enrichment failure`);
        continue;
      }

      const outPath = path.join(ENHANCED_DIR, `${slug}.json`);
      fs.writeFileSync(outPath, JSON.stringify(enhanced, null, 2));
      console.log(`  Saved: ${outPath}`);
      successCount++;

      // Rate limiting: wait 2 seconds between cities
      if (CITIES.indexOf(slug) < CITIES.length - 1) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch (e: any) {
      console.error(`  Error enriching ${slug}: ${e.message}`);
    }
  }

  console.log(`\nDone! ${successCount}/${CITIES.length} cities enriched.`);
  console.log(`Output: ${ENHANCED_DIR}/`);
}

main().catch(console.error);
