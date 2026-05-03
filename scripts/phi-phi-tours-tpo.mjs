#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
loadEnv({ path: path.join(ROOT, '.env.local') });
const TOKEN = process.env.TRAVELPAYOUTS_API;

const TOURS = {
  'phi-phi-day-trip': {
    klook: 'https://www.klook.com/en-US/activity/14913-phi-phi-islands-day-tour-phuket/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phuket-phi-phi-islands-and-maya-bay-day-trip-with-lunch-t411963/',
    viator: 'https://www.viator.com/tours/Phuket/Phi-Phi-Islands-One-Day-Tour-by-Speedboat-From-Phuket/d349-110534P179',
  },
  'maya-bay': {
    klook: 'https://www.klook.com/en-US/activity/3245-maya-bay-phi-phi-island-tour-speed-boat-phuket/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phuket-phi-phi-islands-and-maya-bay-day-trip-with-lunch-t411963/',
    viator: 'https://www.viator.com/Phuket/Maya-Bay/day-trips-d349-a22809',
  },
  'phi-phi-snorkeling': {
    klook: 'https://www.klook.com/en-US/activity/181627-phuket-phi-phi-khai-nai-islands-full-day-snorkeling-tour/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phuket-phi-phi-bamboo-islands-snorkeling-by-speedboat-t503422/',
    viator: 'https://www.viator.com/tours/Phuket/Phi-Phi-and-Khai-Islands-by-Speedboat-from-Phuket-Including-Buffet-Lunch/d349-27424P1',
  },
  'phi-phi-sunset': {
    klook: 'https://www.klook.com/en-US/activity/140910-sunset-and-bioluminescent-plankton-snorkel-experience-from-phi-phi/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/sunset-tours-tc306/',
    viator: 'https://www.viator.com/tours/Phuket/Phi-Phi-Maiton-Khai-Sunset-Premium-Tour/d349-190981P9',
  },
  'phi-phi-speedboat': {
    klook: 'https://www.klook.com/en-US/activity/51162-phi-phi-maya-khai-islands-speedboat-tour-pnt-phuket/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phuket-full-day-private-speedboat-charter-to-phi-phi-island-t163683/',
    viator: 'https://www.viator.com/tours/Phuket/Phuket-to-Phi-Phi-Island-Trip-by-Speedboat/d349-10074P3',
  },
  'khai-islands': {
    klook: 'https://www.klook.com/activity/126686-phuket-3-khai-islands-day-tour-by-speedboat/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phuket-3-khai-islands-snorkeling-and-relaxation-tour-t819909/',
    viator: 'https://www.viator.com/tours/Phuket/Khai-Island-Half-Day-Tour-From-Phuket/d349-110534P187',
  },
  'bamboo-island': {
    klook: 'https://www.klook.com/en-US/activity/26595-phi-phi-bamboo-beach-tour-phuket/',
    gyg: 'https://www.getyourguide.com/phuket-l32123/phi-phi-bamboo-islands-small-group-tour-from-phuket-t144960/',
    viator: 'https://www.viator.com/tours/Phuket/Small-Group-Premium-Tour-to-Phi-Phi-Maya-and-Bamboo-Island/d349-27424P22',
  },
};

// Build flat list: 21 items
const ITEMS = [];
for (const [slug, providers] of Object.entries(TOURS)) {
  for (const [platform, url] of Object.entries(providers)) {
    ITEMS.push({ slug, platform, url, sub_id: `${platform}_${slug.replace(/-/g, '_')}-deeplink` });
  }
}

async function tpoBatch(items) {
  const links = items.map(i => ({ url: i.url, sub_id: i.sub_id }));
  const r = await fetch('https://api.travelpayouts.com/links/v1/create', {
    method: 'POST',
    headers: { 'X-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ trs: 421888, marker: 602467, shorten: true, links }),
  });
  const j = await r.json();
  if (j.code !== 'success') throw new Error(JSON.stringify(j));
  return j.result.links;
}

const all = [];
for (let i = 0; i < ITEMS.length; i += 10) {
  const r = await tpoBatch(ITEMS.slice(i, i + 10));
  all.push(...r);
}

// Group by spoke
const result = {};
for (let i = 0; i < ITEMS.length; i++) {
  const { slug, platform } = ITEMS[i];
  if (!result[slug]) result[slug] = {};
  result[slug][platform] = all[i].partner_url;
}
console.log(JSON.stringify(result, null, 2));
