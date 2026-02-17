// -------------------------------------------------------------------
// Affiliate link injection for go2thailand.com blog posts
// -------------------------------------------------------------------
// Partners and their tracking URLs:
//   Booking.com   → https://booking.tpo.lv/2PT1kR82
//   Klook         → https://klook.tpo.lv/7Dt6WApj
//   GetYourGuide  → https://getyourguide.tpo.lv/GuAFfGGK
//   12Go Asia     → https://12go.tpo.lv/tNA80urD
//   Saily eSIM    → https://saily.tpo.lv/rf9lidnE
//   Trip.com      → https://trip.tpo.lv/TmObooZ5
// -------------------------------------------------------------------

export const AFFILIATE_LINKS = {
  booking: "https://booking.tpo.lv/2PT1kR82",
  klook: "https://klook.tpo.lv/7Dt6WApj",
  getyourguide: "https://getyourguide.tpo.lv/GuAFfGGK",
  "12go": "https://12go.tpo.lv/tNA80urD",
  saily: "https://saily.tpo.lv/rf9lidnE",
  trip: "https://trip.tpo.lv/TmObooZ5",
} as const;

export type AffiliatePartner = keyof typeof AFFILIATE_LINKS;

// -------------------------------------------------------------------
// Keyword → affiliate mapping
// -------------------------------------------------------------------

interface AffiliateRule {
  pattern: RegExp;
  partner: AffiliatePartner;
  // Text to use for the inline link anchor
  linkText: string;
}

// Rules are evaluated in order — first match wins for inline injection
const AFFILIATE_RULES: AffiliateRule[] = [
  // eSIM / SIM Card → Saily
  {
    pattern: /\b(eSIM|e-SIM|SIM card|data SIM|travel SIM|mobile data|internet connection|stay connected)\b/i,
    partner: "saily",
    linkText: "Get Saily eSIM",
  },
  // Transport: bus, minivan, ferry, train, boat → 12Go
  {
    pattern:
      /\b(bus ticket|bus ride|minivan|night bus|overnight bus|ferry|ferry ride|boat ticket|boat ride|train ticket|train ride|train journey|book.*transport|book.*transfer|12Go|Songthaew|shared taxi|slow boat)\b/i,
    partner: "12go",
    linkText: "Book on 12Go",
  },
  // Flights / trip search → Trip.com
  {
    pattern:
      /\b(flight|flights|book.*flight|search.*flight|airline|trip\.com|cheap flight|domestic flight|fly to)\b/i,
    partner: "trip",
    linkText: "Search on Trip.com",
  },
  // Activities: tour, cooking class, snorkeling, diving, etc. → Klook (primary)
  {
    pattern:
      /\b(cooking class|snorkeling tour|snorkeling|diving course|scuba diving|day trip|elephant sanctuary|muay thai class|zip.?lin|kayak tour|Klook|boat tour|island tour|jungle trek)\b/i,
    partner: "klook",
    linkText: "Book on Klook",
  },
  // Activities: general tour/activity → GetYourGuide (secondary)
  {
    pattern:
      /\b(guided tour|walking tour|food tour|group tour|tour operator|activities|excursion|experience|GetYourGuide)\b/i,
    partner: "getyourguide",
    linkText: "Book on GetYourGuide",
  },
  // Hotels / accommodation → Booking.com
  {
    pattern:
      /\b(hotel|hotels|hostel|resort|guesthouse|guest house|villa|bungalow|accommodation|accommodations|where to stay|book.*stay|Booking\.com|place to stay|lodging)\b/i,
    partner: "booking",
    linkText: "Book on Booking.com",
  },
];

// -------------------------------------------------------------------
// CTA box templates
// -------------------------------------------------------------------

interface CtaBox {
  partner: AffiliatePartner;
  emoji: string;
  heading: string;
  body: string;
  cta: string;
}

const CTA_BOXES: CtaBox[] = [
  {
    partner: "booking",
    emoji: "🏨",
    heading: "Book Your Stay",
    body: "Compare hotels, resorts, and guesthouses across Thailand with free cancellation on most bookings.",
    cta: "Search Hotels on Booking.com →",
  },
  {
    partner: "klook",
    emoji: "🎒",
    heading: "Book Tours & Activities",
    body: "Skip the hassle — book Thailand day trips, cooking classes, and experiences in advance with instant confirmation.",
    cta: "Browse Activities on Klook →",
  },
  {
    partner: "12go",
    emoji: "🚌",
    heading: "Book Transport in Thailand",
    body: "Book buses, trains, ferries, and transfers between Thai cities easily online. Compare routes and prices.",
    cta: "Book Transport on 12Go →",
  },
  {
    partner: "saily",
    emoji: "📱",
    heading: "Stay Connected in Thailand",
    body: "Get a Thailand eSIM before you land. No physical SIM needed — activate instantly on your phone.",
    cta: "Get Saily eSIM for Thailand →",
  },
  {
    partner: "getyourguide",
    emoji: "🗺️",
    heading: "Explore Thailand with a Guide",
    body: "Discover the best guided tours and activities in Bangkok, Chiang Mai, Phuket and beyond.",
    cta: "Browse Tours on GetYourGuide →",
  },
  {
    partner: "trip",
    emoji: "✈️",
    heading: "Find Flights to Thailand",
    body: "Search and compare flights to Bangkok, Phuket, Chiang Mai and Koh Samui at the best prices.",
    cta: "Search Flights on Trip.com →",
  },
];

// -------------------------------------------------------------------
// Inline link injection
// -------------------------------------------------------------------

// Inject affiliate links inline into the Markdown content.
// Finds the FIRST occurrence of each matching keyword and wraps it in a link.
// Only injects once per partner to avoid over-linking.
export function injectInlineLinks(content: string): string {
  // Track which partners have already been linked inline
  const injected = new Set<AffiliatePartner>();

  // Work on the body only (skip YAML frontmatter)
  const { frontmatter, body } = splitFrontmatter(content);

  let processedBody = body;

  for (const rule of AFFILIATE_RULES) {
    if (injected.has(rule.partner)) continue;

    const url = AFFILIATE_LINKS[rule.partner];

    // Find the first match in the body
    const match = rule.pattern.exec(processedBody);
    if (!match) continue;

    // Don't inject inside an existing Markdown link [...](...) or code block
    const matchIndex = match.index;
    if (isInsideLink(processedBody, matchIndex)) continue;
    if (isInsideCodeBlock(processedBody, matchIndex)) continue;

    // Replace only the first occurrence with an inline link
    const originalText = match[0];
    const linkedText = `[${originalText}](${url})`;
    processedBody =
      processedBody.slice(0, matchIndex) +
      linkedText +
      processedBody.slice(matchIndex + originalText.length);

    injected.add(rule.partner);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// CTA box injection
// -------------------------------------------------------------------

// Inject 2-3 affiliate CTA boxes into the content at strategic positions.
// Boxes are placed after H2 sections to break up the content naturally.
export function injectCtaBoxes(
  content: string,
  count: number = 3
): string {
  const { frontmatter, body } = splitFrontmatter(content);

  // Select which CTA boxes to inject based on content relevance
  const selectedBoxes = selectRelevantCtaBoxes(body, count);
  if (selectedBoxes.length === 0) return content;

  // Find H2 section positions to insert after
  const h2Positions = findH2Positions(body);

  if (h2Positions.length < 2) {
    // Not enough H2s — append at end of body
    const ctaMarkdown = selectedBoxes.map(renderCtaBox).join("\n\n");
    return frontmatter + body.trimEnd() + "\n\n" + ctaMarkdown + "\n";
  }

  // Insert boxes at evenly spaced H2 boundaries
  const insertPositions = pickInsertPositions(h2Positions, selectedBoxes.length);

  // Insert from end to start to avoid messing up indices
  let processedBody = body;
  for (let i = insertPositions.length - 1; i >= 0; i--) {
    const pos = insertPositions[i];
    const box = renderCtaBox(selectedBoxes[i]);
    processedBody =
      processedBody.slice(0, pos) +
      "\n\n" +
      box +
      "\n\n" +
      processedBody.slice(pos);
  }

  return frontmatter + processedBody;
}

// -------------------------------------------------------------------
// Main entry point — inject both inline links and CTA boxes
// -------------------------------------------------------------------

export interface InjectionOptions {
  inlineLinks?: boolean;   // Inject inline affiliate links (default: true)
  ctaBoxes?: boolean;      // Inject CTA blockquote boxes (default: true)
  ctaCount?: number;       // Number of CTA boxes to inject (default: 2)
}

export function injectAffiliateLinks(
  content: string,
  options: InjectionOptions = {}
): string {
  const {
    inlineLinks = true,
    ctaBoxes = true,
    ctaCount = 2,
  } = options;

  let result = content;

  if (inlineLinks) {
    result = injectInlineLinks(result);
  }

  if (ctaBoxes) {
    result = injectCtaBoxes(result, ctaCount);
  }

  return result;
}

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function renderCtaBox(box: CtaBox): string {
  const url = AFFILIATE_LINKS[box.partner];
  return `> ${box.emoji} **${box.heading}**\n> ${box.body}\n> [${box.cta}](${url})`;
}

// Select CTA boxes most relevant to the post content
function selectRelevantCtaBoxes(body: string, count: number): CtaBox[] {
  const lower = body.toLowerCase();
  const scored = CTA_BOXES.map((box) => {
    let score = 0;
    if (box.partner === "booking" && (lower.includes("hotel") || lower.includes("stay") || lower.includes("accommodation"))) score += 3;
    if (box.partner === "klook" && (lower.includes("tour") || lower.includes("activity") || lower.includes("cooking class") || lower.includes("elephant") || lower.includes("snorkeling"))) score += 3;
    if (box.partner === "12go" && (lower.includes("bus") || lower.includes("ferry") || lower.includes("train") || lower.includes("transport") || lower.includes("transfer"))) score += 3;
    if (box.partner === "saily" && (lower.includes("esim") || lower.includes("sim") || lower.includes("data") || lower.includes("internet") || lower.includes("connected"))) score += 3;
    if (box.partner === "getyourguide" && (lower.includes("tour") || lower.includes("guide") || lower.includes("excursion"))) score += 2;
    if (box.partner === "trip" && (lower.includes("flight") || lower.includes("airport") || lower.includes("fly"))) score += 3;
    // Everyone gets base score — Booking.com and Klook are always relevant for Thailand
    if (box.partner === "booking") score += 1;
    if (box.partner === "klook") score += 1;
    return { box, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.box);
}

// Find character positions (end of line) after H2 headings in Markdown
function findH2Positions(body: string): number[] {
  const positions: number[] = [];
  const lines = body.split("\n");
  let charPos = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    charPos += line.length + 1; // +1 for newline

    if (line.match(/^## /)) {
      // Find the end of this H2's first paragraph (2+ blank lines or next H2)
      let endPos = charPos;
      for (let j = i + 1; j < lines.length && j < i + 20; j++) {
        const nextLine = lines[j];
        endPos += nextLine.length + 1;
        // Stop at next heading or after a substantial paragraph
        if (nextLine.match(/^#{1,3} /) && j > i + 3) break;
      }
      positions.push(endPos);
    }
  }

  return positions;
}

// Pick evenly spaced insert positions from available H2 positions
function pickInsertPositions(
  positions: number[],
  count: number
): number[] {
  if (positions.length <= count) return positions.slice(1); // Skip very first section

  const step = Math.floor(positions.length / (count + 1));
  return Array.from({ length: count }, (_, i) => positions[(i + 1) * step]);
}

// Check if a position in the string is inside an existing Markdown link
function isInsideLink(text: string, pos: number): boolean {
  // Look backwards for unmatched [ and forwards for ](
  const before = text.slice(Math.max(0, pos - 200), pos);
  const after = text.slice(pos, Math.min(text.length, pos + 200));
  // If there's a [ before that corresponds to a ]( after, we're inside a link
  const openBracket = before.lastIndexOf("[");
  const closeBracket = after.indexOf("](");
  return openBracket !== -1 && closeBracket !== -1 && openBracket > before.lastIndexOf("]");
}

// Check if a position is inside a code block (``` ... ```)
function isInsideCodeBlock(text: string, pos: number): boolean {
  const before = text.slice(0, pos);
  const codeBlockCount = (before.match(/```/g) || []).length;
  // If there's an odd number of ``` before the position, we're inside a code block
  return codeBlockCount % 2 === 1;
}

// Split content into frontmatter and body
function splitFrontmatter(content: string): {
  frontmatter: string;
  body: string;
} {
  const match = content.match(/^(---[\s\S]*?---\n?)([\s\S]*)$/);
  if (match) {
    return { frontmatter: match[1], body: match[2] };
  }
  return { frontmatter: "", body: content };
}
