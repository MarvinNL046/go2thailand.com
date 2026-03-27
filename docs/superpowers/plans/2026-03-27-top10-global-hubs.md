# Global Top-10 Hubs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the four global `/top-10/` hub pages into indexable editorial hubs with stronger internal linking, visible source attribution, and no scrape-era marketing claims.

**Architecture:** Keep the existing Next.js pages-router entry points, but move the editorial structure into a small shared content/config layer so the four hubs stay consistent. Each page will use the shared guide data it already reads from `data/top10`, add deliberate featured-city and editorial-section groupings, expose visible source references, and remove unsupported freshness/review/deal claims and affiliate-forward filler.

**Tech Stack:** Next.js pages router, TypeScript, existing `SEOHead`, `Breadcrumbs`, `getAllCities`, local JSON-backed guide data in `data/top10`, local validation with `npx tsc --noEmit` and localhost render checks.

---

### Task 1: Create the shared hub editorial config

**Files:**
- Create: `lib/top10-hub-content.ts`

- [ ] **Step 1: Create typed source, featured-city, and section interfaces**

Add this structure to `lib/top10-hub-content.ts`:

```ts
export type Top10HubSlug = 'root' | 'attractions' | 'restaurants' | 'hotels';

export interface HubSourceLink {
  label: string;
  url: string;
  note: string;
}

export interface HubFeaturedCity {
  slug: string;
  kicker: string;
  summary: string;
  primaryHref: string;
  secondaryHref?: string;
}

export interface HubEditorialSection {
  title: string;
  description: string;
  citySlugs: string[];
  inlineSources?: HubSourceLink[];
}

export interface HubPageContent {
  title: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  whyThisPageTitle: string;
  whyThisPageBody: string;
  featuredCities: HubFeaturedCity[];
  sections: HubEditorialSection[];
  sourceLinks: HubSourceLink[];
}
```

- [ ] **Step 2: Add the parent `/top-10/` hub content**

In the same file, add a `rootHubContent` object with:

```ts
export const rootHubContent: HubPageContent = {
  title: 'Thailand Top-10 Guides 2026 | Editorial Hub',
  description:
    'Use our Thailand top-10 hubs to choose the right city guides for attractions, restaurants, and hotels without generic rankings or scrape-era filler.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Top-10 Guides',
  heroIntro:
    'These hubs are built to help you choose the right city-level guide, not to pretend the whole country fits inside one nationwide top-10 list.',
  whyThisPageTitle: 'How To Use These Guides',
  whyThisPageBody:
    'Start with the category that matches the decision you are making, then open the strongest city cluster for the actual shortlist and source-backed planning detail.',
  featuredCities: [
    {
      slug: 'bangkok',
      kicker: 'Best for depth',
      summary: 'Bangkok is still the strongest all-round starting point when you want serious coverage across attractions, restaurants, and hotels.',
      primaryHref: '/city/bangkok/top-10-attractions/',
      secondaryHref: '/city/bangkok/'
    }
  ],
  sections: [],
  sourceLinks: [
    {
      label: 'Tourism Authority of Thailand',
      url: 'https://www.tourismthailand.org/',
      note: 'Used as the primary destination framework across the hub layer.'
    }
  ]
};
```

Keep the real file populated with the full approved city set and source list, not just the single example above.

- [ ] **Step 3: Add page-specific content objects for attractions, restaurants, and hotels**

Add three more exported content objects:

```ts
export const attractionsHubContent: HubPageContent = {
  title: 'Thailand Attraction Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand attraction guides, with featured cities, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Attraction Guides',
  heroIntro:
    'Use this hub to choose the right city attraction guide by trip shape, not by generic nationwide hype.',
  whyThisPageTitle: 'How To Choose The Right City',
  whyThisPageBody:
    'Heritage cities, beach destinations, city-core temple breaks, and long day-trip bases all work differently, so the hub should route users into the right city cluster first.',
  featuredCities: [],
  sections: [],
  sourceLinks: []
};

export const restaurantsHubContent: HubPageContent = {
  title: 'Thailand Restaurant Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand restaurant guides, with featured food cities, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Restaurant Guides',
  heroIntro:
    'Use this hub to choose the city food guide that fits your trip, from MICHELIN-heavy dining cities to market-led and coastal seafood bases.',
  whyThisPageTitle: 'How To Choose The Right Food City',
  whyThisPageBody:
    'This page should route users by dining style and trip shape instead of pretending there is one nationwide restaurant ranking that works for every traveler.',
  featuredCities: [],
  sections: [],
  sourceLinks: []
};

export const hotelsHubContent: HubPageContent = {
  title: 'Thailand Hotel Guides 2026 | Editorial Hub',
  description:
    'Editorial hub for Thailand hotel guides, with featured stay bases, strong internal linking, and visible source-backed references.',
  heroEyebrow: 'Editorial Hub',
  heroTitle: 'Thailand Hotel Guides',
  heroIntro:
    'Use this hub to find the right city hotel guide by stay shape: city base, beach resort, heritage stay, or practical short stop.',
  whyThisPageTitle: 'How To Choose The Right Stay Base',
  whyThisPageBody:
    'The goal is to help users move into the right city-level hotel guide, not to push a fake nationwide “best hotels” leaderboard.',
  featuredCities: [],
  sections: [],
  sourceLinks: []
};
```

Each object must include:

- 6 to 10 featured cities
- 4 to 6 editorial sections
- bottom-of-page source links
- wording that avoids `current prices`, `current rates`, `guest reviews`, `best deals`, and `24/7 updated info`

- [ ] **Step 4: Export a lookup map**

At the bottom of `lib/top10-hub-content.ts`, add:

```ts
export const top10HubContentBySlug: Record<Top10HubSlug, HubPageContent> = {
  root: rootHubContent,
  attractions: attractionsHubContent,
  restaurants: restaurantsHubContent,
  hotels: hotelsHubContent
};
```

- [ ] **Step 5: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code `0`

- [ ] **Step 6: Commit the shared content layer**

Run:

```bash
git add lib/top10-hub-content.ts
git commit -m "Add global top-10 hub editorial content"
```

Expected: one commit containing only the new shared hub config.

### Task 2: Rebuild the parent `/top-10/` hub

**Files:**
- Modify: `pages/top-10/index.tsx`
- Modify: `lib/top10-hub-content.ts`

- [ ] **Step 1: Replace the thin SEO copy and unsupported freshness claims**

Update the `SEOHead` block in `pages/top-10/index.tsx` so it resembles:

```tsx
<SEOHead
  title="Thailand Top-10 Guides 2026 | Editorial Hub | Go2Thailand"
  description="Editorial hub for Thailand top-10 attraction, restaurant, and hotel guides, with featured cities, strong internal linking, and visible source-backed references."
>
  <meta
    name="keywords"
    content="Thailand top 10 guides, Thailand attraction guides, Thailand restaurant guides, Thailand hotel guides"
  />
</SEOHead>
```

Remove references to `Current prices`, `opening hours`, and `insider tips included` from the page-level sales framing.

- [ ] **Step 2: Replace the “What Makes Our Guides Special” and affiliate-heavy lower section with editorial content**

Rewrite the page body to include:

```tsx
<section className="bg-white rounded-2xl shadow-md p-8 mb-12">
  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
    How To Use These Guides
  </h2>
  <p className="text-gray-600 max-w-3xl">
    Start with the guide family that matches the decision you are making, then open a city page for the actual shortlist and source-backed context.
  </p>
</section>
```

Then add:

- a featured-cities grid driven by `rootHubContent.featuredCities`
- a compact region or A-Z city index
- a visible source section driven by `rootHubContent.sourceLinks`

Delete the existing `Book Your Thailand Experience` affiliate block entirely from this page.

- [ ] **Step 3: Add strong internal links only**

Ensure every featured city card links to:

```tsx
<Link href={featured.primaryHref} className="group block">
  <div className="bg-white rounded-2xl shadow-md p-6">
    <div className="text-sm font-semibold text-thailand-red mb-2">{featured.kicker}</div>
    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{city.name.en}</h3>
    <p className="text-gray-600">{featured.summary}</p>
  </div>
</Link>
```

Only render `secondaryHref` when it exists and adds value.

- [ ] **Step 4: Validate the route and rendered HTML**

Run:

```bash
npx tsc --noEmit
curl -s http://127.0.0.1:3010/top-10/ > /tmp/top10-root.html
rg -n -F -e 'Current prices' -e 'guest reviews' -e 'best deals' -e '24/7 updated info' -e 'TripAdvisor' -e 'tpo.lv' /tmp/top10-root.html
```

Expected:

- `npx tsc --noEmit` exits `0`
- `curl` writes HTML successfully
- `rg` returns no matches

- [ ] **Step 5: Commit the parent hub**

Run:

```bash
git add pages/top-10/index.tsx lib/top10-hub-content.ts
git commit -m "Rebuild top-10 editorial hub"
```

Expected: one commit covering the root hub rewrite.

### Task 3: Rebuild `/top-10/attractions/`

**Files:**
- Modify: `pages/top-10/attractions.tsx`
- Modify: `lib/top10-hub-content.ts`

- [ ] **Step 1: Replace the hero and badge layer with editorial framing**

Change the hero block so it follows the approved design:

```tsx
<section className="bg-surface-dark text-white">
  <div className="container-custom py-16">
    <div className="text-center max-w-4xl mx-auto">
      <span className="font-script text-thailand-gold text-lg mb-2 block">
        Editorial Hub
      </span>
      <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
        Thailand Attraction Guides
      </h1>
      <p className="text-xl lg:text-2xl mb-8 opacity-90">
        Use this hub to choose the right city attraction guide by trip shape, not by generic nationwide hype.
      </p>
    </div>
  </div>
</section>
```

Remove the existing trust badges that say `Current Info` and `Updated Prices`.

- [ ] **Step 2: Replace filler tip blocks and affiliate CTA with editorial sections**

Delete:

- the `Smart Visitor Tips` section
- the `Book Tickets & Tours` affiliate block

Replace them with:

```tsx
{attractionsHubContent.sections.map((section) => (
  <section key={section.title} className="bg-white rounded-2xl shadow-md p-8 mb-8">
    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">
      {section.title}
    </h2>
    <p className="text-gray-600 mb-4">{section.description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.citySlugs.map((slug) => (
        <Link key={slug} href={`/city/${slug}/top-10-attractions/`} className="text-thailand-blue hover:underline">
          View {slug} attraction guide
        </Link>
      ))}
    </div>
  </section>
))}
```

- [ ] **Step 3: Make the city grid a full browse index instead of a pseudo-freshness list**

Update the guide cards so:

- `has_current_data` no longer renders as `Current Info`
- card metadata is kept factual and restrained
- internal links point only to `/city/[slug]/top-10-attractions/`

Recommended badge removal:

```tsx
{false && guide.has_current_data && <span>Current Info</span>}
```

Replace the badge logic entirely rather than leaving dead UI behind.

- [ ] **Step 4: Add visible source references near the bottom**

Render a bottom source block:

```tsx
<section className="bg-white rounded-2xl shadow-md p-8">
  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
    Sources and Editorial References
  </h2>
  <ul className="space-y-3">
    {attractionsHubContent.sourceLinks.map((source) => (
      <li key={source.url}>
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {source.label}
        </a>
      </li>
    ))}
  </ul>
</section>
```

- [ ] **Step 5: Validate the attractions hub**

Run:

```bash
npx tsc --noEmit
curl -s http://127.0.0.1:3010/top-10/attractions/ > /tmp/top10-attractions-hub.html
rg -n -F -e 'Current Info' -e 'Updated Prices' -e 'TripAdvisor' -e 'tpo.lv' -e 'getyourguide' -e 'Klook' /tmp/top10-attractions-hub.html
```

Expected: exit code `0` for TypeScript and no `rg` matches.

- [ ] **Step 6: Commit the attractions hub rewrite**

Run:

```bash
git add pages/top-10/attractions.tsx lib/top10-hub-content.ts
git commit -m "Rebuild top-10 attractions hub"
```

Expected: one commit covering the attractions hub rewrite.

### Task 4: Rebuild `/top-10/restaurants/`

**Files:**
- Modify: `pages/top-10/restaurants.tsx`
- Modify: `lib/top10-hub-content.ts`

- [ ] **Step 1: Replace the hero and stats copy**

Update the page-level copy to remove:

- `Current 2026 Data`
- `Local Prices`
- `Updated Info`
- `latest pricing and insider tips`

Use editorial wording such as:

```tsx
<p className="text-xl lg:text-2xl mb-8 opacity-90">
  Use this hub to choose the city food guide that fits your trip, from MICHELIN-heavy dining cities to market-led and coastal seafood bases.
</p>
```

- [ ] **Step 2: Remove the affiliate-forward food-experience block**

Delete the `Book a Food Experience in Thailand` CTA section completely.

Replace it with restaurant editorial sections:

```tsx
{restaurantsHubContent.sections.map((section) => (
  <section key={section.title} className="bg-white rounded-2xl shadow-md p-8 mb-8">
    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">
      {section.title}
    </h2>
    <p className="text-gray-600 mb-4">{section.description}</p>
  </section>
))}
```

- [ ] **Step 3: Keep featured cities but make them editorial rather than “popular”**

Replace the current `Featured Restaurant Guides` framing with copy that explains why the featured cities earn attention.

Use `restaurantsHubContent.featuredCities` rather than the hardcoded popularity framing.

- [ ] **Step 4: Add visible source references**

At the bottom of the page, render `restaurantsHubContent.sourceLinks`, including MICHELIN and official restaurant or tourism references where used.

- [ ] **Step 5: Validate the restaurants hub**

Run:

```bash
npx tsc --noEmit
curl -s http://127.0.0.1:3010/top-10/restaurants/ > /tmp/top10-restaurants-hub.html
rg -n -F -e 'Current 2026 Data' -e 'Local Prices' -e 'Updated Info' -e 'TripAdvisor' -e 'tpo.lv' -e 'Klook' -e 'GetYourGuide' /tmp/top10-restaurants-hub.html
```

Expected: exit code `0` for TypeScript and no `rg` matches.

- [ ] **Step 6: Commit the restaurants hub rewrite**

Run:

```bash
git add pages/top-10/restaurants.tsx lib/top10-hub-content.ts
git commit -m "Rebuild top-10 restaurants hub"
```

Expected: one commit covering the restaurants hub rewrite.

### Task 5: Rebuild `/top-10/hotels/`

**Files:**
- Modify: `pages/top-10/hotels.tsx`
- Modify: `lib/top10-hub-content.ts`

- [ ] **Step 1: Remove unsupported hotel claims from hero and stats**

Delete or replace:

- `Current Rates`
- `Best Deals`
- `With Current Rates`
- `Updated Info`
- `Compare rates across top booking platforms and find the best deal`

Use area-fit wording like:

```tsx
<p className="text-xl lg:text-2xl mb-8 opacity-90">
  Use this hub to find the right city hotel guide by stay shape: city base, beach resort, heritage stay, or practical short stop.
</p>
```

- [ ] **Step 2: Remove the booking-platform CTA block**

Delete the `Book Your Hotel in Thailand` affiliate block from this hub page.

Replace it with editorial hotel sections sourced from `hotelsHubContent.sections`.

- [ ] **Step 3: Replace the booking-tips filler with real editorial sections**

Delete the current `Smart Booking Tips` card section.

Add sections that explain:

- city-base stays
- resort-heavy beach stays
- heritage stays
- transit and short-stay bases

Each section must link to the strongest matching city guides rather than stay generic.

- [ ] **Step 4: Add source references and keep links factual**

Render `hotelsHubContent.sourceLinks` at the bottom.

Where source links are rendered:

```tsx
<a
  href={source.url}
  target="_blank"
  rel="noopener noreferrer"
  className="text-thailand-blue hover:underline"
>
  {source.label}
</a>
```

Use official hotel or brand sources where relevant.

- [ ] **Step 5: Validate the hotels hub**

Run:

```bash
npx tsc --noEmit
curl -s http://127.0.0.1:3010/top-10/hotels/ > /tmp/top10-hotels-hub.html
rg -n -F -e 'Current Rates' -e 'Best Deals' -e 'guest reviews' -e 'Booking.com' -e 'Trip.com' -e 'tpo.lv' /tmp/top10-hotels-hub.html
```

Expected: exit code `0` for TypeScript and no `rg` matches.

- [ ] **Step 6: Commit the hotels hub rewrite**

Run:

```bash
git add pages/top-10/hotels.tsx lib/top10-hub-content.ts
git commit -m "Rebuild top-10 hotels hub"
```

Expected: one commit covering the hotels hub rewrite.

### Task 6: Final cross-hub validation and cleanup

**Files:**
- Modify: `pages/top-10/index.tsx`
- Modify: `pages/top-10/attractions.tsx`
- Modify: `pages/top-10/restaurants.tsx`
- Modify: `pages/top-10/hotels.tsx`
- Modify: `lib/top10-hub-content.ts`

- [ ] **Step 1: Run full TypeScript and render validation**

Run:

```bash
npx tsc --noEmit
curl -s http://127.0.0.1:3010/top-10/ > /tmp/top10-root.html
curl -s http://127.0.0.1:3010/top-10/attractions/ > /tmp/top10-attractions-hub.html
curl -s http://127.0.0.1:3010/top-10/restaurants/ > /tmp/top10-restaurants-hub.html
curl -s http://127.0.0.1:3010/top-10/hotels/ > /tmp/top10-hotels-hub.html
```

Expected: TypeScript exits `0` and all four pages render.

- [ ] **Step 2: Run final leak scans across all four rendered pages**

Run:

```bash
rg -n -F \
  -e 'TripAdvisor' \
  -e 'guest reviews' \
  -e 'best deals' \
  -e 'current prices' \
  -e 'current rates' \
  -e 'updated prices' \
  -e '24/7 updated info' \
  -e 'tpo.lv' \
  -e 'getyourguide' \
  -e 'klook' \
  /tmp/top10-root.html \
  /tmp/top10-attractions-hub.html \
  /tmp/top10-restaurants-hub.html \
  /tmp/top10-hotels-hub.html
```

Expected: no matches.

- [ ] **Step 3: Confirm visible source signals and strong internal linking**

Run:

```bash
rg -n -F -e 'Sources and Editorial References' -e 'reviewed_by' /tmp/top10-root.html /tmp/top10-attractions-hub.html /tmp/top10-restaurants-hub.html /tmp/top10-hotels-hub.html
```

Expected: each page shows a visible source or editorial-trust signal.

- [ ] **Step 4: Commit the final cleanup pass**

Run:

```bash
git add pages/top-10/index.tsx pages/top-10/attractions.tsx pages/top-10/restaurants.tsx pages/top-10/hotels.tsx lib/top10-hub-content.ts
git commit -m "Finish global top-10 hub upgrade"
```

Expected: final cleanup commit after cross-hub verification.
