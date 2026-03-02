import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getTravelGuideStaticPaths, getTravelGuideBySlug } from '../../lib/travel-guides';

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
                    <Link href={item.link} className="text-thailand-blue hover:underline">{item.name[lang]}</Link>
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

        {/* Content Sections */}
        <div className="container-custom py-12 space-y-12">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <SectionRenderer section={section} lang={lang} />
            </section>
          ))}
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
                  <Link key={i} href={link.href} className="group">
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const guide = getTravelGuideBySlug(slug);

  if (!guide) {
    return { notFound: true };
  }

  return {
    props: { guide },
    revalidate: 86400
  };
};
