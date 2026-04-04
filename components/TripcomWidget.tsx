import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { withSubId } from '../lib/affiliates';
import { useSubId } from '../lib/useSubId';

interface TripcomWidgetProps {
  city: string;
  type: 'hotels' | 'flights' | 'searchbox' | 'bundle' | 'transfers' | 'car-rental';
  className?: string;
  customTitle?: string;
}

export default function TripcomWidget({ city, type, className = '', customTitle }: TripcomWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const subId = useSubId();
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  useEffect(() => {
    // Load Trip.com widget script
    if (widgetRef.current) {
      const script = document.createElement('script');
      script.src = 'https://tpembd.com/content?trs=384595&shmarker=602467&lang=www&layout=S10391&powered_by=true&campaign_id=121&promo_id=4038';
      script.async = true;
      script.charset = 'utf-8';
      widgetRef.current.appendChild(script);

      return () => {
        // Cleanup
        if (widgetRef.current && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // Affiliate links for different services
  const affiliateLinks = {
    main: withSubId('https://trip.tpo.lv/TmObooZ5', subId),
    bundle: withSubId('https://trip.tpo.lv/iP1HSint', subId),
    transfers: withSubId('https://trip.tpo.lv/iP1HSint', subId),
    'car-rental': withSubId('https://trip.tpo.lv/fzIWyBhW', subId),
  };

  const getServiceInfo = () => {
    switch (type) {
      case 'bundle':
        return {
          title: isNl ? 'Hotel & Vlucht Bundel' : 'Hotel & Flight Bundle',
          description: isNl ? 'Bespaar meer door hotel en vlucht samen te boeken' : 'Save more by booking hotel and flight together',
          link: affiliateLinks.bundle
        };
      case 'transfers':
        return {
          title: isNl ? 'Luchthaventransfers' : 'Airport Transfers',
          description: isNl ? 'Boek betrouwbare luchthaventransfers van tevoren' : 'Book reliable airport transfers in advance',
          link: affiliateLinks.transfers
        };
      case 'car-rental':
        return {
          title: isNl ? 'Autoverhuur' : 'Car Rental',
          description: isNl ? 'Huur een auto voor je reis' : 'Rent a car for your trip',
          link: affiliateLinks['car-rental']
        };
      default:
        return {
          title: isNl ? 'Zoek Hotels & Vluchten' : 'Search Hotels & Flights',
          description: isNl ? `Vind de beste deals voor ${city}` : `Find the best deals for ${city}`,
          link: affiliateLinks.main
        };
    }
  };

  const serviceInfo = getServiceInfo();

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Widget container */}
      <div ref={widgetRef} className="trip-com-widget overflow-x-auto"></div>

      {/* Fallback content and additional links */}
      <div className="p-4 sm:p-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {customTitle || serviceInfo.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {serviceInfo.description}
        </p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <a
            href={affiliateLinks.main}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-thailand-blue text-white rounded-lg hover:bg-thailand-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Hotels
          </a>
          <a
            href={affiliateLinks.bundle}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-thailand-blue text-white rounded-lg hover:bg-thailand-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            {isNl ? 'Hotel + Vlucht' : 'Hotel + Flight'}
          </a>
          <a
            href={affiliateLinks.transfers}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-thailand-blue text-white rounded-lg hover:bg-thailand-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            Transfers
          </a>
          <a
            href={affiliateLinks['car-rental']}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-center px-3 py-2 bg-thailand-blue text-white rounded-lg hover:bg-thailand-blue-600 transition-colors text-xs sm:text-sm font-medium"
          >
            {isNl ? 'Autoverhuur' : 'Car Rental'}
          </a>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs text-gray-500 text-center">
            {isNl ? 'We verdienen een commissie wanneer je boekt via onze links' : 'We earn a commission when you book through our links'}
          </p>
          <p className="text-xs text-center">
            <span className="text-gray-400">{isNl ? 'Mogelijk gemaakt door ' : 'Powered by '}</span>
            <a
              href="https://www.travelpayouts.com/?marker=602467"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-thailand-blue hover:text-thailand-blue-600 underline transition-colors"
            >
              Travelpayouts
            </a>
            <span className="text-gray-400">{isNl ? ' - Reis Affiliate Netwerk' : ' - Travel Affiliate Network'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
