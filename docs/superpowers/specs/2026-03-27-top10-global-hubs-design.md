# Global Top-10 Hubs Design

**Date:** 2026-03-27

**Goal**

Upgrade the global `/top-10/`, `/top-10/attractions/`, `/top-10/restaurants/`, and `/top-10/hotels/` routes into indexable editorial hub pages that meet the same AdSense-safe and EEAT-oriented quality bar as the rebuilt city and city top-10 clusters.

## Product Intent

These pages should no longer behave like thin navigation or affiliate-forward landing pages. Each route should act as a real editorial hub that:

- helps users choose where to click next
- explains how to use the city-level guides well
- surfaces a curated set of strong city clusters
- makes sourcing visible
- strengthens internal linking without making unsupported Thailand-wide ranking claims

The hub pages should feel like “how to use our Thailand city top-10 coverage” rather than “our single definitive nationwide top 10.”

## Scope

### In scope

- `/top-10/`
- `/top-10/attractions/`
- `/top-10/restaurants/`
- `/top-10/hotels/`
- supporting shared logic used only by these hub pages

### Out of scope

- rewriting already-finished city top-10 pages unless a shared hub change exposes a real issue
- changing unrelated city pages
- adding new affiliate modules or promotional blocks
- creating Thailand-wide “best 10 in the whole country” ranking content

## Quality Bar

All hub pages must be:

- indexable
- non-thin
- clearly editorial
- source-backed where claims need support
- internally coherent with the rebuilt city top-10 clusters
- free of scrape-era marketing phrases such as “guest reviews,” “best deals,” “current rates,” “updated prices,” or “24/7 updated info” unless specifically supported and worth defending

They must also avoid:

- generic AI travel copy
- empty “tips” blocks with no specific planning value
- affiliate-first CTA placement that outruns the editorial value of the page
- overclaiming freshness or nationwide authority where the page is really a curated hub

## Recommended Information Architecture

### 1. `/top-10/` as the parent editorial hub

Purpose:

- explain what the three guide families are for
- route users into the right guide type
- introduce the strongest featured cities
- provide a full city index for onward navigation

Structure:

1. Hero with restrained editorial framing
2. “How to use these guides” section explaining attractions vs restaurants vs hotels
3. Three category blocks linking to the three child hub pages
4. Featured cities section with short, useful editorial summaries
5. Full city index grouped by region or presented A-Z
6. Sources and editorial references section

### 2. `/top-10/attractions/` as the attractions hub

Purpose:

- help users choose city attraction guides based on trip shape, not hype
- group cities by practical attraction patterns

Structure:

1. Hero with clear explanation that Thailand attraction planning works by city type and route logic
2. Featured cities section
3. Editorial sections such as:
   - heritage and old capitals
   - city-core temple and museum breaks
   - beach and island destinations
   - nature, viewpoints, and longer day-trip bases
4. Full city index
5. Sources and editorial references

### 3. `/top-10/restaurants/` as the restaurants hub

Purpose:

- guide users toward the right city food page by dining style and trip shape
- surface cities where MICHELIN, local classics, seafood, or market eating are the main planning value

Structure:

1. Hero with restrained food-planning framing
2. Featured cities section
3. Editorial sections such as:
   - MICHELIN-heavy and destination dining cities
   - local classics and market-led eating
   - seafood and coast-focused cities
   - cities where hotel dining is secondary, not the point
4. Full city index
5. Sources and editorial references

### 4. `/top-10/hotels/` as the hotels hub

Purpose:

- help users decide which city hotel guide fits their trip style
- frame area-fit and stay-shape decisions instead of pretending there is one nationwide ranking

Structure:

1. Hero with area-fit and trip-shape framing
2. Featured cities section
3. Editorial sections such as:
   - city-base stays
   - resort and beach stays
   - heritage and character stays
   - practical transit or short-stay bases
4. Full city index
5. Sources and editorial references

## Content Model

Each hub should use the same pattern:

### Hero

Must:

- state what the page helps with
- avoid brittle freshness claims
- avoid “best deals,” “guest reviews,” and similar scrape-era wording

Should not:

- imply nationwide ranking authority beyond the page’s actual editorial purpose
- promise precise current fees, rates, or hours across all cities

### Featured Cities

Show 6 to 10 featured cities near the top of each hub.

Each featured city card or block should include:

- city name
- short editorial reason the guide is worth opening
- one strong internal link to the relevant city top-10 page
- optional secondary internal link to the main city page when helpful

The featured set should be deliberate, not simply the first cities in the dataset.

### Editorial Sections

These sections are the main anti-thin layer.

They should:

- explain how to choose among cities
- group cities by clear planning logic
- link to the strongest city pages
- include sparse inline source links when making material claims

They should not:

- become long generic essays
- repeat the same sentence pattern across all hubs
- invent thin listicles inside the hub

### Full City Index

This is the comprehensive browse layer.

It should:

- expose all 33 cities
- use strong internal links only
- include minimal but useful context such as region or one short qualifier

It should not:

- drown the page in repetitive card boilerplate
- compete with the featured/editorial layer for prominence

### Sources and Editorial References

Each hub page should end with a compact visible source block.

This block should:

- contain clickable primary-source links
- usually include 5 to 12 sources
- focus on authoritative sources actually used in the page framing

Expected source types:

- Tourism Authority of Thailand
- UNESCO
- MICHELIN Guide
- official airport or transport authority pages
- official hotel and venue pages where relevant

## Source Strategy

### Hybrid source presentation

The hubs should use a hybrid citation model:

- inline links for material, unstable, or especially important claims
- compact source list at the bottom for the broader editorial framing

This is the recommended balance because:

- bottom-only sourcing is weak for EEAT signaling
- inline-only sourcing becomes noisy
- the combination keeps the pages credible and readable

### Fact-checking rule

Any materially unstable claim must be checked with web research before it is kept.

Examples:

- airport and transport positioning
- MICHELIN distinctions
- official operator status
- UNESCO or protected-site framing
- hotel brand and positioning claims

When a claim is too brittle to support cleanly, the page should use durable wording instead.

## Internal Linking Strategy

The hubs should improve internal linking in a controlled way.

Rules:

- every featured city section links to the strongest relevant city top-10 page
- category hubs can link back to `/top-10/`
- the parent `/top-10/` hub links into all three category hubs
- links to city pages are allowed when they materially help the user
- do not link to weak or thin support pages
- do not create link clutter by placing multiple low-value links in every card

Recommended priority:

1. relevant city top-10 page
2. parent or sibling hub page where useful
3. main city page only when it adds planning value

## SEO and Indexing

The hub pages should be indexable and intentionally optimized as editorial hubs.

Requirements:

- clean, non-hype titles and descriptions
- no `noindex`
- schema that fits collection/editorial hub pages without unsupported factual claims
- copy that makes clear these pages are curated entry points into city-level guides

Avoid:

- inflated “best in Thailand” phrasing unless the page is truly defending a nationwide ranking
- claims to exact current fees, hotel rates, or opening times across dozens of cities

## UX and Design Direction

The visual direction should remain consistent with the existing site but feel more deliberate and more editorial.

Requirements:

- featured cities above the full index
- clearer section hierarchy
- less badge noise
- less repeated card chrome
- no empty “smart tips” filler
- affiliate or widget components, if retained, must sit below strong editorial content rather than above it

The page should reward scanning while still reading like a real guide.

## Data and Implementation Shape

The existing page components already compute available city guides from `data/top10`.

Recommended implementation direction:

- keep the current data-loading pattern where possible
- introduce small page-specific editorial configuration objects rather than inventing a large new CMS layer
- if shared helpers are needed, keep them narrowly focused on:
  - featured city selection
  - region grouping
  - source list rendering
  - internal-link metadata

Avoid a heavy abstraction that hides the page content structure.

## Validation Requirements

Before any hub is considered complete:

- `npx tsc --noEmit` passes
- local route render checks pass for:
  - `/top-10/`
  - `/top-10/attractions/`
  - `/top-10/restaurants/`
  - `/top-10/hotels/`
- rendered HTML is checked for:
  - `TripAdvisor`
  - affiliate-heavy phrasing where it should no longer appear
  - `guest reviews`
  - `best deals`
  - `current prices`
  - `current rates`
  - `updated prices`
  - `24/7 updated info`
  - missing visible source signals
  - broken or weak internal linking

If shared components are changed, validation must cover all four hub routes again.

## Success Criteria

The project is successful when:

- the four global `/top-10/` pages are indexable editorial hubs
- they provide real planning value rather than thin navigation
- they use visible primary-source references
- they strengthen internal linking into the rebuilt city top-10 clusters
- they remove scrape-era trust theater and weak marketing claims
- they are defensible against AdSense and EEAT review as real content pages, not filler doorway pages

## Recommended Execution Order

1. Rewrite the parent `/top-10/` hub
2. Rewrite `/top-10/attractions/`
3. Rewrite `/top-10/restaurants/`
4. Rewrite `/top-10/hotels/`
5. Validate all four together

This order keeps the category framing coherent and makes it easier to align shared patterns across the four pages.
