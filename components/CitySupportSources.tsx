interface ContentSource {
  type?: string;
  title: string;
  creator?: string;
  url: string;
  description?: string;
}

interface CitySupportSourcesProps {
  cityName: string;
  contentSources?: ContentSource[] | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  enhancedAt?: string | null;
  editorialPositioning?: string | null;
  sourceSummary?: string | null;
}

function formatReviewedDate(value?: string | null) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default function CitySupportSources({
  cityName,
  contentSources,
  reviewedBy,
  reviewedAt,
  enhancedAt,
  editorialPositioning,
  sourceSummary,
}: CitySupportSourcesProps) {
  const sources = Array.isArray(contentSources) ? contentSources.filter(Boolean) : [];
  const reviewedDate = formatReviewedDate(reviewedAt || enhancedAt || undefined);
  const hasMeta = Boolean(reviewedBy || reviewedDate || editorialPositioning || sourceSummary);

  if (!hasMeta && sources.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
          Transparency
        </span>
        <h3 className="mt-3 text-2xl font-heading font-bold text-gray-900">
          Sources & Editorial Notes
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
          This page is curated from source-backed city and activity data, with editorial review used to separate strong local fits from limited or weaker matches in {cityName}.
        </p>
      </div>

      {hasMeta && (
        <div className="mb-5 rounded-[26px] border border-slate-100 bg-slate-50 px-5 py-5">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reviewed By</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">{reviewedBy || 'Go2Thailand Editorial Team'}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reviewed</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">{reviewedDate || 'Editorial review in progress'}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Sources Used</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">{sources.length > 0 ? `${sources.length} references on-page` : 'No sources listed yet'}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Method</div>
              <div className="mt-1 text-sm font-semibold text-gray-900">
                {editorialPositioning || sourceSummary || 'Curated manually, then checked against linked sources'}
              </div>
            </div>
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source, index) => (
            <a
              key={`${source.url}-${index}`}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-white rounded-[24px] border border-gray-100 hover:border-gray-300 transition-all hover:-translate-y-0.5 hover:shadow-md text-sm"
            >
              <div className="mr-3 mt-0.5 flex-shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                {source.type || 'source'}
              </div>
              <div>
                <div className="font-medium text-gray-900">{source.title}</div>
                {source.creator && <div className="text-gray-500">by {source.creator}</div>}
                {source.description && (
                  <div className="text-gray-600 mt-1 leading-6">{source.description}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
