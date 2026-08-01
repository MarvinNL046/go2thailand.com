import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvLocal, parseCsvLine, SEO_ROOT } from './seo-utils';

const API = 'https://api.dataforseo.com/v3';
const FAMILY_TYPES = new Set(['destination-pillar', 'destination-subpillar', 'destination-detail']);

type InventoryRow = Record<string, string>;

function authHeader(): string {
  loadEnvLocal();
  const explicit = process.env.DATAFORSEO_BASE64?.trim();
  if (explicit) return `Basic ${explicit}`;
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) throw new Error('DataForSEO credentials ontbreken.');
  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
}

async function post(endpoint: string, body: unknown): Promise<any> {
  const response = await fetch(`${API}${endpoint}`, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (!response.ok || json.status_code !== 20000) {
    throw new Error(`DataForSEO ${endpoint}: ${json.status_code || response.status} ${json.status_message || response.statusText}`);
  }
  const taskError = json.tasks?.find((task: any) => task.status_code !== 20000);
  if (taskError) throw new Error(`DataForSEO task: ${taskError.status_code} ${taskError.status_message}`);
  return json;
}

function readInventory(): InventoryRow[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'inventory', 'routes.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
  });
}

function normalizedPath(value: string): string {
  try {
    const path = new URL(value, 'https://go2-thailand.com').pathname;
    return path === '/' ? path : `${path.replace(/\/+$/, '')}/`;
  } catch {
    return value;
  }
}

function cityFromPath(path: string): string {
  return path.split('/').filter(Boolean)[2] || '';
}

function displayCity(slug: string): string {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function main(): Promise<void> {
  const rows = readInventory().filter(row => row.locale === 'nl' && FAMILY_TYPES.has(row.page_type));
  const targets = rows.map(row => row.url);
  const targetPaths = new Set(rows.map(row => normalizedPath(row.path)));
  const cities = [...new Set(rows.filter(row => row.page_type === 'destination-pillar').map(row => cityFromPath(row.path)))].sort();
  if (!targets.length || !cities.length) throw new Error('Geen Nederlandse destinationfamilie in de sitemap-inventory gevonden.');
  if (targets.length > 1000) throw new Error('DataForSEO bulk-limiet van 1000 targets overschreden.');

  const seedKeywords = cities.flatMap(citySlug => {
    const city = displayCity(citySlug);
    return [
      `${city} Thailand`,
      `${city} bezienswaardigheden`,
      `${city} eten`,
      `restaurants ${city}`,
      `${city} weer`,
      `beste reistijd ${city}`,
    ];
  });
  const targetBatches = Array.from({ length: Math.ceil(targets.length / 100) }, (_, index) => targets.slice(index * 100, (index + 1) * 100));

  console.log(`Destinationfamilieaudit: ${targets.length} URLs, ${cities.length} steden en ${seedKeywords.length} zoekwoordseeds.`);
  const rankingsPromise = post('/dataforseo_labs/google/ranked_keywords/live', [{
    target: 'go2-thailand.com',
    language_code: 'nl',
    location_name: 'Netherlands',
    limit: 1000,
    filters: ['ranked_serp_element.serp_item.relative_url', 'like', '/nl/city/%'],
    order_by: ['keyword_data.keyword_info.search_volume,desc'],
  }]);
  const keywordPromise = post('/dataforseo_labs/google/keyword_overview/live', [{
    keywords: seedKeywords,
    language_code: 'nl',
    location_name: 'Netherlands',
  }]);
  const backlinksPromise = Promise.all(targetBatches.map(batch => post('/backlinks/bulk_pages_summary/live', [{
    targets: batch,
    include_subdomains: false,
    rank_scale: 'one_hundred',
  }])));
  const heartbeat = setInterval(() => console.log('DFS verwerkt de familieaudit nog…'), 8_000);
  const [rankingsJson, keywordJson, backlinkJsonBatches] = await Promise.all([rankingsPromise, keywordPromise, backlinksPromise]).finally(() => clearInterval(heartbeat));

  const rankingTask = rankingsJson.tasks?.[0];
  const rankings = (rankingTask?.result?.[0]?.items || []).map((item: any) => ({
    keyword: item.keyword_data?.keyword || '',
    volume: item.keyword_data?.keyword_info?.search_volume ?? null,
    position: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
    url: item.ranked_serp_element?.serp_item?.url || '',
    path: normalizedPath(item.ranked_serp_element?.serp_item?.relative_url || item.ranked_serp_element?.serp_item?.url || ''),
  })).filter((item: any) => targetPaths.has(item.path));

  const keywordTask = keywordJson.tasks?.[0];
  const keywordItems = (keywordTask?.result?.[0]?.items || []).map((item: any) => ({
    keyword: item.keyword || '',
    volume: item.keyword_info?.search_volume ?? null,
    kd: item.keyword_properties?.keyword_difficulty ?? null,
    intent: item.search_intent_info?.main_intent || '',
  })).sort((a: any, b: any) => (b.volume ?? -1) - (a.volume ?? -1));

  const backlinkTasks = backlinkJsonBatches.flatMap(json => json.tasks || []);
  const backlinks = backlinkTasks.flatMap(task => task?.result?.[0]?.items || []).map((item: any) => ({
    url: item.url || '',
    path: normalizedPath(item.url || ''),
    rank: item.rank ?? 0,
    backlinks: item.backlinks ?? 0,
    referringDomains: item.referring_domains ?? 0,
  }));
  const withBacklinks = backlinks.filter(item => item.backlinks > 0 || item.referringDomains > 0);
  const rankingCost = Number(rankingTask?.cost) || 0;
  const keywordCost = Number(keywordTask?.cost) || 0;
  const backlinkCost = backlinkTasks.reduce((sum, task) => sum + (Number(task?.cost) || 0), 0);
  const rankedPaths = [...new Set(rankings.map((item: any) => item.path))];

  const capturedAt = new Date().toISOString();
  const date = capturedAt.slice(0, 10);
  const outputDir = resolve(SEO_ROOT, 'research', 'nl');
  mkdirSync(outputDir, { recursive: true });
  const basename = `${date}-nl-destination-family-indexation`;
  const payload = {
    captured_at: capturedAt,
    family: '/nl/city/*',
    sitemapTargets: targets.length,
    cities: cities.length,
    seedKeywords: seedKeywords.length,
    costs: { rankings: rankingCost, keywordOverview: keywordCost, backlinks: backlinkCost },
    rankingKeywords: rankings.length,
    rankedPaths: rankedPaths.length,
    urlsWithBacklinks: withBacklinks.length,
    rankings,
    keywordItems,
    backlinks,
  };
  writeFileSync(resolve(outputDir, `${basename}.json`), `${JSON.stringify(payload, null, 2)}\n`);

  const typeCounts = [...FAMILY_TYPES].map(type => ({ type, count: rows.filter(row => row.page_type === type).length }));
  const lines = [
    '# Nederlandse destinationfamilie — indexatie- en vraagaudit', '',
    `**Vastgelegd:** ${capturedAt}  `,
    `**Familie:** \`/nl/city/*\`  `,
    `**Sitemap-URLs:** ${targets.length} over ${cities.length} steden  `,
    `**DFS-kosten:** rankings ${rankingCost}, keyword overview ${keywordCost}, backlinks ${backlinkCost}`, '',
    '## Familiesamenstelling', '',
    '| Pagetype | URLs |', '|---|---:|',
    ...typeCounts.map(item => `| ${item.type} | ${item.count} |`), '',
    '## Aantoonbare signalen', '',
    `- Rankingzoekwoorden op exacte familie-URLs: ${rankings.length}.`,
    `- Unieke rankende familie-URLs: ${rankedPaths.length}.`,
    `- URLs met ten minste één backlink of verwijzend domein: ${withBacklinks.length}.`,
    `- Keywordseeds met meetbaar volume: ${keywordItems.filter((item: any) => (item.volume ?? 0) > 0).length}/${keywordItems.length}.`, '',
    '## Organische rankings', '',
    '| Zoekwoord | Positie | Volume | Pad |', '|---|---:|---:|---|',
    ...(rankings.length ? rankings.slice(0, 100).map((item: any) => `| ${item.keyword} | ${item.position ?? '—'} | ${item.volume ?? '—'} | ${item.path} |`) : ['| Geen rankings gevonden | — | — | — |']), '',
    '## Zoekvraag per seed', '',
    '| Keyword | Volume | KD | Intent |', '|---|---:|---:|---|',
    ...keywordItems.map((item: any) => `| ${item.keyword} | ${item.volume ?? '—'} | ${item.kd ?? '—'} | ${item.intent || '—'} |`), '',
    '## URLs met backlinks', '',
    '| Pad | Backlinks | Verwijzende domeinen | Rank |', '|---|---:|---:|---:|',
    ...(withBacklinks.length ? withBacklinks.map(item => `| ${item.path} | ${item.backlinks} | ${item.referringDomains} | ${item.rank} |`) : ['| Geen externe links gevonden | — | — | — |']), '',
    '## Beslisregels voor de vervolgfase', '',
    '- Behoud routes met rankings of backlinks tot hun intentie afzonderlijk is onderzocht.',
    '- Consolideer `/top-10-attractions/` bij voorkeur naar `/attractions/` wanneer beide dezelfde intentie bedienen en de oude route geen sterker eigen signaal heeft.',
    '- Consolideer `/top-10-restaurants/` bij voorkeur naar `/food/` onder dezelfde voorwaarde.',
    '- Bouw alleen zelfstandige stads-, weer-, food- of attractieowners waar meetbare vraag of een aantoonbare clusterrol bestaat; sitemapvolume op zichzelf is geen kwaliteitsbewijs.',
    '- Engelse routes blijven buiten dit Nederlandse besluit en worden pas in de afzonderlijke EN-fase onderzocht.', '',
    '## Methodiek', '',
    '- DataForSEO Labs Ranked Keywords voor Google Nederland/Nederlands, teruggefilterd op de exacte actuele familie-URLs.',
    '- DataForSEO Labs Keyword Overview voor zes Nederlandse seeds per stad.',
    '- DataForSEO Backlinks Bulk Pages Summary voor alle actuele familie-URLs in batches van maximaal 100.', '',
  ];
  writeFileSync(resolve(outputDir, `${basename}.md`), lines.join('\n'));
  console.log(`NL destinationfamilie: ${rankings.length} keywords op ${rankedPaths.length} URLs; ${withBacklinks.length} URLs met backlinks.`);
  console.log(`DFS cost totaal ${Number((rankingCost + keywordCost + backlinkCost).toFixed(6))}.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
