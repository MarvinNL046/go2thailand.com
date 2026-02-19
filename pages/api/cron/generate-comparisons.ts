import type { NextApiRequest, NextApiResponse } from "next";
import { generateComparison } from "../../../lib/pipeline/generate-comparisons";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";

export const config = { maxDuration: 300 };

// All island and city slugs with names
const ISLANDS = [
  { slug: "koh-samui", name: "Koh Samui" },
  { slug: "koh-phangan", name: "Koh Phangan" },
  { slug: "koh-tao", name: "Koh Tao" },
  { slug: "koh-phi-phi", name: "Koh Phi Phi" },
  { slug: "koh-lanta", name: "Koh Lanta" },
  { slug: "koh-chang", name: "Koh Chang" },
  { slug: "koh-lipe", name: "Koh Lipe" },
  { slug: "koh-yao-noi", name: "Koh Yao Noi" },
  { slug: "koh-mak", name: "Koh Mak" },
  { slug: "koh-samet", name: "Koh Samet" },
];

const CITIES = [
  { slug: "bangkok", name: "Bangkok" },
  { slug: "chiang-mai", name: "Chiang Mai" },
  { slug: "phuket", name: "Phuket" },
  { slug: "pattaya", name: "Pattaya" },
  { slug: "ayutthaya", name: "Ayutthaya" },
  { slug: "krabi", name: "Krabi" },
  { slug: "chiang-rai", name: "Chiang Rai" },
  { slug: "hat-yai", name: "Hat Yai" },
  { slug: "sukhothai", name: "Sukhothai" },
  { slug: "surat-thani", name: "Surat Thani" },
];

// Priority order for generation (most popular first)
const PRIORITY_PAIRS = [
  { i1: "koh-samui", i2: "koh-phangan", type: "island" as const },
  { i1: "bangkok", i2: "chiang-mai", type: "city" as const },
  { i1: "koh-samui", i2: "koh-tao", type: "island" as const },
  { i1: "bangkok", i2: "phuket", type: "city" as const },
  { i1: "koh-phi-phi", i2: "koh-lanta", type: "island" as const },
  { i1: "chiang-mai", i2: "phuket", type: "city" as const },
  { i1: "koh-phangan", i2: "koh-tao", type: "island" as const },
  { i1: "koh-samui", i2: "koh-phi-phi", type: "island" as const },
  { i1: "koh-chang", i2: "koh-lipe", type: "island" as const },
  { i1: "koh-lanta", i2: "koh-lipe", type: "island" as const },
];

function generateAllPairs(items: Array<{ slug: string; name: string }>, type: "island" | "city") {
  const pairs: Array<{ i1: string; i2: string; type: "island" | "city" }> = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push({ i1: items[i].slug, i2: items[j].slug, type });
    }
  }
  return pairs;
}

function getItemName(slug: string, type: "island" | "city"): string {
  const items = type === "island" ? ISLANDS : CITIES;
  return items.find((i) => i.slug === slug)?.name || slug;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("[cron/generate-comparisons] Starting comparison generation...");

    // Build full list: priority pairs first, then remaining pairs
    const allIslandPairs = generateAllPairs(ISLANDS, "island");
    const allCityPairs = generateAllPairs(CITIES, "city");
    const allPairs = [...PRIORITY_PAIRS];

    // Add remaining pairs not in priority list
    for (const pair of [...allIslandPairs, ...allCityPairs]) {
      const exists = allPairs.some(
        (p) => p.i1 === pair.i1 && p.i2 === pair.i2 && p.type === pair.type
      );
      if (!exists) allPairs.push(pair);
    }

    // Check which comparisons already exist via GitHub API
    const filesToGenerate: typeof allPairs = [];

    for (const pair of allPairs) {
      const slug = `${pair.i1}-vs-${pair.i2}`;
      const filePath = `data/comparisons/${pair.type}/${slug}.json`;

      // Check if file exists on GitHub (with timeout to prevent hanging)
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        const checkRes = await fetch(
          `https://api.github.com/repos/MarvinNL046/go2thailand.com/contents/${filePath}`,
          {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
            signal: controller.signal,
          }
        );
        clearTimeout(timer);
        if (checkRes.ok) {
          // File exists, skip
          continue;
        }
      } catch {
        // Error checking or timeout, assume doesn't exist
      }

      filesToGenerate.push(pair);
      if (filesToGenerate.length >= 2) break; // Generate max 2 per run
    }

    if (filesToGenerate.length === 0) {
      console.log("[cron/generate-comparisons] All comparisons already generated!");
      return res.status(200).json({ success: true, message: "All comparisons complete", generated: 0 });
    }

    const results = [];
    const allFiles: Array<{ path: string; content: string }> = [];

    for (const pair of filesToGenerate) {
      const item1Name = getItemName(pair.i1, pair.type);
      const item2Name = getItemName(pair.i2, pair.type);

      console.log(`[cron/generate-comparisons] Generating: ${item1Name} vs ${item2Name}`);

      const comparison = await generateComparison(pair.i1, pair.i2, pair.type, item1Name, item2Name);
      const slug = `${pair.i1}-vs-${pair.i2}`;

      allFiles.push({
        path: `data/comparisons/${pair.type}/${slug}.json`,
        content: JSON.stringify(comparison, null, 2),
      });

      results.push({ slug, type: pair.type });
    }

    // Commit all generated comparisons in a single commit
    if (allFiles.length > 0) {
      await commitFilesToGitHub(
        allFiles,
        `Add ${allFiles.length} comparison(s): ${results.map((r) => r.slug).join(", ")}`
      );
    }

    console.log(`[cron/generate-comparisons] Generated ${results.length} comparisons`);
    return res.status(200).json({ success: true, generated: results.length, results });
  } catch (error: any) {
    console.error("[cron/generate-comparisons] Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
