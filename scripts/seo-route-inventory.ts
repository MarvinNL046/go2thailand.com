/** Build a bilingual route inventory from the generated production sitemap. */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECT_ROOT, SEO_ROOT, serializeCsvCell } from './seo-utils';

function decodeXml(value: string): string {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function classify(pathname: string): string {
  const path = pathname.replace(/^\/nl(?=\/|$)/, '') || '/';
  if (path === '/') return 'homepage';
  if (/^\/city\/$/.test(path)) return 'destination-index';
  if (/^\/city\/[^/]+\/$/.test(path)) return 'destination-pillar';
  if (/^\/city\/[^/]+\/attractions\/[^/]+\/$/.test(path)) return 'attraction-detail';
  if (/^\/city\/[^/]+\/(attractions|weather|budget|food|best-time-to-visit)\/$/.test(path)) return 'destination-subpillar';
  if (/^\/city\//.test(path)) return 'destination-detail';
  if (/^\/best-hotels\//.test(path) || /\/hotels\//.test(path)) return 'hotel-commercial';
  if (/^\/hotel\//.test(path)) return 'hotel-detail';
  if (/^\/where-to-stay\//.test(path)) return 'where-to-stay';
  if (/^\/compare\//.test(path)) return 'comparison';
  if (/^\/transport\//.test(path)) return 'transport';
  if (/^\/blog\//.test(path)) return 'blog';
  if (/^\/travel-guides\//.test(path)) return 'travel-guide';
  if (/^\/(guides|thailand-index)\//.test(path) || /^\/(thailand-travel-guide|thailand-for-first-timers|thailand-itinerary)\/$/.test(path)) return 'travel-guide';
  if (path === '/things-to-do-in-thailand/') return 'travel-guide';
  if (/^\/region\//.test(path)) return 'region';
  if (/^\/province\//.test(path)) return 'province';
  if (/^\/islands\//.test(path)) return 'island';
  if (/^\/(food|drinks)\//.test(path)) return 'food-drink';
  if (/^\/itineraries\//.test(path)) return 'itinerary';
  if (/^\/(visa|practical-info)\//.test(path)) return 'practical';
  if (/^\/(areas|destinations)\//.test(path)) return 'location-directory';
  if (/^\/phuket\//.test(path)) return 'phuket-location';
  if (/^\/(activities|things-to-do|tours|yacht|catamaran|car-rental|flights|phuket-tours|phuket-wedding|phuket-honeymoon|phuket-luxury|private-pool)/.test(path)) return 'commercial-activity';
  return 'other';
}

type InventoryRow = {
  locale: string;
  url: string;
  path: string;
  translationKey: string;
  pageType: string;
};

function templateOwner(pageType: string): string {
  const owners: Record<string, string> = {
    homepage: 'homepage',
    'destination-index': 'destination-index',
    'destination-pillar': 'destination-guide',
    'destination-subpillar': 'destination-subpillar',
    'destination-detail': 'destination-detail',
    'attraction-detail': 'attraction-detail',
    'hotel-commercial': 'hotel-guide',
    'hotel-detail': 'hotel-detail',
    'where-to-stay': 'hotel-guide',
    comparison: 'comparison',
    transport: 'transport',
    blog: 'editorial',
    'travel-guide': 'travel-guide',
    region: 'region',
    province: 'province',
    island: 'island',
    'food-drink': 'food-drink',
    itinerary: 'itinerary',
    practical: 'practical',
    'location-directory': 'location-directory',
    'phuket-location': 'phuket-location',
    'commercial-activity': 'commercial-landing',
  };
  return owners[pageType] || 'manual-review';
}

function recommendAction(row: InventoryRow, allTranslationKeys: Set<string>, paired: boolean) {
  const siblingHotel = row.translationKey.replace(/^\/where-to-stay\//, '/best-hotels/');
  let action = 'manual-audit';
  let priority = 'P3';
  let note = 'Controleer zoekintentie, contentkwaliteit en indexatiewaarde handmatig.';

  if (['homepage', 'destination-index'].includes(row.pageType)) {
    action = 'keep-improve'; priority = 'P0'; note = 'Kernhub; behouden en via het gedeelde designsysteem verbeteren.';
  } else if (['destination-pillar', 'destination-subpillar', 'hotel-commercial'].includes(row.pageType)) {
    action = 'keep-improve'; priority = 'P1'; note = 'Belangrijke destination- of commerciële pagina; locale-specifieke DFS-brief vereist.';
  } else if (row.pageType === 'where-to-stay' && allTranslationKeys.has(siblingHotel)) {
    action = 'merge-candidate'; priority = 'P1'; note = `Mogelijke intentie-overlap met ${siblingHotel}; pas redirect toe na inhoudelijke en backlink-audit.`;
  } else if (row.pageType === 'where-to-stay') {
    action = 'keep-improve'; priority = 'P2'; note = 'Geen parallelle best-hotels-route gevonden; bevestig intentie via DFS.';
  } else if (row.pageType === 'hotel-detail') {
    action = 'indexation-audit'; priority = 'P1'; note = 'Programmatic hoteldetail; controleer unieke waarde, actualiteit, canonical en affiliatekwaliteit.';
  } else if (['destination-detail', 'attraction-detail', 'commercial-activity', 'transport', 'comparison'].includes(row.pageType)) {
    action = 'template-improve'; priority = 'P2'; note = 'Schaalbare familie; onderzoek en verbeter eerst het gedeelde template en een pilot-URL.';
  } else if (['blog', 'travel-guide'].includes(row.pageType)) {
    action = 'freshness-audit'; priority = 'P2'; note = 'Controleer zoekintentie, feiten, datumclaims, interne links en consolidatiekansen.';
  } else if (['region', 'province', 'island', 'food-drink', 'itinerary', 'practical', 'location-directory', 'phuket-location'].includes(row.pageType)) {
    action = 'template-audit'; priority = 'P2'; note = 'Behoud voorlopig; valideer indexatiewaarde en templatekwaliteit per cluster.';
  }

  if (!paired && priority !== 'P0') {
    priority = priority === 'P3' ? 'P3' : 'P2';
    note += ' Taalpaar ontbreekt: bepaal of lokalisatie of bewust locale-specifiek gebruik nodig is.';
  }
  return { action, priority, note };
}

const publicDir = resolve(PROJECT_ROOT, 'public');
const sitemapFiles = readdirSync(publicDir).filter(file => /^sitemap(?:-[a-z]{2})?\.xml$/.test(file));
const urls = [...new Set(sitemapFiles.flatMap(file => {
  const xml = readFileSync(resolve(publicDir, file), 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decodeXml(match[1]));
}))];
const rows = urls.map(url => {
  const parsed = new URL(url);
  const locale = parsed.pathname === '/nl/' || parsed.pathname.startsWith('/nl/') ? 'nl' : 'en';
  const translationKey = parsed.pathname.replace(/^\/nl(?=\/|$)/, '') || '/';
  return { locale, url, path: parsed.pathname, translationKey, pageType: classify(parsed.pathname) };
});
const pairLocales = new Map<string, Set<string>>();
for (const row of rows) {
  if (!pairLocales.has(row.translationKey)) pairLocales.set(row.translationKey, new Set());
  pairLocales.get(row.translationKey)?.add(row.locale);
}
const hasPair = (translationKey: string) => pairLocales.get(translationKey)?.has('en') && pairLocales.get(translationKey)?.has('nl');
const allTranslationKeys = new Set(rows.map(row => row.translationKey));

const outputDir = resolve(SEO_ROOT, 'inventory');
mkdirSync(outputDir, { recursive: true });
const header = ['locale', 'url', 'path', 'translation_key', 'page_type', 'has_language_pair', 'template_owner', 'recommended_action', 'priority', 'decision_status', 'decision_note'];
const csv = [header.join(','), ...rows.map(row => [
  row.locale, row.url, row.path, row.translationKey, row.pageType,
  hasPair(row.translationKey) ? 'yes' : 'no',
  templateOwner(row.pageType),
  recommendAction(row, allTranslationKeys, Boolean(hasPair(row.translationKey))).action,
  recommendAction(row, allTranslationKeys, Boolean(hasPair(row.translationKey))).priority,
  'provisional',
  recommendAction(row, allTranslationKeys, Boolean(hasPair(row.translationKey))).note,
].map(serializeCsvCell).join(',')), ''].join('\n');
writeFileSync(resolve(outputDir, 'routes.csv'), csv);

const byLocale = Object.fromEntries(['en', 'nl'].map(locale => [locale, rows.filter(row => row.locale === locale).length]));
const byType = [...new Set(rows.map(row => row.pageType))].sort().map(type => ({ type, count: rows.filter(row => row.pageType === type).length }));
const recommendations = rows.map(row => recommendAction(row, allTranslationKeys, Boolean(hasPair(row.translationKey))));
const byAction = [...new Set(recommendations.map(item => item.action))].sort().map(action => ({ action, count: recommendations.filter(item => item.action === action).length }));
const unpaired = rows.filter(row => !hasPair(row.translationKey));
const unpairedRegistry = {
  enOnly: [...new Set(unpaired.filter(row => row.locale === 'en').map(row => row.translationKey))].sort(),
  nlOnly: [...new Set(unpaired.filter(row => row.locale === 'nl').map(row => row.translationKey))].sort(),
};
writeFileSync(resolve(outputDir, 'unpaired-routes.json'), `${JSON.stringify(unpairedRegistry, null, 2)}\n`);
const summary = [
  '# Route inventory', '',
  `Generated: ${new Date().toISOString()}`, '',
  `- Total sitemap URLs: ${rows.length}`,
  `- English URLs: ${byLocale.en}`,
  `- Dutch URLs: ${byLocale.nl}`,
  `- URLs without a language pair: ${unpaired.length}`, '',
  '## Page families', '',
  '| page type | URLs |', '|---|---:|',
  ...byType.map(item => `| ${item.type} | ${item.count} |`), '',
  '## Provisional actions', '',
  '| recommended action | URLs |', '|---|---:|',
  ...byAction.map(item => `| ${item.action} | ${item.count} |`), '',
  '## Decision rules', '',
  '- `recommended_action` is a triage recommendation, not permission to redirect or noindex automatically.',
  '- `merge-candidate` requires a content, traffic and backlink check before a 301 is implemented.',
  '- `indexation-audit` flags large programmatic families where unique value and canonicals must be proven.',
  '- Missing language pairs are audit leads; some campaign or legal routes may intentionally be locale-specific.',
  '- Primary keywords must be confirmed in the locale-specific backlog before a route enters the used-keywords log.', '',
];
writeFileSync(resolve(outputDir, 'summary.md'), summary.join('\n'));
console.log(`SEO inventory: ${rows.length} URLs (${byLocale.en} EN, ${byLocale.nl} NL), ${unpaired.length} without a language pair.`);
