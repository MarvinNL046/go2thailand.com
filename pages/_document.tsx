import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external origins for better performance */}
        {isProduction && (
          <>
            {/* Google Tag Manager */}
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            
            {/* Google Ads/AdSense */}
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
            <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
            
            {/* Gatekeeper Consent */}
            <link rel="preconnect" href="https://cmp.gatekeeperconsent.com" />
            <link rel="dns-prefetch" href="https://cmp.gatekeeperconsent.com" />
            <link rel="preconnect" href="https://the.gatekeeperconsent.com" />
            <link rel="dns-prefetch" href="https://the.gatekeeperconsent.com" />
          </>
        )}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) - Only in production */}
        {isProduction && (
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-P485VFS4"
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
