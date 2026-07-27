import type { GetStaticProps } from 'next';

export default function RetiredBudgetTravelPage() {
  return null;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  redirect: {
    destination: locale === 'nl' ? '/nl/thailand-index/budget/' : '/thailand-index/budget/',
    permanent: true,
  },
});
