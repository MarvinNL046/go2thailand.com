import type { NextApiRequest, NextApiResponse } from "next";
import {
  translatePost,
  type TranslationLocale,
  type GeneratedPost,
} from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";
import type { AiModel } from "../../../lib/pipeline/ai-provider";

export const config = {
  maxDuration: 300,
};

function validatePipelineKey(req: NextApiRequest): boolean {
  const key = req.headers["x-pipeline-key"] || req.headers["x-admin-key"];
  return key === process.env.PIPELINE_SECRET;
}

// Translate an existing blog post to additional locales
// Called separately from generate to stay within the 5-min Vercel limit
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
    const {
      slug,
      content,
      title,
      locales,
      model = "gpt-5-nano",
    } = req.body as {
      slug: string;
      content: string; // English Markdown content
      title: string;
      locales: TranslationLocale[];
      model?: AiModel;
    };

    if (!slug || !content || !locales?.length) {
      return res.status(400).json({ error: "Missing required fields: slug, content, locales" });
    }

    console.log(`[pipeline/translate] Translating "${title}" to: ${locales.join(", ")}`);

    // Build a minimal post object for the translator
    const post: GeneratedPost = {
      title,
      slug,
      date: new Date().toISOString().split("T")[0],
      author: { name: "Go2Thailand Team" },
      category: "city-guide",
      tags: [],
      image: `/images/blog/${slug}.webp`,
      description: "",
      featured: false,
      readingTime: 8,
      lastUpdated: new Date().toISOString().split("T")[0],
      sources: [],
      content,
    };

    const filesToCommit: Array<{ path: string; content: string; encoding?: "utf-8" | "base64" }> = [];
    const savedLocales: string[] = [];

    for (const locale of locales) {
      try {
        console.log(`[pipeline/translate] Translating to ${locale}...`);
        const translated = await translatePost(post, locale, model);
        const translatedWithAffiliates = injectAffiliateLinks(translated.content, {
          inlineLinks: true,
          ctaBoxes: true,
          ctaCount: 3,
        });

        filesToCommit.push({
          path: `content/blog/${locale}/${slug}.md`,
          content: translatedWithAffiliates,
          encoding: "utf-8",
        });
        savedLocales.push(locale);
      } catch (err) {
        console.error(`[pipeline/translate] ${locale} failed:`, err);
      }
    }

    if (filesToCommit.length === 0) {
      return res.status(500).json({ error: "All translations failed" });
    }

    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add translations for: ${title}\n\nLocales: ${savedLocales.join(", ")}`
    );

    return res.status(200).json({
      success: true,
      slug,
      locales: savedLocales,
      commitSha: commitResult.sha,
    });
  } catch (error) {
    console.error("[pipeline/translate] Error:", error);
    return res.status(500).json({
      error: "Translation failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
