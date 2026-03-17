import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getTempleBySlug, getTempleSlugs, getNearbyTemples, Temple } from '../../lib/temples';

interface TempleDetailPageProps {
  temple: Temple;
  nearbyTemples: Temple[];
}

const visitorTips = [
  'Cover your shoulders and knees — long pants or a skirt below the knee and a sleeved shirt are required at all Thai temples.',
  'Remove your shoes before entering any temple building. Look for the pile of shoes at the entrance as your cue.',
  'Avoid pointing your feet toward Buddha images or monks, as feet are considered the lowest and least sacred part of the body.',
  'Speak quietly and switch your phone to silent mode inside the temple grounds out of respect for worshippers.',
  'Visit early morning (before 9am) for cooler temperatures, smaller crowds, and the chance to witness monks\u2019 morning rituals.',
  'Photography is usually permitted in temple grounds but may be restricted inside certain buildings — look for signs or ask a monk.',
  'Donations are voluntary but appreciated; place them in the donation boxes rather than handing cash directly to monks.',
  'Women should never touch or hand anything directly to a monk — place items on a cloth or nearby surface instead.',
];

export default function TempleDetailPage({ temple, nearbyTemples }: TempleDetailPageProps) {
  const isFreeEntry = temple.entry_fee === 'Free' || temple.entry_fee === null;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Temples', href: '/thailand-temples/' },
    { name: temple.name, href: `/temples/${temple.slug}/` },
  ];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.google_maps_query)}`;

  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: temple.name,
    description: temple.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: temple.city,
      addressCountry: 'TH',
    },
    isAccessibleForFree: isFreeEntry,
    touristType: 'Cultural',
    url: `https://go2-thailand.com/temples/${temple.slug}/`,
    ...(temple.opening_hours && { openingHours: temple.opening_hours }),
  };

  return (
    <>
      <SEOHead
        title={`${temple.name} — Visitor Guide, Entry Fee & Tips (2026)`}
        description={`${temple.name} in ${temple.city}: entry fee, opening hours, visitor tips and directions. ${temple.description.substring(0, 100)}...`}
      >
        <meta
          name="keywords"
          content={`${temple.name}, ${temple.city} temples, Thailand temples, visit ${temple.name}, ${temple.type} Thailand`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">

        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="font-script text-thailand-gold text-lg mb-2">
                Sacred Sites of Thailand
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                {temple.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  href={`/city/${temple.city_slug}/`}
                  className="text-thailand-gold hover:underline font-medium text-lg"
                >
                  {temple.city}
                </Link>
                <span className="text-white/50">&#183;</span>
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {temple.type}
                </span>
                {isFreeEntry ? (
                  <span className="inline-block bg-green-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Free Entry
                  </span>
                ) : (
                  <span className="inline-block bg-amber-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {temple.entry_fee}
                  </span>
                )}
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left: Main Column */}
              <div className="lg:col-span-2 space-y-8">

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <p className="section-label">About This Temple</p>
                  <h2 className="section-title font-heading mb-6">
                    {temple.name}: What to Expect
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      {temple.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {temple.name} is one of the most significant {temple.type.toLowerCase()} in{' '}
                      {temple.city} and a must-visit for anyone travelling through{' '}
                      <Link href={`/city/${temple.city_slug}/`} className="text-thailand-blue hover:underline font-medium">
                        {temple.city}
                      </Link>
                      . Whether you are a first-time visitor or a seasoned traveller, the atmosphere here
                      is unlike anything else in Thailand. Arrive early, dress respectfully, and take your
                      time absorbing the architecture and spiritual energy.
                    </p>
                  </div>
                </div>

                {/* Affiliate CTA */}
                <div className="bg-surface-dark rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold font-heading mb-2">
                    Book Temple Tours &amp; Experiences
                  </h3>
                  <p className="opacity-90 mb-5 text-sm leading-relaxed">
                    Skip the planning and join a guided tour of {temple.name} with expert local guides.
                    Many tours combine multiple temples in a single day — great value for time-pressed travellers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://klook.tpo.lv/7Dt6WApj"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="bg-white text-thailand-blue px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                      Klook Temple Tours
                    </a>
                    <a
                      href="https://getyourguide.tpo.lv/GuAFfGGK"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="bg-white text-thailand-blue px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                      GetYourGuide
                    </a>
                    <a
                      href="https://booking.tpo.lv/2PT1kR82"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="bg-white text-thailand-blue px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                      Booking.com Hotels
                    </a>
                  </div>
                  <p className="text-white/50 text-xs mt-4">
                    Affiliate links — we may earn a small commission at no extra cost to you.
                  </p>
                </div>

                {/* Key Facts */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <p className="section-label">Highlights</p>
                  <h2 className="section-title font-heading mb-6">Key Facts</h2>
                  <ul className="space-y-3">
                    {temple.key_facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-thailand-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Getting There */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <p className="section-label">Getting There</p>
                  <h2 className="section-title font-heading mb-4">How to Reach {temple.name}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {temple.name} is located in {temple.city}. For full transport options including
                    buses, tuk-tuks, taxis, and Grab, visit our{' '}
                    <Link href={`/city/${temple.city_slug}/`} className="text-thailand-blue hover:underline font-medium">
                      {temple.city} city guide
                    </Link>
                    . We cover all major routes and local transport tips to make your journey as smooth
                    as possible.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    Planning to travel between cities? Check our{' '}
                    <Link href="/transport/" className="text-thailand-blue hover:underline font-medium">
                      Thailand transport guide
                    </Link>{' '}
                    for trains, buses, and domestic flights to and from {temple.city}.
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-thailand-blue text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-thailand-blue/90 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>

                {/* Visitor Tips */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <p className="section-label">Etiquette &amp; Advice</p>
                  <h2 className="section-title font-heading mb-6">Visitor Tips for {temple.name}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {visitorTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 bg-surface-cream rounded-xl p-4">
                        <span className="text-thailand-gold font-bold text-base flex-shrink-0 mt-0.5">
                          {i + 1}.
                        </span>
                        <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Temples */}
                {nearbyTemples.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <p className="section-label">More in {temple.city}</p>
                    <h2 className="section-title font-heading mb-6">
                      Nearby Temples in {temple.city}
                    </h2>
                    <div className="space-y-4">
                      {nearbyTemples.map((nearby) => {
                        const nearbyIsFree = nearby.entry_fee === 'Free' || nearby.entry_fee === null;
                        return (
                          <Link
                            key={nearby.slug}
                            href={`/temples/${nearby.slug}/`}
                            className="group flex items-start justify-between gap-4 bg-surface-cream rounded-xl p-5 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                                #{nearby.rank} {nearby.name}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">{nearby.description.substring(0, 100)}...</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs text-gray-500">{nearby.type}</span>
                                {nearby.opening_hours && (
                                  <>
                                    <span className="text-gray-400 text-xs">&#183;</span>
                                    <span className="text-xs text-gray-500">{nearby.opening_hours}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {nearbyIsFree ? (
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                  Free
                                </span>
                              ) : (
                                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                                  {nearby.entry_fee}
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-5">
                      <Link
                        href="/thailand-temples/"
                        className="inline-flex items-center gap-2 text-thailand-blue hover:underline text-sm font-medium"
                      >
                        View all temples in Thailand
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-6">

                {/* Quick Facts Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 pb-3 border-b">
                    Quick Facts
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Entry Fee
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        {isFreeEntry ? (
                          <span className="text-green-700 font-semibold">Free</span>
                        ) : (
                          temple.entry_fee
                        )}
                      </dd>
                    </div>
                    <div className="border-t pt-4">
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Opening Hours
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        {temple.opening_hours ?? 'Open daily — check locally for holiday hours'}
                      </dd>
                    </div>
                    <div className="border-t pt-4">
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Dress Code
                      </dt>
                      <dd className="text-gray-700 text-sm">
                        Shoulders and knees must be covered. Remove shoes before entering buildings.
                      </dd>
                    </div>
                    <div className="border-t pt-4">
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        <Link
                          href={`/city/${temple.city_slug}/`}
                          className="text-thailand-blue hover:underline"
                        >
                          {temple.city}
                        </Link>
                        , Thailand
                      </dd>
                    </div>
                    <div className="border-t pt-4">
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Temple Type
                      </dt>
                      <dd className="text-gray-900 font-medium">{temple.type}</dd>
                    </div>
                    <div className="border-t pt-4">
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Rank
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        #{temple.rank} on{' '}
                        <Link href="/thailand-temples/" className="text-thailand-blue hover:underline">
                          our temples list
                        </Link>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-5">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-surface-cream hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4 text-thailand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>

                {/* Key Facts Tags */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-base font-bold font-heading text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {temple.key_facts.map((fact, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Cross-Links Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Explore More</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-8 text-center section-title">
              Related Guides &amp; Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              <Link
                href="/thailand-temples/"
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#9968;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  All Thailand Temples
                </h3>
                <p className="text-gray-600 text-sm">The complete ranked guide to Thailand&apos;s best temples.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  View all temples &#8594;
                </span>
              </Link>

              <Link
                href={`/city/${temple.city_slug}/`}
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#127755;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  {temple.city} City Guide
                </h3>
                <p className="text-gray-600 text-sm">Transport, food, hotels, and top attractions in {temple.city}.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore {temple.city} &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-travel-guide/"
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#127988;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Thailand Travel Guide
                </h3>
                <p className="text-gray-600 text-sm">Everything to know before your trip to Thailand.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  Read the guide &#8594;
                </span>
              </Link>

              <Link
                href="/food/"
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#127857;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Thai Food Guide
                </h3>
                <p className="text-gray-600 text-sm">Discover 46 authentic Thai dishes with recipes and restaurant tips.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore Thai food &#8594;
                </span>
              </Link>

              <Link
                href="/transport/"
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#128661;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Thailand Transport
                </h3>
                <p className="text-gray-600 text-sm">Trains, buses, boats and flights — 245 routes covered.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  Plan your journey &#8594;
                </span>
              </Link>

              <Link
                href="/best-places-to-visit-thailand/"
                className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-2xl mb-2">&#9733;</div>
                <h3 className="font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                  Best Places to Visit
                </h3>
                <p className="text-gray-600 text-sm">Top destinations in Thailand ranked for every type of traveller.</p>
                <span className="inline-block mt-2 text-thailand-blue text-sm font-medium group-hover:underline">
                  See top destinations &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-surface-dark py-12 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-script text-thailand-gold text-lg mb-2">Start Planning</p>
            <h2 className="text-3xl font-bold font-heading mb-4">
              Ready to Visit {temple.name}?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Book a guided temple tour or find a hotel near {temple.city}&apos;s temple district.
              Use the links below to plan your visit today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://klook.tpo.lv/7Dt6WApj"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-thailand-gold text-white px-6 py-3 rounded-xl font-semibold hover:bg-thailand-gold/90 transition-colors"
              >
                Book on Klook
              </a>
              <a
                href="https://getyourguide.tpo.lv/GuAFfGGK"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                GetYourGuide Tours
              </a>
              <a
                href="https://booking.tpo.lv/2PT1kR82"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Find a Hotel
              </a>
            </div>
            <p className="text-white/40 text-xs mt-5">
              Affiliate links — we may earn a small commission at no extra cost to you.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getTempleSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale: _locale }) => {
  const slug = params?.slug as string;
  const temple = getTempleBySlug(slug);
  if (!temple) return { notFound: true };

  const nearbyTemples = getNearbyTemples(slug, 3);

  return {
    props: {
      temple,
      nearbyTemples,
    },
    revalidate: 86400,
  };
};
