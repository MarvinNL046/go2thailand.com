# Phuket Beaches & Thailand Street Food Pages — Design Spec

## Goal
Create two new SEO hub pages targeting low-KD, high-SV keywords from the Ahrefs gap analysis:
1. `/phuket-beaches/` — "phuket beaches" (SV 1.9K, KD 1)
2. `/thailand-street-food/` — "thailand street food" (SV 600, KD 7)

## Architecture
Both pages follow the established hub-page pattern (same as `thailand-islands.tsx`, `thailand-temples.tsx`):
- Data JSON in `data/` directory
- Single-file page component in `pages/`
- Locale-aware `getStaticProps` with fallback to English
- SEOHead + Breadcrumbs + schema.org structured data
- Interactive filters
- FAQ section with structured data
- Affiliate CTAs (Booking, Klook, 12Go)
- E-E-A-T first-person intro with real verified data

## Page 1: Phuket Beaches (`/phuket-beaches/`)

### Data: `data/phuket-beaches.json`
```typescript
interface BeachData {
  rank: number;
  name: string;           // "Patong Beach"
  thai_name: string;      // "หาดป่าตอง"
  coast: 'west' | 'east' | 'south' | 'north';
  vibe: string;           // "party", "family", "quiet", "snorkeling"
  crowd_level: string;    // "busy", "moderate", "quiet"
  best_for: string[];     // ["sunset", "water sports"]
  description: string;
  length: string;         // "3.5 km"
  access: string;         // how to get there
  nearby: string;         // nearby landmarks
  best_time: string;      // best months
  google_maps_query: string;
}
```

### Filters
- Coast: All / West Coast / East Coast / South
- Vibe: All / Family / Party / Quiet / Snorkeling

### SEO
- Title: "Phuket Beaches — 15 Best Beaches Ranked (2026)"
- H1: Same
- Target: "phuket beaches", "best beaches in phuket"

### Cross-links
- `/best-beaches-in-thailand/` (general Thailand beaches)
- `/city/phuket/` (Phuket city guide)
- `/thailand-islands/` (islands hub)

## Page 2: Thailand Street Food (`/thailand-street-food/`)

### Data: `data/street-food.json`
```typescript
interface DishData {
  rank: number;
  name: string;           // "Pad Thai"
  thai_name: string;      // "ผัดไทย"
  type: string;           // "noodles", "rice", "grilled", "soup", "dessert", "drink"
  price_range: string;    // "40-80 THB"
  spice_level: string;    // "mild", "medium", "hot"
  description: string;
  where_to_find: string;  // specific markets/streets
  best_cities: string[];  // ["Bangkok", "Chiang Mai"]
  key_facts: string[];
  google_maps_query: string;
}
```

### Filters
- Type: All / Noodles / Rice / Grilled / Soup / Dessert / Drink
- Spice: All / Mild / Medium / Hot

### SEO
- Title: "Thailand Street Food — 25 Must-Try Dishes & Prices (2026)"
- H1: Same
- Target: "thailand street food", "thai street food guide"

### Cross-links
- City restaurant pages (`/city/bangkok/top-10-restaurants/`)
- Nightlife pages (night markets)
- `/thailand-for-first-timers/`

## Shared Patterns
- Both use `SEOHead`, `Breadcrumbs`, `TripcomWidget`
- Both have schema.org `ItemList` + `FAQPage` + `BreadcrumbList`
- Both load locale-specific JSON with fallback
- Both have affiliate CTAs inserted mid-content
- Data is real, web-scraped, verified
