# Thailand Index Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the Thailand Index with 3 new subpages (Transport, Digital Nomad, Safety) powered by AI-generated enrichment data.

**Architecture:** Two enrichment scripts generate `data/enrichments/thailand-nomad.json` and `data/enrichments/thailand-safety.json` using Haiku 4.5. The aggregation script (`scripts/generate-index-data.js`) merges enrichment data per city. Three new pages and five new components are built following Phase 1 patterns.

**Tech Stack:** Node.js scripts, Next.js 14 Pages Router, Tailwind CSS, Claude Haiku 4.5 via `lib/pipeline/ai-provider.ts`

---

### Task 1: Nomad Enrichment Script

**Files:**
- Create: `scripts/enrich-nomad-data.js`

**Context:** This script generates `data/enrichments/thailand-nomad.json` by calling Haiku 4.5 for each of the 33 cities. It uses the existing `ai-provider.ts` for AI calls. The script is run manually (not in build pipeline), output is reviewed and committed.

**Step 1: Create the enrichment script**

Create `scripts/enrich-nomad-data.js`:

```js
#!/usr/bin/env node

/**
 * Generates digital nomad enrichment data for all 33 cities
 * using Claude Haiku 4.5 via ai-provider.ts.
 *
 * Usage: node scripts/enrich-nomad-data.js
 * Output: data/enrichments/thailand-nomad.json
 */

const fs = require('fs');
const path = require('path');

// ai-provider.ts is TypeScript — we need to load it via a dynamic import
// or use the Anthropic SDK directly. Since the existing pipeline scripts
// are plain JS, we'll use the Anthropic SDK directly (same as ai-provider internals).

const ENHANCED_DIR = path.join(__dirname, '..', 'data', 'enhanced');
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'enrichments');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'thailand-nomad.json');

const DELAY_MS = 1500; // Rate limiting between API calls

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildPrompt(cityName, region, budgetMedian, population) {
  return `You are a Thailand travel expert. Generate structured data about digital nomad life in ${cityName}, Thailand (${region} region).

City context: Population ~${population || 'unknown'}, budget traveller median ~$${budgetMedian}/day.

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "wifi_avg_mbps": <number, average WiFi speed in Mbps at cafes/coworking, 5-200 range>,
  "coworking_spaces": <number, approximate count of dedicated coworking spaces, 0-100>,
  "coworking_notable": [<up to 3 well-known coworking space names, or empty array if none>],
  "cafe_work_friendly": <number 1-10, how many work-friendly cafes with good WiFi>,
  "nomad_community_size": "<one of: large, medium, small, minimal>",
  "nomad_score": <number 0.0-1.0, composite digital nomad friendliness>,
  "visa_options": [<relevant visa types as slugs: "tourist-60d", "ed-visa", "dtv", "elite", "retirement", "business">],
  "monthly_cost_usd": <number, estimated total monthly cost for a digital nomad in USD, 400-3000>,
  "best_areas": [<up to 3 best neighborhoods/areas for nomads, or empty array>],
  "sim_esim_available": <boolean, true if eSIM readily available>
}

Be conservative with estimates. If ${cityName} is not well-known for nomads, reflect that honestly with lower scores. Base nomad_score on: wifi (20%), coworking (25%), cost (25%), community (30%).`;
}

async function callAI(prompt) {
  // Use Anthropic SDK directly (same pattern as ai-provider.ts)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function validateNomadData(obj) {
  const required = ['wifi_avg_mbps', 'coworking_spaces', 'coworking_notable',
    'cafe_work_friendly', 'nomad_community_size', 'nomad_score',
    'visa_options', 'monthly_cost_usd', 'best_areas', 'sim_esim_available'];
  for (const key of required) {
    if (!(key in obj)) throw new Error(`Missing field: ${key}`);
  }
  if (typeof obj.nomad_score !== 'number' || obj.nomad_score < 0 || obj.nomad_score > 1) {
    throw new Error(`Invalid nomad_score: ${obj.nomad_score}`);
  }
  if (!['large', 'medium', 'small', 'minimal'].includes(obj.nomad_community_size)) {
    throw new Error(`Invalid community size: ${obj.nomad_community_size}`);
  }
  return true;
}

async function main() {
  // Load city data
  const cityFiles = fs.readdirSync(ENHANCED_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${cityFiles.length} cities to process`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load existing data if resuming
  let result = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    result = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    console.log(`Resuming: ${Object.keys(result).length} cities already processed`);
  }

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of cityFiles) {
    const cityData = JSON.parse(fs.readFileSync(path.join(ENHANCED_DIR, file), 'utf-8'));
    const slug = cityData.slug || file.replace('.json', '');
    const cityName = cityData.name?.en || slug;
    const region = cityData.region?.name?.en || 'unknown';
    const budgetMedian = cityData.budget_info?.budget_per_day?.en
      ? parseInt(cityData.budget_info.budget_per_day.en.replace(/[^0-9]/g, '')) || 30
      : 30;
    const population = cityData.population || null;

    // Skip if already processed
    if (result[slug]) {
      skipped++;
      continue;
    }

    try {
      console.log(`[${processed + skipped + 1}/${cityFiles.length}] Processing ${cityName}...`);
      const prompt = buildPrompt(cityName, region, budgetMedian, population);
      const raw = await callAI(prompt);

      // Parse JSON from response (strip markdown fences if present)
      const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
      const data = JSON.parse(jsonStr);
      validateNomadData(data);

      result[slug] = data;
      processed++;

      // Write after each city (resume-safe)
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

      if (processed < cityFiles.length - skipped) {
        await sleep(DELAY_MS);
      }
    } catch (err) {
      console.error(`  ERROR for ${cityName}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  console.log(`Output: ${OUTPUT_FILE} (${Object.keys(result).length} cities)`);
}

main().catch(console.error);
```

**Step 2: Verify the script runs (dry check)**

Run: `node -c scripts/enrich-nomad-data.js`
Expected: No syntax errors

**Step 3: Commit**

```bash
git add scripts/enrich-nomad-data.js
git commit -m "feat: add nomad enrichment script (Haiku 4.5)"
```

---

### Task 2: Safety Enrichment Script

**Files:**
- Create: `scripts/enrich-safety-data.js`

**Context:** Same pattern as Task 1 but for safety data. Generates `data/enrichments/thailand-safety.json`.

**Step 1: Create the enrichment script**

Create `scripts/enrich-safety-data.js`:

```js
#!/usr/bin/env node

/**
 * Generates safety enrichment data for all 33 cities
 * using Claude Haiku 4.5.
 *
 * Usage: node scripts/enrich-safety-data.js
 * Output: data/enrichments/thailand-safety.json
 */

const fs = require('fs');
const path = require('path');

const ENHANCED_DIR = path.join(__dirname, '..', 'data', 'enhanced');
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'enrichments');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'thailand-safety.json');

const DELAY_MS = 1500;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildPrompt(cityName, region, population) {
  return `You are a Thailand travel safety expert. Generate structured safety data for ${cityName}, Thailand (${region} region, population ~${population || 'unknown'}).

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "overall_safety_score": <number 0.0-1.0, general safety for tourists>,
  "solo_traveller_safe": <number 0.0-1.0, safety for solo travellers>,
  "female_solo_safe": <number 0.0-1.0, safety for solo female travellers>,
  "night_safety": <number 0.0-1.0, safety walking at night in tourist areas>,
  "common_risks": [<3-5 most common risks as slugs: "taxi-scams", "tuk-tuk-overcharging", "pickpocketing", "bag-snatching", "drink-spiking", "gem-scams", "jet-ski-scams", "traffic-accidents", "rip-currents", "animal-bites", "food-poisoning", "atm-skimming", "fake-police">],
  "tourist_police_available": <boolean>,
  "hospital_quality": "<one of: high, medium, low>",
  "emergency_numbers": {"police": 191, "tourist_police": 1155, "ambulance": 1669}
}

Be honest and conservative. Thailand is generally safe for tourists, but some cities have specific risks. Scores should typically be 0.6-0.9 range. Emergency numbers are the same nationwide (191, 1155, 1669).`;
}

async function callAI(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function validateSafetyData(obj) {
  const required = ['overall_safety_score', 'solo_traveller_safe', 'female_solo_safe',
    'night_safety', 'common_risks', 'tourist_police_available',
    'hospital_quality', 'emergency_numbers'];
  for (const key of required) {
    if (!(key in obj)) throw new Error(`Missing field: ${key}`);
  }
  for (const scoreKey of ['overall_safety_score', 'solo_traveller_safe', 'female_solo_safe', 'night_safety']) {
    const v = obj[scoreKey];
    if (typeof v !== 'number' || v < 0 || v > 1) {
      throw new Error(`Invalid ${scoreKey}: ${v}`);
    }
  }
  if (!['high', 'medium', 'low'].includes(obj.hospital_quality)) {
    throw new Error(`Invalid hospital_quality: ${obj.hospital_quality}`);
  }
  return true;
}

async function main() {
  const cityFiles = fs.readdirSync(ENHANCED_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${cityFiles.length} cities to process`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let result = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    result = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    console.log(`Resuming: ${Object.keys(result).length} cities already processed`);
  }

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of cityFiles) {
    const cityData = JSON.parse(fs.readFileSync(path.join(ENHANCED_DIR, file), 'utf-8'));
    const slug = cityData.slug || file.replace('.json', '');
    const cityName = cityData.name?.en || slug;
    const region = cityData.region?.name?.en || 'unknown';
    const population = cityData.population || null;

    if (result[slug]) {
      skipped++;
      continue;
    }

    try {
      console.log(`[${processed + skipped + 1}/${cityFiles.length}] Processing ${cityName}...`);
      const prompt = buildPrompt(cityName, region, population);
      const raw = await callAI(prompt);

      const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
      const data = JSON.parse(jsonStr);
      validateSafetyData(data);

      result[slug] = data;
      processed++;

      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

      if (processed < cityFiles.length - skipped) {
        await sleep(DELAY_MS);
      }
    } catch (err) {
      console.error(`  ERROR for ${cityName}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  console.log(`Output: ${OUTPUT_FILE} (${Object.keys(result).length} cities)`);
}

main().catch(console.error);
```

**Step 2: Verify**

Run: `node -c scripts/enrich-safety-data.js`
Expected: No syntax errors

**Step 3: Commit**

```bash
git add scripts/enrich-safety-data.js
git commit -m "feat: add safety enrichment script (Haiku 4.5)"
```

---

### Task 3: Run Enrichment Scripts & Commit Data

**Files:**
- Create (generated): `data/enrichments/thailand-nomad.json`
- Create (generated): `data/enrichments/thailand-safety.json`

**Context:** Run both enrichment scripts. Each processes 33 cities with ~1.5s delay between calls. Total time: ~2 minutes per script. Output is resume-safe (writes after each city). Review the output for sanity before committing.

**Step 1: Run nomad enrichment**

Run: `node scripts/enrich-nomad-data.js`
Expected: `Done! Processed: 33, Skipped: 0, Errors: 0`

**Step 2: Verify nomad output**

Run: `node -e "const d=require('./data/enrichments/thailand-nomad.json'); console.log('Cities:', Object.keys(d).length); console.log('Chiang Mai:', JSON.stringify(d['chiang-mai'], null, 2)); console.log('Scores:', Object.entries(d).map(([k,v])=>k+': '+v.nomad_score).join(', '))"`

Expected: 33 cities, Chiang Mai should have high nomad_score (~0.85-0.95), all scores between 0 and 1.

**Step 3: Run safety enrichment**

Run: `node scripts/enrich-safety-data.js`
Expected: `Done! Processed: 33, Skipped: 0, Errors: 0`

**Step 4: Verify safety output**

Run: `node -e "const d=require('./data/enrichments/thailand-safety.json'); console.log('Cities:', Object.keys(d).length); console.log('Bangkok:', JSON.stringify(d['bangkok'], null, 2)); console.log('Scores:', Object.entries(d).map(([k,v])=>k+': '+v.overall_safety_score).join(', '))"`

Expected: 33 cities, Bangkok safety ~0.7-0.8, all scores between 0 and 1.

**Step 5: Commit enrichment data**

```bash
git add data/enrichments/thailand-nomad.json data/enrichments/thailand-safety.json
git commit -m "feat: add AI-generated nomad and safety enrichment data (33 cities)"
```

---

### Task 4: Update Aggregation Script to Merge Enrichments

**Files:**
- Modify: `scripts/generate-index-data.js`

**Context:** The aggregation script needs to:
1. Load enrichment files (graceful skip if missing)
2. Merge nomad/safety data per city
3. Add nomad_score and safety_score to `scores{}`
4. Update overall_score formula when enrichments exist
5. Add `best_nomad` and `safest` rankings

Key line references from the existing file:
- Constants/paths: lines 19-24
- City processing loop: lines 564-689
- Composite scores: lines 610-636
- Score breakdown: lines 639-653
- Entry object: lines 658-673
- Rankings generation: lines 463-544, called at line 691
- Output metadata: lines 704-722

**Step 1: Add enrichment file paths**

After the existing path constants (line 24, after `OUTPUT_FILE`), add:

```js
const NOMAD_ENRICHMENT_FILE = path.join(__dirname, '..', 'data', 'enrichments', 'thailand-nomad.json');
const SAFETY_ENRICHMENT_FILE = path.join(__dirname, '..', 'data', 'enrichments', 'thailand-safety.json');
```

**Step 2: Load enrichment data in main()**

In `main()`, after the existing source data loading (around line 556, after loading regions), add:

```js
  // Load enrichment data (graceful skip if files don't exist)
  let nomadEnrichment = {};
  if (fs.existsSync(NOMAD_ENRICHMENT_FILE)) {
    nomadEnrichment = JSON.parse(fs.readFileSync(NOMAD_ENRICHMENT_FILE, 'utf-8'));
    console.log(`  Loaded nomad enrichment: ${Object.keys(nomadEnrichment).length} cities`);
  } else {
    console.log('  Nomad enrichment file not found — skipping');
  }

  let safetyEnrichment = {};
  if (fs.existsSync(SAFETY_ENRICHMENT_FILE)) {
    safetyEnrichment = JSON.parse(fs.readFileSync(SAFETY_ENRICHMENT_FILE, 'utf-8'));
    console.log(`  Loaded safety enrichment: ${Object.keys(safetyEnrichment).length} cities`);
  } else {
    console.log('  Safety enrichment file not found — skipping');
  }
```

**Step 3: Merge enrichment data per city**

Inside the city processing loop, after the transport stats assignment (around line 604) and before the composite scores block (around line 610), add:

```js
    // --- Enrichment data (nomad + safety) ---
    const nomadData = nomadEnrichment[slug] || null;
    const safetyData = safetyEnrichment[slug] || null;
```

**Step 4: Update composite score calculation**

Replace the existing composite score block (lines ~610-636) with logic that includes nomad/safety when available:

```js
    // --- Composite scores ---
    const budgetScore = budgetMedian > 0
      ? Math.max(0, Math.min(1, 1 - (budgetMedian - 15) / 85))
      : 0;
    const weatherScore = weatherData ? weatherData.comfort_score : 0;
    const transportScore = transportData ? transportData.hubness : 0;
    const nomadScore = nomadData ? nomadData.nomad_score : null;
    const safetyScore = safetyData ? safetyData.overall_safety_score : null;

    // Overall score: if enrichments available, use expanded formula
    let overallScore;
    if (nomadScore !== null && safetyScore !== null) {
      // budget 25% + weather 25% + transport 20% + nomad 15% + safety 15%
      overallScore = budgetScore * 0.25 + weatherScore * 0.25 + transportScore * 0.20
        + nomadScore * 0.15 + safetyScore * 0.15;
    } else {
      // Original formula (no enrichments)
      overallScore = budgetScore * 0.35 + weatherScore * 0.35 + transportScore * 0.30;
    }
```

**Step 5: Add nomad/safety to the entry object**

In the entry object (around lines 658-673), add:

```js
    nomad: nomadData,
    safety: safetyData,
```

And update the scores block in the entry to include:

```js
    scores: {
      budget_score: +budgetScore.toFixed(3),
      weather_score: +(weatherScore || 0).toFixed(3),
      transport_score: +(transportScore || 0).toFixed(3),
      nomad_score: nomadScore !== null ? +nomadScore.toFixed(3) : null,
      safety_score: safetyScore !== null ? +safetyScore.toFixed(3) : null,
      overall_score: +overallScore.toFixed(3),
    },
```

**Step 6: Add new rankings**

In `generateRankings()` (lines 463-544), add two new rankings after the existing `overall` ranking:

```js
  // --- Best for digital nomads ---
  const nomadCities = cities.filter(c => c.scores.nomad_score !== null);
  if (nomadCities.length > 0) {
    const sortedNomad = [...nomadCities]
      .sort((a, b) => b.scores.nomad_score - a.scores.nomad_score);
    rankings.best_nomad = {
      metric: 'scores.nomad_score',
      order: 'desc',
      items: sortedNomad.map((c, i) => ({
        slug: c.slug,
        name: c.name,
        value: c.scores.nomad_score,
        rank: i + 1,
      })),
    };
  }

  // --- Safest cities ---
  const safeCities = cities.filter(c => c.scores.safety_score !== null);
  if (safeCities.length > 0) {
    const sortedSafe = [...safeCities]
      .sort((a, b) => b.scores.safety_score - a.scores.safety_score);
    rankings.safest = {
      metric: 'scores.safety_score',
      order: 'desc',
      items: sortedSafe.map((c, i) => ({
        slug: c.slug,
        name: c.name,
        value: c.scores.safety_score,
        rank: i + 1,
      })),
    };
  }
```

**Step 7: Update metadata**

In the output metadata block (around line 704-722), add enrichment info:

```js
    nomad_enrichment_count: Object.keys(nomadEnrichment).length,
    safety_enrichment_count: Object.keys(safetyEnrichment).length,
```

And add file hashes for enrichment files (using existing `fileHash()` helper):

```js
    source_hashes: {
      ...existingHashes,
      nomad_enrichment: fs.existsSync(NOMAD_ENRICHMENT_FILE) ? fileHash(NOMAD_ENRICHMENT_FILE) : null,
      safety_enrichment: fs.existsSync(SAFETY_ENRICHMENT_FILE) ? fileHash(SAFETY_ENRICHMENT_FILE) : null,
    },
```

**Step 8: Run the aggregation script and verify**

Run: `npm run data:index`
Expected: Script completes, mentions loading nomad/safety enrichment data.

Run: `node -e "const d=require('./data/thailand-index.json'); const cm=d.cities.find(c=>c.slug==='chiang-mai'); console.log('Nomad data:', !!cm.nomad); console.log('Safety data:', !!cm.safety); console.log('Scores:', cm.scores); console.log('Rankings:', Object.keys(d.rankings))"`
Expected: nomad and safety data present, scores include nomad_score and safety_score, rankings include `best_nomad` and `safest`.

**Step 9: Commit**

```bash
git add scripts/generate-index-data.js data/thailand-index.json
git commit -m "feat: merge nomad/safety enrichments into index aggregation"
```

---

### Task 5: Update TypeScript Types

**Files:**
- Modify: `lib/thailand-index.ts`

**Context:** Add `CityNomad` and `CitySafety` interfaces, extend `IndexCity` with nullable nomad/safety fields, extend `CityScores` with nullable scores, and add new ranking names. Reference the existing file structure (interfaces at lines 14-200, functions at lines 211-265).

**Step 1: Add CityNomad interface**

After the `CityTransport` interface (after line 77), add:

```typescript
// ---------------------------------------------------------------------------
// Nomad (enrichment — nullable)
// ---------------------------------------------------------------------------

export interface CityNomad {
  wifi_avg_mbps: number;
  coworking_spaces: number;
  coworking_notable: string[];
  cafe_work_friendly: number;
  nomad_community_size: 'large' | 'medium' | 'small' | 'minimal';
  nomad_score: number;
  visa_options: string[];
  monthly_cost_usd: number;
  best_areas: string[];
  sim_esim_available: boolean;
}
```

**Step 2: Add CitySafety interface**

Immediately after `CityNomad`:

```typescript
// ---------------------------------------------------------------------------
// Safety (enrichment — nullable)
// ---------------------------------------------------------------------------

export interface CitySafety {
  overall_safety_score: number;
  solo_traveller_safe: number;
  female_solo_safe: number;
  night_safety: number;
  common_risks: string[];
  tourist_police_available: boolean;
  hospital_quality: 'high' | 'medium' | 'low';
  emergency_numbers: Record<string, number>;
}
```

**Step 3: Update CityScores**

Add to the `CityScores` interface (around line 83):

```typescript
export interface CityScores {
  budget_score: number;
  weather_score: number;
  transport_score: number;
  nomad_score: number | null;
  safety_score: number | null;
  overall_score: number;
}
```

**Step 4: Update IndexCity**

Add to the `IndexCity` interface (around line 139), after `transport: CityTransport;`:

```typescript
  nomad: CityNomad | null;
  safety: CitySafety | null;
```

**Step 5: Update RankingName**

Extend the type union (around line 170):

```typescript
export type RankingName =
  | 'cheapest'
  | 'most_expensive'
  | 'best_weather_overall'
  | 'most_connected'
  | 'best_nomad'
  | 'safest'
  | 'overall';
```

**Step 6: Verify with TypeScript**

Run: `npx tsc --noEmit lib/thailand-index.ts 2>&1 | head -20`
Expected: No errors (or only unrelated warnings from other files).

**Step 7: Commit**

```bash
git add lib/thailand-index.ts
git commit -m "feat: add nomad/safety types to Thailand Index"
```

---

### Task 6: Transport Subpage + Component

**Files:**
- Create: `components/index/TransportTable.tsx`
- Create: `pages/thailand-index/transport.tsx`
- Modify: `components/index/index.ts` (add export)

**Context:** The transport subpage shows all 33 cities ranked by transport connectivity (hubness score). It reuses the Phase 1 patterns: `ScoreBadge` for scores, `RankingCard` for Top 10, `RegionFilter` for filtering, `TableOfContents` for sticky sidebar. The data is already in `thailand-index.json` under each city's `transport` field.

**Step 1: Create TransportTable component**

Create `components/index/TransportTable.tsx`. Follow the pattern of `IndexTable.tsx` (lines 1-170):
- Props: `cities: IndexCity[]`, `regions: Region[]`
- Columns: #, Destination (link to /city/[slug]/), Region, Connections, Popular Routes, Hubness Score, Top Destinations
- Default sort: `hubness` desc
- Region filter using `<RegionFilter>`
- Use `<ScoreBadge>` for hubness column
- Top destinations column: show first 3 from `city.transport.top_routes`, comma-separated city names

```tsx
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IndexCity, Region } from '../../lib/thailand-index';
import { ScoreBadge, RegionFilter } from './';

type SortKey = 'name' | 'connections' | 'popular' | 'hubness';

interface TransportTableProps {
  cities: IndexCity[];
  regions: Region[];
}

export default function TransportTable({ cities, regions }: TransportTableProps) {
  const { locale } = useRouter();
  const lang = (locale || 'en') as 'en' | 'nl';

  const [sortKey, setSortKey] = useState<SortKey>('hubness');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const columns: { key: SortKey; label: Record<string, string> }[] = [
    { key: 'name', label: { en: 'Destination', nl: 'Bestemming' } },
    { key: 'connections', label: { en: 'Connections', nl: 'Verbindingen' } },
    { key: 'popular', label: { en: 'Popular Routes', nl: 'Populaire Routes' } },
    { key: 'hubness', label: { en: 'Hub Score', nl: 'Hub Score' } },
  ];

  function getSortValue(city: IndexCity, key: SortKey): string | number {
    switch (key) {
      case 'name': return city.name[lang];
      case 'connections': return city.transport?.connections ?? 0;
      case 'popular': return city.transport?.popular_routes ?? 0;
      case 'hubness': return city.transport?.hubness ?? -1;
    }
  }

  const filtered = useMemo(() => {
    if (!activeRegion) return cities;
    const region = regions.find(r => r.slug === activeRegion);
    if (!region) return cities;
    const slugSet = new Set(region.city_slugs);
    return cities.filter(c => slugSet.has(c.slug));
  }, [cities, regions, activeRegion]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = getSortValue(a, sortKey);
      const vb = getSortValue(b, sortKey);
      if (typeof va === 'string' && typeof vb === 'string') {
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
  }, [filtered, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  }

  const arrow = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div>
      <RegionFilter regions={regions} activeRegion={activeRegion} onChange={setActiveRegion} />
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="py-2 px-2 w-10">#</th>
              {columns.map(col => (
                <th key={col.key} className="py-2 px-2 cursor-pointer hover:text-thailand-blue"
                    onClick={() => handleSort(col.key)}>
                  {col.label[lang]}{arrow(col.key)}
                </th>
              ))}
              <th className="py-2 px-2">{lang === 'en' ? 'Top Destinations' : 'Top Bestemmingen'}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((city, i) => (
              <tr key={city.slug} className="border-b border-gray-100 hover:bg-surface-cream/50">
                <td className="py-2 px-2 text-gray-400">{i + 1}</td>
                <td className="py-2 px-2 font-medium">
                  <Link href={`/city/${city.slug}/`} className="text-thailand-blue hover:underline">
                    {city.name[lang]}
                  </Link>
                </td>
                <td className="py-2 px-2">{city.transport?.connections ?? 0}</td>
                <td className="py-2 px-2">{city.transport?.popular_routes ?? 0}</td>
                <td className="py-2 px-2">
                  <ScoreBadge score={city.transport?.hubness ?? null} size="sm" />
                </td>
                <td className="py-2 px-2 text-gray-600 text-xs">
                  {(city.transport?.top_routes || []).slice(0, 3).map(r => r.to.replace(/-/g, ' ')).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Step 2: Create transport page**

Create `pages/thailand-index/transport.tsx`. Follow the page pattern from `pages/thailand-index/budget.tsx`:
- `getStaticProps` loads `../../data/thailand-index.json`
- `revalidate: 86400`
- Sections: Hero → Stats bar → TransportTable → Top 10 Most Connected → Per-region breakdown → FAQ (3 questions)
- Schema.org: FAQPage
- SEOHead with title/description
- Breadcrumbs: Home → Thailand Index → Transport
- Use `TableOfContents` sidebar

The page should have these sections:
1. Hero with H1 and stats bar (total routes from metadata, popular routes, most connected city)
2. Full TransportTable
3. Top 10 Most Connected (use `most_connected` ranking + `RankingCard`)
4. Per-region transport overview (group cities by region, show avg hubness)
5. FAQ (3 questions about getting around Thailand)

**Step 3: Add export to barrel file**

In `components/index/index.ts`, add:
```typescript
export { default as TransportTable } from './TransportTable';
```

**Step 4: Verify**

Run: `npx next build 2>&1 | grep -E "(thailand-index/transport|Error)"`
Expected: Page builds without errors.

**Step 5: Commit**

```bash
git add components/index/TransportTable.tsx components/index/index.ts pages/thailand-index/transport.tsx
git commit -m "feat: add Transport subpage at /thailand-index/transport/"
```

---

### Task 7: Digital Nomad Subpage + Components

**Files:**
- Create: `components/index/NomadTable.tsx`
- Create: `components/index/VisaTable.tsx`
- Create: `pages/thailand-index/digital-nomad.tsx`
- Modify: `components/index/index.ts` (add exports)

**Context:** The digital nomad page shows all 33 cities ranked by nomad-friendliness. Uses enrichment data from `city.nomad` (nullable). Cities without nomad data show "-" in score columns. Includes a visa quick-reference table and SIM/eSIM guide.

**Step 1: Create NomadTable component**

Create `components/index/NomadTable.tsx`:
- Props: `cities: IndexCity[]`, `regions: Region[]`
- Columns: #, Destination, WiFi (Mbps), Coworking, Monthly Cost ($), Community, Nomad Score
- Default sort: `nomad_score` desc
- Null-safe: cities without `nomad` data show "-" for enrichment columns
- Use `ScoreBadge` for nomad_score
- Use `RegionFilter` for filtering

Follow exact pattern of `TransportTable.tsx` from Task 6 but with nomad-specific columns:

```tsx
// Sort values:
// wifi: city.nomad?.wifi_avg_mbps ?? -1
// coworking: city.nomad?.coworking_spaces ?? -1
// cost: city.nomad?.monthly_cost_usd ?? 99999 (asc sort)
// community: {'large':4,'medium':3,'small':2,'minimal':1}[city.nomad?.nomad_community_size] ?? 0
// nomad_score: city.scores?.nomad_score ?? -1

// Display:
// WiFi: `${city.nomad.wifi_avg_mbps} Mbps` or "-"
// Coworking: `${city.nomad.coworking_spaces}` or "-"
// Cost: `$${city.nomad.monthly_cost_usd}` or "-"
// Community: capitalize(city.nomad.nomad_community_size) or "-"
// Score: <ScoreBadge score={city.scores?.nomad_score ?? null} />
```

**Step 2: Create VisaTable component**

Create `components/index/VisaTable.tsx`:
- Static data table (not dynamic from JSON)
- Columns: Visa Type, Duration, Cost, Best For, Requirements
- Rows: Tourist (60 days), DTV (Digital Nomad, 5 years/180 days), ED Visa, Thailand Elite, Retirement, Business

```tsx
const VISA_DATA = [
  {
    type: { en: 'Tourist Visa Exemption', nl: 'Toeristenvisum Vrijstelling' },
    duration: '60 days',
    cost: 'Free',
    bestFor: { en: 'Short trips', nl: 'Korte reizen' },
    requirements: { en: 'Return ticket, proof of funds', nl: 'Retourticket, bewijs van financiën' },
  },
  {
    type: { en: 'Destination Thailand Visa (DTV)', nl: 'Destination Thailand Visa (DTV)' },
    duration: '5 years (180 days/entry)',
    cost: '฿10,000 (~$280)',
    bestFor: { en: 'Digital nomads, remote workers', nl: 'Digitale nomaden, remote werkers' },
    requirements: { en: 'Proof of remote work, $500k THB in savings', nl: 'Bewijs van remote werk, $500k THB spaargeld' },
  },
  {
    type: { en: 'ED Visa (Education)', nl: 'ED Visum (Onderwijs)' },
    duration: '1 year',
    cost: '฿5,000-20,000',
    bestFor: { en: 'Thai language/Muay Thai students', nl: 'Thai taal/Muay Thai studenten' },
    requirements: { en: 'Enrollment in approved school', nl: 'Inschrijving bij erkende school' },
  },
  {
    type: { en: 'Thailand Elite', nl: 'Thailand Elite' },
    duration: '5-20 years',
    cost: '฿600k-2M ($17k-$57k)',
    bestFor: { en: 'Long-term residents, luxury', nl: 'Langverblijvers, luxe' },
    requirements: { en: 'Payment, background check', nl: 'Betaling, antecedentenonderzoek' },
  },
  {
    type: { en: 'Retirement (O-A)', nl: 'Pensioen (O-A)' },
    duration: '1 year (renewable)',
    cost: '฿2,000',
    bestFor: { en: 'Retirees 50+', nl: 'Gepensioneerden 50+' },
    requirements: { en: '800k THB in bank or 65k THB/month income', nl: '800k THB op bank of 65k THB/maand inkomen' },
  },
];
```

**Step 3: Create digital-nomad page**

Create `pages/thailand-index/digital-nomad.tsx`:
- Sections: Hero → NomadTable → Top 10 Nomad Cities → Per-region overview → Visa Guide (VisaTable) → SIM/eSIM Guide → Link to /expat/ → FAQ (3-4 questions)
- Schema.org: FAQPage
- Breadcrumbs: Home → Thailand Index → Digital Nomad
- `TableOfContents` sidebar

**Step 4: Add exports**

In `components/index/index.ts`:
```typescript
export { default as NomadTable } from './NomadTable';
export { default as VisaTable } from './VisaTable';
```

**Step 5: Verify**

Run: `npx next build 2>&1 | grep -E "(thailand-index/digital-nomad|Error)"`

**Step 6: Commit**

```bash
git add components/index/NomadTable.tsx components/index/VisaTable.tsx components/index/index.ts pages/thailand-index/digital-nomad.tsx
git commit -m "feat: add Digital Nomad subpage at /thailand-index/digital-nomad/"
```

---

### Task 8: Safety Subpage + Components

**Files:**
- Create: `components/index/SafetyTable.tsx`
- Create: `components/index/RiskCard.tsx`
- Create: `pages/thailand-index/safety.tsx`
- Modify: `components/index/index.ts` (add exports)

**Context:** The safety page shows all 33 cities ranked by safety scores. Uses enrichment data from `city.safety` (nullable). Includes common risks section and emergency info.

**Step 1: Create SafetyTable component**

Create `components/index/SafetyTable.tsx`:
- Props: `cities: IndexCity[]`, `regions: Region[]`
- Columns: #, Destination, Overall Safety, Solo Safe, Female Solo, Night Safety, Hospital
- Default sort: `overall_safety` desc
- Use `ScoreBadge` for all score columns
- Hospital quality as colored badge: high=green, medium=amber, low=red
- Null-safe for cities without safety data

**Step 2: Create RiskCard component**

Create `components/index/RiskCard.tsx`:
- Props: `category: string`, `risks: { slug: string, label: BilingualText, description: BilingualText }[]`
- Categories: "Scams", "Theft & Crime", "Traffic & Transport", "Nature & Health"
- Card with category header, list of risks with descriptions
- Static data (hardcoded risk descriptions — not from enrichment)

Risk categories and their slugs:
```typescript
const RISK_CATEGORIES = {
  scams: {
    label: { en: 'Scams', nl: 'Oplichting' },
    risks: ['taxi-scams', 'tuk-tuk-overcharging', 'gem-scams', 'jet-ski-scams', 'fake-police', 'atm-skimming'],
  },
  theft: {
    label: { en: 'Theft & Crime', nl: 'Diefstal & Criminaliteit' },
    risks: ['pickpocketing', 'bag-snatching', 'drink-spiking'],
  },
  traffic: {
    label: { en: 'Traffic & Transport', nl: 'Verkeer & Vervoer' },
    risks: ['traffic-accidents'],
  },
  nature: {
    label: { en: 'Nature & Health', nl: 'Natuur & Gezondheid' },
    risks: ['rip-currents', 'animal-bites', 'food-poisoning'],
  },
};
```

Each risk slug maps to a hardcoded label + description (bilingual). The component shows which risks are most common across all cities by counting occurrences in the safety enrichment data.

**Step 3: Create safety page**

Create `pages/thailand-index/safety.tsx`:
- Sections: Hero → SafetyTable → Top 10 Safest → Common Risks (RiskCard grid) → Emergency Info → Per-region overview → FAQ (3-4 questions)
- Schema.org: FAQPage
- Breadcrumbs: Home → Thailand Index → Safety
- `TableOfContents` sidebar

Emergency section (universal — same for all Thailand):
```
Police: 191
Tourist Police: 1155
Ambulance: 1669
Fire: 199
```

**Step 4: Add exports**

In `components/index/index.ts`:
```typescript
export { default as SafetyTable } from './SafetyTable';
export { default as RiskCard } from './RiskCard';
```

**Step 5: Verify**

Run: `npx next build 2>&1 | grep -E "(thailand-index/safety|Error)"`

**Step 6: Commit**

```bash
git add components/index/SafetyTable.tsx components/index/RiskCard.tsx components/index/index.ts pages/thailand-index/safety.tsx
git commit -m "feat: add Safety subpage at /thailand-index/safety/"
```

---

### Task 9: Update Hub Page

**Files:**
- Modify: `pages/thailand-index/index.tsx`
- Modify: `components/index/IndexTable.tsx`

**Context:** The hub page needs:
1. Two new columns in the IndexTable (Nomad Score, Safety Score) — null-safe
2. A "Nomad Preview" section with Top 5 nomad cities
3. A "Safety Preview" section with Top 5 safest cities
4. Transport section link to /thailand-index/transport/
5. Three new links in the "Explore the Index" grid
6. Updated TOC items
7. Updated methodology text mentioning enrichment data

**Step 1: Add columns to IndexTable**

In `components/index/IndexTable.tsx`:
- Extend `SortKey` type: add `'nomad' | 'safety'`
- Add two columns to the `columns` array:
  ```
  { key: 'nomad', label: { en: 'Nomad', nl: 'Nomad' } }
  { key: 'safety', label: { en: 'Safety', nl: 'Veiligheid' } }
  ```
- Add sort values in `getSortValue()`:
  ```
  case 'nomad': return city.scores?.nomad_score ?? -1;
  case 'safety': return city.scores?.safety_score ?? -1;
  ```
- Add cells in the table body using `<ScoreBadge>` (handles null gracefully)

**Step 2: Add TOC items**

In `pages/thailand-index/index.tsx`, in the `tocItems` array (around lines 24-46), add after "best-time-preview":
```typescript
{ id: 'nomad-preview', label: { en: 'Digital Nomads', nl: 'Digitale Nomaden' } },
{ id: 'safety-preview', label: { en: 'Safety', nl: 'Veiligheid' } },
```

**Step 3: Add Nomad Preview section**

After the "Best Time Preview" section (around line 525), add a new section:
- `id="nomad-preview"`
- H2: "Top Digital Nomad Cities"
- Top 5 from `best_nomad` ranking using `RankingCard` (metric: nomad score)
- Link: "Full digital nomad guide →" pointing to `/thailand-index/digital-nomad/`
- Only render if `best_nomad` ranking exists

**Step 4: Add Safety Preview section**

After the Nomad Preview, add:
- `id="safety-preview"`
- H2: "Safest Destinations"
- Top 5 from `safest` ranking using `RankingCard` (metric: safety score)
- Link: "Complete safety guide →" pointing to `/thailand-index/safety/`
- Only render if `safest` ranking exists

**Step 5: Update Explore grid**

In the "Explore the Index" grid (around lines 527-593), add three more cards:
```tsx
{ href: '/thailand-index/transport/', label: { en: 'Transport Hub', nl: 'Transport Hub' }, desc: { en: 'Connections & routes for 33 cities', nl: 'Verbindingen & routes voor 33 steden' } },
{ href: '/thailand-index/digital-nomad/', label: { en: 'Digital Nomad Guide', nl: 'Digitale Nomaden Gids' }, desc: { en: 'WiFi, coworking & cost rankings', nl: 'WiFi, coworking & kosten rankings' } },
{ href: '/thailand-index/safety/', label: { en: 'Safety Guide', nl: 'Veiligheidsgids' }, desc: { en: 'Safety scores for 33 cities', nl: 'Veiligheidsscores voor 33 steden' } },
```

**Step 6: Update methodology**

In the methodology section (around lines 357-429), add a paragraph about enrichment data:
- Mention that nomad and safety scores are AI-generated using structured prompts
- Explain scores are conservative estimates based on publicly available information
- Note the data is periodically reviewed and updated

**Step 7: Verify**

Run: `npx next build 2>&1 | grep -E "(thailand-index|Error)"`

**Step 8: Commit**

```bash
git add components/index/IndexTable.tsx pages/thailand-index/index.tsx
git commit -m "feat: update hub page with nomad/safety previews and table columns"
```

---

### Task 10: Sitemap Update

**Files:**
- Modify: `lib/sitemap.js`

**Context:** Add the 3 new Thailand Index pages to the sitemap. The existing entries are at lines 108-110 inside a `staticPages` array.

**Step 1: Add new pages**

After the existing entries (line 110, after `'/thailand-index/best-time/'`), add:

```js
'/thailand-index/transport/',      // Thailand Transport Hub
'/thailand-index/digital-nomad/',  // Thailand Digital Nomad Guide
'/thailand-index/safety/',         // Thailand Safety Guide
```

**Step 2: Verify**

Run: `npm run data:sitemap && grep "thailand-index" public/sitemap.xml`
Expected: 6 entries (3 existing + 3 new).

**Step 3: Commit**

```bash
git add lib/sitemap.js
git commit -m "feat: add Phase 2 Thailand Index pages to sitemap"
```

---

### Task 11: Full Build Verification & Visual Review

**Files:** None (verification only)

**Step 1: Full build**

Run: `npm run build`
Expected: Build completes successfully. All 6 thailand-index pages generated.

**Step 2: Start production server**

Run: `npx next start -p 3099 &`

**Step 3: Visual review**

Open each page in browser and take screenshots:
- `http://localhost:3099/thailand-index/` — verify new columns (Nomad, Safety) in table, Nomad Preview section, Safety Preview section, 6 explore cards
- `http://localhost:3099/thailand-index/transport` — verify TransportTable, Top 10 Most Connected, per-region breakdown
- `http://localhost:3099/thailand-index/digital-nomad` — verify NomadTable, Top 10, visa table, SIM guide
- `http://localhost:3099/thailand-index/safety` — verify SafetyTable, Top 10, risk cards, emergency info

Check for:
- No console errors
- All scores render correctly (no NaN, no crashes)
- Null-safe: cities without enrichment data show "-"
- Tables are sortable
- Region filter works
- Links between pages work
- Mobile responsive (resize to 375px width)

**Step 4: Stop server**

Kill the production server process.
