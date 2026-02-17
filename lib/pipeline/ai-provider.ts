export type AiModel = "claude-sonnet" | "claude-haiku" | "gpt-4o" | "gpt-4o-mini" | "gpt-5-nano";

interface GenerateOptions {
  model?: AiModel;
  maxTokens?: number;
  temperature?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Unified AI content generation interface
// Prefers Claude if ANTHROPIC_API_KEY is set, falls back to OpenAI
export async function generateContent(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const { maxTokens = 16384, temperature = 0.7 } = options;

  // Auto-select model based on available API keys
  let model = options.model;
  if (!model) {
    if (process.env.ANTHROPIC_API_KEY) {
      model = "claude-sonnet";
    } else if (process.env.OPENAI_API_KEY) {
      model = "gpt-4o";
    } else {
      throw new Error(
        "No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY."
      );
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (model === "claude-sonnet" || model === "claude-haiku") {
        return await callClaude(prompt, model, maxTokens, temperature);
      } else if (model === "gpt-4o" || model === "gpt-4o-mini" || model === "gpt-5-nano") {
        return await callOpenAI(prompt, model, maxTokens, temperature);
      } else {
        throw new Error(`Unknown model: ${model}`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `AI generation attempt ${attempt}/${MAX_RETRIES} failed (${model}):`,
        lastError.message
      );

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw new Error(
    `AI generation failed after ${MAX_RETRIES} attempts: ${lastError?.message}`
  );
}

// Claude API (Anthropic) — raw fetch, no SDK required
async function callClaude(
  prompt: string,
  model: "claude-sonnet" | "claude-haiku",
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const modelId =
    model === "claude-haiku"
      ? "claude-haiku-4-5-20251001"
      : "claude-sonnet-4-5-20251001";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find(
    (block: { type: string }) => block.type === "text"
  );
  if (!textBlock?.text) {
    throw new Error("No text content in Claude response");
  }

  return textBlock.text;
}

// OpenAI API — raw fetch, no SDK required
async function callOpenAI(
  prompt: string,
  model: "gpt-4o" | "gpt-4o-mini" | "gpt-5-nano",
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const MODEL_MAP: Record<string, string> = {
    "gpt-4o": "gpt-4o",
    "gpt-4o-mini": "gpt-4o-mini",
    "gpt-5-nano": "gpt-5-nano",
  };
  const modelId = MODEL_MAP[model] || "gpt-4o";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content in OpenAI response");
  }

  return content;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
