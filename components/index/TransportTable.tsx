/**
 * TransportTable — sortable comparison table for transport data
 *
 * Columns: #, Destination, Region, Connections, Popular Routes, Hub Score, Top Destinations.
 * Score columns use ScoreBadge. RegionFilter is rendered above the table.
 * Clicking column headers toggles sort direction (arrow indicators).
 * Default sort: hubness descending.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IndexCity, Region, BilingualText } from '../../lib/thailand-index';
import ScoreBadge from './ScoreBadge';
import RegionFilter from './RegionFilter';

type SortKey = 'name' | 'connections' | 'popular' | 'hubness';
type SortDir = 'asc' | 'desc';

interface TransportTableProps {
  cities: IndexCity[];
  regions: Region[];
}

interface ColumnDef {
  key: SortKey | null;
  label: BilingualText;
  /** Short header for mobile */
  shortLabel?: string;
}

const columns: ColumnDef[] = [
  { key: 'name', label: { en: 'Destination', nl: 'Bestemming' } },
  { key: null, label: { en: 'Region', nl: 'Regio' } },
  { key: 'connections', label: { en: 'Connections', nl: 'Verbindingen' }, shortLabel: 'Conn.' },
  { key: 'popular', label: { en: 'Popular Routes', nl: 'Populaire Routes' }, shortLabel: 'Pop.' },
  { key: 'hubness', label: { en: 'Hub Score', nl: 'Hub Score' }, shortLabel: 'Hub' },
  { key: null, label: { en: 'Top Destinations', nl: 'Top Bestemmingen' }, shortLabel: 'Top' },
];

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getSortValue(city: IndexCity, key: SortKey, locale: string): number | string {
  switch (key) {
    case 'name':
      return (city.name[(locale as keyof BilingualText)] || city.name.en).toLowerCase();
    case 'connections':
      return city.transport?.connections ?? 0;
    case 'popular':
      return city.transport?.popular_routes ?? 0;
    case 'hubness':
      return city.transport?.hubness ?? 0;
  }
}

const TransportTable: React.FC<TransportTableProps> = ({ cities, regions }) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  const [sortKey, setSortKey] = useState<SortKey>('hubness');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Filter by region
  const filtered = useMemo(() => {
    if (!activeRegion) return cities;
    const region = regions.find((r) => r.slug === activeRegion);
    if (!region) return cities;
    const slugSet = new Set(region.city_slugs);
    return cities.filter((c) => slugSet.has(c.slug));
  }, [cities, regions, activeRegion]);

  // Sort
  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aVal = getSortValue(a, sortKey, loc);
      const bVal = getSortValue(b, sortKey, loc);
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      const diff = (aVal as number) - (bVal as number);
      return sortDir === 'asc' ? diff : -diff;
    });
    return copy;
  }, [filtered, sortKey, sortDir, loc]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      // Default direction: desc for scores/counts, asc for name
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  }

  function SortArrow({ columnKey }: { columnKey: SortKey }) {
    if (columnKey !== sortKey) {
      return <span className="ml-1 text-gray-300">&uarr;&darr;</span>;
    }
    return (
      <span className="ml-1 text-thailand-red">
        {sortDir === 'asc' ? '\u2191' : '\u2193'}
      </span>
    );
  }

  return (
    <div>
      {/* Region filter */}
      <div className="mb-6">
        <RegionFilter
          regions={regions}
          activeRegion={activeRegion}
          onChange={setActiveRegion}
        />
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((city, idx) => {
          const displayName = city.name[loc] || city.name.en;
          const topRoutes = city.transport?.top_routes?.slice(0, 3) ?? [];
          return (
            <Link
              key={city.slug}
              href={`/city/${city.slug}/`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium text-sm w-6">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-thailand-blue">
                    {displayName}
                  </span>
                </div>
                <ScoreBadge score={city.transport?.hubness ?? null} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Verbindingen' : 'Connections'}
                  </span>
                  <div className="font-semibold text-gray-700">
                    {city.transport?.connections ?? 0}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Populaire Routes' : 'Popular Routes'}
                  </span>
                  <div className="font-semibold text-gray-700">
                    {city.transport?.popular_routes ?? 0}
                  </div>
                </div>
              </div>
              {topRoutes.length > 0 && (
                <p className="text-xs text-gray-400 mt-2 truncate">
                  {topRoutes.map((r) => formatCityName(r.to)).join(', ')}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-cream border-b border-gray-200">
              {/* Rank column */}
              <th className="px-3 py-3 text-left font-semibold text-gray-500 w-12">
                #
              </th>

              {columns.map((col, i) => {
                const isSortable = col.key !== null;
                return (
                  <th
                    key={i}
                    className={`px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap ${
                      isSortable
                        ? 'cursor-pointer select-none hover:text-thailand-red transition-colors'
                        : ''
                    }`}
                    onClick={isSortable ? () => handleSort(col.key!) : undefined}
                  >
                    <span className="hidden sm:inline">{col.label[loc] || col.label.en}</span>
                    <span className="sm:hidden">{col.shortLabel || col.label[loc] || col.label.en}</span>
                    {isSortable && <SortArrow columnKey={col.key!} />}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((city, idx) => {
              const displayName = city.name[loc] || city.name.en;
              const topRoutes = city.transport?.top_routes?.slice(0, 3) ?? [];
              return (
                <tr
                  key={city.slug}
                  className="border-b border-gray-100 hover:bg-surface-cream/50 transition-colors"
                >
                  {/* Rank */}
                  <td className="px-3 py-3 text-gray-400 font-medium">
                    {idx + 1}
                  </td>

                  {/* Destination */}
                  <td className="px-3 py-3">
                    <Link
                      href={`/city/${city.slug}/`}
                      className="font-semibold text-thailand-blue hover:text-thailand-red transition-colors"
                    >
                      {displayName}
                    </Link>
                  </td>

                  {/* Region */}
                  <td className="px-3 py-3 text-gray-500 text-xs">
                    {city.region ? (city.region.name[loc] || city.region.name.en) : ''}
                  </td>

                  {/* Connections */}
                  <td className="px-3 py-3 font-medium text-gray-700 text-center">
                    {city.transport?.connections ?? 0}
                  </td>

                  {/* Popular Routes */}
                  <td className="px-3 py-3 font-medium text-gray-700 text-center">
                    {city.transport?.popular_routes ?? 0}
                  </td>

                  {/* Hub Score */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.transport?.hubness ?? null} size="sm" />
                  </td>

                  {/* Top Destinations */}
                  <td className="px-3 py-3 text-xs text-gray-500 max-w-[200px] truncate">
                    {topRoutes.length > 0
                      ? topRoutes.map((r) => formatCityName(r.to)).join(', ')
                      : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Result count */}
      <p className="mt-3 text-xs text-gray-400">
        {sorted.length} {loc === 'nl' ? 'bestemmingen' : 'destinations'}
      </p>
    </div>
  );
};

export default TransportTable;
