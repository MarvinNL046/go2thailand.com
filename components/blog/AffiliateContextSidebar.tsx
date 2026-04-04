import Link from 'next/link';
import Image from 'next/image';
import TripcomWidget from '../TripcomWidget';

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

const HotelBlock = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">Find Your Hotel</h3>
    <p className="text-sm text-gray-600 mb-4">Compare prices across Thailand&apos;s best hotels and hostels.</p>
    <div className="space-y-3">
      <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-hotels" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-blue text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors">
        Search Hotels on Trip.com
      </a>
      <a href="https://booking.tpo.lv/2PT1kR82?subid=blog-hotels" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
        Booking.com
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
  </div>
);

const TransportBlock = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">Book Transport</h3>
    <p className="text-sm text-gray-600 mb-4">Buses, trains, ferries &amp; flights across Thailand.</p>
    <a href="https://12go.tpo.lv/tNA80urD?subid=blog-transport" target="_blank" rel="noopener noreferrer"
      className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors mb-3">
      Search on 12Go Asia
    </a>
    <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-transport" target="_blank" rel="noopener noreferrer"
      className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
      Trip.com Flights
    </a>
    <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
  </div>
);

const FoodBlock = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">Food Tours &amp; Cooking</h3>
    <p className="text-sm text-gray-600 mb-4">Experience Thai cuisine with local guides and cooking classes.</p>
    <div className="space-y-3">
      <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog-food" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
        Food Tours on Klook
      </a>
      <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog-food" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-red text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-red hover:bg-thailand-red hover:text-white transition-colors text-sm">
        GetYourGuide Tours
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
  </div>
);

const VisaBlock = () => (
  <>
    {/* SafetyWing banner */}
    <a href={SAFETYWING_LINK} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Image src="/images/affiliates/safetywing/banner-vertical.webp" alt="SafetyWing Nomad Insurance — travel medical insurance for 175+ countries" width={400} height={700} className="w-full h-auto" />
    </a>
    <div className="bg-surface-dark text-white rounded-2xl p-6">
      <h3 className="text-xl font-bold font-heading mb-2">Travel Insurance</h3>
      <p className="text-sm opacity-90 mb-4">Many visas require travel insurance. Compare the best options for Thailand.</p>
      <Link href="/travel-insurance-thailand/" className="block bg-thailand-red text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
        Compare Insurance
      </Link>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-2">Stay Secure Online</h3>
      <p className="text-sm text-gray-600 mb-4">Protect your data while abroad with a trusted VPN.</p>
      <a href="https://nordvpn.tpo.lv/ekHF1i55?subid=blog-visa" target="_blank" rel="noopener noreferrer"
        className="block bg-[#4687FF] text-white text-center px-4 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-colors">
        NordVPN
      </a>
    </div>
  </>
);

const BeachBlock = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-3">Island Activities</h3>
    <p className="text-sm text-gray-600 mb-4">Snorkeling, diving, island hopping &amp; beach tours.</p>
    <div className="space-y-3">
      <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog-beach" target="_blank" rel="noopener noreferrer"
        className="block bg-thailand-blue text-white text-center px-4 py-3 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors">
        Beach Activities on Klook
      </a>
      <a href="https://trip.tpo.lv/TmObooZ5?subid=blog-beach" target="_blank" rel="noopener noreferrer"
        className="block bg-white text-thailand-blue text-center px-4 py-2.5 rounded-xl font-semibold border-2 border-thailand-blue hover:bg-thailand-blue hover:text-white transition-colors text-sm">
        Island Hotels on Trip.com
      </a>
    </div>
    <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
  </div>
);

const DefaultBlock = () => (
  <>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-3">Book Hotels</h3>
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
      <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
    </div>
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold font-heading mb-3">Tours &amp; Activities</h3>
      <div className="space-y-3">
        <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
          Klook Activities
        </a>
        <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog" target="_blank" rel="noopener noreferrer"
          className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
          GetYourGuide Tours
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
    </div>
  </>
);

const EsimBlock = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-xl font-bold font-heading mb-2">Thailand eSIM</h3>
    <p className="text-sm text-gray-600 mb-4">Stay connected in Thailand. Order your eSIM before you go.</p>
    <a href="https://saily.tpo.lv/rf9lidnE?subid=blog" target="_blank" rel="noopener noreferrer"
      className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors mb-2">
      Saily eSIM
    </a>
    <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
      More eSIM options →
    </Link>
  </div>
);

export default function AffiliateContextSidebar({ slug, category, tags }: AffiliateContextSidebarProps) {
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
          <h3 className="text-xl font-bold font-heading mb-3">Tours &amp; Activities</h3>
          <div className="space-y-3">
            <a href="https://klook.tpo.lv/7Dt6WApj?subid=blog" target="_blank" rel="noopener noreferrer"
              className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
              Klook Activities
            </a>
            <a href="https://getyourguide.tpo.lv/GuAFfGGK?subid=blog" target="_blank" rel="noopener noreferrer"
              className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm">
              GetYourGuide Tours
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
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
            View all routes →
          </Link>
        </div>
      )}
    </>
  );
}
