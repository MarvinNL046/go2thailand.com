import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import AuthorBio from '../../components/blog/AuthorBio';
import Sources from '../../components/blog/Sources';
import LastUpdated from '../../components/blog/LastUpdated';
import RelatedPosts from '../../components/blog/RelatedPosts';
import TravelSecurityAffiliateBlock from '../../components/blog/TravelSecurityAffiliateBlock';
import ShareButtons from '../../components/ShareButtons';
import EmailCapture from '../../components/EmailCapture';
import InlineAd from '../../components/ads/InlineAd';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import {
  BOOKING_GENERIC,
  GYG_GENERIC,
  KLOOK_GENERIC,
  NORDPASS_GENERIC,
  NORDVPN_GENERIC,
  SAILY_GENERIC,
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
  withPlacementSubId,
} from '../../lib/affiliates';
import { getAllPosts, getPostBySlug, getRelatedPosts, getAdjacentPosts } from '../../lib/blog';
import BlogTableOfContents from '../../components/blog/BlogTableOfContents';
import InlineEngagementCTAs from '../../components/blog/InlineEngagementCTAs';
import BookingHeroCTA from '../../components/BookingHeroCTA';
import { useSubId } from '../../lib/useSubId';

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

interface AdjacentPost {
  slug: string;
  title: string;
  category: string;
}

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
}

// Travelpayouts embed script URLs — keyed by widget type matching data-widget attribute
// Empty string means no script widget is available; the fallback CTA box will remain visible
const WIDGET_SCRIPTS: Record<string, string> = {
  booking: 'https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&sustainable=false&deals=false&border_radius=5&plain=true&powered_by=true&promo_id=2693&campaign_id=84',
  klook: 'https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&locale=en&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497',
  getyourguide: 'https://tpembd.com/content?trs=421888&shmarker=602467&locale=en-US&powered_by=true&campaign_id=108&promo_id=4039',
  viator: 'https://tpembd.com/content?currency=usd&trs=421888&shmarker=602467&powered_by=true&locale=en&lowest_price=&highest_price=&min_lines=5&color_button=%23346A6C&promo_id=5850&campaign_id=47',
  '12go': 'https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&from=Bangkok&to=Phuket&from_en=Bangkok&to_en=Phuket&powered_by=true&color=black&border=1&campaign_id=44&promo_id=1506',
  trip: 'https://tpembd.com/content?trs=421888&shmarker=602467&lang=www&layout=S10391&powered_by=true&campaign_id=121&promo_id=4038',
  saily: '',     // No script widget available, fallback CTA box only
  nordvpn: '',   // No script widget available, fallback CTA box only
  nordpass: '',  // No script widget available, fallback CTA box only
};

function toAbsoluteImageUrl(image: string) {
  return /^https?:\/\//i.test(image) ? image : `https://go2-thailand.com${image}`;
}

export default function BlogPostPage({ post, relatedPosts, prevPost, nextPost }: BlogPostPageProps) {
  const { locale } = useRouter();
  const subId = useSubId();
  const trackAffiliate = (url: string, placement: string) => withPlacementSubId(url, subId, placement);

  // Hydrate widget placeholders with real Travelpayouts embed scripts on the client
  useEffect(() => {
    const contentEl = document.querySelector('[data-blog-content]');
    if (!contentEl) return;

    const widgetDivs = contentEl.querySelectorAll<HTMLElement>('[data-widget]');
    widgetDivs.forEach((div) => {
      const widgetType = div.getAttribute('data-widget');
      if (!widgetType || !(widgetType in WIDGET_SCRIPTS)) return;

      const scriptSrc = WIDGET_SCRIPTS[widgetType];
      if (!scriptSrc) return; // No script widget for this type, keep fallback CTA box

      // Create a container for the script widget above the fallback CTA box
      const scriptContainer = document.createElement('div');
      scriptContainer.style.margin = '0';

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.charset = 'utf-8';

      // When the script loads successfully, hide the fallback CTA box
      script.onload = () => {
        const fallback = div.querySelector('[data-widget-fallback]');
        if (fallback) (fallback as HTMLElement).style.display = 'none';
      };

      scriptContainer.appendChild(script);
      div.insertBefore(scriptContainer, div.firstChild);
    });
  }, []);

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
        <meta name="keywords" content={post.tags.join(', ')} />
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

        {/* Booking Hero CTA — contextual, referrer-aware */}
        <BookingHeroCTA slug={post.slug} category={post.category} tags={post.tags} pageType="blog" />

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
                  <TravelpayoutsRecoveryPanel
                    pageType="blog"
                    placement="top-panel"
                    slug={post.slug}
                    category={post.category}
                    tags={post.tags}
                    className="mb-8"
                  />
                  {post.contentHtml ? (
                    <div
                      data-blog-content
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-thailand-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                  ) : (
                    <p className="text-gray-700">{post.description}</p>
                  )}

                  {/* Inline Engagement CTAs — injected client-side into content */}
                  <InlineEngagementCTAs />

                  {/* Sources */}
                  {post.sources && post.sources.length > 0 && (
                    <Sources sources={post.sources} locale={locale} />
                  )}

                  {/* Author Bio */}
                  <AuthorBio name={post.author.name} locale={locale} />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-bold font-heading mb-4">Tags</h3>
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
                    <h3 className="font-bold font-heading mb-4">{locale === 'nl' ? 'Deel dit artikel' : 'Share this article'}</h3>
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
                {/* Table of Contents */}
                <BlogTableOfContents />

                {/* Newsletter */}
                <EmailCapture variant="sidebar" />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="font-bold font-heading text-lg mb-4">{locale === 'nl' ? 'Gerelateerde Artikelen' : 'Related Articles'}</h3>
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

                <TravelSecurityAffiliateBlock />

                {/* Explore */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-bold font-heading text-lg mb-4">{locale === 'nl' ? 'Meer Ontdekken' : 'Explore More'}</h3>
                  <div className="space-y-2">
                    <Link href="/islands/" className="block text-thailand-blue hover:underline text-sm">{locale === 'nl' ? 'Thailand Eilanden' : 'Thailand Islands'}</Link>
                    <Link href="/visa/" className="block text-thailand-blue hover:underline text-sm">{locale === 'nl' ? 'Visum Gids' : 'Visa Guide'}</Link>
                    <Link href="/food/" className="block text-thailand-blue hover:underline text-sm">{locale === 'nl' ? 'Thais Eten' : 'Thai Food'}</Link>
                    <Link href="/practical-info/" className="block text-thailand-blue hover:underline text-sm">{locale === 'nl' ? 'Praktische Info' : 'Practical Info'}</Link>
                    <Link href="/blog/" className="block text-thailand-blue hover:underline text-sm">{locale === 'nl' ? '← Alle blog posts' : '← All blog posts'}</Link>
                  </div>
                </div>

                {/* Trip.com Hotel Widget */}
                <TripcomWidget city="Thailand" type="searchbox" customTitle={locale === 'nl' ? 'Vind Thailand Hotels' : 'Find Thailand Hotels'} />

                {/* Book Hotels */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-3">{locale === 'nl' ? 'Boek Hotels' : 'Book Hotels'}</h3>
                  <div className="space-y-3">
                    <a
                      href={trackAffiliate(BOOKING_GENERIC, 'sidebar-hotels-primary')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm"
                    >
                      Booking.com
                    </a>
                    <a
                      href={trackAffiliate(TRIP_GENERIC, 'sidebar-hotels-secondary')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm"
                    >
                      Trip.com
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                </div>

                {/* Tours & Activities */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-3">{locale === 'nl' ? 'Tours & Activiteiten' : 'Tours & Activities'}</h3>
                  <div className="space-y-3">
                    <a
                      href={trackAffiliate(KLOOK_GENERIC, 'sidebar-tours-primary')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm"
                    >
                      {locale === 'nl' ? 'Klook Activiteiten' : 'Klook Activities'}
                    </a>
                    <a
                      href={trackAffiliate(GYG_GENERIC, 'sidebar-tours-secondary')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm"
                    >
                      GetYourGuide Tours
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
                </div>

                {/* eSIM */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">Thailand eSIM</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {locale === 'nl' ? 'Blijf verbonden in Thailand. Bestel je eSIM voor je vertrekt.' : 'Stay connected in Thailand. Order your eSIM before you go.'}
                  </p>
                  <a
                    href={trackAffiliate(SAILY_GENERIC, 'sidebar-esim')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors mb-2"
                  >
                    Saily eSIM
                  </a>
                  <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
                    {locale === 'nl' ? 'Meer eSIM opties →' : 'More eSIM options →'}
                  </Link>
                </div>

                {/* Travel Insurance */}
                <div className="bg-surface-dark text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">{locale === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}</h3>
                  <p className="text-sm opacity-90 mb-4">
                    {locale === 'nl' ? 'Bescherm jezelf tijdens het reizen. Vergelijk de beste reisverzekeringen.' : 'Protect yourself while traveling. Compare the best travel insurance.'}
                  </p>
                  <Link href="/travel-insurance-thailand/" className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors">
                    {locale === 'nl' ? 'Vergelijk Nu' : 'Compare Now'}
                  </Link>
                </div>

                {/* Transport */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-3">Transport</h3>
                  <a
                    href={trackAffiliate(TWELVEGO_GENERIC, 'sidebar-transport')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors text-sm mb-2"
                  >
                    {locale === 'nl' ? '12Go Asia - Boek Transport' : '12Go Asia - Book Transport'}
                  </a>
                  <Link href="/transport/" className="block text-thailand-blue text-center text-sm hover:underline">
                    {locale === 'nl' ? 'Bekijk alle routes →' : 'View all routes →'}
                  </Link>
                </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* People Also Read */}
        <RelatedPosts posts={relatedPosts} prevPost={prevPost} nextPost={nextPost} locale={locale} />

        <PreFooterAffiliateBanner
          title={locale === 'nl' ? 'Plan je Thailand Reis' : 'Plan Your Thailand Trip'}
          description={locale === 'nl' ? 'Boek hotels, transport, activiteiten en blijf verbonden met een eSIM' : 'Book hotels, transport, activities, and get connected with an eSIM'}
          placement="blog-slug-prefooter"
          links={[
            { label: 'Booking.com', href: BOOKING_GENERIC },
            { label: 'Trip.com', href: TRIP_GENERIC },
            { label: 'Activities', href: KLOOK_GENERIC },
            { label: 'Transport', href: TWELVEGO_GENERIC },
            { label: 'eSIM', href: SAILY_GENERIC },
            { label: 'NordVPN', href: NORDVPN_GENERIC },
            { label: 'NordPass', href: NORDPASS_GENERIC },
          ]}
        />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
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
    const relatedPosts = getRelatedPosts(slug, 'en', 4);
    const { prevPost, nextPost } = getAdjacentPosts(slug, 'en');
    return {
      props: { post: fallbackPost, relatedPosts, prevPost, nextPost },
      revalidate: 604800
    };
  }

  const relatedPosts = getRelatedPosts(slug, lang, 4);
  const { prevPost, nextPost } = getAdjacentPosts(slug, lang);

  return {
    props: { post, relatedPosts, prevPost, nextPost },
    revalidate: 604800
  };
};
