import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const EN_DIR = path.join(CONTENT_DIR, "en");

function validatePipelineKey(req: NextApiRequest): boolean {
  const key =
    req.headers["x-pipeline-key"] || req.headers["x-admin-key"];
  return key === process.env.PIPELINE_SECRET;
}

interface RecentPost {
  slug: string;
  title: string;
  date: string;
  category: string;
}

function getPostCount(): number {
  if (!fs.existsSync(EN_DIR)) return 0;
  return fs.readdirSync(EN_DIR).filter((f) => f.endsWith(".md")).length;
}

function getRecentPosts(limit: number = 5): RecentPost[] {
  if (!fs.existsSync(EN_DIR)) return [];

  const fileNames = fs.readdirSync(EN_DIR).filter((f) => f.endsWith(".md"));

  const posts: RecentPost[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(EN_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      category: data.category || "",
    };
  });

  // Sort by date descending and return most recent
  return posts
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    })
    .slice(0, limit);
}

function getLocaleStats(): Record<string, number> {
  if (!fs.existsSync(CONTENT_DIR)) return {};

  const stats: Record<string, number> = {};
  const entries = fs.readdirSync(CONTENT_DIR);

  for (const entry of entries) {
    const fullPath = path.join(CONTENT_DIR, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      const count = fs.readdirSync(fullPath).filter((f) => f.endsWith(".md")).length;
      stats[entry] = count;
    }
  }

  return stats;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!validatePipelineKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const totalPosts = getPostCount();
    const recentPosts = getRecentPosts(5);
    const localeStats = getLocaleStats();

    return res.status(200).json({
      content: {
        totalPosts,
        recentPosts,
        localeStats,
      },
      health: {
        status: "ok",
        timestamp: new Date().toISOString(),
        contentDir: CONTENT_DIR,
        enDirExists: fs.existsSync(EN_DIR),
      },
    });
  } catch (error) {
    console.error("[pipeline/status] Error:", error);
    return res.status(500).json({
      error: "Status check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
