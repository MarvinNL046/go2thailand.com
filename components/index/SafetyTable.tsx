/**
 * SafetyTable — sortable comparison table for safety data
 *
 * Columns: #, Destination, Overall, Solo Safe, Female Solo, Night, Hospital.
 * Score columns use ScoreBadge. RegionFilter is rendered above the table.
 * Clicking column headers toggles sort direction (arrow indicators).
 * Default sort: overall descending.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IndexCity, Region, BilingualText } from '../../lib/thailand-index';
import ScoreBadge from './ScoreBadge';
import RegionFilter from './RegionFilter';

type SortKey = 'name' | 'overall' | 'solo' | 'female' | 'night' | 'hospital';
type SortDir = 'asc' | 'desc';

interface SafetyTableProps {
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
  { key: 'overall', label: { en: 'Overall', nl: 'Totaal' } },
  { key: 'solo', label: { en: 'Solo Safe', nl: 'Solo Veilig' }, shortLabel: 'Solo' },
  { key: 'female', label: { en: 'Female Solo', nl: 'Vrouw Solo' }, shortLabel: 'Female' },
  { key: 'night', label: { en: 'Night', nl: 'Nacht' } },
  { key: 'hospital', label: { en: 'Hospital', nl: 'Ziekenhuis' } },
];

const hospitalValueMap: Record<string, number> = { high: 3, medium: 2, low: 1 };

function getHospitalColorClass(quality: string | undefined | null): string {
  switch (quality) {
    case 'high':
      return 'text-green-700 bg-green-50';
    case 'medium':
      return 'text-amber-700 bg-amber-50';
    case 'low':
      return 'text-red-700 bg-red-50';
    default:
      return 'text-gray-400';
  }
}

function getHospitalLabel(quality: string | undefined | null, locale: string): string {
  if (!quality) return '-';
  const labels: Record<string, BilingualText> = {
    high: { en: 'High', nl: 'Hoog' },
    medium: { en: 'Medium', nl: 'Gemiddeld' },
    low: { en: 'Low', nl: 'Laag' },
  };
  const entry = labels[quality];
  return entry ? entry[locale as keyof BilingualText] || entry.en : '-';
}

function getSortValue(city: IndexCity, key: SortKey, locale: string): number | string {
  switch (key) {
    case 'name':
      return (city.name[(locale as keyof BilingualText)] || city.name.en).toLowerCase();
    case 'overall':
      return city.safety?.overall_safety_score ?? -1;
    case 'solo':
      return city.safety?.solo_traveller_safe ?? -1;
    case 'female':
      return city.safety?.female_solo_safe ?? -1;
    case 'night':
      return city.safety?.night_safety ?? -1;
    case 'hospital':
      return hospitalValueMap[city.safety?.hospital_quality ?? ''] ?? 0;
  }
}

const SafetyTable: React.FC<SafetyTableProps> = ({ cities, regions }) => {
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
                <ScoreBadge score={city.safety?.overall_safety_score ?? null} size="sm" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Solo' : 'Solo'}
                  </span>
                  <div className="mt-0.5">
                    <ScoreBadge score={city.safety?.solo_traveller_safe ?? null} size="sm" />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Vrouw' : 'Female'}
                  </span>
                  <div className="mt-0.5">
                    <ScoreBadge score={city.safety?.female_solo_safe ?? null} size="sm" />
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">
                    {loc === 'nl' ? 'Nacht' : 'Night'}
                  </span>
                  <div className="mt-0.5">
                    <ScoreBadge score={city.safety?.night_safety ?? null} size="sm" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-400">
                  {loc === 'nl' ? 'Ziekenhuis' : 'Hospital'}
                </span>
                <span className={`font-medium px-2 py-0.5 rounded ${getHospitalColorClass(city.safety?.hospital_quality)}`}>
                  {getHospitalLabel(city.safety?.hospital_quality, loc)}
                </span>
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

                  {/* Overall */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.safety?.overall_safety_score ?? null} size="sm" />
                  </td>

                  {/* Solo Safe */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.safety?.solo_traveller_safe ?? null} size="sm" />
                  </td>

                  {/* Female Solo */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.safety?.female_solo_safe ?? null} size="sm" />
                  </td>

                  {/* Night */}
                  <td className="px-3 py-3">
                    <ScoreBadge score={city.safety?.night_safety ?? null} size="sm" />
                  </td>

                  {/* Hospital */}
                  <td className="px-3 py-3">
                    <span className={`inline-block font-medium text-xs px-2 py-0.5 rounded ${getHospitalColorClass(city.safety?.hospital_quality)}`}>
                      {getHospitalLabel(city.safety?.hospital_quality, loc)}
                    </span>
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

export default SafetyTable;
