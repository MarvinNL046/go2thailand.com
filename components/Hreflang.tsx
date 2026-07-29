import Head from 'next/head';
import { useRouter } from 'next/router';
import unpairedRoutes from '../seo/inventory/unpaired-routes.json';

const SITE_URL = 'https://go2-thailand.com';
// Map Next.js locale codes to hreflang language codes
const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  nl: 'nl',
};

// Semantically paired owners do not always share the same path. Keep these
// mappings explicit so locale-specific consolidations can still exchange a
// valid hreflang signal without manufacturing a duplicate route.
const CROSS_LOCALE_ALTERNATES: Record<string, Partial<Record<'en' | 'nl', string>>> = {
  '/travel-guides/thai-cuisine-food-guide/': {
    en: '/travel-guides/thai-cuisine-food-guide/',
    nl: '/food/',
  },
};

export default function Hreflang() {
  const { asPath, locales, locale: currentLocale } = useRouter();

  if (!locales) return null;

  // Remove query string and hash from path
  const cleanPath = asPath.split('?')[0].split('#')[0];
  const seoPath = cleanPath;
  const registryPath = seoPath === '/' || seoPath.endsWith('/') ? seoPath : `${seoPath}/`;
  const crossLocaleAlternates = CROSS_LOCALE_ALTERNATES[registryPath];

  // All pages use EN + NL only
  const isTransportRoute = seoPath.startsWith('/transport/') && seoPath !== '/transport/';

  let activeLocales = locales;
  if (crossLocaleAlternates) {
    activeLocales = locales.filter(locale => Boolean(crossLocaleAlternates[locale as 'en' | 'nl']));
  } else if (isTransportRoute) {
    activeLocales = locales?.filter(l => l === 'en');
  } else if (unpairedRoutes.enOnly.includes(registryPath)) {
    activeLocales = locales.filter(locale => locale === 'en');
  } else if (unpairedRoutes.nlOnly.includes(registryPath)) {
    activeLocales = locales.filter(locale => locale === 'nl');
  }

  const canonicalLocale = crossLocaleAlternates
    ? currentLocale
    : unpairedRoutes.enOnly.includes(registryPath)
    ? 'en'
    : unpairedRoutes.nlOnly.includes(registryPath)
      ? 'nl'
      : currentLocale;

  const canonicalPath = crossLocaleAlternates?.[canonicalLocale as 'en' | 'nl'] || seoPath;
  const canonicalUrl =
    canonicalLocale === 'en'
      ? `${SITE_URL}${canonicalPath}`
      : `${SITE_URL}/${canonicalLocale}${canonicalPath}`;
  const defaultUrl = crossLocaleAlternates?.en
    ? `${SITE_URL}${crossLocaleAlternates.en}`
    : unpairedRoutes.nlOnly.includes(registryPath)
    ? `${SITE_URL}/nl${seoPath}`
    : `${SITE_URL}${seoPath}`;

  return (
    <Head>
      {activeLocales.map((locale) => {
        const hreflang = LOCALE_TO_HREFLANG[locale] || locale;
        const alternatePath = crossLocaleAlternates?.[locale as 'en' | 'nl'] || seoPath;
        const href =
          locale === 'en'
            ? `${SITE_URL}${alternatePath}`
            : `${SITE_URL}/${locale}${alternatePath}`;

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
      <link rel="alternate" hrefLang="x-default" href={defaultUrl} />
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
