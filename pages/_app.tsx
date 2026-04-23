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
import ExitIntentPopup from '../components/ExitIntentPopup';
import PushBanner from '../components/PushBanner';
import Hreflang from '../components/Hreflang';
import { ToastProvider } from '../components/Toast';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const siteLogoUrl = 'https://go2-thailand.com/images/brand/go2thailand-logo-2026.png';
  const isProduction = process.env.NODE_ENV === 'production';
  const router = useRouter();
  const isNl = router.locale === 'nl';


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/go2thailand-faviocon.webp" />
        <link rel="apple-touch-icon" href="/go2thailand-faviocon.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Go2Thailand.com",
              "url": "https://go2-thailand.com",
              "logo": siteLogoUrl,
              "description": isNl
                ? "Je complete gids voor reizen naar Thailand"
                : "Your comprehensive guide to Thailand travel",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@go2-thailand.com",
                "contactType": "customer service"
              }
            })
          }}
        />
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
          
          {/* Google Analytics 4 */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-WVN5SQGHW8"
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WVN5SQGHW8');
              `
            }}
          />

        </>
      )}

      <Hreflang />
      <GoogleConsent />
      <ToastProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <PushBanner />
          <Header />
          <main className="flex-grow overflow-x-hidden">
            <Component {...pageProps} />
          </main>
          <Footer />
          <CookieConsent />
          <FeedbackRibbon />
          <ExitIntentPopup />
        </div>
      </ToastProvider>
      <Analytics />
    </>
  );
}
