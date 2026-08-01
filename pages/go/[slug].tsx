import type { GetServerSideProps } from 'next';
import {
  amazonAffiliateRedirectHeaders,
  resolveAmazonAffiliateDestination,
} from '../../lib/amazon-affiliates';

export default function AmazonAffiliateRedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  Object.entries(amazonAffiliateRedirectHeaders).forEach(([name, value]) => {
    res.setHeader(name, value);
  });

  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const destination = resolveAmazonAffiliateDestination(slug);

  if (!destination) {
    return { notFound: true };
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};
