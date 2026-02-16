import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import GoogleConsent from '../components/GoogleConsent';
import FeedbackRibbon from '../components/FeedbackRibbon';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  const router = useRouter();


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/go2thailand-faviocon.webp" />
        <link rel="apple-touch-icon" href="/go2thailand-faviocon.webp" />
      </Head>

      {/* Analytics and Ad Scripts - Only in production */}
      {isProduction && (
        <>
          {/* Google Tag Manager - Load with lazyOnload for better performance */}
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-P485VFS4');
              `
            }}
          />
          
          {/* Travelpayouts Drive - AI-powered monetization */}
          <Script
            id="travelpayouts-drive"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                    var script = document.createElement("script");
                    script.async = 1;
                    script.src = 'https://emrldco.com/NDIxODg4.js?t=421888';
                    document.head.appendChild(script);
                })();
              `
            }}
          />

          {/* Gatekeeper Consent Scripts - Load after page is interactive */}
          <Script
            id="gatekeeper-min"
            strategy="afterInteractive"
            src="https://cmp.gatekeeperconsent.com/min.js"
            data-cfasync="false"
          />
          
          <Script
            id="gatekeeper-cmp"
            strategy="afterInteractive"
            src="https://the.gatekeeperconsent.com/cmp.min.js"
            data-cfasync="false"
          />
          
        </>
      )}

      <GoogleConsent />
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          <Component {...pageProps} />
        </main>
        <Footer />
        <CookieConsent />
        <FeedbackRibbon />
      </div>
    </>
  );
}
