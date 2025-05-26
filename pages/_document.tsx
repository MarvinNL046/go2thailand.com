import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <Html lang="en">
      <Head />
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
