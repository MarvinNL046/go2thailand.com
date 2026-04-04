#!/usr/bin/env node
/**
 * translate-transport-routes.mjs
 *
 * Converts English-only text fields in transport-routes.json to bilingual {en, nl} format.
 * Fields translated: notes, seo_title, seo_description, route_note
 * Fields left as-is: operators (brand names), sources (website names), alternative_routes (data)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'transport-routes.json');

// Manual NL translations for the few routes that have text fields
const translations = {
  'bueng-kan-to-nakhon-phanom': {
    notes: 'Geen directe busdienst online te boeken. Reis via lokale provinciale minibusjes (songthaew/minibus) die vertrekken vanaf het busstation van Bueng Kan richting Nakhon Phanom, meestal met een overstap in de provincie Nakhon Phanom. Taxi of privéauto is de meest praktische optie voor deze route.',
    seo_title: 'Hoe kom je van Bueng Kan naar Nakhon Phanom 2026: Bus, Taxi & Kosten',
    seo_description: 'Bueng Kan naar Nakhon Phanom: 216 km via Highway 212 langs de Mekong. Lokale minibus 3–4 uur (~฿150–250). Privétaxi 2–3 uur (~฿1.200–1.800). Geen directe online boeking — tips binnenin.'
  },
  'chiang-khan-to-bueng-kan': {
    route_note: 'Geen directe bus of minibus. Aanbevolen: Chiang Khan → Loei (songthaew, 1u, 60-80 THB) → Nong Khai (bus, 4-5u, 150-200 THB) → Bueng Kan (minibus, 2,5-3u, 250 THB)'
  }
};

const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

let translated = 0;

data.routes = data.routes.map(route => {
  const updated = { ...route };

  // Convert text fields to bilingual format
  const textFields = ['notes', 'seo_title', 'seo_description', 'route_note'];

  for (const field of textFields) {
    if (updated[field] && typeof updated[field] === 'string') {
      const nlTranslation = translations[route.slug]?.[field];
      if (nlTranslation) {
        updated[field] = {
          en: updated[field],
          nl: nlTranslation
        };
        translated++;
        console.log(`  Translated ${route.slug}.${field}`);
      } else {
        // Keep as bilingual with EN-only (NL falls back to EN)
        updated[field] = {
          en: updated[field],
          nl: updated[field] // fallback to English
        };
        console.log(`  [fallback] ${route.slug}.${field} — no NL translation, using EN`);
      }
    }
  }

  return updated;
});

writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\nDone! Translated ${translated} fields across ${data.routes.length} routes.`);
console.log(`Output: ${dataPath}`);
