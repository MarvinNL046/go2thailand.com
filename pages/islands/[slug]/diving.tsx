import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { DiveGuideTemplate } from '../../../components/diving/DiveGuideTemplate';
import { getEnDiveGuide } from '../../../data/diving/en';
import { getNlDiveGuide } from '../../../data/diving/nl';
import type { DiveGuideData } from '../../../data/diving/types';

interface IslandDivingPageProps {
  guide: DiveGuideData;
}

export default function IslandDivingPage({ guide }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DiveGuideTemplate data={guide} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { slug: 'koh-tao' }, locale: 'en' },
    { params: { slug: 'koh-tao' }, locale: 'nl' },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps<IslandDivingPageProps> = async ({ params, locale }) => {
  const slug = String(params?.slug || '');
  const guide = locale === 'nl' ? getNlDiveGuide(slug) : getEnDiveGuide(slug);
  if (!guide) return { notFound: true };
  return { props: { guide } };
};
