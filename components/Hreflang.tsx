import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://go2-thailand.com';
const CANONICAL_PATH_MAP: Record<string, string> = {
  '/travel-insurance': '/travel-insurance-thailand',
  '/travel-insurance/': '/travel-insurance-thailand',
  '/travel-insurance-thailand/': '/travel-insurance-thailand',
};

// Map Next.js locale codes to hreflang language codes
const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  nl: 'nl',
};

export default function Hreflang() {
  const { asPath, locales, locale: currentLocale } = useRouter();

  if (!locales) return null;

  // Remove query string and hash from path
  const cleanPath = asPath.split('?')[0].split('#')[0];
  const seoPath = CANONICAL_PATH_MAP[cleanPath] || cleanPath;

  // All pages use EN + NL only
  const isTransportRoute = seoPath.startsWith('/transport/') && seoPath !== '/transport/';

  let activeLocales = locales;
  if (isTransportRoute) {
    activeLocales = locales?.filter(l => l === 'en');
  }

  const canonicalUrl =
    currentLocale === 'en'
      ? `${SITE_URL}${seoPath}`
      : `${SITE_URL}/${currentLocale}${seoPath}`;

  return (
    <Head>
      {activeLocales.map((locale) => {
        const hreflang = LOCALE_TO_HREFLANG[locale] || locale;
        const href =
          locale === 'en'
            ? `${SITE_URL}${seoPath}`
            : `${SITE_URL}/${locale}${seoPath}`;

        return (
          <link
            key={locale}
            rel="alternate"
            hrefLang={hreflang}
            href={href}
          />
        );
      })}
      {/* x-default points to the English (default) version */}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${seoPath}`} />
      {/* Canonical always points to current locale version */}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      {/* Open Graph defaults - page components provide their own image tags via SEOHead */}
      <meta property="og:site_name" content="Go2Thailand" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : currentLocale} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@go2thailand" />
    </Head>
  );
}
