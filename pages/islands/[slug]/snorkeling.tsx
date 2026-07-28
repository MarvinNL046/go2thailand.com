import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { SnorkelGuideTemplate } from '../../../components/snorkeling/SnorkelGuideTemplate';
import { getEnSnorkelGuide } from '../../../data/snorkeling/en';
import { getNlSnorkelGuide } from '../../../data/snorkeling/nl';
import type { SnorkelGuideData } from '../../../data/snorkeling/types';

interface IslandSnorkelingPageProps {
  guide: SnorkelGuideData;
}

export default function IslandSnorkelingPage({ guide }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SnorkelGuideTemplate data={guide} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: 'koh-tao' }, locale: 'en' },
    { params: { slug: 'koh-tao' }, locale: 'nl' },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps<IslandSnorkelingPageProps> = async ({ params, locale }) => {
  const slug = String(params?.slug || '');
  const guide = locale === 'nl' ? getNlSnorkelGuide(slug) : getEnSnorkelGuide(slug);
  if (!guide) return { notFound: true };
  return { props: { guide } };
};
