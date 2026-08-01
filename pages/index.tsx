import SEOHead from '../components/SEOHead';
import RedesignHome from '../components/home/RedesignHome';
import { useRouter } from 'next/router';

export default function Home() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  return (
    <>
      <SEOHead
        title={isNl ? 'Thailand reizen, uitjes & hotels | Go2 Thailand' : 'Thailand Travel: Places, Things to Do & Trip Ideas'}
        description={isNl
          ? 'Ontdek bijzondere bestemmingen, onvergetelijke uitjes en de mooiste hotels voor jouw reis door Thailand.'
          : 'Explore Thailand travel by style: compare destinations, build an itinerary, find things to do and check current hotel availability.'}
      >
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Go2 Thailand',
              url: 'https://go2-thailand.com',
              description: isNl
                ? 'Reisinspiratie, activiteiten en hotels voor Thailand.'
                : 'Travel inspiration, activities and hotels for Thailand.',
            }),
          }}
        />
      </SEOHead>
      <RedesignHome />
    </>
  );
}
