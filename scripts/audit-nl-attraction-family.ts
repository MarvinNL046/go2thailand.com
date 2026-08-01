import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvLocal, parseCsvLine, SEO_ROOT } from './seo-utils';

const API = 'https://api.dataforseo.com/v3';

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
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO ${endpoint}: HTTP ${response.status}; DFS ${json.status_code || 'onbekend'} ${json.status_message || response.statusText}`);
  }
  const taskError = json.tasks?.find((task: any) => task.status_code !== 20000);
  if (taskError) throw new Error(`DataForSEO task: ${taskError.status_code} ${taskError.status_message}`);
  return json;
}

function readAttractionUrls(): string[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'inventory', 'routes.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
  }).filter(row => row.locale === 'nl' && row.page_type === 'attraction-detail').map(row => row.url);
}

function isAttractionDetail(url: string): boolean {
  try {
    return /^\/nl\/city\/[^/]+\/attractions\/[^/]+\/$/.test(new URL(url).pathname);
  } catch {
    return /^\/nl\/city\/[^/]+\/attractions\/[^/]+\/$/.test(url);
  }
}

async function main(): Promise<void> {
  const targets = readAttractionUrls();
  if (!targets.length) throw new Error('Geen NL-attraction-detailroutes in de sitemap-inventory gevonden.');
  if (targets.length > 1000) throw new Error('DataForSEO bulk-limiet van 1000 targets overschreden.');
  console.log(`Attraction familieaudit gestart voor ${targets.length} sitemap-URLs.`);

  console.log('DataForSEO ranking- en backlinktaken worden parallel opgevraagd.');
  const rankingsPromise = post('/dataforseo_labs/google/ranked_keywords/live', [{
      target: 'go2-thailand.com',
      language_code: 'nl',
      location_name: 'Netherlands',
      limit: 1000,
      filters: ['ranked_serp_element.serp_item.relative_url', 'like', '/nl/city/%/attractions/%'],
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
    }]);
  const targetBatches = Array.from({ length: Math.ceil(targets.length / 100) }, (_, index) => targets.slice(index * 100, (index + 1) * 100));
  const backlinksPromise = Promise.all(targetBatches.map(batch => post('/backlinks/bulk_pages_summary/live', [{
    targets: batch,
    include_subdomains: false,
    rank_scale: 'one_hundred',
  }])));
  const heartbeat = setInterval(() => console.log('DataForSEO familieaudit wacht nog op de API…'), 8_000);
  const [rankingsJson, backlinksJsonBatches] = await Promise.all([rankingsPromise, backlinksPromise]).finally(() => clearInterval(heartbeat));
  console.log('DataForSEO-resultaten ontvangen; bewijsbestand wordt opgebouwd.');

  const rankingTask = rankingsJson.tasks?.[0];
  const rankingItems: any[] = rankingTask?.result?.[0]?.items || [];
  const rankings = rankingItems.map(item => ({
    keyword: item.keyword_data?.keyword || '',
    volume: item.keyword_data?.keyword_info?.search_volume ?? null,
    position: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
    url: item.ranked_serp_element?.serp_item?.url || '',
    relativeUrl: item.ranked_serp_element?.serp_item?.relative_url || '',
  })).filter(item => isAttractionDetail(item.url || item.relativeUrl));

  const backlinkTasks = backlinksJsonBatches.flatMap(json => json.tasks || []);
  const backlinkItems: any[] = backlinkTasks.flatMap(task => task?.result?.[0]?.items || []);
  const backlinkCost = backlinkTasks.reduce((sum, task) => sum + (Number(task?.cost) || 0), 0);
  const backlinks = backlinkItems.map(item => ({
    url: item.url,
    rank: item.rank ?? 0,
    backlinks: item.backlinks ?? 0,
    referringDomains: item.referring_domains ?? 0,
    referringPages: item.referring_pages ?? 0,
  }));
  const withBacklinks = backlinks.filter(item => item.backlinks > 0 || item.referringDomains > 0);
  const rankedUrls = new Set(rankings.map(item => item.url || item.relativeUrl).filter(Boolean));

  const capturedAt = new Date().toISOString();
  const date = capturedAt.slice(0, 10);
  const outputDir = resolve(SEO_ROOT, 'research', 'nl');
  mkdirSync(outputDir, { recursive: true });
  const basename = `${date}-nl-attraction-detail-family-indexation`;
  const payload = {
    captured_at: capturedAt,
    family: '/nl/city/*/attractions/*',
    sitemapTargets: targets.length,
    costs: { rankings: rankingTask?.cost ?? null, backlinks: backlinkCost },
    rankingKeywords: rankings.length,
    rankedUrls: rankedUrls.size,
    backlinkItemsReturned: backlinks.length,
    urlsWithBacklinks: withBacklinks.length,
    rankings,
    backlinks,
  };
  writeFileSync(resolve(outputDir, `${basename}.json`), `${JSON.stringify(payload, null, 2)}\n`);

  const decision = rankings.length || withBacklinks.length
    ? 'Behoud URLs met aantoonbare signalen en onderzoek hun zoekintentie afzonderlijk; verwijder de overige Engelstalige duplicaten uit de Nederlandse index tot echte NL-content beschikbaar is.'
    : 'Er zijn geen rankings of externe links gevonden. Verwijder de Engelstalige duplicaten uit de NL-sitemap en serveer ze niet langer als Nederlandse pagina.';
  const lines = [
    '# NL programmatic attraction-details — indexatie-audit', '',
    `**Vastgelegd:** ${capturedAt}  `,
    `**Familie:** \`/nl/city/*/attractions/*\`  `,
    `**Sitemap-URLs:** ${targets.length}  `,
    `**DFS-kosten:** rankings ${rankingTask?.cost ?? '—'}, backlinks ${backlinkCost}`, '',
    '## Uitkomst', '',
    `- Rankingzoekwoorden in Google Nederland/Nederlands: ${rankings.length}.`,
    `- Unieke rankende attraction-detail-URLs: ${rankedUrls.size}.`,
    `- URLs teruggegeven door de bulk-backlinkcheck: ${backlinks.length}/${targets.length}.`,
    `- URLs met ten minste één backlink of verwijzend domein: ${withBacklinks.length}.`,
    `- Besluit: ${decision}`, '',
    '## Organische signalen', '',
    '| Zoekwoord | Positie | Volume | URL |', '|---|---:|---:|---|',
    ...(rankings.length ? rankings.slice(0, 100).map(item => `| ${item.keyword} | ${item.position ?? '—'} | ${item.volume ?? '—'} | ${item.url || item.relativeUrl} |`) : ['| Geen rankings gevonden | — | — | — |']), '',
    '## URLs met backlinks', '',
    '| URL | Backlinks | Verwijzende domeinen | Rank |', '|---|---:|---:|---:|',
    ...(withBacklinks.length ? withBacklinks.slice(0, 100).map(item => `| ${item.url} | ${item.backlinks} | ${item.referringDomains} | ${item.rank} |`) : ['| Geen externe links gevonden | — | — | — |']), '',
    '## Technische observatie', '',
    '- Het template vertaalt navigatie en tussenkoppen, maar rendert Engelse kerncopy uit de enhanced attraction-data op de `/nl/`-routes.',
    '- Structured data gebruikt Engelse namen, omschrijvingen en een Engelse URL, terwijl de globale canonical naar de Nederlandse route wijst.',
    '- Daardoor zijn deze routes geen zelfstandige Nederlandse detailpagina’s en veroorzaken ze taal- en kwaliteitsinconsistentie.', '',
    '## Methodiek', '',
    '- DataForSEO Labs Ranked Keywords met een routefilter op de Nederlandse attraction-detailfamilie.',
    '- DataForSEO Backlinks Bulk Pages Summary voor alle actuele NL attraction-detail-URLs uit `seo/inventory/routes.csv`.',
    '- Alleen URLs die exact het patroon `/nl/city/<stad>/attractions/<attractie>/` volgen zijn als detailranking meegenomen.', '',
  ];
  writeFileSync(resolve(outputDir, `${basename}.md`), lines.join('\n'));
  console.log(`NL attraction family: ${targets.length} URLs, ${rankings.length} ranking keywords, ${rankedUrls.size} rankende URLs, ${withBacklinks.length} URLs met backlinks.`);
  console.log(`DFS cost rankings ${rankingTask?.cost ?? '—'}; backlinks ${backlinkCost}.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
