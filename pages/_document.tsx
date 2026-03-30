import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentProps extends DocumentInitialProps {
  locale: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale || 'en' };
  }

  render() {
    const isProduction = process.env.NODE_ENV === 'production';

    return (
      <Html lang={this.props.locale}>
      <Head>
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preconnect to external origins for better performance */}
        {isProduction && (
          <>
            {/* Google Tag Manager */}
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            
            {/* Google Ads/AdSense */}
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
            <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
              crossOrigin="anonymous"
            />
            <meta name="google-adsense-account" content="ca-pub-9667530069853985" />
            <meta name="p:domain_verify" content="82c2df678f9c93028c81c53ff6ef148d" />

            {/* Ahrefs Analytics */}
            <script src="https://analytics.ahrefs.com/analytics.js" data-key="E+8IfL9xrF74c70Fe+NC7w" async />
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
}
