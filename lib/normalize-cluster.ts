// lib/normalize-cluster.ts
// Normalizes AI-generated cluster data to match expected TypeScript types.
// Handles common inconsistencies: objects instead of strings, missing arrays, nested structures.

/** Flatten any value to a renderable string */
function toStr(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val == null) return '';
  if (Array.isArray(val)) return val.map(toStr).join(' ');
  if (typeof val === 'object') {
    return Object.values(val as Record<string, unknown>).map(toStr).join(' ');
  }
  return String(val);
}

/** Flatten any value to a string array */
function toStrArray(val: unknown): string[] {
  if (val == null) return [];
  if (Array.isArray(val)) {
    return val.map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>;
        // Common patterns: {name, description, priceRange} or {name, description, bestFor}
        if (obj.name && obj.description) {
          const parts = [obj.name, obj.description];
          if (obj.priceRange) parts.push(`(${obj.priceRange})`);
          return parts.join(' — ');
        }
        return Object.values(obj).filter((v) => typeof v === 'string').join(' — ');
      }
      return String(item);
    });
  }
  if (typeof val === 'string') return [val];
  return [];
}

/** Flatten a budget tier to a summary string */
function budgetTierToStr(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val == null) return '';
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const total = obj.dailyTotal ? String(obj.dailyTotal) : '';
    const notes = obj.notes ? String(obj.notes) : '';
    return [total, notes].filter(Boolean).join('. ');
  }
  return String(val);
}

export function normalizeDestinationHub(data: any): any {
  return {
    ...data,
    highlights: toStrArray(data.highlights),
    travelTips: toStrArray(data.travelTips),
    gettingThere: toStr(data.gettingThere),
    gettingAround: toStr(data.gettingAround),
    topAttractions: data.topAttractions || [],
    bestTimeToVisit: {
      peak: toStr(data.bestTimeToVisit?.peak),
      shoulder: toStr(data.bestTimeToVisit?.shoulder),
      lowSeason: toStr(data.bestTimeToVisit?.lowSeason),
      recommendation: toStr(data.bestTimeToVisit?.recommendation),
    },
  };
}

export function normalizeTravelGuide(data: any): any {
  return {
    ...data,
    transport: {
      fromBangkok: toStr(data.transport?.fromBangkok),
      localTransport: toStrArray(data.transport?.localTransport),
    },
    food: {
      mustTry: toStrArray(data.food?.mustTry),
      foodAreas: toStrArray(data.food?.foodAreas),
      tips: toStrArray(data.food?.tips),
    },
    etiquette: toStrArray(data.etiquette),
    budget: {
      budget: budgetTierToStr(data.budget?.budget),
      midRange: budgetTierToStr(data.budget?.midRange),
      luxury: budgetTierToStr(data.budget?.luxury),
    },
    itinerary: data.itinerary || { title: '', days: [] },
  };
}

export function normalizeWhereToStay(data: any): any {
  return {
    ...data,
    neighborhoods: data.neighborhoods || [],
    generalTips: toStrArray(data.generalTips),
  };
}
