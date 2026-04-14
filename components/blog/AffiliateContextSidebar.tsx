import Link from 'next/link';
import Image from 'next/image';
import TripcomWidget from '../TripcomWidget';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/components-blog-affiliatecontextsidebar';

const SAFETYWING_LINK = 'https://safetywing.com/?referenceID=26490463&utm_source=26490463&utm_medium=Ambassador';

interface AffiliateContextSidebarProps {
  slug: string;
  category: string;
  tags: string[];
}

type Intent = 'hotels' | 'transport' | 'food' | 'visa' | 'beach' | 'default';

function detectIntent(slug: string, category: string, tags: string[]): Intent {
  const text = `${slug} ${category} ${tags.join(' ')}`.toLowerCase();

  if (/where-to-stay|hotel|neighborhood|accommodation|resort|hostel/.test(text)) return 'hotels';
  if (/to-[a-z]|transport|flight|train|airport|bus-/.test(text)) return 'transport';
  if (/visa|safe|insurance|digital-nomad|expat|arrival-card|permit/.test(text)) return 'visa';
  if (/beach|island|diving|snorkel|koh-|surf/.test(text)) return 'beach';
  if (/market|food|restaurant|cooking|tour|night-market|street-food|curry|dish/.test(text)) return 'food';
  return 'default';
}

const HotelBlock = () => {
  const t = useT(i18nStrings);
  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">{t("s001_find_your_hotel")}</h3>
    <p className="text-sm text-gray-600 mb-4">{t("s002_compare_prices_across_thailand")}</p>
    <div className="space-y-3">
      <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-hotels" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-blue text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors">
        {t("s003_search_hotels_on_trip")}
      </a>
      <a href="https://booking.tpo.lv/2PT1kR82?subid=blog-hotels" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
        Booking.com
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
  </div>
); };

const TransportBlock = () => {
  const t = useT(i18nStrings);
  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">{t("s005_book_transport")}</h3>
    <p className="text-sm text-gray-600 mb-4">{t("s006_buses_trains_ferries_amp")}</p>
    <a href="https://12go.tpo.lv/tNA80urD?subid=blog-transport" target="_blank" rel="noopener noreferrer"
      className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors mb-3">
      {t("s007_search_on_12go_asia")}
    </a>
    <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-transport" target="_blank" rel="noopener noreferrer"
      className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
      {t("s008_trip_com_flights")}
    </a>
    <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
  </div>
); };

const FoodBlock = () => {
  const t = useT(i18nStrings);
  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">{t("s010_food_tours_amp_cooking")}</h3>
    <p className="text-sm text-gray-600 mb-4">{t("s011_experience_thai_cuisine_with")}</p>
    <div className="space-y-3">
      <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog-food" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
        {t("s012_food_tours_on_klook")}
      </a>
      <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog-food" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-red text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-red hover:bg-thailand-red hover:text-white transition-colors text-sm">
        {t("s013_getyourguide_tours")}
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
  </div>
); };

const VisaBlock = () => {
  const t = useT(i18nStrings);
  return (
  <>
    {/* SafetyWing banner */}
    <a href={SAFETYWING_LINK} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Image src="/images/affiliates/safetywing/banner-vertical.webp" alt={t("s015_safetywing_nomad_insurance_travel")} width={400} height={700} className="w-full h-auto" />
    </a>
    <div className="bg-surface-dark text-white rounded-2xl p-6">
      <h3 className="text-xl font-bold font-heading mb-2">{t("s016_travel_insurance")}</h3>
      <p className="text-sm opacity-90 mb-4">{t("s017_many_visas_require_travel")}</p>
      <Link href="/travel-insurance-thailand/" className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
        {t("s018_compare_insurance")}
      </Link>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-2">{t("s019_stay_secure_online")}</h3>
      <p className="text-sm text-gray-600 mb-4">{t("s020_protect_your_data_while")}</p>
      <a href="https://nordvpn.tpo.lv/ekHF1i55?subid=blog-visa" target="_blank" rel="noopener noreferrer"
        className="block bg-[#4687FF] text-white text-center px-4 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-colors">
        NordVPN
      </a>
    </div>
  </>
); };

const BeachBlock = () => {
  const t = useT(i18nStrings);
  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">{t("s021_island_activities")}</h3>
    <p className="text-sm text-gray-600 mb-4">{t("s022_snorkeling_diving_island_hopping")}</p>
    <div className="space-y-3">
      <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog-beach" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-blue text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors">
        {t("s023_beach_activities_on_klook")}
      </a>
      <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-beach" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
        {t("s024_island_hotels_on_trip")}
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
  </div>
); };

const DefaultBlock = () => {
  const t = useT(i18nStrings);
  return (
  <>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-3">{t("s026_book_hotels")}</h3>
      <div className="space-y-3">
        <a href="https://booking.tpo.lv/2PT1kR82?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm">
          Booking.com
        </a>
        <a href="https://trip.tpo.lv/TmObooZ5?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm">
          Trip.com
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-3">{t("s028_tours_amp_activities")}</h3>
      <div className="space-y-3">
        <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
          {t("s029_klook_activities")}
        </a>
        <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
          {t("s013_getyourguide_tours")}
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
    </div>
  </>
); };

const EsimBlock = () => {
  const t = useT(i18nStrings);
  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-2">{t("s032_thailand_esim")}</h3>
    <p className="text-sm text-gray-600 mb-4">{t("s033_stay_connected_in_thailand")}</p>
    <a href="https://saily.tpo.lv/rf9lidnE?subid=blog" target="_blank" rel="noopener noreferrer"
      className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors mb-2">
      {t("s034_saily_esim")}
    </a>
    <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
      {t("s035_more_esim_options")}
    </Link>
  </div>
); };

export default function AffiliateContextSidebar({ slug, category, tags }: AffiliateContextSidebarProps) {
  const t = useT(i18nStrings);
  const intent = detectIntent(slug, category, tags);

  return (
    <>
      {/* Primary: intent-matched block */}
      {intent === 'hotels' && <HotelBlock />}
      {intent === 'transport' && <TransportBlock />}
      {intent === 'food' && <FoodBlock />}
      {intent === 'visa' && <VisaBlock />}
      {intent === 'beach' && <BeachBlock />}
      {intent === 'default' && <DefaultBlock />}

      {/* Always show hotels if not already primary */}
      {intent !== 'hotels' && intent !== 'default' && <HotelBlock />}

      {/* Always show tours if not already primary */}
      {intent !== 'food' && intent !== 'beach' && intent !== 'default' && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold font-heading mb-3">{t("s028_tours_amp_activities")}</h3>
          <div className="space-y-3">
            <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog" target="_blank" rel="noopener noreferrer"
              className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
              {t("s029_klook_activities")}
            </a>
            <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog" target="_blank" rel="noopener noreferrer"
              className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
              {t("s013_getyourguide_tours")}
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">{t("s004_affiliate_links")}</p>
        </div>
      )}

      {/* eSIM — always shown, universally relevant */}
      {intent !== 'visa' && <EsimBlock />}

      {/* Trip.com widget for hotel-intent pages */}
      {(intent === 'hotels' || intent === 'beach') && (
        <TripcomWidget city="Thailand" type="searchbox" customTitle="Search Hotels" />
      )}

      {/* Transport link for non-transport intents */}
      {intent !== 'transport' && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold font-heading mb-3">Transport</h3>
          <a href="https://12go.tpo.lv/tNA80urD?subid=blog" target="_blank" rel="noopener noreferrer"
            className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm mb-2">
            12Go Asia - Book Transport
          </a>
          <Link href="/transport/" className="block text-thailand-blue text-center text-sm hover:underline">
            {t("s040_view_all_routes")}
          </Link>
        </div>
      )}
    </>
  );
}
