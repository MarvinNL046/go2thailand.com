import Link from 'next/link';

interface CityExploreMoreProps {
  citySlug: string;
  cityName: string;
  currentPage: string;
  hasCluster?: boolean;
}

interface SubPage {
  slug: string;
  title: string;
  icon: string;
}

const coreSubPages: SubPage[] = [
  { slug: 'top-10-attractions', title: 'Top 10 Attractions', icon: '🏛️' },
  { slug: 'top-10-hotels', title: 'Top 10 Hotels', icon: '🏨' },
  { slug: 'top-10-restaurants', title: 'Top 10 Restaurants', icon: '🍽️' },
  { slug: 'food', title: 'Food Guide', icon: '🥘' },
  { slug: 'hotels', title: 'Hotels', icon: '🛏️' },
  { slug: 'best-time-to-visit', title: 'Best Time to Visit', icon: '📅' },
  { slug: 'budget', title: 'Budget Guide', icon: '💰' },
];

const nicheSubPages: SubPage[] = [
  { slug: 'cooking-classes', title: 'Cooking Classes', icon: '👨‍🍳' },
  { slug: 'elephant-sanctuaries', title: 'Elephant Sanctuaries', icon: '🐘' },
  { slug: 'diving-snorkeling', title: 'Diving & Snorkeling', icon: '🤿' },
];

export default function CityExploreMore({
  citySlug,
  cityName,
  currentPage,
  hasCluster = false,
}: CityExploreMoreProps) {
  const isNichePage = nicheSubPages.some((p) => p.slug === currentPage);

  // Show core pages always; include niche pages only if current page is a niche one
  const allPages = isNichePage ? [...coreSubPages, ...nicheSubPages] : coreSubPages;
  const pages = allPages.filter((p) => p.slug !== currentPage);

  const clusterLinks = hasCluster
    ? [
        { href: `/destinations/${citySlug}/`, icon: '🗺️', title: 'Destination Guide' },
        { href: `/things-to-do/${citySlug}/`, icon: '🎯', title: 'Things To Do' },
      ]
    : [];

  if (pages.length === 0 && clusterLinks.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Explore More in {cityName}
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
              {link.title}
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
              {page.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
