import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://go2-thailand.com';

// Map Next.js locale codes to hreflang language codes
const LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  nl: 'nl',
  zh: 'zh-Hans',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  ja: 'ja',
  ko: 'ko',
};

export default function Hreflang() {
  const { asPath, locales, locale: currentLocale } = useRouter();

  if (!locales) return null;

  // Remove query string and hash from path
  const cleanPath = asPath.split('?')[0].split('#')[0];

  const canonicalUrl =
    currentLocale === 'en'
      ? `${SITE_URL}${cleanPath}`
      : `${SITE_URL}/${currentLocale}${cleanPath}`;

  return (
    <Head>
      {locales.map((locale) => {
        const hreflang = LOCALE_TO_HREFLANG[locale] || locale;
        const href =
          locale === 'en'
            ? `${SITE_URL}${cleanPath}`
            : `${SITE_URL}/${locale}${cleanPath}`;

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
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${cleanPath}`} />
      {/* Canonical always points to current locale version */}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      {/* Open Graph defaults - pages can override these with their own Head tags */}
      <meta property="og:site_name" content="Go2Thailand" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${SITE_URL}/og-default.webp`} />
      <meta property="og:locale" content={currentLocale === 'en' ? 'en_US' : currentLocale} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@go2thailand" />
      <meta name="twitter:image" content={`${SITE_URL}/og-default.webp`} />
    </Head>
  );
}
