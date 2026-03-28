# SEO Cluster Pipeline — Destination Funnels

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build infrastructure for topical SEO clusters (5 pages per destination) with internal cross-linking and affiliate funnels, then create a loop prompt that generates one cluster per run.

**Architecture:** JSON data files in `data/clusters/{city-slug}/` feed 5 new Next.js dynamic routes. Each cluster has a pillar (destination hub), two money pages (things-to-do, hotels), and two supporting pages (where-to-stay, travel-guide). A shared `ClusterNav` component handles internal linking. The loop prompt uses web research to generate factual content per destination.

**Tech Stack:** Next.js 14 Pages Router, TypeScript, existing components (SEOHead, Breadcrumbs, AffiliateBox), JSON data files, ISR 86400s

---

## Chunk 1: Data Schema & Library

### Task 1: Define cluster data schema and types

**Files:**
- Create: `lib/clusters.ts`

- [ ] **Step 1: Create the types and data-reading library**

```typescript
// lib/clusters.ts
import fs from 'fs';
import path from 'path';
import { getAffiliates, CityAffiliates } from './affiliates';

// --- Types ---

export interface ClusterSEO {
  title: string;
  metaDescription: string;
  slug: string;
}

export interface ClusterAttraction {
  name: string;
  description: string;
  type: string; // temple, nature, market, museum, etc.
  location?: string;
  entranceFee?: string;
  tips?: string[];
  googleMapsUrl?: string;
}

export interface ClusterHotel {
  name: string;
  category: 'budget' | 'mid-range' | 'luxury';
  priceRange: string;
  area: string;
  description: string;
  highlights?: string[];
}

export interface ClusterNeighborhood {
  name: string;
  description: string;
  bestFor: string; // "backpackers", "families", "luxury travelers"
  priceLevel: string;
  highlights: string[];
  recommendedHotels?: string[];
}

export interface ClusterActivity {
  name: string;
  description: string;
  category: string; // tours, water-sports, culture, food, adventure
  duration?: string;
  price?: string;
  tips?: string[];
  affiliateType?: 'tours' | 'activities';
}

export interface DestinationHub {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  overview: string;
  highlights: string[];
  bestTimeToVisit: {
    peak: string;
    shoulder: string;
    lowSeason: string;
    recommendation: string;
  };
  topAttractions: ClusterAttraction[];
  travelTips: string[];
  gettingThere: string;
  gettingAround: string;
  generatedAt: string;
}

export interface ThingsToDoPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  activities: ClusterActivity[];
  travelTips: string[];
  generatedAt: string;
}

export interface HotelsPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  hotels: ClusterHotel[];
  bookingTips: string[];
  generatedAt: string;
}

export interface WhereToStayPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  neighborhoods: ClusterNeighborhood[];
  generalTips: string[];
  generatedAt: string;
}

export interface TravelGuidePage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  itinerary: {
    title: string;
    days: Array<{
      day: number;
      title: string;
      activities: string[];
    }>;
  };
  transport: {
    fromBangkok: string;
    localTransport: string[];
  };
  food: {
    mustTry: string[];
    foodAreas: string[];
    tips: string[];
  };
  etiquette: string[];
  budget: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  generatedAt: string;
}

// --- Data reading ---

const CLUSTERS_DIR = path.join(process.cwd(), 'data', 'clusters');

function readClusterFile<T>(citySlug: string, fileName: string): T | null {
  try {
    const filePath = path.join(CLUSTERS_DIR, citySlug, fileName);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export function getDestinationHub(citySlug: string): DestinationHub | null {
  return readClusterFile<DestinationHub>(citySlug, 'destination-hub.json');
}

export function getThingsToDo(citySlug: string): ThingsToDoPage | null {
  return readClusterFile<ThingsToDoPage>(citySlug, 'things-to-do.json');
}

export function getHotelsPage(citySlug: string): HotelsPage | null {
  return readClusterFile<HotelsPage>(citySlug, 'hotels.json');
}

export function getWhereToStay(citySlug: string): WhereToStayPage | null {
  return readClusterFile<WhereToStayPage>(citySlug, 'where-to-stay.json');
}

export function getTravelGuide(citySlug: string): TravelGuidePage | null {
  return readClusterFile<TravelGuidePage>(citySlug, 'travel-guide.json');
}

export function getClusterCities(): string[] {
  if (!fs.existsSync(CLUSTERS_DIR)) return [];
  return fs.readdirSync(CLUSTERS_DIR).filter(dir => {
    const hubPath = path.join(CLUSTERS_DIR, dir, 'destination-hub.json');
    return fs.existsSync(hubPath);
  });
}

export function hasCluster(citySlug: string): boolean {
  const hubPath = path.join(CLUSTERS_DIR, citySlug, 'destination-hub.json');
  return fs.existsSync(hubPath);
}

// Internal links for cross-linking within a cluster
export function getClusterLinks(citySlug: string, cityName: string) {
  return {
    hub: { href: `/destinations/${citySlug}/`, label: `${cityName} Travel Guide` },
    thingsToDo: { href: `/things-to-do/${citySlug}/`, label: `Things To Do in ${cityName}` },
    hotels: { href: `/best/hotels-${citySlug}/`, label: `Best Hotels in ${cityName}` },
    whereToStay: { href: `/guides/where-to-stay-${citySlug}/`, label: `Where To Stay in ${cityName}` },
    travelGuide: { href: `/guides/${citySlug}-travel-guide/`, label: `${cityName} Travel Guide` },
    // Cross-links to existing /city/ pages
    cityHub: { href: `/city/${citySlug}/`, label: `Explore ${cityName}` },
    cityAttractions: { href: `/city/${citySlug}/top-10-attractions/`, label: `Top 10 Attractions in ${cityName}` },
    cityHotels: { href: `/city/${citySlug}/top-10-hotels/`, label: `Top 10 Hotels in ${cityName}` },
    cityFood: { href: `/city/${citySlug}/food/`, label: `${cityName} Food Guide` },
    cityWeather: { href: `/city/${citySlug}/weather/`, label: `${cityName} Weather` },
    cityBudget: { href: `/city/${citySlug}/budget/`, label: `${cityName} Budget Guide` },
  };
}
```

- [ ] **Step 2: Create the data directory**

Run: `mkdir -p data/clusters`
Expected: Directory created

- [ ] **Step 3: Commit**

```bash
git add lib/clusters.ts
git commit -m "feat: add cluster data schema and library"
```

---

### Task 2: Create ClusterNav component for internal cross-linking

**Files:**
- Create: `components/ClusterNav.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/ClusterNav.tsx
import Link from 'next/link';

interface ClusterNavProps {
  citySlug: string;
  cityName: string;
  currentPage: 'hub' | 'things-to-do' | 'hotels' | 'where-to-stay' | 'travel-guide';
}

const pages = [
  { key: 'hub', label: 'Overview', icon: '📍', getHref: (s: string) => `/destinations/${s}/` },
  { key: 'things-to-do', label: 'Things To Do', icon: '🎯', getHref: (s: string) => `/things-to-do/${s}/` },
  { key: 'hotels', label: 'Best Hotels', icon: '🏨', getHref: (s: string) => `/best/hotels-${s}/` },
  { key: 'where-to-stay', label: 'Where To Stay', icon: '📍', getHref: (s: string) => `/guides/where-to-stay-${s}/` },
  { key: 'travel-guide', label: 'Travel Guide', icon: '📖', getHref: (s: string) => `/guides/${s}-travel-guide/` },
];

export default function ClusterNav({ citySlug, cityName, currentPage }: ClusterNavProps) {
  const otherPages = pages.filter(p => p.key !== currentPage);

  return (
    <nav className="bg-gradient-to-r from-thailand-blue/5 to-thailand-gold/5 border border-thailand-blue/10 rounded-2xl p-5 my-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        More about {cityName}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {otherPages.map(page => (
          <Link
            key={page.key}
            href={page.getHref(citySlug)}
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:shadow-md hover:text-thailand-blue transition-all duration-200 border border-gray-100"
          >
            <span role="img" aria-hidden="true">{page.icon}</span>
            {page.label}
          </Link>
        ))}
      </div>
      {/* Cross-link to existing city hub */}
      <div className="mt-3 pt-3 border-t border-gray-200/50">
        <Link
          href={`/city/${citySlug}/`}
          className="text-sm text-thailand-blue hover:underline"
        >
          See all {cityName} pages →
        </Link>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ClusterNav.tsx
git commit -m "feat: add ClusterNav cross-linking component"
```

---

## Chunk 2: Page Routes (5 pages)

### Task 3: Destination Hub page — `/destinations/[slug]`

**Files:**
- Create: `pages/destinations/[slug].tsx`

- [ ] **Step 1: Create the destination hub page**

```typescript
// pages/destinations/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import { getDestinationHub, getClusterCities, getClusterLinks, DestinationHub } from '../../lib/clusters';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';

interface Props {
  data: DestinationHub;
  affiliates: CityAffiliates | null;
}

export default function DestinationHubPage({ data, affiliates }: Props) {
  const links = getClusterLinks(data.citySlug, data.cityName);
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations/' },
    { name: data.cityName, href: `/destinations/${data.citySlug}/` },
  ];

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              {data.cityName}: Complete Destination Guide (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.overview}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hub" />

          {/* Highlights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Highlights</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.highlights.map((h, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="text-thailand-blue font-semibold mr-2">✓</span>{h}
                </div>
              ))}
            </div>
          </section>

          {/* Best Time to Visit */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Time to Visit {data.cityName}</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><strong className="text-green-600">Peak Season:</strong> {data.bestTimeToVisit.peak}</div>
                <div><strong className="text-yellow-600">Shoulder:</strong> {data.bestTimeToVisit.shoulder}</div>
                <div><strong className="text-orange-600">Low Season:</strong> {data.bestTimeToVisit.lowSeason}</div>
              </div>
              <p className="text-gray-700">{data.bestTimeToVisit.recommendation}</p>
              <Link href={`/city/${data.citySlug}/weather/`} className="text-thailand-blue hover:underline text-sm mt-2 inline-block">
                See detailed monthly weather →
              </Link>
            </div>
          </section>

          {/* Main Attractions preview */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Attractions in {data.cityName}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.topAttractions.slice(0, 6).map((a, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">{a.name}</h3>
                  <span className="text-xs text-thailand-blue bg-thailand-blue/10 px-2 py-0.5 rounded-full">{a.type}</span>
                  <p className="text-gray-600 text-sm mt-2">{a.description}</p>
                  {a.entranceFee && <p className="text-sm text-gray-500 mt-1">Entrance: {a.entranceFee}</p>}
                </div>
              ))}
            </div>
            <Link href={`/things-to-do/${data.citySlug}/`} className="inline-block mt-4 text-thailand-blue font-semibold hover:underline">
              See all things to do in {data.cityName} →
            </Link>
          </section>

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />}

          {/* Travel Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Tips</h2>
            <ul className="space-y-2">
              {data.travelTips.map((tip, i) => (
                <li key={i} className="flex gap-2"><span className="text-thailand-gold">•</span><span className="text-gray-700">{tip}</span></li>
              ))}
            </ul>
          </section>

          {/* Getting There & Around */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting There & Around</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
              <div><h3 className="font-bold mb-2">Getting There</h3><p className="text-gray-600">{data.gettingThere}</p></div>
              <div><h3 className="font-bold mb-2">Getting Around</h3><p className="text-gray-600">{data.gettingAround}</p></div>
            </div>
          </section>

          {affiliates && <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />}

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hub" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cities = getClusterCities();
  return {
    paths: cities.map(slug => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const data = getDestinationHub(slug);
  if (!data) return { notFound: true };
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 86400,
  };
};
```

- [ ] **Step 2: Commit**

```bash
git add pages/destinations/[slug].tsx
git commit -m "feat: add destination hub page /destinations/[slug]"
```

---

### Task 4: Things To Do page — `/things-to-do/[slug]`

**Files:**
- Create: `pages/things-to-do/[slug].tsx`

- [ ] **Step 1: Create the things-to-do page**

This page lists 15-25 activities with affiliate CTAs. Structure: intro → activities grid → affiliate boxes → travel tips → ClusterNav.

Key sections:
- Activities grouped by category (Culture, Nature, Food, Adventure, Tours)
- Each activity card shows: name, description, duration, price, tips
- AffiliateBox (type: 'tours') after every 5-6 activities
- Cross-link to `/city/{slug}/top-10-attractions/` and destination hub

```typescript
// pages/things-to-do/[slug].tsx
// Similar pattern to destination hub:
// - GetStaticPaths from getClusterCities()
// - GetStaticProps reads getThingsToDo(slug)
// - SEOHead, Breadcrumbs, ClusterNav
// - Activities rendered as cards with category badges
// - AffiliateBox interspersed for tours/activities
// - Footer cross-links to hotel page and destination hub
```

- [ ] **Step 2: Commit**

```bash
git add pages/things-to-do/[slug].tsx
git commit -m "feat: add things-to-do page /things-to-do/[slug]"
```

---

### Task 5: Hotels page — `/best/[slug]`

**Files:**
- Create: `pages/best/[slug].tsx`

- [ ] **Step 1: Create the hotels page**

Slug format: `hotels-{city-slug}`. Parse city slug from params.

Key sections:
- Hotels grouped by category (Budget → Mid-range → Luxury)
- Each hotel card: name, area, price range, description, highlights
- AffiliateBox (type: 'hotels') after each category group
- Cross-link to `/guides/where-to-stay-{slug}/` and `/city/{slug}/top-10-hotels/`

```typescript
// pages/best/[slug].tsx
// getStaticPaths: map cluster cities to `hotels-${slug}` params
// getStaticProps: extract city slug by removing 'hotels-' prefix
// Parse: const citySlug = (params.slug as string).replace(/^hotels-/, '');
```

- [ ] **Step 2: Commit**

```bash
git add pages/best/[slug].tsx
git commit -m "feat: add hotels money page /best/hotels-[slug]"
```

---

### Task 6: Where To Stay page — `/guides/where-to-stay-[slug]`

**Files:**
- Create: `pages/guides/[slug].tsx`

- [ ] **Step 1: Create the guides page (handles both where-to-stay and travel-guide)**

This single dynamic route handles two page types based on slug pattern:
- `where-to-stay-{city}` → WhereToStayPage
- `{city}-travel-guide` → TravelGuidePage

```typescript
// pages/guides/[slug].tsx
// getStaticPaths: for each cluster city, generate two paths:
//   { slug: `where-to-stay-${city}` }
//   { slug: `${city}-travel-guide` }
// getStaticProps: detect type from slug pattern, read appropriate data
```

Where-to-stay sections:
- Neighborhoods as cards with: name, description, bestFor, priceLevel, highlights
- Recommended hotels per neighborhood
- AffiliateBox (type: 'hotels')
- Cross-link to `/best/hotels-{slug}/`

Travel-guide sections:
- Suggested itinerary (day-by-day)
- Transport (getting there + local options)
- Food guide (must-try dishes, food areas, tips)
- Cultural etiquette tips
- Budget breakdown
- Cross-link to all other cluster pages

- [ ] **Step 2: Commit**

```bash
git add pages/guides/[slug].tsx
git commit -m "feat: add guides page for where-to-stay and travel-guide"
```

---

## Chunk 3: Integration & Sitemap

### Task 7: Update sitemap and existing pages for cross-linking

**Files:**
- Modify: `lib/sitemap.js`
- Modify: `components/CityExploreMore.tsx`

- [ ] **Step 1: Add cluster pages to sitemap**

In `lib/sitemap.js`, add cluster URLs:
- Read `data/clusters/` directory
- For each city with a cluster, add 5 URLs
- Priority: destination hub 0.8, money pages 0.7, supporting pages 0.6

- [ ] **Step 2: Add cluster links to CityExploreMore**

In `components/CityExploreMore.tsx`, add conditional links to cluster pages when they exist:
- "Destination Guide" → `/destinations/{slug}/`
- "Things To Do" → `/things-to-do/{slug}/`

Only show if `data/clusters/{slug}/` exists (pass as prop from getStaticProps).

- [ ] **Step 3: Commit**

```bash
git add lib/sitemap.js components/CityExploreMore.tsx
git commit -m "feat: add cluster pages to sitemap and cross-link from city pages"
```

---

### Task 8: Extend affiliate config for all cluster cities

**Files:**
- Modify: `lib/affiliates.ts`

- [ ] **Step 1: Add all 33 cities to affiliate config**

All cities use the same Travelpayouts links (they redirect based on content). Add all 33 city slugs with the same BOOKING/KLOOK/GYG links.

- [ ] **Step 2: Commit**

```bash
git add lib/affiliates.ts
git commit -m "feat: extend affiliate config to all 33 cities"
```

---

## Chunk 4: Loop Prompt & Content Generation

### Task 9: Create the loop prompt as a reusable skill/prompt

**Files:**
- Create: `prompts/generate-cluster.md`

- [ ] **Step 1: Write the loop prompt**

This is the prompt that will be used with `/loop` to generate one cluster per run. It should:

1. Check `data/clusters/` to find which cities already have clusters
2. Pick the next city (prioritize high-traffic: Bangkok, Chiang Mai, Phuket, Krabi, Koh Samui first)
3. Research the city using WebSearch/WebFetch for real data
4. Generate 5 JSON files in `data/clusters/{city-slug}/`:
   - `destination-hub.json`
   - `things-to-do.json`
   - `hotels.json`
   - `where-to-stay.json`
   - `travel-guide.json`
5. Each file must match the TypeScript interfaces from `lib/clusters.ts`
6. Content must follow E-E-A-T: real places, real prices, specific tips
7. Internal links reference the correct URLs
8. Commit the generated files

**Priority order for city generation:**
1. Bangkok, Chiang Mai, Phuket (highest traffic)
2. Krabi, Koh Samui, Pattaya, Chiang Rai (high traffic)
3. Pai, Ayutthaya, Hua Hin, Kanchanaburi (medium traffic)
4. Remaining cities

- [ ] **Step 2: Test the prompt manually**

Run the prompt once manually for Bangkok to verify:
- All 5 JSON files are valid and match interfaces
- Pages render correctly at all 5 URLs
- Internal links work
- Affiliate boxes show
- Cross-links to existing `/city/bangkok/` pages work

- [ ] **Step 3: Commit the prompt file**

```bash
git add prompts/generate-cluster.md
git commit -m "feat: add SEO cluster generation prompt for /loop"
```

---

## Summary

**What gets built:**
- `lib/clusters.ts` — types + data reading (Task 1)
- `components/ClusterNav.tsx` — internal cross-linking (Task 2)
- `pages/destinations/[slug].tsx` — pillar page (Task 3)
- `pages/things-to-do/[slug].tsx` — activities money page (Task 4)
- `pages/best/[slug].tsx` — hotels money page (Task 5)
- `pages/guides/[slug].tsx` — where-to-stay + travel-guide (Task 6)
- Sitemap + CityExploreMore updates (Task 7)
- Affiliate config expansion (Task 8)
- Loop prompt for `/loop` usage (Task 9)

**Data per cluster (5 JSON files):**
```
data/clusters/
  bangkok/
    destination-hub.json
    things-to-do.json
    hotels.json
    where-to-stay.json
    travel-guide.json
  chiang-mai/
    ...
```

**URL structure:**
| Page | URL | Type |
|---|---|---|
| Destination Hub | `/destinations/chiang-mai/` | Pillar |
| Things To Do | `/things-to-do/chiang-mai/` | Money page |
| Best Hotels | `/best/hotels-chiang-mai/` | Money page |
| Where To Stay | `/guides/where-to-stay-chiang-mai/` | Supporting |
| Travel Guide | `/guides/chiang-mai-travel-guide/` | Supporting |

**Cross-linking web:**
- Each cluster page links to the other 4 cluster pages (via ClusterNav)
- Each cluster page links to relevant existing `/city/{slug}/` subpages
- Existing city pages get links to cluster pages (via CityExploreMore)
- Blog posts can link to cluster pages for topical authority
