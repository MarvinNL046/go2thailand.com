// components/AffiliateBox.tsx
import { CityAffiliates, withSubId } from '../lib/affiliates';
import { useSubId } from '../lib/useSubId';

interface AffiliateBoxProps {
  affiliates: CityAffiliates;
  cityName: string;
  type: 'hotels' | 'tours' | 'activities' | 'transport';
}

const config = {
  hotels: {
    heading: 'Book Your Hotel',
    bookingLabel: 'Search Hotels on Booking.com' as string | null,
    klookLabel: null as string | null,
    gygLabel: null as string | null,
    twelveGoLabel: null as string | null,
  },
  tours: {
    heading: 'Book Tours & Experiences',
    bookingLabel: null as string | null,
    klookLabel: 'Browse Tours on Klook' as string | null,
    gygLabel: 'See Tours on GetYourGuide' as string | null,
    twelveGoLabel: null as string | null,
  },
  activities: {
    heading: 'Book This Activity',
    bookingLabel: null as string | null,
    klookLabel: 'Book on Klook' as string | null,
    gygLabel: 'Book on GetYourGuide' as string | null,
    twelveGoLabel: null as string | null,
  },
  transport: {
    heading: 'Book Transport',
    bookingLabel: null as string | null,
    klookLabel: null as string | null,
    gygLabel: null as string | null,
    twelveGoLabel: 'Book Buses, Trains & Ferries on 12Go' as string | null,
  },
};

export default function AffiliateBox({ affiliates, cityName, type }: AffiliateBoxProps) {
  const c = config[type];
  const subId = useSubId();
  return (
    <div className="bg-thailand-blue/5 border border-thailand-blue/20 rounded-2xl p-6 my-6">
      <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">{c.heading} in {cityName}</h3>
      <div className="flex flex-wrap gap-3">
        {c.bookingLabel && (
          <a
            href={withSubId(affiliates.booking, subId)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#003580] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#00224f] transition-colors"
          >
            {c.bookingLabel}
          </a>
        )}
        {c.klookLabel && (
          <a
            href={withSubId(affiliates.klook, subId)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#FF5722] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#e64a19] transition-colors"
          >
            {c.klookLabel}
          </a>
        )}
        {c.gygLabel && (
          <a
            href={withSubId(affiliates.getyourguide, subId)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#1B9E3E] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#157a30] transition-colors"
          >
            {c.gygLabel}
          </a>
        )}
        {c.twelveGoLabel && (
          <a
            href={withSubId(affiliates.twelveGo, subId)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-[#F59E0B] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#D97706] transition-colors"
          >
            {c.twelveGoLabel}
          </a>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        We may earn a commission at no extra cost to you. Prices shown are from partner sites.
      </p>
    </div>
  );
}
