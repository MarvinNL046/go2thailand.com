#!/usr/bin/env node

const city = process.argv[2];
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3011';

if (!city) {
  console.error('Usage: BASE_URL=http://127.0.0.1:3011 node scripts/test-support-activity-pricing.js <city-slug>');
  process.exit(2);
}

const routes = [
  'budget',
  'cooking-classes',
  'muay-thai',
  'elephant-sanctuaries',
  'diving-snorkeling',
];

const forbiddenPatterns = [
  { label: 'budget FAQ dollar range', pattern: /Budget travelers can expect to spend \$/i },
  { label: 'starting from label', pattern: /Starting From/i },
  { label: 'per person pricing', pattern: /per person/i },
  { label: 'priceFrom data leak', pattern: /"priceFrom":\d+/i },
  { label: 'GetYourGuide mention', pattern: /GetYourGuide/i },
  { label: 'top pick badge', pattern: /Top pick/i },
  { label: 'top rated badge', pattern: /Top rated/i },
  { label: 'typically cost between wording', pattern: /typically cost between/i },
  { label: 'prices range wording', pattern: /Prices in .* range from/i },
];

async function main() {
  let failures = 0;

  for (const route of routes) {
    const url = `${baseUrl}/city/${city}/${route}/`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`${route}: expected 200, got ${response.status}`);
      failures += 1;
      continue;
    }

    const html = await response.text();

    for (const { label, pattern } of forbiddenPatterns) {
      if (pattern.test(html)) {
        console.error(`${route}: found forbidden pattern: ${label}`);
        failures += 1;
      }
    }
  }

  if (failures > 0) {
    console.error(`support activity pricing check failed with ${failures} issue(s)`);
    process.exit(1);
  }

  console.log(`support activity pricing check passed for ${city}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
