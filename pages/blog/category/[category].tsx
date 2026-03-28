import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
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

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  destinations: 'In-depth guides to Thailand\'s regions, cities, islands, and hidden corners — from Bangkok\'s neighbourhoods to quiet beach villages.',
  food: 'Thai cuisine explained: street food, regional dishes, where to eat, and how to order like a local.',
  practical: 'Visas, transport, money, SIM cards, safety, and everything else you need to know before and during your trip.',
  budget: 'How to travel Thailand without overspending — affordable accommodation, eating cheap, and getting around for less.',
  culture: 'Thai customs, festivals, temples, and how to be a respectful visitor in the Land of Smiles.',
  islands: 'The best of Thailand\'s islands: Koh Samui, Koh Tao, Phuket, Koh Lanta, and the lesser-known gems.',
  planning: 'Itineraries, trip planning timelines, and everything you need to organise a great Thailand holiday.',
  activities: 'Things to do in Thailand — diving, trekking, cooking classes, elephants, temples, and more.',
};

function getCategoryDescription(category: string): string {
  return CATEGORY_DESCRIPTIONS[category.toLowerCase()] ||
    `All Go2Thailand articles about ${category}. Expert travel guides and practical tips for your trip to Thailand.`;
}

export default function BlogCategoryPage({ category, posts }: CategoryPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: category, href: `/blog/category/${category}/` }
  ];

  const description = getCategoryDescription(category);

  return (
    <>
      <SEOHead
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Articles | Go2Thailand Blog`}
        description={description}
      >
        <meta name="robots" content="noindex, follow" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <span className="font-script text-thailand-gold text-lg">Category</span>
            <h1 className="text-4xl font-bold font-heading capitalize mt-1">{category}</h1>
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
                <p className="text-gray-600">No articles found in this category.</p>
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
  const categories = getAllCategories('en');
  const paths = categories.map(category => ({
    params: { category }
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const category = params?.category as string;
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getPostsByCategory(category, lang);

  return {
    props: { category, posts },
    revalidate: 86400
  };
};
