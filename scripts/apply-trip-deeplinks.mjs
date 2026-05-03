#!/usr/bin/env node
// Apply pre-resolved Trip.com hotel-detail URLs by calling TPO API and
// writing the partner URLs into the right JSON files.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
loadEnv({ path: path.join(ROOT, '.env.local') });

const TOKEN = process.env.TRAVELPAYOUTS_API;
if (!TOKEN) { console.error('Missing TRAVELPAYOUTS_API'); process.exit(1); }

// {file, kind, slug|key, name, detailUrl}
const ITEMS = [
  // Patong (hotels[] array)
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'grand-mercure-phuket-patong', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-1457192/grand-mercure-phuket-patong/' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'four-points-by-sheraton-phuket-patong-beach-resort', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-58284759/four-points-by-sheraton-phuket-patong-beach-resort/' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'hotel-indigo-phuket-patong', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-25195420/hotel-indigo-phuket-patong/' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'hotel-clover-patong-phuket', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-13749765/hotel-clover-patong-phuket-formerly-surf-hotel-patong/' },
  { file: 'data/pseo/areas/patong-partners.json', kind: 'array', slug: 'movenpick-myth-hotel-patong-phuket', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-28726406/mvenpick-myth-hotel-patong-phuket/' },
  // Karon (named partners)
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_pullman', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-1390852/pullman-phuket-karon-beach-resort/' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_centara', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-1578968/centara-grand-beach-resort-phuket/' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_mandarava', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998415/mandarava-resort-and-spa-phuket/' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_beyond', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998374/beyond-resort-karon/' },
  { file: 'data/pseo/areas/karon-partners.json', kind: 'partner', key: 'trip_avista', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998395/avista-hideaway-phuket-patong-mgallery-by-sofitel/' },
  // Kamala
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_novotel', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998170/novotel-phuket-kamala-beach/' },
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_sunwing', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998318/sunwing-kamala-beach/' },
  { file: 'data/pseo/areas/kamala-partners.json', kind: 'partner', key: 'trip_sunprime', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998314/kamala-beach-hotel-and-resort-phuket/' },
  // Bang Tao
  { file: 'data/pseo/areas/bang-tao-partners.json', kind: 'partner', key: 'trip_hilton_garden', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-58419494/hilton-garden-inn-phuket-thailand/' },
  // Nai Harn
  { file: 'data/pseo/areas/nai-harn-partners.json', kind: 'partner', key: 'trip_the_nai_harn', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-2697485/the-nai-harn/' },
  { file: 'data/pseo/areas/nai-harn-partners.json', kind: 'partner', key: 'trip_wyndham', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-42482255/wyndham-nai-harn-beach-phuket/' },
  // Rawai
  { file: 'data/pseo/areas/rawai-partners.json', kind: 'partner', key: 'trip_selina', detailUrl: 'https://www.trip.com/hotels/phuket-hotel-detail-998291/serenity-resort-and-residences-phuket/' },
];

async function tpoBatch(items) {
  const links = items.map(i => ({
    url: i.detailUrl,
    sub_id: `${i.kind === 'array' ? i.slug : i.key}-deeplink`,
  }));
  const r = await fetch('https://api.travelpayouts.com/links/v1/create', {
    method: 'POST',
    headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ trs: 421888, marker: 602467, shorten: true, links }),
  });
  const json = await r.json();
  if (json.code !== 'success') throw new Error(`TPO: ${JSON.stringify(json)}`);
  return json.result.links;
}

async function main() {
  console.log(`Calling TPO API for ${ITEMS.length} hotels (chunks of 10)...`);
  const results = [];
  for (let i = 0; i < ITEMS.length; i += 10) {
    const chunk = ITEMS.slice(i, i + 10);
    const r = await tpoBatch(chunk);
    results.push(...r);
  }

  // Apply per file
  const filesTouched = new Set();
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const partnerUrl = results[i].partner_url;
    if (!partnerUrl) { console.log(`  ✗ ${item.detailUrl} — no partner_url`); continue; }
    const filePath = path.join(ROOT, item.file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (item.kind === 'array') {
      const h = (data.hotels || []).find(x => x.slug === item.slug);
      if (h) { h.tripPartnerUrl = partnerUrl; filesTouched.add(filePath); }
    } else if (item.kind === 'partner' && data.partners?.[item.key]) {
      data.partners[item.key].partnerUrl = partnerUrl;
      filesTouched.add(filePath);
    }
    data.lastUpdated = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`  ✓ ${item.kind === 'array' ? item.slug : item.key} → ${partnerUrl}`);
  }
  console.log(`\nUpdated ${filesTouched.size} files`);
}

main().catch(e => { console.error(e); process.exit(1); });
