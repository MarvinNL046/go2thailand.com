import type { NextApiRequest, NextApiResponse } from "next";
import { generateBlogPost } from "../../../lib/pipeline/content-generator";
import { injectAffiliateLinks } from "../../../lib/pipeline/affiliate-injector";
import { commitFilesToGitHub } from "../../../lib/pipeline/github-commit";

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
    console.log("[cron/generate-blog] Starting blog generation...");

    // 1. Generate the blog post directly (no internal HTTP call)
    const post = await generateBlogPost({
      model: "claude-haiku",
      generateImage: true,
      scrapeContext: true,
    });

    console.log(`[cron/generate-blog] Generated: "${post.title}" (slug: ${post.slug})`);

    // 2. Collect files to commit
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

    // 4. Add image file if generated
    if (post.imageBase64) {
      filesToCommit.push({
        path: `public/images/blog/${post.slug}.webp`,
        content: post.imageBase64,
        encoding: "base64",
      });
      console.log("[cron/generate-blog] Image queued for commit");
    }

    // 5. Commit all files to GitHub
    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add blog post: ${post.title}\n\nAuto-generated. Category: ${post.category}`
    );

    console.log(`[cron/generate-blog] Committed ${filesToCommit.length} files: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      commitSha: commitResult.sha,
    });
  } catch (error) {
    console.error("[cron/generate-blog] Error:", error);
    return res.status(500).json({
      error: "Cron job failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
