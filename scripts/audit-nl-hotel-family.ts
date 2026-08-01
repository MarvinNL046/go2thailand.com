import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvLocal, parseCsvLine, PROJECT_ROOT, SEO_ROOT } from './seo-utils';

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
  if (!response.ok || json.status_code !== 20000) {
    throw new Error(`DataForSEO ${endpoint}: ${json.status_code || response.status} ${json.status_message || response.statusText}`);
  }
  const taskError = json.tasks?.find((task: any) => task.status_code !== 20000);
  if (taskError) throw new Error(`DataForSEO task: ${taskError.status_code} ${taskError.status_message}`);
  return json;
}

function readHotelUrls(): string[] {
  const lines = readFileSync(resolve(SEO_ROOT, 'inventory', 'routes.csv'), 'utf8').split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((key, index) => [key, values[index] || '']));
  }).filter(row => row.locale === 'nl' && row.page_type === 'hotel-detail').map(row => row.url);
}

async function main(): Promise<void> {
  const targets = readHotelUrls();
  if (!targets.length) throw new Error('Geen NL-hotelroutes in de actuele sitemap-inventory gevonden.');
  if (targets.length > 1000) throw new Error('DataForSEO bulk-limiet van 1000 targets overschreden.');

  const [rankingsJson, backlinksJson] = await Promise.all([
    post('/dataforseo_labs/google/ranked_keywords/live', [{
      target: 'go2-thailand.com',
      language_code: 'nl',
      location_name: 'Netherlands',
      limit: 1000,
      filters: ['ranked_serp_element.serp_item.relative_url', 'like', '/nl/hotel/%'],
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
    }]),
    post('/backlinks/bulk_pages_summary/live', [{
      targets,
      include_subdomains: false,
      rank_scale: 'one_hundred',
    }]),
  ]);

  const rankingTask = rankingsJson.tasks?.[0];
  const rankingItems: any[] = rankingTask?.result?.[0]?.items || [];
  const rankings = rankingItems.map(item => ({
    keyword: item.keyword_data?.keyword || '',
    volume: item.keyword_data?.keyword_info?.search_volume ?? null,
    position: item.ranked_serp_element?.serp_item?.rank_absolute ?? null,
    url: item.ranked_serp_element?.serp_item?.url || '',
    relativeUrl: item.ranked_serp_element?.serp_item?.relative_url || '',
  }));

  const backlinkTask = backlinksJson.tasks?.[0];
  const backlinkItems: any[] = backlinkTask?.result?.[0]?.items || [];
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
  const basename = `${date}-nl-hotel-detail-family-indexation`;
  const payload = {
    captured_at: capturedAt,
    family: '/nl/hotel/*',
    sitemapTargets: targets.length,
    costs: { rankings: rankingTask?.cost ?? null, backlinks: backlinkTask?.cost ?? null },
    rankingKeywords: rankings.length,
    rankedUrls: rankedUrls.size,
    backlinkItemsReturned: backlinks.length,
    urlsWithBacklinks: withBacklinks.length,
    rankings,
    backlinks,
  };
  writeFileSync(resolve(outputDir, `${basename}.json`), `${JSON.stringify(payload, null, 2)}\n`);

  const decision = rankings.length || withBacklinks.length
    ? 'Niet familiebreed redirecten of verwijderen: behoud URLs met signalen en beoordeel de rest afzonderlijk.'
    : 'Er zijn geen organische rankings of externe links gevonden. De NL-familie heeft bovendien Engelstalige inhoud en een Engelse canonical; verwijder haar daarom uit de NL-sitemap en zet de routes op noindex totdat echte Nederlandse hoteldata beschikbaar is.';
  const lines = [
    '# NL programmatic hoteldetails — indexatie-audit', '',
    `**Vastgelegd:** ${capturedAt}  `,
    `**Familie:** \`/nl/hotel/*\`  `,
    `**Sitemap-URLs:** ${targets.length}  `,
    `**DFS-kosten:** rankings ${rankingTask?.cost ?? '—'}, backlinks ${backlinkTask?.cost ?? '—'}`, '',
    '## Uitkomst', '',
    `- Rankingzoekwoorden in Google Nederland/Nederlands: ${rankings.length}.`,
    `- Unieke rankende hotel-URLs: ${rankedUrls.size}.`,
    `- URLs teruggegeven door de bulk-backlinkcheck: ${backlinks.length}/${targets.length}.`,
    `- URLs met ten minste één backlink of verwijzend domein: ${withBacklinks.length}.`,
    `- Besluit: ${decision}`, '',
    '## Organische signalen', '',
    '| Zoekwoord | Positie | Volume | URL |', '|---|---:|---:|---|',
    ...(rankings.length ? rankings.slice(0, 30).map(item => `| ${item.keyword} | ${item.position ?? '—'} | ${item.volume ?? '—'} | ${item.url || item.relativeUrl} |`) : ['| Geen rankings gevonden | — | — | — |']), '',
    '## URLs met backlinks', '',
    '| URL | Backlinks | Verwijzende domeinen | Rank |', '|---|---:|---:|---:|',
    ...(withBacklinks.length ? withBacklinks.slice(0, 50).map(item => `| ${item.url} | ${item.backlinks} | ${item.referringDomains} | ${item.rank} |`) : ['| Geen externe links gevonden | — | — | — |']), '',
    '## Technische observatie', '',
    '- Het huidige gedeelde template rendert Engelstalige bodycopy op de `/nl/`-routes.',
    '- De canonical van die routes wijst naar de Engelse `/hotel/.../`-URL.',
    '- Daardoor horen deze duplicaten niet als zelfstandige Nederlandse landingspagina’s in de NL-sitemap zolang er geen unieke, gecontroleerde Nederlandse inhoud is.', '',
    '## Methodiek', '',
    '- DataForSEO Labs Ranked Keywords, filter op `ranked_serp_element.serp_item.relative_url like /nl/hotel/%`.',
    '- DataForSEO Backlinks Bulk Pages Summary voor alle actuele NL-hoteldetail-URLs uit `seo/inventory/routes.csv`.',
    '- Officiële endpointdocumentatie: https://docs.dataforseo.com/v3/dataforseo_labs-google-ranked_keywords-live/ en https://docs.dataforseo.com/v3/backlinks-bulk_pages_summary-live/.', '',
  ];
  writeFileSync(resolve(outputDir, `${basename}.md`), lines.join('\n'));
  console.log(`NL hotel family: ${targets.length} URLs, ${rankings.length} ranking keywords, ${withBacklinks.length} URLs met backlinks.`);
  console.log(`DFS cost rankings ${rankingTask?.cost ?? '—'}; backlinks ${backlinkTask?.cost ?? '—'}.`);
  console.log(resolve(outputDir, `${basename}.md`));
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
