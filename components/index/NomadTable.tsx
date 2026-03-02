/**
 * NomadTable — sortable comparison table for digital nomad data
 *
 * Columns: #, Destination, WiFi, Coworking, Monthly Cost, Community, Nomad Score.
 * Score columns use ScoreBadge. RegionFilter is rendered above the table.
 * Clicking column headers toggles sort direction (arrow indicators).
 * Default sort: nomad_score descending.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IndexCity, Region, BilingualText } from '../../lib/thailand-index';
import ScoreBadge from './ScoreBadge';
import RegionFilter from './RegionFilter';

type SortKey = 'name' | 'wifi' | 'coworking' | 'cost' | 'community' | 'nomad_score';
type SortDir = 'asc' | 'desc';

interface NomadTableProps {
  cities: IndexCity[];
  regions: Region[];
}

interface ColumnDef {
  key: SortKey | null;
  label: BilingualText;
  shortLabel?: string;
}

const columns: ColumnDef[] = [
  { key: 'name', label: { en: 'Destination', nl: 'Bestemming' } },
  { key: 'wifi', label: { en: 'WiFi', nl: 'WiFi' }, shortLabel: 'WiFi' },
  { key: 'coworking', label: { en: 'Coworking', nl: 'Coworking' }, shortLabel: 'CW' },
  { key: 'cost', label: { en: 'Monthly Cost', nl: 'Maandkosten' }, shortLabel: 'Cost' },
  { key: 'community', label: { en: 'Community', nl: 'Community' }, shortLabel: 'Comm.' },
  { key: 'nomad_score', label: { en: 'Nomad Score', nl: 'Nomad Score' }, shortLabel: 'Score' },
];

const COMMUNITY_RANK: Record<string, number> = {
  large: 4,
  medium: 3,
  small: 2,
  minimal: 1,
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getSortValue(city: IndexCity, key: SortKey, locale: string): number | string {
  switch (key) {
    case 'name':
      return (city.name[(locale as keyof BilingualText)] || city.name.en).toLowerCase();
    case 'wifi':
      return city.nomad?.wifi_avg_mbps ?? -1;
    case 'coworking':
      return city.nomad?.coworking_spaces ?? -1;
    case 'cost':
      return city.nomad?.monthly_cost_usd ?? 99999;
    case 'community':
      return COMMUNITY_RANK[city.nomad?.nomad_community_size ?? ''] ?? 0;
    case 'nomad_score':
      return city.scores?.nomad_score ?? -1;
  }
}

/** Default sort directions per key */
function defaultDir(key: SortKey): SortDir {
  // Cost: ascending by default (lower is better)
  // Name: alphabetical ascending
  if (key === 'cost' || key === 'name') return 'asc';
  return 'desc';
}

const NomadTable: React.FC<NomadTableProps> = ({ cities, regions }) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  const [sortKey, setSortKey] = useState<SortKey>('nomad_score');
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
      setSortDir(defaultDir(key));
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
                <ScoreBadge score={city.scores?.nomad_score ?? null} size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-400 text-xs">WiFi</span>
                  <div className="font-semibold text-gray-700">
                    {city.nomad?.wifi_avg_mbps != null
                      ? `${city.nomad.wifi_avg_mbps} Mbps`
                      : '-'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Coworking</span>
                  <div className="font-semibold text-gray-700">
                    {city.nomad?.coworking_spaces ?? '-'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Maandkosten' : 'Monthly Cost'}
                  </span>
                  <div className="font-semibold text-gray-700">
                    {city.nomad?.monthly_cost_usd != null
                      ? `$${city.nomad.monthly_cost_usd}`
                      : '-'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Community</span>
                  <div className="font-semibold text-gray-700">
                    {city.nomad?.nomad_community_size
                      ? capitalize(city.nomad.nomad_community_size)
                      : '-'}
                  </div>
                </div>
              </div>
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

                  {/* WiFi */}
                  <td className="px-3 py-3 font-medium text-gray-700 text-center">
                    {city.nomad?.wifi_avg_mbps != null
                      ? `${city.nomad.wifi_avg_mbps} Mbps`
                      : '-'}
                  </td>

                  {/* Coworking */}
                  <td className="px-3 py-3 font-medium text-gray-700 text-center">
                    {city.nomad?.coworking_spaces ?? '-'}
                  </td>

                  {/* Monthly Cost */}
                  <td className="px-3 py-3 font-medium text-gray-700 text-center">
                    {city.nomad?.monthly_cost_usd != null
                      ? `$${city.nomad.monthly_cost_usd}`
                      : '-'}
                  </td>

                  {/* Community */}
                  <td className="px-3 py-3 text-gray-700 text-center">
                    {city.nomad?.nomad_community_size
                      ? capitalize(city.nomad.nomad_community_size)
                      : '-'}
                  </td>

                  {/* Nomad Score */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores?.nomad_score ?? null} size="sm" />
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

export default NomadTable;
