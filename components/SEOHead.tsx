import Head from 'next/head';
import { ReactNode } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  children?: ReactNode;
}

const DEFAULT_OG_IMAGE = 'https://go2-thailand.com/og-default.webp';

/**
 * Keep search snippets inside a predictable range without changing the page
 * heading or article copy. The cut is made on a natural word boundary.
 */
function clampMetadata(value: string, maxLength: number, stripBrand = false): string {
  let normalized = value.replace(/\s+/g, ' ').trim();
  if (stripBrand && normalized.length > maxLength) {
    normalized = normalized
      .replace(new RegExp(`\\s*[|\\u2013\\u2014\\-:]\\s*Go2Thailand(?:\\.com)?\\s*$`, 'i'), '')
      .trim();
  }
  if (normalized.length <= maxLength) return normalized;

  const available = maxLength - 1;
  const candidate = normalized.slice(0, available + 1);
  const boundary = Math.max(
    candidate.lastIndexOf(' '),
    candidate.lastIndexOf('\u2013'),
    candidate.lastIndexOf('\u2014'),
  );
  const cutAt = boundary >= Math.floor(available * 0.68) ? boundary : available;
  const trimmed = candidate
    .slice(0, cutAt)
    .replace(new RegExp(`[\\s,;:\\u2013\\u2014\\-]+$`, 'g'), '');

  return `${trimmed}\u2026`;
}

/**
 * Wraps Next.js Head with matching search, Open Graph and Twitter metadata.
 * Canonical and hreflang tags are provided globally by Hreflang in _app.tsx.
 */
export default function SEOHead({ title, description, ogImage, children }: SEOHeadProps) {
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;
  const resolvedTitle = clampMetadata(title, 65, true);
  const resolvedDescription = clampMetadata(description, 165);

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <link rel="alternate" type="application/rss+xml" title="Go2 Thailand Blog RSS Feed" href="https://go2-thailand.com/feed.xml" />
      {children}
    </Head>
  );
}
