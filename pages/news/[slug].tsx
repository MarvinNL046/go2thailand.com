import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllNews, getNewsBySlug, NewsArticle } from '../../lib/news';

interface NewsArticlePageProps {
  article: NewsArticle;
}

const categoryLabels: Record<string, string> = {
  economy: 'Economy',
  tourism: 'Tourism',
  safety: 'Safety',
  transport: 'Transport',
  'visa-immigration': 'Visa & Immigration',
  culture: 'Culture',
  weather: 'Weather',
  general: 'General',
};

export default function NewsArticlePage({ article }: NewsArticlePageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand News', href: '/news/' },
    { name: article.title, href: `/news/${article.slug}/` },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Go2Thailand' },
    publisher: {
      '@type': 'Organization',
      name: 'Go2Thailand',
      url: 'https://go2-thailand.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://go2-thailand.com/news/${article.slug}/`,
    },
  };

  return (
    <>
      <SEOHead
        title={`${article.title} | Thailand News — Go2Thailand`}
        description={article.description}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mt-4 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                {categoryLabels[article.category] || article.category}
              </span>
              <time className="text-sm text-gray-500">{article.date}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900">
              {article.title}
            </h1>
            {article.source && (
              <p className="mt-3 text-sm text-gray-500">
                Source:{' '}
                <a
                  href={article.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {article.source.name}
                </a>
              </p>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/news/"
              className="text-blue-600 hover:underline font-medium"
            >
              ← Back to Thailand News
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllNews();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<NewsArticlePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
    revalidate: 86400,
  };
};
