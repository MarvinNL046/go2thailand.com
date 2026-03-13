// components/ClusterNav.tsx
import Link from 'next/link';

interface ClusterNavProps {
  citySlug: string;
  cityName: string;
  currentPage: 'hub' | 'things-to-do' | 'hotels' | 'where-to-stay' | 'travel-guide';
}

const pages = [
  { key: 'hub', label: 'Overview', icon: '📍', getHref: (s: string) => `/destinations/${s}/` },
  { key: 'things-to-do', label: 'Things To Do', icon: '🎯', getHref: (s: string) => `/things-to-do/${s}/` },
  { key: 'hotels', label: 'Best Hotels', icon: '🏨', getHref: (s: string) => `/best-hotels/${s}/` },
  { key: 'where-to-stay', label: 'Where To Stay', icon: '📍', getHref: (s: string) => `/guides/where-to-stay/${s}/` },
  { key: 'travel-guide', label: 'Travel Guide', icon: '📖', getHref: (s: string) => `/guides/travel-guide/${s}/` },
];

export default function ClusterNav({ citySlug, cityName, currentPage }: ClusterNavProps) {
  const otherPages = pages.filter(p => p.key !== currentPage);

  return (
    <nav className="bg-gradient-to-r from-thailand-blue/5 to-thailand-gold/5 border border-thailand-blue/10 rounded-2xl p-5 my-8">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        More about {cityName}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {otherPages.map(page => (
          <Link
            key={page.key}
            href={page.getHref(citySlug)}
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
          href={`/city/${citySlug}/`}
          className="text-sm text-thailand-blue hover:underline"
        >
          See all {cityName} pages →
        </Link>
      </div>
    </nav>
  );
}
