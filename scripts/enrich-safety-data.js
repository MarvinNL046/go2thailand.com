#!/usr/bin/env node
/**
 * Enrich city data with safety information via Claude Haiku 4.5.
 *
 * Output: data/enrichments/thailand-safety.json
 * Resume-safe: writes after each city, skips already-processed cities.
 * Rate limiting: 1.5s between API calls.
 *
 * Usage: ANTHROPIC_API_KEY=sk-... node scripts/enrich-safety-data.js
 */

const fs = require('fs');
const path = require('path');

const enhancedDir = path.join(__dirname, '..', 'data', 'enhanced');
const enrichmentsDir = path.join(__dirname, '..', 'data', 'enrichments');
const outputFile = path.join(enrichmentsDir, 'thailand-safety.json');

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 1024;
const TEMPERATURE = 0.3;
const DELAY_MS = 1500;

const REQUIRED_FIELDS = [
  'overall_safety_score',
  'solo_traveller_safe',
  'female_solo_safe',
  'night_safety',
  'common_risks',
  'tourist_police_available',
  'hospital_quality',
  'emergency_numbers',
];

const VALID_HOSPITAL_QUALITY = ['high', 'medium', 'low'];

const VALID_RISK_SLUGS = [
  'taxi-scams',
  'tuk-tuk-overcharging',
  'pickpocketing',
  'bag-snatching',
  'jet-ski-scams',
  'gem-scams',
  'drink-spiking',
  'motorbike-accidents',
  'road-safety',
  'rip-currents',
  'jellyfish',
  'animal-bites',
  'food-hygiene',
  'water-safety',
  'petty-theft',
  'accommodation-theft',
  'atm-skimming',
  'fake-goods',
  'temple-dress-code',
  'boat-safety',
  'flooding',
  'noise-pollution',
  'air-pollution',
  'wildlife-encounters',
];

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

function buildPrompt(cityName, region, population) {
  const riskSlugList = VALID_RISK_SLUGS.map((s) => `"${s}"`).join(', ');

  return `You are a Thailand travel safety expert. Generate safety data for ${cityName}, Thailand.

Context:
- City: ${cityName}
- Region: ${region}
- Population: ${population ? population.toLocaleString() : 'unknown'}

Return ONLY valid JSON (no markdown fences, no explanation). Use these exact fields and types:

{
  "overall_safety_score": <number 0-1, two decimals>,
  "solo_traveller_safe": <number 0-1, two decimals>,
  "female_solo_safe": <number 0-1, two decimals>,
  "night_safety": <number 0-1, two decimals>,
  "common_risks": <array of strings, 2-5 risk slugs from the valid list below>,
  "tourist_police_available": <boolean>,
  "hospital_quality": <string, one of: "high", "medium", "low">,
  "emergency_numbers": {"police": 191, "tourist_police": 1155, "ambulance": 1669}
}

Valid risk slugs (choose ONLY from this list):
[${riskSlugList}]

Rules:
- Be conservative and realistic (E-E-A-T compliance).
- Scores should typically range between 0.60 and 0.90. Thailand is generally safe for tourists.
- night_safety is usually lower than overall_safety_score.
- female_solo_safe is typically slightly lower than solo_traveller_safe.
- common_risks: pick 2-5 risks most relevant to ${cityName}. Beach cities have different risks than inland cities.
- tourist_police_available: true for major tourist cities, false for smaller/remote cities.
- hospital_quality: "high" for major cities with international hospitals, "medium" for provincial capitals, "low" for remote areas.
- emergency_numbers are the same nationwide in Thailand: police 191, tourist police 1155, ambulance 1669. Always use these exact values.
- Do not inflate safety scores — realistic assessments help travelers make informed decisions.`;
}

function validate(data) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data)) {
      return `Missing required field: ${field}`;
    }
  }

  const scoreFields = [
    'overall_safety_score',
    'solo_traveller_safe',
    'female_solo_safe',
    'night_safety',
  ];
  for (const field of scoreFields) {
    if (typeof data[field] !== 'number' || data[field] < 0 || data[field] > 1) {
      return `Invalid ${field}: ${data[field]}. Must be a number between 0 and 1`;
    }
  }

  if (!Array.isArray(data.common_risks) || data.common_risks.length === 0) {
    return 'common_risks must be a non-empty array';
  }
  for (const risk of data.common_risks) {
    if (!VALID_RISK_SLUGS.includes(risk)) {
      return `Invalid risk slug: "${risk}". Must be one of the valid risk slugs`;
    }
  }

  if (typeof data.tourist_police_available !== 'boolean') {
    return `Invalid tourist_police_available: must be boolean`;
  }

  if (!VALID_HOSPITAL_QUALITY.includes(data.hospital_quality)) {
    return `Invalid hospital_quality: "${data.hospital_quality}". Must be one of: ${VALID_HOSPITAL_QUALITY.join(', ')}`;
  }

  if (
    typeof data.emergency_numbers !== 'object' ||
    data.emergency_numbers === null
  ) {
    return 'emergency_numbers must be an object';
  }
  if (
    data.emergency_numbers.police !== 191 ||
    data.emergency_numbers.tourist_police !== 1155 ||
    data.emergency_numbers.ambulance !== 1669
  ) {
    return 'emergency_numbers must be {police: 191, tourist_police: 1155, ambulance: 1669}';
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

  console.log(`\nSafety data enrichment — ${total} cities\n`);

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

    console.log(`[${num}/${total}] Processing ${cityName}...`);

    try {
      const prompt = buildPrompt(cityName, region, population);
      const safetyData = await callClaude(prompt);

      const validationError = validate(safetyData);
      if (validationError) {
        console.error(`  Validation failed for ${cityName}: ${validationError}`);
        errors++;
        await sleep(DELAY_MS);
        continue;
      }

      output[slug] = safetyData;
      saveOutput(output);
      processed++;
      console.log(
        `  Done: overall=${safetyData.overall_safety_score}, hospital=${safetyData.hospital_quality}, risks=${safetyData.common_risks.length}`
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
