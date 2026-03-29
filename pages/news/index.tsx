import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllNews, NewsArticle } from '../../lib/news';

interface NewsPageProps {
  articles: NewsArticle[];
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

export default function NewsPage({ articles }: NewsPageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand News', href: '/news/' },
  ];

  return (
    <>
      <SEOHead
        title="Thailand News — Latest Updates & Stories | Go2Thailand"
        description="Stay informed with the latest Thailand news: tourism updates, visa changes, safety alerts, and cultural stories. Updated daily."
      />

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl font-bold font-heading text-gray-900 mt-4">
              Thailand News
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              The latest news from Thailand — tourism updates, visa changes, economy, safety, and culture. Updated daily from trusted sources.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No news articles yet. Check back soon!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}/`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {categoryLabels[article.category] || article.category}
                    </span>
                    <time className="text-xs text-gray-500">{article.date}</time>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                    {article.description}
                  </p>
                  {article.source && (
                    <p className="text-xs text-gray-400 mt-3">
                      Source: {article.source.name}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  const articles = getAllNews();

  return {
    props: { articles },
    revalidate: 604800,
  };
};
