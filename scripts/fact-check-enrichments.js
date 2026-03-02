#!/usr/bin/env node
/**
 * Fact-check enrichment data by scraping real sources.
 *
 * Sources:
 *   - Nomad List (via Jina Reader) → wifi, coworking count, cost, community
 *   - Numbeo (via Jina Reader) → monthly cost cross-reference
 *   - Google Maps (via Jina Search) → coworking name verification
 *   - Travel advisories (via Jina Search) → safety cross-reference
 *
 * Output:
 *   - Corrected data/enrichments/thailand-nomad.json
 *   - Corrected data/enrichments/thailand-safety.json
 *   - New data/enrichments/fact-check-report.json (audit trail)
 *
 * Resume-safe: tracks processed cities in report, skips already-checked.
 * Rate limiting: 2s between Jina calls.
 *
 * Usage: node scripts/fact-check-enrichments.js [--city bangkok] [--skip-coworking]
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(__dirname, '..', 'data');
const ENRICHMENTS_DIR = path.join(DATA_DIR, 'enrichments');
const NOMAD_FILE = path.join(ENRICHMENTS_DIR, 'thailand-nomad.json');
const SAFETY_FILE = path.join(ENRICHMENTS_DIR, 'thailand-safety.json');
const REPORT_FILE = path.join(ENRICHMENTS_DIR, 'fact-check-report.json');
const ENHANCED_DIR = path.join(DATA_DIR, 'enhanced');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const JINA_READER_URL = 'https://r.jina.ai';
const JINA_SEARCH_URL = 'https://s.jina.ai';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const AI_MODEL = 'claude-haiku-4-5-20251001';
const AI_MAX_TOKENS = 1024;
const AI_TEMPERATURE = 0.2;
const DELAY_MS = 2000; // 2s between Jina calls
const FETCH_TIMEOUT_MS = 30000; // 30s per fetch

// ---------------------------------------------------------------------------
// Slug mappings — cities with different names on external sites
// ---------------------------------------------------------------------------
const NOMADLIST_SLUGS = {
  'bangkok': 'bangkok',
  'chiang-mai': 'chiang-mai',
  'chiang-rai': 'chiang-rai',
  'phuket': 'phuket',
  'pattaya': 'pattaya',
  'koh-samui': 'koh-samui',
  'krabi': 'krabi',
  'pai': 'pai',
  'hua-hin': 'hua-hin',
  'hat-yai': 'hat-yai',
  'kanchanaburi': 'kanchanaburi',
  'khon-kaen': 'khon-kaen',
  'udon-thani': 'udon-thani',
  'surat-thani': 'surat-thani',
  'nakhon-ratchasima': 'nakhon-ratchasima',
  // Cities unlikely to be on Nomad List — mapped to null to skip
  'bueng-kan': null,
  'chiang-khan': null,
  'mukdahan': null,
  'nakhon-phanom': null,
  'lopburi': null,
  'lampang': null,
  'phitsanulok': null,
  'sukhothai': null,
  'chumphon': null,
  'nakhon-si-thammarat': null,
  'trang': null,
  'trat': null,
  'mae-hong-son': null,
  'nong-khai': null,
  'rayong': null,
  'chanthaburi': null,
  'ubon-ratchathani': null,
  'ayutthaya': null,
};

const NUMBEO_NAMES = {
  'bangkok': 'Bangkok',
  'chiang-mai': 'Chiang-Mai',
  'chiang-rai': 'Chiang-Rai',
  'phuket': 'Phuket',
  'pattaya': 'Pattaya',
  'koh-samui': 'Ko-Samui',
  'krabi': 'Krabi',
  'hua-hin': 'Hua-Hin',
  'hat-yai': 'Hat-Yai',
  'kanchanaburi': 'Kanchanaburi',
  'khon-kaen': 'Khon-Kaen',
  'udon-thani': 'Udon-Thani',
  'nakhon-ratchasima': 'Nakhon-Ratchasima',
  'surat-thani': 'Surat-Thani',
  // Cities unlikely on Numbeo
  'pai': null,
  'bueng-kan': null,
  'chiang-khan': null,
  'mukdahan': null,
  'nakhon-phanom': null,
  'lopburi': null,
  'lampang': null,
  'phitsanulok': null,
  'sukhothai': null,
  'chumphon': null,
  'nakhon-si-thammarat': null,
  'trang': null,
  'trat': null,
  'mae-hong-son': null,
  'nong-khai': null,
  'rayong': null,
  'chanthaburi': null,
  'ubon-ratchathani': null,
  'ayutthaya': null,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

function loadJson(filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getCitySlugs() {
  return fs
    .readdirSync(ENHANCED_DIR)
    .filter((f) => {
      if (!f.endsWith('.json')) return false;
      // Skip non-city files
      const name = f.replace('.json', '');
      return !['attractions', 'food', 'drinks'].includes(name);
    })
    .map((f) => f.replace('.json', ''))
    .sort();
}

function cityDisplayName(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Parse CLI args
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { city: null, skipCoworking: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) {
      result.city = args[i + 1];
      i++;
    }
    if (args[i] === '--skip-coworking') {
      result.skipCoworking = true;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Jina Reader — fetch a URL as clean markdown
// ---------------------------------------------------------------------------
async function jinaRead(url) {
  const apiKey = process.env.JINA_API_KEY;
  const headers = {
    Accept: 'text/markdown',
    'X-Return-Format': 'markdown',
  };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetchWithTimeout(`${JINA_READER_URL}/${url}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 404) return null;
    throw new Error(`Jina Reader ${status}: ${response.statusText}`);
  }

  const content = await response.text();
  if (!content || content.length < 100) return null;
  return content;
}

// ---------------------------------------------------------------------------
// Jina Search — web search returning markdown results
// ---------------------------------------------------------------------------
async function jinaSearch(query) {
  const apiKey = process.env.JINA_API_KEY || process.env.JINA_SEARCH_API_KEY;
  if (!apiKey) throw new Error('JINA_API_KEY or JINA_SEARCH_API_KEY required');

  const response = await fetchWithTimeout(
    `${JINA_SEARCH_URL}/?q=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );

  if (!response.ok) {
    throw new Error(`Jina Search ${response.status}: ${response.statusText}`);
  }

  return response.text();
}

// ---------------------------------------------------------------------------
// AI extraction — parse scraped markdown into structured data
// ---------------------------------------------------------------------------
async function aiExtract(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY required');

  const response = await fetchWithTimeout(
    ANTHROPIC_API_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        max_tokens: AI_MAX_TOKENS,
        temperature: AI_TEMPERATURE,
        messages: [{ role: 'user', content: prompt }],
      }),
    },
    60000 // 60s for AI calls
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const raw = result.content[0].text;

  // Strip markdown fences
  const cleaned = raw
    .replace(/```json?\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleaned);
}

// ---------------------------------------------------------------------------
// Source 1: Nomad List scraper
// ---------------------------------------------------------------------------
async function scrapeNomadList(slug, cityName) {
  const nlSlug = NOMADLIST_SLUGS[slug];
  if (nlSlug === null || nlSlug === undefined) {
    console.log(`    Nomad List: skipping (city not expected on NL)`);
    return null;
  }

  const url = `https://nomadlist.com/${nlSlug}`;
  console.log(`    Nomad List: fetching ${url}`);

  let markdown;
  try {
    markdown = await jinaRead(url);
  } catch (err) {
    console.log(`    Nomad List: fetch failed — ${err.message}`);
    return null;
  }

  if (!markdown) {
    console.log(`    Nomad List: no content returned`);
    return null;
  }

  await sleep(DELAY_MS);

  // AI extraction from the markdown — send enough content (data starts ~line 120+)
  const prompt = `Extract digital nomad data from this Nomad List page for ${cityName}, Thailand.

The page content (markdown):
---
${markdown.slice(0, 12000)}
---

The page typically contains lines like:
- "📡 Internet😡 Slow: 24 Mbps (avg)" or "📡 Internet speed (avg)24 Mbps"
- "💵 Cost😙 Affordable: $1,618 / mo" or "💵 Cost of living for nomad$1,618 / month"
- "🎒 Nomad Score™5/5 (Rank #1)"
- "💻 Best coworking space[The Hive]"
- "🏠 1br studio rent in center$685 / month"

Return ONLY valid JSON (no markdown fences, no explanation):
{
  "wifi_avg_mbps": <number or null — extract from "Internet speed" or "Mbps" line>,
  "monthly_cost_usd": <number or null — use "Cost of living for nomad" figure>,
  "rent_1br_center_usd": <number or null — from "1br studio rent in center">,
  "coworking_monthly_usd": <number or null — from "Coworking hot desk">,
  "best_coworking": <array of strings — from "Best coworking space" and "Best alt. coworking space" lines>,
  "nomad_score_raw": <number 1-5 or null — from "Nomad Score" line>,
  "nomad_rank": <number or null — from "Rank #X" in Nomad Score line>,
  "found": <boolean — true if this is a real city page with data>
}

Rules:
- Extract EXACT numbers from the page. Do not estimate or infer.
- Dollar amounts may appear as "$1,618 / mo" — extract as 1618.
- If the page is a 404, redirect, or list page, set found=false.`;

  try {
    const data = await aiExtract(prompt);
    if (!data.found) {
      console.log(`    Nomad List: page not a valid city page`);
      return null;
    }
    // Derive community size from nomad score/rank
    if (data.nomad_score_raw != null) {
      if (data.nomad_score_raw >= 4) data.nomad_community_size = 'large';
      else if (data.nomad_score_raw >= 3) data.nomad_community_size = 'medium';
      else if (data.nomad_score_raw >= 2) data.nomad_community_size = 'small';
      else data.nomad_community_size = 'minimal';
    }
    console.log(
      `    Nomad List: wifi=${data.wifi_avg_mbps}Mbps, cost=$${data.monthly_cost_usd}/mo, score=${data.nomad_score_raw}/5, rank=#${data.nomad_rank}, coworking=${(data.best_coworking || []).join(', ')}`
    );
    return data;
  } catch (err) {
    console.log(`    Nomad List: AI extraction failed — ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Source 2: Numbeo scraper
// ---------------------------------------------------------------------------
async function scrapeNumbeo(slug, cityName) {
  const numbeoName = NUMBEO_NAMES[slug];
  if (numbeoName === null || numbeoName === undefined) {
    console.log(`    Numbeo: skipping (city not expected on Numbeo)`);
    return null;
  }

  const url = `https://www.numbeo.com/cost-of-living/in/${numbeoName}`;
  console.log(`    Numbeo: fetching ${url}`);

  let markdown;
  try {
    markdown = await jinaRead(url);
  } catch (err) {
    console.log(`    Numbeo: fetch failed — ${err.message}`);
    return null;
  }

  if (!markdown) {
    console.log(`    Numbeo: no content returned`);
    return null;
  }

  await sleep(DELAY_MS);

  const prompt = `Extract cost of living data from this Numbeo page for ${cityName}, Thailand.

The page content (markdown):
---
${markdown.slice(0, 8000)}
---

The page typically has:
- "estimated monthly costs for a single person are 696.0$ (21,884.3฿), excluding rent"
- "1 Bedroom Apartment in City Centre | 21,785.44฿"
- "1 Bedroom Apartment Outside of City Centre | 10,672.37฿"

Return ONLY valid JSON (no markdown fences, no explanation):
{
  "monthly_cost_single_usd": <number or null — from "single person" summary line, in USD>,
  "rent_1br_center_usd": <number or null — convert THB to USD using rate 1 USD = 35 THB>,
  "rent_1br_outside_usd": <number or null — convert THB to USD>,
  "meal_inexpensive_usd": <number or null>,
  "found": <boolean — true if real cost data found>
}

Rules:
- The page shows amounts in both USD and THB. Prefer USD amounts where available.
- For rent, convert THB to USD by dividing by 35 and rounding.
- Only extract data actually present. Use null for missing.`;

  try {
    const data = await aiExtract(prompt);
    if (!data.found) {
      console.log(`    Numbeo: page not valid`);
      return null;
    }
    // Calculate estimated nomad monthly cost: rent (center) + living costs
    let estimatedTotal = null;
    if (data.monthly_cost_single_usd && data.rent_1br_center_usd) {
      estimatedTotal = Math.round(
        data.monthly_cost_single_usd + data.rent_1br_center_usd
      );
    } else if (data.monthly_cost_single_usd && data.rent_1br_outside_usd) {
      estimatedTotal = Math.round(
        data.monthly_cost_single_usd + data.rent_1br_outside_usd
      );
    }
    data.estimated_monthly_total_usd = estimatedTotal;
    console.log(
      `    Numbeo: living=$${data.monthly_cost_single_usd}, rent=$${data.rent_1br_center_usd}, total=$${estimatedTotal}`
    );
    return data;
  } catch (err) {
    console.log(`    Numbeo: AI extraction failed — ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Source 3: Coworking name verification via Jina Search
// ---------------------------------------------------------------------------
async function verifyCoworkingNames(slug, cityName, names) {
  if (!names || names.length === 0) return { verified: [], removed: [] };

  const verified = [];
  const removed = [];

  for (const name of names) {
    console.log(`    Coworking verify: "${name}"`);

    try {
      const searchResult = await jinaSearch(
        `"${name}" coworking ${cityName} Thailand`
      );
      await sleep(DELAY_MS);

      // Check if the search results contain meaningful references to this place
      const nameLower = name.toLowerCase();
      const resultLower = searchResult.toLowerCase();

      // Check for the coworking name appearing in results
      // Be lenient — partial matches count (e.g., "Hubba" in "Hubba-To")
      const nameWords = nameLower.split(/\s+/).filter((w) => w.length > 3);
      const mainWord = nameWords[0] || nameLower;

      const hasMatch =
        resultLower.includes(nameLower) ||
        (mainWord.length > 4 && resultLower.includes(mainWord));

      // Also check if it looks like a real Google Maps / business listing
      const hasBusinessSignals =
        resultLower.includes('google.com/maps') ||
        resultLower.includes('reviews') ||
        resultLower.includes('rating') ||
        resultLower.includes('opening hours') ||
        resultLower.includes('open') ||
        resultLower.includes('coworking space');

      if (hasMatch && hasBusinessSignals) {
        console.log(`      ✓ Verified`);
        verified.push(name);
      } else if (hasMatch) {
        // Found name but no business signals — keep with lower confidence
        console.log(`      ~ Weak match (keeping)`);
        verified.push(name);
      } else {
        console.log(`      ✗ Not found in search results`);
        removed.push(name);
      }
    } catch (err) {
      console.log(`      ? Search failed — keeping (${err.message})`);
      verified.push(name); // Keep on error — don't remove without evidence
    }
  }

  return { verified, removed };
}

// ---------------------------------------------------------------------------
// Source 4: Safety data cross-reference via travel advisories
// ---------------------------------------------------------------------------
async function scrapeSafetyData(slug, cityName) {
  console.log(`    Safety: searching travel advisories for ${cityName}`);

  let searchResult;
  try {
    searchResult = await jinaSearch(
      `${cityName} Thailand safety travel advisory 2025 2026`
    );
  } catch (err) {
    console.log(`    Safety: search failed — ${err.message}`);
    return null;
  }

  if (!searchResult || searchResult.length < 100) {
    console.log(`    Safety: no results`);
    return null;
  }

  await sleep(DELAY_MS);

  const prompt = `Extract safety information for ${cityName}, Thailand from these search results.

Search results:
---
${searchResult.slice(0, 5000)}
---

Return ONLY valid JSON (no markdown fences, no explanation):
{
  "safety_level": <string "high"|"medium"|"low" or null — overall safety assessment>,
  "specific_warnings": <array of strings — specific warnings mentioned for this city, max 5>,
  "hospital_quality_indicator": <string "high"|"medium"|"low" or null — based on mentions of international hospitals, medical tourism, etc.>,
  "has_tourist_police": <boolean or null>,
  "scam_warnings": <array of strings — specific scam types mentioned, max 5>,
  "found_specific_data": <boolean — true if search results contain info specific to ${cityName}, false if only generic Thailand info>
}

Rules:
- Only extract info specific to ${cityName}, not generic Thailand safety advice.
- Be conservative — if unsure, use null.
- specific_warnings should be brief, factual items.`;

  try {
    const data = await aiExtract(prompt);
    if (!data.found_specific_data) {
      console.log(`    Safety: only generic Thailand info found`);
      return null;
    }
    console.log(
      `    Safety: level=${data.safety_level}, warnings=${(data.specific_warnings || []).length}, hospital=${data.hospital_quality_indicator}`
    );
    return data;
  } catch (err) {
    console.log(`    Safety: AI extraction failed — ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Correction engine
// ---------------------------------------------------------------------------
function applyNomadCorrections(slug, currentNomad, nomadListData, numbeoData, coworkingResult) {
  const corrections = [];
  const corrected = { ...currentNomad };

  // --- WiFi ---
  if (nomadListData && nomadListData.wifi_avg_mbps != null) {
    const oldVal = corrected.wifi_avg_mbps;
    const newVal = Math.round(nomadListData.wifi_avg_mbps);
    if (Math.abs(oldVal - newVal) > 5) {
      corrections.push({
        field: 'wifi_avg_mbps',
        old: oldVal,
        new: newVal,
        source: 'nomadlist',
      });
      corrected.wifi_avg_mbps = newVal;
    }
  }

  // --- Monthly cost ---
  const costs = [];
  let costSources = [];
  if (nomadListData && nomadListData.monthly_cost_usd != null) {
    costs.push(nomadListData.monthly_cost_usd);
    costSources.push(`nomadlist:${nomadListData.monthly_cost_usd}`);
  }
  if (numbeoData && numbeoData.estimated_monthly_total_usd != null) {
    costs.push(numbeoData.estimated_monthly_total_usd);
    costSources.push(`numbeo:${numbeoData.estimated_monthly_total_usd}`);
  }
  if (costs.length > 0) {
    const avgCost = Math.round(costs.reduce((a, b) => a + b, 0) / costs.length);
    const oldVal = corrected.monthly_cost_usd;
    // Only correct if difference is >15%
    if (Math.abs(oldVal - avgCost) / oldVal > 0.15) {
      corrections.push({
        field: 'monthly_cost_usd',
        old: oldVal,
        new: avgCost,
        source: `avg(${costSources.join(', ')})`,
      });
      corrected.monthly_cost_usd = avgCost;
    }
  }

  // --- Community size ---
  if (nomadListData && nomadListData.nomad_community_size != null) {
    const oldVal = corrected.nomad_community_size;
    const newVal = nomadListData.nomad_community_size;
    if (oldVal !== newVal) {
      corrections.push({
        field: 'nomad_community_size',
        old: oldVal,
        new: newVal,
        source: 'nomadlist',
      });
      corrected.nomad_community_size = newVal;
    }
  }

  // --- Coworking notable names ---
  // Start with search-verified names
  let finalCoworking = coworkingResult ? [...coworkingResult.verified] : [...(currentNomad.coworking_notable || [])];
  let removedCoworking = coworkingResult ? [...coworkingResult.removed] : [];

  // Add Nomad List recommended coworking spaces if not already present
  if (nomadListData && nomadListData.best_coworking) {
    for (const name of nomadListData.best_coworking) {
      if (!finalCoworking.some((n) => n.toLowerCase() === name.toLowerCase())) {
        finalCoworking.push(name);
      }
    }
  }

  // Check if coworking list changed
  const oldNames = (currentNomad.coworking_notable || []).sort().join(',');
  const newNames = finalCoworking.sort().join(',');
  if (oldNames !== newNames) {
    corrections.push({
      field: 'coworking_notable',
      old: currentNomad.coworking_notable,
      new: finalCoworking,
      removed: removedCoworking,
      source: coworkingResult ? 'jina_search_verification + nomadlist' : 'nomadlist',
    });
    corrected.coworking_notable = finalCoworking;
  }

  // --- Recalculate nomad_score if any corrections were made ---
  if (corrections.length > 0) {
    const oldScore = corrected.nomad_score;
    const newScore = calculateNomadScore(corrected);
    if (Math.abs(oldScore - newScore) > 0.01) {
      corrections.push({
        field: 'nomad_score',
        old: oldScore,
        new: newScore,
        source: 'recalculated',
      });
      corrected.nomad_score = newScore;
    }
  }

  return { corrected, corrections };
}

function applySafetyCorrections(slug, currentSafety, safetyData) {
  const corrections = [];
  const corrected = { ...currentSafety };

  if (!safetyData) return { corrected, corrections };

  // --- Hospital quality: only downgrade ---
  if (safetyData.hospital_quality_indicator != null) {
    const qualityOrder = { high: 3, medium: 2, low: 1 };
    const currentLevel = qualityOrder[corrected.hospital_quality] || 2;
    const newLevel = qualityOrder[safetyData.hospital_quality_indicator] || 2;
    if (newLevel < currentLevel) {
      corrections.push({
        field: 'hospital_quality',
        old: corrected.hospital_quality,
        new: safetyData.hospital_quality_indicator,
        source: 'travel_advisory',
      });
      corrected.hospital_quality = safetyData.hospital_quality_indicator;
    }
  }

  // --- Safety scores: only lower if advisory suggests worse ---
  if (safetyData.safety_level != null) {
    const levelScores = { high: 0.82, medium: 0.72, low: 0.60 };
    const advisoryScore = levelScores[safetyData.safety_level];
    if (advisoryScore != null && advisoryScore < corrected.overall_safety_score) {
      const oldVal = corrected.overall_safety_score;
      // Don't slam it to advisory level — blend conservatively
      const newVal =
        Math.round((corrected.overall_safety_score * 0.6 + advisoryScore * 0.4) * 100) / 100;
      if (Math.abs(oldVal - newVal) > 0.02) {
        corrections.push({
          field: 'overall_safety_score',
          old: oldVal,
          new: newVal,
          source: `travel_advisory (level: ${safetyData.safety_level})`,
        });
        corrected.overall_safety_score = newVal;
        // Adjust derived scores proportionally
        const ratio = newVal / oldVal;
        corrected.solo_traveller_safe =
          Math.round(corrected.solo_traveller_safe * ratio * 100) / 100;
        corrected.female_solo_safe =
          Math.round(corrected.female_solo_safe * ratio * 100) / 100;
        corrected.night_safety =
          Math.round(corrected.night_safety * ratio * 100) / 100;
      }
    }
  }

  // --- Tourist police: only set to false if advisory says so ---
  if (safetyData.has_tourist_police === false && corrected.tourist_police_available === true) {
    corrections.push({
      field: 'tourist_police_available',
      old: true,
      new: false,
      source: 'travel_advisory',
    });
    corrected.tourist_police_available = false;
  }

  return { corrected, corrections };
}

// ---------------------------------------------------------------------------
// Nomad score recalculation
// Weights: wifi 20%, coworking 25%, cost 25%, community 30%
// ---------------------------------------------------------------------------
function calculateNomadScore(data) {
  // WiFi score: 0-1 based on speed (50+ Mbps = 1.0)
  const wifiScore = Math.min(1, (data.wifi_avg_mbps || 0) / 50);

  // Coworking score: 0-1 based on count (50+ = 1.0)
  const coworkingScore = Math.min(1, (data.coworking_spaces || 0) / 50);

  // Cost score: inverted — cheaper = better (target $600-$1500 range)
  // $600 = 1.0, $1500 = 0.3, $3000 = 0
  const cost = data.monthly_cost_usd || 1000;
  const costScore = Math.max(0, Math.min(1, 1 - (cost - 600) / 2400));

  // Community score
  const communityMap = { large: 1.0, medium: 0.7, small: 0.4, minimal: 0.15 };
  const communityScore = communityMap[data.nomad_community_size] || 0.3;

  const score =
    wifiScore * 0.2 +
    coworkingScore * 0.25 +
    costScore * 0.25 +
    communityScore * 0.3;

  return Math.round(score * 100) / 100;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = parseArgs();

  console.log('\n=== Thailand Enrichment Fact-Check Pipeline ===\n');

  // Load current data
  const nomadData = loadJson(NOMAD_FILE);
  const safetyData = loadJson(SAFETY_FILE);
  if (!nomadData || !safetyData) {
    console.error('ERROR: Missing enrichment files. Run enrich-nomad-data.js and enrich-safety-data.js first.');
    process.exit(1);
  }

  // Load or initialize report (resume-safe)
  let report = loadJson(REPORT_FILE) || {
    run_at: new Date().toISOString(),
    cities_checked: 0,
    corrections_made: 0,
    cities: {},
  };

  const allSlugs = getCitySlugs();
  const slugs = args.city ? [args.city] : allSlugs;

  console.log(`Cities to check: ${slugs.length}`);
  console.log(`Already checked: ${Object.keys(report.cities).length}`);
  if (args.skipCoworking) console.log('Skipping coworking verification (--skip-coworking)');
  console.log('');

  let totalCorrections = 0;

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const num = i + 1;
    const cityName = cityDisplayName(slug);

    // Resume-safe: skip already checked
    if (report.cities[slug]) {
      console.log(`[${num}/${slugs.length}] Skipping ${cityName} (already checked)`);
      continue;
    }

    console.log(`[${num}/${slugs.length}] Checking ${cityName}...`);

    const cityReport = {
      sources_found: [],
      corrections: [],
      coworking_verified: [],
      coworking_removed: [],
    };

    // --- Source 1: Nomad List ---
    let nomadListResult = null;
    try {
      nomadListResult = await scrapeNomadList(slug, cityName);
      if (nomadListResult) cityReport.sources_found.push('nomadlist');
    } catch (err) {
      console.log(`    Nomad List error: ${err.message}`);
    }
    await sleep(DELAY_MS);

    // --- Source 2: Numbeo ---
    let numbeoResult = null;
    try {
      numbeoResult = await scrapeNumbeo(slug, cityName);
      if (numbeoResult) cityReport.sources_found.push('numbeo');
    } catch (err) {
      console.log(`    Numbeo error: ${err.message}`);
    }
    await sleep(DELAY_MS);

    // --- Source 3: Coworking verification ---
    let coworkingResult = { verified: [], removed: [] };
    if (!args.skipCoworking && nomadData[slug] && nomadData[slug].coworking_notable) {
      try {
        coworkingResult = await verifyCoworkingNames(
          slug,
          cityName,
          nomadData[slug].coworking_notable
        );
        if (coworkingResult.verified.length > 0 || coworkingResult.removed.length > 0) {
          cityReport.sources_found.push('coworking_search');
        }
      } catch (err) {
        console.log(`    Coworking verification error: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }
    cityReport.coworking_verified = coworkingResult.verified;
    cityReport.coworking_removed = coworkingResult.removed;

    // --- Source 4: Safety ---
    let safetyResult = null;
    try {
      safetyResult = await scrapeSafetyData(slug, cityName);
      if (safetyResult) cityReport.sources_found.push('advisory');
    } catch (err) {
      console.log(`    Safety error: ${err.message}`);
    }
    await sleep(DELAY_MS);

    // --- Apply corrections ---
    if (nomadData[slug]) {
      const nomadCorrection = applyNomadCorrections(
        slug,
        nomadData[slug],
        nomadListResult,
        numbeoResult,
        coworkingResult
      );
      nomadData[slug] = nomadCorrection.corrected;
      cityReport.corrections.push(...nomadCorrection.corrections);
    }

    if (safetyData[slug]) {
      const safetyCorrection = applySafetyCorrections(
        slug,
        safetyData[slug],
        safetyResult
      );
      safetyData[slug] = safetyCorrection.corrected;
      cityReport.corrections.push(...safetyCorrection.corrections);
    }

    totalCorrections += cityReport.corrections.length;
    report.cities[slug] = cityReport;

    // Save after each city (resume-safe)
    saveJson(NOMAD_FILE, nomadData);
    saveJson(SAFETY_FILE, safetyData);
    report.cities_checked = Object.keys(report.cities).length;
    report.corrections_made = totalCorrections;
    report.run_at = new Date().toISOString();
    saveJson(REPORT_FILE, report);

    console.log(
      `    → ${cityReport.corrections.length} corrections, ${cityReport.sources_found.length} sources found`
    );
    console.log('');
  }

  // Final summary
  console.log('\n=== Fact-Check Complete ===\n');
  console.log(`Cities checked: ${report.cities_checked}`);
  console.log(`Total corrections: ${report.corrections_made}`);
  console.log(`Report: ${REPORT_FILE}`);

  // Print correction summary
  const correctionsByField = {};
  for (const [slug, city] of Object.entries(report.cities)) {
    for (const c of city.corrections) {
      const field = c.field;
      correctionsByField[field] = (correctionsByField[field] || 0) + 1;
    }
  }
  if (Object.keys(correctionsByField).length > 0) {
    console.log('\nCorrections by field:');
    for (const [field, count] of Object.entries(correctionsByField).sort(
      (a, b) => b[1] - a[1]
    )) {
      console.log(`  ${field}: ${count}`);
    }
  }

  // Print cities with no sources found
  const noSources = Object.entries(report.cities)
    .filter(([, c]) => c.sources_found.length === 0)
    .map(([slug]) => slug);
  if (noSources.length > 0) {
    console.log(`\nCities with no external data: ${noSources.length}`);
    console.log(`  ${noSources.join(', ')}`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
