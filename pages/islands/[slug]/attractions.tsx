import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { AttractionsGuideTemplate } from '../../../components/city/AttractionsGuideTemplate';
import { getNlAttractionsGuide } from '../../../data/attractions/nl';
import type { AttractionGuideData } from '../../../data/attractions/types';

interface IslandAttractionsPageProps {
  guide: AttractionGuideData;
}

export default function IslandAttractionsPage({ guide }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AttractionsGuideTemplate data={guide} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { slug: 'koh-tao' }, locale: 'nl' }],
  fallback: false,
});

export const getStaticProps: GetStaticProps<IslandAttractionsPageProps> = async ({ params, locale }) => {
  if (locale !== 'nl') return { notFound: true };
  const slug = String(params?.slug || '');
  const guide = getNlAttractionsGuide(slug);
  if (!guide || !guide.parentGuideHref?.startsWith('/islands/')) return { notFound: true };
  return { props: { guide } };
};
