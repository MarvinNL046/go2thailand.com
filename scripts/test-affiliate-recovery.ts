import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { withPlacementSubId, withSubId } from '../lib/affiliates';
import { getTravelpayoutsRecoveryConfig } from '../lib/travelpayouts-recovery';

const blogConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'blog',
  slug: 'thailand-digital-arrival-card-tdac-guide',
  category: 'visa',
  tags: ['visa', 'tdac', 'arrival card'],
});

assert.equal(blogConfig.intent, 'visa');
assert.deepEqual(blogConfig.buttonIds.slice(0, 3), ['nordvpn', 'nordpass', 'trip_hotels']);

const visaConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'visa',
  slug: 'retirement-visa',
});

assert.equal(visaConfig.intent, 'visa');
assert.deepEqual(visaConfig.buttonIds.slice(0, 4), ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'nordvpn']);

const transportConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'transport',
  slug: 'bangkok-to-pattaya',
  citySlug: 'pattaya',
});

assert.equal(transportConfig.intent, 'transport');
assert.deepEqual(transportConfig.buttonIds.slice(0, 3), ['twelvego_transport', 'trip_hotels', 'booking_hotels']);

const homeConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'home',
});

assert.equal(homeConfig.intent, 'default');
assert.deepEqual(homeConfig.buttonIds.slice(0, 5), ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport', 'nordvpn']);

const guideConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'guide',
  slug: '7-eleven-thailand',
});

assert.equal(guideConfig.intent, 'default');
assert.deepEqual(guideConfig.buttonIds.slice(0, 4), ['trip_hotels', 'booking_hotels', 'klook_tours', 'saily_esim']);

const compareConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'compare',
  slug: 'bangkok-vs-sukhothai',
});

assert.equal(compareConfig.intent, 'default');
assert.deepEqual(compareConfig.buttonIds.slice(0, 4), ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'klook_tours']);

const cityConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'city',
  slug: 'bangkok',
  citySlug: 'bangkok',
});

assert.equal(cityConfig.intent, 'hotels');
assert.deepEqual(cityConfig.buttonIds.slice(0, 4), ['trip_hotels', 'booking_hotels', 'klook_tours', 'twelvego_transport']);

const practicalConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'practical',
  slug: 'money-and-atms',
});

assert.equal(practicalConfig.intent, 'default');
assert.deepEqual(practicalConfig.buttonIds.slice(0, 5), ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'saily_esim', 'nordvpn']);

const itineraryConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'itinerary',
  slug: '7-days-northern-thailand',
  tags: ['chiang mai', 'road trip'],
});

assert.equal(itineraryConfig.intent, 'default');
assert.deepEqual(itineraryConfig.buttonIds.slice(0, 5), ['trip_hotels', 'booking_hotels', 'twelvego_transport', 'klook_tours', 'saily_esim']);

const archiveConfig = getTravelpayoutsRecoveryConfig({
  pageType: 'blog',
  category: 'transport',
  tags: ['train', 'ferry'],
});

assert.equal(archiveConfig.intent, 'transport');
assert.deepEqual(archiveConfig.buttonIds.slice(0, 4), ['twelvego_transport', 'trip_hotels', 'booking_hotels', 'klook_tours']);

assert.equal(
  withSubId('https://booking.tpo.lv/2PT1kR82?subid=blog-index', 'blog-index-prefooter'),
  'https://booking.tpo.lv/2PT1kR82?subid=blog-index',
);

assert.equal(
  withSubId('https://booking.tpo.lv/2PT1kR82', 'visa-prefooter'),
  'https://booking.tpo.lv/2PT1kR82?subid=visa-prefooter',
);

assert.equal(
  withPlacementSubId('https://trip.tpo.lv/TmObooZ5', 'blog', 'sidebar-hotels'),
  'https://trip.tpo.lv/TmObooZ5?subid=blog-sidebar-hotels',
);

assert.equal(
  withPlacementSubId('https://trip.tpo.lv/TmObooZ5?subid=blog', 'blog', 'sidebar-hotels'),
  'https://trip.tpo.lv/TmObooZ5?subid=blog',
);

const rawSubIdPatterns = [
  {
    file: 'pages/city/index.tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=city-index',
      'https://booking.tpo.lv/2PT1kR82?subid=city-index',
      'https://12go.tpo.lv/tNA80urD?subid=city-index',
    ],
  },
  {
    file: 'pages/city/[slug]/index.tsx',
    patterns: [
      'https://trip.tpo.lv/iP1HSint?subid=city',
      'https://trip.tpo.lv/fzIWyBhW?subid=city',
      'https://12go.tpo.lv/tNA80urD?subid=city',
      '?subid=city',
    ],
  },
  {
    file: 'pages/index.tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=home',
      'https://booking.tpo.lv/2PT1kR82?subid=home',
      'https://klook.tpo.lv/aq6ZFxvc?subid=home',
      'https://getyourguide.tpo.lv/GuAFfGGK?subid=home',
      'https://12go.tpo.lv/tNA80urD?subid=home',
    ],
  },
  {
    file: 'pages/travel-guides/index.tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=travel-guides',
      'https://12go.tpo.lv/tNA80urD?subid=travel-guides',
    ],
  },
  {
    file: 'pages/region/index.tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=region',
      'https://12go.tpo.lv/tNA80urD?subid=region',
    ],
  },
  {
    file: 'pages/region/[slug].tsx',
    patterns: ['https://12go.tpo.lv/tNA80urD?subid=region'],
  },
  {
    file: 'pages/weather/index.tsx',
    patterns: ['https://trip.tpo.lv/TmObooZ5?subid=weather'],
  },
  {
    file: 'pages/city/[slug]/weather/index.tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=city-weather',
      'https://12go.tpo.lv/tNA80urD?subid=city-weather',
    ],
  },
  {
    file: 'pages/city/[slug]/weather/[month].tsx',
    patterns: [
      'https://trip.tpo.lv/TmObooZ5?subid=city-weather',
      'https://12go.tpo.lv/tNA80urD?subid=city-weather',
    ],
  },
];

for (const { file, patterns } of rawSubIdPatterns) {
  const source = readFileSync(file, 'utf8');

  for (const pattern of patterns) {
    assert.equal(
      source.includes(pattern),
      false,
      `${file} still contains hardcoded tracking pattern: ${pattern}`,
    );
  }
}

console.log('affiliate recovery config checks passed');
