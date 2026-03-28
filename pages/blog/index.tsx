import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPosts, getAllCategories } from '../../lib/blog';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  readingTime: number;
}

interface BlogPageProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogPage({ posts, categories }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;
  const { locale } = useRouter();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const featuredPost = posts.find(p => p.featured) || posts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Go2Thailand Travel Blog",
    "description": "Thailand travel guides, practical tips, and first-hand stories",
    "url": "https://go2-thailand.com/blog/",
    "blogPost": posts.slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author.name },
      "url": `https://go2-thailand.com/blog/${post.slug}/`
    }))
  };

  return (
    <>
      <SEOHead
        title="Thailand Travel Blog | Guides, Tips & Stories | Go2Thailand"
        description="In-depth Thailand travel guides, practical advice, and first-hand stories. Browse by destination, topic, or search for exactly what you need."
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <span className="font-script text-thailand-gold text-lg">Discover Thailand</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                Thailand Travel Blog
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Practical guides, destination deep-dives, and stories from the Land of Smiles
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs and Search */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Breadcrumbs items={breadcrumbs} />
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:border-thailand-blue"
                />
                <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-thailand-blue text-white'
                    : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {/* Featured Post */}
                {featuredPost && selectedCategory === 'all' && !searchQuery && (
                  <article className="mb-12 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <Link href={`/blog/${featuredPost.slug}/`}>
                      <div className="relative h-96">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-thailand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{featuredPost.author.name}</span>
                        <span aria-hidden>·</span>
                        <span>{featuredPost.date}</span>
                        <span aria-hidden>·</span>
                        <span>{featuredPost.readingTime} min read</span>
                      </div>
                      <h2 className="text-3xl font-bold font-heading mb-4">
                        <Link href={`/blog/${featuredPost.slug}/`} className="hover:text-thailand-blue transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{featuredPost.description}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blog/category/${featuredPost.category}/`}
                          className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm capitalize hover:bg-gray-200 transition-colors"
                        >
                          {featuredPost.category}
                        </Link>
                        <Link href={`/blog/${featuredPost.slug}/`} className="text-thailand-blue font-medium hover:underline">
                          Read article →
                        </Link>
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {paginatedPosts.map(post => (
                    <article key={post.slug} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <Link href={`/blog/${post.slug}/`}>
                        <div className="relative h-48">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                          <span>{post.date}</span>
                          <span aria-hidden>·</span>
                          <span>{post.readingTime} min read</span>
                        </div>
                        <h3 className="text-xl font-bold font-heading mb-3">
                          <Link href={`/blog/${post.slug}/`} className="hover:text-thailand-blue transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                        <Link
                          href={`/blog/category/${post.category}/`}
                          className="bg-surface-cream text-gray-700 px-2 py-1 rounded-full text-xs capitalize hover:bg-gray-200 transition-colors"
                        >
                          {post.category}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-600 text-lg">No articles found matching your search.</p>
                    <button
                      onClick={() => { handleSearchChange(''); handleCategoryChange('all'); }}
                      className="mt-4 text-thailand-blue hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                      .reduce<(number | string)[]>((acc, page, idx, arr) => {
                        if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push('...');
                        acc.push(page);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => { setCurrentPage(item as number); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === item
                                ? 'bg-thailand-blue text-white shadow-md'
                                : 'bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )}

                    <button
                      onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next →
                    </button>
                  </nav>
                )}

                {filteredPosts.length > 0 && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <aside>
                <div className="lg:sticky lg:top-16 space-y-8">
                  {/* Browse by Category */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold font-heading mb-4">Browse by Category</h2>
                    <ul className="space-y-2">
                      {categories.map(cat => (
                        <li key={cat}>
                          <Link
                            href={`/blog/category/${cat}/`}
                            className="flex items-center justify-between text-gray-700 hover:text-thailand-blue transition-colors capitalize"
                          >
                            <span>{cat}</span>
                            <span className="text-xs text-gray-400">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Tags */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold font-heading mb-4">Topics</h2>
                    <div className="flex flex-wrap gap-2">
                      {['islands', 'food', 'budget', 'visa', 'beaches', 'planning', 'backpacking', 'bangkok', 'street-food'].map(tag => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}/`}
                          className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors capitalize"
                        >
                          {tag.replace('-', ' ')}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Explore Guides */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold font-heading mb-4">Explore Guides</h2>
                    <div className="space-y-2">
                      <Link href="/islands/" className="block text-thailand-blue hover:underline">Thailand Islands</Link>
                      <Link href="/visa/" className="block text-thailand-blue hover:underline">Visa Guide</Link>
                      <Link href="/food/" className="block text-thailand-blue hover:underline">Thai Food Guide</Link>
                      <Link href="/practical-info/" className="block text-thailand-blue hover:underline">Practical Info</Link>
                      <Link href="/transport/" className="block text-thailand-blue hover:underline">Getting Around</Link>
                      <Link href="/esim/" className="block text-thailand-blue hover:underline">eSIM & Connectivity</Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getAllPosts(lang);
  const categories = getAllCategories(lang);

  return {
    props: {
      posts,
      categories
    },
    revalidate: 60,
  };
};
