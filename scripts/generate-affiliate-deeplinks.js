#!/usr/bin/env node
// scripts/generate-affiliate-deeplinks.js
// Generates per-city deep link shortlinks via Travelpayouts Partner Links API
// Usage: TRAVELPAYOUTS_API_TOKEN=xxx node scripts/generate-affiliate-deeplinks.js

const fs = require('fs');
const path = require('path');

const API_URL = 'https://api.travelpayouts.com/links/v1/create';
const TRS = 421888;
const MARKER = 602467;

const TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!TOKEN) {
  console.error('Set TRAVELPAYOUTS_API_TOKEN env variable');
  process.exit(1);
}

// City slug → display name mapping (for brand URLs)
const CITIES = {
  'ayutthaya': 'Ayutthaya',
  'bangkok': 'Bangkok',
  'bueng-kan': 'Bueng Kan',
  'chanthaburi': 'Chanthaburi',
  'chiang-khan': 'Chiang Khan',
  'chiang-mai': 'Chiang Mai',
  'chiang-rai': 'Chiang Rai',
  'chumphon': 'Chumphon',
  'hat-yai': 'Hat Yai',
  'hua-hin': 'Hua Hin',
  'kanchanaburi': 'Kanchanaburi',
  'khon-kaen': 'Khon Kaen',
  'koh-samui': 'Koh Samui',
  'krabi': 'Krabi',
  'lampang': 'Lampang',
  'lopburi': 'Lopburi',
  'mae-hong-son': 'Mae Hong Son',
  'mukdahan': 'Mukdahan',
  'nakhon-phanom': 'Nakhon Phanom',
  'nakhon-ratchasima': 'Nakhon Ratchasima',
  'nakhon-si-thammarat': 'Nakhon Si Thammarat',
  'nong-khai': 'Nong Khai',
  'pai': 'Pai',
  'pattaya': 'Pattaya',
  'phitsanulok': 'Phitsanulok',
  'phuket': 'Phuket',
  'rayong': 'Rayong',
  'sukhothai': 'Sukhothai',
  'surat-thani': 'Surat Thani',
  'trang': 'Trang',
  'trat': 'Trat',
  'ubon-ratchathani': 'Ubon Ratchathani',
  'udon-thani': 'Udon Thani',
};

// 12Go uses lowercase hyphenated slugs in URLs
const TWELVEGO_SLUGS = {
  'ayutthaya': 'ayutthaya',
  'bangkok': 'bangkok',
  'bueng-kan': 'bueng-kan',
  'chanthaburi': 'chanthaburi',
  'chiang-khan': 'chiang-khan',
  'chiang-mai': 'chiang-mai',
  'chiang-rai': 'chiang-rai',
  'chumphon': 'chumphon',
  'hat-yai': 'hat-yai',
  'hua-hin': 'hua-hin',
  'kanchanaburi': 'kanchanaburi',
  'khon-kaen': 'khon-kaen',
  'koh-samui': 'koh-samui',
  'krabi': 'krabi',
  'lampang': 'lampang',
  'lopburi': 'lopburi',
  'mae-hong-son': 'mae-hong-son',
  'mukdahan': 'mukdahan',
  'nakhon-phanom': 'nakhon-phanom',
  'nakhon-ratchasima': 'nakhon-ratchasima',
  'nakhon-si-thammarat': 'nakhon-si-thammarat',
  'nong-khai': 'nong-khai',
  'pai': 'pai',
  'pattaya': 'pattaya',
  'phitsanulok': 'phitsanulok',
  'phuket': 'phuket',
  'rayong': 'rayong',
  'sukhothai': 'sukhothai',
  'surat-thani': 'surat-thani',
  'trang': 'trang',
  'trat': 'trat',
  'ubon-ratchathani': 'ubon-ratchathani',
  'udon-thani': 'udon-thani',
};

// Generate brand destination URLs for each city
function generateBrandUrls(slug, cityName) {
  const encoded = encodeURIComponent(cityName + ', Thailand');
  return {
    booking: `https://www.booking.com/searchresults.html?ss=${encoded}`,
    klook: `https://www.klook.com/search/result/?keyword=${encodeURIComponent(cityName)}`,
    getyourguide: `https://www.getyourguide.com/s/?q=${encoded}&searchSource=1`,
    twelveGo: `https://12go.asia/en/travel/${TWELVEGO_SLUGS[slug] || slug}`,
  };
}

// Call Travelpayouts API in batches of 10
async function createShortlinks(links) {
  const results = [];
  const batches = [];

  for (let i = 0; i < links.length; i += 10) {
    batches.push(links.slice(i, i + 10));
  }

  console.log(`Creating ${links.length} shortlinks in ${batches.length} batches...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`  Batch ${i + 1}/${batches.length} (${batch.length} links)...`);

    const body = {
      trs: TRS,
      marker: MARKER,
      shorten: true,
      links: batch.map(l => ({ url: l.url, sub_id: l.sub_id })),
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': TOKEN,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`  API error (${res.status}): ${text}`);
      // Continue with other batches
      for (const l of batch) {
        results.push({ ...l, shortlink: null, error: `HTTP ${res.status}` });
      }
      continue;
    }

    const data = await res.json();

    // Debug: log first batch response structure
    if (i === 0) {
      console.log('  Raw API response:', JSON.stringify(data, null, 2).slice(0, 1000));
    }

    const responseLinks = data?.result?.links || data?.links || [];
    for (let j = 0; j < batch.length; j++) {
      const link = batch[j];
      const result = responseLinks[j];
      if (result && result.partner_url && result.code === 'success') {
        results.push({ ...link, shortlink: result.partner_url });
        console.log(`    ✓ ${link.sub_id}: ${result.partner_url}`);
      } else {
        results.push({ ...link, shortlink: null, error: JSON.stringify(result) });
        console.log(`    ✗ ${link.sub_id}: ${JSON.stringify(result)}`);
      }
    }

    // Rate limit: max 100 requests/minute, be safe
    if (i < batches.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  return results;
}

async function main() {
  // Build all link requests
  const allLinks = [];

  for (const [slug, cityName] of Object.entries(CITIES)) {
    const urls = generateBrandUrls(slug, cityName);

    allLinks.push({ slug, partner: 'booking', url: urls.booking, sub_id: `${slug}-booking` });
    allLinks.push({ slug, partner: 'klook', url: urls.klook, sub_id: `${slug}-klook` });
    allLinks.push({ slug, partner: 'getyourguide', url: urls.getyourguide, sub_id: `${slug}-gyg` });
    allLinks.push({ slug, partner: 'twelveGo', url: urls.twelveGo, sub_id: `${slug}-12go` });
  }

  console.log(`\nGenerating deep links for ${Object.keys(CITIES).length} cities x 4 partners = ${allLinks.length} links\n`);

  // Call API
  const results = createShortlinks ? await createShortlinks(allLinks) : [];

  // Group results by city
  const cityLinks = {};
  for (const r of results) {
    if (!cityLinks[r.slug]) cityLinks[r.slug] = {};
    cityLinks[r.slug][r.partner] = r.shortlink || r.url; // Fallback to full URL if API fails
  }

  // Save raw results for debugging
  const outputPath = path.join(__dirname, '..', 'data', 'affiliate-deeplinks.json');
  fs.writeFileSync(outputPath, JSON.stringify({ generated: new Date().toISOString(), cities: cityLinks, raw: results }, null, 2));
  console.log(`\nSaved raw results to ${outputPath}`);

  // Generate TypeScript code for affiliates.ts
  const tsLines = [];
  tsLines.push('// Auto-generated per-city deep links — run: node scripts/generate-affiliate-deeplinks.js');
  tsLines.push(`// Generated: ${new Date().toISOString()}`);
  tsLines.push('');
  tsLines.push('export const cityAffiliates: Record<string, CityAffiliates> = {');

  for (const [slug, cityName] of Object.entries(CITIES)) {
    const links = cityLinks[slug] || {};
    tsLines.push(`  '${slug}': {`);
    tsLines.push(`    booking: '${links.booking || 'https://booking.tpo.lv/2PT1kR82'}',`);
    tsLines.push(`    klook: '${links.klook || 'https://klook.tpo.lv/7Dt6WApj'}',`);
    tsLines.push(`    getyourguide: '${links.getyourguide || 'https://getyourguide.tpo.lv/GuAFfGGK'}',`);
    tsLines.push(`    twelveGo: '${links.twelveGo || 'https://12go.tpo.lv/tNA80urD'}',`);
    tsLines.push(`  },`);
  }

  tsLines.push('};');

  const tsOutputPath = path.join(__dirname, '..', 'data', 'affiliate-deeplinks-ts.txt');
  fs.writeFileSync(tsOutputPath, tsLines.join('\n'));
  console.log(`\nGenerated TypeScript snippet at ${tsOutputPath}`);
  console.log('Copy the cityAffiliates block into lib/affiliates.ts to replace the existing one.\n');

  // Summary
  const successful = results.filter(r => r.shortlink).length;
  const failed = results.filter(r => !r.shortlink).length;
  console.log(`Done! ${successful} shortlinks created, ${failed} failed.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
