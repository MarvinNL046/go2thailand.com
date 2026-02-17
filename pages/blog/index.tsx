import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
  const { locale } = useRouter();
  const lang = locale === 'nl' ? 'nl' : 'en';

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

  const featuredPost = posts.find(post => post.featured) || posts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Go2Thailand Travel Blog",
    "description": "Thailand travel tips, guides, and stories",
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
      <Head>
        <title>Thailand Travel Blog | Tips, Guides & Stories | Go2Thailand</title>
        <meta name="description" content="Explore Thailand through our travel blog. Get insider tips, destination guides, food recommendations, and travel stories from the Land of Smiles." />
        <meta name="keywords" content="Thailand travel blog, Thailand tips, Thailand guides, Thai culture, Thailand stories" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand Travel Blog
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Stories, tips, and insights from the Land of Smiles
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
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-thailand-blue"
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
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-thailand-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-thailand-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  <article className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
                    <Link href={`/blog/${featuredPost.slug}/`}>
                      <div className="relative h-96">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{featuredPost.author.name}</span>
                        <span>-</span>
                        <span>{featuredPost.date}</span>
                        <span>-</span>
                        <span>{featuredPost.readingTime} min read</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4">
                        <Link href={`/blog/${featuredPost.slug}/`} className="hover:text-thailand-blue transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{featuredPost.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                          {featuredPost.category}
                        </span>
                        <Link href={`/blog/${featuredPost.slug}/`} className="text-thailand-blue font-medium hover:underline">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                          <span>-</span>
                          <span>{post.readingTime} min</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                          <Link href={`/blog/${post.slug}/`} className="hover:text-thailand-blue transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                          {post.category}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="mb-4 opacity-90">Get the latest Thailand travel tips delivered to your inbox</p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-white text-thailand-blue font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Tags Cloud */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['islands', 'food', 'budget', 'visa', 'beaches', 'planning', 'backpacking', 'bangkok', 'street-food'].map(tag => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}/`}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors capitalize"
                      >
                        {tag.replace('-', ' ')}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Explore More */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Explore More</h3>
                  <div className="space-y-2">
                    <Link href="/islands/" className="block text-thailand-blue hover:underline">🏝️ Thailand Islands</Link>
                    <Link href="/visa/" className="block text-thailand-blue hover:underline">🛂 Visa Guide</Link>
                    <Link href="/food/" className="block text-thailand-blue hover:underline">🍜 Thai Food Guide</Link>
                    <Link href="/practical-info/" className="block text-thailand-blue hover:underline">📋 Practical Info</Link>
                  </div>
                </div>

                {/* Book Hotels */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-3">Book Hotels</h3>
                  <div className="space-y-3">
                    <a
                      href="https://booking.tpo.lv/2PT1kR82"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm"
                    >
                      Booking.com
                    </a>
                    <a
                      href="https://trip.tpo.lv/TmObooZ5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-blue-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                    >
                      Trip.com
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                </div>

                {/* Tours & Activities */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-3">Tours & Activities</h3>
                  <div className="space-y-3">
                    <a
                      href="https://klook.tpo.lv/7Dt6WApj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-orange-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                    >
                      Klook Activities
                    </a>
                    <a
                      href="https://getyourguide.tpo.lv/GuAFfGGK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-red-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                    >
                      GetYourGuide Tours
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                </div>

                {/* eSIM */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2">📱 Thailand eSIM</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Stay connected in Thailand. Order your eSIM before you go.
                  </p>
                  <a
                    href="https://saily.tpo.lv/rf9lidnE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-thailand-red transition-colors mb-2"
                  >
                    Saily eSIM
                  </a>
                  <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
                    More eSIM options →
                  </Link>
                </div>

                {/* Travel Insurance */}
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">🛡️ Travel Insurance</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Protect yourself while traveling. Compare the best travel insurance.
                  </p>
                  <Link href="/travel-insurance/" className="block bg-white text-teal-600 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Compare Now
                  </Link>
                </div>

                {/* Transport */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-3">🚌 Transport</h3>
                  <a
                    href="https://12go.tpo.lv/tNA80urD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm mb-2"
                  >
                    12Go Asia - Book Transport
                  </a>
                  <Link href="/transport/" className="block text-thailand-blue text-center text-sm hover:underline">
                    View all routes →
                  </Link>
                </div>
              </aside>
            </div>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = locale === 'nl' ? 'nl' : 'en';
  const posts = getAllPosts(lang);
  const categories = getAllCategories(lang);

  return {
    props: {
      posts,
      categories
    }
  };
};
