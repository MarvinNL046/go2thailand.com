# Acceptance audit — English Thailand nightlife owner

**Route:** `/nightlife/`

**Date:** 26 July 2026

**Status:** implemented and verified locally

## Search intent and content

- Existing canonical route and two DFS ranking signals retained; no redirect or slug change.
- Four English DFS clusters contain 526 records. Twelve SERP/PAA sets, rankings, backlinks, two useful competitor parses and one official event parse are stored locally.
- Eight exact PAA questions each occur twice in SSR HTML: once in the visible FAQ and once in `FAQPage` schema.
- One H1. The owner provides six evening moods, eight destination decisions, a four-step evening route, current alcohol context, Full Moon planning, safer return checks and separate Klook and Amazon decision blocks.
- High-volume city-detail intent is linked, not duplicated. Cannibalisation verification reports 0 hard collisions and 0 warnings.

## Fact and safety checks

- TAT confirms general alcohol sales from 11:00 to 24:00 since 29 May 2026, legal age 20 and venue-, place- or date-specific conditions.
- The page explicitly distinguishes an alcohol sales window from a venue closing time and makes no universal closing-time promise.
- Current UK FCDO guidance supports the cautious treatment of drink spiking, methanol, assaults near late-night bars or Full Moon-style events, unlicensed transport, illegal drugs and road risk.
- Tourist Police 1155 is confirmed through the official Tourist Police site.
- The Full Moon date is not frozen into the article. The official event page remains the decision source before accommodation, ferry or flight booking.
- Fixed nightlife prices, unsupported rankings, sexual transaction queries, unverified crowd numbers and volatile venue lists are absent.

## Design and images

- Reuses three dedicated, text-free, locale-neutral WebP nightlife assets rather than generating redundant English copies.
- Desktop visual review confirms strong hierarchy in the editorial hero and a composed safe-return/Amazon lower section.
- At 390 × 844 the page has no horizontal document overflow; mobile search and bottom navigation remain visible.
- After progressive full-page scrolling, all nine page and layout images load with non-zero natural width.
- The lower half retains varied composition: rules, event planner, image split, safety grid, contextual product card, booking checklist, FAQ, related guides and methodology.

## Routing and internal links

- `/nightlife/` and `/nl/nightlife/` both return HTTP 200 locally.
- Bangkok, Pattaya, Phuket and Chiang Mai nightlife detail owners return HTTP 200.
- Koh Samui, Koh Phangan, Krabi and Hua Hin destination/island owners return HTTP 200. A detected `/city/koh-phangan/` 404 was corrected to `/islands/koh-phangan/` before commit.
- Four linked hotel owners return HTTP 200.
- Canonical is exactly `https://go2-thailand.com/nightlife/`; English, Dutch and x-default alternates point to the correct locale routes.

## Affiliate control

- Klook uses the existing dynamic placement sub-ID, `nofollow sponsored`, current-listing language and a visible disclosure.
- Amazon contains one contextually relevant power-bank route only. It uses `noopener noreferrer nofollow sponsored`, current-offer wording and a visible OneLink/Amazon Associate disclosure.
- `/go/anker-powercore-10k/` returns HTTP 307 to Amazon with `tag=go2thailand-20`.
- Amazon verification passes with 18 used slugs and 20 registered products.

## Structured data and gates

- JSON-LD present for `Article`, `FAQPage`, `BreadcrumbList` and `ItemList`; global `Organization` remains present.
- TypeScript, targeted ESLint and Prettier are clean.
- Design-system verification passes with 7 primitives and 26 pilot templates.
- The NL nightlife owner remains visually and technically unchanged.
