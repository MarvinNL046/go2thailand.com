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

    // Get today's posts
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
