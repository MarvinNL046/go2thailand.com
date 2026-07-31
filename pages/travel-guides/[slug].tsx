import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getTravelGuideStaticPaths, getTravelGuideBySlug } from '../../lib/travel-guides';
import InsuranceCTA from '../../components/InsuranceCTA';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import SevenElevenThailandGuide from '../../components/practical/SevenElevenThailandGuide';
import ThailandEsimSimGuide from '../../components/connectivity/ThailandEsimSimGuide';
import VegetarianThailandGuide from '../../components/food/VegetarianThailandGuide';
import ThailandFoodGuideEn from '../../components/food/ThailandFoodGuideEn';
import ThailandWildlifeSafetyGuideEn from '../../components/practical/ThailandWildlifeSafetyGuideEn';
import { VpnThailandGuideEn } from '../../components/connectivity/VpnThailandGuideEn';
import { VpnThailandGuideNl } from '../../components/connectivity/VpnThailandGuideNl';
import { SoloFemaleThailandGuideEn } from '../../components/safety/SoloFemaleThailandGuideEn';
import { normalizeNlInternalHref } from '../../lib/nl-route-owners';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';
import ExpatLongStayThailandGuideNl from '../../components/editorial/ExpatLongStayThailandGuideNl';
import HealthHospitalsThailandGuideNl from '../../components/editorial/HealthHospitalsThailandGuideNl';
import ThailandWithKidsGuideNl from '../../components/editorial/ThailandWithKidsGuideNl';
import SoloFemaleThailandGuideNl from '../../components/editorial/SoloFemaleThailandGuideNl';
import ThailandAnimalRiskGuideNl from '../../components/editorial/ThailandAnimalRiskGuideNl';
import ThailandNationalParksGuideNl from '../../components/editorial/ThailandNationalParksGuideNl';
import ThailandHikingTrekkingGuideNl from '../../components/editorial/ThailandHikingTrekkingGuideNl';
import ThailandDivingSnorkelingGuideNl from '../../components/editorial/ThailandDivingSnorkelingGuideNl';
import ThailandFestivalsEventsGuideNl from '../../components/editorial/ThailandFestivalsEventsGuideNl';
import ThailandShoppingMarketsGuideNl from '../../components/editorial/ThailandShoppingMarketsGuideNl';
import ThaiPhrasesGuideNl from '../../components/editorial/ThaiPhrasesGuideNl';
import ThailandHiddenGemsGuideNl from '../../components/editorial/ThailandHiddenGemsGuideNl';

// --- Type definitions ---

type Lang = 'en' | 'nl';
type Bilingual = { en: string; nl: string };

interface TextSection {
  type: 'text';
  title: Bilingual;
  content: Bilingual;
}

interface CardItem {
  name: Bilingual;
  description: Bilingual;
  icon?: string;
  link?: string;
}

interface CardsSection {
  type: 'cards';
  title: Bilingual;
  items: CardItem[];
}

interface TableSection {
  type: 'table';
  title: Bilingual;
  headers: Bilingual[];
  rows: Bilingual[][];
}

interface ListSection {
  type: 'list';
  title: Bilingual;
  style: 'ordered' | 'unordered' | 'checklist';
  items: Bilingual[];
}

interface WarningSection {
  type: 'warning';
  level: 'danger' | 'caution' | 'info';
  title: Bilingual;
  content: Bilingual;
}

interface TipItem {
  title: Bilingual;
  detail: Bilingual;
}

interface TipsSection {
  type: 'tips';
  title: Bilingual;
  items: TipItem[];
}

interface CalendarEvent {
  month: Bilingual;
  name: Bilingual;
  description: Bilingual;
  dates?: Bilingual;
  location?: Bilingual;
}

interface CalendarSection {
  type: 'calendar';
  title: Bilingual;
  events: CalendarEvent[];
}

type Section = TextSection | CardsSection | TableSection | ListSection | WarningSection | TipsSection | CalendarSection;

interface FAQ {
  question: Bilingual;
  answer: Bilingual;
}

interface RelatedLink {
  href: string;
  label: Bilingual;
}

interface TravelGuideData {
  slug: string;
  title: Bilingual;
  icon: string;
  lastUpdated: string;
  seo: {
    metaTitle: Bilingual;
    metaDescription: Bilingual;
    keywords: string;
  };
  hero: {
    subtitle: Bilingual;
    intro: Bilingual;
  };
  sections: Section[];
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
}

// --- Section Renderers ---

function TextRenderer({ section, lang }: { section: TextSection; lang: Lang }) {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-4">{section.title[lang]}</h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content[lang]}</div>
    </div>
  );
}

function CardsRenderer({ section, lang }: { section: CardsSection; lang: Lang }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-6">{section.title[lang]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6">
            <div className="flex items-start gap-3">
              {item.icon && <span className="text-2xl flex-shrink-0">{item.icon}</span>}
              <div>
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                  {item.link ? (
                    <Link href={lang === 'nl' ? normalizeNlInternalHref(item.link) : normalizeEnInternalHref(item.link)} className="text-thailand-blue hover:underline">{item.name[lang]}</Link>
                  ) : (
                    item.name[lang]
                  )}
                </h3>
                <p className="text-gray-600 text-sm">{item.description[lang]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableRenderer({ section, lang }: { section: TableSection; lang: Lang }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-6">{section.title[lang]}</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
          <thead className="bg-thailand-blue text-white">
            <tr>
              {section.headers.map((header, i) => (
                <th key={i} className={`px-4 py-3 ${i === 0 ? 'text-left' : 'text-center'}`}>
                  {header[lang]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {section.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 1 ? 'bg-gray-50' : ''}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'text-left font-medium' : 'text-center'} text-sm`}>
                    {cell[lang]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListRenderer({ section, lang }: { section: ListSection; lang: Lang }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-6">{section.title[lang]}</h2>
      <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
        {section.style === 'ordered' ? (
          <ol className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-thailand-blue text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-700">{item[lang]}</span>
              </li>
            ))}
          </ol>
        ) : section.style === 'checklist' ? (
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">{'\u2713'}</span>
                <span className="text-gray-700">{item[lang]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-thailand-blue mt-1.5 flex-shrink-0">{'\u2022'}</span>
                <span className="text-gray-700">{item[lang]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function WarningRenderer({ section, lang }: { section: WarningSection; lang: Lang }) {
  const styles = {
    danger: { bg: 'bg-red-50', border: 'border-red-500', title: 'text-red-800', text: 'text-red-700', icon: '\u26a0\ufe0f' },
    caution: { bg: 'bg-yellow-50', border: 'border-yellow-500', title: 'text-yellow-800', text: 'text-yellow-700', icon: '\u26a0\ufe0f' },
    info: { bg: 'bg-blue-50', border: 'border-blue-500', title: 'text-blue-800', text: 'text-blue-700', icon: '\u2139\ufe0f' },
  };
  const s = styles[section.level];

  return (
    <div className={`${s.bg} border-l-4 ${s.border} rounded-r-2xl p-6`}>
      <p className={`font-semibold ${s.title} mb-1 flex items-center gap-2`}>
        <span>{s.icon}</span> {section.title[lang]}
      </p>
      <p className={`${s.text} text-sm`}>{section.content[lang]}</p>
    </div>
  );
}

function TipsRenderer({ section, lang }: { section: TipsSection; lang: Lang }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-6">{section.title[lang]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.items.map((tip, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{'\ud83d\udca1'}</span>
              <div>
                <h3 className="font-semibold font-heading text-gray-900 mb-1">{tip.title[lang]}</h3>
                <p className="text-gray-600 text-sm">{tip.detail[lang]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarRenderer({ section, lang }: { section: CalendarSection; lang: Lang }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-6">{section.title[lang]}</h2>
      <div className="space-y-4">
        {section.events.map((event, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-4">
            <div className="sm:w-32 flex-shrink-0">
              <span className="inline-block bg-thailand-blue/10 text-thailand-blue font-bold text-sm px-3 py-1 rounded-full">
                {event.month[lang]}
              </span>
              {event.dates && (
                <p className="text-xs text-gray-500 mt-1">{event.dates[lang]}</p>
              )}
            </div>
            <div>
              <h3 className="font-bold font-heading text-gray-900 mb-1">{event.name[lang]}</h3>
              <p className="text-gray-600 text-sm">{event.description[lang]}</p>
              {event.location && (
                <p className="text-xs text-gray-500 mt-1">{'\ud83d\udccd'} {event.location[lang]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({ section, lang }: { section: Section; lang: Lang }) {
  switch (section.type) {
    case 'text': return <TextRenderer section={section} lang={lang} />;
    case 'cards': return <CardsRenderer section={section} lang={lang} />;
    case 'table': return <TableRenderer section={section} lang={lang} />;
    case 'list': return <ListRenderer section={section} lang={lang} />;
    case 'warning': return <WarningRenderer section={section} lang={lang} />;
    case 'tips': return <TipsRenderer section={section} lang={lang} />;
    case 'calendar': return <CalendarRenderer section={section} lang={lang} />;
    default: return null;
  }
}

// --- Page Component ---

interface TravelGuidePageProps {
  guide: TravelGuideData;
}

export default function TravelGuidePage({ guide }: TravelGuidePageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as Lang;

  if (guide.slug === 'sim-card-thailand') {
    return <ThailandEsimSimGuide language={lang} />;
  }

  if (guide.slug === '7-eleven-thailand') {
    return <SevenElevenThailandGuide language={lang} />;
  }

  if (lang === 'en' && guide.slug === 'dangerous-animals-thailand') {
    return <ThailandWildlifeSafetyGuideEn />;
  }

  if (lang === 'en' && guide.slug === 'vpn-thailand') {
    return <VpnThailandGuideEn />;
  }

  if (lang === 'nl' && guide.slug === 'vpn-thailand') {
    return <VpnThailandGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'thai-phrases-language') {
    return <ThaiPhrasesGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'hidden-gems-off-beaten-path-thailand') {
    return <ThailandHiddenGemsGuideNl />;
  }

  if (lang === 'en' && guide.slug === 'solo-female-travel-thailand') {
    return <SoloFemaleThailandGuideEn />;
  }

  if (lang === 'en' && guide.slug === 'thai-cuisine-food-guide') {
    return <ThailandFoodGuideEn />;
  }

  if (lang === 'nl' && guide.slug === 'vegetarian-vegan-thailand') {
    return <VegetarianThailandGuide />;
  }

  if (lang === 'nl' && guide.slug === 'expat-long-stay-thailand') {
    return <ExpatLongStayThailandGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'health-hospitals-thailand') {
    return <HealthHospitalsThailandGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'thailand-with-kids') {
    return <ThailandWithKidsGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'solo-female-travel-thailand') {
    return <SoloFemaleThailandGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'dangerous-animals-thailand') {
    return <ThailandAnimalRiskGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'national-parks-thailand') {
    return <ThailandNationalParksGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'hiking-trekking-thailand') {
    return <ThailandHikingTrekkingGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'diving-snorkeling-thailand') {
    return <ThailandDivingSnorkelingGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'festivals-events-thailand') {
    return <ThailandFestivalsEventsGuideNl />;
  }

  if (lang === 'nl' && guide.slug === 'shopping-markets-thailand') {
    return <ThailandShoppingMarketsGuideNl />;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: lang === 'nl' ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides/' },
    { name: guide.title[lang], href: `/travel-guides/${guide.slug}/` }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer[lang]
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://go2-thailand.com${crumb.href}`
    }))
  };

  return (
    <>
      <SEOHead
        title={guide.seo.metaTitle[lang]}
        description={guide.seo.metaDescription[lang]}
      >
        <meta name="keywords" content={guide.seo.keywords} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-script text-thailand-gold mb-2">{guide.hero.subtitle[lang]}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {guide.icon} {guide.title[lang]}
              </h1>
              <p className="text-xl lg:text-2xl mb-4 opacity-90">
                {guide.hero.intro[lang]}
              </p>
              <p className="text-sm opacity-60">
                {lang === 'nl' ? 'Laatst bijgewerkt' : 'Last updated'}: {guide.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom pt-10">
          <div className="max-w-5xl mx-auto">
            <TravelpayoutsRecoveryPanel
              pageType="guide"
              placement="guide-panel"
              slug={guide.slug}
              className=""
              columns={3}
            />
          </div>
        </section>

        {/* Content Sections */}
        <div className="container-custom py-12 space-y-12">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <SectionRenderer section={section} lang={lang} />
            </section>
          ))}

          {/* Insurance CTA for relevant guides */}
          {guide.slug === 'scooter-rental-thailand' && <InsuranceCTA context="scooter" />}
          {guide.slug === 'diving-snorkeling-thailand' && <InsuranceCTA context="diving" />}
          {guide.slug === 'health-hospitals-thailand' && <InsuranceCTA context="health" />}
          {guide.slug === 'hidden-gems-off-beaten-path-thailand' && <InsuranceCTA context="general" />}
          {guide.slug === 'first-time-thailand' && <InsuranceCTA context="general" />}
          {guide.slug === 'vaccinations-travel-health-thailand' && <InsuranceCTA context="health" />}
        </div>

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                <p className="section-label text-center">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Common Questions'}
                </p>
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, i) => (
                    <details key={i} className="bg-surface-cream rounded-2xl shadow-md group" open={i === 0}>
                      <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-thailand-blue transition-colors list-none flex items-center justify-between">
                        {faq.question[lang]}
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">{'\u25bc'}</span>
                      </summary>
                      <div className="px-6 pb-4 text-gray-600">{faq.answer[lang]}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Links */}
        {guide.relatedLinks.length > 0 && (
          <section className="bg-surface-dark py-12">
            <div className="container-custom">
              <p className="font-script text-thailand-gold text-center mb-2">
                {lang === 'nl' ? 'Ontdek Meer' : 'Explore More'}
              </p>
              <h2 className="text-3xl font-bold font-heading text-white text-center mb-3">
                {lang === 'nl' ? 'Gerelateerde Gidsen' : 'Related Guides'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                {guide.relatedLinks.map((link, i) => (
                  <Link key={i} href={lang === 'nl' ? normalizeNlInternalHref(link.href) : normalizeEnInternalHref(link.href)} className="group">
                    <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                      <h3 className="font-bold font-heading text-lg group-hover:text-thailand-blue transition-colors">
                        {link.label[lang]}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="text-white/50 text-xs text-center mt-6">
                Some links are affiliate links. We may earn a commission at no extra cost to you.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getTravelGuideStaticPaths();
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  if (locale === 'nl' && slug === 'nightlife-rooftop-bars-thailand') {
    return {
      redirect: {
        destination: '/nl/nightlife/',
        permanent: true,
      },
    };
  }

  if (locale === 'nl' && slug === 'first-time-thailand') {
    return {
      redirect: {
        destination: '/nl/thailand-for-first-timers/',
        permanent: true,
      },
    };
  }

  const guide = getTravelGuideBySlug(slug, locale);

  if (!guide) {
    return { notFound: true };
  }

  if (locale === 'en' && slug === 'vpn-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, en: 'VPN in Thailand: Do You Need One?' },
          lastUpdated: '2026-07-27',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, en: 'VPN in Thailand: Do You Need One & Is It Allowed?' },
            metaDescription: { ...guide.seo.metaDescription, en: 'Decide whether you need a VPN in Thailand for public Wi-Fi, work or geo-access. Understand legal limits, setup, provider checks and what a VPN cannot protect.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, en: 'A VPN protects a connection—not your whole identity.' },
            intro: { ...guide.hero.intro, en: 'Use a VPN deliberately on shared Wi-Fi, for work policy or a chosen network location. Keep lawful behaviour, device updates and account security as separate layers.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'vpn-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'VPN in Thailand: heb je er een nodig?' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'VPN in Thailand: nodig, legaal en veilig gebruiken' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Bepaal of je in Thailand een VPN nodig hebt voor openbare wifi, werk of een andere netwerklocatie. Met juridische grenzen, selectiecriteria en installatie.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Een VPN beschermt een verbinding — niet je hele identiteit.' },
            intro: { ...guide.hero.intro, nl: 'Gebruik de tunnel bewust op gedeelde wifi, voor een werkregel of een gekozen netwerklocatie. Houd apparaat- en accountbeveiliging als aparte lagen.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'thai-phrases-language') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Thaise woorden en zinnen voor je reis' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Thaise woorden en zinnen: praktische taalgids' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Leer praktische Thaise woorden en zinnen met Thai-schrift, uitspraakgrenzen, beleefdheid, situatiescripts en noodcommunicatie voor Thailand.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Niet perfect spreken. Wel beter begrepen worden.' },
            intro: { ...guide.hero.intro, nl: 'Gebruik Thai-schrift om te laten zien wat je bedoelt, romanisering als geheugensteun en audio om de toon te horen.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'expat-long-stay-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Lang verblijf in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Lang verblijf Thailand: wonen als expat voorbereiden' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Bereid een lang verblijf in Thailand voor via verblijfsstatus, proefwonen, zorg, budget, mobiliteit en officiële bronnen.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Van proefbasis naar een besluit dat ook buiten de vakantiebubbel werkt.' },
            intro: { ...guide.hero.intro, nl: 'Orden verblijfsstatus, woning, zorg, geld en dagelijkse mobiliteit vóór je langdurige verplichtingen aangaat.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'health-hospitals-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Zorg en ziekenhuizen in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Ziekenhuis in Thailand: zorg, spoednummer en verzekering' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Wat doe je als toerist bij ziekte of ziekenhuisopname in Thailand? Gebruik 1669 bij spoed en volg de praktische zorgroute.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Van 1669 bij medische spoed tot de documenten voor je verzekeraar.' },
            intro: { ...guide.hero.intro, nl: 'Vind de juiste hulpketen zonder vaste prijsclaim, ziekenhuisranglijst of zelfdiagnose.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'thailand-with-kids') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Thailand met kinderen' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Thailand met kinderen: route, reistijd en gezinsplanning' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Plan Thailand met kinderen op leeftijd, tempo, basissen, transfers, kamerfit en activiteiten.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Bouw de reis rond energie, slaap en transfers—niet rond zoveel mogelijk stops.' },
            intro: { ...guide.hero.intro, nl: 'Vergelijk gezinsfit, routebelasting, kamerindeling, weer en zorgtoegang voordat je boekt.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'solo-female-travel-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Solo reizen in Thailand als vrouw' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Solo reizen Thailand als vrouw: veiligheid en route' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Plan solo reizen in Thailand met een concrete aankomst-, vervoer-, avond-, check-in- en noodroute.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Maak elke overgang controleerbaar: aankomst, rit, avond en terugweg.' },
            intro: { ...guide.hero.intro, nl: 'Verklein risico’s met actuele routechecks, vaste ankerpunten en een concrete hulpketen.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'dangerous-animals-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Dierenrisico’s in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Gevaarlijke dieren Thailand: voorkomen en handelen' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Voorkom contact met apen, honden, slangen en zeeleven en volg na een beet of krab de officiële medische hulproute.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Het beste dierencontact is vaak géén contact.' },
            intro: { ...guide.hero.intro, nl: 'Herken blootstellingssituaties en volg na een incident een professionele medische route.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'national-parks-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Nationale parken in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Nationale parken Thailand: welk park past bij jou?' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Kies een nationaal park op landschap en logistiek en controleer actuele status, route, weer, ranger, toegang en alternatief.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Het beste park past bij je route en de actuele dagcondities.' },
            intro: { ...guide.hero.intro, nl: 'Vergelijk parkprofielen en controleer status, zone, weer, toegang en ranger voordat je vertrekt.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'hiking-trekking-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Hiken en trekking in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Hiken en trekking Thailand: routes, gids en paklijst' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Plan hiken in Thailand met een passend trailprofiel, actuele status, terrein- en weercheck, omkeertijd, gidskeuze en trekkingpaklijst.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Een goede trekking begint met het omkeerpunt.' },
            intro: { ...guide.hero.intro, nl: 'Kies een route die bij je conditie, terrein en dag past en controleer status, weer, begeleiding en uitrusting.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'diving-snorkeling-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Duiken en snorkelen in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Duiken en snorkelen Thailand: plekken en veilige checks' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Kies snorkelen of duiken op ervaring, regio en actuele zeecondities en controleer parkstatus, brevet, operator, boot en voorwaarden.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'De beste waterdag begint met een geloofwaardige no-go.' },
            intro: { ...guide.hero.intro, nl: 'Kies eerst de activiteit en controleer daarna gezondheid, ervaring, parkstatus, zeeconditie, operator en alternatief.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'festivals-events-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Festivals en evenementen in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Festivals Thailand: Songkran, Loy Krathong en meer' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Plan festivals in Thailand met betekenis en actuele editiecontrole. Verifieer datum, locatie, toegang, vervoer, gedrag en programma.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Een festivalnaam is nog geen bevestigd programma.' },
            intro: { ...guide.hero.intro, nl: 'Kies betekenis en plaats en controleer daarna kalenderjaar, datum, locatie, toegang, vervoer en lokale instructies.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  if (locale === 'nl' && slug === 'shopping-markets-thailand') {
    return {
      props: {
        guide: {
          ...guide,
          title: { ...guide.title, nl: 'Markten en shoppen in Thailand' },
          lastUpdated: '2026-07-31',
          seo: {
            ...guide.seo,
            metaTitle: { ...guide.seo.metaTitle, nl: 'Markten Thailand: slim shoppen, afdingen en douane' },
            metaDescription: { ...guide.seo.metaDescription, nl: 'Vind een markt in Thailand die bij je past. Controleer opening, kwaliteit, afdingen, bonnen, VAT-refund en Nederlandse invoerregels.' },
          },
          hero: {
            subtitle: { ...guide.hero.subtitle, nl: 'Een marktnaam is nog geen koopadvies.' },
            intro: { ...guide.hero.intro, nl: 'Kies een marktprofiel en controleer opening, productkwaliteit, betaling, bonnen en invoerregels voordat je koopt.' },
          },
          sections: [],
          faqs: [],
          relatedLinks: [],
        },
      },
      revalidate: 604800,
    };
  }

  return {
    props: { guide },
    revalidate: 604800
  };
};
