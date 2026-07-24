import SEOHead from '../components/SEOHead';
import RedesignHome from '../components/home/RedesignHome';
import { useRouter } from 'next/router';

export default function Home() {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  return (
    <>
      <SEOHead
        title={isNl ? 'Thailand reizen, uitjes & hotels | Go2 Thailand' : 'Thailand travel, experiences & hotels | Go2 Thailand'}
        description={isNl
          ? 'Ontdek bijzondere bestemmingen, onvergetelijke uitjes en de mooiste hotels voor jouw reis door Thailand.'
          : 'Discover remarkable destinations, unforgettable experiences and beautiful hotels for your Thailand journey.'}
      >
        <meta name="keywords" content={isNl ? 'Thailand reizen, Thailand uitjes, hotels Thailand, Thailand bestemmingen' : 'Thailand travel, Thailand tours, Thailand hotels, Thailand destinations'} />
        <meta property="og:type" content="website" />
        <link rel="preload" as="image" href="/images/redesign/homepage-hero.webp" type="image/webp" />
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
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://go2-thailand.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </SEOHead>
      <RedesignHome />
    </>
  );
}
