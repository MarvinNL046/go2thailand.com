import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { AttractionsGuideTemplate } from '../../../components/city/AttractionsGuideTemplate';
import { getEnAttractionsGuide } from '../../../data/attractions/en';
import { getNlAttractionsGuide } from '../../../data/attractions/nl';
import type { AttractionGuideData } from '../../../data/attractions/types';

interface IslandAttractionsPageProps {
  guide: AttractionGuideData;
}

export default function IslandAttractionsPage({ guide }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AttractionsGuideTemplate data={guide} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: 'koh-tao' }, locale: 'en' },
    { params: { slug: 'koh-tao' }, locale: 'nl' },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps<IslandAttractionsPageProps> = async ({ params, locale }) => {
  const slug = String(params?.slug || '');
  const guide = locale === 'nl' ? getNlAttractionsGuide(slug) : getEnAttractionsGuide(slug);
  if (!guide || !guide.parentGuideHref?.startsWith('/islands/')) return { notFound: true };
  return { props: { guide } };
};
