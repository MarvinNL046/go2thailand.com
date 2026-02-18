import type { NextApiRequest, NextApiResponse } from "next";
import { generateComparison } from "../../../lib/pipeline/generate-comparisons";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";

export const config = { maxDuration: 300 };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Auth check - use PIPELINE_SECRET or CRON_SECRET
  const authHeader = req.headers.authorization;
  const secret = process.env.PIPELINE_SECRET || process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { item1, item2, type, item1Name, item2Name } = req.body;

    if (!item1 || !item2 || !type || !item1Name || !item2Name) {
      return res.status(400).json({ error: "Missing required fields: item1, item2, type, item1Name, item2Name" });
    }

    if (type !== "island" && type !== "city") {
      return res.status(400).json({ error: "type must be 'island' or 'city'" });
    }

    console.log(`[pipeline/generate-comparison] Generating: ${item1Name} vs ${item2Name}`);

    const comparison = await generateComparison(item1, item2, type, item1Name, item2Name);

    // Commit to GitHub
    const slug = `${item1}-vs-${item2}`;
    const filePath = `data/comparisons/${type}/${slug}.json`;

    await commitFilesToGitHub(
      [{ path: filePath, content: JSON.stringify(comparison, null, 2) }],
      `Add comparison: ${item1Name} vs ${item2Name}`
    );

    return res.status(200).json({
      success: true,
      slug,
      comparison,
    });
  } catch (error: any) {
    console.error("[pipeline/generate-comparison] Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
