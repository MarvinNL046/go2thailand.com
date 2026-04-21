import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getCanonicalPath,
  getIntentInternalLinks,
  getWhereToStayIntentPage,
  listIntentPaths,
} from '../lib/intent-pages';
import { getComparisonIntentLinks } from '../pages/compare/[slug]';

assert.equal(
  getCanonicalPath({ pageType: 'where-to-stay', city: 'bangkok' }),
  '/where-to-stay/bangkok/',
);

assert.equal(
  getCanonicalPath({ pageType: 'where-to-stay-audience', city: 'bangkok', audience: 'first-time' }),
  '/where-to-stay/bangkok/first-time/',
);

assert.equal(
  getCanonicalPath({ pageType: 'best-hotels-category', city: 'phuket', category: 'beachfront' }),
  '/best-hotels/phuket/beachfront/',
);

assert.equal(
  getCanonicalPath({ pageType: 'area', city: 'chiang-mai', area: 'old-city' }),
  '/areas/chiang-mai/old-city/',
);

const bangkokWhereToStay = getWhereToStayIntentPage('bangkok');
assert.ok(bangkokWhereToStay);
assert.equal(bangkokWhereToStay?.pageType, 'where-to-stay');
assert.equal(bangkokWhereToStay?.canonicalUrl, 'https://go2-thailand.com/where-to-stay/bangkok/');
assert.equal(bangkokWhereToStay?.primaryKeyword, 'where to stay in Bangkok');
assert.ok(bangkokWhereToStay?.topPicks.length);

const cityLinks = getIntentInternalLinks({
  pageType: 'where-to-stay',
  city: 'bangkok',
  cityName: 'Bangkok',
});
assert.ok(cityLinks.some(link => link.href === '/where-to-stay/bangkok/first-time/'));
assert.ok(cityLinks.some(link => link.href === '/where-to-stay/bangkok/digital-nomads/'));
assert.ok(cityLinks.some(link => link.href === '/areas/bangkok/sukhumvit/'));
assert.ok(cityLinks.some(link => link.href === '/best-hotels/bangkok/'));
assert.ok(cityLinks.some(link => link.href === '/best-hotels/bangkok/mid-range/' && link.label === 'Best mid-range hotels'));
assert.ok(cityLinks.every(link => link.href.startsWith('/')));

const audienceLinks = getIntentInternalLinks({
  pageType: 'where-to-stay-audience',
  city: 'bangkok',
  cityName: 'Bangkok',
  audience: 'first-time',
});
assert.equal(audienceLinks[0]?.href, '/where-to-stay/bangkok/');
assert.ok(audienceLinks.some(link => link.href === '/best-hotels/bangkok/'));
assert.ok(audienceLinks.some(link => link.href === '/areas/bangkok/sukhumvit/'));

const paths = listIntentPaths('where-to-stay');
assert.ok(paths.some(path => path.params.city === 'bangkok'));
assert.ok(paths.some(path => path.params.city === 'phuket'));

const comparisonIntentLinks = getComparisonIntentLinks(
  { slug: 'phuket', name: { en: 'Phuket', nl: 'Phuket' } },
  { slug: 'krabi', name: { en: 'Krabi', nl: 'Krabi' } },
  'island',
  'en',
);
assert.ok(comparisonIntentLinks.some(link => link.href === '/where-to-stay/phuket/'));
assert.ok(comparisonIntentLinks.some(link => link.href === '/best-hotels/phuket/'));
assert.ok(comparisonIntentLinks.some(link => link.href === '/where-to-stay/krabi/'));
assert.ok(comparisonIntentLinks.some(link => link.href === '/best-hotels/krabi/'));
assert.ok(comparisonIntentLinks.every(link => link.href.startsWith('/')));

const coreCities = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui'];
const expectedHotelCategoryPages: Record<string, string[]> = {
  bangkok: ['boutique', 'budget', 'couples', 'family', 'luxury', 'mid-range'],
  'chiang-mai': ['boutique', 'budget', 'couples', 'family', 'luxury', 'mid-range', 'old-town', 'private-pool'],
  phuket: ['beachfront', 'boutique', 'budget', 'couples', 'family', 'luxury', 'mid-range'],
  krabi: ['beachfront', 'boutique', 'budget', 'couples', 'family', 'luxury', 'mid-range'],
  'koh-samui': ['beachfront', 'boutique', 'budget', 'couples', 'family', 'luxury', 'mid-range'],
};
const unsupportedHotelCategoryPages = [
  'bangkok-near-airport',
  'bangkok-private-pool',
  'chiang-mai-near-airport',
  'koh-samui-private-pool',
  'phuket-near-airport',
  'phuket-private-pool',
  'krabi-near-airport',
  'krabi-private-pool',
];
const pseoIntentDirs = [
  path.join(process.cwd(), 'data', 'pseo', 'where-to-stay'),
  path.join(process.cwd(), 'data', 'pseo', 'best-hotels'),
];

for (const dir of pseoIntentDirs) {
  for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.json'))) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    assert.ok(
      !content.includes('/guides/where-to-stay/'),
      `${path.basename(dir)}/${file} should not contain legacy where-to-stay guide links`,
    );
  }
}

for (const slug of unsupportedHotelCategoryPages) {
  const file = path.join(process.cwd(), 'data', 'pseo', 'best-hotels', `${slug}.json`);
  assert.ok(!fs.existsSync(file), `${slug} should not be generated without at least 3 strong hotel matches`);
}

for (const city of coreCities) {
  const digitalNomadsFile = path.join(process.cwd(), 'data', 'pseo', 'where-to-stay', `${city}-digital-nomads.json`);
  assert.ok(fs.existsSync(digitalNomadsFile), `${city} should have a digital-nomads where-to-stay page`);
  const digitalNomads = JSON.parse(fs.readFileSync(digitalNomadsFile, 'utf8'));
  assert.equal(digitalNomads.template, 'where-to-stay-audience');
  assert.equal(digitalNomads.audience, 'digital-nomads');
  assert.ok(digitalNomads.neighborhoods.length >= 3, `${city} digital-nomads page should compare at least 3 areas`);
  assert.ok(digitalNomads.aiContent.quickAnswers.length >= 3, `${city} digital-nomads page should have quick answers`);
  assert.ok(digitalNomads.aiContent.ranking.length >= 3, `${city} digital-nomads page should rank areas`);
  assert.ok(digitalNomads.aiContent.bookingTips.length >= 4, `${city} digital-nomads page should include booking tips`);
  assert.ok(
    digitalNomads.aiContent.internalLinks.every((href: string) => !href.startsWith('/guides/where-to-stay/')),
    `${city} digital-nomads internal links should use canonical where-to-stay URLs`,
  );

  const midRangeFile = path.join(process.cwd(), 'data', 'pseo', 'best-hotels', `${city}-mid-range.json`);
  assert.ok(fs.existsSync(midRangeFile), `${city} should have a mid-range best-hotels page`);
  const midRange = JSON.parse(fs.readFileSync(midRangeFile, 'utf8'));
  assert.equal(midRange.template, 'best-hotels-category');
  assert.equal(midRange.category, 'mid-range');
  assert.ok(midRange.hotels.length >= 3, `${city} mid-range page should compare at least 3 hotels`);
  assert.ok(midRange.aiContent.quickAnswers.length >= 3, `${city} mid-range page should have quick answers`);
  assert.ok(midRange.aiContent.ranking.length >= 3, `${city} mid-range page should rank hotels`);
  assert.ok(midRange.aiContent.bookingTips.length >= 4, `${city} mid-range page should include booking tips`);
  assert.ok(
    midRange.aiContent.internalLinks.every((href: string) => !href.startsWith('/guides/where-to-stay/')),
    `${city} mid-range internal links should use canonical where-to-stay URLs`,
  );

  for (const category of expectedHotelCategoryPages[city]) {
    const categoryFile = path.join(process.cwd(), 'data', 'pseo', 'best-hotels', `${city}-${category}.json`);
    assert.ok(fs.existsSync(categoryFile), `${city} should have a ${category} best-hotels page`);
    const categoryPage = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
    assert.equal(categoryPage.template, 'best-hotels-category');
    assert.equal(categoryPage.category, category);
    assert.ok(categoryPage.hotels.length >= 3, `${city} ${category} page should compare at least 3 hotels`);
    assert.ok(categoryPage.aiContent.ranking.length >= 3, `${city} ${category} page should rank hotels`);
    assert.ok(categoryPage.aiContent.internalLinks.includes(`/where-to-stay/${city}/`));

    if (category === 'private-pool') {
      for (const hotel of categoryPage.hotels) {
        const haystack = [
          hotel.name,
          hotel.description,
          ...(hotel.highlights || []),
        ].join(' ').toLowerCase();
        assert.match(
          haystack,
          /private pool|private pools|plunge pool|pool villa/,
          `${hotel.name} should have a real private-pool signal`,
        );
      }
    }
  }
}

console.log('intent pages ok');
