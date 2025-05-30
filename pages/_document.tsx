import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <Html lang="en">
      <Head>
        {/* Ezoic Site Verification */}
        <meta name="ezoic-site-verification" content="LQx1WNnvCxOQ8XYZnNU5Fp6M2D5BBV" />
        
        {/* Ezoic Privacy Scripts - Only in production */}
        {isProduction && (
          <>
            <script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
            <script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>
            <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.ezstandalone = window.ezstandalone || {};
                  ezstandalone.cmd = ezstandalone.cmd || [];
                `,
              }}
            />
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
