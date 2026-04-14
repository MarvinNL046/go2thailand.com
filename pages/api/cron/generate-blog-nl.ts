import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNlBlogPost } from '../../../lib/pipeline/content-generator-nl';
import { injectAffiliateLinks } from '../../../lib/pipeline/affiliate-injector';
import { commitFilesToGitHub } from '../../../lib/pipeline/github-commit';
import { factCheckPost } from '../../../lib/pipeline/fact-checker';

export const config = {
  maxDuration: 300,
};

/**
 * Cron: write a fresh Dutch blog post directly to content/blog/nl/.
 *
 * Replaces the EN→NL translation step for new content. NL is our primary
 * secondary audience (Netherlands is the #1 engaged country in GA4), so
 * writing NL natively gives us better idiom + SEO than translating from EN.
 *
 * Schedule via vercel.json (added separately).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('[cron/generate-blog-nl] Starting NL blog generation...');

    // 1. Generate post directly in NL
    const post = await generateNlBlogPost({
      generateImage: true,
      scrapeContext: true,
    });

    console.log(`[cron/generate-blog-nl] Generated: "${post.title}" (slug: ${post.slug})`);

    // 2. Fact-check (logs only — never written into published frontmatter)
    const factCheck = factCheckPost(post.content, post.scrapeData || null);
    console.log(`[fact-check] "${post.slug}" — ${factCheck.totalClaims} claims, ${factCheck.unverifiedClaims.length} unverified (${factCheck.riskLevel})`);
    for (const claim of factCheck.unverifiedClaims) {
      console.warn(`[fact-check]   ⚠ ${claim.type.toUpperCase()}: "${claim.value}"`);
    }

    // 3. Inject affiliate links into the NL content. The injector is locale
    //    agnostic — it operates on widget placeholders + dish/city mentions
    //    that work the same in NL.
    const contentWithAffiliates = injectAffiliateLinks(post.content, {
      inlineLinks: true,
      ctaBoxes: false,
      ctaCount: 2,
    });
    post.content = contentWithAffiliates;

    // 4. Files to commit
    const filesToCommit: Array<{ path: string; content: string; encoding?: 'utf-8' | 'base64' }> = [
      {
        path: `content/blog/nl/${post.slug}.md`,
        content: post.content,
        encoding: 'utf-8',
      },
    ];

    if (post.imageBase64) {
      filesToCommit.push({
        path: `public/images/blog/${post.slug}.webp`,
        content: post.imageBase64,
        encoding: 'base64',
      });
    }

    // 5. Commit to GitHub (Vercel auto-deploys on push)
    const commitResult = await commitFilesToGitHub(
      filesToCommit,
      `Add NL blog post: ${post.title}\n\nAuto-generated direct in NL via Grok 4.1 Fast. Category: ${post.category}`,
    );

    console.log(`[cron/generate-blog-nl] Committed ${filesToCommit.length} files: ${commitResult.sha}`);

    return res.status(200).json({
      success: true,
      slug: post.slug,
      title: post.title,
      category: post.category,
      factCheck: factCheck.riskLevel,
      commitSha: commitResult.sha,
    });
  } catch (error) {
    console.error('[cron/generate-blog-nl] Error:', error);
    return res.status(500).json({
      error: 'NL cron job failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
