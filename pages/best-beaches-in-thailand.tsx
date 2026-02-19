import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';

interface BeachData {
  rank: number;
  name: string;
  island_slug: string;
  island_name: { en: string; nl: string };
  region: string;
  province: string;
  description: { en: string; nl: string };
  best_for: string[];
  vibe: string;
  crowd_level: string;
  best_months: string;
  budget_level: string;
  highlights: { en: string[]; nl: string[] };
  tip: { en: string; nl: string };
}

interface FaqItem {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface PageData {
  title: { en: string; nl: string };
  intro: { en: string; nl: string };
  last_updated: string;
  beaches: BeachData[];
  faq: FaqItem[];
}

interface BestBeachesProps {
  data: PageData;
}

type FilterCategory = 'all' | 'families' | 'snorkeling' | 'party' | 'relaxation' | 'budget';

export default function BestBeachesInThailand({ data }: BestBeachesProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    {
      name: lang === 'nl' ? 'Beste Stranden in Thailand' : 'Best Beaches in Thailand',
      href: '/best-beaches-in-thailand/'
    }
  ];

  const filterBeaches = (beaches: BeachData[]): BeachData[] => {
    switch (activeFilter) {
      case 'families':
        return beaches.filter(b =>
          b.best_for.some(f =>
            ['families', 'swimming'].includes(f.toLowerCase())
          ) && b.crowd_level === 'low'
        );
      case 'snorkeling':
        return beaches.filter(b =>
          b.best_for.some(f =>
            ['snorkeling', 'diving'].includes(f.toLowerCase())
          )
        );
      case 'party':
        return beaches.filter(b =>
          b.best_for.some(f =>
            ['nightlife', 'party', 'fire shows', 'full moon party'].includes(f.toLowerCase())
          )
        );
      case 'relaxation':
        return beaches.filter(b =>
          b.best_for.some(f =>
            ['relaxation', 'seclusion', 'romance'].includes(f.toLowerCase())
          )
        );
      case 'budget':
        return beaches.filter(b => b.budget_level === 'budget');
      default:
        return beaches;
    }
  };

  const filteredBeaches = filterBeaches(data.beaches);

  const gulfBeaches = data.beaches.filter(b => b.region === 'Gulf of Thailand');
  const andamanBeaches = data.beaches.filter(b => b.region === 'Andaman Sea');

  const filterLabels: Record<FilterCategory, { en: string; nl: string }> = {
    all: { en: 'All Beaches', nl: 'Alle Stranden' },
    families: { en: 'Families', nl: 'Gezinnen' },
    snorkeling: { en: 'Snorkeling & Diving', nl: 'Snorkelen & Duiken' },
    party: { en: 'Party & Nightlife', nl: 'Party & Nachtleven' },
    relaxation: { en: 'Relaxation', nl: 'Ontspanning' },
    budget: { en: 'Budget', nl: 'Budget' }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title[lang],
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand'
    },
    datePublished: '2026-02-18',
    dateModified: data.last_updated,
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/logo.png'
      }
    },
    image: 'https://go2-thailand.com/images/islands/koh-phi-phi.webp',
    url: 'https://go2-thailand.com/best-beaches-in-thailand'
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title[lang],
    numberOfItems: data.beaches.length,
    itemListElement: data.beaches.map(beach => ({
      '@type': 'ListItem',
      position: beach.rank,
      name: beach.name,
      url: `https://go2-thailand.com/islands/${beach.island_slug}/`
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(item => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang]
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const combinedSchema = [articleSchema, itemListSchema, faqSchema, breadcrumbSchema];

  const pageTitle =
    lang === 'nl'
      ? '25 Beste Stranden in Thailand (2026) - Gerangschikte Gids | Go2Thailand'
      : '25 Best Beaches in Thailand (2026) - Ranked Guide | Go2Thailand';

  const pageDescription =
    lang === 'nl'
      ? 'De 25 mooiste stranden van Thailand, gerangschikt en vergeleken. Van Maya Bay op Koh Phi Phi tot Sunrise Beach op Koh Lipe — vind jouw perfect Thais strand.'
      : 'The 25 most stunning beaches in Thailand, ranked and compared. From Maya Bay on Koh Phi Phi to Sunrise Beach on Koh Lipe — find your perfect Thai beach.';

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
      >
        <meta
          name="keywords"
          content="best beaches Thailand, Thailand beach guide, Maya Bay, Koh Lipe, Koh Phi Phi beaches, snorkeling Thailand, family beaches Thailand, Thailand beach ranking 2026"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {data.title[lang]}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'De definitieve gerangschikte gids voor Thailand\'s mooiste stranden over 10 eilanden en 2 kustlijnen'
                  : 'The definitive ranked guide to Thailand\'s most stunning beaches across 10 islands and 2 coastlines'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">25 beaches</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">10 islands</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">2 coastlines</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Updated Feb 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Intro Text */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro[lang]}</p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {(Object.keys(filterLabels) as FilterCategory[]).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterLabels[category][lang]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Beach Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredBeaches.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">
                  {lang === 'nl'
                    ? 'Geen stranden gevonden voor deze filter.'
                    : 'No beaches found for this filter.'}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredBeaches.map((beach, index) => (
                  <div key={beach.rank}>
                    <article className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
                      {/* Rank Badge */}
                      <div className="absolute top-4 left-4 z-10 bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        #{beach.rank}
                      </div>

                      {/* Island Image */}
                      <div className="relative h-48 md:h-64">
                        <Image
                          src={`/images/islands/${beach.island_slug}.webp`}
                          alt={`${beach.name} - ${beach.island_name[lang]}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="text-2xl font-bold">{beach.name}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <Link
                              href={`/islands/${beach.island_slug}/`}
                              className="text-white/90 hover:text-white underline text-sm"
                            >
                              {beach.island_name[lang]}
                            </Link>
                            <span className="text-white/70 text-sm">· {beach.region}</span>
                            <span className="text-white/70 text-sm">· {beach.province}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Best For Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {beach.best_for.map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{beach.description[lang]}</p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">
                              {lang === 'nl' ? 'Beste Maanden' : 'Best Months'}
                            </div>
                            <div className="font-semibold text-gray-900">{beach.best_months}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">
                              {lang === 'nl' ? 'Drukte' : 'Crowd Level'}
                            </div>
                            <div className="font-semibold text-gray-900 capitalize">{beach.crowd_level}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-gray-500 text-xs mb-1">
                              {lang === 'nl' ? 'Budget' : 'Budget'}
                            </div>
                            <div className="font-semibold text-gray-900 capitalize">{beach.budget_level}</div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-1 mb-4">
                          {beach.highlights[lang].map((highlight, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">&#10003;</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        {/* Pro Tip */}
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                          <span className="font-semibold text-amber-800 text-sm">
                            {lang === 'nl' ? 'Pro Tip: ' : 'Pro Tip: '}
                          </span>
                          <span className="text-amber-900 text-sm">{beach.tip[lang]}</span>
                        </div>
                      </div>
                    </article>

                    {/* Affiliate CTAs after every 5th beach */}
                    {beach.rank === 5 && (
                      <div className="bg-gradient-to-r from-thailand-blue to-emerald-500 rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold mb-2">
                          {lang === 'nl' ? 'Boek je Eilandhoppen' : 'Book Your Island Hopping'}
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          {lang === 'nl'
                            ? 'Veerboten, hotels en tours voor de beste stranden van Thailand'
                            : "Ferries, hotels & tours for Thailand's best beaches"}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://12go.tpo.lv/tNA80urD"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Book Ferries
                          </a>
                          <a
                            href="https://booking.tpo.lv/2PT1kR82"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Booking.com
                          </a>
                          <a
                            href="https://trip.tpo.lv/TmObooZ5"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Trip.com Hotels
                          </a>
                          <a
                            href="https://klook.tpo.lv/7Dt6WApj"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Tours &amp; Activities
                          </a>
                        </div>
                      </div>
                    )}

                    {beach.rank === 10 && (
                      <div className="my-8">
                        <TripcomWidget
                          city="Thailand Islands"
                          type="searchbox"
                          customTitle={
                            lang === 'nl'
                              ? 'Vind Hotels op de Beste Stranden'
                              : 'Find Hotels on the Best Beaches'
                          }
                        />
                      </div>
                    )}

                    {beach.rank === 15 && (
                      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold mb-2">
                          {lang === 'nl' ? 'Boek Snorkel &amp; Duik Tours' : 'Book Snorkel & Dive Tours'}
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          {lang === 'nl'
                            ? 'De beste onderwaterervaringen bij deze stranden'
                            : 'The best underwater experiences at these beaches'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://klook.tpo.lv/7Dt6WApj"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Klook Tours
                          </a>
                          <a
                            href="https://getyourguide.tpo.lv/GuAFfGGK"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            GetYourGuide
                          </a>
                          <a
                            href="https://saily.tpo.lv/rf9lidnE"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Get eSIM for Maps
                          </a>
                        </div>
                      </div>
                    )}

                    {beach.rank === 20 && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white my-8">
                        <h3 className="text-xl font-bold mb-2">
                          {lang === 'nl' ? 'Vervoer naar de Eilanden' : 'Transport to the Islands'}
                        </h3>
                        <p className="opacity-90 mb-4 text-sm">
                          {lang === 'nl'
                            ? 'Veerboten, vluchten en transfers'
                            : 'Ferries, flights & transfers'}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="https://12go.tpo.lv/tNA80urD"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            12go Ferries
                          </a>
                          <a
                            href="https://trip.tpo.lv/iP1HSint"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Hotel + Flight Bundle
                          </a>
                          <a
                            href="https://trip.tpo.lv/fzIWyBhW"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                          >
                            Car Rental
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* By Region Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Stranden per Regio' : 'Beaches by Region'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Gulf of Thailand */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Gulf of Thailand</h3>
                <p className="text-blue-700 text-sm mb-4">
                  {lang === 'nl'
                    ? 'De Golf van Thailand biedt het hele jaar door rustig water met uitstekende duikmogelijkheden. Koh Tao, Koh Samui en Koh Phangan zijn de iconische eilanden van deze kust. Seizoen: jaar rond, beste periode december-maart.'
                    : 'The Gulf of Thailand offers calm year-round waters with excellent diving conditions. Koh Tao, Koh Samui, and Koh Phangan are the iconic islands of this coast. Season: year-round, best December-March.'}
                </p>
                <ul className="space-y-2">
                  {gulfBeaches.map(beach => (
                    <li key={beach.rank} className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {beach.rank}
                      </span>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{beach.name}</span>
                        <span className="text-gray-500 text-xs ml-2">— {beach.island_name[lang]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Andaman Sea */}
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Andaman Sea</h3>
                <p className="text-emerald-700 text-sm mb-4">
                  {lang === 'nl'
                    ? 'De Andamanzee staat bekend om zijn dramatische kalkstenen kliffen, kristalhelder water en levendige koraalriffen. Koh Phi Phi, Koh Lanta en Koh Lipe zijn de pareltjes van deze kust. Beste seizoen: november-april.'
                    : 'The Andaman Sea is famous for its dramatic limestone cliffs, crystal-clear water, and vibrant coral reefs. Koh Phi Phi, Koh Lanta, and Koh Lipe are the gems of this coast. Best season: November-April.'}
                </p>
                <ul className="space-y-2">
                  {andamanBeaches.map(beach => (
                    <li key={beach.rank} className="flex items-center gap-3">
                      <span className="bg-emerald-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {beach.rank}
                      </span>
                      <div>
                        <span className="font-medium text-gray-900 text-sm">{beach.name}</span>
                        <span className="text-gray-500 text-xs ml-2">— {beach.island_name[lang]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Tips Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Praktische Tips voor de Stranden van Thailand' : 'Practical Tips for Thailand\'s Beaches'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Best Season */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">&#9728;</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {lang === 'nl' ? 'Beste Seizoen' : 'Best Season'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'nl'
                    ? 'Andamanzee: november–april. Golf van Thailand: december–maart, maar het hele jaar door aangenaam. Koh Samet is uniek: zonnig zelfs tijdens het moessonseizoen op het vasteland.'
                    : 'Andaman Sea: November–April. Gulf of Thailand: December–March, but pleasant year-round. Koh Samet is unique: sunny even during mainland monsoon season thanks to its microclimate.'}
                </p>
              </div>

              {/* What to Pack */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">&#127956;</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {lang === 'nl' ? 'Wat Meenemen' : 'What to Pack'}
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#10003; {lang === 'nl' ? 'Rif-veilige zonnebrand (SPF 50+)' : 'Reef-safe sunscreen (SPF 50+)'}</li>
                  <li>&#10003; {lang === 'nl' ? 'Waterschoenen voor rotsige stranden' : 'Water shoes for rocky beaches'}</li>
                  <li>&#10003; {lang === 'nl' ? 'Droge tas voor elektronica' : 'Dry bag for electronics'}</li>
                  <li>&#10003; {lang === 'nl' ? 'Eigen snorkeluitrusting' : 'Own snorkel gear'}</li>
                  <li>&#10003; eSIM {lang === 'nl' ? 'voor kaarten en navigatie' : 'for maps and navigation'}</li>
                  <li>&#10003; {lang === 'nl' ? 'Contant geld (kleine eilanden)' : 'Cash (small islands are cash-only)'}</li>
                </ul>
              </div>

              {/* Safety Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">&#9642;</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {lang === 'nl' ? 'Veiligheidstips' : 'Safety Tips'}
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#9888; {lang === 'nl' ? 'Let op rode vlaggen — niet zwemmen' : 'Respect red flags — never swim'}</li>
                  <li>&#9888; {lang === 'nl' ? 'Sterke stroming tijdens moesson' : 'Strong currents during monsoon'}</li>
                  <li>&#9888; {lang === 'nl' ? 'Kwallen: mei–oktober op sommige stranden' : 'Jellyfish: May–Oct on some beaches'}</li>
                  <li>&#9888; {lang === 'nl' ? "Nooit alleen zwemmen 's nachts" : 'Never swim alone at night'}</li>
                  <li>&#9888; {lang === 'nl' ? 'Waardevolle spullen buiten het bereik van het water houden' : 'Keep valuables away from tide'}</li>
                </ul>
              </div>

              {/* Budget Tips */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">&#128184;</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {lang === 'nl' ? 'Budgettips' : 'Budget Tips'}
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>&#128094; {lang === 'nl' ? 'Bezoek buiten het seizoen (mei–okt)' : 'Travel off-season (May–Oct)'}</li>
                  <li>&#128094; {lang === 'nl' ? 'Koh Tao: goedkoopste PADI-cursus ter wereld' : 'Koh Tao: cheapest PADI worldwide'}</li>
                  <li>&#128094; {lang === 'nl' ? 'Koh Mak: authenticiteit tegen lagere prijs' : 'Koh Mak: authentic at lower cost'}</li>
                  <li>&#128094; {lang === 'nl' ? 'Boek ferry + hotel samen voor korting' : 'Bundle ferry + hotel for discount'}</li>
                  <li>&#128094; {lang === 'nl' ? 'Songthaew voor goedkoop vervoer op de eilanden' : 'Songthaews for cheap island transport'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <details key={i} className="mb-4 bg-gray-50 rounded-xl shadow-sm group">
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-100 rounded-xl list-none flex items-center justify-between transition-colors">
                    <span className="text-gray-900">{item.question[lang]}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">
                    {item.answer[lang]}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Full Affiliate CTA Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <h2 className="text-3xl font-bold mb-3">
                {lang === 'nl' ? 'Plan je Thaise Strandvakantie' : 'Plan Your Thai Beach Holiday'}
              </h2>
              <p className="text-lg opacity-90">
                {lang === 'nl'
                  ? 'Boek alles wat je nodig hebt voor je eilandhop-avontuur'
                  : 'Book everything you need for your island-hopping adventure'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <TripcomWidget
                city="Thailand"
                type="searchbox"
                customTitle={
                  lang === 'nl'
                    ? 'Zoek Hotels bij de Beste Stranden'
                    : 'Search Hotels Near the Best Beaches'
                }
              />
              <div className="space-y-3">
                <a
                  href="https://12go.tpo.lv/tNA80urD"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#9941; {lang === 'nl' ? 'Boek Veerboten (12go)' : 'Book Ferries (12go)'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Booking.com</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Trip.com Hotels</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://trip.tpo.lv/iP1HSint"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#9992; {lang === 'nl' ? 'Hotel + Vlucht Pakket' : 'Hotel + Flight Bundle'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; {lang === 'nl' ? 'Klook Tours & Activiteiten' : 'Klook Tours & Activities'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; GetYourGuide {lang === 'nl' ? 'Activiteiten' : 'Activities'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#128242; Saily eSIM {lang === 'nl' ? 'voor Thailand' : 'for Thailand'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://trip.tpo.lv/fzIWyBhW"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#128664; {lang === 'nl' ? 'Autoverhuur via Trip.com' : 'Car Rental via Trip.com'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-6">
              {lang === 'nl'
                ? 'Sommige links zijn affiliate links. Wij verdienen een commissie zonder extra kosten voor jou.'
                : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>

        {/* Related Pages Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {lang === 'nl' ? 'Gerelateerde Pagina\'s' : 'Related Pages'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Link
                href="/islands/"
                className="group block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="text-3xl mb-3">&#127965;</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  {lang === 'nl' ? 'Verken Alle Thaise Eilanden' : 'Explore All Thai Islands'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'nl'
                    ? 'Complete gidsen voor Koh Samui, Koh Phi Phi, Koh Tao en meer.'
                    : 'Complete guides for Koh Samui, Koh Phi Phi, Koh Tao, and more.'}
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  {lang === 'nl' ? 'Bekijk alle eilanden' : 'View all islands'} &#8594;
                </span>
              </Link>

              <Link
                href="/compare/"
                className="group block bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-md"
              >
                <div className="text-3xl mb-3">&#9878;</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {lang === 'nl' ? 'Vergelijk Eilanden Naast Elkaar' : 'Compare Islands Side by Side'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {lang === 'nl'
                    ? 'Niet zeker welk eiland je moet kiezen? Vergelijk ze direct.'
                    : "Can't decide which island to choose? Compare them directly."}
                </p>
                <span className="inline-block mt-3 text-emerald-700 text-sm font-medium group-hover:underline">
                  {lang === 'nl' ? 'Vergelijk eilanden' : 'Compare islands'} &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../data/beaches/best-beaches.json');
  return {
    props: { data },
    revalidate: 86400
  };
};
