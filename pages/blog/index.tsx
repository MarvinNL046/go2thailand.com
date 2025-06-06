import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';

// Mock blog post type (will be replaced with actual data structure)
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  featuredImage: {
    url: string;
    alt: string;
  };
  categories: string[];
  tags: string[];
  featured?: boolean;
}

interface BlogPageProps {
  posts: BlogPost[];
  categories: string[];
  popularPosts: BlogPost[];
}

export default function BlogPage({ posts, categories, popularPosts }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' }
  ];

  // Filter posts based on category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.categories.includes(selectedCategory);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured post (first featured post or first post)
  const featuredPost = posts.find(post => post.featured) || posts[0];

  return (
    <>
      <Head>
        <title>Thailand Travel Blog | Tips, Guides & Stories | Go2Thailand</title>
        <meta name="description" content="Explore Thailand through our travel blog. Get insider tips, destination guides, food recommendations, and travel stories from the Land of Smiles." />
        <meta name="keywords" content="Thailand travel blog, Thailand tips, Thailand guides, Thai culture, Thailand stories" />
        <link rel="canonical" href="https://go2-thailand.com/blog/" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white">
          <div className="container-custom py-16">
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
          <div className="container-custom py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Breadcrumbs items={breadcrumbs} />
              
              {/* Search Bar */}
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
          <div className="container-custom py-4">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {/* Featured Post */}
                {featuredPost && selectedCategory === 'all' && !searchQuery && (
                  <article className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <div className="relative h-96">
                        <Image
                          src={featuredPost.featuredImage.url}
                          alt={featuredPost.featuredImage.alt}
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
                        <span>•</span>
                        <span>{featuredPost.publishedAt}</span>
                        <span>•</span>
                        <span>{featuredPost.readingTime} min read</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4">
                        <Link href={`/blog/${featuredPost.slug}`} className="hover:text-thailand-blue transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {featuredPost.categories.map(category => (
                            <span key={category} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {category}
                            </span>
                          ))}
                        </div>
                        <Link href={`/blog/${featuredPost.slug}`} className="text-thailand-blue font-medium hover:underline">
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span>{post.readingTime} min</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                          <Link href={`/blog/${post.slug}`} className="hover:text-thailand-blue transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex gap-2">
                          {post.categories.slice(0, 2).map(category => (
                            <span key={category} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
                  </div>
                )}

                {/* Pagination Placeholder */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex gap-2">
                    <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">Previous</button>
                    <button className="px-4 py-2 bg-thailand-blue text-white rounded-lg">1</button>
                    <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">2</button>
                    <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">3</button>
                    <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">Next</button>
                  </nav>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">

                {/* Popular Posts */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <article key={post.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-20 h-20 relative">
                          <Image
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-thailand-blue transition-colors">
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{post.publishedAt}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="mb-4 opacity-90">Get the latest Thailand travel tips delivered to your inbox</p>
                  <form className="space-y-3">
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
                    {['Bangkok', 'Street Food', 'Temples', 'Beaches', 'Islands', 'Culture', 'Budget Travel', 'Luxury', 'Adventure'].map(tag => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
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

export const getStaticProps: GetStaticProps = async () => {
  // Mock data - replace with actual data fetching
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      slug: '10-hidden-gems-bangkok',
      title: '10 Hidden Gems in Bangkok Only Locals Know About',
      excerpt: 'Skip the tourist traps and discover Bangkok\'s best-kept secrets. From hidden temples to secret rooftop bars, these local favorites will show you a different side of the city.',
      author: { name: 'Sarah Chen' },
      publishedAt: 'December 15, 2024',
      readingTime: 8,
      featuredImage: {
        url: '/images/cities/bangkok/business-district-bangkok.webp',
        alt: 'Hidden Bangkok temple'
      },
      categories: ['Bangkok', 'Hidden Gems'],
      tags: ['bangkok', 'hidden-gems', 'local-tips'],
      featured: true
    },
    {
      id: '2',
      slug: 'thai-street-food-guide',
      title: 'The Ultimate Thai Street Food Guide for First-Timers',
      excerpt: 'Navigate Thailand\'s vibrant street food scene like a pro. Learn what to eat, where to find it, and how to order without speaking Thai.',
      author: { name: 'Mike Thompson' },
      publishedAt: 'December 10, 2024',
      readingTime: 12,
      featuredImage: {
        url: '/images/food/street-food.webp',
        alt: 'Thai street food vendors'
      },
      categories: ['Food', 'Guides'],
      tags: ['street-food', 'thai-food', 'beginner-guide']
    },
    {
      id: '3',
      slug: 'island-hopping-southern-thailand',
      title: 'Island Hopping in Southern Thailand: Complete 2025 Guide',
      excerpt: 'Plan your perfect island hopping adventure in Southern Thailand. From Phuket to Koh Lipe, we cover everything you need to know.',
      author: { name: 'Emma Wilson' },
      publishedAt: 'December 5, 2024',
      readingTime: 15,
      featuredImage: {
        url: '/images/cities/phuket/phuket-old-town.webp',
        alt: 'Southern Thailand islands'
      },
      categories: ['Islands', 'Guides'],
      tags: ['islands', 'southern-thailand', 'beach']
    }
  ];

  const categories = ['Bangkok', 'Islands', 'Food', 'Culture', 'Guides', 'Budget Travel', 'Luxury', 'Hidden Gems'];

  return {
    props: {
      posts: mockPosts,
      categories,
      popularPosts: mockPosts.slice(0, 3)
    }
  };
};