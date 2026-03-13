# Web Push Notifications — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Self-hosted daily push notification digest for new blog posts, with subscriber collection via bottom banner.

**Architecture:** Service Worker for push events, browser Push API for subscription, JSON file via GitHub API for storage (same pattern as blog pipeline), `web-push` npm package for sending, Vercel cron for daily digest.

**Tech Stack:** web-push (npm), Service Worker API, Push API, Next.js API routes, GitHub API (existing `commitFilesToGitHub`)

---

### Task 1: Install web-push and generate VAPID keys

**Files:**
- Modify: `package.json`

**Step 1: Install web-push**

Run: `cd /home/marvin/Projecten/go2thailand.com && npm install web-push`

**Step 2: Generate VAPID keys**

Run: `npx web-push generate-vapid-keys --json`

Copy the output. Add to `.env.local`:

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=<publicKey>
VAPID_PRIVATE_KEY=<privateKey>
```

Also add these to Vercel environment variables (Settings > Environment Variables).

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add web-push dependency for push notifications"
```

---

### Task 2: Create push subscriptions data file

**Files:**
- Create: `data/push-subscriptions.json`

**Step 1: Create initial empty subscriptions file**

```json
{
  "subscribers": []
}
```

**Step 2: Commit**

```bash
git add data/push-subscriptions.json
git commit -m "feat: add empty push subscriptions data file"
```

---

### Task 3: Create Service Worker

**Files:**
- Create: `public/sw.js`

**Step 1: Write service worker**

```javascript
// Service Worker for Web Push Notifications — Go2Thailand.com
// Minimal: push events only, no PWA caching

self.addEventListener('push', function(event) {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || '',
    icon: '/go2thailand-faviocon.webp',
    badge: '/go2thailand-faviocon.webp',
    data: {
      url: data.url || 'https://go2-thailand.com/blog/'
    },
    tag: 'go2thailand-digest',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Go2Thailand', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const url = event.notification.data?.url || 'https://go2-thailand.com/blog/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
```

**Step 2: Commit**

```bash
git add public/sw.js
git commit -m "feat: add service worker for push notifications"
```

---

### Task 4: Create push subscription API helper

**Files:**
- Create: `lib/push-subscriptions.ts`

This module reads/writes the subscriptions JSON via GitHub API (same pattern as blog pipeline).

**Step 1: Write the helper**

```typescript
import { commitFilesToGitHub } from './pipeline/github-commit';

const SUBSCRIPTIONS_PATH = 'data/push-subscriptions.json';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'MarvinNL046';
const REPO_NAME = 'go2thailand.com';

export interface PushSubscriber {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  locale: string;
  subscribedAt: string;
}

export interface PushSubscriptionsData {
  subscribers: PushSubscriber[];
}

// Read current subscriptions from GitHub
export async function getSubscriptions(): Promise<PushSubscriptionsData> {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN not configured');

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SUBSCRIPTIONS_PATH}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!res.ok) {
    // File doesn't exist yet, return empty
    if (res.status === 404) return { subscribers: [] };
    throw new Error(`Failed to read subscriptions: ${await res.text()}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return JSON.parse(content);
}

// Save subscriptions to GitHub
export async function saveSubscriptions(
  subscriptions: PushSubscriptionsData,
  commitMessage: string
): Promise<void> {
  await commitFilesToGitHub(
    [
      {
        path: SUBSCRIPTIONS_PATH,
        content: JSON.stringify(subscriptions, null, 2),
      },
    ],
    commitMessage
  );
}
```

**Step 2: Commit**

```bash
git add lib/push-subscriptions.ts
git commit -m "feat: add push subscriptions read/write helper"
```

---

### Task 5: Create subscribe/unsubscribe API routes

**Files:**
- Create: `pages/api/push/subscribe.ts`
- Create: `pages/api/push/unsubscribe.ts`

**Step 1: Write subscribe endpoint**

```typescript
// pages/api/push/subscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSubscriptions, saveSubscriptions } from '../../../lib/push-subscriptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subscription, locale = 'en' } = req.body;

    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    const data = await getSubscriptions();

    // Dedup by endpoint
    if (data.subscribers.some(s => s.endpoint === subscription.endpoint)) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    data.subscribers.push({
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      locale,
      subscribedAt: new Date().toISOString(),
    });

    await saveSubscriptions(data, `Add push subscriber (total: ${data.subscribers.length})`);

    return res.status(201).json({ message: 'Subscribed' });
  } catch (error) {
    console.error('[push/subscribe] Error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
```

**Step 2: Write unsubscribe endpoint**

```typescript
// pages/api/push/unsubscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSubscriptions, saveSubscriptions } from '../../../lib/push-subscriptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint' });
    }

    const data = await getSubscriptions();
    const before = data.subscribers.length;
    data.subscribers = data.subscribers.filter(s => s.endpoint !== endpoint);

    if (data.subscribers.length < before) {
      await saveSubscriptions(data, `Remove push subscriber (total: ${data.subscribers.length})`);
    }

    return res.status(200).json({ message: 'Unsubscribed' });
  } catch (error) {
    console.error('[push/unsubscribe] Error:', error);
    return res.status(500).json({ error: 'Failed to unsubscribe' });
  }
}
```

**Step 3: Commit**

```bash
git add pages/api/push/subscribe.ts pages/api/push/unsubscribe.ts
git commit -m "feat: add push subscribe/unsubscribe API routes"
```

---

### Task 6: Create PushBanner component

**Files:**
- Create: `components/PushBanner.tsx`
- Modify: `pages/_app.tsx` (add PushBanner inside ToastProvider)
- Modify: `translations/en/common.json` (add push banner strings)
- Modify: `translations/nl/common.json` (add push banner strings)

**Step 1: Write PushBanner component**

```tsx
// components/PushBanner.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PUSH_DISMISSED_KEY = 'go2t-push-dismissed';
const PUSH_SUBSCRIBED_KEY = 'go2t-push-subscribed';

const translations: Record<string, { text: string; allow: string; dismiss: string }> = {
  en: {
    text: 'Get daily Thailand travel tips?',
    allow: 'Allow notifications',
    dismiss: 'No thanks',
  },
  nl: {
    text: 'Dagelijks Thailand reistips ontvangen?',
    allow: 'Meldingen toestaan',
    dismiss: 'Nee bedankt',
  },
  de: {
    text: 'Tägliche Thailand-Reisetipps erhalten?',
    allow: 'Benachrichtigungen erlauben',
    dismiss: 'Nein danke',
  },
  fr: {
    text: 'Recevoir des conseils de voyage en Thaïlande ?',
    allow: 'Autoriser les notifications',
    dismiss: 'Non merci',
  },
  zh: {
    text: '获取每日泰国旅行提示？',
    allow: '允许通知',
    dismiss: '不了谢谢',
  },
  ja: {
    text: '毎日のタイ旅行のヒントを受け取りますか？',
    allow: '通知を許可',
    dismiss: 'いいえ結構です',
  },
  ko: {
    text: '매일 태국 여행 팁을 받으시겠습니까?',
    allow: '알림 허용',
    dismiss: '괜찮습니다',
  },
  ru: {
    text: 'Получать ежедневные советы по путешествиям в Таиланд?',
    allow: 'Разрешить уведомления',
    dismiss: 'Нет, спасибо',
  },
};

export default function PushBanner() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const locale = router.locale || 'en';
  const t = translations[locale] || translations.en;

  useEffect(() => {
    // Don't show if: no push support, already subscribed, already dismissed
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (localStorage.getItem(PUSH_DISMISSED_KEY)) return;
    if (localStorage.getItem(PUSH_SUBSCRIBED_KEY)) return;

    // Check if already has permission
    if (Notification.permission === 'granted') {
      localStorage.setItem(PUSH_SUBSCRIBED_KEY, 'true');
      return;
    }
    if (Notification.permission === 'denied') return;

    // Show banner after 3 seconds
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAllow = async () => {
    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      // Request push subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      // Send to backend
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          locale,
        }),
      });

      if (res.ok) {
        localStorage.setItem(PUSH_SUBSCRIBED_KEY, 'true');
      }
    } catch (err) {
      console.error('[PushBanner] Subscription failed:', err);
    }

    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(PUSH_DISMISSED_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 animate-slide-up">
      <div className="container-custom flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-thailand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-white text-sm">{t.text}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            {t.dismiss}
          </button>
          <button
            onClick={handleAllow}
            className="px-4 py-1.5 bg-thailand-red text-white rounded-lg text-sm font-medium hover:bg-thailand-red-600 transition-colors"
          >
            {t.allow}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add slide-up animation to globals.css**

Add to `styles/globals.css` (at the end, before any closing braces):

```css
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
```

**Step 3: Add PushBanner to `_app.tsx`**

Import PushBanner and add it inside the ToastProvider, after `<ExitIntentPopup />`:

```tsx
import PushBanner from '../components/PushBanner';
```

And in the JSX, after `<ExitIntentPopup />`:

```tsx
<PushBanner />
```

**Step 4: Commit**

```bash
git add components/PushBanner.tsx pages/_app.tsx styles/globals.css
git commit -m "feat: add push notification opt-in banner with locale support"
```

---

### Task 7: Create daily digest cron endpoint

**Files:**
- Create: `pages/api/cron/send-push-digest.ts`
- Modify: `vercel.json` (add cron entry)

**Step 1: Write the cron handler**

```typescript
// pages/api/cron/send-push-digest.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';
import { getSubscriptions, saveSubscriptions, PushSubscriber } from '../../../lib/push-subscriptions';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

export const config = {
  maxDuration: 60,
};

// Get blog posts created today
function getTodaysPosts(locale: string): Array<{ title: string; slug: string }> {
  const dir = path.join(process.cwd(), 'content', 'blog', locale);
  if (!fs.existsSync(dir)) return [];

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const files = fs.readdirSync(dir).filter((f: string) => f.endsWith('.md'));

  const posts: Array<{ title: string; slug: string; date: string }> = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data } = matter(content);
    if (data.date && data.date.toString().startsWith(today)) {
      posts.push({
        title: data.title,
        slug: file.replace(/\.md$/, ''),
        date: data.date,
      });
    }
  }

  return posts;
}

// Build notification payload per locale
function buildNotification(
  posts: Array<{ title: string; slug: string }>,
  locale: string
): { title: string; body: string; url: string } | null {
  if (posts.length === 0) return null;

  const firstPost = posts[0];
  const url = `https://go2-thailand.com/${locale !== 'en' ? locale + '/' : ''}blog/${firstPost.slug}/`;

  if (posts.length === 1) {
    const prefix = locale === 'nl' ? 'Nieuw op Go2Thailand' : 'New on Go2Thailand';
    return {
      title: prefix,
      body: firstPost.title,
      url,
    };
  }

  const moreCount = posts.length - 1;
  if (locale === 'nl') {
    return {
      title: `${posts.length} nieuwe artikelen op Go2Thailand`,
      body: `${firstPost.title} en ${moreCount} meer`,
      url: `https://go2-thailand.com/nl/blog/`,
    };
  }
  return {
    title: `${posts.length} new articles on Go2Thailand`,
    body: `${firstPost.title} and ${moreCount} more`,
    url: `https://go2-thailand.com/blog/`,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Configure web-push
    webpush.setVapidDetails(
      'mailto:hello@go2-thailand.com',
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );

    // Get today's English posts (all locales fall back to EN for post listing)
    const enPosts = getTodaysPosts('en');
    const nlPosts = getTodaysPosts('nl');

    if (enPosts.length === 0 && nlPosts.length === 0) {
      console.log('[send-push-digest] No new posts today, skipping');
      return res.status(200).json({ message: 'No new posts today', sent: 0 });
    }

    const data = await getSubscriptions();

    if (data.subscribers.length === 0) {
      console.log('[send-push-digest] No subscribers');
      return res.status(200).json({ message: 'No subscribers', sent: 0 });
    }

    // Group subscribers by locale
    const byLocale: Record<string, PushSubscriber[]> = {};
    for (const sub of data.subscribers) {
      const loc = sub.locale || 'en';
      if (!byLocale[loc]) byLocale[loc] = [];
      byLocale[loc].push(sub);
    }

    let sent = 0;
    let failed = 0;
    const expiredEndpoints: string[] = [];

    for (const [locale, subscribers] of Object.entries(byLocale)) {
      // Use locale-specific posts if available, fallback to EN
      const posts = locale === 'nl' && nlPosts.length > 0 ? nlPosts : enPosts;
      const notification = buildNotification(posts, locale);
      if (!notification) continue;

      const payload = JSON.stringify(notification);

      for (const sub of subscribers) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: sub.keys,
            },
            payload
          );
          sent++;
        } catch (err: any) {
          failed++;
          // 410 Gone or 404 = subscription expired
          if (err.statusCode === 410 || err.statusCode === 404) {
            expiredEndpoints.push(sub.endpoint);
          } else {
            console.error(`[send-push-digest] Failed to send to ${sub.endpoint}:`, err.statusCode || err.message);
          }
        }
      }
    }

    // Clean up expired subscriptions
    if (expiredEndpoints.length > 0) {
      data.subscribers = data.subscribers.filter(
        s => !expiredEndpoints.includes(s.endpoint)
      );
      await saveSubscriptions(
        data,
        `Remove ${expiredEndpoints.length} expired push subscribers (total: ${data.subscribers.length})`
      );
      console.log(`[send-push-digest] Removed ${expiredEndpoints.length} expired subscriptions`);
    }

    console.log(`[send-push-digest] Sent: ${sent}, Failed: ${failed}, Expired: ${expiredEndpoints.length}`);

    return res.status(200).json({
      sent,
      failed,
      expired: expiredEndpoints.length,
      totalSubscribers: data.subscribers.length,
    });
  } catch (error) {
    console.error('[send-push-digest] Error:', error);
    return res.status(500).json({
      error: 'Cron job failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

**Step 2: Add cron entry to `vercel.json`**

Add to the `crons` array:

```json
{
  "path": "/api/cron/send-push-digest/",
  "schedule": "0 20 * * *"
}
```

This runs at 20:00 UTC daily, after all blog posts (06:00, 12:00, 18:00) and translations (06:30, 12:30, 18:30) are done.

**Step 3: Commit**

```bash
git add pages/api/cron/send-push-digest.ts vercel.json
git commit -m "feat: add daily push notification digest cron (20:00 UTC)"
```

---

### Task 8: Add TypeScript types for web-push

**Files:**
- Run: `npm install --save-dev @types/web-push` (if available, otherwise create declaration)

**Step 1: Check if types exist**

Run: `npm install --save-dev @types/web-push`

If that fails, create `types/web-push.d.ts`:

```typescript
declare module 'web-push' {
  interface PushSubscription {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }

  function setVapidDetails(subject: string, publicKey: string, privateKey: string): void;
  function sendNotification(subscription: PushSubscription, payload: string): Promise<any>;

  export { setVapidDetails, sendNotification, PushSubscription };
}
```

**Step 2: Commit**

```bash
git add package.json package-lock.json  # or types/web-push.d.ts
git commit -m "feat: add web-push TypeScript types"
```

---

### Task 9: Test locally and verify build

**Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`

Fix any type errors.

**Step 2: Run build**

Run: `npm run build`

Verify no build errors.

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve any build issues with push notification setup"
```

---

### Task 10: Update MEMORY.md and vercel.json documentation

**Files:**
- Modify: `/home/marvin/.claude/projects/-home-marvin-Projecten-go2thailand-com/memory/MEMORY.md`

**Step 1: Add to Active Pipelines table in MEMORY.md**

Add row:
```
| `send-push-digest` | 1x/day | 20:00 | sends daily push digest |
```

Update cron count: "13 entries, 6 endpoints"

**Step 2: Add Key Files entry**

```
- `lib/push-subscriptions.ts` - Push subscription read/write via GitHub API
- `pages/api/cron/send-push-digest.ts` - Daily push digest cron
- `components/PushBanner.tsx` - Push notification opt-in banner
- `public/sw.js` - Service worker for push events
```

**Step 3: Commit all remaining changes**

```bash
git add -A
git commit -m "feat: complete web push notification system setup"
```
