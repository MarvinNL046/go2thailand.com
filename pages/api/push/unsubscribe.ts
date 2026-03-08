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
