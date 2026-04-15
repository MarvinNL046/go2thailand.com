type SupportedCitySlug = 'bangkok' | 'chiang-mai' | 'phuket' | 'krabi' | 'koh-samui';
type AudienceSlug = 'first-time' | 'family' | 'nightlife' | 'budget';
type HotelCategorySlug = 'budget' | 'luxury' | 'beachfront';

interface BlogBuyerIntentInput {
  slug: string;
  title?: string;
  tags?: string[];
}

interface LabelledSlug<T extends string> {
  slug: T;
  label: string;
}

interface BuyerIntentLink {
  href: string;
  label: string;
}

export interface BlogBuyerIntentContext {
  citySlug: SupportedCitySlug;
  cityName: string;
  audience: LabelledSlug<AudienceSlug>;
  hotelCategory: LabelledSlug<HotelCategorySlug> | null;
  links: BuyerIntentLink[];
}

const SUPPORTED_CITIES: Array<{
  slug: SupportedCitySlug;
  name: string;
  patterns: RegExp[];
  coastal: boolean;
}> = [
  { slug: 'bangkok', name: 'Bangkok', patterns: [/\bbangkok\b/g], coastal: false },
  { slug: 'chiang-mai', name: 'Chiang Mai', patterns: [/\bchiang[\s-]?mai\b/g], coastal: false },
  { slug: 'phuket', name: 'Phuket', patterns: [/\bphuket\b/g], coastal: true },
  { slug: 'krabi', name: 'Krabi', patterns: [/\bkrabi\b/g], coastal: true },
  { slug: 'koh-samui', name: 'Koh Samui', patterns: [/\bkoh[\s-]?samui\b/g, /\bsamui\b/g], coastal: true },
];

function countMatches(text: string, patterns: RegExp[]) {
  return patterns.reduce((total, pattern) => {
    const matches = text.match(pattern);
    return total + (matches ? matches.length : 0);
  }, 0);
}

function detectCity(text: string) {
  const scored = SUPPORTED_CITIES
    .map((city) => ({ city, score: countMatches(text, city.patterns) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  if (scored.length > 1 && scored[0].score === scored[1].score) return null;
  return scored[0].city;
}

function detectAudience(text: string): LabelledSlug<AudienceSlug> {
  if (/\b(family|families|kids|kid-friendly|children)\b/.test(text)) {
    return { slug: 'family', label: 'families' };
  }
  if (/\b(nightlife|party|bars|bar|club|clubs|cocktail|rooftop|beach club|night market)\b/.test(text)) {
    return { slug: 'nightlife', label: 'nightlife' };
  }
  if (/\b(budget|cheap|affordable|backpacker|backpackers|hostel|low-cost)\b/.test(text)) {
    return { slug: 'budget', label: 'budget travellers' };
  }
  return { slug: 'first-time', label: 'first-time visitors' };
}

function detectHotelCategory(
  text: string,
  city: { coastal: boolean },
): LabelledSlug<HotelCategorySlug> | null {
  if (/\b(budget|cheap|affordable|hostel|backpacker|backpackers)\b/.test(text)) {
    return { slug: 'budget', label: 'budget' };
  }

  if (
    city.coastal &&
    /\b(beach|beachfront|beach club|island|islands|snorkel|snorkeling|diving|resort|sea view|seafront|bay)\b/.test(text)
  ) {
    return { slug: 'beachfront', label: 'beachfront' };
  }

  if (/\b(luxury|five-star|5-star|spa|wellness|retreat|villa|villas|honeymoon|cocktail)\b/.test(text)) {
    return { slug: 'luxury', label: 'luxury' };
  }

  return null;
}

export function getBlogBuyerIntentContext(input: BlogBuyerIntentInput): BlogBuyerIntentContext | null {
  const tags = Array.isArray(input.tags) ? input.tags : [];
  const text = `${input.slug} ${input.title || ''} ${tags.join(' ')}`.toLowerCase();
  const city = detectCity(text);

  if (!city) return null;

  const audience = detectAudience(text);
  const hotelCategory = detectHotelCategory(text, city);

  const links: BuyerIntentLink[] = [
    {
      href: `/where-to-stay/${city.slug}/first-time/`,
      label: `Where to stay in ${city.name} for first-time visitors`,
    },
  ];

  if (audience.slug !== 'first-time') {
    links.push({
      href: `/where-to-stay/${city.slug}/${audience.slug}/`,
      label: `Where to stay in ${city.name} for ${audience.label}`,
    });
  }

  links.push({
    href: `/best-hotels/${city.slug}/`,
    label: `Best hotels in ${city.name}`,
  });

  if (hotelCategory) {
    links.push({
      href: `/best-hotels/${city.slug}/${hotelCategory.slug}/`,
      label: `Best ${hotelCategory.label} hotels in ${city.name}`,
    });
  }

  return {
    citySlug: city.slug,
    cityName: city.name,
    audience,
    hotelCategory,
    links,
  };
}
