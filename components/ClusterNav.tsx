// components/ClusterNav.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { normalizeEnInternalHref } from '../lib/en-route-owners';
import { nlAttractionsOwner, nlCityOwner } from '../lib/nl-route-owners';

interface ClusterNavProps {
  citySlug: string;
  cityName: string;
  currentPage: 'hub' | 'things-to-do' | 'hotels' | 'where-to-stay' | 'travel-guide';
}

const pages = [
  { key: 'hub', label: 'Overview', icon: '📍', getHref: (s: string) => `/destinations/${s}/` },
  { key: 'things-to-do', label: 'Things To Do', icon: '🎯', getHref: (s: string) => `/things-to-do/${s}/` },
  { key: 'hotels', label: 'Best Hotels', icon: '🏨', getHref: (s: string) => `/best-hotels/${s}/` },
  { key: 'where-to-stay', label: 'Where To Stay', icon: '📍', getHref: (s: string) => `/where-to-stay/${s}/` },
  { key: 'travel-guide', label: 'Travel Guide', icon: '📖', getHref: (s: string) => `/guides/travel-guide/${s}/` },
];

export default function ClusterNav({ citySlug, cityName, currentPage }: ClusterNavProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const localizedPages = isNl
    ? [
        { key: 'hub', label: 'Overzicht', icon: '📍', getHref: (s: string) => nlCityOwner(s) },
        { key: 'things-to-do', label: 'Bezienswaardigheden', icon: '🎯', getHref: (s: string) => nlAttractionsOwner(s) },
        { key: 'hotels', label: 'Beste hotels', icon: '🏨', getHref: (s: string) => `/best-hotels/${s}/` },
        { key: 'travel-guide', label: 'Alle reisgidsen', icon: '📖', getHref: () => '/travel-guides/' },
      ]
    : pages;
  const seen = new Set<string>();
  const otherPages = localizedPages
    .filter(p => p.key !== currentPage)
    .map(p => ({ ...p, href: isNl ? p.getHref(citySlug) : normalizeEnInternalHref(p.getHref(citySlug)) }))
    .filter(p => {
      if (seen.has(p.href)) return false;
      seen.add(p.href);
      return true;
    });

  return (
    <nav className="bg-gradient-to-r from-thailand-blue/5 to-thailand-gold/5 border border-thailand-blue/10 rounded-2xl p-5 my-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {isNl ? `Meer over ${cityName}` : `More about ${cityName}`}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {otherPages.map(page => (
          <Link
            key={page.key}
            href={page.href}
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:shadow-md hover:text-thailand-blue transition-all duration-200 border border-gray-100"
          >
            <span role="img" aria-hidden="true">{page.icon}</span>
            {page.label}
          </Link>
        ))}
      </div>
      {/* Cross-link to existing city hub */}
      <div className="mt-3 pt-3 border-t border-gray-200/50">
        <Link
          href={isNl ? nlCityOwner(citySlug) : normalizeEnInternalHref(`/city/${citySlug}/`)}
          className="text-sm text-thailand-blue hover:underline"
        >
          {isNl ? `Bekijk alle pagina's over ${cityName} →` : `See all ${cityName} pages →`}
        </Link>
      </div>
    </nav>
  );
}
