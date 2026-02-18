import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  maxDuration: 300,
};

// Cron job that finds untranslated blog posts and translates them
// Runs after the generate cron to complete translations for remaining locales
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    // Find the most recent English blog post that lacks translations
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (!fs.existsSync(enDir)) {
      return res.status(200).json({ message: "No English blog posts found" });
    }

    const allLocales = ["nl", "zh", "de", "fr", "ru", "ja", "ko"];
    const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith(".md"));

    // Sort by frontmatter date (newest first) — mtime is unreliable on Vercel
    const sorted = enFiles
      .map((f) => {
        const content = fs.readFileSync(path.join(enDir, f), "utf-8");
        const dateMatch = content.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m);
        const date = dateMatch?.[1] || "1970-01-01";
        return { name: f, date };
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    let translated = false;

    for (const file of sorted.slice(0, 3)) {
      const slug = file.name.replace(".md", "");

      // Check which locales are missing
      const missingLocales = allLocales.filter((locale) => {
        const localePath = path.join(process.cwd(), "content", "blog", locale, `${slug}.md`);
        return !fs.existsSync(localePath);
      });

      if (missingLocales.length === 0) continue;

      // Read the English content
      const enContent = fs.readFileSync(path.join(enDir, file.name), "utf-8");

      // Extract title from frontmatter
      const titleMatch = enContent.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      const title = titleMatch?.[1] || slug;

      // Translate up to 4 locales per run (to stay within 5 min)
      const localesToTranslate = missingLocales.slice(0, 4);

      console.log(`[cron/translate] Translating "${title}" to: ${localesToTranslate.join(", ")}`);

      const response = await fetch(`${baseUrl}/api/pipeline/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pipeline-key": process.env.PIPELINE_SECRET || "",
        },
        body: JSON.stringify({
          slug,
          content: enContent,
          title,
          locales: localesToTranslate,
          model: "claude-haiku",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`[cron/translate] Success:`, result);
        translated = true;
        break; // One post per cron run
      } else {
        console.error(`[cron/translate] Failed:`, result);
      }
    }

    if (!translated) {
      return res.status(200).json({ message: "All recent posts are fully translated" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[cron/translate] Error:", error);
    return res.status(500).json({
      error: "Translation cron failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
