import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 xl:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-thailand-red">
                Go2Thailand
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-6 max-w-md">
              Your ultimate guide to exploring Thailand. Discover amazing cities, hidden gems, 
              delicious food, and unforgettable experiences across the Land of Smiles.
            </p>
            <div className="mt-6">
              <p className="text-xs text-gray-500">
                Built with Next.js and Tailwind CSS
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/city/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  All Cities
                </Link>
              </li>
              <li>
                <Link href="/region/northern/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Northern Thailand
                </Link>
              </li>
              <li>
                <Link href="/region/central/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Central Thailand
                </Link>
              </li>
              <li>
                <Link href="/region/southern/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Southern Thailand
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/city/bangkok/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Bangkok
                </Link>
              </li>
              <li>
                <Link href="/city/chiang-mai/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Chiang Mai
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Phuket
                </Link>
              </li>
              <li>
                <Link href="/city/pattaya/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Pattaya
                </Link>
              </li>
            </ul>
          </div>

          {/* Weather & Climate */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              🌤️ Weather Guide
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/weather/" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                  All Weather Guides →
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/thailand-in/january/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Thailand in January
                </Link>
              </li>
              <li>
                <Link href="/thailand-in/april/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  Songkran Season 🎉
                </Link>
              </li>
              <li>
                <Link href="/thailand-in/november/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Loy Krathong Month
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <Link href="/city/bangkok/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Bangkok Weather
                </Link>
              </li>
              <li>
                <Link href="/city/chiang-mai/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Chiang Mai Weather
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Phuket Weather
                </Link>
              </li>
              <li>
                <Link href="/city/krabi/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Krabi Weather
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/city/pattaya/weather/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  More Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Travel Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/esim/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Thailand eSIM
                </Link>
              </li>
              <li>
                <Link href="/travel-insurance/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link href="/travel-gear/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Travel Gear
                </Link>
              </li>
              <li>
                <Link href="/food/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Thai Food Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Top 10 Guides */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              🏆 Top 10 Guides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/top-10/restaurants/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Restaurant Guides
                </Link>
              </li>
              <li>
                <Link href="/top-10/hotels/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Hotel Guides
                </Link>
              </li>
              <li>
                <Link href="/top-10/attractions/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Attraction Guides
                </Link>
              </li>
              <li>
                <Link href="/city/bangkok/top-10-restaurants/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  Bangkok Top 10
                </Link>
              </li>
              <li>
                <Link href="/city/phuket/top-10-hotels/" className="text-gray-300 hover:text-thailand-red text-sm transition-colors">
                  Phuket Top 10
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Go2Thailand.com. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                Travel information is for reference only. Please verify details before your trip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
