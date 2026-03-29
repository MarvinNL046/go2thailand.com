import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import InsuranceCTA from '../../components/InsuranceCTA';

interface Neighborhood {
  name: string;
  slug: string;
  rentRange: string;
  vibe: { en: string; nl: string };
  bestFor: { en: string; nl: string };
  transport: string;
  walkability: number;
}

interface CostItem {
  category: { en: string; nl: string };
  budgetTHB: number;
  midTHB: number;
  comfortTHB: number;
}

interface VisaOption {
  name: string;
  duration: string;
  cost: string;
  bestFor: { en: string; nl: string };
  link: string;
}

interface PracticalTip {
  title: { en: string; nl: string };
  description: { en: string; nl: string };
}

interface FaqItem {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface ExpatGuideData {
  title: { en: string; nl: string };
  metaTitle: { en: string; nl: string };
  metaDescription: { en: string; nl: string };
  intro: { en: string; nl: string };
  last_updated: string;
  neighborhoods: Neighborhood[];
  costOfLiving: CostItem[];
  visaOptions: VisaOption[];
  practicalTips: PracticalTip[];
  faq: FaqItem[];
}

interface ExpatPageProps {
  data: ExpatGuideData;
}

const tipIcons = [
  '\u{1F3E6}', // bank
  '\u{1F4F1}', // phone
  '\u{1F3E5}', // hospital
  '\u{1F4BB}', // laptop
  '\u{1F355}', // food
  '\u{1F695}', // transport
];

export default function ExpatGuide({ data }: ExpatPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    {
      name: lang === 'nl' ? 'Expat Gids' : 'Expat Guide',
      href: '/expat/'
    }
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title[lang],
    author: {
      '@type': 'Organization',
      name: 'Go2Thailand'
    },
    datePublished: '2026-02-28',
    dateModified: data.last_updated,
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      logo: {
        '@type': 'ImageObject',
        url: 'https://go2-thailand.com/logo.png'
      }
    },
    image: 'https://go2-thailand.com/images/blog/where-to-live-bangkok-neighborhood-guide-expats.webp',
    url: 'https://go2-thailand.com/expat/'
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

  const combinedSchema = [articleSchema, faqSchema, breadcrumbSchema];

  const budgetTotal = data.costOfLiving.reduce((sum, item) => sum + item.budgetTHB, 0);
  const midTotal = data.costOfLiving.reduce((sum, item) => sum + item.midTHB, 0);
  const comfortTotal = data.costOfLiving.reduce((sum, item) => sum + item.comfortTHB, 0);

  return (
    <>
      <SEOHead
        title={data.metaTitle[lang]}
        description={data.metaDescription[lang]}
      >
        <meta
          name="keywords"
          content="Bangkok expat guide, digital nomad Bangkok, living in Bangkok, Bangkok cost of living, DTV visa Thailand, Bangkok neighborhoods, coworking Bangkok, expat Thailand 2026"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/blog/where-to-live-bangkok-neighborhood-guide-expats.webp"
              alt={data.title[lang]}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {lang === 'nl' ? 'Wonen & Werken' : 'Live & Work'}
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {data.title[lang]}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Wijken, kosten, visa-opties en praktische tips voor expats en digital nomads'
                  : 'Neighbourhoods, costs, visa options, and practical tips for expats and digital nomads'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">8 {lang === 'nl' ? 'wijken' : 'neighbourhoods'}</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">4 {lang === 'nl' ? 'visumopties' : 'visa options'}</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">{lang === 'nl' ? 'Bijgewerkt feb 2026' : 'Updated Feb 2026'}</span>
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

        {/* Intro */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro[lang]}</p>
          </div>
        </section>

        {/* Neighbourhoods Overview */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">
              {lang === 'nl' ? 'Waar Wonen' : 'Where to Live'}
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Top Wijken voor Expats in Bangkok' : 'Top Neighbourhoods for Expats in Bangkok'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.neighborhoods.map((hood) => (
                <div key={hood.slug} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold font-heading text-gray-900">{hood.name}</h3>
                    <span className="bg-thailand-gold/10 text-thailand-gold px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-3">
                      {hood.rentRange}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{hood.vibe[lang]}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 w-20 flex-shrink-0">{lang === 'nl' ? 'Ideaal voor' : 'Best for'}</span>
                      <span className="text-gray-700">{hood.bestFor[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 w-20 flex-shrink-0">{lang === 'nl' ? 'Vervoer' : 'Transit'}</span>
                      <span className="text-gray-700">{hood.transport}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 w-20 flex-shrink-0">{lang === 'nl' ? 'Loopbaar' : 'Walkable'}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`w-4 h-4 rounded-full ${star <= hood.walkability ? 'bg-thailand-blue' : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog/where-to-live-bangkok-neighborhood-guide-expats/"
                className="inline-flex items-center gap-2 bg-thailand-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {lang === 'nl' ? 'Lees de volledige wijkgids (15 wijken)' : 'Read the full neighbourhood guide (15 areas)'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Cost of Living */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">
              {lang === 'nl' ? 'Kosten' : 'Costs'}
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2 text-center">
              {lang === 'nl' ? 'Kosten van Levensonderhoud in Bangkok' : 'Cost of Living in Bangkok'}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-8">
              {lang === 'nl' ? 'Maandelijkse kosten in THB (1 USD \u2248 35 THB)' : 'Monthly costs in THB (1 USD \u2248 35 THB)'}
            </p>

            {/* Mobile: cards */}
            <div className="md:hidden space-y-4">
              {data.costOfLiving.map((item, i) => (
                <div key={i} className="bg-surface-cream rounded-xl p-4">
                  <div className="font-semibold text-gray-900 mb-2">{item.category[lang]}</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Budget</div>
                      <div className="font-semibold text-gray-900">{item.budgetTHB === 0 ? '-' : `\u0E3F${item.budgetTHB.toLocaleString()}`}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">{lang === 'nl' ? 'Midden' : 'Mid'}</div>
                      <div className="font-semibold text-gray-900">{`\u0E3F${item.midTHB.toLocaleString()}`}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">{lang === 'nl' ? 'Comfortabel' : 'Comfortable'}</div>
                      <div className="font-semibold text-gray-900">{`\u0E3F${item.comfortTHB.toLocaleString()}`}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-thailand-blue/10 rounded-xl p-4">
                <div className="font-bold text-gray-900 mb-2">Total</div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Budget</div>
                    <div className="font-bold text-thailand-blue">{`\u0E3F${budgetTotal.toLocaleString()}`}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">{lang === 'nl' ? 'Midden' : 'Mid'}</div>
                    <div className="font-bold text-thailand-blue">{`\u0E3F${midTotal.toLocaleString()}`}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">{lang === 'nl' ? 'Comfortabel' : 'Comfortable'}</div>
                    <div className="font-bold text-thailand-blue">{`\u0E3F${comfortTotal.toLocaleString()}`}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">{lang === 'nl' ? 'Categorie' : 'Category'}</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium text-sm">Budget</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium text-sm">{lang === 'nl' ? 'Midden' : 'Mid-Range'}</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium text-sm">{lang === 'nl' ? 'Comfortabel' : 'Comfortable'}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.costOfLiving.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-surface-cream transition-colors">
                      <td className="py-3 px-4 text-gray-900 font-medium">{item.category[lang]}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{item.budgetTHB === 0 ? '-' : `\u0E3F${item.budgetTHB.toLocaleString()}`}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{`\u0E3F${item.midTHB.toLocaleString()}`}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{`\u0E3F${item.comfortTHB.toLocaleString()}`}</td>
                    </tr>
                  ))}
                  <tr className="bg-thailand-blue/5 font-bold">
                    <td className="py-3 px-4 text-gray-900">Total</td>
                    <td className="py-3 px-4 text-right text-thailand-blue">{`\u0E3F${budgetTotal.toLocaleString()}`}</td>
                    <td className="py-3 px-4 text-right text-thailand-blue">{`\u0E3F${midTotal.toLocaleString()}`}</td>
                    <td className="py-3 px-4 text-right text-thailand-blue">{`\u0E3F${comfortTotal.toLocaleString()}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 text-xs text-center mt-4">
              {lang === 'nl'
                ? 'Prijzen zijn schattingen op basis van actuele marktdata (feb 2026). Wisselkoers: 1 USD \u2248 35 THB.'
                : 'Prices are estimates based on current market data (Feb 2026). Exchange rate: 1 USD \u2248 35 THB.'}
            </p>
          </div>
        </section>

        {/* Visa Options */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">
              {lang === 'nl' ? 'Verblijf' : 'Stay Legal'}
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Visum Opties voor Expats' : 'Visa Options for Expats'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.visaOptions.map((visa, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col">
                  <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{visa.name}</h3>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{lang === 'nl' ? 'Duur' : 'Duration'}:</span>
                      <span className="text-gray-700 font-medium">{visa.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{lang === 'nl' ? 'Kosten' : 'Cost'}:</span>
                      <span className="text-gray-700 font-medium">{visa.cost}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{visa.bestFor[lang]}</p>
                  <Link
                    href={visa.link}
                    className="mt-4 text-thailand-blue text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    {lang === 'nl' ? 'Meer info' : 'Learn more'}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/visa/"
                className="text-thailand-blue font-medium hover:underline inline-flex items-center gap-1"
              >
                {lang === 'nl' ? 'Bekijk alle visumtypes op onze visumpagina' : 'View all visa types on our visa page'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">
              {lang === 'nl' ? 'Tips' : 'Tips'}
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Praktische Tips voor het Dagelijks Leven' : 'Practical Tips for Daily Life'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.practicalTips.map((tip, i) => (
                <div key={i} className="bg-surface-cream rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{tipIcons[i] || '\u{1F4A1}'}</span>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{tip.title[lang]}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{tip.description[lang]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance CTA */}
        <section className="py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InsuranceCTA context="nomad" />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <details key={i} className="mb-4 bg-white rounded-xl shadow-sm group">
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl list-none flex items-center justify-between transition-colors">
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

        {/* CTA Section */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">
                {lang === 'nl' ? 'Meer Lezen' : 'Read More'}
              </p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                {lang === 'nl' ? 'Klaar om Bangkok te Verkennen?' : 'Ready to Explore Bangkok?'}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                {lang === 'nl'
                  ? 'Lees onze uitgebreide wijkgids met 15 gebieden, of boek je eerste verblijf in Bangkok'
                  : 'Read our in-depth neighbourhood guide covering 15 areas, or book your first stay in Bangkok'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <Link
                  href="/blog/where-to-live-bangkok-neighborhood-guide-expats/"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>{lang === 'nl' ? 'Volledige Wijkgids (15 Wijken)' : 'Full Neighbourhood Guide (15 Areas)'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/visa/"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>{lang === 'nl' ? 'Thailand Visum Gids' : 'Thailand Visa Guide'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/practical-info/"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>{lang === 'nl' ? 'Praktische Info Thailand' : 'Practical Info Thailand'}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>Booking.com Bangkok</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <TripcomWidget
                city="Bangkok"
                type="searchbox"
                customTitle={
                  lang === 'nl'
                    ? 'Zoek Hotels in Bangkok'
                    : 'Search Hotels in Bangkok'
                }
              />
            </div>
            <p className="text-white/70 text-xs text-center mt-6">
              {lang === 'nl'
                ? 'Sommige links zijn affiliate links. Wij verdienen een commissie zonder extra kosten voor jou.'
                : 'Some links are affiliate links. We may earn a commission at no extra cost to you.'}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/expat/expat-guide.json');
  return {
    props: { data },
    revalidate: 604800
  };
};
