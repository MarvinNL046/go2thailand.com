import type { GetStaticProps } from 'next';

export default function RetiredSafetyIndexPage() {
  return null;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  redirect: {
    destination: locale === 'nl' ? '/nl/is-thailand-safe/' : '/is-thailand-safe/',
    permanent: true,
  },
});
