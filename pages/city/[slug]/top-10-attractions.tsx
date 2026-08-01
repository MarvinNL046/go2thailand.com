import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import TopTenEditorialGuide, { TopTenGuideItem } from '../../../components/city/TopTenEditorialGuide';
import { getCityBySlug } from '../../../lib/cities';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
}

interface Source {
  title: string;
  creator: string;
  url: string;
  description?: string;
}

interface AttractionsData {
  title: string;
  meta_description: string;
  intro: string;
  items: TopTenGuideItem[];
  content_sources?: Source[];
  last_perplexity_update?: string;
  generated_at: string;
}

interface Props {
  city: City;
  attractionsData: AttractionsData | null;
  editorial?: string;
}

function evergreen(text: string) {
  return text
    .replace(/\s*\(?2026\)?/gi, '')
    .replace(/\s*[—–-]\s*with prices/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default function Top10AttractionsPage({ city, attractionsData, editorial }: Props) {
  if (!attractionsData) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-24 text-center text-charcoal">
        <SEOHead title={`Things to do in ${city.name.en}`} description={`The ${city.name.en} attraction guide is being reviewed.`}>
          <meta name="robots" content="noindex, follow" />
        </SEOHead>
        <p className="eyebrow">Guide under review</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-none text-jade">Things to do in {city.name.en}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-charcoal/65">We are checking access, planning details and source quality before publishing this shortlist.</p>
        <Link href={`/city/${city.slug}/`} className="btn-primary mt-8">Back to {city.name.en}</Link>
      </main>
    );
  }

  const title = evergreen(attractionsData.title);
  const description = evergreen(attractionsData.meta_description)
    .replace(/entrance fees,?\s*/gi, 'planning details, ')
    .replace(/opening hours,?\s*/gi, 'access notes, ');
  const reviewedDate = attractionsData.last_perplexity_update || attractionsData.generated_at;
  const reviewedLabel = reviewedDate
    ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(reviewedDate))
    : null;
  const canonical = `https://go2-thailand.com/city/${city.slug}/top-10-attractions/`;

  return (
    <>
      <SEOHead title={title} description={description} ogImage={city.image}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          image: city.image,
          mainEntityOfPage: canonical,
          author: { '@type': 'Organization', name: 'Go2Thailand' },
          publisher: { '@type': 'Organization', name: 'Go2Thailand' },
          datePublished: attractionsData.generated_at,
          dateModified: reviewedDate,
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: title,
          numberOfItems: attractionsData.items.length,
          itemListElement: attractionsData.items.map((item) => ({
            '@type': 'ListItem',
            position: item.rank,
            url: `${canonical}#attraction-${item.rank}`,
            item: { '@type': 'TouristAttraction', name: item.name, description: item.description || item.story || '', url: `${canonical}#attraction-${item.rank}` },
          })),
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
            { '@type': 'ListItem', position: 2, name: city.name.en, item: `https://go2-thailand.com/city/${city.slug}/` },
            { '@type': 'ListItem', position: 3, name: 'Things to do', item: canonical },
          ],
        }) }} />
      </SEOHead>
      <TopTenEditorialGuide city={city} mode="attractions" title={title} intro={evergreen(attractionsData.intro)} items={attractionsData.items} editorial={editorial} sources={attractionsData.content_sources} reviewedLabel={reviewedLabel} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug, locale);
  if (!city) return { notFound: true };
  if (locale === 'nl') return { redirect: { destination: `/nl/city/${slug}/attractions/`, permanent: true } };

  let attractionsData: AttractionsData | null = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'top10', `${slug}-attractions.json`);
    if (fs.existsSync(dataPath)) attractionsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {}

  let editorial = '';
  try {
    const editorialsPath = path.join(process.cwd(), 'data', 'top10-editorials.json');
    if (fs.existsSync(editorialsPath)) editorial = JSON.parse(fs.readFileSync(editorialsPath, 'utf8'))[`${slug}-attractions`]?.en || '';
  } catch {}

  return { props: { city, attractionsData, editorial }, revalidate: 604800 };
};
