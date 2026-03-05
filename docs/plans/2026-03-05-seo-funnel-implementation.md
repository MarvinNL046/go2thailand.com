# SEO Funnel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the SEO funnel by adding affiliate CTAs to top 5 city subpages (Phase 1) and building 5 TOFU pillar pages (Phase 2).

**Architecture:** Phase 1 adds a central `lib/affiliates.ts` config with Booking.com + Klook deeplinks per city, then injects CTA components into existing page templates. Phase 2 adds static Next.js pages that aggregate existing JSON data into high-volume pillar content.

**Tech Stack:** Next.js 14 Pages Router, TypeScript, Tailwind CSS, ISR (revalidate: 86400)

---

## Phase 1: Affiliate Integration

### Task 1: Create affiliate config

**Files:**
- Create: `lib/affiliates.ts`

**Step 1: Create the file**

```typescript
// lib/affiliates.ts

export interface CityAffiliates {
  booking: string;   // Booking.com search URL with affiliate tag
  klook: string;     // Klook search URL with affiliate tag
  getyourguide: string; // GetYourGuide search URL
}

// Replace AFFILIATE_ID placeholders with real IDs before deploy
const BOOKING_AFF = 'aid=BOOKING_AFFILIATE_ID';
const KLOOK_AFF = 'aid=KLOOK_AFFILIATE_ID';

export const cityAffiliates: Record<string, CityAffiliates> = {
  bangkok: {
    booking: `https://www.booking.com/city/th/bangkok.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Bangkok&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/bangkok-l169/',
  },
  'chiang-mai': {
    booking: `https://www.booking.com/city/th/chiang-mai.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Chiang+Mai&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/chiang-mai-l244/',
  },
  phuket: {
    booking: `https://www.booking.com/city/th/phuket.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Phuket&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/phuket-l244/',
  },
  krabi: {
    booking: `https://www.booking.com/city/th/krabi.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Krabi&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/krabi-l244/',
  },
  'koh-samui': {
    booking: `https://www.booking.com/city/th/koh-samui.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Koh+Samui&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/koh-samui-l244/',
  },
};

// Cities with affiliate links configured
export const affiliateCities = Object.keys(cityAffiliates);

export function getAffiliates(citySlug: string): CityAffiliates | null {
  return cityAffiliates[citySlug] ?? null;
}
```

**Step 2: Verify it compiles**

```bash
cd /home/marvin/Projecten/go2thailand.com && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to `lib/affiliates.ts`

**Step 3: Commit**

```bash
git add lib/affiliates.ts
git commit -m "feat: add affiliate config for top 5 cities"
```

---

### Task 2: AffiliateBox component

Reusable CTA box used on all subpages.

**Files:**
- Create: `components/AffiliateBox.tsx`

**Step 1: Create component**

```tsx
// components/AffiliateBox.tsx
import { CityAffiliates } from '../lib/affiliates';

interface AffiliateBoxProps {
  affiliates: CityAffiliates;
  cityName: string;
  type: 'hotels' | 'tours' | 'activities';
}

const config = {
  hotels: {
    heading: 'Book Your Hotel',
    bookingLabel: 'Search Hotels on Booking.com',
    klookLabel: null,
    gygLabel: null,
  },
  tours: {
    heading: 'Book Tours & Experiences',
    bookingLabel: null,
    klookLabel: 'Browse Tours on Klook',
    gygLabel: 'See Tours on GetYourGuide',
  },
  activities: {
    heading: 'Book This Activity',
    bookingLabel: null,
    klookLabel: 'Book on Klook',
    gygLabel: 'Book on GetYourGuide',
  },
};

export default function AffiliateBox({ affiliates, cityName, type }: AffiliateBoxProps) {
  const c = config[type];
  return (
    <div className="bg-thailand-blue/5 border border-thailand-blue/20 rounded-2xl p-6 my-6">
      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">{c.heading} in {cityName}</h3>
      <div className="flex flex-wrap gap-3">
        {c.bookingLabel && (
          <a
            href={affiliates.booking}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#003580] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#00224f] transition-colors"
          >
            {c.bookingLabel}
          </a>
        )}
        {c.klookLabel && (
          <a
            href={affiliates.klook}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#FF5722] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#e64a19] transition-colors"
          >
            {c.klookLabel}
          </a>
        )}
        {c.gygLabel && (
          <a
            href={affiliates.getyourguide}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#1B9E3E] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#157a30] transition-colors"
          >
            {c.gygLabel}
          </a>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        We may earn a commission at no extra cost to you. Prices shown are from partner sites.
      </p>
    </div>
  );
}
```

**Step 2: Verify it compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

**Step 3: Commit**

```bash
git add components/AffiliateBox.tsx
git commit -m "feat: add AffiliateBox component for affiliate CTAs"
```

---

### Task 3: Add affiliate CTA to hotels page

**Files:**
- Modify: `pages/city/[slug]/hotels.tsx`

**Step 1: Add imports at top of file (after existing imports)**

Add after the last import line:
```tsx
import AffiliateBox from '../../../components/AffiliateBox';
import { getAffiliates } from '../../../lib/affiliates';
```

**Step 2: Add affiliates to props interface**

Add to `CityHotelsPageProps`:
```tsx
affiliates: import('../../../lib/affiliates').CityAffiliates | null;
```

Actually, to avoid inline import, add at top level:
```tsx
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
```
And in props:
```tsx
interface CityHotelsPageProps {
  city: City;
  hotelData: CityHotelData | null;
  hasTop10Hotels: boolean;
  enhancedHotels: EnhancedHotel[];
  affiliates: CityAffiliates | null;
}
```

**Step 3: Render AffiliateBox in the page**

In the JSX, after the "Search & Book Hotels Widget" div (around line 157), add:
```tsx
{affiliates && (
  <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="hotels" />
)}
```

**Step 4: Pass affiliates from getStaticProps**

In `getStaticProps`, before `return { props: ... }`, add:
```tsx
const affiliates = getAffiliates(params.slug as string);
```

And in the return:
```tsx
return {
  props: {
    city,
    hotelData,
    hasTop10Hotels,
    enhancedHotels,
    affiliates,
  },
  revalidate: 86400,
};
```

**Step 5: Verify locally**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds, no TypeScript errors

**Step 6: Commit**

```bash
git add pages/city/[slug]/hotels.tsx
git commit -m "feat: add Booking.com affiliate CTA to city hotels pages"
```

---

### Task 4: Add affiliate CTA to top-10-attractions page

**Files:**
- Modify: `pages/city/[slug]/top-10-attractions.tsx`

**Step 1: Add imports**

```tsx
import AffiliateBox from '../../../components/AffiliateBox';
import { getAffiliates, CityAffiliates } from '../../../lib/affiliates';
```

**Step 2: Add to props interface**

```tsx
interface Top10AttractionsPageProps {
  city: City;
  attractionsData: Top10AttractionsData | null;
  affiliates: CityAffiliates | null;
}
```

**Step 3: Add AffiliateBox to JSX**

After the intro paragraph / before the attractions list, insert:
```tsx
{affiliates && (
  <AffiliateBox affiliates={affiliates} cityName={city.name.en} type="tours" />
)}
```

**Step 4: Pass affiliates from getStaticProps**

```tsx
const affiliates = getAffiliates(params.slug as string);
// add to return props
```

**Step 5: Verify + Commit**

```bash
npx tsc --noEmit && git add pages/city/[slug]/top-10-attractions.tsx && git commit -m "feat: add Klook/GYG affiliate CTAs to top-10-attractions pages"
```

---

### Task 5: Add affiliate CTAs to cooking-classes, elephant-sanctuaries, diving-snorkeling

Same pattern as Task 4. Apply to these three pages:
- `pages/city/[slug]/cooking-classes.tsx`
- `pages/city/[slug]/elephant-sanctuaries.tsx`
- `pages/city/[slug]/diving-snorkeling.tsx`

**Step 1: For each file, add imports + prop + AffiliateBox render + getStaticProps change**

Use `type="activities"` for all three.

**Step 2: Verify all three compile**

```bash
npx tsc --noEmit 2>&1 | head -30
```

**Step 3: Commit all three together**

```bash
git add pages/city/[slug]/cooking-classes.tsx pages/city/[slug]/elephant-sanctuaries.tsx pages/city/[slug]/diving-snorkeling.tsx
git commit -m "feat: add affiliate CTAs to activity pages (cooking, elephants, diving)"
```

---

## Phase 2: TOFU Pillar Pages

### Task 6: Thailand Travel Guide page

**Files:**
- Create: `pages/thailand-travel-guide.tsx`

**Step 1: Create the page**

```tsx
// pages/thailand-travel-guide.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllCities } from '../lib/cities';
import { getAllItineraries } from '../lib/itineraries';

interface TravelGuideProps {
  topCities: { slug: string; name: string; region: string }[];
  itineraryCount: number;
}

export default function ThailandTravelGuide({ topCities, itineraryCount }: TravelGuideProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Travel Guide', href: '/thailand-travel-guide/' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Thailand Travel Guide 2026: Everything You Need to Know',
    description: 'Complete Thailand travel guide 2026. Best cities, islands, itineraries, budget, visa, safety and first-timer tips.',
    url: 'https://go2-thailand.com/thailand-travel-guide/',
    author: { '@type': 'Organization', name: 'Go2 Thailand' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many days do you need in Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most travelers spend 10-14 days in Thailand to cover Bangkok, Chiang Mai, and the southern islands. 7 days is the minimum for a meaningful trip.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best time to visit Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'November to April is the dry season and best time to visit most of Thailand. Avoid May-October for the south, and June-October for the north.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Thailand cheap to travel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Budget travelers can get by on $30-50/day. Mid-range is $60-120/day. Street food costs $1-2, local transport is cheap, and budget guesthouses start at $10-15/night.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Thailand Travel Guide 2026 | Go2 Thailand"
        description="Complete Thailand travel guide for 2026. Best cities, islands, itineraries, budget tips, visa info and first-timer advice. Everything you need for your Thailand trip."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Thailand Travel Guide 2026
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for your Thailand trip — cities, islands, itineraries, budget, visa, and safety.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">

            {/* Quick navigation */}
            <nav className="bg-white rounded-2xl shadow-md p-6 mb-10">
              <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">In this guide</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {[
                  ['Best Cities', '#cities'],
                  ['Islands', '#islands'],
                  ['Itineraries', '#itineraries'],
                  ['Budget', '#budget'],
                  ['Best Time', '#best-time'],
                  ['Visa & Entry', '#visa'],
                  ['Safety', '#safety'],
                  ['First Timers', '#first-timers'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-thailand-blue hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Best Cities */}
            <section id="cities" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Best Cities in Thailand</h2>
              <p className="text-gray-600 mb-6">
                Thailand has 33 cities worth visiting, from the buzzing capital to quiet mountain towns and beach hubs.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}/`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow font-semibold text-thailand-blue"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <Link href="/best-places-to-visit-thailand/" className="text-thailand-blue hover:underline font-semibold">
                See all 33 destinations →
              </Link>
            </section>

            {/* Islands */}
            <section id="islands" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand Islands</h2>
              <p className="text-gray-600 mb-4">
                From the famous party island Koh Phangan to the diving paradise Koh Tao — Thailand has an island for every traveler.
              </p>
              <Link href="/islands/" className="text-thailand-blue hover:underline font-semibold">
                Explore all Thai islands →
              </Link>
            </section>

            {/* Itineraries */}
            <section id="itineraries" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand Itineraries</h2>
              <p className="text-gray-600 mb-4">
                We have {itineraryCount} ready-made itineraries ranging from 5 days to 4 weeks, covering every travel style.
              </p>
              <Link href="/itineraries/" className="text-thailand-blue hover:underline font-semibold">
                Browse all itineraries →
              </Link>
            </section>

            {/* Budget */}
            <section id="budget" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand on a Budget</h2>
              <p className="text-gray-600 mb-4">
                Thailand is one of the most affordable travel destinations in Southeast Asia. Here's what to expect:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Street food meal: $1–2</li>
                <li>Budget guesthouse: $10–20/night</li>
                <li>Local bus: $0.50–3</li>
                <li>Budget daily total: $30–50</li>
              </ul>
              <Link href="/thailand-index/budget/" className="text-thailand-blue hover:underline font-semibold">
                Full budget breakdown per city →
              </Link>
            </section>

            {/* Best Time */}
            <section id="best-time" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Best Time to Visit Thailand</h2>
              <p className="text-gray-600 mb-4">
                November to April is ideal for most of Thailand. Each region has its own weather patterns — the south is split into two coasts with opposite seasons.
              </p>
              <Link href="/thailand-index/best-time/" className="text-thailand-blue hover:underline font-semibold">
                Full month-by-month guide →
              </Link>
            </section>

            {/* Visa */}
            <section id="visa" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Visa & Entry</h2>
              <p className="text-gray-600 mb-4">
                Most nationalities get a 30-day visa exemption on arrival. Thailand also offers 60-day tourist visas and longer-stay options.
              </p>
              <Link href="/visa/" className="text-thailand-blue hover:underline font-semibold">
                Full visa guide →
              </Link>
            </section>

            {/* Safety */}
            <section id="safety" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Is Thailand Safe?</h2>
              <p className="text-gray-600 mb-4">
                Thailand is generally safe for tourists. Common risks include petty theft, scams, and traffic — not violent crime.
              </p>
              <Link href="/is-thailand-safe/" className="text-thailand-blue hover:underline font-semibold">
                Full safety guide →
              </Link>
            </section>

            {/* First timers */}
            <section id="first-timers" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">First Time in Thailand?</h2>
              <p className="text-gray-600 mb-4">
                First-timers often start with Bangkok (2-3 nights), then Chiang Mai (2-3 nights), then the south (islands, 4-7 nights). This covers the three distinct faces of Thailand.
              </p>
              <Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline font-semibold">
                First-timer guide →
              </Link>
            </section>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allCities = getAllCities();
  const topCities = allCities.slice(0, 12).map((c: any) => ({
    slug: c.slug,
    name: c.name?.en || c.name || c.slug,
    region: c.region || '',
  }));

  let itineraryCount = 14;
  try {
    const itineraries = getAllItineraries();
    itineraryCount = itineraries.length;
  } catch {}

  return {
    props: { topCities, itineraryCount },
    revalidate: 86400,
  };
};
```

**Step 2: Check if `getAllCities` and `getAllItineraries` exist**

```bash
grep -n "export function getAllCities\|export function getAllItineraries" lib/cities.js lib/itineraries.js lib/cities.ts lib/itineraries.ts 2>/dev/null
```

If `getAllItineraries` doesn't exist, remove that import and hardcode `itineraryCount = 14`.

**Step 3: Build check**

```bash
npm run build 2>&1 | tail -30
```

**Step 4: Commit**

```bash
git add pages/thailand-travel-guide.tsx
git commit -m "feat: add /thailand-travel-guide TOFU pillar page"
```

---

### Task 7: Best Places to Visit Thailand page

**Files:**
- Create: `pages/best-places-to-visit-thailand.tsx`

**Step 1: Create page**

```tsx
// pages/best-places-to-visit-thailand.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllCities } from '../lib/cities';

interface City {
  slug: string;
  name: string;
  region: string;
  description?: string;
}

interface PageProps {
  cities: City[];
}

const regionOrder = ['Central Thailand', 'Northern Thailand', 'Southern Thailand', 'Eastern Thailand', 'Western Thailand'];

export default function BestPlacesPage({ cities }: PageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Places to Visit', href: '/best-places-to-visit-thailand/' },
  ];

  const byRegion: Record<string, City[]> = {};
  for (const city of cities) {
    const r = city.region || 'Other';
    if (!byRegion[r]) byRegion[r] = [];
    byRegion[r].push(city);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Places to Visit in Thailand',
    numberOfItems: cities.length,
    itemListElement: cities.slice(0, 10).map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: city.name,
      url: `https://go2-thailand.com/city/${city.slug}/`,
    })),
  };

  return (
    <>
      <SEOHead
        title="Best Places to Visit in Thailand 2026 | Go2 Thailand"
        description={`Discover the ${cities.length} best places to visit in Thailand in 2026. From Bangkok and Chiang Mai to Phuket, Krabi, and hidden gems — find your perfect Thai destination.`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Best Places to Visit in Thailand
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {cities.length} destinations covered — from iconic cities to hidden gems, sorted by region.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {regionOrder.filter(r => byRegion[r]).map(region => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{region}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byRegion[region].map(city => (
                    <Link
                      key={city.slug}
                      href={`/city/${city.slug}/`}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{city.name}</h3>
                      {city.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">{city.description}</p>
                      )}
                      <span className="text-thailand-blue text-sm font-semibold mt-3 inline-block">
                        Explore {city.name} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allCities = getAllCities();
  const cities = allCities.map((c: any) => ({
    slug: c.slug,
    name: c.name?.en || c.name || c.slug,
    region: c.region || 'Other',
    description: c.categories?.overview?.en || c.description?.en || null,
  }));

  return {
    props: { cities },
    revalidate: 86400,
  };
};
```

**Step 2: Build check**

```bash
npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
git add pages/best-places-to-visit-thailand.tsx
git commit -m "feat: add /best-places-to-visit-thailand TOFU pillar page"
```

---

### Task 8: Is Thailand Safe page

**Files:**
- Create: `pages/is-thailand-safe.tsx`

**Step 1: Check what data exists in travel-security**

```bash
cat pages/travel-security/index.tsx | head -30
```

**Step 2: Create page**

```tsx
// pages/is-thailand-safe.tsx
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';

export default function IsThailandSafePage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Is Thailand Safe?', href: '/is-thailand-safe/' },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Thailand safe for tourists?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Thailand is generally safe for tourists. The main risks are petty theft, scams targeting tourists, and traffic accidents. Violent crime against tourists is rare.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Thailand safe for solo female travelers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Thailand is one of the more popular solo female travel destinations in Southeast Asia. Major cities and tourist areas are well-traveled and safe. Take normal precautions at night.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the biggest risks in Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The biggest risks are road accidents (especially on scooters), tourist scams (tuk-tuk scams, gem scams), petty theft in crowded areas, and jellyfish/sea creatures in certain coastal areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is tap water safe to drink in Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Do not drink tap water in Thailand. Bottled water is cheap and widely available (about 10 THB / $0.30 per 1.5L bottle).',
        },
      },
    ],
  };

  const risks = [
    {
      level: 'Low',
      color: 'bg-green-100 text-green-800',
      title: 'Violent crime',
      detail: 'Violent crime against tourists is rare. Thailand is not a high-risk country.',
    },
    {
      level: 'Medium',
      color: 'bg-yellow-100 text-yellow-800',
      title: 'Petty theft',
      detail: 'Pickpocketing in crowded markets and tourist areas. Keep valuables secure.',
    },
    {
      level: 'Medium',
      color: 'bg-yellow-100 text-yellow-800',
      title: 'Tourist scams',
      detail: 'Tuk-tuk scams, gem scams, fake travel agents. Stick to reputable operators.',
    },
    {
      level: 'High',
      color: 'bg-red-100 text-red-800',
      title: 'Traffic & scooters',
      detail: 'Road accidents are the #1 cause of tourist deaths in Thailand. Be very careful on scooters.',
    },
    {
      level: 'Low',
      color: 'bg-green-100 text-green-800',
      title: 'Natural disasters',
      detail: 'Tsunami risk exists on the Andaman coast but is rare. Monsoon flooding in some areas during rainy season.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Is Thailand Safe for Tourists? 2026 Safety Guide | Go2 Thailand"
        description="Is Thailand safe to visit in 2026? Honest safety guide covering crime, scams, traffic, health, solo travel, and what to watch out for. Updated March 2026."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Is Thailand Safe?
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Honest, up-to-date safety guide for Thailand in 2026. What to watch out for and what not to worry about.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
              <p className="text-green-800 font-semibold text-lg">
                Short answer: Yes, Thailand is safe for tourists. Millions of people visit every year without incident. The risks that do exist are manageable with basic awareness.
              </p>
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Safety Risk Overview</h2>
            <div className="space-y-4 mb-12">
              {risks.map((risk) => (
                <div key={risk.title} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${risk.color}`}>
                    {risk.level}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{risk.title}</h3>
                    <p className="text-gray-600 text-sm">{risk.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-6 mb-12">
              {faqJsonLd.mainEntity.map((item) => (
                <div key={item.name} className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface-cream rounded-2xl p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">More Thailand guides</h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">Thailand Travel Guide 2026</Link></li>
                <li><Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline">Thailand for First Timers</Link></li>
                <li><Link href="/visa/" className="text-thailand-blue hover:underline">Thailand Visa Guide</Link></li>
                <li><Link href="/travel-security/" className="text-thailand-blue hover:underline">Travel Security Tips</Link></li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  return { props: {}, revalidate: 86400 };
};
```

**Step 3: Commit**

```bash
git add pages/is-thailand-safe.tsx
git commit -m "feat: add /is-thailand-safe TOFU pillar page with FAQ schema"
```

---

### Task 9: Thailand for First Timers page

**Files:**
- Create: `pages/thailand-for-first-timers.tsx`

**Step 1: Create page**

Similar structure to `is-thailand-safe.tsx`. Key sections:
- The classic first-timer route: Bangkok → Chiang Mai → South islands
- What to know before you go (visa, SIM card, currency, language)
- Common first-timer mistakes
- FAQ schema (Is Thailand good for first-time travelers? What do I need for Thailand? etc.)
- Internal links to: `/thailand-travel-guide/`, `/itineraries/`, `/visa/`, `/esim/`, `/city/bangkok/`, `/city/chiang-mai/`

Use `getStaticProps` with `revalidate: 86400` returning empty props (static content).

**Step 2: Commit**

```bash
git add pages/thailand-for-first-timers.tsx
git commit -m "feat: add /thailand-for-first-timers TOFU pillar page"
```

---

### Task 10: Thailand Itinerary hub page

**Files:**
- Create: `pages/thailand-itinerary.tsx`

**Note:** `/itineraries/index.tsx` already exists as a list of itineraries. This new page is a richer **hub** with advice on how to plan a route, targeting keywords like "thailand itinerary" and "how to plan a thailand trip".

**Step 1: Create page**

Key sections:
- Popular itinerary lengths (7 days, 10 days, 2 weeks, 3 weeks)
- The classic route (Bangkok → north → south)
- Link grid to all existing itineraries from `/itineraries/index.tsx`
- Tips: how long in each region, what to skip on short trips
- FAQ schema

Fetch itinerary data from `getAllItineraries()` (same as `/itineraries/index.tsx`).

**Step 2: Commit**

```bash
git add pages/thailand-itinerary.tsx
git commit -m "feat: add /thailand-itinerary hub TOFU pillar page"
```

---

### Task 11: Add new pillar pages to sitemap

**Files:**
- Modify: `lib/sitemap.js`

**Step 1: Check how static pages are added to sitemap**

```bash
grep -n "travel-guide\|best-places\|pillar\|staticPages\|getStaticPaths\|thailand-index" lib/sitemap.js | head -20
```

**Step 2: Add the 5 new pages to the static pages array in sitemap.js**

Find the array where static pages like `/thailand-index/` are listed. Add:
```js
{ url: '/thailand-travel-guide/', priority: 0.9, changefreq: 'weekly' },
{ url: '/best-places-to-visit-thailand/', priority: 0.8, changefreq: 'weekly' },
{ url: '/is-thailand-safe/', priority: 0.8, changefreq: 'monthly' },
{ url: '/thailand-for-first-timers/', priority: 0.8, changefreq: 'monthly' },
{ url: '/thailand-itinerary/', priority: 0.8, changefreq: 'weekly' },
```

**Step 3: Verify sitemap builds**

```bash
npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
git add lib/sitemap.js
git commit -m "feat: add TOFU pillar pages to sitemap"
```

---

### Task 12: Internal links from homepage

**Files:**
- Modify: `pages/index.tsx`

**Step 1: Read the homepage**

```bash
head -50 pages/index.tsx
```

**Step 2: Add a "Travel Guides" section linking to the new pillar pages**

Find a good place in the homepage (e.g., after the city grid or before the blog section) and add:

```tsx
{/* Travel Guides */}
<section className="section-padding bg-white">
  <div className="container-custom">
    <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">Thailand Travel Guides</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { href: '/thailand-travel-guide/', label: 'Thailand Travel Guide 2026' },
        { href: '/best-places-to-visit-thailand/', label: 'Best Places to Visit' },
        { href: '/thailand-itinerary/', label: 'Thailand Itineraries' },
        { href: '/is-thailand-safe/', label: 'Is Thailand Safe?' },
        { href: '/thailand-for-first-timers/', label: 'First Timer Guide' },
        { href: '/thailand-index/', label: 'Thailand Index 2026' },
      ].map(({ href, label }) => (
        <Link key={href} href={href} className="bg-surface-cream rounded-xl p-5 font-semibold text-thailand-blue hover:shadow-md transition-shadow">
          {label} →
        </Link>
      ))}
    </div>
  </div>
</section>
```

**Step 3: Commit**

```bash
git add pages/index.tsx
git commit -m "feat: add pillar page links to homepage"
```

---

## Final verification

```bash
npm run build 2>&1 | tail -40
```

Expected: all pages compile, no TypeScript errors, build succeeds.

Then deploy:
```bash
git push origin main
```

Check Vercel deployment logs for any runtime errors.
