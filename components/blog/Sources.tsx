interface Source {
  name: string;
  url: string;
}

interface SourcesProps {
  sources: Source[];
  locale?: string;
}

export default function Sources({ sources, locale = 'en' }: SourcesProps) {
  if (!sources || sources.length === 0) return null;

  const lang = locale === 'nl' ? 'nl' : 'en';
  const title = lang === 'nl' ? 'Bronnen & Referenties' : 'Sources & References';
  const note = lang === 'nl'
    ? 'Dit artikel is gebaseerd op eigen ervaring en geverifieerd met de volgende officiële bronnen:'
    : 'This article is based on first-hand experience and verified with the following official sources:';

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{note}</p>
      <ul className="space-y-1.5">
        {sources.map((source, i) => (
          <li key={i} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-thailand-blue hover:underline"
            >
              {source.name}
            </a>
            <span className="text-gray-400 ml-1 text-xs">&#8599;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
