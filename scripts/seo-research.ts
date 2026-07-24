/**
 * Locale-aware DataForSEO helper for Go2Thailand.
 *
 * Paid/live modes:
 *   npm run seo:research -- serp nl "krabi vakantie"
 *   npm run seo:research -- overview en
 *   npm run seo:research -- update nl
 *   npm run seo:research -- quickwins en go2-thailand.com
 *   npm run seo:research -- cluster nl "krabi tips"
 *   npm run seo:research -- parse nl "https://example.com/page"
 *   npm run seo:research -- rankings nl "https://go2-thailand.com/nl/city/krabi/"
 *   npm run seo:research -- backlinks nl "https://go2-thailand.com/nl/city/krabi/"
 *
 * Credentials are read from .env.local and are never printed or committed.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  assertLocale,
  keywordFile,
  loadEnvLocal,
  parseCsvLine,
  readKeywordCsv,
  SeoLocale,
  SEO_ROOT,
  serializeCsvCell,
  slugify,
} from './seo-utils';

const API = 'https://api.dataforseo.com/v3';

function market(locale: SeoLocale) {
  return locale === 'nl'
    ? { language_code: 'nl', location_name: process.env.SEO_NL_LOCATION_NAME || 'Netherlands' }
    : { language_code: 'en', location_name: process.env.SEO_EN_LOCATION_NAME || 'United Kingdom' };
}

function authHeader(): string {
  loadEnvLocal();
  const explicit = process.env.DATAFORSEO_BASE64?.trim();
  if (explicit) return `Basic ${explicit}`;
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) {
    throw new Error('Missing DataForSEO credentials in .env.local. See .env.seo.example.');
  }
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

function extractSerp(result: any) {
  const items: any[] = result?.items || [];
  const organic = items.filter(item => item.type === 'organic').slice(0, 10).map(item => ({
    position: item.rank_absolute,
    title: item.title,
    url: item.url,
    domain: item.domain,
    description: item.description,
  }));
  const paaContainers = items.filter(item => item.type === 'people_also_ask');
  const peopleAlsoAsk = paaContainers.flatMap(container => container.items || [])
    .map((item: any) => item.title || item.question).filter(Boolean);
  const relatedContainers = items.filter(item => item.type === 'related_searches');
  const relatedSearches = relatedContainers.flatMap(container => container.items || [])
    .map((item: any) => item.title || item.keyword).filter(Boolean);
  const features = [...new Set(items.map(item => item.type).filter(Boolean))];
  return { organic, peopleAlsoAsk: [...new Set(peopleAlsoAsk)], relatedSearches: [...new Set(relatedSearches)], features };
}

async function serp(locale: SeoLocale, keyword: string): Promise<void> {
  if (!keyword) throw new Error('Keyword is required.');
  const config = market(locale);
  console.log(`Fetching ${locale.toUpperCase()} SERP for "${keyword}" in ${config.location_name}...`);
  const json = await post('/serp/google/organic/live/advanced', [{
    keyword,
    ...config,
    depth: 10,
    people_also_ask_click_depth: 1,
    load_async_ai_overview: false,
  }]);
  const task = json.tasks?.[0];
  const result = task?.result?.[0];
  const extracted = extractSerp(result);
  const date = new Date().toISOString().slice(0, 10);
  const basename = `${date}-${slugify(keyword)}`;
  const outputDir = resolve(SEO_ROOT, 'research', locale);
  mkdirSync(outputDir, { recursive: true });
  const payload = {
    captured_at: new Date().toISOString(),
    locale,
    market: config,
    keyword,
    cost: task?.cost ?? null,
    ...extracted,
  };
  writeFileSync(resolve(outputDir, `${basename}.json`), JSON.stringify({ summary: payload, raw: result }, null, 2));

  const lines = [
    `# ${keyword} — SERP research`, '',
    `**Date:** ${date}  `,
    `**Locale:** ${locale}  `,
    `**Market:** ${config.location_name}  `,
    `**SERP features:** ${extracted.features.join(', ') || 'none captured'}`, '',
    '## Top organic results', '',
    ...extracted.organic.slice(0, 3).flatMap(item => [
      `${item.position}. [${item.title}](${item.url}) — ${item.domain}`,
      item.description ? `   - ${item.description}` : '',
    ]).filter(Boolean), '',
    '## People Also Ask — verbatim', '',
    ...(extracted.peopleAlsoAsk.length ? extracted.peopleAlsoAsk.map(question => `- ${question}`) : ['- No PAA captured; do not invent replacements.']), '',
    '## Related searches', '',
    ...(extracted.relatedSearches.length ? extracted.relatedSearches.map(query => `- ${query}`) : ['- None captured.']), '',
    '## Manual analysis required before drafting', '',
    '- [ ] Confirm dominant intent and page format.',
    '- [ ] Read the top three pages fully and record their heading trees.',
    '- [ ] Record word count per top-three page and set the ±20% target.',
    '- [ ] Mark topics covered by all three competitors.',
    '- [ ] Add one or two evidence-backed information-gain angles.',
    '- [ ] Research and cite every selected PAA answer.',
    '- [ ] Run locale-specific cannibalisation check.', '',
  ];
  writeFileSync(resolve(outputDir, `${basename}.md`), lines.join('\n'));
  console.log(`Saved ${extracted.organic.length} organic results, ${extracted.peopleAlsoAsk.length} PAA and ${extracted.relatedSearches.length} related searches.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

async function keywordOverview(locale: SeoLocale, write = false): Promise<void> {
  const { header, rows } = readKeywordCsv(locale);
  if (!rows.length) throw new Error(`No keywords found for ${locale}.`);
  const config = market(locale);
  const json = await post('/dataforseo_labs/google/keyword_overview/live', [{
    keywords: rows.map(row => row.primary_keyword),
    ...config,
  }]);
  const items: any[] = json.tasks?.[0]?.result?.[0]?.items || [];
  const byKeyword = new Map(items.map(item => [String(item.keyword || '').toLowerCase(), item]));
  console.log(`\n${locale.toUpperCase()} keyword overview — ${config.location_name}`);
  for (const row of rows) {
    const item = byKeyword.get(row.primary_keyword.toLowerCase());
    const volume = item?.keyword_info?.search_volume ?? '';
    const kd = item?.keyword_properties?.keyword_difficulty ?? '';
    const intent = item?.search_intent_info?.main_intent ?? '';
    console.log(`${row.primary_keyword} | vol ${volume || '—'} | kd ${kd || '—'} | ${intent || 'unknown intent'}`);
    if (write) {
      if (volume !== '') row.volume = String(volume);
      if (kd !== '') row.kd = String(kd);
      if (intent) row.intent = intent;
    }
  }
  if (write) {
    const content = [header.join(','), ...rows.map(row => header.map(key => serializeCsvCell(String((row as any)[key] || ''))).join(',')), ''].join('\n');
    writeFileSync(keywordFile(locale), content);
    console.log(`Updated ${keywordFile(locale)}.`);
  }
}

async function quickwins(locale: SeoLocale, domain: string): Promise<void> {
  const config = market(locale);
  const json = await post('/dataforseo_labs/google/ranked_keywords/live', [{
    target: domain || 'go2-thailand.com',
    ...config,
    limit: 1000,
    filters: [
      ['ranked_serp_element.serp_item.rank_absolute', '>=', 11], 'and',
      ['ranked_serp_element.serp_item.rank_absolute', '<=', 20],
    ],
    order_by: ['keyword_data.keyword_info.search_volume,desc'],
  }]);
  const items: any[] = json.tasks?.[0]?.result?.[0]?.items || [];
  console.log(`\n${locale.toUpperCase()} page-two quick wins for ${domain || 'go2-thailand.com'}:`);
  for (const item of items) {
    console.log(`${item.keyword_data?.keyword} | pos ${item.ranked_serp_element?.serp_item?.rank_absolute} | vol ${item.keyword_data?.keyword_info?.search_volume ?? '—'} | ${item.ranked_serp_element?.serp_item?.url || ''}`);
  }
  if (!items.length) console.log('No positions 11–20 returned.');
}

async function rankings(locale: SeoLocale, target: string): Promise<void> {
  if (!target) throw new Error('Domain or complete page URL is required.');
  const config = market(locale);
  console.log(`Fetching DFS rankings for ${target} (${locale.toUpperCase()})...`);
  const json = await post('/dataforseo_labs/google/ranked_keywords/live', [{
    target,
    ...config,
    limit: 100,
    order_by: ['keyword_data.keyword_info.search_volume,desc'],
  }]);
  const task = json.tasks?.[0];
  const items: any[] = task?.result?.[0]?.items || [];
  const rows = items.map(item => ({
    keyword: item.keyword_data?.keyword || '',
    position: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
    volume: item.keyword_data?.keyword_info?.search_volume ?? null,
    intent: item.keyword_data?.search_intent_info?.main_intent || '',
    url: item.ranked_serp_element?.serp_item?.url || item.ranked_serp_element?.serp_item?.relative_url || '',
  }));
  const outputDir = resolve(SEO_ROOT, 'research', locale, 'rankings');
  mkdirSync(outputDir, { recursive: true });
  const targetName = slugify(target.replace(/^https?:\/\//i, '')).slice(0, 120);
  const basename = `${new Date().toISOString().slice(0, 10)}-${targetName}`;
  writeFileSync(resolve(outputDir, `${basename}.json`), JSON.stringify({
    captured_at: new Date().toISOString(), locale, market: config, target,
    cost: task?.cost ?? null, rankings: rows,
  }, null, 2));
  writeFileSync(resolve(outputDir, `${basename}.md`), [
    `# DFS rankings — ${target}`, '',
    `**Captured:** ${new Date().toISOString()}  `,
    `**Cost:** ${task?.cost ?? '—'}  `,
    `**Keywords returned:** ${rows.length}`, '',
    '| Keyword | Positie | Volume | Intentie | URL |',
    '|---|---:|---:|---|---|',
    ...(rows.length ? rows.map(row => `| ${row.keyword} | ${row.position ?? '—'} | ${row.volume ?? '—'} | ${row.intent || '—'} | ${row.url} |`) : ['| Geen rankings gevonden | — | — | — | — |']),
    '',
  ].join('\n'));
  console.log(`Saved ${rows.length} ranking keywords; DFS cost ${task?.cost ?? '—'}.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

async function backlinkSummary(locale: SeoLocale, target: string): Promise<void> {
  if (!/^https?:\/\//i.test(target)) throw new Error('A complete page URL is required.');
  console.log(`Fetching DFS backlink summary for ${target}...`);
  const json = await post('/backlinks/summary/live', [{
    target,
    exclude_internal_backlinks: true,
    include_indirect_links: false,
    backlinks_status_type: 'live',
    rank_scale: 'one_hundred',
  }]);
  const task = json.tasks?.[0];
  const rootResult = task?.result?.[0] || {};
  const result = rootResult?.items?.[0] || rootResult;
  const summary = {
    rank: result.rank ?? null,
    backlinks: result.backlinks ?? null,
    referringDomains: result.referring_domains ?? null,
    referringPages: result.referring_pages ?? null,
    referringMainDomains: result.referring_main_domains ?? null,
    dofollow: result.dofollow ?? null,
    firstSeen: result.first_seen ?? null,
  };
  const outputDir = resolve(SEO_ROOT, 'research', locale, 'backlinks');
  mkdirSync(outputDir, { recursive: true });
  const basename = `${new Date().toISOString().slice(0, 10)}-${slugify(target.replace(/^https?:\/\//i, '')).slice(0, 120)}`;
  writeFileSync(resolve(outputDir, `${basename}.json`), JSON.stringify({
    captured_at: new Date().toISOString(), locale, target,
    cost: task?.cost ?? null, summary, raw: rootResult,
  }, null, 2));
  writeFileSync(resolve(outputDir, `${basename}.md`), [
    `# DFS backlink summary — ${target}`, '',
    `**Captured:** ${new Date().toISOString()}  `,
    `**Cost:** ${task?.cost ?? '—'}`, '',
    `- Rank: ${summary.rank ?? '—'}`,
    `- Backlinks: ${summary.backlinks ?? '—'}`,
    `- Referring domains: ${summary.referringDomains ?? '—'}`,
    `- Referring pages: ${summary.referringPages ?? '—'}`,
    `- Dofollow: ${summary.dofollow ?? '—'}`,
    `- First seen: ${summary.firstSeen ?? '—'}`,
    '',
  ].join('\n'));
  console.log(`Backlinks ${summary.backlinks ?? '—'}; referring domains ${summary.referringDomains ?? '—'}; DFS cost ${task?.cost ?? '—'}.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

type ClusterKeyword = {
  keyword: string;
  volume: number | null;
  kd: number | null;
  intent: string;
  source: string[];
};

function clusterKeywordFromItem(item: any, source: string): ClusterKeyword | null {
  const data = item?.keyword_data || item?.seed_keyword_data || item;
  const keyword = String(data?.keyword || item?.keyword || '').trim();
  if (!keyword) return null;
  return {
    keyword,
    volume: data?.keyword_info?.search_volume ?? item?.keyword_info?.search_volume ?? null,
    kd: data?.keyword_properties?.keyword_difficulty ?? item?.keyword_properties?.keyword_difficulty ?? null,
    intent: data?.search_intent_info?.main_intent ?? item?.search_intent_info?.main_intent ?? '',
    source: [source],
  };
}

function clusterItems(json: any, source: string): ClusterKeyword[] {
  const result = json.tasks?.[0]?.result?.[0];
  const candidates = [
    ...(result?.items || []),
    ...(result?.related_keywords || []),
    ...(result?.seed_keyword_data ? [result.seed_keyword_data] : []),
  ];
  return candidates.map(item => clusterKeywordFromItem(item, source)).filter(Boolean) as ClusterKeyword[];
}

async function keywordCluster(locale: SeoLocale, seed: string): Promise<void> {
  if (!seed) throw new Error('Seed keyword is required.');
  const config = market(locale);
  console.log(`Building DFS keyword cluster for "${seed}" (${locale.toUpperCase()}, ${config.location_name})...`);

  const [suggestionsJson, relatedJson] = await Promise.all([
    post('/dataforseo_labs/google/keyword_suggestions/live', [{
      keyword: seed,
      ...config,
      include_seed_keyword: true,
      include_serp_info: true,
      limit: 200,
    }]),
    post('/dataforseo_labs/google/related_keywords/live', [{
      keyword: seed,
      ...config,
      depth: 3,
      include_seed_keyword: true,
      include_serp_info: true,
      limit: 300,
    }]),
  ]);

  const merged = new Map<string, ClusterKeyword>();
  for (const item of [
    ...clusterItems(suggestionsJson, 'suggestion'),
    ...clusterItems(relatedJson, 'related'),
  ]) {
    const key = item.keyword.toLocaleLowerCase(locale);
    const existing = merged.get(key);
    if (!existing) merged.set(key, item);
    else {
      existing.volume = existing.volume ?? item.volume;
      existing.kd = existing.kd ?? item.kd;
      existing.intent = existing.intent || item.intent;
      existing.source = [...new Set([...existing.source, ...item.source])];
    }
  }

  let keywords = [...merged.values()].sort((a, b) =>
    (b.volume ?? -1) - (a.volume ?? -1) || a.keyword.localeCompare(b.keyword, locale),
  );

  const overviewCandidates = keywords.slice(0, 200).map(item => item.keyword);
  if (overviewCandidates.length) {
    const overviewJson = await post('/dataforseo_labs/google/keyword_overview/live', [{
      keywords: overviewCandidates,
      ...config,
    }]);
    for (const item of overviewJson.tasks?.[0]?.result?.[0]?.items || []) {
      const keyword = String(item?.keyword || '').toLocaleLowerCase(locale);
      const target = merged.get(keyword);
      if (!target) continue;
      target.volume = item?.keyword_info?.search_volume ?? target.volume;
      target.kd = item?.keyword_properties?.keyword_difficulty ?? target.kd;
      target.intent = item?.search_intent_info?.main_intent ?? target.intent;
    }
    keywords = [...merged.values()].sort((a, b) =>
      (b.volume ?? -1) - (a.volume ?? -1) || a.keyword.localeCompare(b.keyword, locale),
    );
  }

  const seedTokens = seed.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/).filter(token => token.length > 2 && !['thailand', 'guide', 'gids'].includes(token));
  const matchesSeedTopic = (value: string) => {
    if (!seedTokens.length) return true;
    const words = new Set(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-z0-9]+/).filter(Boolean));
    return seedTokens.every(token => words.has(token));
  };
  const childOrNavigationalIntent = /\b(?:weer|airport|vliegveld|arrivals|departures|maps?|kaart|tijd|booking|lounge|wiki)\b/i;
  const competitorKeywords = [...new Set([
    seed,
    ...keywords.filter(item =>
      (item.volume ?? 0) > 0
      && matchesSeedTopic(item.keyword)
      && !childOrNavigationalIntent.test(item.keyword)
      && item.intent !== 'navigational'
      && item.intent !== 'transactional',
    ).slice(0, 19).map(item => item.keyword),
  ])].slice(0, 20);
  const competitorsJson = await post('/dataforseo_labs/google/serp_competitors/live', [{
    keywords: competitorKeywords,
    ...config,
    limit: 50,
  }]);
  const competitors = (competitorsJson.tasks?.[0]?.result?.[0]?.items || []).map((item: any) => ({
    domain: item.domain,
    avgPosition: item.avg_position ?? null,
    keywordCount: item.keywords_count ?? null,
    visibility: item.visibility ?? null,
    estimatedTraffic: item.etv ?? item.estimated_traffic_volume ?? null,
  }));

  const date = new Date().toISOString().slice(0, 10);
  const basename = `${date}-${slugify(seed)}-dfs-cluster`;
  const outputDir = resolve(SEO_ROOT, 'research', locale);
  mkdirSync(outputDir, { recursive: true });
  const costs = {
    suggestions: suggestionsJson.tasks?.[0]?.cost ?? null,
    related: relatedJson.tasks?.[0]?.cost ?? null,
    competitors: competitorsJson.tasks?.[0]?.cost ?? null,
  };
  writeFileSync(resolve(outputDir, `${basename}.json`), JSON.stringify({
    captured_at: new Date().toISOString(),
    locale,
    market: config,
    seed,
    costs,
    competitorKeywords,
    keywords,
    competitors,
  }, null, 2));

  const rows = keywords.slice(0, 50).map(item =>
    `| ${item.keyword} | ${item.volume ?? '—'} | ${item.kd ?? '—'} | ${item.intent || '—'} | ${item.source.join(' + ')} |`,
  );
  const displayMetric = (value: unknown) => typeof value === 'number'
    ? Number(value.toFixed(2)).toLocaleString(locale)
    : value ?? '—';
  const competitorRows = competitors.slice(0, 20).map((item: any) =>
    `| ${item.domain || '—'} | ${displayMetric(item.avgPosition)} | ${item.keywordCount ?? '—'} | ${displayMetric(item.visibility)} | ${displayMetric(item.estimatedTraffic)} |`,
  );
  writeFileSync(resolve(outputDir, `${basename}.md`), [
    `# DFS keyword cluster — ${seed}`,
    '',
    `**Captured:** ${new Date().toISOString()}  `,
    `**Market:** ${config.location_name} / ${locale}  `,
    `**DFS costs:** suggestions ${costs.suggestions ?? '—'}, related ${costs.related ?? '—'}, competitors ${costs.competitors ?? '—'}`,
    '',
    '## Keywords',
    '',
    '| Keyword | Volume | KD | Intent | DFS source |',
    '|---|---:|---:|---|---|',
    ...(rows.length ? rows : ['| No results | — | — | — | — |']),
    '',
    '## SERP competitors across the selected cluster',
    '',
    `Keywords supplied to DFS: ${competitorKeywords.map(item => `\`${item}\``).join(', ')}`,
    '',
    '| Domain | Gem. positie | Keywords | Zichtbaarheid | Geschat verkeer |',
    '|---|---:|---:|---:|---:|',
    ...(competitorRows.length ? competitorRows : ['| No results | — | — | — | — |']),
    '',
  ].join('\n'));
  console.log(`Saved ${keywords.length} DFS keyword records and ${competitors.length} competitor domains.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

async function parsePage(locale: SeoLocale, url: string): Promise<void> {
  if (!/^https?:\/\//i.test(url)) throw new Error('A complete http(s) URL is required.');
  console.log(`Parsing source page with DFS: ${url}`);
  const json = await post('/on_page/content_parsing/live', [{
    url,
    disable_cookie_popup: true,
    markdown_view: true,
  }]);
  const task = json.tasks?.[0];
  const result = task?.result?.[0];
  const item = result?.items?.[0];
  const markdown = item?.page_as_markdown || '';
  const outputDir = resolve(SEO_ROOT, 'research', locale, 'sources');
  mkdirSync(outputDir, { recursive: true });
  const host = new URL(url).hostname.replace(/^www\./, '');
  const name = `${new Date().toISOString().slice(0, 10)}-${slugify(host)}-${slugify(new URL(url).pathname).slice(0, 80) || 'home'}`;
  writeFileSync(resolve(outputDir, `${name}.json`), JSON.stringify({
    captured_at: new Date().toISOString(),
    locale,
    url,
    cost: task?.cost ?? null,
    status_code: item?.status_code ?? null,
    page_content: item?.page_content ?? null,
  }, null, 2));
  writeFileSync(resolve(outputDir, `${name}.md`), [
    `# DFS parsed source — ${url}`,
    '',
    `**Captured:** ${new Date().toISOString()}  `,
    `**Cost:** ${task?.cost ?? '—'}  `,
    `**HTTP status:** ${item?.status_code ?? '—'}`,
    '',
    markdown || '_DFS returned no markdown content._',
    '',
  ].join('\n'));
  console.log(`Saved ${markdown.length} markdown characters from DFS Content Parsing.`);
  console.log(resolve(outputDir, `${name}.md`));
}

const [mode = '', localeValue, ...rest] = process.argv.slice(2);
const locale = assertLocale(localeValue);
const keyword = rest.join(' ').trim();

const run = mode === 'serp' ? serp(locale, keyword)
  : mode === 'overview' ? keywordOverview(locale, false)
    : mode === 'update' ? keywordOverview(locale, true)
      : mode === 'quickwins' ? quickwins(locale, rest[0] || 'go2-thailand.com')
        : mode === 'cluster' ? keywordCluster(locale, keyword)
          : mode === 'parse' ? parsePage(locale, keyword)
            : mode === 'rankings' ? rankings(locale, keyword)
              : mode === 'backlinks' ? backlinkSummary(locale, keyword)
                : Promise.reject(new Error('Usage: seo-research.ts <serp|cluster|parse|rankings|backlinks|overview|update|quickwins> <nl|en> [keyword|domain]'));

run.catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
