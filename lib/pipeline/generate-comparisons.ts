import { searchTopic, scrapeUrl } from "./scraper";
import { generateContent } from "./ai-provider";

export interface ComparisonData {
  slug: string;
  type: "island" | "city";
  item1: string;
  item2: string;
  summary: { en: string; nl: string };
  verdict: { en: string; nl: string };
  categories: Array<{
    name: string;
    icon: string;
    winner: string;
    item1_score: number;
    item2_score: number;
    item1_text: { en: string; nl: string };
    item2_text: { en: string; nl: string };
  }>;
  faq: Array<{
    question: { en: string; nl: string };
    answer: { en: string; nl: string };
  }>;
  generatedAt: string;
  sources: string[];
}

export function getComparisonCategories(type: "island" | "city"): string[] {
  if (type === "island") {
    return [
      "beaches",
      "nightlife",
      "diving-snorkeling",
      "budget",
      "accommodation",
      "food",
      "accessibility",
      "family-friendly",
    ];
  }
  return [
    "temples-culture",
    "food-scene",
    "nightlife",
    "shopping",
    "budget",
    "accommodation",
    "accessibility",
    "day-trips",
  ];
}

export async function generateComparison(
  item1Slug: string,
  item2Slug: string,
  type: "island" | "city",
  item1Name: string,
  item2Name: string
): Promise<ComparisonData> {
  // Step 1: Search for comparison data using Jina
  const searchQuery = `${item1Name} vs ${item2Name} Thailand 2026`;
  const searchResults = await searchTopic(searchQuery);

  // Step 2: Scrape top 3 results for detailed content
  const urls = searchResults
    .slice(0, 3)
    .map((r) => r.url)
    .filter(Boolean);

  const scrapedContent = await Promise.allSettled(
    urls.map((url) => scrapeUrl(url))
  );

  const context = scrapedContent
    .filter((r) => r.status === "fulfilled")
    .map(
      (r, i) =>
        `Source ${i + 1} (${urls[i]}):\n${(r as PromiseFulfilledResult<string>).value.slice(0, 3000)}`
    )
    .join("\n\n---\n\n");

  // Collect source URLs from successfully scraped content
  const sources = scrapedContent
    .map((r, i) => (r.status === "fulfilled" ? urls[i] : null))
    .filter((url): url is string => url !== null);

  // Step 3: Build the categories list for the prompt
  const categories = getComparisonCategories(type);

  // Step 4: Call Claude Haiku with a structured prompt
  const prompt = `You are a Thailand travel expert writing for go2thailand.com. Based on the research data below, create a detailed comparison between ${item1Name} and ${item2Name}.

RESEARCH DATA:
${context}

${searchResults.map((r) => `- ${r.title}: ${r.summary}`).join("\n")}

Respond with a JSON object (no markdown fences) matching this exact structure:
{
  "summary": { "en": "...", "nl": "..." },
  "verdict": { "en": "...", "nl": "..." },
  "categories": [...],
  "faq": [...]
}

Categories to compare (use these exact names): ${categories.join(", ")}

For each category:
- name: category name
- icon: relevant emoji
- winner: slug of the winner ("${item1Slug}" or "${item2Slug}" or "tie")
- item1_score: 1-10 score for ${item1Name}
- item2_score: 1-10 score for ${item2Name}
- item1_text: { "en": "2-3 sentence analysis for ${item1Name}", "nl": "Dutch translation" }
- item2_text: { "en": "2-3 sentence analysis for ${item2Name}", "nl": "Dutch translation" }

For FAQ: 4-5 questions that travelers commonly search for, like:
- "Is ${item1Name} or ${item2Name} cheaper?"
- "Which is better for families, ${item1Name} or ${item2Name}?"
Each with { "question": { "en": "...", "nl": "..." }, "answer": { "en": "...", "nl": "..." } }

Summary: 2-3 sentence overview of the comparison (en + nl)
Verdict: Which destination is better for whom, with nuanced recommendation (en + nl)

IMPORTANT: Output ONLY valid JSON, no markdown formatting.`;

  const rawResponse = await generateContent(prompt, {
    model: "claude-haiku",
    maxTokens: 8192,
    temperature: 0.7,
  });

  // Step 5: Parse the JSON response, stripping markdown code fences if present
  let jsonText = rawResponse.trim();

  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  const codeFenceMatch = jsonText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (codeFenceMatch) {
    jsonText = codeFenceMatch[1].trim();
  }

  let parsed: {
    summary: { en: string; nl: string };
    verdict: { en: string; nl: string };
    categories: Array<{
      name: string;
      icon: string;
      winner: string;
      item1_score: number;
      item2_score: number;
      item1_text: { en: string; nl: string };
      item2_text: { en: string; nl: string };
    }>;
    faq: Array<{
      question: { en: string; nl: string };
      answer: { en: string; nl: string };
    }>;
  };

  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    throw new Error(
      `Failed to parse AI response as JSON for comparison ${item1Slug}-vs-${item2Slug}: ${err instanceof Error ? err.message : String(err)}\n\nRaw response (first 500 chars):\n${rawResponse.slice(0, 500)}`
    );
  }

  // Step 6: Validate required fields and return ComparisonData
  if (!parsed.summary?.en || !parsed.summary?.nl) {
    throw new Error("AI response missing required summary field");
  }
  if (!parsed.verdict?.en || !parsed.verdict?.nl) {
    throw new Error("AI response missing required verdict field");
  }
  if (!Array.isArray(parsed.categories) || parsed.categories.length === 0) {
    throw new Error("AI response missing required categories array");
  }
  if (!Array.isArray(parsed.faq) || parsed.faq.length === 0) {
    throw new Error("AI response missing required faq array");
  }

  const slug = `${item1Slug}-vs-${item2Slug}`;

  return {
    slug,
    type,
    item1: item1Slug,
    item2: item2Slug,
    summary: parsed.summary,
    verdict: parsed.verdict,
    categories: parsed.categories,
    faq: parsed.faq,
    generatedAt: new Date().toISOString(),
    sources,
  };
}
