import Link from 'next/link';
import { ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import SEOHead from '../SEOHead';
import { EditorialHero } from '../design/EditorialHero';
import { PageSectionNav } from '../design/PageSectionNav';
import ShareButtons from '../ShareButtons';
import Sources from '../blog/Sources';
import AuthorBio from '../blog/AuthorBio';
import LastUpdated from '../blog/LastUpdated';
import BlogTableOfContents from '../blog/BlogTableOfContents';
import InlineEngagementCTAs from '../blog/InlineEngagementCTAs';
import BuyerIntentNextStep from '../blog/BuyerIntentNextStep';
import TripFunnelBlock from '../blog/TripFunnelBlock';
import TravelpayoutsRecoveryPanel from '../TravelpayoutsRecoveryPanel';
import TravelSecurityAffiliateBlock from '../blog/TravelSecurityAffiliateBlock';
import EmailCapture from '../EmailCapture';
import PreFooterAffiliateBanner from '../PreFooterAffiliateBanner';
import RelatedPosts from '../blog/RelatedPosts';
import { BOOKING_GENERIC, KLOOK_GENERIC, SAILY_GENERIC, TRIP_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';

export interface EditorialBlogArticlePost {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  sourceCount?: number;
  editorialVolatility?: { hasPriceOrSchedule: boolean; hasFirstPersonAuthorityClaim: boolean };
  author: { name: string };
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
  contentHtml?: string;
  sources?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
}

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readingTime: number;
}

interface AdjacentPost {
  slug: string;
  title: string;
  category: string;
}

interface EditorialBlogArticleProps {
  post: EditorialBlogArticlePost;
  relatedPosts: RelatedPost[];
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
  locale: 'en' | 'nl';
}

function imageUrl(image: string) {
  return /^https?:\/\//i.test(image) ? image : `https://go2-thailand.com${image}`;
}

export default function EditorialBlogArticle({ post, relatedPosts, prevPost, nextPost, locale }: EditorialBlogArticleProps) {
  const isNl = locale === 'nl';
  const prefix = isNl ? '/nl' : '';
  const href = (path: string) => `${prefix}${path}`;
  const articleHref = href(`/blog/${post.slug}/`);
  const copy = isNl ? {
    home: 'Thailand', blog: 'Reisblog', eyebrow: 'Onafhankelijke Thailand-gids', navLabel: 'Op deze pagina', overview: 'Overzicht', contents: 'Inhoud', next: 'Volgende stap',
    updated: 'Laatst gecontroleerd', sources: 'bronnen', review: 'Hoe we gidsen controleren', checkEyebrow: 'Controleer voor vertrek', checkText: 'Prijzen, openingstijden, routes en toegangsregels kunnen veranderen. Controleer veranderlijke details opnieuw via de genoemde officiële bron of aanbieder voordat je betaalt.',
    share: 'Deel deze gids', related: 'Meer lezen', explore: 'Verder reizen', allGuides: 'Alle bloggidsen', hotels: 'Vind een hotel', activities: 'Bekijk activiteiten', esim: 'Blijf verbonden', transport: 'Regel vervoer',
  } : {
    home: 'Thailand', blog: 'Travel blog', eyebrow: 'Independent Thailand travel guide', navLabel: 'On this page', overview: 'Overview', contents: 'Contents', next: 'Next step',
    updated: 'Last checked', sources: 'sources', review: 'How we review guides', checkEyebrow: 'Check before you travel', checkText: 'Prices, opening hours, routes and access rules can change. Recheck changing details with the cited official source or provider before you pay.',
    share: 'Share this guide', related: 'Read next', explore: 'Keep planning', allGuides: 'All travel guides', hotels: 'Find a hotel', activities: 'Browse activities', esim: 'Stay connected', transport: 'Sort transport',
  };

  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
    image: imageUrl(post.image), datePublished: post.date, dateModified: post.lastUpdated || post.date,
    author: { '@type': /team|editorial/i.test(post.author.name) ? 'Organization' : 'Person', name: post.author.name },
    publisher: { '@type': 'Organization', name: 'Go2Thailand', url: 'https://go2-thailand.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://go2-thailand.com${articleHref}` },
    inLanguage: isNl ? 'nl-NL' : 'en-GB',
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.home, item: `https://go2-thailand.com${href('/')}` },
      { '@type': 'ListItem', position: 2, name: copy.blog, item: `https://go2-thailand.com${href('/blog/')}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://go2-thailand.com${articleHref}` },
    ],
  };
  const faqJsonLd = post.faqItems?.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) } : null;

  return (
    <>
      <SEOHead title={`${post.title} | Go2Thailand`} description={post.description} ogImage={imageUrl(post.image)}>
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}
      </SEOHead>

      <main data-premium-template={`${isNl ? 'nl' : 'en'}-blog-article`} className="overflow-hidden bg-canvas text-charcoal">
        <EditorialHero
          image={post.image}
          imageAlt={post.title}
          breadcrumbs={[{ label: copy.home, href: href('/') }, { label: copy.blog, href: href('/blog/') }, { label: post.category }]}
          eyebrow={copy.eyebrow}
          title={post.title}
          description={post.description}
          actions={[{ label: copy.next, href: '#next-step', kind: 'primary' }, { label: copy.contents, href: '#inhoud', kind: 'secondary' }]}
          contentTone="light"
          minHeightClassName="min-h-[650px] lg:min-h-[620px]"
          titleClassName="max-w-[900px] text-[3.7rem] leading-[.88] sm:text-[4.8rem] lg:text-[5.8rem]"
          descriptionClassName="mt-5 max-w-[650px] text-sm leading-7 !text-white/78"
          imageClassName="object-cover object-center"
          gradientClassName="bg-[linear-gradient(90deg,rgba(3,29,29,.98)_0%,rgba(3,29,29,.82)_44%,rgba(3,29,29,.2)_78%,rgba(3,29,29,.04)_100%)]"
          disclosure={isNl ? 'Sommige links op deze pagina zijn affiliate-links; jij betaalt niets extra.' : 'Some links on this page are affiliate links; you pay nothing extra.'}
        />

        <PageSectionNav label={copy.navLabel} items={[{ href: '#inhoud', label: copy.overview, icon: BookOpen }, { href: '#inhoudsopgave', label: copy.contents, icon: Compass }, { href: '#next-step', label: copy.next, icon: ShieldCheck }]} />

        <section className="section-divider-bottom bg-canvas py-5">
          <div className="container-custom flex flex-wrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[.12em] text-charcoal/52">
            <div className="flex flex-wrap items-center gap-3"><span>{post.author.name}</span><span aria-hidden="true">·</span><time dateTime={post.date}>{post.date}</time><span aria-hidden="true">·</span><span>{post.readingTime || 1} {isNl ? 'min lezen' : 'min read'}</span></div>
            <LastUpdated date={post.lastUpdated || post.date} locale={locale} />
          </div>
        </section>

        <section id="inhoud" className="scroll-mt-24 py-12 lg:py-20">
          <div className="container-custom grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article className="min-w-0 rounded-[28px] border border-jade/10 bg-white p-6 shadow-editorial-lift sm:p-9 lg:p-12">
              {(post.editorialVolatility?.hasPriceOrSchedule || post.editorialVolatility?.hasFirstPersonAuthorityClaim) ? <aside className="mb-8 rounded-2xl border border-saffron/35 bg-saffron/8 p-5"><p className="eyebrow !text-saffron-dark">{copy.checkEyebrow}</p><p className="mt-2 text-sm leading-6 text-jade">{copy.checkText}</p></aside> : null}
              <div className="mb-8 border-b border-jade/10 pb-6"><ShareButtons url={`https://go2-thailand.com${articleHref}`} title={post.title} description={post.description} image={imageUrl(post.image)} /></div>
              <TravelpayoutsRecoveryPanel pageType="blog" placement="top-panel" slug={post.slug} category={post.category} tags={post.tags} className="mb-8" />
              <BuyerIntentNextStep post={{ slug: post.slug, title: post.title, tags: post.tags }} locale={locale} />
              <div id="inhoudsopgave" className="prose prose-lg max-w-none scroll-mt-28 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-[-.035em] prose-headings:text-jade prose-p:text-charcoal/78 prose-p:leading-8 prose-a:text-jade prose-a:font-semibold prose-a:underline prose-a:decoration-saffron/65 prose-img:rounded-2xl" data-blog-content dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.description}</p>` }} />
              <InlineEngagementCTAs />
              <TripFunnelBlock post={{ slug: post.slug, title: post.title, tags: post.tags, contentHtml: post.contentHtml }} locale={locale} placement="bottom" />
              {post.sources?.length ? <Sources sources={post.sources} locale={locale} /> : null}
              <AuthorBio name={post.author.name} locale={locale} />
              <div className="mt-8 border-t border-jade/10 pt-8"><h2 className="font-display text-2xl font-semibold text-jade">{copy.share}</h2><div className="mt-4"><ShareButtons url={`https://go2-thailand.com${articleHref}`} title={post.title} description={post.description} image={imageUrl(post.image)} /></div></div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-jade/10 bg-white p-5 shadow-editorial-card"><BlogTableOfContents /></div>
              <EmailCapture variant="sidebar" />
              <TravelSecurityAffiliateBlock />
              <div className="rounded-2xl bg-jade p-6 text-white shadow-editorial-card"><p className="eyebrow !text-saffron-light">{copy.explore}</p><div className="mt-4 grid gap-2 text-sm font-bold"><Link href={href('/city/')} className="flex items-center justify-between border-b border-white/15 py-2">{copy.overview}<ArrowRight size={14} /></Link><Link href={href('/where-to-stay/')} className="flex items-center justify-between border-b border-white/15 py-2">{copy.hotels}<ArrowRight size={14} /></Link><Link href={href('/things-to-do/')} className="flex items-center justify-between border-b border-white/15 py-2">{copy.activities}<ArrowRight size={14} /></Link><Link href={href('/esim/')} className="flex items-center justify-between border-b border-white/15 py-2">{copy.esim}<ArrowRight size={14} /></Link><Link href={href('/transport/')} className="flex items-center justify-between py-2">{copy.transport}<ArrowRight size={14} /></Link></div></div>
            </aside>
          </div>
        </section>

        <section id="next-step" className="scroll-mt-24 bg-tonal py-12 lg:py-16"><div className="container-custom"><TripFunnelBlock post={{ slug: post.slug, title: post.title, tags: post.tags, contentHtml: post.contentHtml }} locale={locale} placement="bottom" /></div></section>
        {relatedPosts.length ? <RelatedPosts posts={relatedPosts} prevPost={prevPost} nextPost={nextPost} locale={locale} /> : null}
        <PreFooterAffiliateBanner title={isNl ? 'Plan je Thailand-reis' : 'Plan your Thailand trip'} description={isNl ? 'Vergelijk hotels, activiteiten, vervoer en eSIM-opties wanneer je klaar bent om te boeken.' : 'Compare hotels, activities, transport and eSIM options when you are ready to book.'} placement="blog-editorial-prefooter" links={[{ label: 'Booking.com', href: BOOKING_GENERIC }, { label: 'Trip.com', href: TRIP_GENERIC }, { label: 'Activities', href: KLOOK_GENERIC }, { label: 'Transport', href: TWELVEGO_GENERIC }, { label: 'eSIM', href: SAILY_GENERIC }]} />
      </main>
    </>
  );
}
