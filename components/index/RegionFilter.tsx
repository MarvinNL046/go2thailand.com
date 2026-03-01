/**
 * RegionFilter — filter chips for selecting a region
 *
 * Renders an "All" button plus one chip per region.
 * Active state uses thailand.red background.
 */

import { useRouter } from 'next/router';
import type { Region, BilingualText } from '../../lib/thailand-index';

interface RegionFilterProps {
  regions: Region[];
  /** Currently active region slug, or null for "all" */
  activeRegion: string | null;
  /** Callback when a region filter is toggled */
  onChange: (regionSlug: string | null) => void;
}

const allLabel: BilingualText = {
  en: 'All Regions',
  nl: 'Alle Regio\u2019s',
};

const RegionFilter: React.FC<RegionFilterProps> = ({
  regions,
  activeRegion,
  onChange,
}) => {
  const { locale } = useRouter();
  const loc = (locale as keyof BilingualText) || 'en';

  const chipBase =
    'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer select-none border';
  const chipActive =
    'bg-thailand-red text-white border-thailand-red shadow-sm';
  const chipInactive =
    'bg-white text-gray-600 border-gray-200 hover:border-thailand-red hover:text-thailand-red';

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Region filter">
      {/* "All" chip */}
      <button
        type="button"
        className={`${chipBase} ${activeRegion === null ? chipActive : chipInactive}`}
        onClick={() => onChange(null)}
        aria-pressed={activeRegion === null}
      >
        {allLabel[loc]}
      </button>

      {regions.map((region) => (
        <button
          key={region.slug}
          type="button"
          className={`${chipBase} ${activeRegion === region.slug ? chipActive : chipInactive}`}
          onClick={() => onChange(region.slug === activeRegion ? null : region.slug)}
          aria-pressed={activeRegion === region.slug}
        >
          {region.name[loc] || region.name.en}
        </button>
      ))}
    </div>
  );
};

export default RegionFilter;
