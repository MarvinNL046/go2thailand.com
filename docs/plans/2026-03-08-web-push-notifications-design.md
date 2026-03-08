# Web Push Notifications — Design Doc

**Date**: 2026-03-08
**Goal**: Self-hosted daily push notification digest for new blog posts

## Architecture

```
[Visitor] → banner opt-in → Service Worker registers push subscription
                                    ↓
                            POST /api/push/subscribe → JSON file via GitHub API

[Daily cron] → fetch today's posts → build digest per locale →
               load subscriptions from JSON → send via web-push library
```

## Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Service | Self-hosted (web-push npm) | No 3rd party dependency, free |
| Storage | JSON file via GitHub API | Matches existing blog pipeline pattern |
| Frequency | 1x/day digest | Not too spammy |
| Opt-in UI | Subtle bottom banner | Non-intrusive |
| Language | Based on visitor locale | Store locale with subscription |
| Tracking | None (for now) | YAGNI |

## Components

### 1. Service Worker (`public/sw.js`)
- Listen to `push` events, show notification with title + body + icon
- Listen to `notificationclick`, open the digest URL
- Minimal — no PWA caching, purely push

### 2. Push Banner (`components/PushBanner.tsx`)
- Sticky banner at bottom of page
- Localized text (e.g., "Dagelijks Thailand tips ontvangen?" / "Get daily Thailand tips?")
- "Allow" / "No thanks" buttons
- Show only when: browser supports push, not yet subscribed, not previously dismissed
- Dismissed state stored in `localStorage`

### 3. API Routes

#### `POST /api/push/subscribe`
- Receives: `{ subscription: PushSubscription, locale: string }`
- Reads current `data/push-subscriptions.json` from GitHub
- Appends new subscription (dedup by endpoint)
- Commits updated file via GitHub API

#### `POST /api/push/unsubscribe`
- Receives: `{ endpoint: string }`
- Removes subscription by endpoint
- Commits updated file via GitHub API

#### `POST /api/cron/send-push-digest`
- Secured with `CRON_SECRET`
- Schedule: 1x/day at 20:00 UTC (after all blog posts generated)
- Steps:
  1. Read blog posts created today from `content/blog/`
  2. If no new posts, skip
  3. Load subscriptions from `data/push-subscriptions.json`
  4. Group subscriptions by locale
  5. Build notification per locale (title of first post + "and X more")
  6. Send via `web-push` to all subscribers
  7. Remove expired/failed subscriptions (410 Gone)
  8. Commit cleaned subscriptions file if changed
  9. Log success/fail counts

### 4. Data File (`data/push-subscriptions.json`)

```json
{
  "subscribers": [
    {
      "endpoint": "https://fcm.googleapis.com/fcm/send/...",
      "keys": {
        "p256dh": "...",
        "auth": "..."
      },
      "locale": "nl",
      "subscribedAt": "2026-03-08T12:00:00Z"
    }
  ]
}
```

### 5. VAPID Keys
- Generate with `npx web-push generate-vapid-keys`
- Store as env vars: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`
- Public key exposed as `NEXT_PUBLIC_VAPID_PUBLIC_KEY` for frontend
- VAPID subject: `mailto:info@go2thailand.com`

## Vercel Cron Addition

```json
{
  "path": "/api/cron/send-push-digest",
  "schedule": "0 20 * * *"
}
```

## Notification Content Examples

**English** (1 post):
> "New on Go2Thailand: Best Street Food Markets in Chiang Mai"

**English** (3 posts):
> "3 new articles on Go2Thailand — Best Street Food Markets in Chiang Mai and 2 more"

**Dutch** (1 post):
> "Nieuw op Go2Thailand: Beste Street Food Markten in Chiang Mai"

**Dutch** (3 posts):
> "3 nieuwe artikelen op Go2Thailand — Beste Street Food Markten in Chiang Mai en 2 meer"

## Scaling Notes

- JSON file works fine up to ~500 subscribers (~100KB)
- Beyond that: migrate to Vercel KV (simple swap in subscribe/unsubscribe + cron)
- No other changes needed — service worker and banner stay the same

## Out of Scope (YAGNI)
- PWA / offline caching
- Subscriber segmentation beyond locale
- Open/click tracking
- Admin dashboard (use GitHub to view JSON)
- Notification for comparisons or food blogs (blog only for now)
