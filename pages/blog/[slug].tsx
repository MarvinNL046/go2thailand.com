import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    bio?: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  categories: string[];
  tags: string[];
  relatedPosts?: BlogPost[];
}

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` }
  ];

  // Mock table of contents
  const tableOfContents = [
    { id: 'intro', title: 'Introduction' },
    { id: 'section-1', title: 'Getting Started' },
    { id: 'section-2', title: 'Best Practices' },
    { id: 'section-3', title: 'Final Thoughts' }
  ];

  return (
    <>
      <Head>
        <title>{post.title} | Go2Thailand Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage.url} />
        <meta property="og:type" content="article" />
        
        {/* Article metadata */}
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        {post.categories.map(category => (
          <meta key={category} property="article:tag" content={category} />
        ))}
      </Head>

      <article className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] lg:h-[600px]">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="container-custom pb-12">
              <div className="max-w-4xl">
                <div className="flex gap-2 mb-4">
                  {post.categories.map(category => (
                    <Link
                      key={category}
                      href={`/blog/category/${category.toLowerCase()}`}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                <div className="flex items-center gap-6 text-lg">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar - Table of Contents */}
              <aside className="lg:col-span-3">
                <div className="sticky top-4 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-lg shadow-lg p-6 hidden lg:block">
                    <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {tableOfContents.map(item => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-gray-600 hover:text-thailand-blue transition-colors py-1 pl-4 border-l-2 border-gray-200 hover:border-thailand-blue"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>

                </div>
              </aside>

              {/* Article Content */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
                  {/* Article Body */}
                  <div className="prose prose-lg max-w-none">
                    {/* This is where the actual blog content would go */}
                    <p className="text-xl text-gray-700 mb-8">
                      {post.excerpt}
                    </p>

                    <h2 id="intro">Introduction</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Thailand offers incredible experiences for travelers, from bustling street markets to serene temples.
                    </p>

                    <Image
                      src="/images/cities/bangkok/downtown-bangkok.webp"
                      alt="Bangkok skyline"
                      width={800}
                      height={450}
                      className="rounded-lg my-8"
                    />

                    <h2 id="section-1">Getting Started</h2>
                    <p>
                      Planning your trip to Thailand requires some preparation. Here are the essential things you need to know:
                    </p>
                    
                    <ul>
                      <li>Best time to visit: November to February (cool season)</li>
                      <li>Visa requirements: Most nationalities get 30-day visa on arrival</li>
                      <li>Currency: Thai Baht (THB)</li>
                      <li>Language: Thai (English widely spoken in tourist areas)</li>
                    </ul>

                    <blockquote>
                      "Thailand is the only Southeast Asian country never colonized by Europeans, which has allowed it to maintain its unique cultural identity."
                    </blockquote>

                    <h2 id="section-2">Best Practices</h2>
                    <p>
                      To make the most of your Thailand adventure, follow these tips from experienced travelers:
                    </p>

                    <h3>Respect Local Culture</h3>
                    <p>
                      Thailand is known as the "Land of Smiles," but it's important to understand and respect local customs:
                    </p>
                    <ul>
                      <li>Remove shoes before entering temples and homes</li>
                      <li>Dress modestly when visiting religious sites</li>
                      <li>Never touch someone's head or point feet at people</li>
                      <li>Show respect for the Royal Family</li>
                    </ul>

                    <h3>Stay Safe and Healthy</h3>
                    <p>
                      While Thailand is generally safe for tourists, take these precautions:
                    </p>
                    <ul>
                      <li>Drink bottled water only</li>
                      <li>Use mosquito repellent to prevent dengue</li>
                      <li>Be cautious when renting motorbikes</li>
                      <li>Keep copies of important documents</li>
                    </ul>

                    <h2 id="section-3">Final Thoughts</h2>
                    <p>
                      Thailand offers something for every type of traveler. Whether you're seeking adventure, relaxation, cultural immersion, 
                      or culinary delights, the Kingdom of Thailand will exceed your expectations. Start planning your journey today!
                    </p>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-12 pt-8 border-t">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-600">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{post.author.name}</h3>
                        <p className="text-gray-600 mt-1">
                          {post.author.bio || 'Travel writer and Thailand enthusiast sharing insights from years of exploring the Land of Smiles.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                  <h3 className="font-bold mb-4">Share this article</h3>
                  <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Facebook
                    </button>
                    <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                      Twitter
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                {/* Newsletter */}
                <div className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Get Thailand Updates</h3>
                  <p className="mb-4 text-sm opacity-90">Weekly travel tips and guides</p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
                  />
                  <button className="w-full bg-white text-thailand-blue font-medium py-2 rounded-lg hover:bg-gray-100">
                    Subscribe
                  </button>
                </div>

                {/* Related Posts */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <article key={relatedPost.id}>
                        <Link href={`/blog/${relatedPost.slug}`} className="group">
                          <h4 className="font-medium group-hover:text-thailand-blue transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{relatedPost.readingTime} min read</p>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </section>

        {/* Comments Section Placeholder */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Comments</h2>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">Comments section coming soon!</p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Mock slugs - replace with actual data fetching
  const slugs = [
    '10-hidden-gems-bangkok',
    'thai-street-food-guide',
    'island-hopping-southern-thailand'
  ];

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Mock post data - replace with actual data fetching
  const mockPost: BlogPost = {
    id: '1',
    slug: slug,
    title: '10 Hidden Gems in Bangkok Only Locals Know About',
    excerpt: 'Skip the tourist traps and discover Bangkok\'s best-kept secrets. From hidden temples to secret rooftop bars, these local favorites will show you a different side of the city.',
    content: 'Full article content would go here...',
    author: {
      name: 'Sarah Chen',
      bio: 'Travel writer and Thailand enthusiast with over 10 years of experience exploring Southeast Asia.'
    },
    publishedAt: 'December 15, 2024',
    updatedAt: 'December 16, 2024',
    readingTime: 8,
    featuredImage: {
      url: '/images/cities/bangkok/business-district-bangkok.webp',
      alt: 'Hidden Bangkok temple',
      caption: 'A serene temple hidden in the heart of Bangkok'
    },
    categories: ['Bangkok', 'Hidden Gems'],
    tags: ['bangkok', 'hidden-gems', 'local-tips', 'temples', 'off-the-beaten-path']
  };

  const relatedPosts: BlogPost[] = [
    {
      id: '2',
      slug: 'bangkok-street-food-tour',
      title: 'The Ultimate Bangkok Street Food Tour: Where Locals Really Eat',
      excerpt: 'Discover the best street food spots in Bangkok...',
      content: '',
      author: { name: 'Mike Thompson' },
      publishedAt: 'December 10, 2024',
      readingTime: 10,
      featuredImage: {
        url: '/images/food/street-food.webp',
        alt: 'Bangkok street food'
      },
      categories: ['Bangkok', 'Food'],
      tags: ['street-food', 'bangkok']
    },
    {
      id: '3',
      slug: 'bangkok-temples-guide',
      title: 'Beyond Wat Pho: Lesser-Known Temples in Bangkok',
      excerpt: 'Explore Bangkok\'s hidden temple gems...',
      content: '',
      author: { name: 'Emma Wilson' },
      publishedAt: 'December 5, 2024',
      readingTime: 12,
      featuredImage: {
        url: '/images/cities/bangkok/downtown-bangkok.webp',
        alt: 'Bangkok temples'
      },
      categories: ['Bangkok', 'Culture'],
      tags: ['temples', 'bangkok', 'culture']
    }
  ];

  return {
    props: {
      post: mockPost,
      relatedPosts
    }
  };
};