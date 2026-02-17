import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from '../hooks/useTranslation';

interface Island {
  id: number;
  slug: string;
  name: {
    en: string;
    nl: string;
  };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface IslandCardProps {
  island: Island;
}

const IslandCard: React.FC<IslandCardProps> = ({ island }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const regionColor = island.region === 'Gulf of Thailand'
    ? 'bg-blue-500'
    : 'bg-emerald-500';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/islands/${island.slug}/`}>
        <div className="relative h-48 w-full">
          <Image
            src={island.image}
            alt={`${island.name.en}, Thailand`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2">
            <span className={`${regionColor} text-white px-2 py-1 rounded text-xs font-semibold`}>
              {island.region}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/islands/${island.slug}/`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-thailand-blue transition-colors">
            {island.name[(locale as keyof typeof island.name)] || island.name.en}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3">
          {island.province} {t('labels.province') || 'Province'}
        </p>

        {island.highlights && island.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {island.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/islands/${island.slug}/`}
          className="block w-full bg-thailand-blue text-white text-center py-2 px-4 rounded hover:bg-thailand-red transition-colors text-sm font-medium"
        >
          {t('buttons.exploreCity') || 'Explore Island'}
        </Link>
      </div>
    </div>
  );
};

export default IslandCard;
