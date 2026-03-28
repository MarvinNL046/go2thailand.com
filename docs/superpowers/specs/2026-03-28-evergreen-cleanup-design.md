# Evergreen Cleanup Design

**Date:** 2026-03-28

**Goal**

Upgrade the remaining Thailand-wide evergreen editorial pages and their related hub/index pages into source-backed, non-thin, AdSense-safe, EEAT-oriented clusters with stronger internal linking and visibly cited sources.

## Product Intent

The remaining weak layer on the site is no longer the city system. It is the nationwide evergreen and hub layer where old affiliate-led templates, generic travel copy, and brittle commercial framing still dilute quality.

This phase should turn those pages into real editorial assets:

- useful as standalone planning pages
- coherent as topic clusters
- visibly sourced
- internally linked to the strongest destination pages
- free from scrape-era review, deal, and urgency language

The aim is not just to make the pages less bad. The aim is to make them defensible for AdSense review and materially better under Google EEAT-style quality standards.

## Scope

### Tracker Family 1: Evergreen Editorial Pages

Create a dedicated tracker for the main nationwide editorial pillars:

- `/best-beaches-in-thailand/`
- `/thailand-islands/`
- `/thailand-temples/`
- `/thailand-street-food/`
- `/best-cooking-classes-in-thailand/`
- `/best-muay-thai-in-thailand/`
- `/best-elephant-sanctuaries-in-thailand/`
- `/best-diving-snorkeling-in-thailand/`

These pages are expected to need actual rewrites or structural cleanup, not just validation.

### Tracker Family 2: Evergreen Hub Pages

Create a second tracker for the related index, navigation, and cluster pages that support those pillars:

- `/activities/`
- `/islands/`
- `/practical-info/`
- `/blog/`
- `/itineraries/`
- relevant category, tag, and index pages under those systems where affiliate-first or thin hub behavior still dominates

These pages are expected to need a mix of rewrite, structural cleanup, link cleanup, and de-commercialization.

### In Scope

- page copy
- route structure and section framing
- shared components and shared templates used by those route families
- visible source presentation
- internal linking between pillars, hubs, and strong city pages
- schema and metadata cleanup where current claims are inaccurate or over-assertive
- cleanup of affiliate-heavy, review-heavy, or thin filler sections

### Out of Scope

- rebuilding the already-finished city main pages
- rebuilding the city top-10 trackers
- changing unrelated product areas outside these editorial and hub families
- adding new affiliate modules or new monetization blocks

## Execution Model

Use a paired-track cluster model rather than separating all editorials from all hubs.

Recommended cluster order:

1. beaches + islands
2. temples + practical-info links where relevant
3. street food + supporting blog or hub links where relevant
4. cooking classes + activities
5. muay thai + activities
6. elephant sanctuaries + activities
7. diving and snorkeling + activities
8. blog and itineraries cleanup for any remaining affiliate-first or thin navigation layers

This model keeps internal linking coherent and avoids leaving behind half-cleaned topic systems.

## Quality Bar

Every route in this phase must be:

- editorial-led rather than affiliate-led
- non-thin
- source-backed
- visibly trustworthy in rendered HTML
- internally coherent with the strongest destination pages
- free of stale commercial filler in both rendered HTML and `__NEXT_DATA__`

Routes must avoid:

- generic AI travel copy
- invented first-person stories
- fake insider framing
- TripAdvisor-style rating or review spam
- unsupported exact price claims
- “best deals”, “guest reviews”, “current prices”, “current rates”, “24/7 updated”, and similar scrape-era marketing language
- affiliate blocks that dominate or materially weaken the page’s editorial value

## Source and Fact-Checking Rules

- Web search is mandatory for materially unstable claims.
- Memory alone is not enough for current claims about official status, opening rules, airport and ferry access, seasonal conditions, park rules, hotel positioning, or commercial operator positioning.
- Prefer official sources, official venue or operator pages, Tourism Authority of Thailand, Department of National Parks, UNESCO, Fine Arts Department, MICHELIN, airport or transport authorities, and other durable primary references.
- If a brittle exact claim cannot be defended cleanly, rewrite it into durable wording rather than keeping a weak exact statement.
- Source links must be visible in the rendered page where the template supports them. They should not exist only in hidden data fields.

## Editorial Page Role

The editorial pillar pages should not behave like national “listicles” whose main purpose is to funnel users into booking links.

They should:

- give a real planning frame for the topic
- explain tradeoffs, geography, or selection logic
- surface a limited, defensible shortlist or cluster structure
- link users onward to the best city or support pages for deeper reading
- present visible sources and editorial review signals

They should not:

- claim fake comprehensiveness
- recycle city snippets without synthesis
- depend on generic CTA modules to feel complete

## Hub Page Role

The related hub pages should function as credible navigation and discovery layers, not affiliate directories.

They should:

- clarify how the topic is organized
- group users into strong next-click paths
- support the paired editorial pillar with better internal-link architecture
- remove weak card-grid filler and exaggerated commercial prompts

They should not:

- exist mainly as cross-sell surfaces
- lead with booking widgets, partner brands, or vague promises of current deals
- expose thin category pages with no real editorial value

## Internal Linking Rules

Internal linking is part of the quality bar, not an afterthought.

Rules:

- link from pillar pages to the strongest supporting city pages
- link from hubs to pillar pages and strong city pages with clear user intent
- remove or demote links to weak, repetitive, or commercially padded destinations
- keep clusters tight; each link should help a user decide what to read next
- avoid link spraying for SEO theater

## Indexing Rules

Do not assume every route deserves indexability once cleaned up.

Indexing should follow real usefulness:

- strong editorial pillars should normally be indexable
- hub pages should only be indexable if they are substantial and not just navigational filler
- thin or transitional routes should remain noindex until they genuinely clear the quality bar

Each tracker item should include an explicit indexing decision rather than inheriting one by assumption.

## Shared Template Cleanup

This project must be allowed to fix shared templates and components when they are the source of weak behavior across multiple routes.

Expected targets include:

- affiliate CTA blocks that interrupt the editorial flow
- review, rating, or booking urgency components
- generic “smart tips” sections that say little
- schema that overclaims freshness, price certainty, or commercial validation
- metadata that still uses scrape-era value propositions

If a shared template is the reason multiple routes still feel thin, it must be fixed before those routes are marked done.

## Validation

A route may only be marked done after it passes all of the following:

- `npx tsc --noEmit`
- localhost render check
- rendered HTML leak scan for affiliate, scrape, review, and thin-content markers
- visible source-backed trust signals in rendered HTML
- internal-link review
- route-specific indexing review

The validation pattern should explicitly look for old commercial phrases and provider names where they no longer belong, including `TripAdvisor`, `GetYourGuide`, `Klook`, `Booking.com`, `Best Deals`, `guest reviews`, `current prices`, and similar scrape-era or affiliate-led phrasing.

## Tracking Model

Create:

- `EVERGREEN_EDITORIAL_UPGRADE_RUNBOOK.md`
- `evergreen-editorial-upgrade-tracker.json`
- `EVERGREEN_HUB_UPGRADE_RUNBOOK.md`
- `evergreen-hub-upgrade-tracker.json`

Each tracker should include:

- project metadata
- scope
- done definition
- sequential execution rules
- item order
- per-item status
- notes
- indexing decision
- validation state
- `updated_at`

The two trackers should still support the paired-track execution order by storing a shared cluster label for each route family.

## Success Criteria

This phase is successful when:

- the nationwide editorial pillars read as real editorial products rather than monetized listicles
- the related hub pages stop behaving like thin affiliate directories
- visible source-backed trust signals are present
- internal linking clearly reinforces the strongest pages on the site
- the rendered HTML is materially cleaner for AdSense and EEAT review than the current state
