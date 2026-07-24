import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { DiveGuideTemplate } from '../../../components/diving/DiveGuideTemplate';
import { getNlDiveGuide } from '../../../data/diving/nl';
import type { DiveGuideData } from '../../../data/diving/types';

interface IslandDivingPageProps {
  guide: DiveGuideData;
}

export default function IslandDivingPage({ guide }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DiveGuideTemplate data={guide} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { slug: 'koh-tao' }, locale: 'nl' }],
  fallback: false,
});

export const getStaticProps: GetStaticProps<IslandDivingPageProps> = async ({ params, locale }) => {
  if (locale !== 'nl') return { notFound: true };
  const guide = getNlDiveGuide(String(params?.slug || ''));
  if (!guide) return { notFound: true };
  return { props: { guide } };
};
