import type { NextApiRequest, NextApiResponse } from "next";
import {
  generateBlogPost,
  translatePost,
  type TranslationLocale,
} from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";
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

// Priority locales to translate (fits within the 5-min window)
// Full set: nl, zh, de, fr, ru, ja, ko — we do the top 3 here
const PRIORITY_LOCALES: TranslationLocale[] = ["nl", "de", "zh"];

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
      model = "gpt-5-nano",
      publish = false,
      translateLocales,
    } = req.body as {
      topic?: string;
      model?: AiModel;
      publish?: boolean;
      translateLocales?: TranslationLocale[];
    };

    console.log(`[pipeline/generate] Starting generation. Topic: "${topic || "auto"}", Model: ${model}`);

    // 1. Generate the blog post (includes scraping + image generation)
    const post = await generateBlogPost({
      topic,
      model,
      generateImage: true,
      scrapeContext: true,
    });

    console.log(`[pipeline/generate] Generated: "${post.title}" (slug: ${post.slug})`);

    // 2. Collect all files to commit to GitHub
    const filesToCommit: Array<{ path: string; content: string; encoding?: "utf-8" | "base64" }> = [];

    // 3. Inject affiliate links into English content
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

    // 4. Add image file if generated (base64 binary)
    if (post.imageBase64) {
      filesToCommit.push({
        path: `public/images/blog/${post.slug}.webp`,
        content: post.imageBase64,
        encoding: "base64",
      });
      console.log(`[pipeline/generate] Image queued for commit`);
    }

    // 5. Translate to priority locales (3 instead of 7 to stay within time limit)
    const localesToTranslate = translateLocales || PRIORITY_LOCALES;
    const savedLocales: string[] = ["en"];

    for (const locale of localesToTranslate) {
      try {
        console.log(`[pipeline/generate] Translating to ${locale}...`);
        const translated = await translatePost(post, locale, model);
        const translatedWithAffiliates = injectAffiliateLinks(translated.content, {
          inlineLinks: true,
          ctaBoxes: true,
          ctaCount: 3,
        });

        filesToCommit.push({
          path: `content/blog/${locale}/${post.slug}.md`,
          content: translatedWithAffiliates,
          encoding: "utf-8",
        });
        savedLocales.push(locale);
      } catch (err) {
        console.error(`[pipeline/generate] Translation to ${locale} failed:`, err);
        // Continue with remaining locales
      }
    }

    // 6. Commit all files to GitHub in a single commit
    // This triggers a Vercel redeploy automatically
    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add blog post: ${post.title}\n\nAuto-generated. Locales: ${savedLocales.join(", ")}`
    );

    console.log(`[pipeline/generate] Committed ${filesToCommit.length} files to GitHub: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      locales: savedLocales,
      commitSha: commitResult.sha,
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
