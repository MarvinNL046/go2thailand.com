#!/usr/bin/env node
/**
 * Enrich city data with digital nomad information via Claude Haiku 4.5.
 *
 * Output: data/enrichments/thailand-nomad.json
 * Resume-safe: writes after each city, skips already-processed cities.
 * Rate limiting: 1.5s between API calls.
 *
 * Usage: ANTHROPIC_API_KEY=sk-... node scripts/enrich-nomad-data.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const enhancedDir = path.join(__dirname, '..', 'data', 'enhanced');
const enrichmentsDir = path.join(__dirname, '..', 'data', 'enrichments');
const outputFile = path.join(enrichmentsDir, 'thailand-nomad.json');

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 1024;
const TEMPERATURE = 0.3;
const DELAY_MS = 1500;

const REQUIRED_FIELDS = [
  'wifi_avg_mbps',
  'coworking_spaces',
  'coworking_notable',
  'cafe_work_friendly',
  'nomad_community_size',
  'nomad_score',
  'visa_options',
  'monthly_cost_usd',
  'best_areas',
  'sim_esim_available',
];

const VALID_COMMUNITY_SIZES = ['large', 'medium', 'small', 'minimal'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadExistingOutput() {
  if (fs.existsSync(outputFile)) {
    return JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  }
  return {};
}

function saveOutput(data) {
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
}

function getCityFiles() {
  return fs
    .readdirSync(enhancedDir)
    .filter(
      (f) =>
        f.endsWith('.json') &&
        fs.statSync(path.join(enhancedDir, f)).isFile()
    )
    .sort();
}

function getBudgetMedian(data) {
  if (data.budgetGuide && data.budgetGuide.midrange) {
    const { min, max } = data.budgetGuide.midrange;
    return Math.round((min + max) / 2);
  }
  if (data.budget_info && data.budget_info.mid_range) {
    const match = data.budget_info.mid_range.match(/\$(\d+)-(\d+)/);
    if (match) return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  }
  return null;
}

function buildPrompt(cityName, region, budgetMedian, population) {
  const budgetLine = budgetMedian
    ? `Daily budget median: ~$${budgetMedian} USD/day.`
    : 'Budget data unavailable.';

  return `You are a Thailand travel data expert. Generate digital nomad data for ${cityName}, Thailand.

Context:
- City: ${cityName}
- Region: ${region}
- Population: ${population ? population.toLocaleString() : 'unknown'}
- ${budgetLine}

Return ONLY valid JSON (no markdown fences, no explanation). Use these exact fields and types:

{
  "wifi_avg_mbps": <number, average wifi speed in Mbps, range 5-200>,
  "coworking_spaces": <number, count of coworking spaces in city, range 0-200>,
  "coworking_notable": <array of strings, up to 5 notable coworking space names>,
  "cafe_work_friendly": <number, count of work-friendly cafes, range 0-50>,
  "nomad_community_size": <string, one of: "large", "medium", "small", "minimal">,
  "nomad_score": <number 0-1, two decimals, weighted: wifi 20%, coworking 25%, cost 25%, community 30%>,
  "visa_options": <array of strings, valid Thai visa slugs like "tourist-60d", "ed-visa", "dtv", "elite-visa", "retirement-visa", "work-permit">,
  "monthly_cost_usd": <number, estimated monthly living cost for a digital nomad in USD, range 400-3000>,
  "best_areas": <array of strings, up to 5 best neighborhoods/areas for nomads>,
  "sim_esim_available": <boolean, whether SIM/eSIM is easily available>
}

Rules:
- Be conservative and realistic (E-E-A-T compliance). Do not inflate numbers.
- nomad_score weighting: wifi quality 20%, coworking availability 25%, cost of living 25%, community size 30%.
- Smaller cities will naturally have fewer coworking spaces and smaller communities.
- visa_options should list visa types commonly used by nomads in Thailand (these are national, not city-specific).
- monthly_cost_usd is for a comfortable nomad lifestyle (private room, eating out, coworking membership).
- Only include coworking_notable names you are confident actually exist in ${cityName}.
- If a city has very few coworking spaces, the array can be empty.`;
}

function validate(data) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data)) {
      return `Missing required field: ${field}`;
    }
  }

  if (typeof data.wifi_avg_mbps !== 'number' || data.wifi_avg_mbps < 0 || data.wifi_avg_mbps > 500) {
    return `Invalid wifi_avg_mbps: ${data.wifi_avg_mbps}`;
  }
  if (typeof data.coworking_spaces !== 'number' || data.coworking_spaces < 0) {
    return `Invalid coworking_spaces: ${data.coworking_spaces}`;
  }
  if (!Array.isArray(data.coworking_notable)) {
    return 'coworking_notable must be an array';
  }
  if (typeof data.cafe_work_friendly !== 'number' || data.cafe_work_friendly < 0) {
    return `Invalid cafe_work_friendly: ${data.cafe_work_friendly}`;
  }
  if (!VALID_COMMUNITY_SIZES.includes(data.nomad_community_size)) {
    return `Invalid nomad_community_size: ${data.nomad_community_size}. Must be one of: ${VALID_COMMUNITY_SIZES.join(', ')}`;
  }
  if (typeof data.nomad_score !== 'number' || data.nomad_score < 0 || data.nomad_score > 1) {
    return `Invalid nomad_score: ${data.nomad_score}. Must be 0-1`;
  }
  if (!Array.isArray(data.visa_options)) {
    return 'visa_options must be an array';
  }
  if (typeof data.monthly_cost_usd !== 'number' || data.monthly_cost_usd < 100 || data.monthly_cost_usd > 10000) {
    return `Invalid monthly_cost_usd: ${data.monthly_cost_usd}`;
  }
  if (!Array.isArray(data.best_areas)) {
    return 'best_areas must be an array';
  }
  if (typeof data.sim_esim_available !== 'boolean') {
    return `Invalid sim_esim_available: must be boolean`;
  }

  return null;
}

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const raw = result.content[0].text;

  // Strip markdown fences if present
  const cleaned = raw
    .replace(/```json?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleaned);
}

async function main() {
  // Ensure enrichments directory exists
  if (!fs.existsSync(enrichmentsDir)) {
    fs.mkdirSync(enrichmentsDir, { recursive: true });
  }

  const output = loadExistingOutput();
  const cityFiles = getCityFiles();
  const total = cityFiles.length;

  console.log(`\nNomad data enrichment — ${total} cities\n`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < cityFiles.length; i++) {
    const file = cityFiles[i];
    const slug = file.replace('.json', '');
    const num = i + 1;

    // Skip already-processed cities
    if (output[slug]) {
      console.log(`[${num}/${total}] Skipping ${slug} (already processed)`);
      skipped++;
      continue;
    }

    const filePath = path.join(enhancedDir, file);
    const cityData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const cityName =
      (cityData.name && cityData.name.en) ||
      slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const region = cityData.region || 'Central';
    const population = cityData.population || null;
    const budgetMedian = getBudgetMedian(cityData);

    console.log(`[${num}/${total}] Processing ${cityName}...`);

    try {
      const prompt = buildPrompt(cityName, region, budgetMedian, population);
      const nomadData = await callClaude(prompt);

      const validationError = validate(nomadData);
      if (validationError) {
        console.error(`  Validation failed for ${cityName}: ${validationError}`);
        errors++;
        await sleep(DELAY_MS);
        continue;
      }

      output[slug] = nomadData;
      saveOutput(output);
      processed++;
      console.log(
        `  Done: score=${nomadData.nomad_score}, cost=$${nomadData.monthly_cost_usd}/mo, community=${nomadData.nomad_community_size}`
      );
    } catch (err) {
      console.error(`  Error processing ${cityName}: ${err.message}`);
      errors++;
    }

    // Rate limiting
    if (i < cityFiles.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\nResults:`);
  console.log(`  Total cities: ${total}`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Skipped (already done): ${skipped}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Output: ${outputFile}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
