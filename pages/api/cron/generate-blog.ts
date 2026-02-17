import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  maxDuration: 300,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Call the generate endpoint internally
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/pipeline/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pipeline-key": process.env.PIPELINE_SECRET || "",
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        publish: true,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[cron/generate-blog] Generation failed:", result);
      return res.status(500).json({ error: "Generation failed", details: result });
    }

    console.log("[cron/generate-blog] Success:", result);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("[cron/generate-blog] Error:", error);
    return res.status(500).json({
      error: "Cron job failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
