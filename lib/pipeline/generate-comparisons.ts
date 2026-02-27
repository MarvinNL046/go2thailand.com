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

  // Step 4: Call Claude Haiku with E-E-A-T optimized prompt
  const prompt = `You are a Thailand travel expert who has personally visited both ${item1Name} and ${item2Name} multiple times, writing for go2thailand.com. Based on the research data AND your expertise, create a detailed, authoritative comparison.

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
- item1_text: { "en": "3-4 sentence expert analysis", "nl": "Native-quality Dutch translation" }
- item2_text: { "en": "3-4 sentence expert analysis", "nl": "Native-quality Dutch translation" }

CRITICAL E-E-A-T REQUIREMENTS for category texts:
- EXPERIENCE: Name specific places (beach names, restaurant areas, hotel zones, dive sites). Write as if you've been there — e.g. "Long Beach on Koh Lanta's west coast" not just "beaches".
- EXPERTISE: Include concrete numbers — budget ranges in THB (e.g. "฿800-1,500/night for mid-range"), travel times, distances. Never be vague when data exists.
- ACCURACY: Only state facts you're confident about. Do NOT place dive sites or attractions in the wrong location. If unsure, omit rather than guess.
- SEASONAL: Mention best/worst months to visit when relevant (e.g. "best November-April, ferries limited May-October").
- INSIDER TIPS: Include at least one non-obvious tip per category that shows real knowledge (e.g. "book the sunset side bungalows" or "avoid the touristy restaurants on the main strip").

For FAQ: 5-6 questions travelers actually search for. Answers MUST include:
- Specific prices, durations, or dates where applicable
- Direct actionable advice, not generic statements
- At least one FAQ about the best time to visit or seasonal differences

Summary: 3-4 sentences. Mention the province/region, distance between them, and the core difference in one line.

Verdict: 4-5 sentences. Specify which traveler type should pick which destination. Mention a specific month or season. End with a practical tip.

DUTCH TRANSLATION QUALITY:
- Write natural, native-level Dutch — NOT literal translations from English
- Use correct Dutch grammar: "zeeleven" not "zeeëven", "veerboten" not "veerbochtochten"
- Use informal "je/jouw" tone (not formal "u")
- Common travel terms: strand, duiken, snorkelen, nachtleven, backpacken, budgetreiziger

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
