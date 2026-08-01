import profileJson from '../../data/editorial/blog/nl/new-luxury-resorts-thailand-2026-marriott-hilton-mercure.json';
import type { NlEditorialDocument, NlEditorialProfile } from '../../data/editorial/blog/types';
import { NlEditorialArticle } from '../editorial/blog/NlEditorialArticle';

const profile = profileJson as NlEditorialProfile;

const document: NlEditorialDocument = {
  profile,
  markdown: {
    slug: profile.slug,
    title: profile.hero.title,
    description: profile.seo.description,
    category: 'hotels',
    date: '2026-03-23',
    lastUpdated: profile.updatedAt,
    image: profile.hero.image,
    author: { name: 'Go2Thailand Team' },
    tags: profile.seo.secondaryKeywords,
    readingTime: 7,
    contentHtml: '',
  },
};

/**
 * This slug predates the reusable NL editorial renderer and is still selected by
 * the route-owner registry. Keep the owner component as a thin adapter so the
 * typed profile remains the single source of truth for content and metadata.
 */
export function NewLuxuryResortsThailandGuide() {
  return <NlEditorialArticle document={document} />;
}
