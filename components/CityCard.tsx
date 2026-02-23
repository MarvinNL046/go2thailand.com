import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from '../hooks/useTranslation';

interface City {
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

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const cityName = city.name[locale as keyof typeof city.name] || city.name.en;

  return (
    <Link href={`/city/${city.slug}/`} className="group block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={city.image}
            alt={`${city.name.en}, Thailand`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Region badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-thailand-blue px-3 py-1 rounded-full text-xs font-semibold capitalize">
              {city.region}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-xl font-bold text-gray-900 mb-1 group-hover:text-thailand-red transition-colors">
            {cityName}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <svg className="w-3.5 h-3.5 text-thailand-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{city.province}</span>
          </div>

          {/* Highlights */}
          {city.highlights && city.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {city.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-surface-cream text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-thailand-red font-medium text-sm group-hover:text-thailand-red-600 transition-colors">
              {t('buttons.exploreCity') || 'Explore City'}
            </span>
            <svg className="w-4 h-4 text-thailand-red transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
