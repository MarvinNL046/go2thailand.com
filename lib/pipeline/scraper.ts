const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_READER_URL = "https://r.jina.ai";
const JINA_SEARCH_URL = "https://s.jina.ai";

export interface ScrapedContent {
  url: string;
  content: string;
  title?: string;
}

export interface ScrapedArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
  date?: string;
}

// Thailand travel news sources
const TRAVEL_NEWS_SOURCES = [
  "https://thethaiger.com/news/thailand",
  "https://www.bangkokpost.com/travel",
  "https://www.tourismthailand.org/Articles",
  "https://www.lonelyplanet.com/thailand",
  "https://www.nomadicmatt.com/travel-guides/thailand-travel-tips/",
];

// Primary info source — scraped for latest Thailand news
const THAILAND_BLOG_URL = "https://thailandblog.nl/en/";

// Direct fetch fallback — strips HTML tags for plain text extraction
async function directFetch(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Go2ThailandBot/1.0; +https://go2-thailand.com)",
    },
  });
  if (!response.ok) {
    throw new Error(`Direct fetch failed for ${url}: ${response.status}`);
  }
  const html = await response.text();
  // Basic HTML to text: strip tags, decode entities, collapse whitespace
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.slice(0, 8000);
}

// Fetch a URL via Jina.ai Reader API (returns clean Markdown)
// Falls back to direct fetch if Jina fails
export async function scrapeUrl(url: string): Promise<string> {
  // Try Jina first
  try {
    const headers: Record<string, string> = {
      Accept: "text/markdown",
      "X-Return-Format": "markdown",
    };

    if (JINA_API_KEY && JINA_API_KEY !== "your_jina_api_key_here") {
      headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
    }

    const response = await fetch(`${JINA_READER_URL}/${url}`, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      const content = await response.text();
      if (content && content.length >= 100) {
        return content;
      }
    }
    console.warn(`[scraper] Jina failed for ${url}, trying direct fetch...`);
  } catch (e) {
    console.warn(`[scraper] Jina error for ${url}:`, e);
  }

  // Fallback: direct fetch
  return directFetch(url);
}

// Scrape thailand-related travel news from multiple sources in parallel
export async function scrapeTravelNews(): Promise<ScrapedArticle[]> {
  const settled = await Promise.allSettled(
    TRAVEL_NEWS_SOURCES.map(async (sourceUrl) => {
      const content = await scrapeUrl(sourceUrl);
      const hostname = new URL(sourceUrl).hostname;
      return {
        title: `Thailand Travel News from ${hostname}`,
        summary: content.slice(0, 2000),
        source: hostname,
        url: sourceUrl,
        date: new Date().toISOString(),
      };
    })
  );

  const results: ScrapedArticle[] = [];
  for (const r of settled) {
    if (r.status === "fulfilled") {
      results.push(r.value);
    } else {
      console.warn("Travel news scrape failed:", r.reason);
    }
  }

  return results;
}

// Scrape thailandblog.nl/en for latest Thailand news and info
// This is the primary info source for the content pipeline
export async function scrapeThailandBlog(): Promise<ScrapedContent> {
  const content = await scrapeUrl(THAILAND_BLOG_URL);

  // Extract title if present
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch?.[1] || "Thailand Blog — Latest News";

  return {
    url: THAILAND_BLOG_URL,
    content: content.slice(0, 6000), // Limit to first 6000 chars for prompt context
    title,
  };
}

// Search for a specific topic using Jina Search API (s.jina.ai)
export async function searchTopic(
  query: string
): Promise<Array<{ title: string; summary: string; url: string }>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (JINA_API_KEY) {
    headers["Authorization"] = `Bearer ${JINA_API_KEY}`;
  }

  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(`${JINA_SEARCH_URL}/${encodedQuery}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.warn(`[scraper] Jina search failed for "${query}": ${response.status}`);
    return []; // Return empty results instead of throwing
  }

  const data = await response.json();
  const items: Array<{ title: string; summary: string; url: string }> = [];

  // Jina search returns { data: [{ title, description, url, content }] }
  const results = data.data || data.results || [];
  for (const item of results.slice(0, 6)) {
    items.push({
      title: item.title || "Untitled",
      summary: (item.description || item.content || "").slice(0, 400),
      url: item.url || "",
    });
  }

  return items;
}

// Scrape a batch of Thailand travel sources for a specific topic
// Returns combined content for use as AI context
export async function scrapeTopicContext(topic: string): Promise<string> {
  const year = new Date().getFullYear();
  const parts: string[] = [];

  // Run searches and Thailand blog scrape in parallel
  const [searchResults, blogContent] = await Promise.allSettled([
    searchTopic(`${topic} Thailand ${year} travel guide`),
    scrapeThailandBlog(),
  ]);

  if (searchResults.status === "fulfilled" && searchResults.value.length > 0) {
    const searchText = searchResults.value
      .map((r) => `## ${r.title}\n${r.summary}\nSource: ${r.url}`)
      .join("\n\n");
    parts.push(`SEARCH RESULTS:\n${searchText}`);
  } else if (searchResults.status === "rejected") {
    console.warn("[scraper] Topic search failed:", searchResults.reason);
  }

  if (blogContent.status === "fulfilled") {
    parts.push(
      `THAILAND BLOG (thailandblog.nl) — Latest news:\n${blogContent.value.content}`
    );
  } else {
    console.warn("[scraper] Thailand blog scrape failed:", blogContent.reason);
  }

  return parts.join("\n\n---\n\n");
}
