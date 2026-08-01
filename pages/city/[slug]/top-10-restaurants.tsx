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

interface RestaurantsData {
  title: string;
  meta_description: string;
  intro: string;
  items: TopTenGuideItem[];
  content_sources?: Source[];
  last_perplexity_update?: string;
  last_scraped?: string;
  generated_at: string;
}

interface Props {
  city: City;
  restaurantsData: RestaurantsData | null;
  editorial?: string;
}

function evergreen(text: string) {
  return text
    .replace(/\s*\(?2026\)?/gi, '')
    .replace(/\s*[—–-]\s*(local picks\s*&\s*)?prices/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default function Top10RestaurantsPage({ city, restaurantsData, editorial }: Props) {
  if (!restaurantsData) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-24 text-center text-charcoal">
        <SEOHead title={`Where to eat in ${city.name.en}`} description={`The ${city.name.en} restaurant guide is being reviewed.`}>
          <meta name="robots" content="noindex, follow" />
        </SEOHead>
        <p className="eyebrow">Guide under review</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-none text-jade">Where to eat in {city.name.en}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-charcoal/65">We are checking recent venue information and source quality before publishing this shortlist.</p>
        <Link href={`/city/${city.slug}/`} className="btn-primary mt-8">Back to {city.name.en}</Link>
      </main>
    );
  }

  const title = evergreen(restaurantsData.title);
  const description = evergreen(restaurantsData.meta_description)
    .replace(/real prices,?\s*/gi, 'neighbourhood and cuisine context, ')
    .replace(/current prices,?\s*/gi, 'planning context, ');
  const reviewedDate = restaurantsData.last_perplexity_update || restaurantsData.last_scraped || restaurantsData.generated_at;
  const reviewedLabel = reviewedDate
    ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(reviewedDate))
    : null;
  const canonical = `https://go2-thailand.com/city/${city.slug}/top-10-restaurants/`;

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
          datePublished: restaurantsData.generated_at,
          dateModified: reviewedDate,
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: title,
          numberOfItems: restaurantsData.items.length,
          itemListElement: restaurantsData.items.map((item) => ({
            '@type': 'ListItem', position: item.rank, name: item.name, url: `${canonical}#restaurant-${item.rank}`,
          })),
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://go2-thailand.com/' },
            { '@type': 'ListItem', position: 2, name: city.name.en, item: `https://go2-thailand.com/city/${city.slug}/` },
            { '@type': 'ListItem', position: 3, name: 'Restaurants', item: canonical },
          ],
        }) }} />
      </SEOHead>
      <TopTenEditorialGuide city={city} mode="restaurants" title={title} intro={evergreen(restaurantsData.intro)} items={restaurantsData.items} editorial={editorial} sources={restaurantsData.content_sources} reviewedLabel={reviewedLabel} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: 'blocking' });

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const city = getCityBySlug(slug, locale);
  if (!city) return { notFound: true };
  if (locale === 'nl') return { redirect: { destination: `/nl/city/${slug}/food/`, permanent: true } };

  let restaurantsData: RestaurantsData | null = null;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'top10', `${slug}-restaurants.json`);
    if (fs.existsSync(dataPath)) restaurantsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {}

  let editorial = '';
  try {
    const editorialsPath = path.join(process.cwd(), 'data', 'top10-editorials.json');
    if (fs.existsSync(editorialsPath)) editorial = JSON.parse(fs.readFileSync(editorialsPath, 'utf8'))[`${slug}-restaurants`]?.en || '';
  } catch {}

  return { props: { city, restaurantsData, editorial }, revalidate: 604800 };
};
