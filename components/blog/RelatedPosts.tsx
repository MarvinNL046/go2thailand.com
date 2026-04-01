import Link from 'next/link';
import Image from 'next/image';

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

interface RelatedPostsProps {
  posts: RelatedPost[];
  prevPost?: AdjacentPost | null;
  nextPost?: AdjacentPost | null;
  locale?: string;
}

export default function RelatedPosts({ posts, prevPost, nextPost, locale = 'en' }: RelatedPostsProps) {
  const heading = locale === 'nl' ? 'Anderen lezen ook' : 'People Also Read';

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prev/Next Navigation */}
        {(prevPost || nextPost) && (
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}/`}
                className="group flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {locale === 'nl' ? '← Vorig artikel' : '← Previous'}
                </span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-thailand-blue transition-colors line-clamp-2 text-sm">
                  {prevPost.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}/`}
                className="group flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-right"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {locale === 'nl' ? 'Volgend artikel →' : 'Next →'}
                </span>
                <h4 className="font-semibold text-gray-900 mt-1 group-hover:text-thailand-blue transition-colors line-clamp-2 text-sm">
                  {nextPost.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        )}

        {/* Related Posts Grid */}
        {posts && posts.length > 0 && (
          <>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              {heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-48 flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-[#2D2A4A] text-white text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors line-clamp-2 text-base leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
