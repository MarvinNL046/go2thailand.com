import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import {
  generateBlogPost,
  translatePostToAllLocales,
} from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import type { AiModel } from "../../../lib/pipeline/ai-provider";

// Allow long-running generation — up to 5 minutes on Vercel
export const config = {
  maxDuration: 300,
};

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
    const {
      topic,
      model = "claude-sonnet",
      publish = false,
    } = req.body as {
      topic?: string;
      model?: AiModel;
      publish?: boolean;
    };

    console.log(`[pipeline/generate] Starting generation. Topic: "${topic || "auto"}", Model: ${model}`);

    // 1. Generate the blog post
    const post = await generateBlogPost({
      topic,
      model,
      generateImage: true,
      scrapeContext: true,
    });

    console.log(`[pipeline/generate] Generated: "${post.title}" (slug: ${post.slug})`);

    // 2. Inject affiliate links into the English content
    const contentWithAffiliates = injectAffiliateLinks(post.content, {
      inlineLinks: true,
      ctaBoxes: true,
      ctaCount: 2,
    });

    // Update post content with affiliate links
    post.content = contentWithAffiliates;

    // 3. Save English version
    const enDir = path.join(process.cwd(), "content", "blog", "en");
    if (!fs.existsSync(enDir)) {
      fs.mkdirSync(enDir, { recursive: true });
    }
    const enFilePath = path.join(enDir, `${post.slug}.md`);
    fs.writeFileSync(enFilePath, post.content, "utf-8");
    console.log(`[pipeline/generate] Saved English post: ${enFilePath}`);

    // 4. Translate to all locales and save each
    const savedLocales: string[] = ["en"];

    try {
      const translations = await translatePostToAllLocales(post, model);

      for (const translation of translations) {
        const localeDir = path.join(process.cwd(), "content", "blog", translation.locale);
        if (!fs.existsSync(localeDir)) {
          fs.mkdirSync(localeDir, { recursive: true });
        }

        // Also inject affiliate links into translated content
        const translatedWithAffiliates = injectAffiliateLinks(translation.content, {
          inlineLinks: true,
          ctaBoxes: true,
          ctaCount: 2,
        });

        const localeFilePath = path.join(localeDir, `${post.slug}.md`);
        fs.writeFileSync(localeFilePath, translatedWithAffiliates, "utf-8");
        savedLocales.push(translation.locale);
        console.log(`[pipeline/generate] Saved ${translation.locale} translation: ${localeFilePath}`);
      }
    } catch (translationError) {
      console.error("[pipeline/generate] Translation step failed:", translationError);
      // Don't fail the whole request — English was already saved
    }

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      locales: savedLocales,
      filePath: enFilePath,
      publish,
    });
  } catch (error) {
    console.error("[pipeline/generate] Error:", error);
    return res.status(500).json({
      error: "Generation failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
