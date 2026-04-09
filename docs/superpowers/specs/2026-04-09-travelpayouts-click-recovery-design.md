# Travelpayouts Click Recovery Design

**Date:** 2026-04-09

## Goal

Recover Travelpayouts click volume after the April 1 affiliate-intent changes by restoring stronger high-visibility Travelpayouts placements on the highest-traffic templates: blog posts, visa detail pages, transport routes, and the homepage.

## Root Cause

The April 1 rollout reduced broad Travelpayouts exposure on pages that still had traffic. The site moved from multiple always-visible affiliate exits to narrower intent-matched blocks. That increased relevance in theory, but in practice it reduced the number of visible Travelpayouts click targets on high-traffic templates, especially on blog and visa pages.

## Scope

This recovery round covers:

- `pages/blog/[slug].tsx`
- `pages/visa/[slug].tsx`
- `pages/transport/[route].tsx`
- `pages/index.tsx`

This round preserves:

- SafetyWing visibility on visa-adjacent content
- NordVPN and NordPass visibility as Travelpayouts offers
- existing Travelpayouts widget/script placements unless they directly conflict

This round does not cover:

- city detail pages
- compare pages
- existing generated content markdown
- removal of the sitewide Travelpayouts Drive script

## Approach

Introduce a shared Travelpayouts recovery panel component that can render a page-specific cluster of high-intent affiliate buttons. The panel will be driven by a small pure helper so the placement logic is testable without a browser.

The recovery panel will:

- prioritize Travelpayouts hotel, tours, transport, VPN, and eSIM offers
- adapt button mix to the current template and content intent
- append page-aware `subid` values so the recovered placements are measurable
- avoid displacing SafetyWing, which remains on visa-relevant pages as a separate monetization path

## Page Decisions

### Blog

Add a compact Travelpayouts panel near the top of the article content so readers see a clear affiliate action cluster before they commit to a long scroll. Keep the existing sidebar stack and move the inline affiliate CTA injection earlier in article flow.

### Visa

Keep the insurance CTA and SafetyWing path, but add a stronger Travelpayouts cluster in the sidebar so visa traffic can still click into hotels, transport, and Nord products without relying on only one or two offers.

### Transport

Keep 12Go as the primary action, but add a second Travelpayouts cluster higher on the page to capture destination stay planning and secondary clicks. Transport traffic is already high intent, so it should see both route booking and arrival-planning exits.

### Homepage

Add a fast-click Travelpayouts cluster next to the existing widget strategy so the homepage is not dependent on one widget embed to generate outbound clicks.

## Tracking

Recovered placements will use the existing `withSubId()` and `useSubId()` helpers. Each new panel will add a placement suffix such as `top-panel`, `sidebar-panel`, `route-panel`, or `home-panel` so the recovery round can be measured separately from the older links.

## Validation

Add a small regression script that verifies the helper returns the expected offer mix and ordering for representative `blog`, `visa`, `transport`, and `home` contexts.
