interface LastUpdatedProps {
  date: string;
  locale?: string;
}

export default function LastUpdated({ date, locale = 'en' }: LastUpdatedProps) {
  const lang = locale === 'nl' ? 'nl' : 'en';

  const formatted = (() => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  })();

  const label = lang === 'nl' ? 'Laatst bijgewerkt' : 'Last updated';
  const verifiedLabel = lang === 'nl' ? 'Informatie geverifieerd' : 'Information verified';

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <time dateTime={date}>{label}: {formatted}</time>
      <span className="text-gray-300">|</span>
      <span className="text-green-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        {verifiedLabel}
      </span>
    </div>
  );
}
