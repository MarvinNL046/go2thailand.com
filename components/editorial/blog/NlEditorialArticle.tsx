import type { ReactNode } from 'react';
import {
  BookOpenText,
  CheckCircle2,
  CircleHelp,
  Compass,
  FileText,
  Layers3,
  ListChecks,
  Map,
  Megaphone,
  Newspaper,
  Route,
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { NlEditorialBlock, NlEditorialDocument, NlEditorialFaqItem } from '../../../data/editorial/blog/types';
import SEOHead from '../../SEOHead';
import { EditorialHero, type EditorialHeroAction } from '../../design/EditorialHero';
import { FaqSplitSection } from '../../design/FaqSplitSection';
import { PageSectionNav, type PageSectionNavItem } from '../../design/PageSectionNav';
import { SourceMethodSection } from '../../design/SourceMethodSection';
import { NlEditorialFreshness } from './NlEditorialFreshness';
import { CultureLayout } from './layouts/CultureLayout';
import { DestinationLayout } from './layouts/DestinationLayout';
import { ExperienceLayout } from './layouts/ExperienceLayout';
import { FoodLayout } from './layouts/FoodLayout';
import { PracticalLayout } from './layouts/PracticalLayout';
import { StayLayout } from './layouts/StayLayout';
import { UpdateLayout } from './layouts/UpdateLayout';

export interface NlEditorialArticleProps {
  document: NlEditorialDocument;
}

const BLOCK_ICONS: Record<NlEditorialBlock['kind'], LucideIcon> = {
  prose: BookOpenText,
  'card-grid': Layers3,
  comparison: Compass,
  steps: Route,
  checklist: ListChecks,
  callout: Megaphone,
  faq: CircleHelp,
  sources: FileText,
  related: Map,
  affiliate: ShoppingBag,
};

function blockLabel(block: NlEditorialDocument['profile']['blocks'][number]) {
  if ('title' in block && block.title) return block.title;
  const labels: Record<NlEditorialBlock['kind'], string> = {
    prose: 'Verdieping',
    'card-grid': 'Keuzes',
    comparison: 'Vergelijken',
    steps: 'Stappen',
    checklist: 'Checklist',
    callout: 'Belangrijk',
    faq: 'Vragen',
    sources: 'Bronnen',
    related: 'Verder lezen',
    affiliate: 'Actueel aanbod',
  };
  return labels[block.kind];
}

function heroTitle(title: string, accent?: string): ReactNode {
  if (!accent || title.includes(accent)) return title;
  return <>{title}<br /><span className="text-saffron-dark">{accent}</span></>;
}

function renderLayout(document: NlEditorialDocument) {
  const { layout, cluster } = document.profile;
  switch (layout.kind) {
    case 'news-update':
    case 'event-guide':
      return <UpdateLayout document={document} />;
    case 'food-guide':
      return <FoodLayout document={document} />;
    case 'destination-guide':
      return <DestinationLayout document={document} />;
    case 'hotel-guide':
      return <StayLayout document={document} />;
    case 'policy-guide':
      return <PracticalLayout document={document} />;
    case 'evergreen-guide':
      if (cluster === 'culture-wellness') return <CultureLayout document={document} />;
      if (cluster === 'planning' || cluster === 'transport' || cluster === 'policy') return <PracticalLayout document={document} />;
      return <ExperienceLayout document={document} />;
  }
}

function jsonLd(document: NlEditorialDocument, faqItems: readonly NlEditorialFaqItem[]) {
  const { profile, markdown } = document;
  const pageUrl = `https://go2-thailand.com${profile.route}`;
  const imageUrl = `https://go2-thailand.com${profile.hero.image}`;
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: profile.hero.title,
      description: profile.seo.description,
      image: [imageUrl],
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      author: { '@type': 'Person', '@id': 'https://go2-thailand.com/#marvin', name: markdown.author?.name || 'Marvin' },
      publisher: { '@id': 'https://go2-thailand.com/#organization' },
      ...(markdown.date ? { datePublished: markdown.date } : {}),
      dateModified: profile.updatedAt,
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Thailand', item: 'https://go2-thailand.com/nl/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://go2-thailand.com/nl/blog/' },
        { '@type': 'ListItem', position: 3, name: profile.hero.title, item: pageUrl },
      ],
    },
  ];
  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function NlEditorialArticle({ document }: NlEditorialArticleProps) {
  const { profile, markdown } = document;
  const profileFaq = profile.blocks.find((block) => block.kind === 'faq');
  const profileSources = profile.blocks.some((block) => block.kind === 'sources');
  const fallbackFaq = !profileFaq ? markdown.faqItems || [] : [];
  const visibleFaq = profileFaq?.kind === 'faq' ? profileFaq.items : fallbackFaq;
  const actions: EditorialHeroAction[] = [profile.hero.primaryCta, profile.hero.secondaryCta]
    .filter((action): action is NonNullable<typeof action> => Boolean(action))
    .map((action, index) => ({ label: action.label, href: action.href, kind: index === 0 ? 'primary' : 'secondary', newTab: Boolean(action.external) }));
  const navItems: PageSectionNavItem[] = [
    { href: '#artikel', label: 'Artikel', icon: Newspaper },
    ...profile.blocks.slice(0, 5).map((block) => ({ href: `#${block.id}` as `#${string}`, label: blockLabel(block), icon: BLOCK_ICONS[block.kind] })),
  ];
  const schema = jsonLd(document, visibleFaq);

  return (
    <article className="bg-canvas">
      <SEOHead title={profile.seo.title} description={profile.seo.description} ogImage={`https://go2-thailand.com${profile.hero.image}`}>
        {profile.seo.noindex ? <meta name="robots" content="noindex,follow" /> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      </SEOHead>
      <EditorialHero
        image={profile.hero.image}
        imageAlt={profile.hero.imageAlt}
        breadcrumbs={[{ label: 'Thailand', href: '/nl/' }, { label: 'Blog', href: '/nl/blog/' }, { label: profile.hero.title }]}
        eyebrow={profile.hero.eyebrow}
        title={heroTitle(profile.hero.title, profile.hero.accent)}
        description={profile.hero.description}
        actions={actions}
        minHeightClassName="min-h-[650px] lg:min-h-[620px]"
        titleClassName="max-w-[720px] text-[3.8rem] leading-[0.87] sm:text-[5rem] lg:text-[5.7rem]"
      />
      <NlEditorialFreshness layout={profile.layout} updatedAt={profile.updatedAt} editorialStatus={profile.editorialStatus} />
      {navItems.length > 1 ? <PageSectionNav label="Onderdelen van dit artikel" items={navItems} /> : null}
      {renderLayout(document)}
      {fallbackFaq.length ? <FaqSplitSection id="vragen" eyebrow="Veelgestelde vragen" title={`Veelgestelde vragen over ${profile.hero.title}`} items={fallbackFaq} /> : null}
      {!profileSources && markdown.sources?.length ? (
        <SourceMethodSection
          title="Bronnen achter deze gids"
          description="Controleer veranderlijke details altijd opnieuw bij de oorspronkelijke organisatie."
          sources={markdown.sources.map((source) => ({ label: source.title || source.name || 'Primaire bron', href: source.url }))}
        />
      ) : null}
    </article>
  );
}

export default NlEditorialArticle;
