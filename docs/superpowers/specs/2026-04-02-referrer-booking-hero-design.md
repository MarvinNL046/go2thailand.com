# Referrer-Aware Booking Hero CTA

**Date:** 2026-04-02
**Goal:** Show a prominent, contextual booking CTA to search engine visitors on high-intent pages to convert organic traffic into affiliate bookings.

## How It Works

1. **Detect referrer** — `document.referrer` checked against known search engines (google, bing, duckduckgo, yahoo, ecosia, chatgpt)
2. **Detect page intent** — URL path + slug keywords checked for booking intent (city, hotels, transport, food/market)
3. **Search engine + booking intent** → prominent hero CTA with booking widget/button
4. **Direct visitor + booking intent** → subtle inline CTA (smaller, less prominent)
5. **No booking intent** (visa, practical info) → nothing rendered

## Component: BookingHeroCTA

**File:** `components/BookingHeroCTA.tsx`

**Props:**
```tsx
interface BookingHeroCTAProps {
  slug: string;           // page slug for intent detection
  category?: string;      // blog post category
  tags?: string[];        // blog post tags
  cityName?: string;      // for city-specific CTAs like "Find Hotels in Bangkok"
  citySlug?: string;      // for city-specific affiliate subids
  pageType: 'blog' | 'city' | 'transport';
}
```

### Referrer Detection

Client-side check on mount:
```
const ref = document.referrer.toLowerCase();
const isSearchEngine = /google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|chatgpt\./.test(ref);
```

### Intent → CTA Mapping

Uses same keyword detection pattern as AffiliateContextSidebar:

| Intent | Keywords | CTA text | Affiliate | Style |
|---|---|---|---|---|
| Hotels/stay | "hotel", "where-to-stay", "neighborhood", "accommodation" | "Find Hotels in {city}" | Trip.com + Booking.com | Search widget prominent |
| Transport | route pattern "to-", "transport", "flight", "train" | "Book Your Ticket" | 12Go | Button prominent |
| Food/activities | "market", "food", "restaurant", "cooking", "tour" | "Book a Food Tour" | Klook | Button prominent |
| Beach/island | "beach", "island", "diving", "snorkel" | "Book Island Activities" | Klook | Button prominent |
| City page (default) | `/city/*` path | "Find Hotels in {city}" | Trip.com | Search widget prominent |
| Blog (generic intent) | Other blog posts with some intent signal | "Plan Your Thailand Trip" | Trip.com generic | Button subtle |

### Visual Variants

**Prominent (search engine visitors):**
- Full-width bar below hero/breadcrumbs
- Background: `bg-gradient-to-r from-thailand-blue to-thailand-blue/80`
- White text, large CTA button or embedded Trip.com widget
- Subtext with value prop ("Compare 2,000+ hotels from $12/night")
- Dismiss X button (top-right)

**Subtle (direct/returning visitors):**
- Compact single-line bar
- Background: `bg-surface-cream`
- Muted text with inline link/button
- Dismiss X button

### Dismissable

- X button closes the banner
- Stores `bookingHeroDismissed=true` in `sessionStorage`
- On mount, checks sessionStorage — if dismissed, renders nothing
- Resets per session (new session = banner shows again)

## Integration Points

### pages/blog/[slug].tsx
Insert `<BookingHeroCTA>` after breadcrumbs section, before main content grid.
Props: `slug={post.slug}`, `category={post.category}`, `tags={post.tags}`, `pageType="blog"`

### pages/city/[slug]/index.tsx
Insert `<BookingHeroCTA>` after hero section, before content.
Props: `slug={city.slug}`, `cityName={city.name.en}`, `citySlug={city.slug}`, `pageType="city"`

### pages/transport/[route].tsx
Insert `<BookingHeroCTA>` after breadcrumbs, before h1.
Props: `slug={route.slug}`, `cityName={toCity.name.en}`, `citySlug={toCity.slug}`, `pageType="transport"`

## What Does NOT Change

- Existing sidebar affiliates (AffiliateContextSidebar)
- Inline engagement CTAs (InlineEngagementCTAs)
- Content bridges (ContentBridge)
- Blog pipeline
- Pages without booking intent (visa, practical info) — no hero CTA

## Affiliate Links

Same links as existing setup:
- Trip.com: `https://trip.tpo.lv/TmObooZ5?subid=hero-{intent}`
- Booking.com: `https://booking.tpo.lv/2PT1kR82?subid=hero-{intent}`
- 12Go: `https://12go.tpo.lv/tNA80urD?subid=hero-transport`
- Klook: `https://klook.tpo.lv/7Dt6WApj?subid=hero-{intent}`

Subid includes "hero-" prefix to track conversions from this specific feature.

## Success Criteria

- Search engine visitors see relevant booking CTA on high-intent pages
- Direct visitors see subtle version (not annoying)
- Dismissable per session
- CR2 improvement trackable via "hero-" subid prefix in Travelpayouts
- No CLS (Cumulative Layout Shift) — component reserves height on mount
