import type { NextApiRequest, NextApiResponse } from "next";
import {
  scrapeTravelNews,
  scrapeThailandBlog,
  searchTopic,
} from "../../../lib/pipeline/scraper";

function validatePipelineKey(req: NextApiRequest): boolean {
  const key =
    req.headers["x-pipeline-key"] || req.headers["x-admin-key"];
  return key === process.env.PIPELINE_SECRET;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!validatePipelineKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { type, query } = req.body as {
      type: "news" | "thailandblog" | "topic";
      query?: string;
    };

    if (!type) {
      return res.status(400).json({ error: "Missing required field: type" });
    }

    const startedAt = new Date();
    let results: unknown;

    switch (type) {
      case "news": {
        console.log("[pipeline/scrape] Scraping travel news...");
        results = await scrapeTravelNews();
        break;
      }

      case "thailandblog": {
        console.log("[pipeline/scrape] Scraping Thailand blog...");
        results = await scrapeThailandBlog();
        break;
      }

      case "topic": {
        if (!query) {
          return res.status(400).json({
            error: "query is required for type 'topic'",
          });
        }
        console.log(`[pipeline/scrape] Searching topic: "${query}"`);
        results = await searchTopic(query);
        break;
      }

      default:
        return res.status(400).json({ error: `Invalid type: ${type}` });
    }

    return res.status(200).json({
      status: "completed",
      type,
      query: query || null,
      startedAt: startedAt.toISOString(),
      completedAt: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("[pipeline/scrape] Error:", error);
    return res.status(500).json({
      error: "Scrape failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
