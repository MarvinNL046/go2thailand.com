/**
 * RankingCard — displays a ranked city with rank number, name, metric, and link
 *
 * Uses thailand.gold for the rank badge, thailand.blue for the city name.
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import type { BilingualText } from '../../lib/thailand-index';

interface RankingCardProps {
  rank: number;
  slug: string;
  name: BilingualText;
  /** Label describing the metric, e.g. "Budget / day" */
  metricLabel: string;
  /** Formatted value of the metric, e.g. "$19" or "0.85" */
  metricValue: string;
}

const RankingCard: React.FC<RankingCardProps> = ({
  rank,
  slug,
  name,
  metricLabel,
  metricValue,
}) => {
  const { locale } = useRouter();
  const displayName = name[(locale as keyof BilingualText) || 'en'] || name.en;

  return (
    <Link
      href={`/city/${slug}/`}
      className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Rank badge */}
      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-thailand-gold text-white font-bold text-lg shadow-sm">
        {rank}
      </span>

      {/* City name + metric */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-thailand-blue truncate group-hover:text-thailand-red transition-colors">
          {displayName}
        </h3>
        <p className="text-sm text-gray-500">
          <span className="text-gray-400">{metricLabel}:</span>{' '}
          <span className="font-semibold text-gray-700">{metricValue}</span>
        </p>
      </div>

      {/* Chevron */}
      <svg
        className="w-5 h-5 text-gray-300 group-hover:text-thailand-red transition-colors flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default RankingCard;
