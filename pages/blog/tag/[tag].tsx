import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAllTags, getPostsByTag } from '../../../lib/blog';

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

interface TagPageProps {
  tag: string;
  posts: BlogPost[];
}

export default function BlogTagPage({ tag, posts }: TagPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: `#${tag}`, href: `/blog/tag/${tag}/` }
  ];

  return (
    <>
      <SEOHead
        title={`#${tag} Articles | Go2Thailand`}
        description={`Browse all Thailand travel articles tagged "${tag}". Expert guides, local tips and insider knowledge to help you plan an unforgettable trip to Thailand.`}
      />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold">#{tag}</h1>
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
                <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                    <h2 className="text-xl font-bold mb-3">
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
                <p className="text-gray-600">No posts found with this tag.</p>
                <Link href="/blog/" className="text-thailand-blue hover:underline mt-4 inline-block">← Back to blog</Link>
              </div>
            )}
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">Plan Your Thailand Trip</h2>
                <p className="opacity-90 text-sm">Book hotels, transport, activities, and get connected with an eSIM</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <a href="https://klook.tpo.lv/7Dt6WApj" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
                <a href="https://saily.tpo.lv/rf9lidnE" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags('en');
  const paths = tags.map(tag => ({
    params: { tag }
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const tag = params?.tag as string;
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getPostsByTag(tag, lang);

  return {
    props: { tag, posts },
    revalidate: 86400
  };
};
