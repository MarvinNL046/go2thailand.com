import Link from 'next/link';
import AnnouncementBar from './AnnouncementBar';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('common');

  return (
    <>
      <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/city/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.allCities')}
                </Link>
              </li>
              <li>
                <Link href="/region/northern/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.northernThailand')}
                </Link>
              </li>
              <li>
                <Link href="/region/central/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.centralThailand')}
                </Link>
              </li>
              <li>
                <Link href="/region/southern/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.southernThailand')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t('footer.popularCities')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/city/bangkok/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.bangkok')}
                </Link>
              </li>
              <li>
                <Link href="/city/chiang-mai/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.chiangMai')}
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.phuket')}
                </Link>
              </li>
              <li>
                <Link href="/city/pattaya/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.pattaya')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Weather & Climate */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              🌤️ {t('footer.weatherGuide')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/weather/" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                  {t('footer.allWeatherGuides')} →
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/thailand-in/january/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.thailandInJanuary')}
                </Link>
              </li>
              <li>
                <Link href="/thailand-in/april/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  {t('footer.songkranSeason')} 🎉
                </Link>
              </li>
              <li>
                <Link href="/thailand-in/november/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.loyKrathongMonth')}
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <Link href="/city/bangkok/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.bangkokWeather')}
                </Link>
              </li>
              <li>
                <Link href="/city/chiang-mai/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.chiangMaiWeather')}
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.phuketWeather')}
                </Link>
              </li>
              <li>
                <Link href="/city/krabi/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.krabiWeather')}
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/city/pattaya/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.moreCities')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t('footer.travelResources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/esim/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.esim')}
                </Link>
              </li>
              <li>
                <Link href="/travel-insurance/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.insurance')}
                </Link>
              </li>
              <li>
                <Link href="/travel-gear/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.gear')}
                </Link>
              </li>
              <li>
                <Link href="/best-cooking-classes-in-thailand/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Cooking Classes
                </Link>
              </li>
              <li>
                <Link href="/best-muay-thai-in-thailand/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Muay Thai
                </Link>
              </li>
              <li>
                <Link href="/best-elephant-sanctuaries-in-thailand/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Elephant Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/best-diving-snorkeling-in-thailand/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Diving &amp; Snorkeling
                </Link>
              </li>
              <li>
                <Link href="/travel-security/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.vpnSecurity')}
                </Link>
              </li>
              <li>
                <Link href="/food/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.thaiFoodGuide')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Transport Routes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              🚌 {t('footer.transportRoutes')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/transport/" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                  {t('footer.allRoutes')} →
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/transport/bangkok-to-chiang-mai/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.bangkokToChiangMai')}
                </Link>
              </li>
              <li>
                <Link href="/transport/bangkok-to-phuket/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.bangkokToPhuket')}
                </Link>
              </li>
              <li>
                <Link href="/transport/bangkok-to-krabi/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.bangkokToKrabi')}
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/transport/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('footer.moreRoutes')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Top 10 Guides */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              🏆 {t('footer.top10Guides')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/top-10/restaurants/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.restaurantGuides')}
                </Link>
              </li>
              <li>
                <Link href="/top-10/hotels/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.hotelGuides')}
                </Link>
              </li>
              <li>
                <Link href="/top-10/attractions/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  {t('nav.attractionGuides')}
                </Link>
              </li>
              <li>
                <Link href="/city/bangkok/top-10-restaurants/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  {t('nav.bangkokTop10')}
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/top-10-hotels/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  {t('nav.phuketTop10')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand - Bottom Right */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-thailand-red">
                {t('footer.aboutTitle')}
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-6">
              {t('footer.aboutText')}
            </p>
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                {t('footer.builtWith')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Go2Thailand.com. {t('footer.rights')}.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                {t('footer.travelDisclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
      <AnnouncementBar />
    </>
  );
};

export default Footer;
