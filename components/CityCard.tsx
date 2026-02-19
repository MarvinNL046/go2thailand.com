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
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/city/${city.slug}/`}>
        <div className="relative h-48 w-full">
          <Image
            src={city.image}
            alt={`${city.name.en}, Thailand`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-thailand-blue text-white px-2 py-1 rounded text-xs font-semibold">
              {city.region}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/city/${city.slug}/`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-thailand-blue transition-colors">
            {city.name[locale as keyof typeof city.name] || city.name.en}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3">
          {city.province} {t('labels.province') || 'Province'}
        </p>
        
        {city.highlights && city.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('labels.highlights') || 'Highlights'}:</h4>
            <div className="flex flex-wrap gap-1">
              {city.highlights.slice(0, 2).map((highlight, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {highlight}
                </span>
              ))}
              {city.highlights.length > 2 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{city.highlights.length - 2} {t('labels.more')}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Link 
              href={`/city/${city.slug}/`}
              className="flex-1 bg-thailand-blue text-white text-center py-2 px-4 rounded hover:bg-thailand-red transition-colors text-sm font-medium"
            >
              {t('buttons.exploreCity') || 'Explore City'}
            </Link>
            <Link 
              href={`/city/${city.slug}/attractions/`}
              className="flex-1 border border-thailand-blue text-thailand-blue text-center py-2 px-4 rounded hover:bg-thailand-blue hover:text-white transition-colors text-sm font-medium"
            >
              {t('labels.attractions')}
            </Link>
          </div>
          
          {/* Top 10 Guides Row */}
          <div className="flex space-x-2">
            <Link 
              href={`/city/${city.slug}/top-10-restaurants/`}
              className="flex-1 bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white text-center py-2 px-2 rounded hover:from-thailand-red-600 hover:to-thailand-red-700 transition-all text-xs font-medium"
            >
              {t('nav.top10')} {t('labels.food') || 'Food'}
            </Link>
            <Link 
              href={`/city/${city.slug}/top-10-hotels/`}
              className="flex-1 bg-gradient-to-r from-thailand-blue to-thailand-blue-600 text-white text-center py-2 px-2 rounded hover:from-thailand-blue-600 hover:to-thailand-blue-700 transition-all text-xs font-medium"
            >
              {t('nav.top10')} {t('labels.hotels')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
