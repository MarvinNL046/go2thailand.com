/**
 * IndexTable — sortable comparison table of all indexed cities
 *
 * Columns: #, Destination (link), Budget/day, Weather, Transport, Overall.
 * Score columns use ScoreBadge. RegionFilter is rendered above the table.
 * Clicking column headers toggles sort direction (arrow indicators).
 * Default sort: overall_score descending.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IndexCity, Region, BilingualText } from '../../lib/thailand-index';
import { formatBudgetMedian, getBudgetSortValue } from '../../lib/thailand-index-budget';
import ScoreBadge from './ScoreBadge';
import RegionFilter from './RegionFilter';

type SortKey = 'name' | 'budget' | 'weather' | 'transport' | 'nomad' | 'safety' | 'overall';
type SortDir = 'asc' | 'desc';

interface IndexTableProps {
  cities: IndexCity[];
  regions: Region[];
}

interface ColumnDef {
  key: SortKey;
  label: BilingualText;
  /** Short header for mobile */
  shortLabel?: BilingualText;
}

const columns: ColumnDef[] = [
  { key: 'name', label: { en: 'Destination', nl: 'Bestemming' } },
  { key: 'budget', label: { en: 'Budget/day', nl: 'Budget/dag' }, shortLabel: { en: 'Budget', nl: 'Budget' } },
  { key: 'weather', label: { en: 'Weather', nl: 'Weer' } },
  { key: 'transport', label: { en: 'Transport', nl: 'Transport' } },
  { key: 'nomad', label: { en: 'Nomad', nl: 'Nomad' }, shortLabel: { en: 'Nomad', nl: 'Nomad' } },
  { key: 'safety', label: { en: 'Safety', nl: 'Veiligheid' }, shortLabel: { en: 'Safe', nl: 'Veilig' } },
  { key: 'overall', label: { en: 'Overall', nl: 'Totaal' } },
];

function getSortValue(city: IndexCity, key: SortKey, locale: string): number | string {
  switch (key) {
    case 'name':
      return (city.name[(locale as keyof BilingualText)] || city.name.en).toLowerCase();
    case 'budget':
      return getBudgetSortValue(city);
    case 'weather':
      return city.scores.weather_score ?? -1;
    case 'transport':
      return city.scores.transport_score ?? -1;
    case 'nomad':
      return city.scores?.nomad_score ?? -1;
    case 'safety':
      return city.scores?.safety_score ?? -1;
    case 'overall':
      return city.scores.overall_score ?? -1;
  }
}

const IndexTable: React.FC<IndexTableProps> = ({ cities, regions }) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  const [sortKey, setSortKey] = useState<SortKey>('overall');
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
      // Default direction: desc for scores, asc for name and budget
      setSortDir(key === 'name' || key === 'budget' ? 'asc' : 'desc');
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-cream border-b border-gray-200">
              {/* Rank column */}
              <th className="px-3 py-3 text-left font-semibold text-gray-500 w-12">
                #
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none hover:text-thailand-red transition-colors whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="hidden sm:inline">{col.label[loc] || col.label.en}</span>
                  <span className="sm:hidden">{(col.shortLabel && (col.shortLabel[loc] || col.shortLabel.en)) || col.label[loc] || col.label.en}</span>
                  <SortArrow columnKey={col.key} />
                </th>
              ))}
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
                    <span className="block text-xs text-gray-400 sm:hidden">
                      {city.region ? (city.region.name[loc] || city.region.name.en) : ''}
                    </span>
                  </td>

                  {/* Budget/day */}
                  <td className="px-3 py-3 font-medium text-gray-700">
                    {formatBudgetMedian(city, 'budget')}
                  </td>

                  {/* Weather */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores.weather_score} size="sm" />
                  </td>

                  {/* Transport */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores.transport_score} size="sm" />
                  </td>

                  {/* Nomad */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores?.nomad_score ?? null} size="sm" />
                  </td>

                  {/* Safety */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores?.safety_score ?? null} size="sm" />
                  </td>

                  {/* Overall */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.scores.overall_score} size="sm" />
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

export default IndexTable;
