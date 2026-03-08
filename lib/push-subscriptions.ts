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
