import cities from '../data/cities/index.json';
import islands from '../data/islands/index.json';

export interface DestinationOption {
  name: string;
  href: string;
  keywords: string[];
}

type SearchablePlace = {
  slug: string;
  name: { en: string; nl?: string };
  province?: string;
  region?: string;
  highlights?: string[];
};

const featuredSlugs = [
  'bangkok',
  'chiang-mai',
  'phuket',
  'krabi',
  'koh-samui',
  'koh-phangan',
] as const;

const citySlugs = new Set(cities.map((city) => city.slug));

function toOption(place: SearchablePlace, section: 'city' | 'islands'): DestinationOption {
  const names = [place.name.en, place.name.nl].filter(Boolean) as string[];
  const keywords = [
    ...names,
    place.slug.replaceAll('-', ' '),
    place.province,
    place.region,
    ...(place.highlights ?? []),
  ]
    .filter(Boolean)
    .map((keyword) => String(keyword).toLocaleLowerCase());

  return {
    name: place.name.nl || place.name.en,
    href: `/${section}/${place.slug}/`,
    keywords: [...new Set(keywords)],
  };
}

const allOptions = [
  ...(cities as SearchablePlace[]).map((city) => toOption(city, 'city')),
  ...(islands as SearchablePlace[])
    .filter((island) => !citySlugs.has(island.slug))
    .map((island) => toOption(island, 'islands')),
];

const featuredOrder = new Map<string, number>(featuredSlugs.map((slug, index) => [slug, index]));

export const destinationOptions = allOptions.sort((left, right) => {
  const leftSlug = left.href.split('/').filter(Boolean).at(-1) || '';
  const rightSlug = right.href.split('/').filter(Boolean).at(-1) || '';
  const leftRank = featuredOrder.get(leftSlug) ?? Number.MAX_SAFE_INTEGER;
  const rightRank = featuredOrder.get(rightSlug) ?? Number.MAX_SAFE_INTEGER;

  if (leftRank !== rightRank) return leftRank - rightRank;
  return left.name.localeCompare(right.name, 'nl');
});
