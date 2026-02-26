# Food Content Expansion Design

**Date:** 2026-02-26
**Status:** Approved

## Goals

1. Automated food-focused blog pipeline (separate cron)
2. Inline affiliate links on food/drink detail pages (Klook/GYG cooking classes & food tours)

## 1. Food Blog Pipeline

### Architecture

New cron: `pages/api/cron/generate-food-blog.ts`

- Mirrors existing blog pipeline (`generate-blog.ts`)
- Uses same `content-generator`, `affiliate-injector`, `github-commit` infra
- Output to `content/blog/en/` (picked up by existing translate cron)
- Schedule: 1x/day
- Image generation via Gemini (same as blog pipeline)

### Topic Pool

Food-specific topics:
- Recipe deep-dives ("How to Make Authentic Pad Thai")
- Street food guides per city ("Best Street Food in Chiang Mai")
- "Best [dish] in [city]" guides
- Food market guides ("Chatuchak Weekend Market Food Guide")
- Seasonal food content ("Mango Sticky Rice Season Guide")
- Thai cuisine culture ("Thai Food Etiquette: What Every Traveler Should Know")
- Cooking class reviews per city

### Tags

Always includes `food` + `thai-cuisine`, plus specific tags per topic.

## 2. Inline Affiliates on Food/Drink Detail Pages

### Current State

- Hardcoded Klook + GYG CTA block at bottom of every food/drink page
- No inline links in content sections

### Changes

Add contextual inline affiliate links in these sections of `[slug].tsx`:

**Cooking Method section:**
- Add "Book a cooking class" Klook link after cooking instructions
- Text: "Want to learn from a Thai chef? Book a cooking class on Klook"

**Where to Find section:**
- City-specific food tour links via GYG
- Text: "Join a food tour in [city] to discover the best spots"

**Existing CTA block:**
- Stays but no changes needed

### Affiliate URLs

- Klook: `https://klook.tpo.lv/aq6ZFxvc` (cooking classes specific)
- GetYourGuide: `https://getyourguide.tpo.lv/GuAFfGGK` (food tours)

## Future Ideas

- Amazon affiliate links for Thai cookbooks, woks, curry paste, rice cookers (when account is set up)
