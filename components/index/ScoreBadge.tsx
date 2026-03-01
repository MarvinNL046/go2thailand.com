/**
 * ScoreBadge — visual score indicator on a 0-1 scale
 *
 * Color coding:
 *   >= 0.75  green
 *   >= 0.50  yellow/amber
 *   <  0.50  red
 *
 * Sizes: sm | md | lg
 */

interface ScoreBadgeProps {
  score: number;
  /** Display label shown next to the score (optional) */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Show the score as a percentage (e.g. "75%") instead of decimal */
  asPercent?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-xs px-1.5 py-0.5 min-w-[2rem]',
  md: 'text-sm px-2 py-1 min-w-[2.5rem]',
  lg: 'text-base px-3 py-1.5 min-w-[3rem]',
};

function getColorClasses(score: number): string {
  if (score >= 0.75) return 'bg-green-100 text-green-800 border-green-200';
  if (score >= 0.5) return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  label,
  size = 'md',
  asPercent = false,
}) => {
  const display = asPercent
    ? `${Math.round(score * 100)}%`
    : score.toFixed(2);

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className={`inline-block text-center font-semibold rounded border ${getColorClasses(score)} ${sizeClasses[size]}`}
      >
        {display}
      </span>
      {label && (
        <span className="text-gray-500 text-xs">{label}</span>
      )}
    </span>
  );
};

export default ScoreBadge;
