import type { NextApiRequest, NextApiResponse } from "next";
import { submitUrlsInBatches } from "../../lib/indexnow";

export const config = {
  maxDuration: 60,
};

/**
 * POST /api/indexnow/
 *
 * Accepts a list of URLs and submits them to the IndexNow API.
 * Protected with CRON_SECRET via Bearer token.
 *
 * Request body:
 * { "urls": ["https://go2-thailand.com/page1/", ...] }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify authorization
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "urls must be a non-empty array" });
    }

    console.log(`[api/indexnow] Submitting ${urls.length} URLs to IndexNow...`);

    const result = await submitUrlsInBatches(urls);

    console.log(
      `[api/indexnow] Done. ${result.totalUrls} URLs in ${result.batches} batch(es).`
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[api/indexnow] Error:", error);
    return res.status(500).json({
      error: "IndexNow submission failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
