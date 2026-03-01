/**
 * MonthMatrix — color-coded weather comfort table
 *
 * Rows = cities, Columns = months (Jan-Dec).
 * Cell value = comfort score * 100 (0-100).
 *
 * Color scale:
 *   85+    green      (excellent)
 *   70-84  light-green (good)
 *   55-69  yellow      (fair)
 *   40-54  orange      (poor)
 *   <40    red         (avoid)
 *
 * First column (city name) is sticky for horizontal scrolling.
 * Legend rendered below the table.
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import type { IndexCity, BilingualText, MonthAbbrev } from '../../lib/thailand-index';

interface MonthMatrixProps {
  cities: IndexCity[];
}

const MONTHS: MonthAbbrev[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function getCellColor(value: number): string {
  if (value >= 85) return 'bg-green-500 text-white';
  if (value >= 70) return 'bg-green-300 text-green-900';
  if (value >= 55) return 'bg-yellow-300 text-yellow-900';
  if (value >= 40) return 'bg-orange-300 text-orange-900';
  return 'bg-red-400 text-white';
}

const legendItems = [
  { label: '85+', color: 'bg-green-500', textColor: 'text-white', desc: { en: 'Excellent', nl: 'Uitstekend' } },
  { label: '70-84', color: 'bg-green-300', textColor: 'text-green-900', desc: { en: 'Good', nl: 'Goed' } },
  { label: '55-69', color: 'bg-yellow-300', textColor: 'text-yellow-900', desc: { en: 'Fair', nl: 'Redelijk' } },
  { label: '40-54', color: 'bg-orange-300', textColor: 'text-orange-900', desc: { en: 'Poor', nl: 'Matig' } },
  { label: '<40', color: 'bg-red-400', textColor: 'text-white', desc: { en: 'Avoid', nl: 'Vermijden' } },
];

const MonthMatrix: React.FC<MonthMatrixProps> = ({ cities }) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  // Sort by overall comfort (descending) for a meaningful default order
  const sorted = [...cities].sort(
    (a, b) => b.weather.comfort_score - a.weather.comfort_score
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="text-sm border-collapse w-max min-w-full">
          <thead>
            <tr className="bg-surface-cream">
              {/* Sticky city name header */}
              <th className="sticky left-0 z-10 bg-surface-cream px-4 py-3 text-left font-semibold text-gray-700 border-b border-r border-gray-200 min-w-[160px]">
                {loc === 'nl' ? 'Bestemming' : 'Destination'}
              </th>
              {MONTHS.map((m) => (
                <th
                  key={m}
                  className="px-2 py-3 text-center font-semibold text-gray-600 border-b border-gray-200 min-w-[48px]"
                >
                  {m}
                </th>
              ))}
              <th className="px-3 py-3 text-center font-semibold text-gray-500 border-b border-l border-gray-200 min-w-[48px]">
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((city) => {
              const displayName = city.name[loc] || city.name.en;
              const avgScore = Math.round(city.weather.comfort_score * 100);

              return (
                <tr key={city.slug} className="hover:bg-gray-50/50">
                  {/* Sticky city name column */}
                  <td className="sticky left-0 z-10 bg-white px-4 py-2 border-b border-r border-gray-100 font-medium">
                    <Link
                      href={`/city/${city.slug}/`}
                      className="text-thailand-blue hover:text-thailand-red transition-colors whitespace-nowrap"
                    >
                      {displayName}
                    </Link>
                  </td>

                  {/* Month cells */}
                  {MONTHS.map((month) => {
                    const raw = city.weather.month_scores?.[month];
                    const value = raw != null ? Math.round(raw * 100) : null;

                    return (
                      <td
                        key={month}
                        className={`px-2 py-2 text-center text-xs font-semibold border-b border-gray-100 ${
                          value != null ? getCellColor(value) : 'bg-gray-100 text-gray-300'
                        }`}
                        title={`${displayName} - ${month}: ${value != null ? value : 'N/A'}`}
                      >
                        {value != null ? value : '-'}
                      </td>
                    );
                  })}

                  {/* Average column */}
                  <td
                    className={`px-3 py-2 text-center text-xs font-bold border-b border-l border-gray-100 ${getCellColor(avgScore)}`}
                  >
                    {avgScore}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span className="font-medium">{loc === 'nl' ? 'Legenda:' : 'Legend:'}</span>
        {legendItems.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1">
            <span
              className={`inline-block w-5 h-4 rounded ${item.color} ${item.textColor} text-center text-[10px] font-bold leading-4`}
            >
              {item.label.replace('<', '')}
            </span>
            <span>{item.desc[loc]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthMatrix;
