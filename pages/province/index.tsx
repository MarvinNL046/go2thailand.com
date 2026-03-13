import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import type { ProvinceManifest } from '../../lib/province-types';

interface Props {
  provinces: ProvinceManifest[];
}

const regionOrder = ['northern', 'central', 'eastern', 'western', 'southern', 'isaan'];
const regionLabels: Record<string, string> = {
  northern: 'Northern Thailand',
  central: 'Central Thailand',
  southern: 'Southern Thailand',
  isaan: 'Isaan (Northeast)',
  eastern: 'Eastern Thailand',
  western: 'Western Thailand',
};

export default function ProvinceIndex({ provinces }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Provinces', href: '/province/' },
  ];

  const grouped = regionOrder.reduce<Record<string, ProvinceManifest[]>>((acc, region) => {
    acc[region] = provinces.filter(p => p.region === region).sort((a, b) => a.provinceName.localeCompare(b.provinceName));
    return acc;
  }, {});

  return (
    <>
      <SEOHead
        title="All 77 Provinces of Thailand — Complete Province Guide 2026"
        description="Explore all 77 provinces of Thailand organized by region. Discover attractions, culture, and travel tips for every province from Bangkok to Bueng Kan."
      />
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              All 77 Provinces of Thailand
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Thailand is divided into 77 provinces (changwat), each with its own unique character,
              culture, and attractions. Explore our growing collection of province guides organized by region.
            </p>
          </div>
        </section>

        <div className="container-custom py-8">
          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-wrap gap-6">
            <div>
              <span className="text-3xl font-bold text-thailand-blue">{provinces.length}</span>
              <span className="text-gray-500 ml-2">provinces covered</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-400">77</span>
              <span className="text-gray-500 ml-2">total provinces</span>
            </div>
          </div>

          {/* Provinces by region */}
          {regionOrder.map(region => {
            const regionProvinces = grouped[region];
            if (!regionProvinces || regionProvinces.length === 0) return null;
            return (
              <section key={region} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-7 bg-thailand-gold rounded-full inline-block" />
                  {regionLabels[region] || region}
                  <span className="text-sm font-normal text-gray-400 ml-2">({regionProvinces.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionProvinces.map(p => (
                    <Link
                      key={p.provinceSlug}
                      href={`/province/${p.provinceSlug}/`}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors">
                        {p.provinceName}
                      </h3>
                      <span className="text-sm text-gray-500">{regionLabels[p.region]}</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Link to regions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Prefer a broader view?</h3>
            <p className="text-gray-600 text-sm mb-3">
              Explore Thailand by region for a higher-level overview of each part of the country.
            </p>
            <Link href="/region/" className="text-thailand-blue font-semibold hover:underline">
              View Thailand by Region →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { getAllProvinceManifests } = await import('../../lib/provinces');
  const provinces = getAllProvinceManifests();
  return {
    props: { provinces },
    revalidate: 86400,
  };
};
