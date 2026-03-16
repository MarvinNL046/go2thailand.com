import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found - Go2Thailand.com</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-surface-cream flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Large 404 */}
          <p className="text-[10rem] font-heading font-bold text-gray-200 leading-none select-none">
            404
          </p>

          {/* Heading */}
          <h1 className="font-heading text-4xl font-bold text-gray-800 mt-2 mb-4">
            Page Not Found
          </h1>

          {/* Friendly message */}
          <p className="text-lg text-gray-600 mb-10">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href="/"
              className="inline-block bg-thailand-red text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Homepage
            </Link>
            <Link
              href="/city/"
              className="inline-block border-2 border-thailand-blue text-thailand-blue font-semibold px-8 py-3 rounded-lg hover:bg-thailand-blue hover:text-white transition-colors"
            >
              Explore Cities
            </Link>
          </div>

          {/* Popular Destinations */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-gray-700 mb-5">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Bangkok', href: '/city/bangkok/' },
                { label: 'Chiang Mai', href: '/city/chiang-mai/' },
                { label: 'Phuket', href: '/city/phuket/' },
                { label: 'Thai Islands', href: '/islands/' },
                { label: 'Thai Food Guide', href: '/food/' },
                { label: 'Travel Blog', href: '/blog/' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block bg-white border border-gray-200 rounded-lg px-4 py-3 text-thailand-blue font-medium hover:border-thailand-blue hover:shadow-sm transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
