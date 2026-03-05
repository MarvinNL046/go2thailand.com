# SEO Funnel Design: TOFU Pillar Pages + BOFU Affiliate Integration

**Date**: 2026-03-05
**Goal**: Complete the SEO funnel by adding missing TOFU inspiration pages and affiliate CTAs to existing MOFU city pages

## Context

The site already has strong MOFU coverage (33 cities with subpages: food, hotels, budget, weather, attractions, best-time) but lacks:
- TOFU pillar pages to capture high-volume inspiration traffic
- Affiliate CTAs to monetize existing traffic

## Approach C: Both, phased

---

## Part 1: TOFU Pillar Pages (6 pages)

Static pages that aggregate existing city/attraction/itinerary data. No new pipeline needed — new page templates only.

| URL | Search intent | Data source |
|---|---|---|
| `/thailand-travel-guide` | Main hub, everything about Thailand | All city + practical data |
| `/best-places-to-visit-thailand` | Which cities to choose | 33 cities + rankings |
| `/thailand-itinerary` | Trip planning, routes | Existing 14 itineraries |
| `/is-thailand-safe` | Safety (high search volume) | Existing safety/practical data |
| `/thailand-for-first-timers` | Absolute beginners | Cities + practical info |
| `/thailand-islands-guide` | Islands overview | Existing islands data |

**Note:** `/thailand-index/best-time` and `/thailand-index/budget` already exist — not duplicated here.

**Technical:**
- Static pages (no `[slug]`), ISR 86400s
- Each pillar links to relevant city pages, itineraries, comparison pages
- FAQ schema on each page for rich snippets

---

## Part 2: BOFU Affiliate Integration

Add affiliate CTAs to existing city subpages. No new pipeline — extend existing templates.

**Phase 1 cities:** Bangkok, Chiang Mai, Phuket, Krabi, Koh Samui

| Page | Affiliate partner | CTA |
|---|---|---|
| `/city/[slug]/hotels` | Booking.com | "Book this hotel" per hotel |
| `/city/[slug]/top-10-attractions` | Klook / GetYourGuide | "Book tour" per attraction |
| `/city/[slug]/elephant-sanctuaries` | Klook | "Book sanctuary visit" |
| `/city/[slug]/cooking-classes` | Klook | "Book class" |
| `/city/[slug]/diving-snorkeling` | Klook | "Book dive trip" |

**Implementation:**
- `lib/affiliates.ts` config with deeplinks per city
- Klook/GetYourGuide: affiliate URL with city as query parameter
- Booking.com: affiliate link with city as destination parameter
- Phase 2: roll out to all 33 cities using same config pattern

---

## Rollout Order

**Phase 1 — Foundation (fastest ROI)**
1. Create `lib/affiliates.ts` with affiliate links for top 5 cities
2. Add CTAs to existing city subpages
3. Deploy → immediate revenue potential on existing traffic

**Phase 2 — TOFU**
4. Build 6 pillar page templates
5. Add internal links from pillars to existing city/itinerary pages
6. Deploy → Google starts crawling, organic growth begins

**Phase 3 — Scale**
7. Roll out affiliate to all 33 cities
8. Add FAQ schema to pillar pages for rich snippets
