# Food Content Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a food-focused blog pipeline (separate cron) and inline Klook/GYG affiliate links on food/drink detail pages.

**Architecture:** New cron endpoint `generate-food-blog` mirrors existing `generate-blog` but forces `category: "food"` and uses an expanded food topic queue. Inline affiliates are added directly to the `[slug].tsx` page components in the Cooking Method and Where to Find sections.

**Tech Stack:** Next.js Pages Router, existing `content-generator.ts`, `affiliate-injector.ts`, `github-commit.ts`, Vercel Crons.

---

### Task 1: Create food topic queue

**Files:**
- Create: `content/food-topic-queue.json`

**Step 1: Create topic queue file**

```json
{
  "topics": [
    {
      "topic": "Best Street Food Markets in Bangkok: A Local's Walking Guide",
      "category": "food",
      "targetKeyword": "best street food bangkok",
      "searchVolume": 3600,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Thai Cooking Classes in Chiang Mai: Which One Is Worth Your Money",
      "category": "food",
      "targetKeyword": "cooking class chiang mai",
      "searchVolume": 2900,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Pad Thai: Street Food vs Restaurant vs Homemade — What's the Difference",
      "category": "food",
      "targetKeyword": "authentic pad thai thailand",
      "searchVolume": 2400,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Som Tum (Green Papaya Salad): Regional Variations Across Thailand",
      "category": "food",
      "targetKeyword": "som tum papaya salad thailand",
      "searchVolume": 1900,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Night Markets for Food Lovers: Bangkok, Chiang Mai & Phuket Compared",
      "category": "food",
      "targetKeyword": "thailand night market food",
      "searchVolume": 2200,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "How to Eat Like a Local in Thailand: Ordering, Etiquette & Hidden Menus",
      "category": "food",
      "targetKeyword": "how to eat local thailand",
      "searchVolume": 1300,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Thai Curry Guide: Green vs Red vs Yellow vs Massaman vs Panang",
      "category": "food",
      "targetKeyword": "thai curry types guide",
      "searchVolume": 3100,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Vegan Street Food in Thailand: What to Order Everywhere",
      "category": "food",
      "targetKeyword": "vegan food thailand",
      "searchVolume": 1800,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Mango Sticky Rice Season in Thailand: When, Where & Best Spots",
      "category": "food",
      "targetKeyword": "mango sticky rice thailand season",
      "searchVolume": 1600,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Best Food Tours in Bangkok: Chinatown, Old Town & Beyond",
      "category": "food",
      "targetKeyword": "food tour bangkok",
      "searchVolume": 2100,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Khao Soi: Chiang Mai's Signature Dish and Where to Find the Best Bowl",
      "category": "food",
      "targetKeyword": "khao soi chiang mai best",
      "searchVolume": 1400,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Tom Yum Goong: The Ultimate Guide to Thailand's Most Famous Soup",
      "category": "food",
      "targetKeyword": "tom yum goong recipe thailand",
      "searchVolume": 2700,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Thai Seafood Guide: Best Fish Markets and Beach Restaurants",
      "category": "food",
      "targetKeyword": "thai seafood guide",
      "searchVolume": 1100,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Isaan Food: Northeast Thailand's Bold Flavors Travelers Miss",
      "category": "food",
      "targetKeyword": "isaan food thailand guide",
      "searchVolume": 900,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Thai Desserts You Need to Try: From Mango Sticky Rice to Khanom Buang",
      "category": "food",
      "targetKeyword": "thai desserts guide",
      "searchVolume": 1500,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Chatuchak Weekend Market Food Guide: What to Eat and Skip",
      "category": "food",
      "targetKeyword": "chatuchak market food guide",
      "searchVolume": 1700,
      "scrapeUrls": [],
      "priority": 1
    },
    {
      "topic": "Thai Coffee and Tea Culture: From Oliang to Thai Iced Tea",
      "category": "food",
      "targetKeyword": "thai coffee tea culture",
      "searchVolume": 800,
      "scrapeUrls": [],
      "priority": 3
    },
    {
      "topic": "Southern Thai Food: Fiery Flavors Most Tourists Never Try",
      "category": "food",
      "targetKeyword": "southern thai food guide",
      "searchVolume": 700,
      "scrapeUrls": [],
      "priority": 3
    },
    {
      "topic": "Bangkok's Michelin Street Food: Jay Fai, Raan Jay Fai & More",
      "category": "food",
      "targetKeyword": "bangkok michelin street food",
      "searchVolume": 1200,
      "scrapeUrls": [],
      "priority": 2
    },
    {
      "topic": "Thai Fruit Guide: Durian, Mangosteen, Rambutan & What's in Season",
      "category": "food",
      "targetKeyword": "thai fruit guide season",
      "searchVolume": 1000,
      "scrapeUrls": [],
      "priority": 3
    }
  ]
}
```

**Step 2: Commit**

```bash
git add content/food-topic-queue.json
git commit -m "feat: add food blog topic queue (20 topics)"
```

---

### Task 2: Create food blog cron endpoint

**Files:**
- Create: `pages/api/cron/generate-food-blog.ts`

**Step 1: Create the cron handler**

This mirrors `pages/api/cron/generate-blog.ts` but reads from `content/food-topic-queue.json` and forces `category: "food"`.

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { generateBlogPost } from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";
import fs from "fs";
import path from "path";

export const config = {
  maxDuration: 300,
};

interface FoodTopic {
  topic: string;
  category: string;
  targetKeyword: string;
  searchVolume: number;
  scrapeUrls: string[];
  priority: number;
}

async function getNextFoodTopic(): Promise<FoodTopic | null> {
  const queuePath = path.join(process.cwd(), "content", "food-topic-queue.json");
  if (!fs.existsSync(queuePath)) return null;

  const queue = JSON.parse(fs.readFileSync(queuePath, "utf-8")) as { topics: FoodTopic[] };

  // Get existing blog slugs from GitHub
  const token = process.env.GITHUB_TOKEN;
  const existingSlugs = new Set<string>();
  try {
    if (!token) throw new Error("No GITHUB_TOKEN");
    const res = await fetch(
      "https://api.github.com/repos/MarvinNL046/go2thailand.com/contents/content/blog/en",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (res.ok) {
      const files = (await res.json()) as Array<{ name: string }>;
      for (const f of files) {
        if (f.name.endsWith(".md")) existingSlugs.add(f.name.replace(".md", ""));
      }
    }
  } catch {
    // Fallback to filesystem
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (fs.existsSync(enDir)) {
      for (const f of fs.readdirSync(enDir)) {
        if (f.endsWith(".md")) existingSlugs.add(f.replace(".md", ""));
      }
    }
  }

  const STOP_WORDS = new Set(["in", "the", "a", "an", "of", "for", "to", "and", "or", "is", "vs", "at", "on"]);
  const slugList = [...existingSlugs];

  const sorted = [...queue.topics].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.searchVolume - a.searchVolume;
  });

  for (const item of sorted) {
    const words = item.targetKeyword.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w) && w.length > 1);
    const published = slugList.some(slug => words.every(word => slug.includes(word)));
    if (!published) return item;
  }

  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("[cron/generate-food-blog] Starting food blog generation...");

    const foodTopic = await getNextFoodTopic();
    if (!foodTopic) {
      console.log("[cron/generate-food-blog] No unpublished food topics left in queue");
      return res.status(200).json({ success: true, message: "No food topics available" });
    }

    console.log(`[cron/generate-food-blog] Topic: "${foodTopic.topic}"`);

    const post = await generateBlogPost({
      topic: foodTopic.topic,
      category: "food",
      model: "claude-haiku",
      generateImage: true,
      scrapeContext: true,
      scrapeUrls: foodTopic.scrapeUrls.length > 0 ? foodTopic.scrapeUrls : undefined,
    });

    console.log(`[cron/generate-food-blog] Generated: "${post.title}" (slug: ${post.slug})`);

    const filesToCommit: Array<{ path: string; content: string; encoding?: "utf-8" | "base64" }> = [];

    const contentWithAffiliates = injectAffiliateLinks(post.content, {
      inlineLinks: true,
      ctaBoxes: true,
      ctaCount: 3,
    });
    post.content = contentWithAffiliates;

    filesToCommit.push({
      path: `content/blog/en/${post.slug}.md`,
      content: post.content,
      encoding: "utf-8",
    });

    if (post.imageBase64) {
      filesToCommit.push({
        path: `public/images/blog/${post.slug}.webp`,
        content: post.imageBase64,
        encoding: "base64",
      });
    }

    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add food blog: ${post.title}\n\nAuto-generated food content. Category: food`
    );

    console.log(`[cron/generate-food-blog] Committed ${filesToCommit.length} files: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      commitSha: commitResult.sha,
    });
  } catch (error) {
    console.error("[cron/generate-food-blog] Error:", error);
    return res.status(500).json({
      error: "Food blog cron failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
```

**Step 2: Commit**

```bash
git add pages/api/cron/generate-food-blog.ts
git commit -m "feat: add food blog cron endpoint"
```

---

### Task 3: Register food blog cron in vercel.json

**Files:**
- Modify: `vercel.json`

**Step 1: Add cron entry**

Add to the `crons` array in `vercel.json`:

```json
{
  "path": "/api/cron/generate-food-blog/",
  "schedule": "0 9 * * *"
}
```

This runs at 09:00 UTC daily (no overlap with existing blog at 06/12/18).

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "feat: register food blog cron (daily 09:00 UTC)"
```

---

### Task 4: Add inline Klook affiliate to food Cooking Method section

**Files:**
- Modify: `pages/food/[slug].tsx:274-299` (Cooking Method section)

**Step 1: Add inline CTA after cooking tips**

After the closing `</div>` of the cooking tips list (line ~297), add:

```tsx
{/* Inline Cooking Class CTA */}
<div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
  <p className="text-gray-700 text-sm">
    Want to learn from a Thai chef?{' '}
    <a
      href="https://klook.tpo.lv/aq6ZFxvc"
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="text-green-700 font-semibold hover:underline"
    >
      Book a cooking class on Klook
    </a>
    {' '}and master {dish.name.en} hands-on.
  </p>
</div>
```

Insert this right before the closing `</div>` of the Cooking Method card (the `bg-white rounded-2xl` one).

**Step 2: Commit**

```bash
git add pages/food/[slug].tsx
git commit -m "feat: add inline Klook cooking class CTA in food detail page"
```

---

### Task 5: Add inline GYG food tour affiliate to Where to Find sidebar

**Files:**
- Modify: `pages/food/[slug].tsx:380-424` (Where to Find sidebar section)

**Step 1: Add food tour CTA after price ranges**

After the Price Ranges `</div>` (line ~421), add:

```tsx
{/* Inline Food Tour CTA */}
<div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
  <p className="text-gray-700 text-sm">
    <a
      href="https://getyourguide.tpo.lv/GuAFfGGK"
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="text-orange-700 font-semibold hover:underline"
    >
      Join a food tour
    </a>
    {' '}to discover the best {dish.name.en} spots with a local guide.
  </p>
</div>
```

Insert this right before the closing `</div>` of the Where to Find card.

**Step 2: Commit**

```bash
git add pages/food/[slug].tsx
git commit -m "feat: add inline GYG food tour CTA in Where to Find sidebar"
```

---

### Task 6: Add inline affiliates to drinks detail page

**Files:**
- Modify: `pages/drinks/[slug].tsx`

**Step 1: Add same pattern to drinks**

Find the "Where to Try" or equivalent section and add the same GYG food tour CTA pattern. Find any preparation/recipe section and add the Klook cooking class CTA.

Use the same markup as Tasks 4 and 5, replacing `dish` with `drink` variable name.

**Step 2: Commit**

```bash
git add pages/drinks/[slug].tsx
git commit -m "feat: add inline affiliate CTAs to drinks detail page"
```

---

### Task 7: Type check and verify

**Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

**Step 2: Test food blog cron locally (dry run)**

```bash
curl -X POST http://localhost:3000/api/cron/generate-food-blog -H "Authorization: Bearer $CRON_SECRET"
```

Expected: 200 response with generated slug and title.

**Step 3: Final commit and push**

```bash
git push
```
