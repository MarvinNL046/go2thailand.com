import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import IslandCard from '../../components/IslandCard';
import { getAllIslands } from '../../lib/islands';

interface Island {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  highlights: string[];
}

interface IslandsPageProps {
  islands: Island[];
}

export default function IslandsPage({ islands }: IslandsPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' }
  ];

  const regions = ['all', 'Gulf of Thailand', 'Andaman Sea'];

  const filteredIslands = selectedRegion === 'all'
    ? islands
    : islands.filter(island => island.region === selectedRegion);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Thailand Islands Guide",
    "description": "Explore the most beautiful islands in Thailand. From Koh Samui to Koh Phi Phi, find your perfect Thai island paradise.",
    "url": "https://go2-thailand.com/islands/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={`Thailand Islands Guide 2026 | Go2Thailand`}
        description="Discover Thailand's most beautiful islands in 2026. Complete guides for Koh Samui, Koh Phi Phi, Koh Tao, Koh Lanta & more. Beaches, hotels, transport & budget tips."
      >
        <meta name="keywords" content="Thailand islands, Koh Samui, Koh Phi Phi, Koh Tao, Koh Lanta, Koh Chang, Thai islands, best islands Thailand" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand Islands
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                Discover paradise on Thailand&apos;s stunning islands
              </p>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                From the Gulf of Thailand to the Andaman Sea, explore crystal-clear waters, white sand beaches, and vibrant coral reefs
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Best Beaches CTA */}
        <section className="bg-gradient-to-r from-cyan-600 to-teal-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/best-beaches-in-thailand" className="flex items-center justify-between group">
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl"></span>
                <div>
                  <span className="font-bold text-sm sm:text-base">Best Beaches in Thailand 2026</span>
                  <span className="hidden sm:inline text-white/80 text-sm ml-2">— See our ranked guide of 25 top beaches</span>
                </div>
              </div>
              <span className="text-white group-hover:translate-x-1 transition-transform text-xl">→</span>
            </Link>
          </div>
        </section>

        {/* Region Filter */}
        <section className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedRegion === region
                      ? 'bg-thailand-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {region === 'all' ? 'All Islands' : region}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Islands Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedRegion === 'all'
                  ? `All Thai Islands (${filteredIslands.length})`
                  : `${selectedRegion} Islands (${filteredIslands.length})`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIslands.map(island => (
                <IslandCard key={island.id} island={island} />
              ))}
            </div>
          </div>
        </section>

        {/* Island Comparison Table */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quick Island Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-thailand-blue text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Island</th>
                    <th className="px-4 py-3 text-left">Region</th>
                    <th className="px-4 py-3 text-left">Best For</th>
                    <th className="px-4 py-3 text-left rounded-tr-lg">Province</th>
                  </tr>
                </thead>
                <tbody>
                  {islands.map((island, index) => (
                    <tr key={island.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium">
                        <a href={`/islands/${island.slug}/`} className="text-thailand-blue hover:underline">
                          {island.name.en}
                        </a>
                      </td>
                      <td className="px-4 py-3">{island.region}</td>
                      <td className="px-4 py-3">{island.highlights.slice(0, 2).join(', ')}</td>
                      <td className="px-4 py-3">{island.province}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Guide to Thailand&apos;s Islands
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Thailand is home to over 1,400 islands spread across two coastlines: the Gulf of Thailand in the east and the Andaman Sea in the west.
                Each island offers a unique experience, from the full-moon parties of Koh Phangan to the quiet serenity of Koh Yao Noi.
              </p>
              <h3>Gulf of Thailand Islands</h3>
              <p>
                The Gulf islands, including Koh Samui, Koh Phangan, Koh Tao, Koh Chang, Koh Mak, and Koh Samet, are known for their calm waters,
                excellent diving spots, and varied atmospheres. Koh Samui offers luxury resorts, while Koh Tao is a world-class diving destination.
              </p>
              <h3>Andaman Sea Islands</h3>
              <p>
                The Andaman islands, including Koh Phi Phi, Koh Lanta, Koh Lipe, and Koh Yao Noi, are famous for their dramatic limestone cliffs,
                crystal-clear waters, and vibrant coral reefs. These islands are best visited from November to April when the Andaman Sea is calm.
              </p>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Plan Your Island Trip</h2>
                <p className="opacity-90 text-sm">Book ferries, hotels, tours & get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://12go.tpo.lv/tNA80urD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Book Ferries
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Booking.com
                </a>
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Trip.com
                </a>
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Tours
                </a>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  eSIM
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const islands = getAllIslands();

  return {
    props: {
      islands
    }
  };
};
