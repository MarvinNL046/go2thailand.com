import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

interface CityExploreMoreProps {
  citySlug: string;
  cityName: string;
  currentPage: string;
  hasCluster?: boolean;
}

interface SubPage {
  slug: string;
  tKey: string;
  icon: string;
}

const coreSubPages: SubPage[] = [
  { slug: 'top-10-attractions', tKey: 'nav.top10Attractions', icon: '🏛️' },
  { slug: 'top-10-hotels', tKey: 'nav.top10Hotels', icon: '🏨' },
  { slug: 'top-10-restaurants', tKey: 'nav.top10Restaurants', icon: '🍽️' },
  { slug: 'food', tKey: 'nav.foodGuide', icon: '🥘' },
  { slug: 'hotels', tKey: 'nav.hotels', icon: '🛏️' },
  { slug: 'best-time-to-visit', tKey: 'nav.bestTimeToVisit', icon: '📅' },
  { slug: 'budget', tKey: 'nav.budgetGuide', icon: '💰' },
];

const nicheSubPages: SubPage[] = [
  { slug: 'cooking-classes', tKey: 'nav.cookingClasses', icon: '👨‍🍳' },
  { slug: 'elephant-sanctuaries', tKey: 'nav.elephantSanctuaries', icon: '🐘' },
  { slug: 'diving-snorkeling', tKey: 'nav.divingSnorkeling', icon: '🤿' },
];

export default function CityExploreMore({
  citySlug,
  cityName,
  currentPage,
  hasCluster = false,
}: CityExploreMoreProps) {
  const { t } = useTranslation('common');
  const isNichePage = nicheSubPages.some((p) => p.slug === currentPage);

  // Show core pages always; include niche pages only if current page is a niche one
  const allPages = isNichePage ? [...coreSubPages, ...nicheSubPages] : coreSubPages;
  const pages = allPages.filter((p) => p.slug !== currentPage);

  const clusterLinks = hasCluster
    ? [
        { href: `/destinations/${citySlug}/`, icon: '🗺️', tKey: 'nav.destinationGuide' },
        { href: `/things-to-do/${citySlug}/`, icon: '🎯', tKey: 'nav.thingsToDo' },
      ]
    : [];

  if (pages.length === 0 && clusterLinks.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t('nav.exploreMoreIn')} {cityName}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {clusterLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 flex items-center gap-3 hover:shadow-md hover:border-blue-300 transition-all duration-200"
          >
            <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
              {link.icon}
            </span>
            <span className="text-sm font-medium text-gray-800 leading-tight">
              {t(link.tKey)}
            </span>
          </Link>
        ))}
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/city/${citySlug}/${page.slug}/`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md hover:border-blue-200 transition-all duration-200"
          >
            <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
              {page.icon}
            </span>
            <span className="text-sm font-medium text-gray-800 leading-tight">
              {t(page.tKey)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
