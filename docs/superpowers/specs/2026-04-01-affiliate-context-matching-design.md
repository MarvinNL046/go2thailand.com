# Context-Aware Affiliate Matching

**Date:** 2026-04-01
**Goal:** Match affiliate widgets to page intent to improve conversion from 1,216 clicks / $3.21 earnings to meaningful revenue.

## Problem

All pages show the same generic affiliate sidebar (hotels, tours, eSIM, transport) regardless of visitor intent. Travelpayouts data shows 97.91% click rate but near-zero conversions because the wrong affiliates are shown on the wrong pages.

## Solution

### Component 1: AffiliateContextSidebar

**File:** `components/blog/AffiliateContextSidebar.tsx`

Replaces the hardcoded affiliate sidebar blocks in `pages/blog/[slug].tsx`. Detects intent from post slug, category, and tags.

**Intent detection (checked in order, first match wins):**

| Intent | Slug/tag keywords | Sidebar shows |
|---|---|---|
| Hotels/stay | "where-to-stay", "hotel", "neighborhood", "accommodation", "resort" | Trip.com hotel search widget (prominent), Booking.com button |
| Transport | "to-" (route pattern), "transport", "flight", "train", "airport" | 12Go booking widget (prominent), Trip.com |
| Food/activities | "market", "food", "restaurant", "cooking", "tour", "night-market" | Klook activities, GetYourGuide tours |
| Visa/practical | "visa", "safe", "insurance", "digital-nomad", "expat", "arrival-card" | SafetyWing insurance, NordVPN, Saily eSIM |
| Beach/island | "beach", "island", "diving", "snorkel", "koh-" | Klook activities, Trip.com hotels |
| Default | everything else | Current mix (hotels + tours + eSIM + transport) |

**All intents also show:** eSIM (Saily) at bottom — universally relevant.

**Props:** `slug: string`, `category: string`, `tags: string[]`

### Component 2: Inline Affiliate CTA

**File:** `components/blog/InlineEngagementCTAs.tsx` (modify existing)

Add one affiliate-specific CTA in addition to existing navigation CTAs. Same intent detection as sidebar, but renders an inline booking prompt.

Examples:
- Hotels intent: "Search Bangkok Hotels on Trip.com" with Trip.com affiliate link
- Transport intent: "Book transport on 12Go" with 12Go affiliate link  
- Food intent: "Book a Bangkok food tour on Klook" with Klook affiliate link

Max 1 affiliate CTA per article (in addition to existing max 3 navigation CTAs). Inserted after the 4th H2 if enough sections exist.

### Component 3: Visa Sidebar Reorder

**File:** `pages/visa/[slug].tsx` (modify)

Current sidebar order: Tips → Related Guides → Travel Insurance → eSIM → Trip.com hotels
New sidebar order: Tips → Related Guides → Travel Insurance (prominent) → NordVPN → eSIM → Related Guides

Remove Trip.com hotel widget from visa pages — visitors on visa pages are planning, not booking hotels yet.

## Affiliate Links (from existing lib/affiliates.ts)

- Booking.com: `https://booking.tpo.lv/2PT1kR82`
- Trip.com: `https://trip.tpo.lv/TmObooZ5`
- Klook: `https://klook.tpo.lv/7Dt6WApj`
- GetYourGuide: `https://getyourguide.tpo.lv/GuAFfGGK`
- 12Go: `https://12go.tpo.lv/tNA80urD`
- Saily: `https://saily.tpo.lv/rf9lidnE`
- NordVPN: `https://nordvpn.tpo.lv/ekHF1i55`
- SafetyWing: link from existing travel-insurance page

## What Does NOT Change

- Blog pipeline (content/blog/, lib/blog.js, crons)
- Existing inline affiliate links in blog post HTML content
- Transport page widgets (already well-placed, only page with real bookings)
- lib/affiliates.ts config

## Files Summary

| Action | File |
|--------|------|
| New | `components/blog/AffiliateContextSidebar.tsx` |
| Modify | `pages/blog/[slug].tsx` (replace hardcoded sidebar with context-aware) |
| Modify | `components/blog/InlineEngagementCTAs.tsx` (add 1 affiliate CTA) |
| Modify | `pages/visa/[slug].tsx` (reorder sidebar, remove hotel widget) |

## Success Criteria

- Affiliate clicks remain similar or increase
- CR2 (click-to-booking) improves from ~0% to >2%
- Transport pages maintain their booking performance
- No regressions in page load or UX
