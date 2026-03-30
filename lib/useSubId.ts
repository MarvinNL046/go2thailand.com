// lib/useSubId.ts
// Auto-detect page type from URL for Travelpayouts SubID tracking
import { useRouter } from 'next/router';

const PATH_SUBID_MAP: [RegExp, string][] = [
  [/^\/blog\/[^/]/, 'blog'],
  [/^\/blog\/?$/, 'blog-index'],
  [/^\/city\/[^/]+\/weather/, 'city-weather'],
  [/^\/city\/[^/]+\/attractions/, 'city-attraction'],
  [/^\/city\//, 'city'],
  [/^\/transport\/[^/]/, 'transport-route'],
  [/^\/transport\/?$/, 'transport'],
  [/^\/best-hotels\//, 'hotels'],
  [/^\/guides\/where-to-stay\//, 'where-to-stay'],
  [/^\/guides\/travel-guide\//, 'travel-guide'],
  [/^\/things-to-do\//, 'things-to-do'],
  [/^\/destinations\//, 'destination'],
  [/^\/itineraries\//, 'itinerary'],
  [/^\/compare\//, 'compare'],
  [/^\/food\//, 'food'],
  [/^\/region\//, 'region'],
  [/^\/province\//, 'province'],
  [/^\/visa\//, 'visa'],
  [/^\/expat/, 'expat'],
  [/^\/activities/, 'activities'],
  [/^\/thailand-in\//, 'month-guide'],
  [/^\/thailand-street-food/, 'street-food'],
  [/^\/thailand-temples/, 'temples'],
  [/^\/phuket-beaches/, 'beaches'],
  [/^\/$/, 'home'],
];

export function getSubIdFromPath(pathname: string): string {
  for (const [pattern, subId] of PATH_SUBID_MAP) {
    if (pattern.test(pathname)) return subId;
  }
  return 'other';
}

export function useSubId(): string {
  const router = useRouter();
  return getSubIdFromPath(router.asPath);
}
