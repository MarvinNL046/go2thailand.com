import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import AuthorBio from '../../components/blog/AuthorBio';
import Sources from '../../components/blog/Sources';
import LastUpdated from '../../components/blog/LastUpdated';
import RelatedPosts from '../../components/blog/RelatedPosts';
import ShareButtons from '../../components/ShareButtons';
import InlineAd from '../../components/ads/InlineAd';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../lib/blog';

interface Source {
  name: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
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
  faqItems?: FaqItem[];
}

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function toAbsoluteImageUrl(image: string) {
  return /^https?:\/\//i.test(image) ? image : `https://go2-thailand.com${image}`;
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
    "image": toAbsoluteImageUrl(post.image),
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

  const shareUrl = `https://go2-thailand.com/blog/${post.slug}/`;
  const shareImage = toAbsoluteImageUrl(post.image);

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

  const faqJsonLd = post.faqItems && post.faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <>
      <SEOHead
        title={`${post.title} | Go2Thailand`}
        description={post.description}
        ogImage={toAbsoluteImageUrl(post.image)}
      >
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
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </SEOHead>

      <article className="bg-surface-cream min-h-screen">
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
                <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-6">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <span>{post.author.name}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden>·</span>
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
        <section className="py-12 pb-20 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Article Content */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                  {/* Share Buttons - Top */}
                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <ShareButtons
                      url={shareUrl}
                      title={post.title}
                      description={post.description}
                      image={shareImage}
                    />
                  </div>

                  {/* Article Body */}
                  {post.contentHtml ? (
                    <div
                      data-blog-content
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-thailand-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                  ) : (
                    <p className="text-gray-700">{post.description}</p>
                  )}

                  {/* Sources / References */}
                  {post.sources && post.sources.length > 0 && (
                    <Sources sources={post.sources} locale={locale} />
                  )}

                  {/* Author Bio */}
                  <AuthorBio name={post.author.name} locale={locale} />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold font-heading mb-4">Topics covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => {
                        const tagSlug = tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                        return (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tagSlug}/`}
                            className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-thailand-blue hover:text-white transition-colors"
                          >
                            #{tag}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ad after article content */}
                  <InlineAd />

                  {/* Share Buttons - Bottom */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-bold font-heading mb-4">Share this article</h3>
                    <ShareButtons
                      url={shareUrl}
                      title={post.title}
                      description={post.description}
                      image={shareImage}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 lg:self-start">
                <div className="lg:sticky lg:top-4 space-y-6">
                  {/* Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h2 className="font-bold font-heading text-lg mb-4">Related Articles</h2>
                      <div className="space-y-4">
                        {relatedPosts.map(relatedPost => (
                          <article key={relatedPost.slug}>
                            <Link href={`/blog/${relatedPost.slug}/`} className="group">
                              <h3 className="font-medium group-hover:text-thailand-blue transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{relatedPost.readingTime} min read</p>
                            </Link>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explore More */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="font-bold font-heading text-lg mb-4">Explore More</h2>
                    <div className="space-y-2">
                      <Link href="/islands/" className="block text-thailand-blue hover:underline text-sm">Thailand Islands</Link>
                      <Link href="/visa/" className="block text-thailand-blue hover:underline text-sm">Visa Guide</Link>
                      <Link href="/food/" className="block text-thailand-blue hover:underline text-sm">Thai Food</Link>
                      <Link href="/practical-info/" className="block text-thailand-blue hover:underline text-sm">Practical Info</Link>
                      <Link href="/transport/" className="block text-thailand-blue hover:underline text-sm">Getting Around</Link>
                      <Link href="/blog/" className="block text-thailand-blue hover:underline text-sm">← All blog posts</Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* People Also Read */}
        <RelatedPosts posts={relatedPosts} locale={locale} />
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
    const fallbackPost = await getPostBySlug(slug, 'en');
    if (!fallbackPost) {
      return { notFound: true };
    }
    const relatedPosts = getRelatedPosts(slug, 'en', 4);
    return {
      props: { post: fallbackPost, relatedPosts },
      revalidate: 86400
    };
  }

  const relatedPosts = getRelatedPosts(slug, lang, 4);

  return {
    props: { post, relatedPosts },
    revalidate: 86400
  };
};
