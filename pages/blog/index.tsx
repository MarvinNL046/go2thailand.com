import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import TravelSecurityAffiliateBlock from '../../components/blog/TravelSecurityAffiliateBlock';
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
import { getPostsForIndex, getAllCategories } from '../../lib/blog';
import { useSubId } from '../../lib/useSubId';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/blog-index';

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
  const t = useT(i18nStrings);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;
  const { locale } = useRouter();
  const subId = useSubId();
  const lang = locale === 'nl' ? 'nl' : 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const featuredPost = posts[0];
  const recoveryCategory = selectedCategory === 'all' ? featuredPost?.category : selectedCategory;
  const recoveryTags = Array.from(new Set(filteredPosts.slice(0, 5).flatMap((post) => post.tags))).slice(0, 10);
  const trackAffiliate = (url: string, placement: string) => withPlacementSubId(url, subId, placement);

  const isNl = lang === 'nl';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": isNl ? "Go2Thailand Reisblog" : "Go2Thailand Travel Blog",
    "description": isNl ? "Thailand reistips, gidsen en verhalen" : "Thailand travel tips, guides, and stories",
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
        title={t("s001_thailand_travel_blog_tips")}
        description={t("s002_explore_thailand_through_our")}
      >
        <meta name="keywords" content={t("s003_thailand_travel_blog_thailand")} />
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
              <span className="font-script text-thailand-gold text-lg">{locale === 'nl' ? 'Ontdek Thailand' : 'Discover Thailand'}</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {locale === 'nl' ? 'Thailand Reisblog' : 'Thailand Travel Blog'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                {locale === 'nl' ? 'Verhalen, tips en inzichten uit het Land van de Glimlach' : 'Stories, tips, and insights from the Land of Smiles'}
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
                  placeholder={locale === 'nl' ? 'Zoek blog posts...' : 'Search blog posts...'}
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
                {locale === 'nl' ? 'Alle Posts' : 'All Posts'}
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
            <div className="mb-8">
              <TravelpayoutsRecoveryPanel
                pageType="blog"
                placement="blog-index-recovery"
                category={recoveryCategory}
                tags={recoveryTags}
                columns={3}
              />
            </div>

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
                        <div className="absolute top-4 left-4 bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                          {locale === 'nl' ? 'Uitgelicht' : 'Featured'}
                        </div>
                      </div>
                    </Link>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{featuredPost.author.name}</span>
                        <span>-</span>
                        <span>{featuredPost.date}</span>
                        <span>-</span>
                        <span>{featuredPost.readingTime} {locale === 'nl' ? 'min lezen' : 'min read'}</span>
                      </div>
                      <h2 className="text-3xl font-bold font-heading mb-4">
                        <Link href={`/blog/${featuredPost.slug}/`} className="hover:text-thailand-blue transition-colors">
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">{featuredPost.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-surface-cream text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                          {featuredPost.category}
                        </span>
                        <Link href={`/blog/${featuredPost.slug}/`} className="text-thailand-blue font-medium hover:underline">
                          {locale === 'nl' ? 'Lees Meer' : 'Read More'} →
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
                          <span>-</span>
                          <span>{post.readingTime} min</span>
                        </div>
                        <h3 className="text-xl font-bold font-heading mb-3">
                          <Link href={`/blog/${post.slug}/`} className="hover:text-thailand-blue transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
                        <span className="bg-surface-cream text-gray-700 px-2 py-1 rounded-full text-xs capitalize">
                          {post.category}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-600 text-lg">{locale === 'nl' ? 'Geen posts gevonden die aan je criteria voldoen.' : 'No posts found matching your criteria.'}</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label={t("s004_blog_pagination")} className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      {locale === 'nl' ? '← Vorige' : '← Previous'}
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
                      {locale === 'nl' ? 'Volgende →' : 'Next →'}
                    </button>
                  </nav>
                )}

                {/* Post count indicator */}
                {filteredPosts.length > 0 && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    {locale === 'nl'
                      ? `${(currentPage - 1) * POSTS_PER_PAGE + 1}–${Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} van ${filteredPosts.length} posts weergegeven`
                      : `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}–${Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of ${filteredPosts.length} posts`}
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <aside>
                <div className="lg:sticky lg:top-16 space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-surface-dark text-white rounded-2xl p-6">
                  <span className="section-label font-script text-thailand-gold text-sm">{locale === 'nl' ? 'Blijf op de hoogte' : 'Stay in the loop'}</span>
                  <h3 className="text-xl font-bold font-heading mb-2">{locale === 'nl' ? 'Blijf op de Hoogte' : 'Stay Updated'}</h3>
                  <p className="mb-4 opacity-90">{locale === 'nl' ? 'Ontvang de laatste Thailand reistips in je inbox' : 'Get the latest Thailand travel tips delivered to your inbox'}</p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder={locale === 'nl' ? 'Je e-mailadres' : 'Your email address'}
                      className="w-full px-4 py-2 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-thailand-red text-white font-medium py-2 rounded-xl hover:bg-thailand-red/90 transition-colors">
                      {locale === 'nl' ? 'Abonneren' : 'Subscribe'}
                    </button>
                  </form>
                </div>

                {/* Tags Cloud */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-4">{locale === 'nl' ? 'Populaire Tags' : 'Popular Tags'}</h3>
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

                {/* Explore More */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-4">{locale === 'nl' ? 'Meer Ontdekken' : 'Explore More'}</h3>
                  <div className="space-y-2">
                    <Link href="/islands/" className="block text-thailand-blue hover:underline">{locale === 'nl' ? 'Thailand Eilanden' : 'Thailand Islands'}</Link>
                    <Link href="/visa/" className="block text-thailand-blue hover:underline">{locale === 'nl' ? 'Visum Gids' : 'Visa Guide'}</Link>
                    <Link href="/food/" className="block text-thailand-blue hover:underline">{locale === 'nl' ? 'Thais Eten Gids' : 'Thai Food Guide'}</Link>
                    <Link href="/practical-info/" className="block text-thailand-blue hover:underline">{locale === 'nl' ? 'Praktische Info' : 'Practical Info'}</Link>
                  </div>
                </div>

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
                  <p className="text-xs text-gray-500 mt-3 text-center">{t("s005_affiliate_links")}</p>
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
                      {t("s006_klook_activities")}
                    </a>
                    <a
                      href={trackAffiliate(GYG_GENERIC, 'sidebar-tours-secondary')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red/90 transition-colors text-sm"
                    >
                      {t("s007_getyourguide_tours")}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">{t("s005_affiliate_links")}</p>
                </div>

                {/* eSIM */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">{t("s009_thailand_esim")}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {locale === 'nl' ? 'Blijf verbonden in Thailand. Bestel je eSIM voordat je gaat.' : 'Stay connected in Thailand. Order your eSIM before you go.'}
                  </p>
                  <a
                    href={trackAffiliate(SAILY_GENERIC, 'sidebar-esim')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue/90 transition-colors mb-2"
                  >
                    {t("s010_saily_esim")}
                  </a>
                  <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
                    {locale === 'nl' ? 'Meer eSIM opties' : 'More eSIM options'} →
                  </Link>
                </div>

                <TravelSecurityAffiliateBlock />

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
                    {locale === 'nl' ? 'Bekijk alle routes' : 'View all routes'} →
                  </Link>
                </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <PreFooterAffiliateBanner
          title={locale === 'nl' ? 'Plan je Thailand Reis' : 'Plan Your Thailand Trip'}
          description={locale === 'nl' ? 'Boek hotels, transport, activiteiten en blijf verbonden met een eSIM' : 'Book hotels, transport, activities, and get connected with an eSIM'}
          placement="blog-index-prefooter"
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
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const lang = locale === 'nl' ? 'nl' : 'en';
  // Lightweight post list — sheds ~60% of the payload vs getAllPosts.
  const posts = getPostsForIndex(lang);
  const categories = getAllCategories(lang);

  return {
    props: { posts, categories },
    revalidate: 604800,
  };
};
