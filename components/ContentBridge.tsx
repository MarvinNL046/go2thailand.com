import Link from 'next/link';

interface BridgeLink {
  href: string;
  label: string;
  icon: string;
}

interface ContentBridgeProps {
  context: 'transport' | 'visa' | 'city' | 'food' | 'island';
  citySlug?: string;
  cityName?: string;
}

const BRIDGE_LINKS: Record<string, (props: ContentBridgeProps) => BridgeLink[]> = {
  transport: ({ citySlug, cityName }) => [
    { href: citySlug ? `/city/${citySlug}/` : '/city/', label: cityName ? `${cityName} City Guide` : 'City Guides', icon: '🏙️' },
    { href: citySlug ? `/city/${citySlug}/top-10-hotels/` : '/top-10/hotels/', label: cityName ? `Top Hotels in ${cityName}` : 'Top Hotels', icon: '🏨' },
    { href: citySlug ? `/city/${citySlug}/top-10-restaurants/` : '/top-10/restaurants/', label: cityName ? `Best Restaurants in ${cityName}` : 'Best Restaurants', icon: '🍜' },
    { href: '/thailand-travel-guide/', label: 'Thailand Travel Guide', icon: '🇹🇭' },
  ],
  visa: () => [
    { href: '/thailand-itinerary/', label: 'Plan Your Itinerary', icon: '🗺️' },
    { href: '/transport/', label: 'Book Transport', icon: '🚂' },
    { href: '/thailand-travel-guide/', label: 'Travel Guide 2026', icon: '📖' },
    { href: '/esim/', label: 'Get a Thailand eSIM', icon: '📱' },
  ],
  city: ({ citySlug }) => [
    { href: '/blog/', label: 'Latest Blog Posts', icon: '📝' },
    { href: '/transport/', label: 'Transport Routes', icon: '🚂' },
    { href: '/thailand-index/', label: 'Thailand Index 2026', icon: '📊' },
    { href: '/islands/', label: 'Island Guides', icon: '🏝️' },
  ],
  food: () => [
    { href: '/city/', label: 'Explore Cities', icon: '🏙️' },
    { href: '/food/', label: 'More Thai Dishes', icon: '🍜' },
    { href: '/blog/', label: 'Food Blog Posts', icon: '📝' },
    { href: '/thailand-travel-guide/', label: 'Travel Guide', icon: '🇹🇭' },
  ],
  island: () => [
    { href: '/islands/', label: 'More Islands', icon: '🏝️' },
    { href: '/transport/', label: 'Transport & Ferries', icon: '⛴️' },
    { href: '/top-10/hotels/', label: 'Top Hotels', icon: '🏨' },
    { href: '/thailand-travel-guide/', label: 'Travel Guide', icon: '🇹🇭' },
  ],
};

export default function ContentBridge({ context, citySlug, cityName }: ContentBridgeProps) {
  const getLinks = BRIDGE_LINKS[context];
  if (!getLinks) return null;
  const links = getLinks({ context, citySlug, cityName });

  return (
    <section className="bg-surface-cream py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 text-center">
          Continue Exploring
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <span className="text-2xl block mb-2">{link.icon}</span>
              <span className="text-sm font-medium text-gray-900 group-hover:text-thailand-blue transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
