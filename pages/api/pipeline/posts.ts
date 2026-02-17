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

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  featured: boolean;
  readingTime: number;
  author?: { name: string };
}

function readAllPosts(): PostMeta[] {
  if (!fs.existsSync(EN_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(EN_DIR).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(EN_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      category: data.category || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description || "",
      image: data.image || "",
      featured: Boolean(data.featured),
      readingTime: Number(data.readingTime) || 0,
      author: data.author,
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

function getLocaleDirectories(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((entry) => {
      const fullPath = path.join(CONTENT_DIR, entry);
      return fs.statSync(fullPath).isDirectory();
    });
}

// GET /api/pipeline/posts — list all blog posts (from /content/blog/en/)
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const posts = readAllPosts();
  return res.status(200).json({
    posts,
    total: posts.length,
  });
}

// DELETE /api/pipeline/posts?slug=xxx — remove a post from all locale directories
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(400).json({ error: "slug query parameter is required" });
  }

  const localeDirs = getLocaleDirectories();
  const deletedFrom: string[] = [];
  const notFoundIn: string[] = [];

  for (const locale of localeDirs) {
    const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedFrom.push(locale);
    } else {
      notFoundIn.push(locale);
    }
  }

  if (deletedFrom.length === 0) {
    return res.status(404).json({
      error: "Post not found in any locale directory",
      slug,
    });
  }

  return res.status(200).json({
    deleted: true,
    slug,
    deletedFrom,
    notFoundIn,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validatePipelineKey(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    return handleGet(req, res);
  }

  if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
