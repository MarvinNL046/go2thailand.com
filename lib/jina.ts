/**
 * Jina AI utilities for web search.
 * Search API — web search with structured results.
 */

const SEARCH_BASE = 'https://s.jina.ai';

export async function jinaSearch(query: string): Promise<string> {
  const apiKey = process.env.JINA_SEARCH_API_KEY;
  if (!apiKey) throw new Error('JINA_SEARCH_API_KEY is not set');

  const res = await fetch(`${SEARCH_BASE}/?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`Jina Search error ${res.status}: ${res.statusText}`);
  }

  return res.text();
}
