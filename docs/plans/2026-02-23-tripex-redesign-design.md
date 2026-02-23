# Go2Thailand.com Complete Redesign — Tripex-Style

**Date:** 2026-02-23
**Status:** Approved
**Reference template:** [Tripex](https://html.pixelfit.agency/tripex/index.html) by Pixelfit

## Summary

Full visual redesign of go2thailand.com, adopting the modern premium travel aesthetic of the Tripex template while keeping the existing Next.js 14 + Tailwind CSS stack, all routes/URLs, data pipelines, SEO markup, and i18n structure intact.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tech stack | Keep Next.js + Tailwind CSS | No migration risk, preserve SEO/ISR |
| Color palette | Keep thailand-red / thailand-blue | Brand continuity |
| Scope | Complete redesign — all elements | User wants 2026 look, not 2005 |
| Rollout | Phased per page-type | Lower risk, incremental improvements |

## Design System Changes

### 1. Typography

- **Font:** Switch from Inter to a pairing: **DM Sans** (headings) + **Inter** (body). DM Sans gives the modern, rounded feel Tripex has.
- **Section labels:** Cursive/script font above section headings (e.g. *"Popular Destinations"*). Use a Google Font like **Dancing Script** or **Kalam** at 18-20px, in thailand-red color.
- **Heading sizes:** Scale up significantly:
  - Hero h1: `text-5xl lg:text-7xl` (currently text-4xl lg:text-5xl)
  - Section h2: `text-3xl lg:text-5xl` (currently text-2xl lg:text-3xl)
  - Card h3: `text-xl lg:text-2xl`
- **Spacing:** Increase section padding from `py-12 lg:py-16` to `py-16 lg:py-24`

### 2. Color Adjustments

Keep the base palette but add warmth and depth:

```
thailand-red:    #ED1C24 (unchanged — primary CTA, accents)
thailand-blue:   #2D2A4A (unchanged — dark sections, nav)
accent-gold:     #FFD700 → adjust to warmer #F5A623 (muted amber)
surface-cream:   #FDF8F3 (new — warm off-white background, replaces gray-50)
surface-dark:    #1A1A2E (new — dark section backgrounds)
text-body:       #4A4A4A (softer than current gray-700)
text-muted:      #8A8A8A
success-green:   #22C55E (for badges, ratings)
```

### 3. Cards — CityCard Redesign

**Current:** Rectangular image, region badge, highlight tags, 4 action buttons. Busy.

**New (Tripex-inspired):**
- Rounded-xl image with `object-cover`, duration/badge overlay in bottom-right
- Star rating + review count below image
- City name as bold h3, province below in muted text with location pin icon
- Short description (1 line)
- Bottom bar with 3 info pills: `Attractions: 15` | `Hotels: 10` | `Restaurants: 8`
- Single CTA button: "Explore City" with arrow icon
- Hover: card lifts with shadow-xl, image scales 1.05

### 4. Decorative Elements

Add hand-drawn SVG illustrations as section decorations:
- **Airplane + dotted path:** Between hero and destinations
- **Palm tree:** Next to about/feature sections
- **Hot air balloon:** Hero area floating element
- **Clouds:** Light sketchy clouds in hero background
- **Compass/map pin:** Near transport/location sections

These are lightweight SVGs placed as `absolute` positioned decorative elements with low opacity. They add the "travel vibe" without impacting performance.

### 5. Hero Section Redesign

**Current:** Full-width background slideshow with centered text overlay. Functional but generic.

**New:**
- Split layout: Left side text, right side large travel image (like Tripex)
- Cream/warm background instead of dark overlay
- Bold heading with inline decorative image (small circular inset photo)
- Stats counter below hero text: "33+ Cities | 10 Islands | 100+ Attractions"
- Overlapping search/filter bar at bottom of hero (destination dropdown, activity type, region filter)
- Decorative SVGs floating (airplane, clouds, hot air balloon)

### 6. Section Patterns

Alternate between:
1. **White/cream sections** — standard content
2. **Dark sections** (thailand-blue/surface-dark) — for featured content, stats, CTAs
3. **Colored accent sections** — light red or light blue tint for testimonials/blog

Each section gets:
- Script-font label above heading (e.g. *"Top Destinations"*)
- Larger heading with occasional colored/highlighted word
- More vertical padding (py-16 lg:py-24)
- Optional decorative SVGs

### 7. Header Redesign

**Current:** Solid white, red bottom border, many nav items cramped.

**New:**
- Transparent on hero (white text), becomes solid white on scroll (with shadow)
- Logo left, nav center, CTA + language right
- Cleaner dropdown styling with backdrop blur
- Remove the red bottom border — use shadow-sm instead on solid state
- Mobile: full-screen overlay menu (not slide-in)

### 8. Footer Redesign

**Current:** 7-column grid, gray-900 background, dense links.

**New:**
- 4-column layout: Brand/contact | Quick Links | Resources | Newsletter
- Cleaner spacing with larger text
- Newsletter email input with "Subscribe" button
- Social media icons in rounded squares
- Large decorative brand text ("Go2Thailand" in huge outlined letters)
- Bottom bar: copyright left, policy links right

### 9. Animations

Add scroll-triggered animations using CSS `@keyframes` + Intersection Observer (no library needed, we already have FadeInText component):

- **fade-up:** Cards, section content (staggered 100ms delay per item)
- **fade-in:** Images, decorative elements
- **counter-up:** Stats numbers (animate from 0 to target)
- **slide-in-left/right:** About section split layouts

Keep animations subtle (300-500ms, ease-out). Respect `prefers-reduced-motion`.

### 10. Specific Page Designs

#### Homepage
1. Hero (split layout + search bar)
2. Stats counter bar
3. Popular Destinations (circular image carousel/grid)
4. About Us / Why Go2Thailand (split: image left, text right)
5. Featured Cities (new CityCard grid, 3-col)
6. Popular Activities (icon grid + travel images)
7. Thai Food section (keep but restyle cards)
8. Regions (keep 4-card grid but add hover overlays)
9. Testimonials/Trust signals
10. Blog preview (3-col card grid)
11. Pre-footer CTA banner
12. Footer

#### City Index Page
- Hero banner with title + breadcrumbs
- Region filter tabs (styled as pill buttons)
- City cards in 3-col grid with new card design
- Decorative elements between sections

#### City Detail Page
- Hero with city image + gradient overlay
- Quick stats bar (attractions, hotels, restaurants, transport routes)
- Tabbed or sectioned content with new card styles
- Sidebar with Tripex-style "Explore More" cards

## What Does NOT Change

- All existing routes and URLs (zero SEO impact)
- Data pipelines (comparisons, transport, top-10, blog, cron jobs)
- JSON-LD structured data / schema markup
- Affiliate links and booking widgets (Trip.com, Klook, etc.)
- i18n structure (8 languages)
- ISR revalidation timing
- Content data files (data/*.json, data/enhanced/*.json)
- Blog pipeline (content/blog/*, lib/blog.js)

## Rollout Phases

### Phase 1: Foundation (Header + Footer + Design Tokens + Globals)
- Update tailwind.config.js with new fonts, colors, spacing
- Create decorative SVG component library
- Redesign Header component (transparent→solid scroll behavior)
- Redesign Footer component (4-col + newsletter + brand text)
- Update globals.css (new utility classes, animation keyframes)
- Add AOS-style scroll animation hook/component
- **Impact:** Entire site gets new chrome immediately

### Phase 2: Homepage
- Complete homepage redesign following section plan above
- New hero with split layout
- New CityCard component
- Stats counter, activities, testimonials sections
- **Impact:** Main landing page modernized

### Phase 3: City Index + CityCard
- Redesign /city/ listing page
- New filter UI with pill-style region tabs
- Apply new CityCard everywhere it's used
- **Impact:** ~33 city cards look modern

### Phase 4: City Detail Pages
- Redesign /city/[slug]/index.tsx
- New hero, quick stats, content sections
- Modern sidebar design
- **Impact:** 33 city pages

### Phase 5: Top-10 Pages (restaurants, hotels, attractions)
- Restyle ranking cards
- New sidebar design
- **Impact:** ~99 pages

### Phase 6: Compare + Transport Pages
- Card-style redesign for comparison tables
- Transport route page modernization
- **Impact:** ~818 pages

### Phase 7: Blog, Islands, Remaining Pages
- Blog listing + detail page redesign
- Island pages
- Utility pages (esim, insurance, weather, etc.)
- **Impact:** All remaining pages
