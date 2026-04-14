/**
 * Dutch-first blog post generator.
 *
 * Writes a post directly in NL for /nl/ readers — no EN→NL translation
 * round-trip. Uses Grok 4.1 Fast (newer training data) via OpenRouter.
 *
 * What's different from the EN generator:
 *  - Topic bank tuned for Dutch travelers (Schiphol, KLM, schoolvakanties, etc.)
 *  - Prompt asks for natural Dutch idiom (no "translation flavor")
 *  - Embeds current seasonal context (cool/hot/wet season + festivals)
 *  - SEO targets Dutch keywords, not literal translations
 *  - Output goes to content/blog/nl/<slug>.md
 *
 * We deliberately keep this file focused on prompt + topic; we reuse
 * generateContent / image-generator / affiliate-injector from the existing
 * pipeline so commit + image + affiliate placement stay consistent.
 */

import fs from 'fs';
import path from 'path';
import { generateContent } from './ai-provider';
import { generateBlogImage } from './image-generator';
import { scrapeTopicContext } from './scraper';
import { getSeasonalHook, renderSeasonalContextForPrompt } from './seasonal-context';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export type NlPostCategory =
  | 'stadsgids'         // city guide
  | 'eten-drinken'      // food & drinks
  | 'activiteiten'      // activities
  | 'praktisch'         // practical
  | 'budget'            // budget travel
  | 'seizoen'           // seasonal / festivals
  | 'eilanden';         // islands

export interface GeneratedNlPost {
  title: string;
  slug: string;
  date: string;
  author: { name: string };
  category: NlPostCategory;
  tags: string[];
  image: string;
  imageBase64?: string;
  description: string;
  featured: boolean;
  readingTime: number;
  lastUpdated: string;
  sources: Array<{ name: string; url: string }>;
  content: string;
  scrapeData?: string;
}

export interface NlBlogOptions {
  topic?: string;
  category?: NlPostCategory;
  generateImage?: boolean;
  scrapeContext?: boolean;
  scrapeUrls?: string[];
}

// -------------------------------------------------------------------
// NL-specific topic bank — written FROM the Dutch traveler's perspective.
// Topics reference Schiphol/KLM, NL school holidays, EUR pricing, weersangle.
// -------------------------------------------------------------------

const NL_TOPIC_BANK: Record<NlPostCategory, string[]> = {
  stadsgids: [
    'Bangkok in 4 dagen vanuit Nederland — vluchtig stedentrip plan',
    'Chiang Mai voor Nederlandse digital nomads — wijken, coworking, verblijf',
    'Phuket Old Town — verborgen route door de oude stadskern',
    'Ayutthaya als dagtrip vanuit Bangkok — trein, taxi of tour?',
    'Pai met de auto vanuit Chiang Mai — wat je moet weten over de bochten',
    'Hua Hin als rustige strandbasis — beter dan Pattaya voor families?',
    'Krabi vs Phuket — welke bestemming past beter bij jouw vakantie',
    'Een week Bangkok zonder jezelf uit te putten — slow travel guide',
  ],
  'eten-drinken': [
    'Beste streetfood in Bangkok — wijken, plekken en wat je echt moet proeven',
    'Thais eten dat Nederlanders durven proberen — vanaf mild tot pittig',
    'Authentieke kookcursus in Chiang Mai — onze ervaring + waar te boeken',
    'Pad Thai herkennen — toeristenval vs echte streetfood-versie',
    'Vegan en vegetarisch eten in Thailand — makkelijker dan je denkt',
    'Beste nachtmarkten van Thailand voor foodies — onze top 5',
    'Thaise koffie scene — derde-golfkoffie in Bangkok en Chiang Mai',
    'Singha vs Chang vs Leo — een eerlijke Nederlandse biertest in Thailand',
  ],
  activiteiten: [
    'Snorkelen in Thailand — beste eilanden voor heldere zicht',
    'Ethische olifantenopvang — wat NL-reizigers moeten checken voor ze boeken',
    'Rotsklimmen in Krabi (Railay) — een dag op de wand',
    'Muay Thai live kijken in Bangkok — welke arena, welke avond',
    'Thaise massage — soorten en wat een eerlijke prijs is',
    'Kayakken in Phang Nga Bay — dagtrip versus meerdaagse kayak-tour',
    'Duiken bij Similan Eilanden — wanneer is het beste seizoen',
    'Fietstour door Bangkok — verborgen kanalen en de oude stad',
  ],
  praktisch: [
    'Thailand visa voor Nederlanders 2026 — wat je nodig hebt',
    'TDAC (Thailand Digital Arrival Card) invullen — stap voor stap',
    'Thailand eSIM vs lokale SIM — wat is het slimst voor NL-reizigers',
    'Reisverzekering Thailand — wat moet erin, wat zit niet standaard in NL-polissen',
    'Geld in Thailand — pinpassen, wisselen, en wat het echt kost',
    'Schiphol naar Bangkok — directe vluchten KLM/EVA Air, prijzen en tips',
    'Vervoer in Thailand — Grab, taxi, BTS, treinen en bussen vergeleken',
    'Veiligheid in Thailand — eerlijke risico-inschatting voor Nederlanders',
  ],
  budget: [
    'Thailand budget per dag 2026 — backpacker tot luxe in EUR',
    'Goedkoop reizen in Thailand zonder slechte hostels — onze tips',
    'Wat kost een week Bangkok inclusief vluchten vanuit Nederland',
    'Eilandhoppen Thailand — kosten van ferry tot accommodatie',
    'Hidden costs in Thailand — wat staat niet in je reisplanning',
    'Wisselgeld of pinpas — wat is het voordeligst in 2026',
  ],
  seizoen: [
    'Beste tijd om Thailand te bezoeken — per regio uitgelegd',
    'Songkran 2026 — Thais nieuwjaar overleven (en ervan genieten)',
    'Loi Krathong en Yi Peng in Chiang Mai — lampionnen-ervaring',
    'Regenseizoen in Thailand — waarom het soms juist beter is',
    'Kerstvakantie Thailand — wat je moet weten over drukte en prijzen',
    'Zomervakantie Thailand — hoe je ondanks regen toch een topreis hebt',
  ],
  eilanden: [
    'Koh Samui voor Nederlanders — vluchten via Bangkok, transfers, beste wijken',
    'Koh Phi Phi vs Koh Lipe — welk paradijs past bij jou',
    'Koh Tao voor beginnende duikers — opleiding in 4 dagen',
    'Onbekende eilanden Thailand — Koh Mak, Koh Kood, Koh Phayam',
    'Eilandhoppen vanaf Krabi — route, ferries en boekingstips',
    'Stranden van Phuket gerangschikt — drukte, kwaliteit, locatie',
  ],
};

// -------------------------------------------------------------------
// Topic selection — bias toward underserved categories.
//   1. Count NL posts per category in content/blog/nl/.
//   2. Pick the category with the lowest published count.
//   3. From that category's topic list, pick the first unpublished topic.
// -------------------------------------------------------------------

function readNlPostFiles(): string[] {
  try {
    const dir = path.join(process.cwd(), 'content', 'blog', 'nl');
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  } catch { return []; }
}

function countNlPostsPerCategory(): Record<NlPostCategory, number> {
  const counts: Record<NlPostCategory, number> = {
    stadsgids: 0, 'eten-drinken': 0, activiteiten: 0, praktisch: 0,
    budget: 0, seizoen: 0, eilanden: 0,
  };
  const files = readNlPostFiles();
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(process.cwd(), 'content', 'blog', 'nl', file), 'utf8');
      const m = content.match(/^category:\s*["']?([a-z-]+)["']?\s*$/m);
      if (m && m[1] in counts) counts[m[1] as NlPostCategory]++;
    } catch { /* skip */ }
  }
  return counts;
}

function existingNlTitlesAndSlugs(): { titles: string[]; slugs: string[] } {
  const files = readNlPostFiles();
  const titles: string[] = [];
  const slugs: string[] = [];
  for (const file of files) {
    slugs.push(file.replace(/\.md$/, ''));
    try {
      const c = fs.readFileSync(path.join(process.cwd(), 'content', 'blog', 'nl', file), 'utf8');
      const m = c.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      if (m) titles.push(m[1].toLowerCase());
    } catch { /* skip */ }
  }
  return { titles, slugs };
}

export function selectNlTopic(
  preferredCategory?: NlPostCategory,
): { topic: string; category: NlPostCategory } {
  const counts = countNlPostsPerCategory();
  const { titles } = existingNlTitlesAndSlugs();

  // Pick category: explicit override > least-published category.
  let category: NlPostCategory;
  if (preferredCategory) {
    category = preferredCategory;
  } else {
    const cats = (Object.keys(counts) as NlPostCategory[]).sort((a, b) => counts[a] - counts[b]);
    category = cats[0];
  }

  // First unpublished topic in category, fallback to first overall unpublished.
  const candidates = NL_TOPIC_BANK[category].filter(
    t => !titles.some(existing => existing === t.toLowerCase()),
  );
  if (candidates.length > 0) return { topic: candidates[0], category };

  // Category exhausted — try other categories.
  for (const otherCat of Object.keys(NL_TOPIC_BANK) as NlPostCategory[]) {
    if (otherCat === category) continue;
    const others = NL_TOPIC_BANK[otherCat].filter(
      t => !titles.some(existing => existing === t.toLowerCase()),
    );
    if (others.length > 0) return { topic: others[0], category: otherCat };
  }

  // Everything published — recycle (shouldn't happen with current bank size).
  return { topic: NL_TOPIC_BANK[category][0], category };
}

// -------------------------------------------------------------------
// Sitemap link helper — reuse the EN sitemap loader so internal links land
// on real URLs. We keep the /nl/ prefix logic in a tiny wrapper.
// -------------------------------------------------------------------

function loadNlSitemapLinks(maxLinks = 60): string {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-nl.xml');
    if (!fs.existsSync(sitemapPath)) return '';
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
      .map(m => m[1])
      .filter(u => u.includes('/nl/'))
      .slice(0, maxLinks);
    return urls.map(u => `- ${u}`).join('\n');
  } catch { return ''; }
}

// -------------------------------------------------------------------
// Slug generation
// -------------------------------------------------------------------

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// -------------------------------------------------------------------
// Prompt builder
// -------------------------------------------------------------------

function buildNlPrompt(
  topic: string,
  category: NlPostCategory,
  sitemapLinks: string,
  scrapeData: string | null,
): string {
  const today = new Date().toISOString().split('T')[0];
  const seasonalBlock = renderSeasonalContextForPrompt();

  const categoryBriefs: Record<NlPostCategory, string> = {
    stadsgids: 'Schrijf een diepgaande stadsgids voor Nederlandse reizigers. Behandel wijken, hoogtepunten, eten, slapen en vervoer. Geef een 1-daags en 3-daags suggestie-itinerary.',
    'eten-drinken': 'Schrijf een complete Thaise eet- of drinkgids. Leg gerechten cultureel uit, regionale verschillen, waar je het het beste vindt, en hoe je het bestelt. Voeg een vergelijkende tabel toe.',
    activiteiten: 'Schrijf een gedetailleerde activiteitengids. Vergelijk opties (operators, prijzen, locaties), geef eerlijke pro/contra, en sluit af met een praktische boekingsgids.',
    praktisch: 'Schrijf een grondige praktische reisgids. Behandel scenario\'s, geef exacte prijzen en stappen, anticipeer op vragen. Accuratesse is kritiek — citeer officiële bronnen waar mogelijk.',
    budget: 'Schrijf een realistische budgetgids met exacte kosten in THB en EUR. Voeg een dagbudget-voorbeeld toe, bespaartips, en waar je juist meer mag uitgeven.',
    seizoen: 'Schrijf een seizoens- of festivalgids. Behandel wat er gebeurt, wanneer, beste locaties en planning. Geef tips voor drukte en boeken.',
    eilanden: 'Schrijf een complete eilandgids of vergelijking. Behandel stranden, activiteiten, accommodatie, vervoer ernaartoe en voor wie het eiland geschikt is.',
  };

  const contextSection = scrapeData
    ? `\nREFERENTIEDATA — DIT IS JE PRIMAIRE BRON VAN WAARHEID:
Gebruik UITSLUITEND feiten, prijzen, statistieken en details uit onderstaande data. Als een feit hier NIET in staat, gebruik het dan NIET — laat het weg in plaats van te gokken.
Elke prijs, statistiek en specifieke claim MOET uit deze data of een geciteerde externe bron komen.
KRITIEK: Eigennamen (restaurant, hotel, persoon, winkel) die NIET in onderstaande data staan zijn VERBODEN. Geen namen uit je trainingsdata. Wil je een specifieke locatie noemen? Dan moet die in de data staan — anders beschrijf je generiek ("een rivieroever-restaurant", "een buurt-cafeetje").

${scrapeData.slice(0, 6000)}\n`
    : `\nGEEN REFERENTIEDATA: Schrijf alleen in algemene termen. Noem GEEN specifieke restaurants, hotels, locaties of personen. Gebruik alleen generieke beschrijvingen ("een rivieroever-restaurant", "een lokaal guesthouse", "een marktverkoper").\n`;

  return `Je bent een ervaren Nederlandse Thailand-reisschrijver voor go2-thailand.com.
Je hebt zelf in Thailand gereisd en woont/woonde er periodiek — Chiang Mai voor 3 jaar, eilandhoppen in het zuiden, Bangkok als locale ervaren. Je schrijft vanuit echte ervaring, niet vanuit clichés.

Schrijf een complete, SEO-geoptimaliseerde Nederlandse blogpost over: "${topic}"

${categoryBriefs[category]}
${seasonalBlock}
---

CONTENT VEREISTEN:

1. FRONTMATTER (YAML, alles in het Nederlands behalve technische velden):
\`\`\`yaml
---
title: "Volledige titel in het Nederlands"
slug: "url-vriendelijke-slug"
date: "${today}"
author:
  name: "Go2Thailand Team"
category: "${category}"
tags: ["tag1", "tag2", "tag3", "tag4"]
image: "/images/blog/SLUG.webp"
description: "Aantrekkelijke meta-omschrijving onder 155 tekens, in NL"
featured: false
readingTime: 8
lastUpdated: "${today}"
sources:
  - name: "Tourism Authority of Thailand"
    url: "https://www.tourismthailand.org/"
  - name: "Thailandblog.nl"
    url: "https://www.thailandblog.nl/"
  - name: "Lonely Planet Thailand"
    url: "https://www.lonelyplanet.com/thailand"
---
\`\`\`
Vervang SLUG in de image-path door de werkelijke slug. Voeg 2-3 extra relevante bronnen toe. Inclusief 4-6 specifieke NL-tags (bv. "Bangkok streetfood", "vakantie Thailand", "reisgids", "tips Thailand", "Thailand 2026").

2. OPENING (2-3 zinnen):
Pak de lezer direct met een concrete waarneming, prijs of moment — geen generieke "Thailand is een prachtig land". **Bold het primaire keyword** bij eerste vermelding.

3. KEY TAKEAWAYS TABEL (direct na intro):
\`\`\`markdown
## Belangrijkste punten

| Vraag | Antwoord |
|----------|--------|
| **Beste reistijd?** | Antwoord met **bold keyword** |
| **Wat kost het?** | Gemiddelde kosten in THB en EUR |
| **Hoe kom je er?** | Beste vervoer optie |
| **Is het veilig?** | Eerlijke veiligheidsbeoordeling |
| **Wat moet je vooraf boeken?** | Specifieke aanbevelingen |
\`\`\`

4. BODY (8-10 genummerde H2-secties):
Elke sectie heeft:
- Genummerde H2: ## 1. Titel sectie
- 2 paragrafen, **bold** het keyword bij eerste mention
- 2 H3-subkoppen met 1-2 paragrafen
- Minstens helft van de secties: bullet list met 3-5 items met **vetgedrukt label:** zoals **Beste plek:** of **Pro tip:** of **Budget optie:** (gebruik ECHTE labels, NOOIT letterlijk "Bold Label")
- Persoonlijke observaties: "Toen we er waren...", "In onze ervaring...", "Tijdens onze reis..."

5. WIST JE DAT-CALLOUTS (2-3 verspreid):
\`\`\`markdown
> **Wist je dat?** Het feit met een specifieke statistiek hier.
>
> *Bron: [Bronnaam](https://bron-url.com)*
\`\`\`

6. VERGELIJKINGSTABEL (minstens één):
\`\`\`markdown
| Optie | Beste voor | Kosten | Beoordeling |
|--------|----------|------|--------|
| **Optie A** | Beschrijving | THB X (≈ €Y) | ⭐⭐⭐⭐⭐ |
| **Optie B** | Beschrijving | THB X (≈ €Y) | ⭐⭐⭐⭐ |
\`\`\`

7. WIDGET PLAATSING (VERPLICHT — 3-5 widgets verspreid):
HTML-comment placeholders die we automatisch vervangen. Format EXACT:

<!-- WIDGET:booking -->

Op een eigen regel, met witregels rond. Beschikbare widgets:
- <!-- WIDGET:booking --> — bij hotels/accommodatie
- <!-- WIDGET:klook --> — bij tours/activiteiten/kookcursussen
- <!-- WIDGET:getyourguide --> — bij geleide tours
- <!-- WIDGET:12go --> — bij vervoer tussen steden
- <!-- WIDGET:saily --> — bij eSIM/internet
- <!-- WIDGET:trip --> — bij vluchten
- <!-- WIDGET:tip:Korte praktische tip hier --> — niet-commerciële reisadvies

Regels: nooit twee widgets achter elkaar, minimaal 1 booking + 1 activity + 1 ander, maximaal 5 totaal. ALTIJD HTML-comment syntax.

8. FAQ SECTIE (einde artikel — geoptimaliseerd voor Google rich snippets):
\`\`\`markdown
## Veelgestelde Vragen

### Vraag een?
Antwoord in 2-3 beknopte zinnen. Inclusief specifiek detail of nummer.

### Vraag twee?
Antwoord. Link naar relevante interne pagina voor meer detail.
\`\`\`
5-7 vragen die NL-reizigers daadwerkelijk Googlen. Vragen formuleren zoals een gebruiker ze typt ("Wat kost een vliegticket Schiphol-Bangkok?" niet "Vlucht informatie").

9. CONCLUSIE:
Kernpunten samenvatten, duidelijke CTA naar relevante go2-thailand.com pagina, vertrouwens-statement.

---

INTERNE LINKING (kritiek voor SEO — VERPLICHT 10-15 interne links verspreid):
- Spreid links over ALLE secties — elke H2 minstens 1
- Beschrijvende, keyword-rijke linktekst — bv. "onze Bangkok reisgids" of "top bezienswaardigheden Chiang Mai", NIET "klik hier"
- ELKE interne link MOET volledige URL hebben startend met https://go2-thailand.com/nl/
- Link stadsmenties naar /nl/city/<slug>/, eilandmenties naar /nl/islands/<slug>/, voedselmenties naar /nl/food/, etc.
- DOE NIET dezelfde URL twee keer met dezelfde linktekst — varieer

Beschikbare interne links (gebruik de meest relevante):
${sitemapLinks}

---

E-E-A-T SIGNALEN (kritiek voor Google trust en AdSense):
- ERVARING: Elke 2-3 secties een specifieke eerste-persoons observatie ("Toen we...", "Ons team verbleef...", "Tijdens ons laatste bezoek in [maand]..."). Maak deze SPECIFIEK met weer, drukte, een moment.
- EXPERTISE: Precieze details — prijzen in THB en EUR (via huidige koers ~€1 = 38 THB), afstanden in km, reistijden.
- AUTORITEIT: 3-5 betrouwbare externe bronnen geciteerd (TAT, Lonely Planet, Bangkok Post, UNESCO, officiële sites). Elke "Wist je dat" callout heeft een verifieerbare bron.
- VERTROUWEN: Eerlijk over nadelen, toeristenvallen, en wat overrated is. Inclusief "Wat je moet vermijden" of "Veelvoorkomende fouten" paragraaf.
- DISCLOSURE: Bij vermelding van boeken: "We kunnen een kleine commissie verdienen via onze links, zonder extra kosten voor jou. Dit helpt ons gratis reisgidsen blijven maken."

---

NEDERLANDSE STIJL & SEO:
- Schrijf zoals een Nederlandstalige reisschrijver — geen letterlijke vertaling-gevoel
- Gebruik natuurlijke NL-spreektaal: "we", "je", "ons team"
- Bedragen: prijzen in THB houden, conversie naar EUR (~€1 = 38 THB) waar relevant
- Spreek je publiek aan: "vanuit Nederland", "voor je reis vanaf Schiphol", KLM/EVA Air noemen waar logisch
- Adresseer NL-reizigers concerns: regenseizoen, veiligheid, EUR-kosten, schoolvakanties
- NL SEO keywords: "Thailand vakantie", "Bangkok tips", "{stad} bezienswaardigheden", "reisgids Thailand", "{onderwerp} 2026"

---

ANTI-HALLUCINATIE (KRITIEK):
1. NOOIT prijzen, statistieken of specifieke nummers verzinnen. Alleen uit REFERENCE DATA of bekende publieke feiten.
2. Geen specifiek getal beschikbaar? Schrijf "prijzen variëren" met een link.
3. EIGENNAMEN VERBODEN tenzij ze letterlijk in REFERENCE DATA staan. Geen "Mama's Noodle Shop", schrijf "een lokale noedeltent bij de markt".
4. Specifieke adressen en openingstijden moeten letterlijk uit referencedata komen.
5. Voor historische feiten: alleen breed gedocumenteerde info.
6. Elke "Wist je dat" callout moet een echte, verifieerbare bron-link hebben.
7. NOOIT meta-instructies of redactionele commentaar in output. Alleen de blogpost zoals een lezer hem ziet.
8. NOOIT "Booking.com", "Klook", "GetYourGuide", "12Go", "Saily" of "Trip.com" letterlijk noemen — die brand names komen automatisch via widget-vervanging.

---

DOELLENGTE: 2500-3500 woorden body content (excl. frontmatter). Langere posts ranken beter.
TOON: Kennis, warm, praktisch — als advies van een goedgereisde vriend die Thailand echt kent. Vermijd generieke AI-zinnen als "Of je nu een budget-backpacker of luxereiziger bent" of "Thailand heeft voor iedereen wat wils". Wees specifiek en stelling-nemend.
${contextSection}

ANTWOORD MET DE COMPLETE BLOGPOST — frontmatter + Markdown body. Geen preamble, geen uitleg.`;
}

// -------------------------------------------------------------------
// Parser — extract frontmatter + slug from generated Markdown.
// -------------------------------------------------------------------

function parseGeneratedNlPost(raw: string, fallbackTopic: string, fallbackCategory: NlPostCategory): GeneratedNlPost {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const fmText = fm ? fm[1] : '';
  const get = (key: string) => {
    const m = fmText.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };
  const title = get('title') || fallbackTopic;
  let slug = get('slug');
  if (!slug) slug = slugify(title);
  // Force slug to be safe
  slug = slugify(slug);
  const description = get('description') || '';
  const category = (get('category') as NlPostCategory) || fallbackCategory;
  const today = new Date().toISOString().split('T')[0];

  return {
    title,
    slug,
    date: today,
    author: { name: 'Go2Thailand Team' },
    category,
    tags: [],
    image: `/images/blog/${slug}.webp`,
    description,
    featured: false,
    readingTime: 8,
    lastUpdated: today,
    sources: [],
    content: raw,
  };
}

// -------------------------------------------------------------------
// Public entrypoint
// -------------------------------------------------------------------

export async function generateNlBlogPost(options: NlBlogOptions = {}): Promise<GeneratedNlPost> {
  const doScrape = options.scrapeContext !== false;
  const doImage = options.generateImage !== false;

  // 1. Pick topic + category
  const { topic, category } = options.topic
    ? { topic: options.topic, category: options.category || 'praktisch' as NlPostCategory }
    : selectNlTopic(options.category);

  console.log(`[content-generator-nl] Topic: "${topic}" (${category})`);

  // 2. Scrape live context (reuses existing scraper)
  let scrapeData: string | null = null;
  if (doScrape) {
    try {
      scrapeData = await scrapeTopicContext(topic, options.scrapeUrls);
    } catch (e) {
      console.warn('[content-generator-nl] Scrape failed:', e);
    }
  }

  // 3. Sitemap links (NL-prefixed)
  const sitemapLinks = loadNlSitemapLinks();

  // 4. Build prompt + generate
  const prompt = buildNlPrompt(topic, category, sitemapLinks, scrapeData);
  const raw = await generateContent(prompt, {
    model: 'grok-writer',           // Grok 4.1 Fast — newer training data
    maxTokens: 16384,
    temperature: 0.5,
  });

  // 5. Parse
  const post = parseGeneratedNlPost(raw, topic, category);
  post.scrapeData = scrapeData || undefined;

  // 6. Optionally generate hero image. Map NL category to the existing
  // EN-flavored style map so the visual mood stays consistent.
  if (doImage) {
    try {
      const styleCategory = nlCategoryToImageStyle(category);
      const img = await generateBlogImage(post.title, styleCategory, post.slug);
      if (img?.base64) post.imageBase64 = img.base64;
    } catch (e) {
      console.warn('[content-generator-nl] Image gen failed:', e);
    }
  }

  return post;
}

function nlCategoryToImageStyle(c: NlPostCategory): string {
  switch (c) {
    case 'stadsgids': return 'city-guide';
    case 'eten-drinken': return 'food';
    case 'activiteiten': return 'activities';
    case 'praktisch': return 'practical';
    case 'budget': return 'budget';
    case 'seizoen': return 'seasonal';
    case 'eilanden': return 'islands';
    default: return 'city-guide';
  }
}
