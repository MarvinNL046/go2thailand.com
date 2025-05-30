import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EzoicDebugger from '../components/EzoicDebugger';
import { AD_CONFIG } from '../lib/ads/ezoic-config';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  const router = useRouter();

  useEffect(() => {
    // Initialize Ezoic in production
    if (isProduction && typeof window !== 'undefined') {
      // Add any additional Ezoic initialization here
      console.log('Ezoic ads initialized');
    }
  }, [isProduction]);

  // Handle route changes for Ezoic ads
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Optionally destroy all ads before route change
      if (typeof window !== 'undefined' && window.ezstandalone?.destroyAll) {
        window.ezstandalone.cmd?.push(() => {
          window.ezstandalone.destroyAll();
        });
      }
    };

    const handleRouteChangeComplete = () => {
      // Refresh ads after route change
      if (typeof window !== 'undefined' && window.ezstandalone?.showAds) {
        window.ezstandalone.cmd?.push(() => {
          window.ezstandalone.showAds();
        });
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/go2thailand-faviocon.png" />
        <link rel="apple-touch-icon" href="/go2thailand-faviocon.png" />
        
        {/* Google Tag Manager */}
        {isProduction && (
          <script
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
        )}
        
        {/* Ezoic Meta Tags */}
        {isProduction && AD_CONFIG.SITE_KEY && (
          <>
            <meta name="ezoic-site-verification" content={AD_CONFIG.SITE_KEY} />
            <meta name="google-adsense-account" content="ca-pub-your-publisher-id" />
          </>
        )}
      </Head>

      {/* Ezoic Script - Only in production */}
      {isProduction && (
        <>
          <Script
            id="ezoic-main"
            strategy="afterInteractive"
            src="//go.ezoic.net/detroitchicago/spacer.gif"
            onLoad={() => {
              console.log('Ezoic script loaded');
            }}
          />
          
          <Script
            id="ezoic-standalone"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.ezstandalone = window.ezstandalone || {};
                window.ezstandalone.define = window.ezstandalone.define || function(slot) {
                  return true;
                };
                window.ezstandalone.display = window.ezstandalone.display || function(slot) {
                  return true;
                };
                window.ezstandalone.refresh = window.ezstandalone.refresh || function(slot) {
                  return true;
                };
              `
            }}
          />
        </>
      )}

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          <Component {...pageProps} />
        </main>
        <Footer />
        <EzoicDebugger />
      </div>
    </>
  );
}
