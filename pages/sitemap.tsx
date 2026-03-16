import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

const sections: SitemapSection[] = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Thailand Travel Guide', href: '/thailand-travel-guide' },
      { label: 'Best Places to Visit', href: '/best-places-to-visit-thailand' },
      { label: 'Is Thailand Safe?', href: '/is-thailand-safe' },
      { label: 'Thailand for First Timers', href: '/thailand-for-first-timers' },
      { label: 'Thailand Itinerary', href: '/thailand-itinerary' },
      { label: 'Best Beaches in Thailand', href: '/best-beaches-in-thailand' },
      { label: 'Thailand Index', href: '/thailand-index/' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'All Cities', href: '/city/' },
      { label: 'Thai Islands', href: '/islands/' },
      { label: 'Northern Thailand', href: '/region/northern/' },
      { label: 'Central Thailand', href: '/region/central/' },
      { label: 'Southern Thailand', href: '/region/southern/' },
      { label: 'Isaan (Northeast)', href: '/region/isaan/' },
    ],
  },
  {
    title: 'Food & Drink',
    links: [
      { label: 'Thai Food Guide', href: '/food/' },
      { label: 'Thai Drinks', href: '/drinks/' },
      { label: 'Cooking Classes in Thailand', href: '/best-cooking-classes-in-thailand/' },
    ],
  },
  {
    title: 'Travel Planning',
    links: [
      { label: 'Transport Routes', href: '/transport/' },
      { label: 'Weather Guide', href: '/weather/' },
      { label: 'Visa Guide', href: '/visa/' },
      { label: 'Travel Insurance Thailand', href: '/travel-insurance-thailand/' },
      { label: 'eSIM Guide', href: '/esim/' },
      { label: 'Travel Gear', href: '/travel-gear/' },
      { label: 'VPN & Security', href: '/travel-security/' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Restaurant Guides', href: '/top-10/restaurants/' },
      { label: 'Hotel Guides', href: '/top-10/hotels/' },
      { label: 'Attraction Guides', href: '/top-10/attractions/' },
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: 'Travel Blog', href: '/blog/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
    ],
  },
];

export default function SitemapPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <>
      <Head>
        <title>Sitemap - Go2Thailand.com</title>
        <meta
          name="description"
          content="Full sitemap of Go2Thailand.com — browse all pages including destination guides, food, travel planning, blog posts, and legal information."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-surface-cream">
        <div className="container-custom py-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="max-w-5xl mx-auto">
            {/* Page header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold font-heading text-gray-900 mb-3">Sitemap</h1>
              <p className="text-gray-600 text-lg">
                A complete overview of all pages on Go2Thailand.com. Use this page to find destination guides,
                travel planning resources, food guides, and more.
              </p>
            </div>

            {/* Sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <h2 className="text-lg font-bold font-heading text-gray-900 mb-4 border-b border-gray-100 pb-3">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-thailand-blue hover:underline text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
