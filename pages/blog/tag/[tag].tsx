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

const TAG_DESCRIPTIONS: Record<string, string> = {
  islands: 'Everything about Thailand\'s islands — ferry routes, where to stay, snorkelling spots, and which island suits your travel style.',
  food: 'Thai food guides: street food stalls, local markets, regional specialities, and how to eat well on any budget.',
  budget: 'Smart spending tips for Thailand: where to stay cheap, affordable eats, and free things to see and do.',
  visa: 'Thailand visa rules, exemptions, extensions, and border run practicalities — kept up to date.',
  beaches: 'The best beaches in Thailand by region — from party beaches to secluded coves and family-friendly shores.',
  planning: 'Trip planning resources: when to go, how long to stay, sample itineraries, and what not to miss.',
  backpacking: 'Backpacker routes, hostels, night buses, and how to travel Thailand cheaply and independently.',
  bangkok: 'Bangkok travel guides — neighbourhoods, temples, street food, transport, and day trips from the capital.',
  'street-food': 'Thailand\'s street food scene: what to eat, where to find it, and how much to pay.',
};

function getTagDescription(tag: string): string {
  const normalised = tag.toLowerCase().replace(/\s+/g, '-');
  return TAG_DESCRIPTIONS[normalised] ||
    `Thailand travel articles tagged "${tag}". Practical guides and tips to help you plan your trip.`;
}

export default function BlogTagPage({ tag, posts }: TagPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: `#${tag}`, href: `/blog/tag/${tag}/` }
  ];

  const description = getTagDescription(tag);

  return (
    <>
      <SEOHead
        title={`${tag.charAt(0).toUpperCase() + tag.slice(1)} | Go2Thailand Blog`}
        description={description}
      >
        <meta name="robots" content="noindex, follow" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <span className="font-script text-thailand-gold text-lg">Topic</span>
            <h1 className="text-4xl font-bold font-heading mt-1">#{tag}</h1>
            <p className="text-lg opacity-80 mt-3 max-w-2xl">{description}</p>
            <p className="text-sm opacity-60 mt-2">{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
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
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingTime} min read</span>
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
                <p className="text-gray-600">No articles found with this tag.</p>
                <Link href="/blog/" className="text-thailand-blue hover:underline mt-4 inline-block">← Back to all articles</Link>
              </div>
            )}

            {/* Back to blog */}
            {posts.length > 0 && (
              <div className="text-center mt-10">
                <Link href="/blog/" className="text-thailand-blue hover:underline">← Browse all articles</Link>
              </div>
            )}
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
