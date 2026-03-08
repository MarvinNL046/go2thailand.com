// scripts/factcheck-attractions.ts
// Fact-checks and generates/updates top-10 attractions with real data + 300-400 word stories
// Uses Wikipedia + Jina Search + Claude Haiku
// Usage: npx tsx scripts/factcheck-attractions.ts [--city bangkok] [--dry-run]

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const { getAllCities } = require('../lib/cities');

const TOP10_DIR = path.join(process.cwd(), 'data', 'top10');
const JINA_API_KEY = process.env.JINA_API_KEY;
const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;
const BRIGHT_DATA_ZONE = process.env.BRIGHT_DATA_ZONE || 'go2_projects';

// -------------------------------------------------------------------
// Scraping helpers
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
    const res = await fetchWithTimeout(`https://s.jina.ai/${encodeURIComponent(query)}`, { headers }, 15000);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((item: any) => ({
      title: item.title || '',
      description: item.description || '',
      url: item.url || '',
    }));
  } catch { return []; }
}

async function jinaRead(url: string): Promise<string | null> {
  try {
    const headers: Record<string, string> = { Accept: 'text/markdown', 'X-Return-Format': 'markdown' };
    if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;
    const res = await fetchWithTimeout(`https://r.jina.ai/${url}`, { headers }, 15000);
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
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${BRIGHT_DATA_API_KEY}` },
      body: JSON.stringify({ zone: BRIGHT_DATA_ZONE, url, format: 'raw' }),
    }, 45000);
    if (res.ok) {
      const html = await res.text();
      const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      return text.length > 500 ? text : null;
    }
  } catch {}
  return null;
}

// -------------------------------------------------------------------
// Wikipedia name mapping
// -------------------------------------------------------------------

const wikiNames: Record<string, string> = {
  'bangkok': 'Bangkok', 'chiang-mai': 'Chiang_Mai', 'chiang-rai': 'Chiang_Rai',
  'phuket': 'Phuket_(city)', 'pattaya': 'Pattaya', 'ayutthaya': 'Ayutthaya_(city)',
  'krabi': 'Krabi_(city)', 'hat-yai': 'Hat_Yai', 'sukhothai': 'Sukhothai_(city)',
  'surat-thani': 'Surat_Thani', 'pai': 'Pai,_Thailand', 'mae-hong-son': 'Mae_Hong_Son',
  'lampang': 'Lampang', 'khon-kaen': 'Khon_Kaen', 'udon-thani': 'Udon_Thani',
  'nakhon-ratchasima': 'Nakhon_Ratchasima', 'ubon-ratchathani': 'Ubon_Ratchathani',
  'kanchanaburi': 'Kanchanaburi_(city)', 'hua-hin': 'Hua_Hin', 'lopburi': 'Lop_Buri',
  'phitsanulok': 'Phitsanulok', 'trat': 'Trat', 'rayong': 'Rayong',
  'koh-samui': 'Ko_Samui', 'nakhon-si-thammarat': 'Nakhon_Si_Thammarat',
  'trang': 'Trang_(city)', 'chumphon': 'Chumphon', 'chanthaburi': 'Chanthaburi',
  'chiang-khan': 'Chiang_Khan', 'nong-khai': 'Nong_Khai', 'bueng-kan': 'Bueng_Kan',
  'nakhon-phanom': 'Nakhon_Phanom', 'mukdahan': 'Mukdahan',
};

// -------------------------------------------------------------------
// Gather attraction data
// -------------------------------------------------------------------

async function gatherAttractionData(cityName: string, citySlug: string): Promise<string> {
  const allContent: string[] = [];

  // 1. Wikipedia
  const wikiName = wikiNames[citySlug] || cityName.replace(/ /g, '_');
  console.log(`  [scrape] Wikipedia: ${wikiName}...`);
  try {
    const wikiContent = await jinaRead(`https://en.wikipedia.org/wiki/${wikiName}`);
    if (wikiContent) {
      allContent.push(`--- Wikipedia ${cityName} ---\n${wikiContent.slice(0, 5000)}`);
    }
  } catch {}

  await new Promise(r => setTimeout(r, 1500));

  // 2. Search for attractions with entrance fees
  console.log(`  [search] Attractions & fees...`);
  try {
    const results = await jinaSearch(`${cityName} Thailand top attractions things to do entrance fee 2025 2026`);
    for (const r of results.slice(0, 5)) {
      allContent.push(`[${r.title}] ${r.description}`);
    }
  } catch {}

  await new Promise(r => setTimeout(r, 1500));

  // 3. Search for TripAdvisor top things to do
  console.log(`  [search] TripAdvisor top things...`);
  try {
    const results = await jinaSearch(`${cityName} Thailand TripAdvisor top things to do must see`);
    for (const r of results.slice(0, 5)) {
      allContent.push(`[${r.title}] ${r.description}`);
    }
  } catch {}

  return allContent.join('\n\n');
}

// -------------------------------------------------------------------
// AI: Generate fact-checked attraction content
// -------------------------------------------------------------------

async function generateAttractions(
  cityName: string,
  citySlug: string,
  scrapedData: string,
  existingData: any | null
): Promise<any> {
  const anthropic = new Anthropic();

  // Get real attraction names from enhanced city data if available
  let enhancedAttractions: string[] = [];
  try {
    const enhancedPath = path.join(process.cwd(), 'data', 'enhanced', `${citySlug}.json`);
    if (fs.existsSync(enhancedPath)) {
      const enhanced = JSON.parse(fs.readFileSync(enhancedPath, 'utf-8'));
      if (enhanced.top_attractions) {
        enhancedAttractions = enhanced.top_attractions.map((a: any) => a.name);
      }
    }
  } catch {}

  const prompt = `You are a Thailand travel content writer creating an engaging top-10 attractions guide for ${cityName}, Thailand. Output ONLY valid JSON.

CRITICAL RULES:
- Use REAL attraction names only (verified from scraped data below)
- Use SIMPLE names: "Wat Pho" not "The Hidden Oasis of Wat Pho"
- Include REAL current entrance fees in THB with USD equivalent
- Each attraction MUST have 300-400 words total across all fields combined
- Write engaging first-person stories but with FACTUAL details (real addresses, real prices, real opening hours)
- Include the MOST FAMOUS attractions first (temples, landmarks, markets, beaches, national parks)

REAL ATTRACTION NAMES FROM FACT-CHECKED DATA:
${enhancedAttractions.length > 0 ? enhancedAttractions.join(', ') : 'None available - use scraped data below'}

SCRAPED REAL DATA:
${scrapedData.slice(0, 10000)}

${existingData ? `EXISTING DATA (keep good content, fix names/prices):
${JSON.stringify(existingData.items?.slice(0, 3), null, 2).slice(0, 2000)}` : ''}

OUTPUT FORMAT - Return this exact JSON structure:
{
  "title": "Top 10 Must-Visit Attractions in ${cityName}",
  "meta_description": "Discover the best attractions in ${cityName}, Thailand — from ancient temples to stunning nature spots. Real prices, insider tips & local favorites.",
  "intro": "[200-250 word engaging intro about ${cityName}'s attractions, written as personal experience]",
  "items": [
    {
      "rank": 1,
      "name": "REAL Simple Name (e.g. Grand Palace, not The Majestic Grand Palace)",
      "story": "[150-200 word first-person story about visiting this place with REAL details - mention actual features, architecture, what you see]",
      "why_locals_love_it": "[50-70 words on why locals appreciate this place]",
      "insider_tips": ["tip 1 with real practical info", "tip 2", "tip 3"],
      "price_reality": "Entrance fee: XXX THB (~$X USD). [Add context about what's included, discounts, free days]",
      "location_details": "[Real location with nearest transport station/landmark]",
      "personal_moment": "[30-50 word memorable moment]"
    }
  ],
  "local_wisdom": "[100 words of general tips for visiting attractions in ${cityName}]",
  "budget_hacks": ["3-4 real money-saving tips specific to ${cityName}"],
  "cultural_notes": ["3-4 cultural etiquette notes relevant to ${cityName}'s attractions"]
}

IMPORTANT:
- 10 attractions total, ranked by importance/popularity
- Each item should have ~300-400 words across ALL fields combined
- ALL prices must be realistic and current (verify against scraped data)
- Use real transport info (BTS stations, songthaew routes, etc.)
- For beaches/nature: mention best time to visit, conditions
- For temples: mention dress code, opening hours if known`;

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((b: any) => b.type === 'text')
    .map((b: any) => b.text)
    .join('');

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error(`  [ai] No JSON found in response`);
    return null;
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    // Add metadata
    parsed.city_slug = citySlug;
    parsed.city_name = cityName;
    parsed.category = 'attractions';
    parsed.data_sources = ['wikipedia', 'tripadvisor', 'jina-search'];
    parsed.generated_at = new Date().toISOString();
    parsed.factchecked_at = new Date().toISOString();
    parsed.ai_generated = true;
    parsed.hybrid = true;
    return parsed;
  } catch (err) {
    console.error(`  [ai] JSON parse error: ${err}`);
    return null;
  }
}

// -------------------------------------------------------------------
// Main
// -------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const cityArg = args.find((_, i) => args[i - 1] === '--city');
  const force = args.includes('--force');

  const allCities = getAllCities();
  const cities = cityArg
    ? allCities.filter((c: any) => c.slug === cityArg)
    : allCities;

  if (cities.length === 0) {
    console.error(`City not found: ${cityArg}`);
    process.exit(1);
  }

  console.log(`\n[factcheck-attractions] Starting for ${cities.length} cities${dryRun ? ' (DRY RUN)' : ''}...\n`);

  let success = 0;
  let failed = 0;

  for (const city of cities) {
    const cityName = typeof city.name === 'object' ? city.name.en : city.name;
    const citySlug = city.slug;
    const filePath = path.join(TOP10_DIR, `${citySlug}-attractions.json`);

    console.log(`\n--- ${cityName} (${citySlug}) ---`);

    // Skip already fact-checked
    if (fs.existsSync(filePath) && !force) {
      try {
        const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (existing.factchecked_at) {
          console.log(`  [skip] Already fact-checked at ${existing.factchecked_at}`);
          success++;
          continue;
        }
      } catch {}
    }

    try {
      // Load existing data if any
      let existingData = null;
      if (fs.existsSync(filePath)) {
        try {
          existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch {}
      }

      // Gather real data
      const scrapedData = await gatherAttractionData(cityName, citySlug);
      if (scrapedData.length < 200) {
        console.log(`  [skip] Insufficient data (${scrapedData.length} chars)`);
        failed++;
        continue;
      }
      console.log(`  [data] Gathered ${scrapedData.length} chars`);

      // Generate with AI
      console.log(`  [ai] Generating fact-checked attractions...`);
      const result = await generateAttractions(cityName, citySlug, scrapedData, existingData);

      if (!result || !result.items || result.items.length < 5) {
        console.log(`  [fail] AI returned insufficient data`);
        failed++;
        continue;
      }

      // Check word counts
      const wordCounts = result.items.map((item: any) => {
        const allText = [item.story, item.why_locals_love_it, item.insider_tips?.join(' '), item.price_reality, item.personal_moment, item.location_details].filter(Boolean).join(' ');
        return allText.split(/\s+/).length;
      });
      const avgWords = Math.round(wordCounts.reduce((a: number, b: number) => a + b, 0) / wordCounts.length);

      console.log(`  [ai] ${result.items.length} attractions, avg ${avgWords} words/attraction`);
      console.log(`  [ai] Names: ${result.items.slice(0, 5).map((a: any) => a.name).join(', ')}...`);

      if (dryRun) {
        console.log(`  [dry-run] Would save: ${filePath}`);
      } else {
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
        console.log(`  [save] ${filePath}`);
      }

      success++;

      // Rate limit
      if (cities.length > 1) {
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (err: any) {
      console.error(`  [error] ${err.message}`);
      failed++;
    }
  }

  console.log(`\n[factcheck-attractions] Done: ${success} success, ${failed} failed out of ${cities.length}\n`);
}

main().catch(console.error);
