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
