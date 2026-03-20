# Thailand News Pipeline — Design Spec

**Goal:** Create a `/news` section with automated, daily Thailand news articles sourced from ThailandBlog.nl and web search, written by Claude Opus in this chat session via cron.

**Architecture:** Two-track scrape → rewrite → local commit pipeline, with a single daily push to trigger one Vercel deploy.

---

## How It Works

### Track 1: ThailandBlog.nl Rewrite
1. WebFetch `https://r.jina.ai/https://www.thailandblog.nl/category/nieuws-uit-thailand/`
2. Extract latest article titles + URLs
3. Check against `content/news/en/` slugs for duplicates
4. Fetch full article via Jina Reader
5. Rewrite in English, own style, facts intact, with source attribution

### Track 2: WebSearch Trending
1. WebSearch `"Thailand news today {date}"` or `"Thailand latest {topic}"`
2. Pick most relevant/interesting story not yet covered
3. Fetch 2-3 source articles for context
4. Write original news article in English with source citations

### Execution
- **Write cron:** Every 45 minutes → scrape, write article, `git add + commit` locally
- **Push cron:** 1x per day (21:00) → `git push origin main` (triggers single Vercel deploy)
- Both are chat-session crons (CronCreate), not Vercel crons

---

## Content Format

```markdown
---
title: "Embassy Land Drives Bangkok Property Prices Up Sharply"
slug: "2026-03-20-embassy-land-bangkok-property-prices"
date: "2026-03-20"
category: "economy"
source:
  name: "ThailandBlog.nl"
  url: "https://www.thailandblog.nl/steden/ambassadegrond-..."
  originalTitle: "Ambassadegrond stuwt grondprijzen in Bangkok fors omhoog"
tags: ["bangkok", "real-estate", "economy"]
description: "Short meta description under 155 chars"
---

400-800 word news article, own voice, facts verified.
Sources cited inline as markdown links.
```

**Slug format:** `{YYYY-MM-DD}-{topic-slug}` (date prefix ensures uniqueness and sort order)

**Categories:** `economy`, `tourism`, `safety`, `transport`, `visa-immigration`, `culture`, `weather`, `general`

---

## File Structure

```
content/news/
└── en/
    ├── 2026-03-20-embassy-land-bangkok-property-prices.md
    ├── 2026-03-20-thailand-cash-withdrawal-rules-april.md
    └── ...

lib/news.ts              — getAllNews(), getNewsBySlug() (mirrors lib/blog.js)
pages/news/
├── index.tsx            — News listing page, sorted by date desc
└── [slug].tsx           — Individual news article page
```

---

## Duplicate Detection

Simple slug-based: before writing, check if any file in `content/news/en/` contains the source URL in its frontmatter. Also check if a slug with the same date+topic already exists.

---

## What's NOT Included (YAGNI)

- No translations (EN only)
- No image generation
- No affiliate injection (news ≠ commercial)
- No Vercel cron (chat-session cron only)
- No RSS feed for news (can add later)
- No categories/tag pages (noindex concerns — keep it simple)

---

## SEO Impact

- Fresh, unique, niche-relevant content daily
- Increases domain topical authority for "Thailand" keywords
- News articles attract backlinks and LLM citations
- Source attribution builds E-E-A-T trust signals
- Separate from `/blog` — dedicated news section signals authority

---

## Cron Prompts

### Write Cron (every 45 min)
Alternates between Track 1 (ThailandBlog) and Track 2 (WebSearch) each run.

### Push Cron (daily at 21:00)
Simple `git push origin main` after pulling/rebasing.
