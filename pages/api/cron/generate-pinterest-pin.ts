// pages/api/cron/generate-pinterest-pin.ts
// Cron: picks an unpinned blog post, generates a pin image, posts to Pinterest
// Schedule: 2x/day (vercel.json)

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../../lib/blog';
import { createPin, generatePinImage } from '../../../lib/pinterest';
import { commitFilesToGitHub } from '../../../lib/pipeline/github-commit';

const PINTEREST_ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN || '';
const PINTEREST_BOARD_ID = process.env.PINTEREST_BOARD_ID || '';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'MarvinNL046';
const REPO_NAME = 'go2thailand.com';
const SITE_URL = 'https://go2-thailand.com';
const PINS_TRACKER_PATH = 'data/pinterest-pins.json';

interface PinnedPost {
  slug: string;
  pinId: string;
  pinnedAt: string;
  board: string;
}

interface PinsTracker {
  pins: PinnedPost[];
  lastRun: string;
}

async function loadTracker(): Promise<PinsTracker> {
  if (!GITHUB_TOKEN) return { pins: [], lastRun: '' };
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PINS_TRACKER_PATH}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (!res.ok) return { pins: [], lastRun: '' };
    const data = await res.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch {
    return { pins: [], lastRun: '' };
  }
}

async function saveTracker(tracker: PinsTracker): Promise<void> {
  await commitFilesToGitHub(
    [{ path: PINS_TRACKER_PATH, content: JSON.stringify(tracker, null, 2) }],
    `pinterest: pin ${tracker.pins[tracker.pins.length - 1]?.slug || 'update'}`
  );
}

// Build a Pinterest-friendly description with hashtags
function buildPinDescription(post: any): string {
  const desc = post.description || post.title;
  const tags = (post.tags || [])
    .slice(0, 8)
    .map((t: string) => '#' + t.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, ''))
    .join(' ');

  const base = `${desc}\n\nRead the full guide at go2-thailand.com`;
  const hashtags = `\n\n#Thailand #ThailandTravel #Travel ${tags}`;

  return (base + hashtags).slice(0, 800);
}

// Pick the best unpinned post (prioritize high-value categories)
function pickNextPost(posts: any[], pinnedSlugs: Set<string>): any | null {
  const PRIORITY_CATEGORIES = ['food', 'city-guide', 'activities', 'islands', 'temples', 'budget', 'seasonal'];

  const unpinned = posts.filter((p: any) => !pinnedSlugs.has(p.slug));
  if (unpinned.length === 0) return null;

  unpinned.sort((a: any, b: any) => {
    const aPriority = PRIORITY_CATEGORIES.indexOf(a.category);
    const bPriority = PRIORITY_CATEGORIES.indexOf(b.category);
    const aScore = aPriority >= 0 ? aPriority : 100;
    const bScore = bPriority >= 0 ? bPriority : 100;
    if (aScore !== bScore) return aScore - bScore;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return unpinned[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify cron secret
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!PINTEREST_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'PINTEREST_ACCESS_TOKEN not configured' });
  }

  if (!PINTEREST_BOARD_ID) {
    return res.status(500).json({ error: 'PINTEREST_BOARD_ID not configured' });
  }

  try {
    const posts = getAllPosts('en');
    const tracker = await loadTracker();
    const pinnedSlugs = new Set(tracker.pins.map(p => p.slug));

    const post = pickNextPost(posts, pinnedSlugs);
    if (!post) {
      return res.status(200).json({ message: 'All posts have been pinned', total: tracker.pins.length });
    }

    console.log(`Generating pin for: ${post.title} (${post.slug})`);

    const imagePath = post.image || `/images/blog/${post.slug}.webp`;
    const pinImageBuffer = await generatePinImage(imagePath, post.title, post.category);
    const pinImageBase64 = pinImageBuffer.toString('base64');

    const pinResult = await createPin(PINTEREST_ACCESS_TOKEN, {
      boardId: PINTEREST_BOARD_ID,
      title: post.title.slice(0, 100),
      description: buildPinDescription(post),
      link: `${SITE_URL}/blog/${post.slug}/`,
      imageBase64: pinImageBase64,
      altText: post.description || post.title,
    });

    console.log(`Pin created: ${pinResult.id}`);

    tracker.pins.push({
      slug: post.slug,
      pinId: pinResult.id,
      pinnedAt: new Date().toISOString(),
      board: PINTEREST_BOARD_ID,
    });
    tracker.lastRun = new Date().toISOString();

    await saveTracker(tracker);

    return res.status(200).json({
      message: 'Pin created successfully',
      pin: { id: pinResult.id, title: post.title, slug: post.slug },
      progress: `${tracker.pins.length}/${posts.length} posts pinned`,
    });
  } catch (error: any) {
    console.error('Pinterest pin error:', error);
    return res.status(500).json({ error: error.message });
  }
}
