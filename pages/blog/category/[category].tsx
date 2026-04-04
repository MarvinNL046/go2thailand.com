import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../../components/PreFooterAffiliateBanner';
import { getAllCategories, getPostsByCategory } from '../../../lib/blog';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
}

interface CategoryPageProps {
  category: string;
  posts: BlogPost[];
}

export default function BlogCategoryPage({ category, posts }: CategoryPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: category, href: `/blog/category/${category}/` }
  ];

  return (
    <>
      <SEOHead
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Articles | Go2Thailand`}
        description={`Explore our ${category} articles about Thailand. In-depth travel guides, expert tips, local insights and stories to help plan your perfect Thai trip.`}
      >
        <meta name="robots" content="noindex, follow" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <span className="font-script text-thailand-gold text-lg">Category</span>
            <h1 className="text-4xl font-bold font-heading capitalize">{category}</h1>
            <p className="text-lg opacity-90 mt-2">{posts.length} articles</p>
          </div>
        </section>

        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/blog/${post.slug}/`}>
                    <div className="relative h-48">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span>{post.date}</span>
                      <span>-</span>
                      <span>{post.readingTime} min</span>
                    </div>
                    <h2 className="text-xl font-bold font-heading mb-3">
                      <Link href={`/blog/${post.slug}/`} className="hover:text-thailand-blue transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-700 line-clamp-2">{post.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No posts found in this category.</p>
                <Link href="/blog/" className="text-thailand-blue hover:underline mt-4 inline-block">← Back to blog</Link>
              </div>
            )}
          </div>
        </section>

        <PreFooterAffiliateBanner
          title="Plan Your Thailand Trip"
          description="Book hotels, transport, activities, and get connected with an eSIM"
          links={[
            { label: 'Booking.com', href: 'https://booking.tpo.lv/2PT1kR82' },
            { label: 'Trip.com', href: 'https://trip.tpo.lv/TmObooZ5' },
            { label: 'Activities', href: 'https://klook.tpo.lv/7Dt6WApj' },
            { label: 'Transport', href: 'https://12go.tpo.lv/tNA80urD' },
            { label: 'eSIM', href: 'https://saily.tpo.lv/rf9lidnE' },
            { label: 'NordVPN', href: 'https://nordvpn.tpo.lv/ekHF1i55' },
            { label: 'NordPass', href: 'https://nordvpn.tpo.lv/tp12zNjC' },
          ]}
        />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const category = params?.category as string;
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getPostsByCategory(category, lang);

  return {
    props: { category, posts },
    revalidate: 604800
  };
};
