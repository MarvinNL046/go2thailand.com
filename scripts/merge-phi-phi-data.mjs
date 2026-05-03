#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const NEW_PARTNERS = JSON.parse(fs.readFileSync('/tmp/phi-phi-tpo.json', 'utf8'));

const NEW_SPOKES = [
  { slug: 'phi-phi-day-trip',   tier: 'island-day-trip',  primaryKeyword: 'phi phi island day trip from phuket' },
  { slug: 'maya-bay',           tier: 'iconic-attraction', primaryKeyword: 'maya bay tour phuket' },
  { slug: 'phi-phi-snorkeling', tier: 'snorkeling-day-trip', primaryKeyword: 'phi phi snorkeling tour' },
  { slug: 'phi-phi-sunset',     tier: 'sunset-cruise',     primaryKeyword: 'phi phi sunset tour' },
  { slug: 'phi-phi-speedboat',  tier: 'speedboat-tour',    primaryKeyword: 'phi phi speedboat tour from phuket' },
  { slug: 'khai-islands',       tier: 'snorkeling-day-trip', primaryKeyword: 'khai islands tour phuket' },
  { slug: 'bamboo-island',      tier: 'island-stop',       primaryKeyword: 'phi phi bamboo island tour' },
];

const PARTNER_LABELS = {
  'phi-phi-day-trip':   'Phi Phi day trip',
  'maya-bay':           'Maya Bay tour',
  'phi-phi-snorkeling': 'Phi Phi snorkeling',
  'phi-phi-sunset':     'Phi Phi sunset',
  'phi-phi-speedboat':  'Phi Phi speedboat',
  'khai-islands':       'Khai Islands',
  'bamboo-island':      'Bamboo Island',
};

const spokesFile = path.join(ROOT, 'data/pseo/tours/phuket-spokes.json');
const partnersFile = path.join(ROOT, 'data/pseo/tours/phuket-partners.json');

const spokesData = JSON.parse(fs.readFileSync(spokesFile, 'utf8'));
const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

const existingSpokeSlugs = new Set(spokesData.spokes.map(s => s.slug));

let added = 0;
for (const ns of NEW_SPOKES) {
  if (existingSpokeSlugs.has(ns.slug)) continue;
  const keyBase = ns.slug.replace(/-/g, '_');
  spokesData.spokes.push({
    slug: ns.slug,
    tier: ns.tier,
    primaryKeyword: ns.primaryKeyword,
    primaryPartnerKey: `klook_${keyBase}`,
    secondaryPartnerKey: `gyg_${keyBase}`,
    tertiaryPartnerKey: `viator_${keyBase}`,
  });
  // Add 3 partner entries
  partnersData.partners[`klook_${keyBase}`] = {
    partnerUrl: NEW_PARTNERS[ns.slug].klook,
    label: `Klook — ${PARTNER_LABELS[ns.slug]}`,
  };
  partnersData.partners[`gyg_${keyBase}`] = {
    partnerUrl: NEW_PARTNERS[ns.slug].gyg,
    label: `GetYourGuide — ${PARTNER_LABELS[ns.slug]}`,
  };
  partnersData.partners[`viator_${keyBase}`] = {
    partnerUrl: NEW_PARTNERS[ns.slug].viator,
    label: `Viator — ${PARTNER_LABELS[ns.slug]}`,
  };
  added++;
}

spokesData.lastUpdated = new Date().toISOString().slice(0, 10);
partnersData.lastUpdated = new Date().toISOString().slice(0, 10);

fs.writeFileSync(spokesFile, JSON.stringify(spokesData, null, 2) + '\n');
fs.writeFileSync(partnersFile, JSON.stringify(partnersData, null, 2) + '\n');

console.log(`✓ Added ${added} Phi Phi spokes`);
console.log(`✓ phuket-spokes.json now has ${spokesData.spokes.length} spokes`);
console.log(`✓ phuket-partners.json has ${Object.keys(partnersData.partners).length} partner entries`);
