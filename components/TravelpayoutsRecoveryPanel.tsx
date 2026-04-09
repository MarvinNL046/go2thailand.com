import { useRouter } from 'next/router';
import {
  BOOKING_GENERIC,
  GYG_GENERIC,
  KLOOK_GENERIC,
  TWELVEGO_GENERIC,
  cityAffiliates,
  withSubId,
} from '../lib/affiliates';
import { useSubId } from '../lib/useSubId';
import {
  getTravelpayoutsRecoveryConfig,
  RecoveryButtonId,
  RecoveryPageType,
} from '../lib/travelpayouts-recovery';

type ButtonMeta = {
  label: { en: string; nl: string };
  href: string;
  className: string;
};

interface TravelpayoutsRecoveryPanelProps {
  pageType: RecoveryPageType;
  placement: string;
  slug?: string;
  category?: string;
  tags?: string[];
  citySlug?: string;
  className?: string;
  columns?: 1 | 2 | 3;
}

const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

function getButtonMeta(buttonId: RecoveryButtonId, citySlug?: string): ButtonMeta {
  const cityLinks = citySlug ? cityAffiliates[citySlug] : undefined;

  switch (buttonId) {
    case 'booking_hotels':
      return {
        label: { en: 'Booking.com', nl: 'Booking.com' },
        href: cityLinks?.booking || BOOKING_GENERIC,
        className: 'bg-white text-thailand-blue border border-thailand-blue/20 hover:bg-thailand-blue hover:text-white',
      };
    case 'klook_tours':
      return {
        label: { en: 'Klook Tours', nl: 'Klook Tours' },
        href: cityLinks?.klook || KLOOK_GENERIC,
        className: 'bg-thailand-red text-white hover:bg-thailand-red/90',
      };
    case 'gyg_tours':
      return {
        label: { en: 'GetYourGuide', nl: 'GetYourGuide' },
        href: cityLinks?.getyourguide || GYG_GENERIC,
        className: 'bg-white text-thailand-red border border-thailand-red/20 hover:bg-thailand-red hover:text-white',
      };
    case 'twelvego_transport':
      return {
        label: { en: '12Go Transport', nl: '12Go Transport' },
        href: cityLinks?.twelveGo || TWELVEGO_GENERIC,
        className: 'bg-thailand-blue text-white hover:bg-thailand-blue/90',
      };
    case 'nordvpn':
      return {
        label: { en: 'NordVPN', nl: 'NordVPN' },
        href: 'https://nordvpn.tpo.lv/ekHF1i55',
        className: 'bg-[#4687FF] text-white hover:opacity-90',
      };
    case 'nordpass':
      return {
        label: { en: 'NordPass', nl: 'NordPass' },
        href: 'https://nordvpn.tpo.lv/tp12zNjC',
        className: 'bg-surface-dark text-white hover:bg-surface-dark/90',
      };
    case 'saily_esim':
      return {
        label: { en: 'Saily eSIM', nl: 'Saily eSIM' },
        href: 'https://saily.tpo.lv/rf9lidnE',
        className: 'bg-thailand-gold text-surface-dark hover:opacity-90',
      };
    case 'trip_hotels':
    default:
      return {
        label: { en: 'Trip.com Hotels', nl: 'Trip.com Hotels' },
        href: 'https://trip.tpo.lv/TmObooZ5',
        className: 'bg-thailand-blue text-white hover:bg-thailand-blue/90',
      };
  }
}

export default function TravelpayoutsRecoveryPanel({
  pageType,
  placement,
  slug,
  category,
  tags,
  citySlug,
  className = '',
  columns = 2,
}: TravelpayoutsRecoveryPanelProps) {
  const { locale } = useRouter();
  const subId = useSubId();
  const lang = locale === 'nl' ? 'nl' : 'en';
  const trackingSubId = `${subId}-${placement}`;
  const config = getTravelpayoutsRecoveryConfig({ pageType, slug, category, tags, citySlug });

  const gridClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      <span className="section-label font-script text-thailand-gold text-sm">
        {lang === 'nl' ? 'Extra reisdeals' : 'Extra travel deals'}
      </span>
      <h3 className="text-xl font-bold font-heading mb-2">{config.title[lang]}</h3>
      <p className="text-sm text-gray-600 mb-4">{config.description[lang]}</p>

      <div className={`grid gap-3 ${gridClass}`}>
        {config.buttonIds.map((buttonId) => {
          const meta = getButtonMeta(buttonId, citySlug);

          return (
            <a
              key={buttonId}
              href={withSubId(meta.href, trackingSubId)}
              target="_blank"
              rel={AFFILIATE_REL}
              className={`text-center px-4 py-3 rounded-xl font-semibold transition-colors text-sm ${meta.className}`}
            >
              {meta.label[lang]}
            </a>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        {lang === 'nl'
          ? 'Affiliate links. We kunnen een commissie verdienen zonder extra kosten voor jou.'
          : 'Affiliate links. We may earn a commission at no extra cost to you.'}
      </p>
    </div>
  );
}
