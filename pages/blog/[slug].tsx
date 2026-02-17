import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import AuthorBio from '../../components/blog/AuthorBio';
import Sources from '../../components/blog/Sources';
import LastUpdated from '../../components/blog/LastUpdated';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../lib/blog';

interface Source {
  name: string;
  url: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  readingTime: number;
  contentHtml?: string;
  sources?: Source[];
}

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const { locale } = useRouter();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: post.title, href: `/blog/${post.slug}/` }
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": `https://go2-thailand.com${post.image}`,
    "datePublished": post.date,
    "dateModified": post.lastUpdated || post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Go2Thailand",
      "url": "https://go2-thailand.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://go2-thailand.com/logo/go2thailand-logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://go2-thailand.com/blog/${post.slug}/`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://go2-thailand.com${crumb.href}`
    }))
  };

  return (
    <>
      <Head>
        <title>{post.title} | Go2Thailand Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={`https://go2-thailand.com${post.image}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <article className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] lg:h-[500px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-4xl">
                <div className="flex gap-2 mb-4">
                  <Link
                    href={`/blog/category/${post.category}/`}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors capitalize"
                  >
                    {post.category}
                  </Link>
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                <div className="flex items-center gap-6 text-lg">
                  <span>{post.author.name}</span>
                  <span>-</span>
                  <span>{post.date}</span>
                  <span>-</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + Last Updated */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Breadcrumbs items={breadcrumbs} />
              <LastUpdated date={post.lastUpdated || post.date} locale={locale} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Article Content */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
                  {post.contentHtml ? (
                    <div
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-thailand-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                  ) : (
                    <p className="text-gray-700">{post.description}</p>
                  )}

                  {/* Sources */}
                  {post.sources && post.sources.length > 0 && (
                    <Sources sources={post.sources} locale={locale} />
                  )}

                  {/* Author Bio */}
                  <AuthorBio name={post.author.name} locale={locale} />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}/`}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
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
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <article key={relatedPost.slug}>
                          <Link href={`/blog/${relatedPost.slug}/`} className="group">
                            <h4 className="font-medium group-hover:text-thailand-blue transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{relatedPost.readingTime} min read</p>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explore */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Explore More</h3>
                  <div className="space-y-2">
                    <Link href="/islands/" className="block text-thailand-blue hover:underline text-sm">🏝️ Thailand Islands</Link>
                    <Link href="/visa/" className="block text-thailand-blue hover:underline text-sm">🛂 Visa Guide</Link>
                    <Link href="/food/" className="block text-thailand-blue hover:underline text-sm">🍜 Thai Food</Link>
                    <Link href="/practical-info/" className="block text-thailand-blue hover:underline text-sm">📋 Practical Info</Link>
                    <Link href="/blog/" className="block text-thailand-blue hover:underline text-sm">← All blog posts</Link>
                  </div>
                </div>

                {/* Trip.com Hotel Widget */}
                <TripcomWidget city="Thailand" type="searchbox" customTitle="Find Thailand Hotels" />

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
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts('en');
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const lang = locale === 'nl' ? 'nl' : 'en';

  const post = await getPostBySlug(slug, lang);

  if (!post) {
    // Try fallback to English if not found in requested locale
    const fallbackPost = await getPostBySlug(slug, 'en');
    if (!fallbackPost) {
      return { notFound: true };
    }
    const relatedPosts = getRelatedPosts(slug, 'en', 3);
    return {
      props: { post: fallbackPost, relatedPosts },
      revalidate: 86400
    };
  }

  const relatedPosts = getRelatedPosts(slug, lang, 3);

  return {
    props: { post, relatedPosts },
    revalidate: 86400
  };
};
